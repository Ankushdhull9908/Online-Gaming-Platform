import { useState } from "react";
import { Check, Crown, Palette, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const themeCards = [
  {
    id: "monochrome",
    name: "Obsidian Mono",
    badge: "Default B&W",
    isPremium: false,
    description: "Sharp black-and-white contrast with a clean, distraction-free arcade feel.",
    colors: ["#09090B", "#18181B", "#FFFFFF"],
    btnTextColor: "#09090B",
  },
  {
    id: "pureLight",
    name: "Alabaster Light",
    badge: "Crisp Light",
    isPremium: false,
    description: "Bright daylight surfaces paired with deep ink typography and crisp borders.",
    colors: ["#FAFAFA", "#FFFFFF", "#09090B"],
    btnTextColor: "#FFFFFF",
  },
  {
    id: "neon",
    name: "Midnight Violet",
    badge: "Cyber Dark",
    isPremium: false,
    description: "Deep indigo night tones with electric violet accents and smooth depth.",
    colors: ["#070913", "#0F1326", "#7C3AED"],
    btnTextColor: "#FFFFFF",
  },
  {
    id: "aurora",
    name: "Deep Ocean & Teal",
    badge: "Calm Cyber",
    isPremium: false,
    description: "Cool slate-ocean backgrounds balanced with calm teal and sky highlights.",
    colors: ["#060C12", "#0C1824", "#0D9488"],
    btnTextColor: "#FFFFFF",
  },
  {
    id: "obsidian",
    name: "Crimson Slate",
    badge: "Arena Red",
    isPremium: false,
    description: "Dark charcoal-plum surfaces accented with high-energy crimson rose.",
    colors: ["#0B070A", "#180E14", "#E11D48"],
    btnTextColor: "#FFFFFF",
  },
  {
    id: "pink",
    name: "Velvet Rose",
    badge: "Soft Neon",
    isPremium: false,
    description: "Rich dark plum shadows with vibrant magenta-rose buttons and highlights.",
    colors: ["#0C070C", "#1A0E1A", "#DB2777"],
    btnTextColor: "#FFFFFF",
  },
  {
    id: "green",
    name: "Forest Carbon",
    badge: "Emerald",
    isPremium: false,
    description: "Low-glare carbon green surfaces with crisp emerald tactical accents.",
    colors: ["#060D0A", "#0C1C15", "#059669"],
    btnTextColor: "#FFFFFF",
  },

  /* ================= PREMIUM THEME CARDS ================= */
  {
    id: "royalViolet",
    name: "Sovereign Amethyst",
    badge: "Premium",
    isPremium: true,
    description: "Royal amethyst depth with luminous orchid highlights and VIP card framing.",
    colors: ["#090512", "#190D2E", "#9333EA"],
    btnTextColor: "#FFFFFF",
  },
  {
    id: "emeraldVanguard",
    name: "Jade Dynasty",
    badge: "Premium",
    isPremium: true,
    description: "Signature jade-emerald atmosphere paired with crisp cyan-mint highlights.",
    colors: ["#040E0C", "#0A201C", "#10B981"],
    btnTextColor: "#04120E",
  },
  {
    id: "arcticFrost",
    name: "Glacier Platinum",
    badge: "Premium",
    isPremium: true,
    description: "Deep midnight ice tones with frost-blue accents and sleek executive polish.",
    colors: ["#050B14", "#0C192E", "#0284C7"],
    btnTextColor: "#FFFFFF",
  },
];

function Themes() {
  const { theme, setTheme, isLight } = useTheme();
  const [filter, setFilter] = useState("ALL");

  const visibleThemes = themeCards.filter((item) => {
    if (filter === "PREMIUM") return item.isPremium;
    if (filter === "STANDARD") return !item.isPremium;
    return true;
  });

  return (
    <div
      style={{
        background: "var(--main-background)",
        color: "var(--primary-text-color)",
        fontFamily: "var(--font-family)",
      }}
      className="min-h-screen px-4 sm:px-[7%] py-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header + Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div
              style={{
                backgroundColor: "var(--subcard-bg)",
                borderColor: "var(--border-color)",
                color: "var(--secondary-text-color)",
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-orbitron font-bold tracking-[0.2em] uppercase mb-3"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Appearance Studio</span>
            </div>

            <h1 className="font-orbitron text-3xl sm:text-4xl font-extrabold tracking-tight">
              Choose Your{" "}
              <span style={{ color: "var(--secondary-text-color)" }}>Theme</span>
            </h1>

            <p style={{ color: "var(--text)" }} className="text-sm sm:text-base mt-2">
              Customize your PlayVerse background, surfaces, and accent colors.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border-color)",
            }}
            className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-md self-start lg:self-auto"
          >
            {[
              { id: "ALL", label: "All Themes" },
              { id: "STANDARD", label: "Standard" },
              { id: "PREMIUM", label: "Premium" },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  style={
                    active
                      ? {
                          backgroundColor: "var(--btn)",
                          color: "var(--btn-text, #FFFFFF)",
                        }
                      : { color: "var(--text)" }
                  }
                  className="px-4 py-2 rounded-xl font-orbitron text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleThemes.map((item) => {
            const isApplied = theme === item.id;
            const [bgHex, surfaceHex, accentHex] = item.colors;

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: isApplied
                    ? "var(--secondary-text-color)"
                    : item.isPremium
                    ? "rgba(250, 204, 21, 0.45)"
                    : "var(--border-color)",
                }}
                className={`group relative rounded-3xl border backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isApplied ? "ring-2 ring-white/20" : ""
                } ${item.isPremium ? "shadow-[0_12px_35px_-15px_rgba(234,179,8,0.25)]" : ""}`}
              >
                {/* Premium Corner Logo Emblem */}
                {item.isPremium && (
                  <div
                    title="Premium Theme"
                    className="absolute top-2 right-2 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-zinc-950 font-orbitron text-[9px] font-black tracking-wider uppercase shadow-lg border border-white/40"
                  >
                    <Crown className="w-3 h-3 fill-zinc-950 text-zinc-950" />
                    <span>PREMIUM</span>
                  </div>
                )}

                {/* Mini UI Preview */}
                <div
                  style={{ backgroundColor: bgHex }}
                  className="m-3.5 mb-0 h-44 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between relative"
                >
                  {/* Mock Navbar */}
                  <div
                    style={{ backgroundColor: surfaceHex }}
                    className="h-9 px-3 pr-20 rounded-lg border border-white/10 flex items-center justify-between"
                  >
                    <span className="font-orbitron text-[10px] font-extrabold tracking-wider text-white truncate">
                      PLAYVERSE
                    </span>
                    <span
                      style={{ backgroundColor: accentHex }}
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                    />
                  </div>

                  {/* Mock Content Card */}
                  <div
                    style={{ backgroundColor: surfaceHex }}
                    className="w-3/4 mx-auto p-3 rounded-xl border border-white/10 space-y-2"
                  >
                    <div className="h-2 w-4/5 rounded-full bg-white/40" />
                    <div className="h-2 w-1/2 rounded-full bg-white/20" />
                    <div className="pt-1">
                      <span
                        style={{
                          backgroundColor: accentHex,
                          color: item.btnTextColor,
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold"
                      >
                        <Sparkles className="w-2.5 h-2.5" /> Play Now
                      </span>
                    </div>
                  </div>
                </div>

                {/* Theme Details & Action */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-orbitron text-lg font-bold flex items-center gap-1.5">
                        <span>{item.name}</span>
                      </h3>
                      {!item.isPremium && (
                        <span
                          style={{
                            backgroundColor: "var(--subcard-bg)",
                            borderColor: "var(--border-color)",
                            color: "var(--secondary-text-color)",
                          }}
                          className="px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider shrink-0"
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <p style={{ color: "var(--text)" }} className="text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Color Swatch Dots */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.colors.map((color, idx) => (
                          <span
                            key={idx}
                            title={color}
                            style={{
                              backgroundColor: color,
                              borderColor: isLight
                                ? "rgba(15, 23, 42, 0.2)"
                                : "rgba(255, 255, 255, 0.25)",
                            }}
                            className="w-5 h-5 rounded-full border shadow-sm"
                          />
                        ))}
                      </div>
                      <span style={{ color: "var(--text)" }} className="text-[11px] font-medium">
                        {item.isPremium ? "VIP Palette" : "3-tone palette"}
                      </span>
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      disabled={isApplied}
                      onClick={() => setTheme(item.id)}
                      style={
                        isApplied
                          ? {
                              backgroundColor: "var(--subcard-bg)",
                              color: "var(--secondary-text-color)",
                              borderColor: "var(--secondary-text-color)",
                            }
                          : {
                              backgroundColor: "var(--btn)",
                              color: "var(--btn-text, #FFFFFF)",
                            }
                      }
                      className={`w-full py-2.5 px-4 rounded-xl font-orbitron text-xs font-bold uppercase tracking-wider border border-transparent flex items-center justify-center gap-2 transition-all ${
                        isApplied
                          ? "cursor-default opacity-90"
                          : "cursor-pointer hover:brightness-110 active:scale-[0.99]"
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <span>Apply Theme</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Themes;