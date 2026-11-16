
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlayerDashboard.css'
import { useAuth } from '../../context/AuthContext'
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const player = {
  username: 'ANKUSH',
  ingameId: 'Ankush_007',
  level: 12,
  xp: 7450,
  coins: 2500,
  profileurl: '',
  createdAt: 'Nov 2026'
}

const stats = {
  wins: 18,
  losses: 7,
  totalGames: 25,
  totalPoints: 4850,
  bestScore: 850,
  totalMoves: 1240,
  bestStreak: 5,
  currentStreak: 2,
  totalLadders: 32,
  totalSnakes: 18
}

const games = [
  {
    _id: '1',
    result: 'win',
    opponent: { ingameId: 'ProGamer' },
    snakesHit: 1,
    laddersClimbed: 4,
    totalMoves: 45,
    durationSec: 320,
    pointsEarned: 250,
    playedAt: '2 minutes ago',
    gameMode: 'Online'
  },
  {
    _id: '2',
    result: 'loss',
    opponent: { ingameId: 'ShadowX' },
    snakesHit: 3,
    laddersClimbed: 2,
    totalMoves: 52,
    durationSec: 410,
    pointsEarned: 50,
    playedAt: '1 hour ago',
    gameMode: 'Online'
  },
  
]

const leaderboard = [
  { player: { ingameId: 'ProGamer' }, totalPoints: 9850 },
  { player: { ingameId: 'ShadowX' }, totalPoints: 4200 },
  { player: { ingameId: 'NinjaBoy' }, totalPoints: 3900 }
]

const ACHIEVEMENTS = [
  { icon: '🏆', name: 'First Blood', desc: 'Win your first game', check: s => s.wins >= 1 },
  { icon: '🔥', name: 'On Fire', desc: 'Win 5 games', check: s => s.wins >= 5 },
  { icon: '⚔️', name: 'Veteran', desc: 'Win 20 games', check: s => s.wins >= 20 },
  { icon: '⚡', name: 'Hot Streak', desc: '3-game win streak', check: s => s.bestStreak >= 3 },
  { icon: '🌩️', name: 'Unstoppable', desc: '5-game win streak', check: s => s.bestStreak >= 5 },
  { icon: '🪜', name: 'Climber', desc: 'Climb 10 ladders total', check: s => s.totalLadders >= 10 },
  { icon: '💎', name: 'High Scorer', desc: 'Score 500+ in one game', check: s => s.bestScore >= 500 },
  { icon: '🎯', name: 'Centurion', desc: 'Play 100 games', check: s => s.totalGames >= 100 }
]

function WinRate({ stats }) {
  const rate = stats.totalGames
    ? Math.round((stats.wins / stats.totalGames) * 100)
    : 0

  return (
    <div className="pd-winrate">
      <div className="pd-winrate-circle" style={{ '--rate': `${rate}%` }}>
        <div className="pd-winrate-inner">
          <strong>{rate}%</strong>
          <small>WIN RATE</small>
        </div>
      </div>
      <div className="pd-winrate-details">
        <div><span className="pd-dot green" /> Wins <strong>{stats.wins}</strong></div>
        <div><span className="pd-dot red" /> Losses <strong>{stats.losses}</strong></div>
        <div><span className="pd-dot gray" /> Total <strong>{stats.totalGames}</strong></div>
      </div>
    </div>
  )
}

function StatBox({ value, label, color = '' }) {
  return (
    <div className={`pd-stat-box ${color}`}>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  )
}

function formatDuration(seconds = 0) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

export default function PlayerDashboard() {
  const fileInputRef = useRef(null)

  


const [image,setImage] = useState(null)

const [uploading, setUploading] = useState(false)
const [uploadError, setUploadError] = useState('')
  const navigate = useNavigate()

  const {user,logout} = useAuth()
  const [profileUrl, setProfileUrl] = useState(
  user?.profileurl || user?.playerprofile || ''
)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  const xp = player.xp
  const xpInLevel = xp % 1000
  const xpPercent = (xpInLevel / 1000) * 100

  const rank = {
    label: 'GOLD PLAYER',
    color: '#fbbf24'
  }

  const filteredGames = games.filter(game =>
    filter === 'all' || game.result === filter
  )

  const pageSize = 4
  const pages = Math.max(1, Math.ceil(filteredGames.length / pageSize))
  const currentGames = filteredGames.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  const handleFilter = (value) => {
    setFilter(value)
    setPage(1)
  }

 async function handleProfileUpload() {

  if (!image) {
    setUploadError('Please select an image first')
    return
  }

  try {
    setUploading(true)
    setUploadError('')

    const formData = new FormData()
    formData.append('profile', image)

    console.log(formData)

    const response = await fetch(`${API}/api/image/upload`, {
      method: 'PUT',
      credentials: 'include',
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Profile upload failed')
    }

    setProfileUrl(data.imageUrl)

    setImage(null)

  } catch (error) {
    setUploadError(error.message)

  } finally {
    setUploading(false)
    fileInputRef.current.value = ''
  }
}

  

  return (
    <div className="pd-page">
      <div className="pd-blob pd-blob-one" />
      <div className="pd-blob pd-blob-two" />
      <div className="pd-blob pd-blob-three" />

      <nav className="pd-nav">
       
        <div className="pd-nav-right">
          <span className="pd-ingame">@{user?.username}</span>
          <button className="pd-logout" onClick={logout}>
            LOGOUT
          </button>
        </div>
      </nav>

      <header className="pd-hero">
        <div className="pd-hero-letter">
          {user?.username}
        </div>

      <div className="pd-avatar-wrap">

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={(e) => setImage(e.target.files[0])}
    hidden
  />

  <div
    className="pd-avatar-hex"
    onClick={() => fileInputRef.current.click()}
    title="Select profile picture"
    style={{ cursor: 'pointer' }}
  >
    {user?.playerprofile
      ? <img src={user?.playerprofile} alt="Player avatar" />
      : <span>🎮</span>
    }
  </div>

  <span className="pd-level-tag">
    LVL {player.level}
  </span>

  <button
    className="pd-avatar-edit"
    onClick={handleProfileUpload}
    disabled={uploading || !image}
  >
    {uploading ? 'UPLOADING...' : 'EDIT'}
  </button>

</div>

{uploadError && (
  <p className="pd-error">{uploadError}</p>
)}

        <div className="pd-hero-info">
          <h1 className="pd-hero-name">{user?.username}</h1>

          <div className="pd-hero-meta">
            <span className="pd-chip">
              🪙 <b>{player.coins.toLocaleString()}</b> coins
            </span>
            <span className="pd-chip">
              ⚡ <b>{xp.toLocaleString()}</b> XP
            </span>
            <span className="pd-chip">
              📅 Since <b>{player.createdAt}</b>
            </span>
            <span
              className="pd-rank"
              style={{
                color: rank.color,
                borderColor: rank.color,
                background: `${rank.color}18`
              }}
            >
              {rank.label}
            </span>
          </div>

          <div className="pd-xp-row">
            <div className="pd-xp-labels">
              <span>XP Progress</span>
              <span>{xpInLevel} / 1000</span>
            </div>
            <div className="pd-xp-track">
              <div
                className="pd-xp-fill"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pd-grid">
        <section className="pd-panel">
          <h2 className="pd-panel-title">
            <span>🐍</span> SNAKE &amp; LADDER
          </h2>

          <WinRate stats={stats} />

          <div className="pd-streak-row">
            <span className="pd-streak-icon">🔥</span>
            <div className="pd-streak-info">
              <strong>{stats.bestStreak}</strong>
              <small>BEST STREAK</small>
            </div>
            <div className="pd-streak-info pd-current-streak">
              <strong>{stats.currentStreak}</strong>
              <small>CURRENT</small>
            </div>
          </div>

          <div className="pd-stat-grid">
            <StatBox value={stats.totalGames} label="Total Games" color="accent" />
            <StatBox value={stats.totalPoints} label="Total Points" color="gold" />
            <StatBox value={stats.bestScore} label="Best Score" color="gold" />
            <StatBox value={stats.totalMoves} label="Total Moves" />
            <StatBox value={`${stats.totalLadders} 🪜`} label="Ladders Hit" color="green" />
            <StatBox value={`${stats.totalSnakes} 🐍`} label="Snakes Hit" color="red" />
          </div>
        </section>

        <section className="pd-panel pd-history-panel">
          <h2 className="pd-panel-title">
            <span>📜</span> MATCH HISTORY
          </h2>

          <div className="pd-filter-row">
            {['all', 'win', 'loss', 'disconnected'].map(item => (
              <button
                key={item}
                className={`pd-filter ${filter === item ? 'active' : ''}`}
                onClick={() => handleFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="pd-match-list">
            {currentGames.length === 0 ? (
              <div className="pd-empty">
                <span>🎲</span>
                <p>No {filter === 'all' ? '' : `${filter} `}games yet</p>
              </div>
            ) : currentGames.map(game => (
              <article className={`pd-match-card ${game.result}`} key={game._id}>
                <span className="pd-match-badge">
                  {game.result === 'win' ? 'WIN' : game.result === 'loss' ? 'LOSS' : 'DC'}
                </span>

                <div className="pd-match-body">
                  <div className="pd-match-vs">
                    vs {game.opponent?.ingameId || 'Unknown'}
                  </div>
                  <div className="pd-match-chips">
                    <span>🐍 {game.snakesHit}</span>
                    <span>🪜 {game.laddersClimbed}</span>
                    <span>🎲 {game.totalMoves} moves</span>
                    <span>⏱ {formatDuration(game.durationSec)}</span>
                    <span>{game.gameMode}</span>
                  </div>
                </div>

                <div className="pd-match-right">
                  <strong className={!game.pointsEarned ? 'zero' : ''}>
                    {game.pointsEarned > 0 ? '+' : ''}{game.pointsEarned}
                  </strong>
                  <small>{game.playedAt}</small>
                </div>
              </article>
            ))}
          </div>

          {pages > 1 && (
            <div className="pd-pagination">
              {Array.from({ length: pages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  className={page === number ? 'active' : ''}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="pd-panel pd-side-panel">
          <div>
            <h2 className="pd-panel-title">
              <span>🏆</span> LEADERBOARD
            </h2>

            <div className="pd-lb-list">
              {leaderboard.map((row, index) => {
                const isMe = row.player.ingameId === player.ingameId

                return (
                  <div className={`pd-lb-row ${isMe ? 'me' : ''}`} key={row.player.ingameId}>
                    <span className="pd-lb-rank">
                      {['🥇', '🥈', '🥉'][index] || `#${index + 1}`}
                    </span>
                    <span className="pd-lb-name">
                      {row.player.ingameId}{isMe ? ' ← you' : ''}
                    </span>
                    <strong className="pd-lb-points">
                      {row.totalPoints.toLocaleString()}
                    </strong>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="pd-panel-title">
              <span>🏅</span> ACHIEVEMENTS
            </h2>

            <div className="pd-ach-grid">
              {ACHIEVEMENTS.map(achievement => {
                const unlocked = achievement.check(stats)

                return (
                  <div
                    className={`pd-ach-tile ${unlocked ? 'unlocked' : 'locked'}`}
                    key={achievement.name}
                  >
                    <span className="pd-ach-icon">{achievement.icon}</span>
                    <strong>{achievement.name}</strong>
                    <small>{achievement.desc}</small>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
