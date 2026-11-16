import { useParams } from 'react-router-dom'
import './LoadGame.css'
import { games } from '../Games'

function LoadGame() {

  const { id } = useParams()
  

  const game = games.find((i) => i.id === Number(id))
  console.log('games',game)

  if (!game) {
    return <h2>Game not found!</h2>
  }

  return (
    <div className='loadgame-container'>

      <iframe
        src={game.src}
        title={game.name}
      />

    </div>
  )
}

export default LoadGame