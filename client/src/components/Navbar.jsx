
import './Navbar.css'
import { useAuth } from '../context/AuthContext'
import loadinggif from '../assets/loadingGIF.gif'

function Navbar() {


    const {user,loading} = useAuth()
    
    
  return (
    <nav className="gaming-navbar">

      <a href="/" className="nav-logo">
        <span className="logo-icon">⚡</span>
        PLAY<span>VERSE</span>
      </a>

      <div className="nav-links">
        <a href="/" className="active">Home</a>
        <a href="/#games">Games</a>
        <a href="/#about">About</a>
        <a href="/#leaderboard">Leaderboard</a>
      </div>
      {
        loading? <img src={loadinggif} style={{height:'3vh',width:'auto'}}/> : (
  !user ? <div className="nav-actions">
        <a href="/login" className="nav-login">
          Login
        </a>

        <a href="/login" className="nav-signup">
          Get Started <span>↗</span>
        </a>
      </div> : <a href="/profile" className="nav-login">
          {user.username}
        </a>
)
      }


      

    </nav>
  )
}

export default Navbar
