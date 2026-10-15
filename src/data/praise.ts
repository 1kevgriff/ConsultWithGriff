/**
 * Praise & Testimonials
 *
 * This file stores kind words people have said about Kevin's talks, workshops,
 * and work. Each entry represents a single testimonial.
 *
 * ## How to Add a New Entry
 *
 * 1. Find the PRAISE array below
 * 2. Add a new object with the required fields:
 *    - quote: The testimonial text (required)
 *    - author: Display name of the person (required)
 *    - date: ISO date string, e.g., '2026-10-15' (required)
 *    - platform: Where the praise came from - 'X', 'LinkedIn', 'Bluesky', 'Email', etc. (required)
 * 3. Optional fields:
 *    - handle: Author's handle or professional title
 *    - sourceUrl: Link to the original post (if public)
 *    - event: Conference or event name
 *    - talk: Specific talk or workshop title
 *
 * Example:
 * {
 *   quote: 'Great talk on SignalR!',
 *   author: 'Jane Developer',
 *   handle: '@janedev',
 *   platform: 'X',
 *   sourceUrl: 'https://x.com/janedev/status/123456789',
 *   date: '2026-11-01',
 *   event: 'DevConf 2026',
 *   talk: 'Real-Time Web with SignalR',
 * }
 */

export type Platform = 'X' | 'LinkedIn' | 'Bluesky' | 'Mastodon' | 'Email' | 'Sessionize' | 'Other';

export interface PraiseEntry {
  /** The testimonial quote text */
  quote: string;
  /** Display name of the person giving praise */
  author: string;
  /** Author's handle (e.g., @username) or professional title (optional) */
  handle?: string;
  /** Platform where the praise originated */
  platform: Platform;
  /** URL to the original post, if publicly available (optional) */
  sourceUrl?: string;
  /** Date the praise was given (ISO format: YYYY-MM-DD) */
  date: string;
  /** Event or conference name, if applicable (optional) */
  event?: string;
  /** Specific talk or workshop title, if applicable (optional) */
  talk?: string;
}

export const PRAISE: PraiseEntry[] = [
  {
    quote:
      'Just watched @1kevgriff presentation on "Building MCP Servers in .NET" at #TechBash; probably the most practical/useful session I\'ve attended thus far this year.',
    author: 'Schuylkill Tech Guy',
    handle: '@SchuylkillTech',
    platform: 'X',
    sourceUrl: 'https://x.com/SchuylkillTech/status/2110753961930318157',
    date: '2026-10-15',
    event: 'TechBash 2026',
    talk: 'Building MCP Servers in .NET',
  },
];

// ---- Derived helpers ----

/** Total number of praise entries */
export const totalPraise = PRAISE.length;

/** Get praise entries sorted by date (newest first) */
export function getPraiseSortedByDate(): PraiseEntry[] {
  return [...PRAISE].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get unique platforms represented in the praise */
export function getUniquePlatforms(): Platform[] {
  return [...new Set(PRAISE.map((p) => p.platform))];
}

/** Get unique events mentioned in the praise */
export function getUniqueEvents(): string[] {
  return [...new Set(PRAISE.filter((p) => p.event).map((p) => p.event!))];
}
