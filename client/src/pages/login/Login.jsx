
import { useState } from 'react'
import './login.css'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const {login,signup,loginLoading}  =useAuth()

  const [isLogin, setIsLogin] = useState(true)
  //const loginLoading = true
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    playerprofile:'',
    xp:0
    
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()


    if (isLogin) {
      const response = await login({
        email: formData.email,
        password: formData.password
      })

      console.log('response from backend',response)
    } else {
      const res = await signup(formData)
      console.log('res',res)
      
    }

    // Connect your backend API here
  }



  

  return (
    <div className="auth-page">

      {/* BACKGROUND EFFECTS */}

      <div className="auth-bg-glow glow-one"></div>
      <div className="auth-bg-glow glow-two"></div>
      <div className="auth-grid"></div>

      {/* NAVBAR */}

      
      {/* MAIN CONTENT */}

      <div className="auth-main">

        {/* LEFT SIDE */}

        <div className="auth-left">

          <div className="auth-live-badge">
            <span className="live-indicator"></span>
            THE NEXT LEVEL STARTS HERE
          </div>

          <h1>
            ENTER THE
            <span> GAMEVERSE</span>
          </h1>

          <p className="auth-description">
            Your arena. Your rules. Your victory.
            Join the ultimate gaming community and
            challenge players from around the world.
          </p>

          <div className="auth-gaming-image">

            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200"
              alt="Gaming setup"
            />

            <div className="image-overlay"></div>

            <div className="image-content">
              <span>🎮 YOUR NEXT ADVENTURE</span>
              <h3>READY PLAYER ONE?</h3>
            </div>

          </div>

          <div className="auth-features">

            <div className="auth-feature">
              <span>⚔️</span>
              <div>
                <strong>Compete</strong>
                <small>Challenge players</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>🏆</span>
              <div>
                <strong>Conquer</strong>
                <small>Become a champion</small>
              </div>
            </div>

            <div className="auth-feature">
              <span>🔥</span>
              <div>
                <strong>Connect</strong>
                <small>Play with friends</small>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="auth-right">

          <div className="auth-card">

            {/* CARD HEADING */}

            <div className="auth-card-heading">

              <div className="auth-card-icon">
                {isLogin ? '👾' : '🚀'}
              </div>

              <h2>
                {isLogin ? 'Welcome Back!' : 'Join The Arena!'}
              </h2>

              <p>
                {isLogin
                  ? 'Your gaming journey continues here.'
                  : 'Create your account and start playing.'}
              </p>

            </div>

            {/* LOGIN / SIGNUP SWITCH */}

            <div className="auth-tabs">

              <button
                type="button"
                className={isLogin ? 'auth-tab active' : 'auth-tab'}
                onClick={() => {
                  setIsLogin(true)
                  setShowPassword(false)
                }}
              >
                Login
              </button>

              <button
                type="button"
                className={!isLogin ? 'auth-tab active' : 'auth-tab'}
                onClick={() => {
                  setIsLogin(false)
                  setShowPassword(false)
                }}
              >
                Create Account
              </button>

            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="auth-form">

              {!isLogin && (
                <div className="auth-input-group">

                  <label>PLAYER NAME</label>

                  <div className="auth-input-wrapper">
                    <span>🎮</span>

                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your player name"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>
              )}

              <div className="auth-input-group">

                <label>EMAIL ADDRESS</label>

                <div className="auth-input-wrapper">
                  <span>✉</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="auth-input-group">

                <label>PASSWORD</label>

                <div className="auth-input-wrapper">
                  <span>🔒</span>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>

                </div>

              
              </div>

              {!isLogin && (
                <div className="auth-input-group">

                  

                </div>
              )}

              {isLogin && (

                <div className="auth-options">

                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <a href="/forgot-password">
                    Forgot Password?
                  </a>

                </div>

              )}

              <button type="submit" className="auth-submit">

                {
                  loginLoading ? '...Just a Moment bro' : (isLogin ? 'ENTER THE GAME' : 'CREATE MY ACCOUNT')
                }
                
               <span> ↗</span>
                

              </button>

            </form>

            {/* BOTTOM */}

            <div className="auth-bottom">

              <p>
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}

                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setShowPassword(false)
                  }}
                >
                  {isLogin ? ' Sign Up' : ' Login'}
                </button>
              </p>

              <div className="auth-secure">
                <span>🛡️</span>
                SECURE GAMING EXPERIENCE
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login
