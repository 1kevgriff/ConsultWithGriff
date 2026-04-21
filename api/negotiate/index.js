/**
 * Accept-header content negotiation for Markdown for Agents.
 *
 * Incoming requests arrive via a SWA catch-all rewrite. We read the original
 * URL from `x-ms-original-url`, inspect the Accept header, and return either
 * the pre-built markdown shadow (/{slug}.md) or the static HTML page.
 */

const SITE_FALLBACK = 'https://consultwithgriff.com';

// Inside a Managed Function, req.headers.host and x-forwarded-host point at
// the internal Azure Functions *.azurewebsites.net URL, which cannot serve
// the static site. SWA sets x-ms-original-url to the public URL when a
// rewrite fires, so prefer that — and otherwise fall back to the known
// production origin.
function resolveOrigin(req) {
  const originalUrl = req.headers['x-ms-original-url'];
  if (originalUrl) {
    try {
      const parsed = new URL(originalUrl);
      return `${parsed.protocol}//${parsed.host}`;
    } catch {
      // fall through
    }
  }
  return SITE_FALLBACK;
}

function resolveOriginalPath(req) {
  const originalUrl = req.headers['x-ms-original-url'] || req.url || '/';
  try {
    const parsed = new URL(originalUrl, SITE_FALLBACK);
    let pathname = parsed.pathname || '/';
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    return pathname;
  } catch {
    return '/';
  }
}

function acceptsMarkdown(req) {
  const accept = (req.headers['accept'] || '').toLowerCase();
  return accept.includes('text/markdown');
}

function estimateTokens(text) {
  return String(Math.ceil(text.length / 4));
}

// Agent discovery links (RFC 8288). SWA doesn't propagate route-level headers
// to responses from /api/* rewrites, so the function re-asserts them.
const DISCOVERY_LINK =
  '</llms.txt>; rel="describedby"; type="text/markdown", ' +
  '</rss.xml>; rel="alternate"; type="application/rss+xml"; title="Articles", ' +
  '</sitemap-index.xml>; rel="sitemap"';

module.exports = async function (context, req) {
  const origin = resolveOrigin(req);
  const path = resolveOriginalPath(req);
  const wantsMarkdown = acceptsMarkdown(req);

  if (wantsMarkdown) {
    const mdUrl = path === '/' ? `${origin}/index.md` : `${origin}${path}.md`;
    try {
      const mdRes = await fetch(mdUrl, { redirect: 'follow' });
      if (mdRes.ok) {
        const body = await mdRes.text();
        context.res = {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, must-revalidate',
            'X-Markdown-Tokens': estimateTokens(body),
            Vary: 'Accept',
            Link: DISCOVERY_LINK,
          },
          body,
        };
        return;
      }
    } catch (err) {
      context.log.warn(`Markdown fetch failed for ${mdUrl}: ${err.message}`);
    }
  }

  const htmlUrl = path === '/' ? `${origin}/index.html` : `${origin}${path}/index.html`;
  try {
    const htmlRes = await fetch(htmlUrl, { redirect: 'follow' });
    const body = await htmlRes.text();
    context.res = {
      status: htmlRes.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, must-revalidate',
        Vary: 'Accept',
        Link: DISCOVERY_LINK,
      },
      body,
    };
  } catch (err) {
    context.log.error(`HTML fetch failed for ${htmlUrl}: ${err.message}`);
    context.res = {
      status: 502,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'Upstream fetch failed: ' + err.message,
    };
  }
};
