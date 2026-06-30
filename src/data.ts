export type Manga = {
  id: string;
  title: string;
  chapter: string;
  releaseDate: string;
  likes: string;
  comments: number;
  coverPosition: string;
  summary: string;
};

export type Animation = {
  id: string;
  title: string;
  duration: string;
  views: string;
  likes: string;
  comments: number;
  thumbPosition: string;
  episode: string;
  description: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  type: "Album" | "Single" | "Playlist" | "OST";
  duration: string;
  artPosition: string;
};

export type User = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
};

export type Post = {
  id: string;
  author: string;
  tag: string;
  body: string;
  likes: number;
  comments: number;
};

export const manga: Manga[] = [
  {
    id: "7 life 7 Ways",
    title: "7 life 7 Ways",
    chapter: "One shot",
    releaseDate: "25 12, 2025",
    likes: "0",
    comments: 0,
    coverPosition: "0% 0%",
    summary: "A tired soul gets grilled in the void about its seven past lives: ant (scared of feet), fish (free then trapped), lion (king then forgotten), tree (endures everything), bacterium (hated and invisible), human (complicated pain, pressure, loneliness). After remembering all the suffering, it just wants peace. Chooses to become a cloud next. Drifts away free.",
  },
  {
    id: "paper-moon",
    title: "Paper Moon Terminal",
    chapter: "Chapter 09",
    releaseDate: "Jun 25, 2026",
    likes: "11.7K",
    comments: 506,
    coverPosition: "50% 0%",
    summary: "Two rivals wait for a train that only appears between ink strokes.",
  },
  {
    id: "static-heart",
    title: "Static Heart Radio",
    chapter: "Chapter 31",
    releaseDate: "Jun 21, 2026",
    likes: "24.1K",
    comments: 1308,
    coverPosition: "100% 0%",
    summary: "A broken studio microphone records the sound of missing memories.",
  },
  {
    id: "shelf-tide",
    title: "Shelf Tide",
    chapter: "Chapter 12",
    releaseDate: "Jun 18, 2026",
    likes: "9.5K",
    comments: 391,
    coverPosition: "0% 100%",
    summary: "Books drift through a flooded archive where every panel rewrites itself.",
  },
  {
    id: "tower-zenith",
    title: "Tower Zenith",
    chapter: "Chapter 22",
    releaseDate: "Jun 14, 2026",
    likes: "15.2K",
    comments: 612,
    coverPosition: "50% 100%",
    summary: "A signal tower becomes the stage for a city-wide confession.",
  },
  {
    id: "night-pier",
    title: "Night Pier Sonata",
    chapter: "Chapter 07",
    releaseDate: "Jun 10, 2026",
    likes: "7.9K",
    comments: 244,
    coverPosition: "100% 100%",
    summary: "The ocean answers a songwriter with panels torn from the tide.",
  },
];

export const animations: Animation[] = [
  {
    id: "subway-loop",
    title: "Subway Loop: Pilot",
    duration: "12:44",
    views: "403K",
    likes: "32K",
    comments: 2101,
    thumbPosition: "0% 0%",
    episode: "Episode 01",
    description: "A kinetic short about a tunnel that edits time every time the doors close.",
  },
  {
    id: "roofline",
    title: "Roofline Cut",
    duration: "08:31",
    views: "188K",
    likes: "16K",
    comments: 922,
    thumbPosition: "100% 0%",
    episode: "Episode 04",
    description: "A silent chase across panel borders, animated like a storyboard waking up.",
  },
  {
    id: "studio-night",
    title: "Studio Night Process",
    duration: "21:08",
    views: "94K",
    likes: "8.2K",
    comments: 401,
    thumbPosition: "0% 100%",
    episode: "Featurette",
    description: "Behind the Wet Sponge desk: layouts, timing sheets, ink tests, and sound cues.",
  },
  {
    id: "storm-city",
    title: "Storm City Overture",
    duration: "16:19",
    views: "267K",
    likes: "23K",
    comments: 1176,
    thumbPosition: "100% 100%",
    episode: "Episode 02",
    description: "A city-sized storm turns the skyline into a giant animated soundboard.",
  },
];

export const tracks: Track[] = [
  {
    id: "ink-wave",
    title: "Ink Wave",
    artist: "Pairio",
    type: "Single",
    duration: "3:18",
    artPosition: "0% 0%",
  },
  {
    id: "manuscript-room",
    title: "Manuscript Room",
    artist: "Crispy",
    type: "Album",
    duration: "29:44",
    artPosition: "100% 0%",
  },
  {
    id: "moon-keys",
    title: "Moon Keys",
    artist: "G7",
    type: "OST",
    duration: "4:07",
    artPosition: "0% 100%",
  },
  {
    id: "wet-cassette",
    title: "Wet Cassette",
    artist: "SHRI + ZEN",
    type: "Playlist",
    duration: "41:02",
    artPosition: "100% 100%",
  },
];

export const users: User[] = [
  { id: "pairio", name: "Pairio", bio: "Founder, writer, sound director.", avatar: "PA" },
  { id: "crispy", name: "Crispy", bio: "Co-founder, panels and production.", avatar: "CR" },
  { id: "g7", name: "G7", bio: "Co-founder, animation timing.", avatar: "G7" },
  { id: "shri", name: "SHRI", bio: "Co-founder, music and community.", avatar: "SH" },
  { id: "zen", name: "ZEN", bio: "Co-founder, story systems.", avatar: "ZN" },
];

export const posts: Post[] = [
  {
    id: "p1",
    author: "PanelSeeker",
    tag: "Theory",
    body: "The missing train in Paper Moon Terminal is probably the same signal from Tower Zenith.",
    likes: 814,
    comments: 96,
  },
  {
    id: "p2",
    author: "InkSink",
    tag: "Fan Art",
    body: "Shared a monochrome poster study for Rain Arc Signal with heavier screentone shadows.",
    likes: 526,
    comments: 44,
  },
  {
    id: "p3",
    author: "QueueCut",
    tag: "Music",
    body: "Ink Wave hits differently when the Storm City player switches into theater mode.",
    likes: 347,
    comments: 33,
  },
];
