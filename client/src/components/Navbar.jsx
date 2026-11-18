
import './Navbar.css'
import { useAuth } from '../context/AuthContext'
import loadinggif from '../assets/loadingGIF.gif'
import { Link, NavLink } from 'react-router-dom'
import coins from '../assets/coins.png'
import shop from '../assets/shop.png'

function Navbar() {
  const { user, loading } = useAuth()

  return (
    <nav className="gaming-navbar">

      {/* Logo */}
      <Link to="/" className="nav-logo">
        <span className="logo-icon">⚡</span>
        PLAY<span>VERSE</span>
      </Link>

      {/* Navigation links */}
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <a href="/#games">Games</a>
        <a href="/#about">About</a>
        <a href="/#leaderboards">Leaderboards</a>
      </div>

      {/* Right side */}
      <div className="nav-right">

        {loading ? (
          <img
            src={loadinggif}
            alt="Loading"
            className="nav-loader"
          />
        ) : !user ? (
          <div className="nav-actions">

            <Link to="/login" className="nav-login">
              Login
            </Link>

            <Link to="/login" className="nav-signup">
              Get Started <span>↗</span>
            </Link>

          </div>
        ) : (
          <>
            <div className='coins'>
             <img src={coins} alt='coins' height={'20px'} width={'auto'}/>
             <p>{user.coins}</p>
            </div>
            <Link to="/shop" className="nav-theme-link">
              <img src={shop} alt='shop' height={'30px'} width={'auto'}/>
              <p>Shop</p>
            </Link>
            <Link to="/themes" className="nav-theme-link">
              <span>✦</span> Themes
            </Link>
            

            <Link to="/profile" className="nav-user">

              <div className="nav-avatar">
                {user.playerprofile ? (
                  <img
                    src={user.playerprofile}
                    alt="Profile"
                  />
                ) : (
                  <span>
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>

              <div className="nav-user-info">
                <span className="nav-user-label">WELCOME BACK</span>
                <span className="nav-username">
                  {user.username}
                </span>
              </div>

              

            </Link>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar
