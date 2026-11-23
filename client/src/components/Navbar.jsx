import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import loadinggif from "../assets/loadingGIF.gif";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import coins from "../assets/coins.png";
import shop from "../assets/shop.png";

const HOME_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "games", label: "Games" },
  { id: "about", label: "About" },
  { id: "leaderboards", label: "Leaderboards" },
];

function Navbar() {
  const { user, loading } = useAuth();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");

  const isHomeRoute = pathname === "/";

  useEffect(() => {
    if (!isHomeRoute) return;

    const updateActiveFromScroll = () => {
      const scrollY = window.scrollY;

      // Near top of page -> Home
      if (scrollY < 220) {
        setActiveSection("hero");
        return;
      }

      // If scrolled all the way to the bottom, highlight the last section
      const nearBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) {
        setActiveSection("leaderboards");
        return;
      }

      const navOffset = 140;
      let current = "hero";

      for (const { id } of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= navOffset) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    // Respect initial hash navigation if present
    if (hash) {
      const cleanId = hash.replace("#", "");
      if (HOME_SECTIONS.some((s) => s.id === cleanId)) {
        setActiveSection(cleanId);
      }
    } else {
      updateActiveFromScroll();
    }

    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [isHomeRoute, hash]);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);

    if (!isHomeRoute) {
      navigate(`/#${sectionId}`);
      return;
    }

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "var(--navbar)",
        borderColor: "var(--border-color, var(--secondary-text-color))",
        fontFamily: "var(--font-family)",
      }}
      className="sticky top-0 z-50 w-full min-h-[78px] px-4 sm:px-[7%] py-3 sm:py-0 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-6 border-b backdrop-blur-xl transition-colors duration-300"
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => setActiveSection("hero")}
        style={{ color: "var(--primary-text-color)" }}
        className="flex items-center font-orbitron text-lg sm:text-[22px] font-extrabold tracking-wider whitespace-nowrap shrink-0"
      >
        <span
          style={{
            color: "var(--secondary-text-color)",
            filter: "drop-shadow(0 0 8px var(--secondary-text-color))",
          }}
          className="mr-2 text-xl sm:text-2xl"
        >
          ⚡
        </span>
        <span>PLAY</span>
        <span style={{ color: "var(--secondary-text-color)" }}>VERSE</span>
      </Link>

      {/* Navigation links */}
      <div
        style={{ borderColor: "var(--border-color, rgba(255,255,255,0.1))" }}
        className="order-3 md:order-none w-full md:w-auto flex items-center justify-center gap-5 sm:gap-8 pt-2.5 md:pt-0 border-t md:border-t-0"
      >
        {isHomeRoute
          ? HOME_SECTIONS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleSectionClick(e, item.id)}
                  style={{
                    color: isActive ? "var(--secondary-text-color)" : "var(--text)",
                  }}
                  className="relative py-2 text-xs sm:text-[13px] font-semibold transition-colors hover:opacity-85"
                >
                  {item.label}
                  <span
                    style={{ backgroundColor: "var(--secondary-text-color)" }}
                    className={`absolute bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })
          : [
              { label: "Home", to: "/", end: true },
              { label: "Games", to: "/#games", end: false },
              { label: "About", to: "/#about", end: false },
              { label: "Leaderboards", to: "/#leaderboards", end: false },
            ].map((item) =>
              item.to === "/" ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  style={({ isActive }) => ({
                    color: isActive ? "var(--secondary-text-color)" : "var(--text)",
                  })}
                  className="relative py-2 text-xs sm:text-[13px] font-semibold transition-colors hover:opacity-85"
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.label}
                  href={item.to}
                  style={{ color: "var(--text)" }}
                  className="relative py-2 text-xs sm:text-[13px] font-semibold transition-colors hover:opacity-85"
                >
                  {item.label}
                </a>
              )
            )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-5 ml-auto md:ml-0 shrink-0">
        {loading ? (
          <img src={loadinggif} alt="Loading" className="h-7 w-auto" />
        ) : !user ? (
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/login"
              style={{ color: "var(--primary-text-color)" }}
              className="text-xs sm:text-[13px] font-semibold transition-opacity hover:opacity-80"
            >
              Login
            </Link>

            <Link
              to="/login"
              style={{
                backgroundColor: "var(--btn)",
                color: "var(--btn-text, #FFFFFF)",
                boxShadow: "0 0 18px -4px var(--btn)",
              }}
              className="inline-flex items-center gap-1 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-[9px] text-[11px] sm:text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              Get Started <span>↗</span>
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{ color: "var(--primary-text-color)" }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold"
            >
              <img src={coins} alt="coins" className="h-5 w-auto object-contain" />
              <span>{user.coins}</span>
            </div>

            <Link
              to="/shop"
              style={{ color: "var(--primary-text-color)" }}
              className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:opacity-80"
            >
              <img src={shop} alt="shop" className="h-7 w-auto object-contain" />
              <span>Shop</span>
            </Link>

            <Link
              to="/themes"
              style={{ color: "var(--primary-text-color)" }}
              className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:opacity-80"
            >
              <span
                style={{ color: "var(--secondary-text-color)" }}
                className="text-lg leading-none"
              >
                ✦
              </span>
              <span>Themes</span>
            </Link>

            <Link
              to="/profile"
              style={{
                backgroundColor: "var(--bg-color)",
                borderColor: "var(--border-color, var(--secondary-text-color))",
              }}
              className="flex items-center gap-2 sm:gap-2.5 p-1 sm:py-1.5 sm:pr-3 sm:pl-1.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
            >
              <div
                style={{
                  backgroundColor: "var(--btn)",
                  color: "var(--btn-text, #FFFFFF)",
                  borderColor: "var(--secondary-text-color)",
                }}
                className="w-8 h-8 sm:w-[38px] sm:h-[38px] rounded-[10px] overflow-hidden flex items-center justify-center font-extrabold text-sm sm:text-[17px] border shrink-0"
              >
                {user.playerprofile ? (
                  <img
                    src={user.playerprofile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user.username?.charAt(0).toUpperCase() || "U"}</span>
                )}
              </div>

              <div className="hidden xs:flex sm:flex flex-col leading-tight">
                <span
                  style={{ color: "var(--text)" }}
                  className="hidden sm:block text-[8px] font-bold tracking-[1px] uppercase"
                >
                  WELCOME BACK
                </span>
                <span
                  style={{ color: "var(--primary-text-color)" }}
                  className="text-xs font-bold"
                >
                  {user.username}
                </span>
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;