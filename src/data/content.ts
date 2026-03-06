// Type definitions and data for the Content section

export interface PodcastEpisode {
  number: number;
  title: string;
  date: string;
  guest?: string;
  url: string;
}

export interface PodcastShow {
  slug: string;
  name: string;
  description: string;
  role: 'host' | 'co-host';
  websiteUrl: string;
  status: 'active' | 'defunct';
  episodeCount: number;
  episodes: PodcastEpisode[];
}

export interface PodcastAppearance {
  podcastName: string;
  episodeTitle: string;
  date: string;
  url: string;
}

export interface YouTubeAppearance {
  channelName: string;
  title: string;
  date: string;
  url: string;
  videoId: string;
}

// ============================================================
// PODCAST SHOWS
// ============================================================

export const podcastShows: PodcastShow[] = [
  {
    slug: 'multithreaded-income',
    name: 'Multithreaded Income Podcast',
    description:
      'A podcast exploring multiple income streams as a technologist. Unconventional strategies, untapped opportunities, and actionable advice for developers looking to diversify their revenue.',
    role: 'host',
    websiteUrl: 'https://podcast.multithreadedincome.com',
    status: 'defunct',
    episodeCount: 44,
    episodes: [
      {
        number: 45,
        title: 'Rolling in the Code',
        date: '2024-08-13',
        guest: 'Kiah Imani',
        url: 'https://podcast.multithreadedincome.com/episodes/rolling-in-the-code-multithreaded-income-episode-45-with-kiah-imani',
      },
      {
        number: 44,
        title: 'Technology and Friends Interview',
        date: '2024-07-23',
        url: 'https://podcast.multithreadedincome.com/episodes/technology-and-friends-interview-multithreaded-income-episode-44',
      },
      {
        number: 43,
        title: 'Luck Surface Area',
        date: '2024-07-16',
        guest: 'Aaron Francis',
        url: 'https://podcast.multithreadedincome.com/episodes/luck-surface-area-multithreaded-income-episode-43-with-aaron-francis',
      },
      {
        number: 42,
        title: 'Jamie Had A Social Opinion',
        date: '2024-06-18',
        guest: 'Jamie Maguire',
        url: 'https://podcast.multithreadedincome.com/episodes/jamie-had-a-social-opinion-multithreaded-income-episode-42-with-jamie-maguire-transistor',
      },
      {
        number: 41,
        title: 'Action Over Inspiration',
        date: '2024-06-11',
        url: 'https://podcast.multithreadedincome.com/episodes/action-over-inspiration-multithreaded-income-episode-41',
      },
      {
        number: 40,
        title: 'Make Money from People With Money',
        date: '2024-05-21',
        guest: 'Tessa Kriesel',
        url: 'https://podcast.multithreadedincome.com/episodes/make-money-from-people-with-money-multithreaded-income-episode-40-with-tessa-kriesel',
      },
      {
        number: 39,
        title: "Let's Talk About Insurance",
        date: '2024-05-14',
        url: 'https://podcast.multithreadedincome.com/episodes/let-s-talk-about-insurance-multithreaded-income-episode-39',
      },
      {
        number: 38,
        title: 'The Business of Conferences',
        date: '2024-05-07',
        guest: 'Clark Sell',
        url: 'https://podcast.multithreadedincome.com/episodes/the-business-of-conferences-multithreaded-income-episode-38-with-clark-sell',
      },
      {
        number: 37,
        title: 'Do You Need A Master Services Agreement',
        date: '2024-04-30',
        url: 'https://podcast.multithreadedincome.com/episodes/do-you-need-a-master-services-agreement-multithreaded-income-episode-37',
      },
      {
        number: 36,
        title: 'Software As An Art',
        date: '2024-04-23',
        guest: 'Jamie Wright',
        url: 'https://podcast.multithreadedincome.com/episodes/software-as-an-art-multithreaded-income-episode-36-with-jamie-wright',
      },
      {
        number: 35,
        title: 'Multithreaded Creators',
        date: '2024-04-02',
        guest: 'Michael Rollins',
        url: 'https://podcast.multithreadedincome.com/episodes/multithreaded-creators-multithreaded-income-episode-35-with-michael-rollins',
      },
      {
        number: 34,
        title: 'Keeping Time with StageTimer',
        date: '2024-03-19',
        guest: 'Lukas Hermann',
        url: 'https://podcast.multithreadedincome.com/episodes/keeping-time-with-stagetimer-multithreaded-income-episode-34-with-lukas-hermann',
      },
      {
        number: 33,
        title: 'You Need A Vacation',
        date: '2024-03-12',
        url: 'https://podcast.multithreadedincome.com/episodes/you-need-a-vacation-multithreaded-income-episode-33',
      },
      {
        number: 32,
        title: 'Forks in the Road',
        date: '2024-03-05',
        guest: 'Sarah Shook',
        url: 'https://podcast.multithreadedincome.com/episodes/forks-in-the-road-multithreaded-income-episode-32-with-sarah-shook',
      },
      {
        number: 31,
        title: 'Leaving Apple and Going All In On Speakflow',
        date: '2024-02-27',
        guest: 'Corey Griffin',
        url: 'https://podcast.multithreadedincome.com/episodes/leaving-apple-and-going-all-in-on-speakflow-multithreaded-income-episode-31-with-corey-griffin',
      },
      {
        number: 30,
        title: 'The 20 Mile March',
        date: '2024-02-20',
        guest: 'Brian Gorman',
        url: 'https://podcast.multithreadedincome.com/episodes/the-20-mile-march-multithreaded-income-episode-30-with-brian-gorman',
      },
      {
        number: 29,
        title: 'Developing Tools for Web Developers',
        date: '2024-02-13',
        guest: 'Kilian Valkhof',
        url: 'https://podcast.multithreadedincome.com/episodes/developing-tools-for-web-developers-multithreaded-income-episode-29-with-kilian-valkhof',
      },
      {
        number: 28,
        title: 'Concurrently Asynchronous',
        date: '2024-02-06',
        guest: 'Stephen Cleary',
        url: 'https://podcast.multithreadedincome.com/episodes/concurrently-asynchronous-multithreaded-income-episode-28-with-stephen-cleary',
      },
      {
        number: 27,
        title: 'How Developers Can Achieve Parallel Success',
        date: '2024-01-30',
        url: 'https://podcast.multithreadedincome.com/episodes/how-developers-can-achieve-parallel-success-multithreaded-income-episode-27-from-codemash-2024',
      },
      {
        number: 26,
        title: 'Army Vet to Software Tech',
        date: '2024-01-23',
        guest: 'Joshua Berrios',
        url: 'https://podcast.multithreadedincome.com/episodes/army-vet-to-software-tech-multithreaded-income-episode-26-with-joshua-berrios-6a1b5eea-f6f3-4cec-b87d-d091d8a1457c',
      },
      {
        number: 25,
        title: 'Exploring the Market for Freelancing',
        date: '2024-01-16',
        guest: 'Scott Eastin',
        url: 'https://podcast.multithreadedincome.com/episodes/exploring-the-market-for-freelancing-multithreaded-income-episode-25-with-scott-eastin',
      },
      // Episode 24 was removed per guest request
      {
        number: 23,
        title: 'Leaving the Dev Community a Better Place',
        date: '2024-01-02',
        guest: 'Tim Corey',
        url: 'https://podcast.multithreadedincome.com/episodes/leaving-the-dev-community-a-better-place-multithreaded-income-episode-23-with-tim-corey',
      },
      {
        number: 22,
        title: 'From Nimble Pro to Pluralsight Juggernaut',
        date: '2023-12-19',
        guest: 'Steve Smith',
        url: 'https://podcast.multithreadedincome.com/episodes/from-nimble-pro-to-pluralsight-juggernaut-multithreaded-income-episode-22-with-steve-smith',
      },
      {
        number: 21,
        title: 'Social Proofing Your Career',
        date: '2023-12-12',
        guest: 'Taylor Desseyn',
        url: 'https://podcast.multithreadedincome.com/episodes/social-proofing-your-career-multithreaded-income-episode-21-with-taylor-desseyn',
      },
      {
        number: 20,
        title: 'From Paying for Daycare to Deploying Empathy',
        date: '2023-12-05',
        guest: 'Michele Hansen',
        url: 'https://podcast.multithreadedincome.com/episodes/from-paying-for-daycare-to-deploying-empathy-multithreaded-income-episode-20-with-michele-hansen',
      },
      {
        number: 19,
        title: 'Shopping Your Own Book Proposals',
        date: '2023-11-28',
        guest: 'Matt Eland',
        url: 'https://podcast.multithreadedincome.com/episodes/shopping-your-own-book-proposals-multithreaded-income-podcast-episode-19-with-matt-eland',
      },
      {
        number: 18,
        title: 'Tech Books for Fun and Little Profit',
        date: '2023-11-21',
        guest: 'Alvin Ashcraft',
        url: 'https://podcast.multithreadedincome.com/episodes/tech-books-for-fun-and-little-profit-multithreaded-income-episode-18-with-alvin-ashcraft',
      },
      {
        number: 17,
        title: 'Knowing When to Pull the Plug',
        date: '2023-11-16',
        url: 'https://podcast.multithreadedincome.com/episodes/knowing-when-to-pull-the-plug-multithreaded-income-episode-17',
      },
      {
        number: 16,
        title: 'Searching for SAAS',
        date: '2023-11-14',
        guest: 'Nate Bosscher',
        url: 'https://podcast.multithreadedincome.com/episodes/searching-for-saas-multithreaded-income-episode-16-with-nate-bosscher',
      },
      {
        number: 15,
        title: 'The Mike Project and Stacking the Bricks',
        date: '2023-11-09',
        url: 'https://podcast.multithreadedincome.com/episodes/the-mike-project-and-stacking-the-bricks-multithreaded-income-episode-15',
      },
      {
        number: 14,
        title: "Developers Aren't Allergic to Marketing",
        date: '2023-11-07',
        guest: 'Michael Buckbee',
        url: 'https://podcast.multithreadedincome.com/episodes/developers-arent-allergic-to-marketing-multithreaded-income-episode-14-with-michael-buckbee',
      },
      {
        number: 13,
        title: 'Controlling Your Narrative',
        date: '2023-11-02',
        url: 'https://podcast.multithreadedincome.com/episodes/controlling-your-narrative-multithreaded-income-episode-13',
      },
      {
        number: 12,
        title: 'How to Get Paid for Speaking',
        date: '2023-10-31',
        guest: 'James Q. Quick',
        url: 'https://podcast.multithreadedincome.com/episodes/how-to-get-paid-for-speaking-multithreaded-income-episode-12-with-james-q-quick',
      },
      {
        number: 11,
        title: 'How to Get Clients for Your Software Company',
        date: '2023-10-26',
        url: 'https://podcast.multithreadedincome.com/episodes/how-to-get-clients-for-your-software-company-multithreaded-income-episode-11',
      },
      {
        number: 10,
        title: 'How to Earn Money for Drawing',
        date: '2023-10-24',
        guest: 'David Neal',
        url: 'https://podcast.multithreadedincome.com/episodes/how-to-earn-money-for-drawing-multithreaded-income-episode-10-with-david-neal',
      },
      {
        number: 9,
        title: 'Digital Etsy Store',
        date: '2023-10-19',
        url: 'https://podcast.multithreadedincome.com/episodes/digital-etsy-store-multithreaded-income-episode-9',
      },
      {
        number: 8,
        title: 'Selling Digital Products Online',
        date: '2023-10-17',
        guest: 'Margaret Reffell',
        url: 'https://podcast.multithreadedincome.com/episodes/selling-digital-products-online-multithreaded-income-episode-8-with-margaret-reffell',
      },
      {
        number: 7,
        title: 'Picking a Side Gig',
        date: '2023-10-12',
        url: 'https://podcast.multithreadedincome.com/episodes/picking-a-side-gig-multithreaded-income-episode-7',
      },
      {
        number: 6,
        title: 'How to Become a Tech Content Creator',
        date: '2023-10-10',
        guest: 'Bret Fisher',
        url: 'https://podcast.multithreadedincome.com/episodes/how-to-become-a-tech-content-creator-multithreaded-income-episode-6-with-bret-fisher',
      },
      {
        number: 5,
        title: 'Talent Marketplaces',
        date: '2023-10-05',
        url: 'https://podcast.multithreadedincome.com/episodes/talent-marketplaces-multithreaded-income-episode-5',
      },
      {
        number: 4,
        title: 'How to Find Freelance Software Work',
        date: '2023-10-03',
        guest: 'Giorgi Dalakishvili',
        url: 'https://podcast.multithreadedincome.com/episodes/how-to-find-freelance-software-work-multithreaded-income-episode-4-with-giorgi-dalakishvili',
      },
      {
        number: 3,
        title: 'Planning for Retirement',
        date: '2023-09-23',
        url: 'https://podcast.multithreadedincome.com/episodes/planning-for-retirement-multithreaded-income-episode-3',
      },
      {
        number: 2,
        title: 'How to Escape Your 9-5 Job',
        date: '2023-09-23',
        guest: 'Dave Ceddia',
        url: 'https://podcast.multithreadedincome.com/episodes/how-to-escape-your-9-5-job-multithreaded-income-episode-2-with-dave-ceddia',
      },
      {
        number: 1,
        title: 'How to Make Extra Money as a Software Developer',
        date: '2023-09-23',
        url: 'https://podcast.multithreadedincome.com/episodes/how-to-make-extra-money-as-a-software-developer-multithreaded-income-episode-1',
      },
    ],
  },
];

// Future content types
export const podcastAppearances: PodcastAppearance[] = [];
export const youtubeAppearances: YouTubeAppearance[] = [];
