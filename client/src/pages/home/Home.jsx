import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Flame,
  Users,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Swords,
  Play,
  Radio,
  Star,
} from "lucide-react";
import { games } from "../Games.js";

const heroSlides = [
  {
    id: "01",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1800",
    tag: "SEASON 04 • CYBER ARENA",
    titleTop: "ENTER THE",
    titleHighlight: "NEXT-GEN ARENA",
    subtitle:
      "Compete in real-time multiplayer battles, dominate ranked lobbies, and forge your legacy in the PlayVerse.",
    stats: { players: "12.4K Online", ping: "14ms Ping", prize: "₹1,00,000 Pool" },
  },
  {
    id: "02",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1800",
    tag: "MULTIPLAYER • INSTANT PLAY",
    titleTop: "CHALLENGE",
    titleHighlight: "GLOBAL RIVALS",
    subtitle:
      "Zero downloads. Instant matchmaking. Jump straight into strategy classics and high-speed arcade duels.",
    stats: { players: "25+ Titles", ping: "Zero Lag", prize: "Daily Rewards" },
  },
  {
    id: "03",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1800",
    tag: "PRIVATE LOBBIES • SQUAD UP",
    titleTop: "SQUAD UP &",
    titleHighlight: "RULE THE BOARD",
    subtitle:
      "Create custom private rooms in one click, share your invite code, and settle every rivalry with your friends.",
    stats: { players: "2–4 Players", ping: "Voice & Chat", prize: "Custom Rules" },
  },
  {
    id: "04",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1800",
    tag: "RANKED TOURNAMENTS",
    titleTop: "CLAIM YOUR",
    titleHighlight: "GRANDMASTER CROWN",
    subtitle:
      "Climb through Bronze to Grandmaster tiers, unlock holographic badges, and win weekly tournament rewards.",
    stats: { players: "50K+ Matches", ping: "Live Ranks", prize: "Weekly Cups" },
  },
];

const tournaments = [
  {
    id: 1,
    title: "Weekend Blitz Championship",
    game: "Ludo Master Pro",
    prize: "₹25,000 Pool",
    players: "1,240 / 2,000",
    status: "LIVE NOW",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800",
  },
  {
    id: 2,
    title: "Grandmaster Rapid Cup",
    game: "Chess Royale",
    prize: "₹50,000 Pool",
    players: "890 / 1,000",
    status: "STARTING SOON",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800",
  },
  {
    id: 3,
    title: "Midnight Showdown",
    game: "Carrom Clash",
    prize: "₹15,000 Pool",
    players: "450 / 500",
    status: "REGISTERING",
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800",
  },
];

const leaderboard = [
  { rank: 1, name: "ShadowSlayer_99", wins: 412, winRate: "78%", points: "14,850 XP", badge: "Grandmaster" },
  { rank: 2, name: "AaravGaming", wins: 389, winRate: "74%", points: "13,920 XP", badge: "Diamond I" },
  { rank: 3, name: "ValkyrieQueen", wins: 356, winRate: "71%", points: "12,640 XP", badge: "Diamond II" },
  { rank: 4, name: "NeonStriker", wins: 310, winRate: "68%", points: "11,400 XP", badge: "Platinum I" },
];

function Home() {
  const nav = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const active = heroSlides[currentSlide];

  const filteredGames = games.filter((game) => {
    if (selectedFilter === "ALL") return true;
    const cat = (game.category || "BOARD").toUpperCase();
    return cat === selectedFilter;
  });

  // Reusable dynamic theme style objects
  const cardStyle = {
    backgroundColor: "var(--card-bg)",
    borderColor: "var(--border-color)",
  };

  const subCardStyle = {
    backgroundColor: "var(--subcard-bg)",
    borderColor: "var(--border-color)",
  };

  const primaryBtnStyle = {
    backgroundColor: "var(--btn)",
    color: "var(--btn-text)",
  };

  return (
    <div
      style={{
        background: "var(--main-background)",
        color: "var(--primary-text-color)",
        fontFamily: "var(--font-family)",
      }}
      className="min-h-screen transition-colors duration-300 overflow-x-hidden"
    >
      {/* =====================================================================
          1. COMPACT HERO CAROUSEL
          (Always uses high-contrast dark cinematic overlay over hero images
           so white & accent typography stay sharp on every theme)
      ====================================================================== */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ borderColor: "var(--border-color)" }}
        className="relative w-full h-[520px] md:h-[560px] flex flex-col justify-between overflow-hidden border-b"
        id="hero"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100 z-0"
                : "opacity-0 scale-105 -z-10 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.titleHighlight}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/45" />
          </div>
        ))}

        {/* Top HUD Status Bar */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 pt-5 flex items-center justify-between text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              SERVERS ONLINE • 12,480 PLAYERS
            </span>
          </div>

          <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-white/10 border border-white/15 text-[10px] font-orbitron text-zinc-300 backdrop-blur-md">
            SYS // 2026.4
          </span>
        </div>

        {/* Center Main Hero Content */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 my-auto text-white">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md">
              <span
                style={{ backgroundColor: "var(--secondary-text-color)" }}
                className="w-1.5 h-1.5 rounded-full"
              />
              <span
                style={{ color: "var(--secondary-text-color)" }}
                className="text-[10px] font-extrabold tracking-[0.2em] uppercase"
              >
                {active.tag}
              </span>
            </div>

            <h1 className="font-orbitron text-3xl sm:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight uppercase">
              <span className="block text-white">{active.titleTop}</span>
              <span
                style={{ color: "var(--secondary-text-color)" }}
                className="block mt-0.5"
              >
                {active.titleHighlight}
              </span>
            </h1>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              {active.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#games"
                style={primaryBtnStyle}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-orbitron font-bold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Launch Arena
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-orbitron font-bold text-xs tracking-wider uppercase backdrop-blur-md transition-all"
              >
                Join Squad
              </Link>

              <div className="hidden lg:flex items-center gap-4 pl-3 border-l border-white/20 text-[11px] font-semibold text-zinc-300">
                <span>{active.stats.players}</span>
                <span>•</span>
                <span>{active.stats.ping}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slide Selector Deck */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 pb-5 text-white">
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/15">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 max-w-2xl">
              {heroSlides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      borderColor: isActive
                        ? "var(--secondary-text-color)"
                        : "rgba(255,255,255,0.14)",
                    }}
                    className={`text-left px-3 py-2 rounded-lg border backdrop-blur-md transition-all cursor-pointer ${
                      isActive ? "bg-white/15" : "bg-black/45 opacity-65 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] font-orbitron font-bold">
                      <span
                        style={{
                          color: isActive ? "var(--secondary-text-color)" : "#a1a1aa",
                        }}
                      >
                        {slide.id}
                      </span>
                      {isActive && (
                        <span
                          style={{ backgroundColor: "var(--secondary-text-color)" }}
                          className="w-1.5 h-1.5 rounded-full"
                        />
                      )}
                    </div>
                    <p className="text-[11px] font-bold truncate mt-0.5 text-white">
                      {slide.titleHighlight}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block font-orbitron text-xs font-bold">
                <span
                  style={{ color: "var(--secondary-text-color)" }}
                  className="text-base"
                >
                  {active.id}
                </span>
                <span className="text-zinc-400 mx-1">/</span>
                <span className="text-zinc-300">0{heroSlides.length}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. GAMES SECTION (ADAPTS TO FONT & BACKGROUND THEME)
      ====================================================================== */}
      <section id="games" className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div
                style={{
                  ...subCardStyle,
                  color: "var(--secondary-text-color)",
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3"
              >
                <Flame className="w-3.5 h-3.5" />
                <span className="text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase">
                  Arena Library • Instant Launch
                </span>
              </div>

              <h2 className="font-orbitron text-3xl sm:text-5xl font-black tracking-tight">
                CHOOSE YOUR{" "}
                <span style={{ color: "var(--secondary-text-color)" }}>
                  BATTLEGROUND
                </span>
              </h2>

              <p
                style={{ color: "var(--text)" }}
                className="text-sm sm:text-base mt-2 max-w-xl"
              >
                Jump into high-intensity multiplayer arenas with instant matchmaking and live rankings.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div
              style={cardStyle}
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-md self-start lg:self-auto"
            >
              {["ALL", "BOARD", "STRATEGY", "ARCADE"].map((tab) => {
                const activeTab = selectedFilter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedFilter(tab)}
                    style={
                      activeTab
                        ? primaryBtnStyle
                        : { color: "var(--text)" }
                    }
                    className="px-4 py-2 rounded-xl font-orbitron text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stylish Game Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {(filteredGames.length > 0 ? filteredGames : games).map((game, idx) => (
              <div
                key={game.id}
                onClick={() => nav(`/loadgame/${game.id}`)}
                style={cardStyle}
                className="group relative rounded-3xl border backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      style={{ color: "var(--secondary-text-color)" }}
                      className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-orbitron font-bold tracking-widest uppercase"
                    >
                      {game.category || "BOARD"}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-bold text-amber-300">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      4.{8 - (idx % 2)}
                    </span>
                  </div>

                  {/* Center Hover Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[2px]">
                    <div
                      style={primaryBtnStyle}
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl scale-75 group-hover:scale-100 transition-transform duration-300"
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{(idx + 1) * 340 + 120} Playing Now</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="font-orbitron font-bold text-base truncate">
                      {game.name}
                    </h3>
                    <div
                      style={{ color: "var(--text)" }}
                      className="flex items-center gap-3 text-xs mt-1.5"
                    >
                      <span className="flex items-center gap-1">
                        <Users
                          style={{ color: "var(--secondary-text-color)" }}
                          className="w-3.5 h-3.5"
                        />{" "}
                        2–4 Players
                      </span>
                      <span>•</span>
                      <span>Ranked & Casual</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nav(`/loadgame/${game.id}`);
                    }}
                    style={primaryBtnStyle}
                    className="w-full py-3 rounded-xl font-orbitron text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Enter Arena</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. HOW IT WORKS
      ====================================================================== */}
      <section id="about" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            style={{ color: "var(--secondary-text-color)" }}
            className="text-xs font-extrabold tracking-[0.25em] uppercase"
          >
            Instant Onboarding
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-extrabold mt-2">
            HOW{" "}
            <span style={{ color: "var(--secondary-text-color)" }}>
              PLAYVERSE
            </span>{" "}
            WORKS
          </h2>
          <p
            style={{ color: "var(--text)" }}
            className="text-sm sm:text-base mt-3"
          >
            Go from landing page to live multiplayer match in under 15 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              icon: (
                <Sparkles
                  style={{ color: "var(--secondary-text-color)" }}
                  className="w-6 h-6"
                />
              ),
              title: "Create Cyber ID",
              desc: "Claim your unique gamer tag, customize your avatar, and unlock starter XP boosts.",
            },
            {
              step: "02",
              icon: (
                <Swords
                  style={{ color: "var(--accent-color)" }}
                  className="w-6 h-6"
                />
              ),
              title: "Enter Any Arena",
              desc: "Join public ranked queues or generate a private room link for instant friend duels.",
            },
            {
              step: "03",
              icon: (
                <Crown
                  style={{ color: "var(--secondary-text-color)" }}
                  className="w-6 h-6"
                />
              ),
              title: "Dominate & Earn",
              desc: "Win matches to climb seasonal divisions and unlock exclusive tournament rewards.",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={cardStyle}
              className="relative p-8 rounded-3xl border backdrop-blur-md transition-all hover:-translate-y-1"
            >
              <span
                style={{ color: "var(--secondary-text-color)" }}
                className="font-orbitron text-5xl font-black opacity-15 absolute top-6 right-6"
              >
                {item.step}
              </span>
              <div
                style={subCardStyle}
                className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-6"
              >
                {item.icon}
              </div>
              <h3 className="font-orbitron text-lg font-bold mb-2">
                {item.title}
              </h3>
              <p
                style={{ color: "var(--text)" }}
                className="text-sm leading-relaxed"
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. LIVE TOURNAMENTS & LEADERBOARD
      ====================================================================== */}
      <section
        style={{ borderColor: "var(--border-color)" }}
        className="py-20 px-6 md:px-12 lg:px-20 border-y"
        id="leaderboards"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Tournaments */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span
                style={{ color: "var(--secondary-text-color)" }}
                className="text-xs font-extrabold tracking-[0.22em] uppercase"
              >
                High-Stakes Action
              </span>
              <h2 className="font-orbitron text-2xl sm:text-4xl font-extrabold mt-1">
                LIVE{" "}
                <span style={{ color: "var(--secondary-text-color)" }}>
                  TOURNAMENTS
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {tournaments.map((tourney) => (
                <div
                  key={tourney.id}
                  style={cardStyle}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border backdrop-blur-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={tourney.image}
                      alt={tourney.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span
                        style={{
                          ...subCardStyle,
                          color: "var(--secondary-text-color)",
                        }}
                        className="inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-orbitron font-bold tracking-wider uppercase mb-1.5"
                      >
                        {tourney.status}
                      </span>
                      <h3 className="font-bold text-base">{tourney.title}</h3>
                      <p
                        style={{ color: "var(--text)" }}
                        className="text-xs mt-0.5"
                      >
                        {tourney.game} •{" "}
                        <span className="text-emerald-500 font-bold">
                          {tourney.prize}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div
                    style={{ borderColor: "var(--border-color)" }}
                    className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-3 sm:pt-0 border-t sm:border-t-0"
                  >
                    <span
                      style={{ color: "var(--text)" }}
                      className="text-xs"
                    >
                      {tourney.players} Joined
                    </span>
                    <Link
                      to="/login"
                      style={primaryBtnStyle}
                      className="px-4 py-2 rounded-lg font-orbitron text-[11px] font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span
                style={{ color: "var(--secondary-text-color)" }}
                className="text-xs font-extrabold tracking-[0.22em] uppercase"
              >
                Global Rankings
              </span>
              <h2 className="font-orbitron text-2xl sm:text-4xl font-extrabold mt-1">
                TOP{" "}
                <span style={{ color: "var(--secondary-text-color)" }}>
                  CHAMPIONS
                </span>
              </h2>
            </div>

            <div
              style={cardStyle}
              className="p-6 rounded-3xl border backdrop-blur-md space-y-4"
            >
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  style={subCardStyle}
                  className="flex items-center justify-between p-3.5 rounded-2xl border"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      style={primaryBtnStyle}
                      className="w-10 h-10 rounded-xl font-orbitron font-bold text-sm flex items-center justify-center"
                    >
                      #{player.rank}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{player.name}</h4>
                      <p
                        style={{ color: "var(--text)" }}
                        className="text-[11px]"
                      >
                        {player.wins} Wins • {player.winRate} Win Rate
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      style={{ color: "var(--secondary-text-color)" }}
                      className="font-orbitron text-xs font-bold block"
                    >
                      {player.points}
                    </span>
                    <span
                      style={{ color: "var(--text)" }}
                      className="text-[10px]"
                    >
                      {player.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMMUNITY CTA BANNER
      ====================================================================== */}
      <section id="about" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div
          style={cardStyle}
          className="relative overflow-hidden rounded-3xl border backdrop-blur-md p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-4 max-w-xl relative z-10">
            <span
              style={{ color: "var(--secondary-text-color)" }}
              className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.22em] uppercase"
            >
              <Shield className="w-4 h-4" /> Your Arena. Your Legacy.
            </span>
            <h2 className="font-orbitron text-3xl sm:text-5xl font-extrabold leading-tight">
              READY TO BECOME{" "}
              <span style={{ color: "var(--secondary-text-color)" }}>
                A LEGEND?
              </span>
            </h2>
            <p
              style={{ color: "var(--text)" }}
              className="text-sm sm:text-base leading-relaxed"
            >
              Create your free account, challenge your friends in private rooms, and climb to the top of the PlayVerse leaderboard.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                style={primaryBtnStyle}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-orbitron text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition-all"
              >
                Start Playing Now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div
            style={subCardStyle}
            className="relative z-10 flex items-center justify-center w-32 h-32 sm:w-44 sm:h-44 rounded-3xl border"
          >
            <Gamepad2
              style={{ color: "var(--secondary-text-color)" }}
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FOOTER
      ====================================================================== */}
      <footer
        style={{
          backgroundColor: "var(--navbar)",
          borderColor: "var(--border-color)",
        }}
        className="border-t py-10 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <Link
            to="/"
            className="font-orbitron text-xl font-extrabold tracking-wider flex items-center gap-2"
          >
            <Zap
              style={{ color: "var(--secondary-text-color)" }}
              className="w-5 h-5"
            />
            PLAY
            <span style={{ color: "var(--secondary-text-color)" }}>VERSE</span>
          </Link>

          <p style={{ color: "var(--text)" }} className="text-xs">
            © 2026 PlayVerse. Made for gamers, by gamers.
          </p>

          <span
            style={{ color: "var(--secondary-text-color)" }}
            className="text-xs font-orbitron font-bold tracking-[0.2em] uppercase"
          >
            Game On. Level Up.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home; 