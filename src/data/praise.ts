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
 *    - eventInferred: Set to true if event was inferred rather than explicitly stated
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

export type Platform =
  'X' | 'LinkedIn' | 'Bluesky' | 'Mastodon' | 'Email' | 'Sessionize' | 'Blog' | 'Other';

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
  /** True if the event was inferred rather than explicitly stated (optional) */
  eventInferred?: boolean;
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
      "State of the @dotnetfoundation.org with @consultwithgriff.com !\n\nThere's no better time to be a .NET Developer \\o/\n\n#dotNETConf",
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
  {
    quote:
      "Big thanks to Kevin Griffin for an awesome talk at last night's CapArea.Net Users Group meeting at our offices in One Loudoun. We always appreciate your insights and advice on #dotNet, Microsoft, and everything in between.",
    author: 'CapArea .NET Users Group',
    handle: '@CapArea .NET Users Group',
    platform: 'LinkedIn',
    sourceUrl:
      'https://www.linkedin.com/posts/1kevgriff_i-had-so-much-fun-thanks-for-having-me-activity-7336094430157832194-u1dt',
    date: '2025-06-04',
    event: 'CapArea .NET Users Group, Jun 2025',
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
    quote: '@1kevgriff Great talk today - Thursday',
    author: 'Richard Wysocki',
    handle: '@WysockiRichard',
    platform: 'X',
    sourceUrl: 'https://x.com/WysockiRichard/status/1839378163165700345',
    date: '2024-09-26',
    event: 'Talk, Sep 2024',
    eventInferred: true,
  },
  {
    quote:
      '@1kevgriff @DavidGiard @MTIncome Ok I just watched the episode now as the twins kept me up late :) Kevin, I remember reminiscing about 2 frugal dudes with you while I was still at Microsoft, great to hear more details about your current MTI podcast!\n\nDavid, thanks for doing the interview! :)',
    author: 'Shahed Chowdhuri',
    handle: '@shahedC',
    platform: 'X',
    sourceUrl: 'https://x.com/shahedC/status/1815957275032326553',
    date: '2024-07-24',
    event: 'Multithreaded Income podcast',
  },
  {
    quote:
      "Thank you so much @1kevgriff, for all that you do for the dev community, you rock, you're the best. You're awesome! 😎 https://t.co/XJX1OaoOgX",
    author: 'Shahed Chowdhuri',
    handle: '@shahedC',
    platform: 'X',
    sourceUrl: 'https://x.com/shahedC/status/1803553572266590301',
    date: '2024-06-19',
    event: 'Community',
  },
  {
    quote:
      'I had a blast speaking at the Hampton Roads DevFest, meeting a ton of new devs, and sharing knowledge of the GitHub Day of Learning program that my team runs. There were some great speakers and topics. Thank you Kevin Griffin for organizing an outstanding event!',
    author: 'Omar McNeil',
    handle: '@omarmcneil',
    platform: 'LinkedIn',
    sourceUrl:
      'https://www.linkedin.com/posts/omarmcneil_hrdevfest-dayoflearning-agile-activity-7202475147696504832-eILA',
    date: '2024-06-01',
    event: 'Hampton Roads DevFest 2024 (organizer)',
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
      "@jamesqquick @1kevgriff That was so much more honest and open than I was expecting. Inspiring to listen to.\n\nUnfortunately, I don't have a middle name I can leverage for the purpose of personal branding so will have to make do with competing with my athletic namesakes.\n\nSubscribed to the channel! 👍",
    author: 'Nathan Lawson',
    handle: '@nathanlawsn',
    platform: 'X',
    sourceUrl: 'https://x.com/nathanlawsn/status/1719761365005431192',
    date: '2023-11-01',
    event: 'Multithreaded Income podcast episode with James Q Quick',
    eventInferred: true,
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
      "Just started Ep1 and I'm already hooked because all these were also part of my own journey:\n\n✅ DirectX\n✅ XNA\n✅ HoloLens\n✅ dev tools/content for the community\n\nCheck out @1kevgriff's Multithreaded Income Podcast! https://t.co/pSGhcxvETc",
    author: 'Shahed Chowdhuri',
    handle: '@shahedC',
    platform: 'X',
    sourceUrl: 'https://x.com/shahedC/status/1707247032337891534',
    date: '2023-09-28',
    event: 'Multithreaded Income podcast',
  },
  {
    quote: '@1kevgriff @RVNUG Great talk! Saw the video version you did in Oslo.',
    author: 'Chad Carter',
    handle: '@HowdyChad',
    platform: 'X',
    sourceUrl: 'https://x.com/HowdyChad/status/1701060408444915816',
    date: '2023-09-11',
    event: 'RVNUG / NDC Oslo talk, 2023',
  },
  {
    quote:
      "icymi @1kevgriff 's awesome presentation on .NET Background Services: https://t.co/a51I92JIoz",
    author: 'Caparea.Net',
    handle: '@CapareaDotNet',
    platform: 'X',
    sourceUrl: 'https://x.com/CapareaDotNet/status/1678752620922429442',
    date: '2023-07-11',
    event: 'CapArea .NET – .NET Background Services, 2023',
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
  {
    quote:
      "I'm so excited to see we have a large audience to see @1kevgriff tonight! Sign up if you haven't yet, it'll be informative and fun! https://t.co/yUVRMVNF7x https://t.co/q435BtgAGM",
    author: 'Lee (P )?Richardson 🚨',
    handle: '@lprichar',
    platform: 'X',
    sourceUrl: 'https://x.com/lprichar/status/1673701996556177413',
    date: '2023-06-27',
    event: 'User group talk, Jun 2023',
    eventInferred: true,
  },
  {
    quote:
      '"With the 911 agencies, we recieved data every seconds. That\'s a lot of repetitive data!"\n\nArchitecture is an important part software engineering. Using real life experiences, Kevin Griffin delivered a great talk on rethinking efficiency.\n\n#confoo #techconference #SignalR #Redis https://t.co/ravz6CbwPC',
    author: 'ConFoo Developer Conference',
    handle: '@confooca',
    platform: 'X',
    sourceUrl: 'https://x.com/confooca/status/1629190718483841024',
    date: '2023-02-24',
    event: 'ConFoo 2023',
  },
  // 2022
  {
    quote:
      "@1kevgriff It was a lot of fun to do, especially in the longer workshop form.\n\nYou should absolutely build a talk/workshop! I've always admired how you developed your business into what it is today.",
    author: 'Michael Eaton',
    handle: '@mjeaton',
    platform: 'X',
    sourceUrl: 'https://x.com/mjeaton/status/1572260558573039617',
    date: '2022-09-20',
    event: 'Business / career',
  },
  {
    quote:
      '@1kevgriff: \'"Top pick!"\n\n⭐⭐⭐⭐⭐\n\nEasy to follow! Learn how to build awesome #realtime web applications with #SignalR.\n\nCheck it out here: https://t.co/yE5YS6Bmdo \' https://t.co/vNoOxTdITd, see more https://t.co/AnuAOZPV5t',
    author: 'SQL Server News',
    handle: '@TT_SQLServer',
    platform: 'X',
    sourceUrl: 'https://x.com/TT_SQLServer/status/1564115461222158336',
    date: '2022-08-29',
    event: 'SignalR course (5-star "Top pick" review)',
  },
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
    quote: "@boyersnet @plantpowerjames @davidfowl @TheCodeTraveler Check out @1kevgriff's work.",
    author: 'Chuck Boyer',
    handle: '@boyersnet',
    platform: 'X',
    sourceUrl: 'https://x.com/boyersnet/status/1588842650614259712',
    date: '2022-11-05',
    event: 'General recommendation',
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
    quote:
      "Hi Kevin. Read your article about SignalR and message delivery guarantees. Very informative! I think this is not SignalR's responsibility. Could implememt queues and have services determing which connected clients have pending messages for delivery. and process those.",
    author: 'Panos Anastasiadis',
    handle: '@panos_pd',
    platform: 'X',
    sourceUrl: 'https://x.com/panos_pd/status/1447182322172928000',
    date: '2021-10-10',
    event: 'Blog – SignalR message delivery guarantees',
  },
  {
    quote: '@1kevgriff @jetbrains Great talk today. Thank you!',
    author: 'Marcus McKibben, MBA',
    handle: '@mmckibbenmba',
    platform: 'X',
    sourceUrl: 'https://x.com/mmckibbenmba/status/1423310107199168512',
    date: '2021-08-05',
    event: 'JetBrains talk, Aug 2021',
  },
  {
    quote: '@1kevgriff @jetbrains ALL great tips for #aspnetcore folks! Loved it! Great job!',
    author: 'Jonathan "JD" Danylko (also on fosstodon.org/bsky)',
    handle: '@jdanylko',
    platform: 'X',
    sourceUrl: 'https://x.com/jdanylko/status/1423308921356312576',
    date: '2021-08-05',
    event: 'JetBrains webinar – ASP.NET Core tips',
  },
  {
    quote:
      "A real-world SignalR example, epic illustrations, lots of coding & more in Day II of @AlyssaNicoll & @EdCharbeneau's SignalR Crazy8's marathon w/ special guest, the awesome @1kevgriff! Catch the recording: https://t.co/nR2iHUlSYm https://t.co/2QcXJvciae",
    author: 'Progress Telerik',
    handle: '@Telerik',
    platform: 'X',
    sourceUrl: 'https://x.com/Telerik/status/1352302707990786052',
    date: '2021-01-21',
    event: 'Telerik SignalR Crazy 8s stream, Jan 2021',
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
    quote: '@1kevgriff  1kefgriff great presentation on azure functions. Loved it!!',
    author: 'Solomon Nigussie',
    handle: '@solomon_t',
    platform: 'X',
    sourceUrl: 'https://x.com/solomon_t/status/1290789815215104009',
    date: '2020-08-04',
    event: 'Azure Functions presentation, Aug 2020',
    eventInferred: true,
  },
  {
    quote:
      '@JSFriendsConf @1kevgriff Thank you @1kevgriff for speaking with us today. We had great insights on Plugin development from the talk.',
    author: 'Vue Columbus',
    handle: '@vue_columbus',
    platform: 'X',
    sourceUrl: 'https://x.com/vue_columbus/status/1286083851656323074',
    date: '2020-07-22',
    event: 'Vue Columbus / JSFriends – plugin development, Jul 2020',
  },
  {
    quote: '@1kevgriff Really good presentation',
    author: 'Graham Morris',
    handle: '@gmorris59',
    platform: 'X',
    sourceUrl: 'https://x.com/gmorris59/status/1260992171466985478',
    date: '2020-05-14',
    event: 'Dapper presentation, May 2020',
    eventInferred: true,
  },
  {
    quote:
      "@1kevgriff Enjoyed your talk. I also enjoyed that it looks like we're in the same office? https://t.co/eRYKN1C4mG",
    author: 'Sam Rueby',
    handle: '@SamRueby',
    platform: 'X',
    sourceUrl: 'https://x.com/SamRueby/status/1260992622044360713',
    date: '2020-05-14',
    event: 'Presentation, May 2020',
    eventInferred: true,
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
    quote:
      'Thank you @1kevgriff for presenting at third #BostonAzure virtual @BostonAzure and @NorthBTownAzure meetups, presentation materials are at https://t.co/wmLwRY0W1X\nThank you @codingoutloud , @breakpointv16 and @haleyjason for organizing! https://t.co/Ypcs5s7cWV',
    author: 'Microsoft Developers',
    handle: '@DevBostonDotOrg',
    platform: 'X',
    sourceUrl: 'https://x.com/DevBostonDotOrg/status/1260716626330206210',
    date: '2020-05-13',
    event: 'Boston Azure virtual meetup, May 2020',
  },
  {
    quote:
      '@1kevgriff Thanks for the presentation - got some good ideas for some functions/apps I could do with automating.',
    author: 'Andy Helsby',
    handle: '@helsbyhome',
    platform: 'X',
    sourceUrl: 'https://x.com/helsbyhome/status/1260714093125808129',
    date: '2020-05-13',
    event: 'Boston Azure virtual meetup, May 2020',
    eventInferred: true,
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
    quote: 'Amazing demo of @Azure Logic Apps by @1kevgriff on @thedevtalkshow',
    author: 'Chris Gomez',
    handle: '@SpaceShot',
    platform: 'X',
    sourceUrl: 'https://x.com/SpaceShot/status/1258201903772700672',
    date: '2020-05-07',
    event: 'The Dev Talk Show – Azure Logic Apps',
  },
  {
    quote: "@mbuckbee @1kevgriff He's a good dude.",
    author: 'Jamie Wright',
    handle: '@jwright',
    platform: 'X',
    sourceUrl: 'https://x.com/jwright/status/1245487728814428163',
    date: '2020-04-01',
    event: 'Character',
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
      "Don't miss out on @dotnetdc's Meetup next Tuesday! We'll be listening to awesome @1kevgriff speak about #SignalR https://t.co/dbkDOna49r",
    author: 'Alexander Slotte',
    handle: '@alexslotte',
    platform: 'X',
    sourceUrl: 'https://x.com/alexslotte/status/1204028007461138439',
    date: '2019-12-09',
    event: 'DotNetDC meetup – SignalR, Dec 2019',
  },
  {
    quote:
      '@1kevgriff, thanks for the talk on masterminds. It was insightful and is pushing me to start one. You are the straw that broke the camels back. #kcdc2019 https://t.co/vTwytEI5LU',
    author: 'Amos King - lucky husband',
    handle: '@Adkron',
    platform: 'X',
    sourceUrl: 'https://x.com/Adkron/status/1152258119524933632',
    date: '2019-07-19',
    event: 'KCDC 2019 – Masterminds',
  },
  {
    quote:
      "@1kevgriff Great talk at KCDC this morning! Here's the Zork remake I did for Alamo a while back - you've re-inspired me. 🧐 https://t.co/MKsVSLL4fD",
    author: 'CK Hicks (aka DV)',
    handle: '@ckhicks',
    platform: 'X',
    sourceUrl: 'https://x.com/ckhicks/status/1152224428878704641',
    date: '2019-07-19',
    event: 'KCDC 2019',
  },
  {
    quote:
      'Really enjoyed @revconf this year. The event was well planned, the talks were great, and the atmosphere was inviting. Hampton Roads is incredible. Thank you @lynnaloo @1kevgriff @keithprivette @tealMage @alexproaps @taylorka.',
    author: 'guillermo is around',
    handle: '@guillermoandrae',
    platform: 'X',
    sourceUrl: 'https://x.com/guillermoandrae/status/1137475039425716225',
    date: '2019-06-08',
    event: 'RevConf 2019 (organizer)',
  },
  {
    quote:
      'My first technology conference was amazing!!! Thanks to @ParissAthena for creating #BlackTechTwitter because without it I would have never found out about @revconf #RevConf!!\n\nThank you @1kevgriff @keithprivette & the rest of the team for so much love! #diversityscholarship 🌊💻 https://t.co/JWCk0Nw3fZ',
    author: '🇵🇦 Anji Ray™ 🇺🇸',
    handle: '@anjiray',
    platform: 'X',
    sourceUrl: 'https://x.com/anjiray/status/1137177119845490690',
    date: '2019-06-08',
    event: 'RevConf 2019 (organizer)',
  },
  {
    quote:
      'Check out @1kevgriff laying down some knowledge about moving to #aspnetcore from #aspnet - https://t.co/OoLtkeGt7u',
    author: 'Matthew D. Groves',
    handle: '@mgroves',
    platform: 'X',
    sourceUrl: 'https://x.com/mgroves/status/1118575937895981058',
    date: '2019-04-17',
    event: 'ASP.NET to ASP.NET Core content, 2019',
  },
  {
    quote:
      '@1kevgriff I was able to get the slides. Thank you very much. I was in your presentation at codemash regarding remote meetings/accountability/encouragers.\n\nThanks for all your help.',
    author: 'Steve Graber',
    handle: '@s_graber',
    platform: 'X',
    sourceUrl: 'https://x.com/s_graber/status/1117205800689258496',
    date: '2019-04-13',
    event: 'CodeMash 2019 – remote meetings/accountability',
  },
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
  {
    quote:
      "@1kevgriff It was a great talk. I am considering whether a mastermind group would be right for me. Couldn't do that before your talk because I had never heard of them. Thanks for presenting!",
    author: 'Jerry Mindek',
    handle: '@jermindek',
    platform: 'X',
    sourceUrl: 'https://x.com/jermindek/status/1084522252744491009',
    date: '2019-01-13',
    event: 'Mastermind talk, Jan 2019',
    eventInferred: true,
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
      'Having trouble picking your next web framework?  Check out this great episode of the Swift Kick Show with Kevin Griffin and Steve Albers where they talk about some lessons learned from the field. https://t.co/h7BZqaZXdW https://t.co/t2dqjTTr8J',
    author: 'Carsten Hoffrichter',
    handle: '@carstenh1985',
    platform: 'X',
    sourceUrl: 'https://x.com/carstenh1985/status/1058736638602477569',
    date: '2018-11-03',
    event: 'Swift Kick Show episode – web frameworks',
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
    quote: '@1kevgriff @reverentgeek Nice webinar today guys!',
    author: 'John Rouda',
    handle: '@johnrouda',
    platform: 'X',
    sourceUrl: 'https://x.com/johnrouda/status/999442924210475009',
    date: '2018-05-24',
    event: 'Webinar with @reverentgeek, May 2018',
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
      'Really have enjoyed learning and connecting with all the outstanding professionals and outstanding people who have reminded me of just how amazing it is to be a software engineer.  Thanks so much #RevConf #best #energized @1kevgriff @nodejs @dotnet https://t.co/ZcLHdpK59Y',
    author: 'Lee Talley',
    handle: '@ALeeTalley',
    platform: 'X',
    sourceUrl: 'https://x.com/ALeeTalley/status/997540208005533697',
    date: '2018-05-18',
    event: 'RevConf 2018',
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
      'Watching a great webinar on Microsoft HoloLens by @1kevgriff, @kewlniss,  and @teamswiftkick',
    author: 'Alan Hagerman',
    handle: '@alanhagerman',
    platform: 'X',
    sourceUrl: 'https://x.com/alanhagerman/status/910568136038023169',
    date: '2017-09-20',
    event: 'Swift Kick HoloLens webinar, 2017',
  },
  {
    quote:
      'Had a fantastic time speaking and meeting everyone @revconf this past week. Thank you so much @1kevgriff, @lynnaloo, @erikpmp! #revconf',
    author: 'Saimon Sharif',
    handle: '@saimonsharif',
    platform: 'X',
    sourceUrl: 'https://x.com/saimonsharif/status/871471523659493376',
    date: '2017-06-04',
    event: 'RevConf 2017 (organizer)',
  },
  {
    quote:
      'Another awesome @revconf this year! 👏👏👏 Thank you so much @1kevgriff @lynnaloo and @erikpmp! 😄🏖',
    author: 'Aimee Knight',
    handle: '@Aimee_Knight',
    platform: 'X',
    sourceUrl: 'https://x.com/Aimee_Knight/status/870751450623868928',
    date: '2017-06-02',
    event: 'RevConf 2017 (organizer)',
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
  {
    quote:
      'Community Spotlight: @1kevgriff\nhttps://t.co/QFg2iaukAL\n\nThank you Kevin, you are awesome! I hope everything goes well with @revconf 2017! https://t.co/X29Ht3MYX3',
    author: 'David Neal 🥓🥑',
    handle: '@reverentgeek',
    platform: 'X',
    sourceUrl: 'https://x.com/reverentgeek/status/869220352165105664',
    date: '2017-05-29',
    event: 'Community Spotlight, 2017',
  },
  // 2016
  {
    quote:
      "Great #revconf planning session with @1kevgriff  and @lynnaloo. It's going to be amazing!",
    author: 'Erik J. Olson',
    handle: '@iamerikjolson',
    platform: 'X',
    sourceUrl: 'https://x.com/iamerikjolson/status/784388396437372928',
    date: '2016-10-07',
    event: 'RevConf 2017 planning',
  },
  {
    quote:
      'Thanks for the session on "https://t.co/rF01bIISLO DEVELOPMENT WITHOUT WINDOWS" Kevin @1kevgriff',
    author: 'Akkiraju Ivaturi',
    handle: '@Ivaturia',
    platform: 'X',
    sourceUrl: 'https://x.com/Ivaturia/status/784932868111765506',
    date: '2016-10-09',
    event: 'ASP.NET Development Without Windows, Oct 2016',
    eventInferred: true,
  },
  {
    quote:
      'Most excellent blog post by @1kevgriff. Non-Tech Factors to Consider When Choosing Your Tech Stack. Very insightful. https://t.co/7J10KbCY34',
    author: 'Jim Duffy',
    handle: '@JMDuffy',
    platform: 'X',
    sourceUrl: 'https://x.com/JMDuffy/status/733744053477638144',
    date: '2016-05-20',
    event: 'Blog – Non-Tech Factors to Consider When Choosing Your Tech Stack',
  },
  {
    quote: "@1kevgriff @revconf definitely can't wait for next year. Learned a lot today.",
    author: 'Michael Carter 🐝',
    handle: '@kiliman',
    platform: 'X',
    sourceUrl: 'https://x.com/kiliman/status/731307736001089537',
    date: '2016-05-14',
    event: 'RevConf 2016',
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
      'Thanks @1kevgriff enjoyed the https://t.co/OZyG73B183 wins talk. https://t.co/wlsDglKayJ',
    author: 'Jason Fabritz',
    handle: '@bugbytesinc',
    platform: 'X',
    sourceUrl: 'https://x.com/bugbytesinc/status/666783849477730304',
    date: '2015-11-18',
    event: '"wins" talk, Nov 2015',
    eventInferred: true,
  },
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
      'Good post from @1kevgriff on scheduling for user groups: http://t.co/wiu55hZtXc Wise advice, IMO.',
    author: 'G. Andrew Duthie',
    handle: '@devhammer',
    platform: 'X',
    sourceUrl: 'https://x.com/devhammer/status/577608887261597696',
    date: '2015-03-16',
    event: 'Blog – scheduling user groups',
  },
  {
    quote: 'Great presentation by @1kevgriff last night!! http://t.co/W7eisXKbz7',
    author: 'HR .NET Users Group',
    handle: '@hrnug',
    platform: 'X',
    sourceUrl: 'https://x.com/hrnug/status/575658241834762240',
    date: '2015-03-11',
    event: 'HRNUG – ASP.NET Performance, Mar 2015',
  },
  {
    quote: '@1kevgriff thanks again for a great presentation last night at @hrnug',
    author: 'Tom Marsden',
    handle: '@TommyboyCAN',
    platform: 'X',
    sourceUrl: 'https://x.com/TommyboyCAN/status/575657201806745600',
    date: '2015-03-11',
    event: 'HRNUG – ASP.NET Performance, Mar 2015',
  },
  {
    quote: '@1kevgriff Thanks for the helpful presentation!',
    author: 'Michael Hagesfeld',
    handle: '@mhagesfeld',
    platform: 'X',
    sourceUrl: 'https://x.com/mhagesfeld/status/553571527304556544',
    date: '2015-01-09',
    event: 'Presentation, Jan 2015',
    eventInferred: true,
  },
  {
    quote:
      'Just attended a great talk on http://t.co/cGD0eKatbP performance upgrades by @1kevgriff. @evernote got a workout.',
    author: 'Rob Wheaton',
    handle: '@rewheaton',
    platform: 'X',
    sourceUrl: 'https://x.com/rewheaton/status/553563326907564032',
    date: '2015-01-09',
    event: 'ASP.NET performance talk, Jan 2015',
    eventInferred: true,
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
      '@1kevgriff thanks for the presentation at @rvajs today and hanging around to take my questions',
    author: 'Richard Yhip',
    handle: '@Yhippa',
    platform: 'X',
    sourceUrl: 'https://x.com/Yhippa/status/519643998810423296',
    date: '2014-10-08',
    event: 'RVA.js, Oct 2014',
  },
  {
    quote:
      "@craigber The Bank of Griff is still the best SignalR demo I've ever seen. // @1kevgriff",
    author: 'Richard Dudley',
    handle: '@rj_dudley',
    platform: 'X',
    sourceUrl: 'https://x.com/rj_dudley/status/515143844070170624',
    date: '2014-09-25',
    event: 'SignalR "Bank of Griff" demo',
  },
  {
    quote:
      '@1kevgriff Great presentation, well delivered and something new to add to the play list. @lidnug',
    author: 'Gavin Lanata',
    handle: '@GLanata',
    platform: 'X',
    sourceUrl: 'https://x.com/GLanata/status/515218906257293312',
    date: '2014-09-25',
    event: 'LIDNUG, Sep 2014',
  },
  {
    quote:
      'Great presentation on scaling SignalR live this evening by @1kevgriff on @lidnug - practical examples and simple code to make the point.',
    author: 'Pierre Arnaud',
    handle: '@epsitec',
    platform: 'X',
    sourceUrl: 'https://x.com/epsitec/status/515218639390511104',
    date: '2014-09-25',
    event: 'LIDNUG – Scaling SignalR, Sep 2014',
  },
  {
    quote: '@1kevgriff signalr #devconnections nice session so far',
    author: 'Richard Rodriquez',
    handle: '@RRodriquez1',
    platform: 'X',
    sourceUrl: 'https://x.com/RRodriquez1/status/511923348306030592',
    date: '2014-09-16',
    event: 'DevConnections 2014 – SignalR',
  },
  {
    quote: 'Great presentation by @1kevgriff at @cmapug http://t.co/0VwHgDGhQx',
    author: 'Justin Lawrence',
    handle: '@JDtheDev',
    platform: 'X',
    sourceUrl: 'https://x.com/JDtheDev/status/496822082135949312',
    date: '2014-08-06',
    event: 'CMAP, Aug 2014',
  },
  {
    quote:
      "@1kevgriff hoping you'll have a link to slides for your talk on JS promises. Enjoyed your talk on #SignalR at #CodeStock #CodeStock214",
    author: 'Joel',
    handle: '@joelmdev',
    platform: 'X',
    sourceUrl: 'https://x.com/joelmdev/status/487654711370448897',
    date: '2014-07-11',
    event: 'CodeStock 2014 – SignalR',
  },
  {
    quote:
      'Thanks to @1kevgriff for hosting the @NorfolkJS node workshop. Next up @rockbot with our first AMA! http://t.co/KysmCuzMCP',
    author: 'B',
    handle: '@_BMF_',
    platform: 'X',
    sourceUrl: 'https://x.com/_BMF_/status/482676435807920129',
    date: '2014-06-28',
    event: 'NorfolkJS node workshop',
  },
  {
    quote: 'Great talk on @nodejs by @1kevgriff today! Looking forward to the next one.',
    author: 'Blaine Price',
    handle: '@wbprice',
    platform: 'X',
    sourceUrl: 'https://x.com/wbprice/status/482674499180310528',
    date: '2014-06-27',
    event: 'NorfolkJS – Node.js, Jun 2014',
    eventInferred: true,
  },
  {
    quote:
      '@1kevgriff your presentation on #signalR was very informative.  Is the demo source code on your GitHub?',
    author: 'Mike Kniskern',
    handle: '@mkniskern',
    platform: 'X',
    sourceUrl: 'https://x.com/mkniskern/status/452638138586771457',
    date: '2014-04-06',
    event: 'SignalR presentation, Apr 2014',
    eventInferred: true,
  },
  // 2013
  {
    quote: 'Thank you, @1kevgriff for all you do in the community! #HRVA #norfolkvb',
    author: 'Kevin Curry',
    handle: '@kmcurry',
    platform: 'X',
    sourceUrl: 'https://x.com/kmcurry/status/411323872219512832',
    date: '2013-12-13',
    event: 'Hampton Roads community (#HRVA #norfolkvb)',
  },
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
    quote:
      '@1kevgriff Thought you mentioned that was your take in your (excellent) session at CodePaLOUsa',
    author: 'Cory House',
    handle: '@housecor',
    platform: 'X',
    sourceUrl: 'https://x.com/housecor/status/393746543439646720',
    date: '2013-10-25',
    event: 'CodePaLOUsa',
  },
  {
    quote:
      'Great talk on single web page apps by @1kevgriff. #InnovateVA actionable, practical advice and nice presentation. Thanks!',
    author: '@ArinSime',
    handle: '@ArinSime',
    platform: 'X',
    sourceUrl: 'https://x.com/ArinSime/status/391215744337182722',
    date: '2013-10-18',
    event: 'InnovateVA 2013 – Single Page Apps',
  },
  {
    quote:
      "@1kevgriff Great session! You have the most clear and helpful explanation of require I've ever seen. Thanks!",
    author: 'Nathan Honeycutt',
    handle: '@nlhoneycutt',
    platform: 'X',
    sourceUrl: 'https://x.com/nlhoneycutt/status/373513152044224512',
    date: '2013-08-30',
    event: 'Session, Aug 2013 – RequireJS',
    eventInferred: true,
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
      '@1kevgriff thanks for a great presentation on #nodejs, stay tuned to my blog for an upcoming post on the topic! http://t.co/bQjzVcdGd4 :-)',
    author: 'Shahed Chowdhuri',
    handle: '@shahedC',
    platform: 'X',
    sourceUrl: 'https://x.com/shahedC/status/339567302909513728',
    date: '2013-05-29',
    event: 'CapArea .NET – Node.js, May 2013',
    eventInferred: true,
  },
  {
    quote: 'Great presentation #node #js by @1kevgriff at @CapareaDotNet tonight! Thanks, Kevin!',
    author: 'rusty',
    handle: '@cnromaine',
    platform: 'X',
    sourceUrl: 'https://x.com/cnromaine/status/339561795729641473',
    date: '2013-05-29',
    event: 'CapArea .NET – Node.js, May 2013',
  },
  {
    quote:
      'Excellent demo by Kevin Griffin on SignalR at Tech Connection!: http://t.co/0sv3AzPgz4 via @youtube',
    author: 'Guruprasad Vijayarao',
    handle: '@MSGuru',
    platform: 'X',
    sourceUrl: 'https://x.com/MSGuru/status/328028742519758848',
    date: '2013-04-27',
    event: 'Tech Connection – SignalR',
  },
  {
    quote:
      'Windows 8 Hunger Games in progress. Very entertaining. @jennifermarsman @1kevgriff #cpl13',
    author: 'Adria Bynum',
    handle: '@roboticsgirl',
    platform: 'X',
    sourceUrl: 'https://x.com/roboticsgirl/status/327928332027043840',
    date: '2013-04-26',
    event: 'CodePaLOUsa 2013 – Windows 8 Hunger Games (#cpl13)',
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
    quote:
      '@1kevgriff @twilio @SignalR voting by phone & seeing the count reflected was awesome. Makes for a great demo (assuming connections hold up)',
    author: 'Drew Crawford',
    handle: '@atcrawford',
    platform: 'X',
    sourceUrl: 'https://x.com/atcrawford/status/327512714320699392',
    date: '2013-04-25',
    event: 'SignalR + Twilio demo, Apr 2013',
    eventInferred: true,
  },
  {
    quote:
      'Inspired by my coffee talk this morning w/ @1kevgriff, I got my first Azure web site up and running tonight…piece of cake.',
    author: 'Erik J. Olson',
    handle: '@iamerikjolson',
    platform: 'X',
    sourceUrl: 'https://x.com/iamerikjolson/status/317115346421182464',
    date: '2013-03-28',
    event: 'Coffee chat / mentoring',
  },
  {
    quote:
      '@1kevgriff hey, i just read your http://t.co/wRpgzxcZ mvc jquery tabs blog. Very helpful, thank you!',
    author: 'Dan Beaulieu',
    handle: '@transfer_point',
    platform: 'X',
    sourceUrl: 'https://x.com/transfer_point/status/300077891750871040',
    date: '2013-02-09',
    event: 'Blog – MVC jQuery tabs',
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
    quote:
      '@1kevgriff Hi kev ,have seen ur blog about signalr it is awesome tutorial for begiinners thanks for sharing',
    author: 'உதய்',
    handle: '@Biyyalo',
    platform: 'X',
    sourceUrl: 'https://x.com/Biyyalo/status/274378211834609665',
    date: '2012-11-30',
    event: 'Blog – SignalR tutorial',
  },
  {
    quote:
      "thanks @1kevgriff for speaking to the @RADNUG group last night! great info on #signalR, now I'm ready to build some #realtime apps easily!",
    author: 'aquaseal',
    handle: '@aquaseal',
    platform: 'X',
    sourceUrl: 'https://x.com/aquaseal/status/261282679616577537',
    date: '2012-10-25',
    event: 'RADNUG – SignalR, Oct 2012',
  },
  {
    quote:
      'Great #SignalR talk tonight by @1kevgriff at our @RADNUG meeting.  Really cool stuff.  Thanks Kevin!',
    author: 'Matt',
    handle: '@mattcuba',
    platform: 'X',
    sourceUrl: 'https://x.com/mattcuba/status/260930372810981377',
    date: '2012-10-24',
    event: 'RADNUG – SignalR, Oct 2012',
  },
  {
    quote:
      '@1kevgriff @madskristensen Thanks for adding that session at the last minute, enjoyed it.',
    author: 'Eric Rohlfs',
    handle: '@ericrohlfs',
    platform: 'X',
    sourceUrl: 'https://x.com/ericrohlfs/status/254998301085138945',
    date: '2012-10-07',
    event: 'Last-minute session, Oct 2012',
    eventInferred: true,
  },
  {
    quote: '@1kevgriff great presentation on node.  Thanks!',
    author: 'Eric Rohlfs',
    handle: '@ericrohlfs',
    platform: 'X',
    sourceUrl: 'https://x.com/ericrohlfs/status/245677192716091392',
    date: '2012-09-12',
    event: 'Node.js presentation, Sep 2012',
    eventInferred: true,
  },
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
      '@1kevgriff great realtime dashboard talk at #CodeStock .  This will help me with my current project!  Thanks!',
    author: 'Richard L Taylor Jr - @rightincode@mastodon.world',
    handle: '@rightincode',
    platform: 'X',
    sourceUrl: 'https://x.com/rightincode/status/214068064076046336',
    date: '2012-06-16',
    event: 'CodeStock 2012 – Real-time dashboards',
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
    quote: '@DavidGiard @1kevgriff Nice #TechnologyAndFriends episode on #SignalR .. good stuff.',
    author: 'Sam Basu',
    handle: '@samidip',
    platform: 'X',
    sourceUrl: 'https://x.com/samidip/status/197840303951069184',
    date: '2012-05-03',
    event: 'Technology and Friends – SignalR episode',
  },
  {
    quote:
      '@1kevgriff Very informative presentation of MVC at #carolinacc!  Hope to hear you again!',
    author: 'Worker from USA',
    handle: '@Clutthewindow',
    platform: 'X',
    sourceUrl: 'https://x.com/Clutthewindow/status/199482656323420160',
    date: '2012-05-07',
    event: 'Carolina Code Camp 2012 – MVC',
  },
  {
    quote:
      '@1kevgriff enjoyed the session on jQuery mobile.  Had not seen the tools and it was a great overview.',
    author: 'Rodney Flowers',
    handle: '@RodneyFlowers',
    platform: 'X',
    sourceUrl: 'https://x.com/RodneyFlowers/status/195966720274464768',
    date: '2012-04-27',
    event: 'KCDC 2012 – jQuery Mobile',
    eventInferred: true,
  },
  {
    quote:
      '@1kevgriff Most interesting session yet! Really looking forward to using jQuery Mobile! Awesome job #kcdc',
    author: 'Drew Butler',
    handle: '@DrewButler76',
    platform: 'X',
    sourceUrl: 'https://x.com/DrewButler76/status/195963057640443904',
    date: '2012-04-27',
    event: 'KCDC 2012 – jQuery Mobile',
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
      '@elijahmanor @burkeholland I heard @1kevgriff speak on SignlR the other day and it rocked! What are you in town for Kevin?',
    author: 'Jonathan Creamer',
    handle: '@jcreamer898',
    platform: 'X',
    sourceUrl: 'https://x.com/jcreamer898/status/189343545478492161',
    date: '2012-04-09',
    event: 'SignalR talk, Apr 2012',
    eventInferred: true,
  },
  {
    quote:
      '@1kevgriff doing his signalR talk.  Always fun to see why people text in to his demo app http://t.co/5tGs0DVC',
    author: 'devinrader',
    handle: '@devinrader',
    platform: 'X',
    sourceUrl: 'https://x.com/devinrader/status/186182882329509888',
    date: '2012-03-31',
    event: 'SignalR talk, Mar 2012',
    eventInferred: true,
  },
  {
    quote:
      'Awesome presentation given by @1kevgriff. Nice to now there are some additional tools out there to get our job easier.',
    author: 'Gonzalo Chiriboga',
    handle: '@GChiriboga',
    platform: 'X',
    sourceUrl: 'https://x.com/GChiriboga/status/186113789555519489',
    date: '2012-03-31',
    event: 'Presentation, Mar 2012',
    eventInferred: true,
  },
  {
    quote:
      '@1kevgriff awesome signalr presentation, the pie chart application was very entertaining.',
    author: 'Chris Ross',
    handle: '@ckross01',
    platform: 'X',
    sourceUrl: 'https://x.com/ckross01/status/172873304787525632',
    date: '2012-02-24',
    event: 'SignalR presentation',
    eventInferred: true,
  },
  {
    quote:
      '@1kevgriff did a very nice SignalR presentation at Microsoft Malvern just now.  SignalR +Twilio is fun.',
    author: 'Michael Cullina',
    handle: '@michaelcullina',
    platform: 'X',
    sourceUrl: 'https://x.com/michaelcullina/status/169930292251983872',
    date: '2012-02-15',
    event: 'Microsoft Malvern – SignalR',
  },
  {
    quote:
      'Great presentation on SignalR by @1kevgriff (@ComponentOne) at @cmapug tonight! Thanks for coming and bringing C1 swag (bonus)!',
    author: 'rusty',
    handle: '@cnromaine',
    platform: 'X',
    sourceUrl: 'https://x.com/cnromaine/status/167089441876344832',
    date: '2012-02-08',
    event: 'CMAP – SignalR, Feb 2012',
  },
  {
    quote:
      'SignalR rocks and is a good start-up for Real-Time applications. Thanks @1kevgriff  for presentation in CMAP tonight !',
    author: 'Elkhan | Azure MVP 🇺🇦 💪',
    handle: '@ElYusubov',
    platform: 'X',
    sourceUrl: 'https://x.com/ElYusubov/status/167079319787675650',
    date: '2012-02-08',
    event: 'CMAP – SignalR, Feb 2012',
  },
  {
    quote: 'Funny smart excellent style @1kevgriff is my new hero what a presentation at cmap!!!',
    author: 'markkloch',
    handle: '@markkloch',
    platform: 'X',
    sourceUrl: 'https://x.com/markkloch/status/167045808678645760',
    date: '2012-02-08',
    event: 'CMAP (Central Maryland Association of .NET Professionals)',
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
  {
    quote: '@1kevgriff is blowing up the Cmap meeting with the best presentation ever!',
    author: 'markkloch',
    handle: '@markkloch',
    platform: 'X',
    sourceUrl: 'https://x.com/markkloch/status/167043445087670272',
    date: '2012-02-08',
    event: 'CMAP 2012',
  },
  // 2011
  {
    quote: 'Nice @MSDN presentation on Entity Framework by @1kevgriff Good Job Kevin!',
    author: 'Allen Conway',
    handle: '@AllenConway',
    platform: 'X',
    sourceUrl: 'https://x.com/AllenConway/status/136534007650328576',
    date: '2011-11-15',
    event: 'MSDN presentation – Entity Framework',
  },
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
  {
    quote:
      'Kevin Griffin – Kevin, among other things, created a check-in application for MADExpo that allowed us to easily locate and check in attendees using the data from our EventBrite registration site.',
    author: 'G. Andrew Duthie',
    handle: '@devhammer.net',
    platform: 'Blog',
    sourceUrl: 'https://devhammer.net/2011/07/18/madexpo-wrap-up/',
    date: '2011-07-18',
    event: 'MADExpo 2011 (organizer)',
  },
  {
    quote:
      'Check out @1kevgriff thoughts on Agile and Evangelism http://bit.ly/lGignR What a great community leader! #MVPBuzz',
    author: 'Typemock',
    handle: '@typemock',
    platform: 'X',
    sourceUrl: 'https://x.com/typemock/status/82844665782616065',
    date: '2011-06-20',
    event: 'Blog post: Agile and Evangelism',
  },
  {
    quote: "@1kevgriff  Thanks Kevin for 'Awesome' jquery presentation @dcdnug yesterday",
    author: 'Ganesan Muthiah',
    handle: '@gmuthaia',
    platform: 'X',
    sourceUrl: 'https://x.com/gmuthaia/status/27915496598798336',
    date: '2011-01-20',
    event: 'DC .NET User Group',
  },
  // 2010
  {
    quote:
      '@1kevgriff You talk was very good. I learned some great things about MVC2 from you. #devLink',
    author: 'Kevin Hazzard',
    handle: '@KevinHazzard',
    platform: 'X',
    sourceUrl: 'https://x.com/FrankDigsData/status/20413640832',
    date: '2010-08-05',
    event: 'devLink 2010',
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

/**
 * Clean up quote text for display:
 * - Strip leading @mentions (e.g., "@1kevgriff " at the start)
 * - Strip trailing "// @1kevgriff"
 * - Strip trailing URLs (https://... or http://...)
 * - Strip trailing hashtags (#word)
 * - Never change actual words in the quote
 */
export function cleanQuoteText(quote: string): string {
  let cleaned = quote;

  // Strip leading @mentions (one or more at the start, followed by space)
  cleaned = cleaned.replace(/^(?:@\S+\s+)+/, '');

  // Strip trailing "// @1kevgriff" pattern
  cleaned = cleaned.replace(/\s*\/\/\s*@1kevgriff\s*$/i, '');

  // Strip trailing URLs (can be multiple, with optional whitespace between)
  cleaned = cleaned.replace(/(?:\s+https?:\/\/\S+)+\s*$/, '');

  // Strip trailing hashtags (can be multiple, with optional whitespace between)
  cleaned = cleaned.replace(/(?:\s+#\S+)+\s*$/, '');

  return cleaned.trim();
}
