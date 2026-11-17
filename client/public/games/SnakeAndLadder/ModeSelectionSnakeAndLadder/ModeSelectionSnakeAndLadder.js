// Function to show this page (Call this when your initial card is clicked)
function showModeSelection() {
    document.getElementById('mode-selection').style.display = 'flex';
}

function hideModeSelection() {
    document.getElementById('mode-selection').style.display = 'none';
}

function BackToMain(){
    window.location.href = "index.html"
}

function selectMode(mode) {
    if(mode==='local')
    {
            var mode = 'local'
             window.location.href = `../SnakeAndLadderOnline/SnakeAndLadder.html?mode=${mode}`
    }else if(mode==='online') 
    {
         var mode = 'online'
         var uniqueId = Math.ceil(Math.random()*9999)
             window.location.href = `../SnakeAndLadderOnline/SnakeAndLadderOnline.html?mode=${mode}&id=${uniqueId}`
    }
}