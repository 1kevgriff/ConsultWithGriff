/**
 * Credential numbers repeated across the site's copy, titles, and JSON-LD.
 *
 * MVP awards are announced each July. Bump MVP_YEARS only once a renewal is
 * confirmed — never derive it from the current date, or a rebuild between
 * January and July would claim an award that hasn't been granted yet.
 *
 * EXPERIENCE_YEARS counts from the start of Kevin's .NET career in 2006.
 *
 * Not covered here: the "16 years" of Azure experience in consulting.astro and
 * faq.astro is a separate number (Azure went GA in 2010) that happens to have
 * collided with the old MVP count. Don't fold it into MVP_YEARS.
 *
 * Astro can't interpolate into markdown frontmatter, so the MVP count in
 * src/content/docs/SignalR-Mastery.md has to be updated by hand.
 */
export const MVP_YEARS = 17;

export const EXPERIENCE_YEARS = 20;

/** "17-time Microsoft MVP" — by far the most repeated phrasing. */
export const MVP_TIME = `${MVP_YEARS}-time Microsoft MVP`;
