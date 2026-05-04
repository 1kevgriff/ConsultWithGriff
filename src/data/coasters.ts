// Coaster credits data
// Source of truth for the /coasters page. Edit this file to add/update credits.
//
// To add a credit: find the right park (or add a new one), append to its `rides` array.
// Defunct flag: only set `defunct: true` for rides that no longer operate at the park.
// Milestone: set `milestone` for credits worth highlighting (e.g., 100th credit).

export type RideType = 'steel' | 'wooden' | 'hybrid';

export interface Ride {
  name: string;
  /** Alternate or former name shown as secondary text inside the pill. */
  altName?: string;
  type?: RideType;
  manufacturer?: string;
  /** Year Kevin first rode it. Optional; backfill over time. */
  yearRidden?: number;
  /** Ride no longer operates at this park (closed, removed, retracked, etc.). */
  defunct?: boolean;
  /** Highlight badge text, e.g., "100th". */
  milestone?: string;
}

export interface Park {
  /** URL anchor + React key. Stable identifier. */
  id: string;
  name: string;
  city?: string;
  state: string;
  /** Group key for parks that should display under a parent card (e.g., all WDW parks). */
  parent?: string;
  rides: Ride[];
}

export interface ParentPark {
  id: string;
  name: string;
  city?: string;
  state: string;
}

/** Parks displayed as a single grouped card with sub-sections. */
export const PARENT_PARKS: ParentPark[] = [
  {
    id: 'walt-disney-world',
    name: 'Walt Disney World',
    city: 'Orlando',
    state: 'Florida',
  },
];

export const PARKS: Park[] = [
  {
    id: 'busch-gardens-williamsburg',
    name: 'Busch Gardens Williamsburg',
    city: 'Williamsburg',
    state: 'Virginia',
    rides: [
      { name: 'Loch Ness Monster' },
      { name: 'Big Bad Wolf', defunct: true },
      { name: 'Drachen Fire', defunct: true },
      { name: 'Wild Maus' },
      { name: "Apollo's Chariot" },
      { name: 'Alpengeist' },
      { name: 'Griffon' },
      { name: 'Tempesto' },
      { name: "Grover's Alpine Express" },
      { name: 'Verbolten' },
      { name: 'InvadR' },
      { name: 'Pantheon' },
    ],
  },
  {
    id: 'busch-gardens-tampa',
    name: 'Busch Gardens Tampa',
    city: 'Tampa',
    state: 'Florida',
    rides: [
      { name: 'Iron Gwazi' },
      { name: 'Scorpion' },
      { name: 'Kumba' },
      { name: 'Montu' },
      { name: 'Sand Serpent' },
      { name: 'SheiKra' },
      { name: 'Cheetah Hunt' },
      { name: "Cobra's Curse" },
      { name: 'Tigris' },
    ],
  },
  {
    id: 'seaworld-orlando',
    name: 'SeaWorld',
    city: 'Orlando',
    state: 'Florida',
    rides: [{ name: 'Kraken' }, { name: 'Manta' }, { name: 'Ice Breaker' }, { name: 'Mako' }],
  },
  {
    id: 'kings-dominion',
    name: 'Kings Dominion',
    city: 'Doswell',
    state: 'Virginia',
    rides: [
      { name: 'Apple Zapple' },
      { name: 'Backlot Stunt Coaster' },
      { name: 'Dominator' },
      { name: 'Anaconda' },
      { name: 'Flight of Fear' },
      { name: 'Intimidator 305', altName: 'Project 305' },
      { name: 'Grizzly' },
      { name: 'Avalanche', altName: 'Reptilian' },
      { name: 'Twisted Timbers' },
      { name: 'Hurler' },
      { name: 'Tumbili' },
      { name: 'Hypersonic XLC', defunct: true },
      { name: 'Racer 75 (North)', altName: 'Rebel Yell' },
      { name: 'Racer 75 (South)', altName: 'Rebel Yell' },
      { name: 'Shockwave' },
      { name: 'Volcano: The Blast Coaster', defunct: true },
    ],
  },
  {
    id: 'motorworld',
    name: 'Motorworld',
    city: 'Virginia Beach',
    state: 'Virginia',
    rides: [{ name: 'Crazy Mouse', defunct: true }],
  },
  {
    id: 'dollywood',
    name: 'Dollywood',
    city: 'Pigeon Forge',
    state: 'Tennessee',
    rides: [
      { name: 'Big Bear Mountain' },
      { name: 'Lightning Rod' },
      { name: 'Blazing Fury' },
      { name: 'Wild Eagle' },
      { name: 'Firechaser Express' },
      { name: 'Mystery Mine' },
      { name: 'Tennessee Tornado' },
      { name: 'Thunderhead' },
      { name: 'Dragonflier' },
    ],
  },
  {
    id: 'new-york-new-york',
    name: 'New York-New York',
    city: 'Las Vegas',
    state: 'Nevada',
    rides: [{ name: 'The Big Apple Coaster' }],
  },
  {
    id: 'cedar-point',
    name: 'Cedar Point',
    city: 'Sandusky',
    state: 'Ohio',
    rides: [
      { name: 'Blue Streak' },
      { name: 'Cedar Creek Mine Ride' },
      { name: 'Corkscrew' },
      { name: 'Gatekeeper' },
      { name: 'Gemini', altName: 'Red' },
      { name: 'Iron Dragon' },
      { name: 'Magnum XL-200' },
      { name: 'Maverick' },
      { name: 'Millennium Force' },
      { name: 'Raptor' },
      { name: 'Rougarou' },
      { name: 'Valravn' },
    ],
  },
  {
    id: 'camelback-resort',
    name: 'Camelback Resort',
    city: 'Tannersville',
    state: 'Pennsylvania',
    rides: [{ name: 'Camelback Mountain Coaster' }],
  },
  {
    id: 'disneyland',
    name: 'Disneyland',
    city: 'Anaheim',
    state: 'California',
    rides: [
      { name: 'Big Thunder Mountain Railroad' },
      { name: 'Matterhorn Bobsleds', altName: 'Tomorrowland side' },
      { name: 'Space Mountain' },
    ],
  },
  {
    id: 'wdw-magic-kingdom',
    name: 'Magic Kingdom',
    state: 'Florida',
    parent: 'walt-disney-world',
    rides: [
      { name: 'Space Mountain', altName: 'Alpha track' },
      { name: 'Space Mountain', altName: 'Omega track' },
      { name: 'Big Thunder Mountain Railroad' },
    ],
  },
  {
    id: 'wdw-hollywood-studios',
    name: 'Hollywood Studios',
    state: 'Florida',
    parent: 'walt-disney-world',
    rides: [{ name: "Rock 'n' Roller Coaster" }],
  },
  {
    id: 'wdw-animal-kingdom',
    name: 'Animal Kingdom',
    state: 'Florida',
    parent: 'walt-disney-world',
    rides: [{ name: 'Expedition Everest' }],
  },
  {
    id: 'universal-studios',
    name: 'Universal Studios',
    city: 'Orlando',
    state: 'Florida',
    rides: [
      { name: 'Harry Potter and the Escape from Gringotts' },
      { name: 'Hollywood Rip Ride Rockit' },
      { name: 'Revenge of the Mummy' },
      { name: "Woody Woodpecker's Nuthouse Coaster", altName: 'Trolls Trollercoaster' },
    ],
  },
  {
    id: 'universal-islands-of-adventure',
    name: "Universal's Islands of Adventure",
    city: 'Orlando',
    state: 'Florida',
    rides: [
      { name: 'Flight of the Hippogriff' },
      { name: "Hagrid's Magical Creatures Motorbike Adventure" },
      { name: 'The Incredible Hulk Coaster' },
      { name: 'VelociCoaster' },
      { name: 'Pteranodon Flyers' },
    ],
  },
  {
    id: 'worlds-of-fun',
    name: 'Worlds of Fun',
    city: 'Kansas City',
    state: 'Missouri',
    rides: [
      { name: 'Mamba' },
      { name: 'Patriot' },
      { name: 'Prowler' },
      { name: 'Timber Wolf' },
      { name: 'Zambezi Zinger', yearRidden: 2023 },
    ],
  },
  {
    id: 'six-flags-america',
    name: 'Six Flags America',
    city: 'Bowie',
    state: 'Maryland',
    rides: [
      { name: 'Firebird' },
      { name: "Joker's Jinx" },
      { name: "Professor Screamore's SkyWinder" },
      { name: "Ragin' Cajun" },
      { name: 'Roar' },
      { name: 'Superman - Ride of Steel' },
      { name: 'Wild One' },
    ],
  },
  {
    id: 'kings-island',
    name: 'Kings Island',
    city: 'Mason',
    state: 'Ohio',
    rides: [
      { name: 'The Beast', milestone: '100th' },
      { name: 'Banshee' },
      { name: 'Diamondback' },
      { name: 'Orion' },
      { name: 'Adventure Express' },
      { name: 'Racer', altName: 'Red' },
      { name: 'Racer', altName: 'Blue' },
      { name: 'Queen City Stunt Coaster' },
      { name: 'Woodstock Express' },
      { name: 'The Bat' },
      { name: 'Mystic Timbers' },
      { name: "Snoopy's Soap Box Racers" },
      { name: 'Invertigo' },
      { name: 'Flight of Fear' },
    ],
  },
];

// ---- Derived helpers ----

export const totalCredits = PARKS.reduce((sum, p) => sum + p.rides.length, 0);

export const totalParks = PARKS.length;

export const totalStates = new Set(PARKS.map((p) => p.state)).size;

export const operatingCredits = PARKS.reduce(
  (sum, p) => sum + p.rides.filter((r) => !r.defunct).length,
  0
);

/** Park with the most credits. */
export const topPark = [...PARKS].sort((a, b) => b.rides.length - a.rides.length)[0];

/** Find the milestone ride and the park it belongs to, if any. */
export function getMilestoneRide(milestone: string) {
  for (const park of PARKS) {
    const ride = park.rides.find((r) => r.milestone === milestone);
    if (ride) return { ride, park };
  }
  return null;
}

/**
 * Group parks for display: parents bundle their children, top-level parks stand alone.
 * Returned in display order, sorted by total ride count descending.
 */
export interface DisplayGroup {
  id: string;
  name: string;
  location: string;
  totalRides: number;
  /** For grouped parents like WDW; otherwise [single park]. */
  parks: Park[];
  /** True when this group represents a multi-park parent (e.g., Walt Disney World). */
  isParent: boolean;
}

export function getDisplayGroups(): DisplayGroup[] {
  const groups: DisplayGroup[] = [];

  // Parent groups
  for (const parent of PARENT_PARKS) {
    const children = PARKS.filter((p) => p.parent === parent.id);
    if (children.length === 0) continue;
    groups.push({
      id: parent.id,
      name: parent.name,
      location: [parent.city, parent.state].filter(Boolean).join(', '),
      totalRides: children.reduce((sum, p) => sum + p.rides.length, 0),
      parks: children,
      isParent: true,
    });
  }

  // Standalone parks (no parent)
  for (const park of PARKS) {
    if (park.parent) continue;
    groups.push({
      id: park.id,
      name: park.name,
      location: [park.city, park.state].filter(Boolean).join(', '),
      totalRides: park.rides.length,
      parks: [park],
      isParent: false,
    });
  }

  groups.sort((a, b) => b.totalRides - a.totalRides);
  return groups;
}
