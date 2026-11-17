

import { useTheme } from "../../context/ThemeContext";
import "./Themes.css";

function Themes() {

  const { theme,setTheme} = useTheme();


const themes = [
  {
    name: "Pink",
    id: "pink",
    description: "A beautiful pink gaming experience",
    colors: ["#1F1020", "#2D1730", "#FF69B4"],
  },

  {
    name: "Neon",
    id: "neon",
    description: "A futuristic neon gaming look",
    colors: ["#110E29", "#211B45", "#6F3DE7"],

  },

  {
    name: "Light",
    id: "light",
    description: "Clean and simple appearance",
    colors: ["#F4F5F9", "#FFFFFF", "#4776E6"],
  },

  {
    name: "Red",
    id: "red",
    description: "A bold and powerful experience",
    colors: ["#210D12", "#491722", "#F04452"],


  },

  {
    name: "Green",
    id: "green",
    description: "Fresh and relaxing gaming look",
    colors: ["#0D2019", "#19402D", "#27C477"],
  }
];


  return (
    <div className="theme-page">

      <div className="theme-heading">
        <h1>Choose Your Theme</h1>
        <p>Customize your gaming experience.</p>
      </div>

      <div className="theme-grid">

        {themes.map((item) => (

          <div className="theme-card" key={item.id}>

            <div
              className="theme-preview"
              style={{
                backgroundColor: item.colors[0]
              }}
              
            >

              <div
                className="preview-navbar"
                style={{
                  backgroundColor: item.colors[1]
                }}
              >
                <span>GAME ZONE</span>

                <span
                  className="preview-dot"
                  style={{
                    backgroundColor: item.colors[2]
                  }}
                ></span>
              </div>

              <div className="preview-content">

                <div
                  className="preview-box"
                  style={{
                    backgroundColor: item.colors[1]
                  }}
                >
                  <div className="preview-line"></div>
                  <div className="preview-line small"></div>

                  <button
                    style={{
                      backgroundColor: item.colors[2]
                    }}
                  >
                    Play Now
                  </button>
                </div>

              </div>

            </div>

            <div className="theme-info">

              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>

              <div className="color-dots">
                {item.colors.map((color, index) => (
                  <span
                    key={index}
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>

              <button
                className="apply-theme-btn"
                onClick={() => setTheme(item.id)}
                
              >
                {/*theme === item.id ? "Applied ✓" : "Apply Theme"*/}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Themes;
