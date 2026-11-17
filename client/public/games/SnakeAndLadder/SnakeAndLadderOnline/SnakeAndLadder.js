const imgsrc = '../../Assets/SnakeAndLadderAssets/piece.png'
const board = document.querySelector('.board')
const diceval = document.querySelector('#diceval')
const playerposid = document.querySelector('#playerpos')
const playerpeice = document.createElement("img");
playerpeice.id = 'playerpiece'
playerpeice.src = imgsrc
var playerpos = -1;
var cellvalues = []
var oldplayerpos = -1;
const dicesection = document.querySelector('.dicesection')
const diceimg = document.createElement('img')
dicesection.appendChild(diceimg)
var dicevalue = 0
diceimg.src = '../../Assets/SnakeAndLadderAssets/dice1.png'
var showDiceRoll = false
const rules = {4:25,13:46,27:5,33:49,40:3,50:69,43:18,42:63,54:31,60:45,76:58,62:81,74:92,89:53,99:41}
const DiceFaces = {1:'../../Assets/SnakeAndLadderAssets/dice1.png',3:'../../Assets/SnakeAndLadderAssets/dice3.png',
     2:'../../Assets/SnakeAndLadderAssets/dice2.png',4:'../../Assets/SnakeAndLadderAssets/dice4.png',
     5:'../../Assets/SnakeAndLadderAssets/dice5.png',6:'../../Assets/SnakeAndLadderAssets/dice6.png'
   }

diceimg.addEventListener('click',()=>{
   rolldice()
})

for (let row = 9; row >=0; row--) 
   {
    if (row % 2 === 0) {
        for (let col = 1; col <= 10; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            var number = row * 10 + col
            cell.dataset.pos = number
            board.appendChild(cell);
        }
    } 
    else{
        for (let col = 10; col >= 1; col--) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            var number = row * 10 + col
            cell.dataset.pos = number
            board.appendChild(cell);
        }
    }

}


function rolldice()
{
    var rand = Math.ceil(Math.random()*6)
    showDiceRoll = true
    diceimg.src = '../../Assets/SnakeAndLadderAssets/dice-dice-roll.gif'
     AnimateDiceRoll()

     setTimeout(()=>{
            ShowDiceVal(rand)

     if(showDiceRoll==false)
     {
         if(playerpos==-1 && rand==6)
     {

                playerpos=1
     }else if(playerpos==-1 && rand!=6){
         playerpos = -1
     }else{
        playerpos+=rand
     }
    
     if(playerpos>=101){
        return
     }

    playerpos ==-1 ? playerposid.innerHTML='You Need 6 To UNLOCK' :  playerposid.innerHTML = playerpos
   
    
    playerpos!==-1 ? MapPlayer(playerpos) : playerpos ==-1
     }
     },1200)

}
function MapPlayer(playerposition)
{
    var cell = document.querySelector(`[data-pos="${playerposition}"]`)
    
   if(playerpos==1)
   {
    oldplayerpos = playerpos
    cell.appendChild(playerpeice)
   }else
   {
     var oldcell = document.querySelector(`[data-pos="${oldplayerpos}"]`)
     oldcell.removeChild(playerpeice)
     oldplayerpos = playerposition
     
     cell.appendChild(playerpeice)
     var updatedposition = CheckSnakeOrLadder(playerposition)
     console.log('updated position',updatedposition)
     if(updatedposition!==playerposition){
        playerpos = updatedposition
        cell.removeChild(playerpeice)
        

        cell =document.querySelector(`[data-pos="${updatedposition}"]`)
        
        cell.appendChild(playerpeice)
        
        oldplayerpos = updatedposition
        
     }
     if(playerposition===100)
     {
        alert('won')
     }
   }
}

function CheckSnakeOrLadder(CurrentPlayerPosition)
{
     if(rules[CurrentPlayerPosition])
     {
      CurrentPlayerPosition = rules[CurrentPlayerPosition]
     }
     
     return CurrentPlayerPosition
}

function AnimateDiceRoll()
{
 
   
   showDiceRoll = false

}

function ShowDiceVal(value)
{
   if(DiceFaces[value])
   {
      diceimg.src = DiceFaces[value]
   }
}