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
        opponent = data.players?.find((i)=> i.name!==username.username)
   }

   console.log('opponent details',opponent)
   const getPlayerTurn = opponent.turn
   const opponentProfile = document.getElementById('opponentprofile')
   const SearchingForPlayerText = document.getElementById('searchingText')
   
   if(opponent)
{
    opponentProfile.innerHTML = `<img src='${opponent.playerprofile}'/>`

    // Change main heading
    const mainHeading = document.getElementById('mainHeading')

    mainHeading.innerHTML = `
        Match <span>Found!</span>
    `

    // // Hide searching text
    // SearchingForPlayerText.style.display = 'none'

    // // Hide dots
    // document.querySelector('.dots').style.display = 'none'


    // // Show countdown
    // const countdownContainer = document.getElementById('countdownContainer')
    // const countdownNumber = document.getElementById('countdownNumber')

    // countdownContainer.style.display = 'flex'


    // // Countdown
    // let count = 3

    // const countdown = setInterval(() => {

    //     countdownNumber.innerHTML = count

    //     // Restart animation
    //     countdownNumber.style.animation = 'none'
    //     countdownNumber.offsetHeight
    //     countdownNumber.style.animation = 'countdownAnimation 1s ease-in-out'

    //     count--

    //     if(count < 0)
    //     {
    //         clearInterval(countdown)

             
    //     }

    // },1000)
    window.location.href =
            `../LudoMainPlayingFiles/LudoMainPlayingFile.html?roomid=${data.roomid}`


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