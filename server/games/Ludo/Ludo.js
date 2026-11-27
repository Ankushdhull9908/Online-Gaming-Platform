const waitingPlayers = []
const games = {}

const player1path = [91,92,93,94,95,81,66,51,36,21,6,7,8,23,38,53,68,83,99,100,101,102,103,104,119,134,133,
    132,131,130,129,143,158,173,188,203,218,217,216,201,186,171,156,141,125,124,123,122,
    121,120,105,106,107,108,109,110,111]
    const player2path = [133,132,131,130,129,143,158,173,188,203,218,217,216,201,186,171,156,141,125,124,123,122,121,120,
    105,90,91,92,93,94,95,81,66,51,36,21,6,7,8,23,38,53,68,83,99,100,101,102,103,104,119,118,117,116,115,114,113]

    const safetoken = [91,36,23,102,133,188,201,122]
function CheckUserExist(user)
{
  const Exist = waitingPlayers.filter((i)=>i.name===user.name)
  if(Exist.length===0)
  {
    return false
  }else{
    return true
  }
}

console.log(waitingPlayers)

function MoveTokenLogic(data)
    {
      const game = games[data.roomid]

      if(game.turn==1)
      {
        
        if(game.player1token.token[Number(data.token)].status=="locked" && game.dice==6)
        { 
          game.player1token.token[Number(data.token)].position = player1path[0]
          game.player1token.token[Number(data.token)].status="unlocked"
          game.player1unlock=true
        }else if(game.player1token.token[Number(data.token)].status=="unlocked"){
          const movedsteps = game.player1token.token[Number(data.token)].movedSteps
          game.player1token.token[Number(data.token)].position = player1path[movedsteps+game.dice]
          game.player1token.token[Number(data.token)].movedSteps = movedsteps+game.dice
        }else{
          game.turn = 'invalidplayer1move'
        }
      }else if(game.turn==2){
        if(game.player2token.token[Number(data.token)].status=='locked' && game.dice==6)
        {
            game.player2token.token[Number(data.token)].position = player2path[0]
            game.player2token.token[Number(data.token)].status="unlocked"
            game.player2unlock=true
        }else if(game.player2token.token[Number(data.token)].status=='unlocked'){
            const movedsteps = game.player2token.token[Number(data.token)].movedSteps
            game.player2token.token[Number(data.token)].position = player2path[movedsteps+game.dice]
            game.player2token.token[Number(data.token)].movedSteps = movedsteps+game.dice
        }else{
           game.turn = 'invalidplayer2move'
        }
      }
    }



function MakeRoom(io,player1,player2)
{
  const oldplayer1data = player1
  const oldplayer2data = player2
  const player1turn = {...player1,turn:1}
  const player2turn = {...player2,turn:2}
  player1 = player1turn
  player2 = player2turn
  
  const roomid = Math.ceil(Math.random()*9999)

  const player1socket = io.sockets.sockets.get(player1.id)
  const player2socket = io.sockets.sockets.get(player2.id)

  if(!player1socket || !player2socket)
  {
     return
  }

  player1socket.join(roomid)
  player2socket.join(roomid)
  
  io.to(roomid).emit('matchfound',{players:[player1,player2],roomid:roomid})
  games[roomid] = {
       players:[oldplayer1data,oldplayer2data],
       dice:null,
       turn:1,
       player1token:{
        token:[{position:32,movedSteps:0,status:'locked'},{position:33,movedSteps:0,status:'locked'},{position:47,movedSteps:0,status:'locked'},{position:48,movedSteps:0,status:'locked'}]
       },
       player2token:{
        token:[{position:191,movedSteps:0,status:'locked'},{position:192,movedSteps:0,status:'locked'},{position:176,movedSteps:0,status:'locked'},{position:177,movedSteps:0,status:'locked'}]
       },
       player1unlock:false,
       player2unlock:false,
       buttondisabled:false
  
  }
  
}



export default function Ludo(io, socket, data) {
  

  socket.on('matching',(data)=>{
    const user = {
      name:data.name,
      id:socket.id,
      playerprofile:data.playerprofile
    }

    const UserExist = CheckUserExist(user)
    if(UserExist===false) waitingPlayers.push(user)

     

    if(waitingPlayers.length>=2)
    {
      const player1 = waitingPlayers.shift()
      const player2 = waitingPlayers.shift()
      MakeRoom(io,player1,player2)
    }
  })

  
  console.log("Ludo session start:", socket.id, data);

  socket.on('join-room',(data)=>{
    

    socket.join(data.roomid)

    socket.emit(
        'initial-game-data',
        games[data.roomid]
    )})

    // roll dice

    socket.on('rolldice',(roomid)=>{
   
    const diceval = Math.ceil(Math.random()*6)
    games[roomid].dice = diceval

    const game = games[roomid]
    if(diceval===6)
    {
      games[roomid].buttondisabled = true
    }
    
 
    if(diceval !== 6)
    {
      // player1 turn and player1 is locked
        if(game.turn === 1 && game.player1unlock === false)
        {
            changeTurn(roomid)
        }
        else if(game.turn === 2 && game.player2unlock === false)
        {
            changeTurn(roomid)
        }
    }

    io.to(roomid).emit('dicerolldata',games[roomid])
})


    
    socket.on('moveplayertoken',(data)=>{
      console.log('move token data',data)
      MoveTokenLogic(data)
      changeTurn(data.roomid)
      io.to(data.roomid).emit('playermovedData',games[data.roomid])
    })

    function changeTurn(roomid)
    {
      console.log('change turn called',games[roomid])
        if(games[roomid].dice===6){
          games[roomid].buttondisabled=true
          return
        }

        if(games[roomid].turn==='invalidplayer2move')
        {
          games[roomid].turn=2
          return
          
        }else if(games[roomid].turn==='invalidplayer1move'){
          games[roomid].turn=1
          return
        }else{
          if(games[roomid].turn==1)
        {
        games[roomid].turn = 2
        }else{
         games[roomid].turn = 1
        }
        }
        


        
    }


  socket.on("disconnect", () => {
   
  });
}