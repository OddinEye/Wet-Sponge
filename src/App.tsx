import { FormEvent, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bell,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Expand,
  Heart,
  Home,
  MessageCircle,
  Music2,
  Pause,
  Play,
  Plus,
  Search,
  Send,
  Share2,
  User,
  Users,
  Volume2,
} from "lucide-react";
import { animations, manga, posts as seedPosts, tracks, users, type Animation, type Manga, type Post, type Track } from "./data";

type Page =
  | "home"
  | "manga"
  | "reader"
  | "animation"
  | "watch"
  | "music"
  | "community"
  | "profile"
  | "search"
  | "about";

const navItems: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "manga", label: "Manga" },
  { page: "animation", label: "Animation" },
  { page: "music", label: "Music" },
  { page: "community", label: "Community" },
  { page: "about", label: "About" },
];

const comments = [
  { user: "PanelSeeker", text: "The page pacing here feels like music.", likes: 149, time: "12m" },
  { user: "InkSink", text: "That double spread deserves a print edition.", likes: 87, time: "31m" },
  { user: "QueueCut", text: "Saving this chapter for the soundtrack drop.", likes: 52, time: "1h" },
];

function readStore<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [query, setQuery] = useState("");
  const [selectedManga, setSelectedManga] = useState(manga[0]);
  const [selectedAnimation, setSelectedAnimation] = useState(animations[0]);
  const [currentTrack, setCurrentTrack] = useState<Track>(() => readStore("wet-current-track", tracks[0]));
  const [playing, setPlaying] = useState(() => readStore("wet-playing", false));
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() => readStore("wet-bookmarks", {}));

  useEffect(() => {
    window.localStorage.setItem("wet-current-track", JSON.stringify(currentTrack));
    window.localStorage.setItem("wet-playing", JSON.stringify(playing));
  }, [currentTrack, playing]);

  useEffect(() => {
    window.localStorage.setItem("wet-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const openManga = (item: Manga) => {
    setSelectedManga(item);
    setPage("reader");
  };

  const openAnimation = (item: Animation) => {
    setSelectedAnimation(item);
    setPage("watch");
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} query={query} setQuery={setQuery} />
      <main>
        {page === "home" && (
          <HomePage
            setPage={setPage}
            openManga={openManga}
            openAnimation={openAnimation}
            setTrack={setCurrentTrack}
            setPlaying={setPlaying}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {page === "manga" && (
          <MangaPage
            openManga={openManga}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {page === "reader" && <ReaderPage item={selectedManga} setPage={setPage} />}
        {page === "animation" && <AnimationPage openAnimation={openAnimation} />}
        {page === "watch" && <WatchPage item={selectedAnimation} openAnimation={openAnimation} />}
        {page === "music" && (
          <MusicPage setTrack={setCurrentTrack} setPlaying={setPlaying} currentTrack={currentTrack} />
        )}
        {page === "community" && <CommunityPage />}
        {page === "profile" && <ProfilePage />}
        {page === "search" && <SearchPage query={query} setQuery={setQuery} openManga={openManga} openAnimation={openAnimation} setTrack={setCurrentTrack} setPlaying={setPlaying} />}
        {page === "about" && <AboutPage />}
      </main>
      <MiniPlayer track={currentTrack} playing={playing} setPlaying={setPlaying} setTrack={setCurrentTrack} />
    </div>
  );
}

function Navbar({ page, setPage, query, setQuery }: { page: Page; setPage: (page: Page) => void; query: string; setQuery: (query: string) => void }) {
  return (
    <header className="navbar">
      <button className="brand" onClick={() => setPage("home")} aria-label="Wet Sponge home">
        WET SPONGE
      </button>
      <nav aria-label="Primary">
        {navItems.map((item) => (
          <button key={item.page} data-testid={`nav-${item.page}`} className={page === item.page ? "active" : ""} onClick={() => setPage(item.page)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="nav-actions">
        <label className="search-pill">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage("search");
            }}
            placeholder="Search Wet Sponge"
          />
        </label>
        <button className="icon-btn" aria-label="Notifications"><Bell size={18} /></button>
        <button className="profile-chip" onClick={() => setPage("profile")}><User size={16} /> Pairio</button>
      </div>
    </header>
  );
}

function HomePage(props: {
  setPage: (page: Page) => void;
  openManga: (item: Manga) => void;
  openAnimation: (item: Animation) => void;
  setTrack: (track: Track) => void;
  setPlaying: (playing: boolean) => void;
  bookmarks: Record<string, boolean>;
  setBookmarks: (bookmarks: Record<string, boolean>) => void;
}) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 90]);

  return (
    <>
      <section className="hero">
        <motion.div className="hero-bg" style={{ y: heroY }} />
        <div className="hero-overlay" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow">Squeezing out Art.</p>
          <h1>Spongies</h1>
          <p>Stories, animations, and music created by Wet Sponge.</p> 
          <div className="hero-actions">
            <button onClick={() => props.setPage("manga")}><Bookmark size={18} /> Read Manga</button>
            <button onClick={() => props.setPage("animation")}><Clapperboard size={18} /> Watch Animation</button>
            <button onClick={() => props.setPage("music")}><Music2 size={18} /> Listen Music</button>
          </div>
        </motion.div>
      </section>
      <SectionHeader title="Continue Reading" action="Saved progress" />
      <div className="rail">
        {manga.slice(0, 3).map((item, index) => (
          <button key={item.id} className="continue-card" data-testid={`continue-${item.id}`} onClick={() => props.openManga(item)}>
            <SheetImage type="manga" position={item.coverPosition} />
            <span>{item.title}</span>
            <small>{35 + index * 18}% complete</small>
            <div className="progress"><span style={{ width: `${35 + index * 18}%` }} /></div>
          </button>
        ))}
      </div>
      <SectionHeader title="Latest Manga" action="Fresh chapters" />
      <CardGrid>
        {manga.slice(0, 4).map((item) => (
          <MangaCard key={item.id} item={item} openManga={props.openManga} bookmarked={!!props.bookmarks[item.id]} toggleBookmark={() => props.setBookmarks({ ...props.bookmarks, [item.id]: !props.bookmarks[item.id] })} />
        ))}
      </CardGrid>
      <SectionHeader title="Latest Animation" action="Cinematic drops" />
      <VideoGrid items={animations} openAnimation={props.openAnimation} />
      <SectionHeader title="Latest Music" action="Studio sound" />
      <MusicGrid tracks={tracks} setTrack={props.setTrack} setPlaying={props.setPlaying} />
      <SectionHeader title="Trending" action="Mixed signal" />
      <div className="trending-grid">
        <Trend icon={<Bookmark />} title="Trending Manga" text={manga[4].title} />
        <Trend icon={<Clapperboard />} title="Trending Animation" text={animations[3].title} />
        <Trend icon={<Music2 />} title="Trending Music" text={tracks[0].title} />
      </div>
    </>
  );
}

function MangaPage({ openManga, bookmarks, setBookmarks }: { openManga: (item: Manga) => void; bookmarks: Record<string, boolean>; setBookmarks: (bookmarks: Record<string, boolean>) => void }) {
  return (
    <PageShell eyebrow="Manga" title="Original chapters from the Wet Sponge shelf." intro="Read vertically, save progress, and keep the studio library close.">
      <CardGrid>
        {manga.map((item) => (
          <MangaCard key={item.id} item={item} openManga={openManga} bookmarked={!!bookmarks[item.id]} toggleBookmark={() => setBookmarks({ ...bookmarks, [item.id]: !bookmarks[item.id] })} />
        ))}
      </CardGrid>
    </PageShell>
  );
}

function ReaderPage({ item, setPage }: { item: Manga; setPage: (page: Page) => void }) {
  const [zoom, setZoom] = useState(() => readStore(`wet-zoom-${item.id}`, 100));
  const [paper, setPaper] = useState(false);
  const [progress, setProgress] = useState(() => readStore(`wet-progress-${item.id}`, 42));

  useEffect(() => {
    window.localStorage.setItem(`wet-zoom-${item.id}`, JSON.stringify(zoom));
    window.localStorage.setItem(`wet-progress-${item.id}`, JSON.stringify(progress));
  }, [item.id, progress, zoom]);

  return (
    <PageShell eyebrow={item.chapter} title={item.title} intro={item.summary}>
      <div className="reader-toolbar">
        <button onClick={() => setPage("manga")}><ChevronLeft size={18} /> Library</button>
        <button onClick={() => setZoom(Math.max(80, zoom - 10))}>Zoom -</button>
        <span>{zoom}%</span>
        <button onClick={() => setZoom(Math.min(140, zoom + 10))}>Zoom +</button>
        <button onClick={() => setPaper(!paper)}>{paper ? "Dark Mode" : "Paper Mode"}</button>
        <button><Expand size={18} /> Fullscreen</button>
      </div>
      <div className="reader-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className={`reader-pages ${paper ? "paper" : ""}`} style={{ "--zoom": zoom / 100 } as CSSProperties}>
        {[1, 2, 3, 4].map((pageNo) => (
          <button key={pageNo} className="manga-page" onClick={() => setProgress(Math.min(100, progress + 12))}>
            <span>PAGE {pageNo}</span>
            <strong>{pageNo % 2 ? "Ink silence." : "Panel break."}</strong>
          </button>
        ))}
      </div>
      <div className="chapter-actions">
        <button><ChevronLeft size={18} /> Previous Chapter</button>
        <button><Heart size={18} /> Like</button>
        <button><MessageCircle size={18} /> Comment</button>
        <button><Bookmark size={18} /> Bookmark</button>
        <button><Share2 size={18} /> Share</button>
        <button>Next Chapter <ChevronRight size={18} /></button>
      </div>
      <Comments />
    </PageShell>
  );
}

function AnimationPage({ openAnimation }: { openAnimation: (item: Animation) => void }) {
  return (
    <PageShell eyebrow="Animation" title="Cinematic shorts, episodes, and studio process." intro="A streaming-style room for Wet Sponge motion work.">
      <VideoGrid items={animations} openAnimation={openAnimation} />
    </PageShell>
  );
}

function WatchPage({ item, openAnimation }: { item: Animation; openAnimation: (item: Animation) => void }) {
  const [theater, setTheater] = useState(false);
  const [speed, setSpeed] = useState("1x");
  const [quality, setQuality] = useState("1080p");

  return (
    <PageShell eyebrow={item.episode} title={item.title} intro={item.description}>
      <div className={theater ? "watch-layout theater" : "watch-layout"}>
        <div className="video-player">
          <SheetImage type="animation" position={item.thumbPosition} />
          <button className="play-large"><Play size={34} /></button>
          <span className="duration">{item.duration}</span>
        </div>
        <aside className="episode-list">
          <h3>Episodes</h3>
          {animations.map((episode) => (
            <button key={episode.id} className={episode.id === item.id ? "active" : ""} onClick={() => openAnimation(episode)}>
              <span>{episode.episode}</span>
              <small>{episode.title}</small>
            </button>
          ))}
        </aside>
      </div>
      <div className="watch-controls">
        <button data-testid="theater-mode" onClick={() => setTheater(!theater)}><Expand size={18} /> Theater Mode</button>
        <button>Fullscreen</button>
        <label>Speed <select value={speed} onChange={(event) => setSpeed(event.target.value)}><option>0.75x</option><option>1x</option><option>1.25x</option><option>1.5x</option></select></label>
        <label>Quality <select value={quality} onChange={(event) => setQuality(event.target.value)}><option>720p</option><option>1080p</option><option>4K</option></select></label>
        <button><Heart size={18} /> Like</button>
        <button><Bookmark size={18} /> Save</button>
      </div>
      <Comments />
      <SectionHeader title="Related Videos" action="Auto next ready" />
      <VideoGrid items={animations.filter((episode) => episode.id !== item.id)} openAnimation={openAnimation} />
    </PageShell>
  );
}

function MusicPage({ setTrack, setPlaying, currentTrack }: { setTrack: (track: Track) => void; setPlaying: (playing: boolean) => void; currentTrack: Track }) {
  return (
    <PageShell eyebrow="Music" title="Albums, singles, playlists, and OST from the studio." intro="Browse while the bottom player carries the queue across the site.">
      <div className="tabs" role="tablist" aria-label="Music categories">
        {["Albums", "Singles", "Playlists", "OST"].map((tab) => <button key={tab}>{tab}</button>)}
      </div>
      <MusicGrid tracks={tracks} setTrack={setTrack} setPlaying={setPlaying} currentTrack={currentTrack} />
      <div className="queue-panel">
        <h3>Queue</h3>
        {tracks.map((track, index) => <span key={track.id}>{index + 1}. {track.title} / {track.duration}</span>)}
      </div>
    </PageShell>
  );
}

function CommunityPage() {
  const [items, setItems] = useState<Post[]>(seedPosts);
  const [draft, setDraft] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setItems([{ id: crypto.randomUUID(), author: "You", tag: "Post", body: draft.trim(), likes: 0, comments: 0 }, ...items]);
    setDraft("");
  };

  return (
    <PageShell eyebrow="Community" title="Fan art, theories, chapter talk, and studio chatter." intro="Create posts and react to the Wet Sponge signal.">
      <form className="composer" onSubmit={submit}>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share a theory, fan art note, or chapter reaction..." />
        <button><Send size={18} /> Post</button>
      </form>
      <div className="post-list">
        {items.map((post) => (
          <article key={post.id} className="post-card">
            <p className="eyebrow">{post.tag} / {post.author}</p>
            <p>{post.body}</p>
            <div>
              <button><Heart size={16} /> {post.likes}</button>
              <button><MessageCircle size={16} /> {post.comments}</button>
              <button><Share2 size={16} /> Share</button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ProfilePage() {
  return (
    <PageShell eyebrow="Profile" title="Pairio" intro="Founder of Wet Sponge. Reading, watching, and listening history live here.">
      <div className="profile-grid">
        <div className="profile-card">
          <div className="avatar-xl">PA</div>
          <h3>Pairio</h3>
          <p>Founder, writer, sound director.</p>
          <div className="stats"><span>18K Followers</span><span>42 Following</span></div>
        </div>
        {["Reading History", "Watch History", "Listening History", "Saved Manga", "Saved Videos", "Saved Music"].map((title) => (
          <div className="history-card" key={title}><h3>{title}</h3><p>{manga[0].title}</p><p>{animations[0].title}</p><p>{tracks[0].title}</p></div>
        ))}
      </div>
    </PageShell>
  );
}

function SearchPage({ query, setQuery, openManga, openAnimation, setTrack, setPlaying }: { query: string; setQuery: (query: string) => void; openManga: (item: Manga) => void; openAnimation: (item: Animation) => void; setTrack: (track: Track) => void; setPlaying: (playing: boolean) => void }) {
  const results = useMemo(() => {
    const needle = query.toLowerCase();
    return {
      manga: manga.filter((item) => item.title.toLowerCase().includes(needle)),
      animations: animations.filter((item) => item.title.toLowerCase().includes(needle)),
      tracks: tracks.filter((item) => item.title.toLowerCase().includes(needle) || item.artist.toLowerCase().includes(needle)),
      users: users.filter((item) => item.name.toLowerCase().includes(needle)),
    };
  }, [query]);

  return (
    <PageShell eyebrow="Search" title="Find manga, animation, music, and users instantly." intro="Suggestions update as you type.">
      <label className="big-search"><Search /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Rain, Studio, Pairio, Ink..." /></label>
      <div className="search-results">
        <ResultGroup title="Manga">{results.manga.map((item) => <button key={item.id} onClick={() => openManga(item)}>{item.title}<small>{item.chapter}</small></button>)}</ResultGroup>
        <ResultGroup title="Animation">{results.animations.map((item) => <button key={item.id} onClick={() => openAnimation(item)}>{item.title}<small>{item.duration}</small></button>)}</ResultGroup>
        <ResultGroup title="Music">{results.tracks.map((item) => <button key={item.id} onClick={() => { setTrack(item); setPlaying(true); }}>{item.title}<small>{item.artist}</small></button>)}</ResultGroup>
        <ResultGroup title="Users">{results.users.map((item) => <button key={item.id}>{item.name}<small>{item.bio}</small></button>)}</ResultGroup>
      </div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="About" title="Wet Sponge" intro="Creating original manga, animation, and music under one creative studio.">
      <div className="about-grid">
        <article><h3>Founder</h3><p>PAIRIO / G7</p></article>
        <article><h3>Co-Founders</h3><p>CRISPY / ZEN</p></article>
        <article><h3>Manager</h3><p>SHRI</p></article>
      </div>
      <footer className="footer">
        {["About", "Contact", "Privacy Policy", "Terms of Service", "Discord", "Instagram", "YouTube"].map((link) => (
  <button key={link}>{link}</button>
))}
      
      </footer>
    </PageShell>
  );
}

function MangaCard({ item, openManga, bookmarked, toggleBookmark }: { item: Manga; openManga: (item: Manga) => void; bookmarked: boolean; toggleBookmark: () => void }) {
  return (
    <motion.article className="content-card" whileHover={{ y: -6 }}>
          <button className="image-button" data-testid={`open-manga-${item.id}`} onClick={() => openManga(item)}><SheetImage type="manga" position={item.coverPosition} /></button>
      <div className="card-body">
        <h3>{item.title}</h3>
        <p>{item.chapter} / {item.releaseDate}</p>
        <div className="meta"><span><Heart size={15} /> {item.likes}</span><span><MessageCircle size={15} /> {item.comments}</span><button onClick={toggleBookmark} aria-label="Bookmark manga"><Bookmark size={16} fill={bookmarked ? "white" : "none"} /></button></div>
      </div>
    </motion.article>
  );
}

function VideoGrid({ items, openAnimation }: { items: Animation[]; openAnimation: (item: Animation) => void }) {
  return (
    <div className="video-grid">
      {items.map((item) => (
        <motion.article className="video-card" key={item.id} whileHover={{ y: -6 }}>
          <button className="video-thumb" data-testid={`open-animation-${item.id}`} onClick={() => openAnimation(item)}>
            <SheetImage type="animation" position={item.thumbPosition} />
            <span>{item.duration}</span>
          </button>
          <h3>{item.title}</h3>
          <p>{item.views} views / {item.likes} likes / {item.comments} comments</p>
        </motion.article>
      ))}
    </div>
  );
}

function MusicGrid({ tracks: items, setTrack, setPlaying, currentTrack }: { tracks: Track[]; setTrack: (track: Track) => void; setPlaying: (playing: boolean) => void; currentTrack?: Track }) {
  return (
    <CardGrid>
      {items.map((track) => (
        <motion.article className={`music-card ${currentTrack?.id === track.id ? "active" : ""}`} key={track.id} whileHover={{ y: -6 }}>
          <SheetImage type="music" position={track.artPosition} />
          <h3>{track.title}</h3>
          <p>{track.artist} / {track.type}</p>
          <button onClick={() => { setTrack(track); setPlaying(true); }}><Play size={16} /> Play</button>
        </motion.article>
      ))}
    </CardGrid>
  );
}

function MiniPlayer({ track, playing, setPlaying, setTrack }: { track: Track; playing: boolean; setPlaying: (playing: boolean) => void; setTrack: (track: Track) => void }) {
  const index = tracks.findIndex((item) => item.id === track.id);
  const next = () => setTrack(tracks[(index + 1) % tracks.length]);
  const previous = () => setTrack(tracks[(index - 1 + tracks.length) % tracks.length]);

  return (
    <aside className="mini-player" aria-label="Music player">
      <div className="mini-track">
        <SheetImage type="music" position={track.artPosition} />
        <div><strong>{track.title}</strong><span>{track.artist}</span></div>
      </div>
      <div className="player-controls">
        <button onClick={previous} aria-label="Previous track"><ChevronLeft /></button>
        <button className="play-toggle" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause /> : <Play />}</button>
        <button onClick={next} aria-label="Next track"><ChevronRight /></button>
      </div>
      <div className="player-progress"><span style={{ width: playing ? "58%" : "28%" }} /></div>
      <Volume2 size={18} />
      <input className="volume" type="range" min="0" max="100" defaultValue="74" aria-label="Volume" />
    </aside>
  );
}

function SheetImage({ type, position }: { type: "manga" | "animation" | "music"; position: string }) {
  const src = type === "manga" ? "/assets/manga-covers.png" : type === "animation" ? "/assets/animation-thumbnails.png" : "/assets/music-art.png";
  return <img src={src} alt="" loading="lazy" style={{ objectPosition: position }} />;
}

function PageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section className="page-shell">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-intro">{intro}</p>
      </motion.div>
      {children}
    </section>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return <div className="section-header"><h2>{title}</h2><span>{action}</span></div>;
}

function CardGrid({ children }: { children: ReactNode }) {
  return <div className="card-grid">{children}</div>;
}

function Trend({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <article className="trend-card">{icon}<h3>{title}</h3><p>{text}</p></article>;
}

function Comments() {
  return (
    <section className="comments">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <article key={comment.user}>
          <div className="avatar">{comment.user.slice(0, 2).toUpperCase()}</div>
          <div><strong>{comment.user}</strong><small>{comment.time}</small><p>{comment.text}</p><button><Heart size={15} /> {comment.likes}</button><button>Reply</button></div>
        </article>
      ))}
    </section>
  );
}

function ResultGroup({ title, children }: { title: string; children: ReactNode }) {
  return <section className="result-group"><h3>{title}</h3>{children}</section>;
}

export default App;
