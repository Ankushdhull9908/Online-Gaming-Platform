

import { useNavigate,Link} from 'react-router-dom'
import './Home.css'
import { games } from '../Games.js'
//import RewardPopup from "../../components/RewardPopup.jsx";
import { useState ,useEffect} from 'react';


const slides = [
  {
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
    title: "ENTER THE ARENA",
    subtitle: "Compete. Conquer. Become a legend.",
    tag: "COMPETITIVE GAMING"
  },
  {
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
    title: "YOUR NEXT ADVENTURE",
    subtitle: "Discover exciting games and endless fun.",
    tag: "EXPLORE GAMES"
  },
  {
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200",
    title: "LEVEL UP YOUR GAME",
    subtitle: "Challenge your friends and show your skills.",
    tag: "PLAY WITH FRIENDS"
  },
  {
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200",
    title: "GAME ON!",
    subtitle: "Every match is a new opportunity to win.",
    tag: "WELCOME TO PLAYVERSE"
  }
];


function Home() {
   const [showReward, setShowReward] = useState(true);
  const nav = useNavigate()


const [currentSlide, setCurrentSlide] = useState(0);

// Automatically change image after 5 seconds
useEffect(() => {

  const interval = setInterval(() => {

    setCurrentSlide((previous) => {

      if (previous === slides.length - 1) {
        return 0;
      }

      return previous + 1;

    });

  }, 5000);

  return () => clearInterval(interval);

}, []);

function nextSlide() {
  setCurrentSlide((currentSlide + 1) % slides.length);
}

function previousSlide() {
  setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
}

  
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

  <div className="hero-slider">

    {/* Current slide image */}

    <img
      key={currentSlide}
      className="slider-image"
      src={slides[currentSlide].image}
      alt="Gaming experience"
    />

    <div className="slider-overlay"></div>

    {/* Slide content */}

    <div className="slider-content">

      <span className="slider-tag">
        <span className="live-dot"></span>
        {slides[currentSlide].tag}
      </span>

      <h2>{slides[currentSlide].title}</h2>

      <p>{slides[currentSlide].subtitle}</p>

      <a href="#games" className="slider-play-btn">
        Explore Games ↗
      </a>

    </div>

    {/* Slide counter */}

    <div className="slider-counter">
      <span>0{currentSlide + 1}</span>
      <span className="counter-line"></span>
      <span>0{slides.length}</span>
    </div>

    {/* Navigation arrows */}

    <div className="slider-arrows">

      <button onClick={previousSlide} aria-label="Previous slide">
        ←
      </button>

      <button onClick={nextSlide} aria-label="Next slide">
        →
      </button>

    </div>

    {/* Pagination dots */}

    <div className="slider-dots">

      {slides.map((slide, index) => (

        <button
          key={index}
          className={currentSlide === index ? "slider-dot active" : "slider-dot"}
          onClick={() => setCurrentSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
        />

      ))}

    </div>

  </div>

  <div className="slider-floating-card">
    🏆 <span>YOUR NEXT VICTORY AWAITS</span>
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
