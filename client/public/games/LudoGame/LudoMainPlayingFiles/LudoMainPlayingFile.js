import { SOCKET_URL } from '/API.js';


const socket = io(SOCKET_URL)

const params = new URLSearchParams(window.location.search)

const roomid = params.get('roomid')
const username = JSON.parse(localStorage.getItem('player'))
const myturn = localStorage.getItem('turn')

const diceElement = document.getElementById('dice')
const diceFace = document.querySelector('.dice-face')
var turnTimerInterval = null
var currentUITurn = null
var turnTime = 15


function UpdateTurnUI(turn)
{
    const myPlayerCard =
        document.getElementById('myPlayerCard')

    const opponentPlayerCard =
        document.getElementById('opponentPlayerCard')

    const myTimer =
        document.getElementById('myTimer')

    const opponentTimer =
        document.getElementById('opponentTimer')

    myPlayerCard.classList.remove('active-player')
    opponentPlayerCard.classList.remove('active-player')

    document
        .querySelectorAll('.turn-token')
        .forEach(token => {
            token.classList.remove('turn-token')
        })

    if(Number(turn) === Number(myturn))
    {
        myPlayerCard.classList.add('active-player')

        myTimer.innerHTML = turnTime

        document
            .querySelectorAll(`[data-turn="${myturn}"]`)
            .forEach(token => {
                token.classList.add('turn-token')
            })

    }
    else
    {
        opponentPlayerCard.classList.add('active-player')

        opponentTimer.innerHTML = turnTime
        document
            .querySelectorAll(
                `[data-turn="${turn}"]`
            )
            .forEach(token => {
                token.classList.add('turn-token')
            })
    }


    if(currentUITurn !== Number(turn))
    {
        currentUITurn = Number(turn)

        StartTurnTimer(turn)
    }
}


function StartTurnTimer(turn)
{
    clearInterval(turnTimerInterval)

    let timeLeft = 15

    const timer =
        Number(turn) === Number(myturn)
            ? document.getElementById('myTimer')
            : document.getElementById('opponentTimer')


    timer.innerHTML = timeLeft


    turnTimerInterval = setInterval(() => {

        timeLeft--

        timer.innerHTML = timeLeft


        if(timeLeft <= 0)
        {
            clearInterval(turnTimerInterval)

            timer.innerHTML = '0'
        }

    },1000)
}






var movetoken = false
var playermoved = false



LoadLudoBoard()
console.log(myturn)
if(username)
{
    socket.emit('join-games-server',{name:username.ingameId,game:'Ludo'})

    if(roomid) socket.emit('join-room',{name:username,roomid:roomid})
}


socket.on('initial-game-data',(data)=>{

    console.log('initial game data',data)

    if(data)
    {
        SpawnPlayersTokenOnBoard(data)
        const myPlayer = data.players[Number(myturn) - 1]
        const opponent = data.players[2 - Number(myturn)]


        if(myPlayer)
        {
            document.getElementById('myName').innerHTML =
                myPlayer.name

            if(myPlayer.playerprofile)
            {
                document.getElementById('myProfile').src =
                    myPlayer.playerprofile
            }
        }


        if(opponent)
        {
            document.getElementById('opponentName').innerHTML =
                opponent.name

            if(opponent.playerprofile)
            {
                document.getElementById('opponentProfile').src =
                    opponent.playerprofile
            }
        }

        

        if(data.turn == myturn)
        {
            document.getElementById('diceroll').disabled = false
            document.getElementById('playerturnText').innerHTML =
                'Your Turn'
        }
        else
        {
            document.getElementById('diceroll').disabled = true
            document.getElementById('playerturnText').innerHTML =
                "Opponent's Turn"
        }
        UpdateTurnUI(data.turn)
    }

})

function LoadLudoBoard()
{
     const ludoBoard = document.getElementById('ludo-board')
     for(var i = 0;i<255;i++)
     {
        const cell = document.createElement('div')
        cell.classList.add('cell')
       //cell.innerText =i
        ludoBoard.append(cell)

     }

}

document.getElementById('diceroll').addEventListener('click',()=>{
    socket.emit('rolldice',roomid)
    document.getElementById('diceroll').disabled=true
})

function SpawnPlayersTokenOnBoard(data)
{
    console.log('token data',data)
    const cells = document.getElementsByClassName('cell')
    
    for(var i=0;i<4;i++)
    {
        const token = document.createElement('div')
        token.dataset.token = i
        token.dataset.turn = 1
        token.id = `player1token${i}`

        const position = data.player1token?.token[i].position
        cells[position].append(token)

        token.addEventListener('click',(i)=>{
              if(movetoken==true && i.target.dataset.turn===myturn)
               {
                alert('player1 condition is true and current turn',myturn)
                socket.emit('moveplayertoken',{roomid:roomid,token:i.target.dataset.token})
                movetoken = false
                playermoved = true
               }else{
                alert('you cant move')
               }
              
        })
        
    }
     for(var i=0;i<4;i++)
    {
        const token = document.createElement('div')
        token.id = `player2token${i}`
        token.dataset.token = i
        token.dataset.turn = 2
        const position = data.player2token?.token[i].position
        cells[position].append(token)
 
        token.addEventListener('click',(i)=>{
               if(movetoken==true && i.target.dataset.turn===myturn)
               {
                    alert('player2 condition is true and current turn',myturn)
                    socket.emit('moveplayertoken',{roomid:roomid,token:i.target.dataset.token})
                    movetoken = false
                    playermoved = true
               }else{
                alert('you cant move')
               }
              
        })
    }
}

socket.on('dicerolldata',(dicedata)=>{
    console.log('dice roll data',dicedata)


diceElement.classList.remove('rolling')

/* Force browser to restart animation */
void diceElement.offsetWidth

diceElement.classList.add('rolling')


/* Show random numbers while rolling */

let rollCount = 0

const diceAnimation = setInterval(()=>{

    const randomNumber =
        Math.floor(Math.random() * 6) + 1

    diceFace.innerHTML = randomNumber

    rollCount++

    if(rollCount >= 5)
    {
        clearInterval(diceAnimation)

        diceFace.innerHTML = dicedata.dice
    }

},100)


    document.getElementById('diceval').innerHTML = `dice val ${dicedata.dice}`
       // you can only move you token if 
       
    
            if(dicedata.turn==myturn)
        {
            movetoken = true
            document.getElementById('diceroll').disabled = false
            document.getElementById('playerturnText').innerHTML = 'Your turn'
        }else{
            document.getElementById('diceroll').disabled = true
            document.getElementById('playerturnText').innerHTML = 'Opponent turn'
        }
        UpdateTurnUI(dicedata.turn)
    



    //if players token is unlocked than first wait for player to move than update turn
        
    
    //const cells = document.getElementsByClassName('cell')
    console.log('whose turn',dicedata.turn)
     
})

function UpdateTokenPosition(data)
{
    const cells = document.getElementsByClassName('cell')

    // Player 1
    for(var i=0;i<4;i++)
    {
        const token = document.getElementById(`player1token${i}`)

        const position = data.player1token.token[i].position

        cells[position].append(token)
    }

    // Player 2
    for(var i=0;i<4;i++)
    {
        const token = document.getElementById(`player2token${i}`)

        const position = data.player2token.token[i].position

        cells[position].append(token)
    }
}



socket.on('playermovedData',(data)=>{
    console.log('player move data',data)
    UpdateTokenPosition(data)
    if(data.turn==myturn)
        {
            movetoken = true
            document.getElementById('diceroll').disabled = false
            document.getElementById('playerturnText').innerHTML = 'Your turn'
        }else{
            document.getElementById('diceroll').disabled = true
            document.getElementById('playerturnText').innerHTML = 'Opponent turn'
        }
        UpdateTurnUI(data.turn)
})


console.log(roomid)
console.log('move token',movetoken)