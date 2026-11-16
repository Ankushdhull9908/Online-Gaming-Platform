import { SOCKET_URL } from '/API.js';

const socket = io(SOCKET_URL);

const username = JSON.parse(localStorage.getItem('player'))

if(username){
    if(username.playerprofile)
    {
        const myprofile = document.getElementById('myprofile')
        myprofile.innerHTML = `<img src='${username.playerprofile}'/>`
    }
    
    
    socket.emit('join-games-server',{name:username.username,game:'Ludo'})

    socket.emit('matching',{name:username.username,playerprofile:username.playerprofile})
} 

socket.on('matchfound',(data)=>{
   let opponent
   console.log('match found',data)

   if(data)
   {        
        opponent = data.players?.filter((i)=> i.name!==username.ingameId)
   }

   
   const getPlayerTurn = opponent[0].turn
   const opponentProfile = document.getElementById('opponentprofile')
   const SearchingForPlayerText = document.getElementById('searchingText')
   
   if(opponent)
{
    opponentProfile.innerHTML = `<img src='${opponent[0].playerprofile}'/>`

    // Change main heading
    const mainHeading = document.getElementById('mainHeading')

    mainHeading.innerHTML = `
        Match <span>Found!</span>
    `

    // Hide searching text
    SearchingForPlayerText.style.display = 'none'

    // Hide dots
    document.querySelector('.dots').style.display = 'none'


    // Show countdown
    const countdownContainer = document.getElementById('countdownContainer')
    const countdownNumber = document.getElementById('countdownNumber')

    countdownContainer.style.display = 'flex'


    // Countdown
    let count = 3

    const countdown = setInterval(() => {

        countdownNumber.innerHTML = count

        // Restart animation
        countdownNumber.style.animation = 'none'
        countdownNumber.offsetHeight
        countdownNumber.style.animation = 'countdownAnimation 1s ease-in-out'

        count--

        if(count < 0)
        {
            clearInterval(countdown)

            window.location.href =
            `../LudoMainPlayingFiles/LudoMainPlayingFile.html?roomid=${data.roomid}`
        }

    },1000)


    if(getPlayerTurn===1)
    {
        localStorage.setItem('turn',2)
    }
    else
    {
        localStorage.setItem('turn',1)
    }
}
    
})