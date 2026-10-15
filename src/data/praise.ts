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
}

export const PRAISE: PraiseEntry[] = [
  // 2026
  {
    quote:
      'Just watched @1kevgriff presentation on "Building MCP Servers in .NET" at #TechBash; probably the most practical/useful session I\'ve attended thus far this year.',
    author: 'Schuylkill Tech Guy',
    handle: '@SchuylkillTech',
    platform: 'X',
    sourceUrl: 'https://x.com/SchuylkillTech/status/2110753961930318157',
    date: '2026-10-15',
    event: 'TechBash 2026 – Building MCP Servers in .NET',
  },
  {
    quote:
      'Had a great time chatting with @consultwithgriff.com on @coffeeandopensource.com today about all kinds of #tech topics. Video is live on YouTube and podcast is available wherever you find them. Take a look/listen and thanks!\nhttps://www.coffeeandopensource.com/guest/kevin-griffin.html',
    author: 'Isaac Levin',
    handle: '@isaacrlevin.com',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/isaacrlevin.com/post/3msbwihh67a2y',
    date: '2026-08-04',
    event: 'Coffee and Open Source podcast',
  },
  {
    quote:
      'Lunch at HTML Day is covered by RevolutionVA 🎉\n\nAug 8 now comes with space from ECPI, coffee and pastries from Val Town, and lunch. Just bring a laptop.\n\nThanks @consultwithgriff.com for making it happen.\n\nSat Aug 8, 10am-2pm · Virginia Beach\n\nLinks in next post.',
    author: 'Ryan McGovern',
    handle: '@tekgadgt.dev',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/tekgadgt.dev/post/3mruzxtyoz22h',
    date: '2026-07-30',
    event: 'HTML Day 2026 / RevolutionVA',
  },
  {
    quote:
      'Lunch at HTML Day is covered by RevolutionVA 🎉\n\nAug 8 is now: space from ECPI, coffee + pastries from Val Town, lunch from RevolutionVA. Just bring a laptop.\n\nThanks @1kevgriff for making it happen.\n\n📅 Sat Aug 8, 10am-2pm, Virginia Beach\n\nLink in next post.',
    author: 'Ryan McGovern',
    handle: '@tekgadgt',
    platform: 'X',
    sourceUrl: 'https://x.com/tekgadgt/status/2082891116244865451',
    date: '2026-07-30',
    event: 'HTML Day 2026 / RevolutionVA',
  },
  {
    quote:
      'C# Strings Silently Kill Your SQL Server Indexes in Dapper\n\nhttps://consultwithgriff.com/dapper-nvarchar-implicit-conversion-performance-trap\n\nThis is huge. #Programming #Dev',
    author: 'Nistal Talson',
    handle: '@niztal.bsky.social',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/niztal.bsky.social/post/3mggi74qq6y2h',
    date: '2026-03-06',
    event: 'Blog post – Dapper nvarchar',
  },
  // 2025
  {
    quote: 'Nice post on Extension Members by @consultwithgriff.com',
    author: 'Joseph Guadagno',
    handle: '@jguadagno.com',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/jguadagno.com/post/3m7kw6xmzlk2x',
    date: '2025-12-09',
    event: 'C# Advent 2025 – Extension Members blog post',
  },
  {
    quote:
      'State of the @dotnetfoundation.org with @consultwithgriff.com !\n\nThere\'s no better time to be a .NET Developer \\o/\n\n#dotNETConf',
    author: 'Jeremy Sinclair #ฺNET',
    handle: '@sinclairinat0r.com',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/sinclairinat0r.com/post/3m5jxe2tzws2y',
    date: '2025-11-13',
    event: '.NET Conf 2025 – State of the .NET Foundation',
  },
  {
    quote:
      'Crazy web performance with Azure static web apps. Fantastic talk by @1kevgriff at @CommitYourCode - great demo - deploying updates live! 😳\n#CYC25 https://t.co/H7H1O4KMEP',
    author: 'Caleb Jenkins',
    handle: '@CalebJenkins',
    platform: 'X',
    sourceUrl: 'https://x.com/CalebJenkins/status/1971661769086325202',
    date: '2025-09-26',
    event: 'Commit Your Code 2025 – Azure Static Web Apps',
  },
  {
    quote: 'always a pleasure hanging with the LEGEND @consultwithgriff.com',
    author: 'taylor desseyn',
    handle: '@tdesseyn.bsky.social',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/tdesseyn.bsky.social/post/3luq4aphkc22a',
    date: '2025-07-24',
  },
  {
    quote:
      "I'm so excited that @consultwithgriff.com is driving up from Virginia Beach to present to the CapArea User Group tonight. If you're in the Northern VA / DC area you should absolutely swing by and say hi: www.meetup.com/caparea-net/...",
    author: 'Lee Richardson',
    handle: '@leerichardson.com',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/leerichardson.com/post/3lqpedlpxpk26',
    date: '2025-06-03',
    event: 'CapArea .NET User Group 2025',
  },
  // 2024
  {
    quote:
      "So many great people at the #CommitYourCode Conference.\n\nHere's two of my fave:\n\nThanks for helping to make this community great, @aaronfrancis.com && @consultwithgriff.com!",
    author: 'Braydon Coyer',
    handle: '@braydoncoyer.dev',
    platform: 'Bluesky',
    sourceUrl: 'https://bsky.app/profile/braydoncoyer.dev/post/3lcnopmxpek2u',
    date: '2024-12-06',
    event: 'Commit Your Code 2024 (community)',
  },
  {
    quote:
      'Excited to be speaking at DevFest today! Folks who came to my "Art of Web Defense" online workshop last week got a sneak peek of the talk I\'ll give today.\n\n@1kevgriff has organized a terrific lineup of speakers so I\'m going to do my best to try and deliver. Wish me luck!',
    author: 'Michael Buckbee',
    handle: '@mbuckbee',
    platform: 'X',
    sourceUrl: 'https://x.com/mbuckbee/status/1796491925748641980',
    date: '2024-05-31',
    event: 'Hampton Roads DevFest 2024 (organizer)',
  },
  // 2023
  {
    quote:
      'i absolutely LOVED hanging with @1kevgriff on his podcast on social proofing you career and why social media is your best friend when it comes to starting up other incomes! https://t.co/l92uOrI0L7',
    author: 'taylor desseyn',
    handle: '@tdesseyn',
    platform: 'X',
    sourceUrl: 'https://x.com/tdesseyn/status/1734641049736294731',
    date: '2023-12-12',
    event: "Kevin's podcast (Multithreaded Income)",
  },
  {
    quote:
      'I can highly recommend both of these books. Especially the SignalR on .NET 6 one.\n\nCombined with @1kevgriff course on Udemy feeling like a SignalR pro. https://t.co/DMneH4isg9',
    author: 'James Eastham',
    handle: '@plantpowerjames',
    platform: 'X',
    sourceUrl: 'https://x.com/plantpowerjames/status/1710658113957700084',
    date: '2023-10-07',
    event: 'Udemy SignalR course',
  },
  {
    quote:
      "@1kevgriff I enjoyed your presentation to the @CapareaDotNet group last night. I wish I could have been there in person but I'm traveling a lot these days. Thanks for taking the time to drive up and share with us all.",
    author: 'Kevin Hazzard',
    handle: '@KevinHazzard',
    platform: 'X',
    sourceUrl: 'https://x.com/KevinHazzard/status/1674085559231193089',
    date: '2023-06-28',
    event: 'CapArea .NET User Group 2023',
  },
  // 2022
  {
    quote:
      '@1kevgriff Loved your Jetbrains - Dapper presentation. You mentioned pulling SQL strings into a separate class. What have you found works best for your variable naming convention?',
    author: 'Nigel Stratton 🇺🇦',
    handle: '@nigelstratton',
    platform: 'X',
    sourceUrl: 'https://x.com/nigelstratton/status/1534287285298266112',
    date: '2022-06-07',
    event: 'JetBrains webinar – Dapper',
  },
  {
    quote:
      'Amazing session by @1kevgriff and @kendallmiller at #CodeMash. Back to back sessions of great content!...',
    author: 'Chris Houdeshell',
    handle: '@choudeshell',
    platform: 'X',
    sourceUrl: 'https://x.com/choudeshell/status/1481390883903840260',
    date: '2022-01-12',
    event: 'CodeMash 2022',
  },
  // 2021
  {
    quote: '@1kevgriff @jetbrains ALL great tips for #aspnetcore folks! Loved it! Great job!',
    author: 'Jonathan "JD" Danylko (also on fosstodon.org/bsky)',
    handle: '@jdanylko',
    platform: 'X',
    sourceUrl: 'https://x.com/jdanylko/status/1423308921356312576',
    date: '2021-08-05',
    event: 'JetBrains webinar – ASP.NET Core tips',
  },
  // 2020
  {
    quote: '@1kevgriff  best presentation ever!',
    author: 'Brian Hastings',
    handle: '@B_1066',
    platform: 'X',
    sourceUrl: 'https://x.com/B_1066/status/1290788628537446402',
    date: '2020-08-04',
  },
  {
    quote:
      'It was a great meetup tonight. Thanks @1kevgriff for an awesome talk! https://t.co/ZSFH8JD7cD',
    author: 'Veronika Kolesnikova',
    handle: '@veronika_dev1',
    platform: 'X',
    sourceUrl: 'https://x.com/veronika_dev1/status/1260717987826487296',
    date: '2020-05-13',
    event: 'Meetup talk, May 2020',
  },
  {
    quote: '@1kevgriff is doing a great job teaching us about azure logic apps',
    author: 'Maura',
    handle: '@squdgy',
    platform: 'X',
    sourceUrl: 'https://x.com/squdgy/status/1260704765199220737',
    date: '2020-05-13',
    event: 'Meetup talk May 2020 – Azure Logic Apps',
  },
  {
    quote:
      'Shout out @1kevgriff for talking me into finally trying out Dapper. Super clean and easy, especially with Dapper Contrib.',
    author: 'NotAMorningPerson™',
    handle: '@joelcochran',
    platform: 'X',
    sourceUrl: 'https://x.com/joelcochran/status/1215036454558216195',
    date: '2020-01-08',
    event: 'Dapper advocacy',
  },
  // 2019
  {
    quote:
      'Props to @1kevgriff for a great talk about moving from https://t.co/NefBbSnUNt to https://t.co/NefBbSnUNt Core. #Codestock',
    author: 'NotAMorningPerson™',
    handle: '@joelcochran',
    platform: 'X',
    sourceUrl: 'https://x.com/joelcochran/status/1116783699251683328',
    date: '2019-04-12',
    event: 'CodeStock 2019 – Moving to ASP.NET Core',
  },
  // 2018
  {
    quote:
      '@brendoneus @ardalis @CanadianJames @cc_jonknapp @guyroyse @1kevgriff @MaximRouiller @Poly_Sigh @sdw_de @stimms It was amazing that after 5 hours of collaboration and coding the game was functional and looked awesome. Thanks for the great experience! @code live share is great.',
    author: 'Tosho Toshev',
    handle: '@Cracker4o',
    platform: 'X',
    sourceUrl: 'https://x.com/Cracker4o/status/1075897709918212096',
    date: '2018-12-20',
    event: 'Live share game coding session 2018',
  },
  {
    quote:
      "We're so excited to have been on the 2 Frugal Dudes Podcast! @1kevgriff and @seanmerron are fantastic hosts and we highly recommend not only our episode, but all of them! #ScrewTheAverage #BeAnOutlier #Frugal #Finance #Travel @2frugaldudes  https://t.co/01IRGAq3yK",
    author: 'ScrewTheAverage',
    handle: '@ScrewTheAverage',
    platform: 'X',
    sourceUrl: 'https://x.com/ScrewTheAverage/status/1047940785163915267',
    date: '2018-10-04',
    event: '2 Frugal Dudes Podcast',
  },
  {
    quote:
      '@43BlueDoors @1kevgriff @seanmerron @2frugaldudes I subscribed to their podcast when you mentioned them in your blog months ago. I just listened to the interview this morning and really enjoyed it.',
    author: 'Julie',
    handle: '@JulieLDexter',
    platform: 'X',
    sourceUrl: 'https://x.com/JulieLDexter/status/1040366319961604103',
    date: '2018-09-13',
    event: '2 Frugal Dudes Podcast',
  },
  {
    quote:
      'Thanks @revconf organizers @1kevgriff @lynnaloo @alexproaps @keithprivette @taylorka! Well-run conference with local feel, national draw! #Revconf - great way for #development team to meet people, help refine what we do, learn new ways to think about our products. https://t.co/gcUCrD7OjI',
    author: 'xTuple',
    handle: '@xTuple',
    platform: 'X',
    sourceUrl: 'https://x.com/xTuple/status/998571133262860288',
    date: '2018-05-21',
    event: 'RevolutionConf 2018 (organizer)',
  },
  {
    quote:
      'Thanks @revconf organizers @1kevgriff @lynnaloo @alexproaps @keithprivette @taylorka for amazing 2018 #RevConf 👍🏼 from our #development team - hopefully next year @joshcfischer & Andrey Mikheychik can talk about building a #B2B #eCommerce platform using @Drupal https://t.co/27V0p6JNGZ',
    author: 'xTupleB2B',
    handle: '@xTupleB2B',
    platform: 'X',
    sourceUrl: 'https://x.com/xTupleB2B/status/998589787119456258',
    date: '2018-05-21',
    event: 'RevolutionConf 2018 (organizer)',
  },
  {
    quote:
      'Thanks @1kevgriff , @lynnaloo ,@keithprivette and the rest of the @revconf organizers and team for selecting me to give a workshop about one of my favorite topics @xamarinhq!  The attendees were/are awesome! Had a wonderful time. You guys rock! #revconf',
    author: 'Richard L Taylor Jr - @rightincode@mastodon.world',
    handle: '@rightincode',
    platform: 'X',
    sourceUrl: 'https://x.com/rightincode/status/997609650718674950',
    date: '2018-05-18',
    event: 'RevolutionConf 2018 (organizer)',
  },
  // 2017
  {
    quote:
      '@1kevgriff I loved your Quick Wins talk at #Techbash last week. Any chance we could get the slides? My notes have a few holes. :)',
    author: 'Branden Simbeck',
    handle: '@bsimbeck',
    platform: 'X',
    sourceUrl: 'https://x.com/bsimbeck/status/918112628597280769',
    date: '2017-10-11',
    event: 'TechBash 2017 – Quick Wins',
  },
  {
    quote:
      "I can't say enough about the awesome #RevConf assembled by @1kevgriff @lynnaloo @erikpmp! Great time with a great community! #ThanksYall 😄🎉",
    author: 'Kevin Old',
    handle: '@kevinold',
    platform: 'X',
    sourceUrl: 'https://x.com/kevinold/status/870780776815710209',
    date: '2017-06-02',
    event: 'RevolutionConf 2017 (organizer)',
  },
  {
    quote:
      "Thanks for an awesome time and inviting me to speak at @revconf, @lynnaloo, @erikpmp, and @1kevgriff. Let's do it next year! ✌🏻 #RevConf",
    author: 'Chris D 🛸👣👻',
    handle: '@saltnburnem',
    platform: 'X',
    sourceUrl: 'https://x.com/saltnburnem/status/870752765861134336',
    date: '2017-06-02',
    event: 'RevolutionConf 2017 (organizer)',
  },
  // 2016
  {
    quote:
      'Great #revconf planning session with @1kevgriff  and @lynnaloo. It\'s going to be amazing!',
    author: 'Erik J. Olson',
    handle: '@iamerikjolson',
    platform: 'X',
    sourceUrl: 'https://x.com/iamerikjolson/status/784388396437372928',
    date: '2016-10-07',
    event: 'RevConf 2017 planning',
  },
  {
    quote:
      'Thanks @lynnaloo, @1kevgriff and @erikpmp for making RevolutionConf a reality. It will be awesome. https://t.co/2GmlniU1lL #revconf #devlife',
    author: 'Bret Fisher',
    handle: '@BretFisher',
    platform: 'X',
    sourceUrl: 'https://x.com/BretFisher/status/700740894383857664',
    date: '2016-02-19',
    event: 'RevolutionConf 2016 (organizer)',
  },
  // 2015
  {
    quote:
      'Gotta shout out to @1kevgriff, @kewlniss, and @bugbytesinc. Very grateful for their encouragement and support. Thanks, guys!',
    author: 'G. Andrew Duthie',
    handle: '@devhammer',
    platform: 'X',
    sourceUrl: 'https://x.com/devhammer/status/663946405367685120',
    date: '2015-11-10',
    event: 'Mentorship/encouragement',
  },
  {
    quote: '@1kevgriff Yessir. You did a great job. Thanks for presenting',
    author: 'Clint Patterson',
    handle: '@CBPSC',
    platform: 'X',
    sourceUrl: 'https://x.com/CBPSC/status/607327670414786560',
    date: '2015-06-06',
    event: 'Talk, June 2015',
  },
  {
    quote:
      'GREAT talk by @1kevgriff on "http://t.co/v1YW9s0wHz Performance Tips and Tricks" http://t.co/6IPobHLUmC #codemash',
    author: 'Cori Drew',
    handle: '@coridrew',
    platform: 'X',
    sourceUrl: 'https://x.com/coridrew/status/553557753881317376',
    date: '2015-01-09',
    event: 'CodeMash 2015 – ASP.NET Performance Tips and Tricks',
  },
  // 2014
  {
    quote:
      '@1kevgriff hoping you\'ll have a link to slides for your talk on JS promises. Enjoyed your talk on #SignalR at #CodeStock #CodeStock214',
    author: 'Joel',
    handle: '@joelmdev',
    platform: 'X',
    sourceUrl: 'https://x.com/joelmdev/status/487654711370448897',
    date: '2014-07-11',
    event: 'CodeStock 2014 – SignalR',
  },
  // 2013
  {
    quote: 'Big shout out to @1kevgriff for speaking at #NODECEMBER cc/ @1776dc',
    author: 'Frank La Vigne',
    handle: '@FrankDigsData',
    platform: 'X',
    sourceUrl: 'https://x.com/FrankDigsData/status/409362110901399552',
    date: '2013-12-07',
    event: '#NODECEMBER 2013 at 1776 DC',
  },
  {
    quote: '@1kevgriff great job on your #SignalR presentation this morning! #devLink',
    author: 'Danny Warren',
    handle: '@dannydwarren',
    platform: 'X',
    sourceUrl: 'https://x.com/dannydwarren/status/372764881621352449',
    date: '2013-08-28',
    event: 'devLink 2013 – SignalR',
  },
  {
    quote:
      "Today's Signalr talk by @1kevgriff was awesome. Has me rethinking ad-hoc RESTful APIs. What a fun interactive session! #cpl13",
    author: 'Cory House',
    handle: '@housecor',
    platform: 'X',
    sourceUrl: 'https://x.com/housecor/status/328329600721641472',
    date: '2013-04-28',
    event: 'Code PaLOUsa 2013 (#cpl13, likely) – SignalR',
  },
  {
    quote: '@1kevgriff #codemash great session!! Hope to see you at MadExpo!!',
    author: 'Abbey Gwayambadde',
    handle: '@SysDesignAbbey',
    platform: 'X',
    sourceUrl: 'https://x.com/SysDesignAbbey/status/290109345897783296',
    date: '2013-01-12',
    event: 'CodeMash 2013',
  },
  // 2012
  {
    quote: 'Great #SignalR session by @1kevgriff at #CodeStock ! Thanks!',
    author: 'Richard L Taylor Jr - @rightincode@mastodon.world',
    handle: '@rightincode',
    platform: 'X',
    sourceUrl: 'https://x.com/rightincode/status/214043330114363392',
    date: '2012-06-16',
    event: 'CodeStock 2012 – SignalR',
  },
  {
    quote:
      'Real tome dashboards with @1kevgriff.  Great session ... Interesting topic and engaging presentation.  Best of both worlds. #codestock.',
    author: 'Greg Hale',
    handle: '@bcowl03',
    platform: 'X',
    sourceUrl: 'https://x.com/bcowl03/status/214061170519318529',
    date: '2012-06-16',
    event: 'CodeStock 2012 – Real-time dashboards',
  },
  {
    quote:
      '@1kevgriff great realtime dashboard talk at #CodeStock .  This will help me with my current project!  Thanks!',
    author: 'Richard L Taylor Jr - @rightincode@mastodon.world',
    handle: '@rightincode',
    platform: 'X',
    sourceUrl: 'https://x.com/rightincode/status/214068064076046336',
    date: '2012-06-16',
    event: 'CodeStock 2012 – Real-time dashboards',
  },
  {
    quote: '@1kevgriff #DCDNUG excellent presentation by Kevin on SignalR. Had very good time',
    author: 'Ganesan Muthiah',
    handle: '@gmuthaia',
    platform: 'X',
    sourceUrl: 'https://x.com/gmuthaia/status/192420106981228544',
    date: '2012-04-18',
    event: 'DC .NET User Group 2012 – SignalR',
  },
  {
    quote:
      'Funny smart excellent style @1kevgriff is my new hero what a presentation at cmap!!!',
    author: 'markkloch',
    handle: '@markkloch',
    platform: 'X',
    sourceUrl: 'https://x.com/markkloch/status/167045808678645760',
    date: '2012-02-08',
    event: 'CMAP (Central Maryland Association of .NET Professionals)',
  },
  {
    quote: '@1kevgriff is blowing up the Cmap meeting with the best presentation ever!',
    author: 'markkloch',
    handle: '@markkloch',
    platform: 'X',
    sourceUrl: 'https://x.com/markkloch/status/167043445087670272',
    date: '2012-02-08',
    event: 'CMAP 2012',
  },
  {
    quote: '@1kevgriff I am learning more from this cmap presentation the best slides ever',
    author: 'markkloch',
    handle: '@markkloch',
    platform: 'X',
    sourceUrl: 'https://x.com/markkloch/status/167044175815114753',
    date: '2012-02-08',
    event: 'CMAP 2012',
  },
  // 2011
  {
    quote:
      '@1kevgriff Wish I could make it. I really enjoyed and learned a lot at your #RVNUG jQueryMobile presentation.',
    author: 'Brian C. Lanham',
    handle: '@codesailor',
    platform: 'X',
    sourceUrl: 'https://x.com/codesailor/status/123777044663386112',
    date: '2011-10-11',
    event: 'Richmond .NET User Group – jQuery Mobile',
  },
];

// ---- Derived helpers ----

/** Total number of praise entries */
export const totalPraise = PRAISE.length;

/** Get praise entries sorted by date (newest first) */
export function getPraiseSortedByDate(): PraiseEntry[] {
  return [...PRAISE].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get praise entries grouped by year (newest year first) */
export function getPraiseGroupedByYear(): Map<number, PraiseEntry[]> {
  const grouped = new Map<number, PraiseEntry[]>();
  const sorted = getPraiseSortedByDate();

  for (const entry of sorted) {
    const year = new Date(entry.date).getFullYear();
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(entry);
  }

  return grouped;
}

/** Get unique platforms represented in the praise */
export function getUniquePlatforms(): Platform[] {
  return [...new Set(PRAISE.map((p) => p.platform))];
}

/** Get unique events mentioned in the praise */
export function getUniqueEvents(): string[] {
  return [...new Set(PRAISE.filter((p) => p.event).map((p) => p.event!))];
}
