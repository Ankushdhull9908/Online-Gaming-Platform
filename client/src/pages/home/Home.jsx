

import { useNavigate,Link} from 'react-router-dom'
import './Home.css'
import { games } from '../Games.js'
//import RewardPopup from "../../components/RewardPopup.jsx";
import { useState } from 'react';

function Home() {
   const [showReward, setShowReward] = useState(true);
  const nav = useNavigate()
  
  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <span className="live-dot"></span>
            THE ULTIMATE GAMING DESTINATION
          </div>
          

          <h1>
            LEVEL UP YOUR
            <span> GAMING </span>
            EXPERIENCE
          </h1>

          <p>
            Enter a world where fun never ends. Play exciting games,
            challenge your friends, compete with players and become
            the ultimate champion.
          </p>

          <div className="hero-buttons">
            <a href="#games" className="hero-primary-btn">
              Explore Games <span>↗</span>
            </a>

            <a href="/login" className="hero-secondary-btn">
              Join Community
            </a>
          </div>
          

          <div className="hero-stats">
            <div>
              <h3>10K<span>+</span></h3>
              <p>Active Players</p>
            </div>

            <div>
              <h3>25<span>+</span></h3>
              <p>Exciting Games</p>
            </div>

            <div>
              <h3>50K<span>+</span></h3>
              <p>Games Played</p>
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-glow"></div>

          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1000"
              alt="Gaming setup"
            />

            <div className="floating-card floating-top">
              <span>🏆</span>
              <div>
                <strong>Top Player</strong>
                <small>Become a champion</small>
              </div>
            </div>

            <div className="floating-card floating-bottom">
              <span>🎮</span>
              <div>
                <strong>Ready to Play?</strong>
                <small>Your next adventure awaits</small>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* GAMES SECTION */}

      <section className="games-section" id="games">

        <div className="section-heading">

          <div>
            <span className="section-tag">DISCOVER YOUR NEXT GAME</span>
            <h2>Explore <span>Games</span></h2>
            <p>Find your favorite game and start playing today.</p>
          </div>

          <a href="#games" className="view-all-btn">
            View All Games ↗
          </a>

        </div>

        <div className="games-grid">

          {games.map((game) => (

            <div className={`game-card ${game.color}`} key={game.id}>

              <div className="game-image">
                <img src={game.image} alt={game.name} />

                <span className="game-category">
                  Board
                </span>
              </div>

              <div className="game-info">

                <div>
                  <h3>{game.name}</h3>
                  <p>👥 2-4</p>
                </div>

                <button
                  className="game-play-btn"
                  onClick={() => {
                    nav(`/loadgame/${game.id}`)
                  }}
                >
                  Play ↗
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* COMMUNITY SECTION */}

      <section className="community-section" id="about">

        <div className="community-content">

          <span className="section-tag">YOUR GAME. YOUR COMMUNITY.</span>

          <h2>
            Ready to Become
            <span> A Legend?</span>
          </h2>

          <p>
            Create your account, challenge your friends and
            start your journey to the top of the leaderboard.
          </p>

          <Link to='/login' className="community-btn">
            Start Playing Now ↗
          </Link>

        </div>

        <div className="community-icon">
          🎮
        </div>

      </section>

      {/* FOOTER */}

      <footer className="gaming-footer">

        <Link to="/" className="nav-logo">
          ⚡ PLAY<span>VERSE</span>
        </Link>

        <p>© 2026 PlayVerse. Made for gamers, by gamers.</p>

        <span>GAME ON. LEVEL UP.</span>

      </footer>

    </div>
  )
}

export default Home
