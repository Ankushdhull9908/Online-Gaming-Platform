import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const themes = {
  monochrome: {
    name: "Obsidian Mono",
    tag: "Default B&W",
    swatch: ["#FFFFFF", "#18181B"],
    isLight: false,
    vars: {
      "--bg-color": "#09090B",
      "--navbar": "#0F0F12",
      "--card-bg": "rgba(24, 24, 27, 0.75)",
      "--subcard-bg": "rgba(39, 39, 42, 0.45)",
      "--border-color": "rgba(255, 255, 255, 0.12)",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#FFFFFF",
      "--btn-text": "#09090B",
      "--text": "#A1A1AA",
      "--primary-text-color": "#FAFAFA",
      "--secondary-text-color": "#FFFFFF",
      "--accent-color": "#D4D4D8",
      "--main-background":
        "radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.08), transparent 45%), radial-gradient(circle at 15% 85%, rgba(161, 161, 170, 0.06), transparent 45%), #09090B",
    },
  },

  pureLight: {
    name: "Alabaster Light",
    tag: "Crisp White",
    swatch: ["#09090B", "#F4F4F5"],
    isLight: true,
    vars: {
      "--bg-color": "#FAFAFA",
      "--navbar": "#FFFFFF",
      "--card-bg": "rgba(255, 255, 255, 0.92)",
      "--subcard-bg": "#F4F4F5",
      "--border-color": "rgba(9, 9, 11, 0.10)",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#09090B",
      "--btn-text": "#FFFFFF",
      "--text": "#52525B",
      "--primary-text-color": "#09090B",
      "--secondary-text-color": "#18181B",
      "--accent-color": "#3F3F46",
      "--main-background":
        "radial-gradient(circle at 80% 10%, rgba(9, 9, 11, 0.04), transparent 45%), radial-gradient(circle at 15% 85%, rgba(113, 113, 122, 0.05), transparent 45%), #FAFAFA",
    },
  },

  neon: {
    name: "Midnight Violet",
    tag: "Cyber Dark",
    swatch: ["#7C3AED", "#38BDF8"],
    isLight: false,
    vars: {
      "--bg-color": "#070913",
      "--navbar": "#0D1021",
      "--card-bg": "rgba(15, 19, 38, 0.78)",
      "--subcard-bg": "rgba(255, 255, 255, 0.04)",
      "--border-color": "rgba(167, 139, 250, 0.18)",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#7C3AED",
      "--btn-text": "#FFFFFF",
      "--text": "#94A3B8",
      "--primary-text-color": "#F8FAFC",
      "--secondary-text-color": "#A78BFA",
      "--accent-color": "#38BDF8",
      "--main-background":
        "radial-gradient(circle at 85% 15%, rgba(124, 58, 237, 0.18), transparent 45%), radial-gradient(circle at 15% 85%, rgba(56, 189, 248, 0.10), transparent 45%), #070913",
    },
  },

  aurora: {
    name: "Deep Ocean & Teal",
    tag: "Calm Cyber",
    swatch: ["#0D9488", "#60A5FA"],
    isLight: false,
    vars: {
      "--bg-color": "#060C12",
      "--navbar": "#0B1520",
      "--card-bg": "rgba(12, 24, 36, 0.78)",
      "--subcard-bg": "rgba(45, 212, 191, 0.05)",
      "--border-color": "rgba(45, 212, 191, 0.18)",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#0D9488",
      "--btn-text": "#FFFFFF",
      "--text": "#94A3B8",
      "--primary-text-color": "#F1F5F9",
      "--secondary-text-color": "#2DD4BF",
      "--accent-color": "#60A5FA",
      "--main-background":
        "radial-gradient(circle at 85% 15%, rgba(13, 148, 136, 0.16), transparent 45%), radial-gradient(circle at 15% 85%, rgba(96, 165, 250, 0.10), transparent 45%), #060C12",
    },
  },

  obsidian: {
    name: "Crimson Slate",
    tag: "Arena Red",
    swatch: ["#E11D48", "#FB7185"],
    isLight: false,
    vars: {
      "--bg-color": "#0B070A",
      "--navbar": "#150D12",
      "--card-bg": "rgba(24, 14, 20, 0.78)",
      "--subcard-bg": "rgba(251, 113, 133, 0.05)",
      "--border-color": "rgba(251, 113, 133, 0.18)",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#E11D48",
      "--btn-text": "#FFFFFF",
      "--text": "#A1A1AA",
      "--primary-text-color": "#FAFAFA",
      "--secondary-text-color": "#FB7185",
      "--accent-color": "#F472B6",
      "--main-background":
        "radial-gradient(circle at 85% 15%, rgba(225, 29, 72, 0.16), transparent 45%), radial-gradient(circle at 15% 85%, rgba(244, 114, 182, 0.08), transparent 45%), #0B070A",
    },
  },

  pink: {
    name: "Velvet Rose",
    tag: "Soft Neon",
    swatch: ["#DB2777", "#F472B6"],
    isLight: false,
    vars: {
      "--bg-color": "#0C070C",
      "--navbar": "#170D17",
      "--card-bg": "rgba(26, 14, 26, 0.78)",
      "--subcard-bg": "rgba(244, 114, 182, 0.05)",
      "--border-color": "rgba(244, 114, 182, 0.18)",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#DB2777",
      "--btn-text": "#FFFFFF",
      "--text": "#A3A3A3",
      "--primary-text-color": "#FDF2F8",
      "--secondary-text-color": "#F472B6",
      "--accent-color": "#C084FC",
      "--main-background":
        "radial-gradient(circle at 85% 15%, rgba(219, 39, 119, 0.16), transparent 45%), radial-gradient(circle at 15% 85%, rgba(192, 132, 252, 0.09), transparent 45%), #0C070C",
    },
  },

  green: {
    name: "Forest Carbon",
    tag: "Emerald",
    swatch: ["#059669", "#34D399"],
    isLight: false,
    vars: {
      "--bg-color": "#060D0A",
      "--navbar": "#0B1913",
      "--card-bg": "rgba(12, 28, 21, 0.78)",
      "--subcard-bg": "rgba(52, 211, 153, 0.05)",
      "--border-color": "rgba(52, 211, 153, 0.18)",
      "--font-family": "'Inter', sans-serif",
      "--btn": "#059669",
      "--btn-text": "#FFFFFF",
      "--text": "#9CA3AF",
      "--primary-text-color": "#ECFDF5",
      "--secondary-text-color": "#34D399",
      "--accent-color": "#38BDF8",
      "--main-background":
        "radial-gradient(circle at 85% 15%, rgba(5, 150, 105, 0.16), transparent 45%), radial-gradient(circle at 15% 85%, rgba(56, 189, 248, 0.08), transparent 45%), #060D0A",
    },
  },
};

export const themeList = Object.entries(themes).map(([key, config]) => ({
  id: key,
  ...config,
}));

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("playverse-theme");
      return saved && themes[saved] ? saved : "monochrome";
    } catch {
      return "monochrome";
    }
  });

  useEffect(() => {
    const selectedTheme = themes[theme] || themes.monochrome;

    Object.entries(selectedTheme.vars).forEach(([cssVariableName, value]) => {
      document.documentElement.style.setProperty(cssVariableName, value);
    });

    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("playverse-theme", theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const currentThemeMeta = themes[theme] || themes.monochrome;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes,
        themeList,
        isLight: currentThemeMeta.isLight,
        activeThemeMeta: currentThemeMeta,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}