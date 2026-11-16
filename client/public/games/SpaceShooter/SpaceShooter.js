const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const gameOverScreen = document.getElementById('gameOverScreen');
const startScreen = document.getElementById('startScreen');
const pauseScreen = document.getElementById('pauseScreen');
const finalScoreEl = document.getElementById('finalScore');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
 
// Set Canvas Size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- GAME STATE ---
let score = 0, lives = 3, gameActive = false, isPaused = false;
let lastShotTime = 0, spawnTimer;
let projectiles = [], enemies = [], particles = [], powerups = [];

// --- SETTINGS ---
const shootGap = 250; 
const sideGap = 50; 
const dangerLineY = canvas.height - 80;
let powerupActive = false;

const player = { x: canvas.width / 2, y: canvas.height - 150, w: 60, h: 60 };

// --- CORE FUNCTIONS ---

function startGame() {
    gameActive = true;
    isPaused = false;
    startScreen.classList.add('d-none');
    gameOverScreen.classList.add('d-none');
    pauseScreen.classList.add('d-none');
    pauseBtn.classList.remove('d-none');
    restartBtn.classList.remove('d-none');
    spawnEnemy();
    draw(); 
}

function getSpawnDelay() {
    const delay = 1000 - (score * 2);
    return Math.max(300, delay);
}

function spawnEnemy() {
    if (!gameActive || isPaused) return;

    const typeRand = Math.random();
    let type = 'basic';
    let hp = 1;
    let size = Math.random() * 20 + 30;
    let color = '#6c757d'; 
    let horizontalSpeed = 0;

    if (typeRand > 0.8) { 
        type = 'tank';
        hp = 3;
        size = 60;
        color = '#6f42c1'; 
    } else if (typeRand > 0.5) { 
        type = 'diagonal';
        color = '#ffc107'; 
        let spawnX = Math.random() * (canvas.width - 100 - (sideGap * 2)) + sideGap;
        horizontalSpeed = spawnX > canvas.width / 2 ? -2 : 2;
    }

    enemies.push({
        x: Math.random() * (canvas.width - 100 - (sideGap * 2)) + sideGap,
        y: -60,
        size: size,
        speed: Math.random() * 1.5 + 1.5,
        type: type,
        hp: hp,
        color: color,
        hSpeed: horizontalSpeed,
        angle: 0
    });

    spawnTimer = setTimeout(spawnEnemy, getSpawnDelay());
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            alpha: 1,
            color: color
        });
    }
}

function autoShoot() {
    const currentTime = Date.now();
    if (currentTime - lastShotTime > shootGap) {
        if (powerupActive) {
            projectiles.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 20, vx: 0 });
            projectiles.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 20, vx: -2 });
            projectiles.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 20, vx: 2 });
        } else {
            projectiles.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 20, vx: 0 });
        }
        lastShotTime = currentTime;
    }
}

function update() {
    if (!gameActive || isPaused) return;
    autoShoot();

    // Update Particles
    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.alpha -= 0.02;
        if (p.alpha <= 0) particles.splice(i, 1);
    });

    // Update Projectiles
    projectiles.forEach((p, i) => {
        p.y -= 10;
        p.x += p.vx || 0;
        if (p.y < 0) projectiles.splice(i, 1);
    });

    // Update Powerups
    powerups.forEach((pu, i) => {
        pu.y += pu.speed;
        if (pu.x < player.x + player.w && pu.x + pu.size > player.x && pu.y < player.y + player.h && pu.y + pu.size > player.y) {
            powerupActive = true;
            powerups.splice(i, 1);
            setTimeout(() => { powerupActive = false; }, 5000);
        }
    });

    // Update Enemies
    enemies.forEach((enemy, eIndex) => {
        enemy.y += enemy.speed;
        
        if (enemy.type === 'diagonal') {
            enemy.x += enemy.hSpeed;
            if (enemy.x < sideGap || enemy.x > canvas.width - sideGap - enemy.size) {
                enemy.hSpeed *= -1;
            }
        }

        if (enemy.y + enemy.size > dangerLineY) {
            enemies.splice(eIndex, 1);
            lives--;
            livesEl.innerText = lives;
            if (lives <= 0) endGame();
        }

        projectiles.forEach((p, pIndex) => {
            if (p.x < enemy.x + enemy.size && p.x + p.w > enemy.x && p.y < enemy.y + enemy.size && p.y + p.h > enemy.y) {
                enemy.hp--;
                projectiles.splice(pIndex, 1);
                if (enemy.hp <= 0) {
                    createExplosion(enemy.x + enemy.size/2, enemy.y + enemy.size/2, enemy.color);
                    enemies.splice(eIndex, 1);
                    score += (enemy.type === 'tank') ? 30 : 10;
                    scoreEl.innerText = score;
                }
            }
        });
    });
}

function draw() {
    if (!gameActive && lives <= 0) return; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background & Danger Line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, sideGap, canvas.height);
    ctx.fillRect(canvas.width - sideGap, 0, sideGap, canvas.height);
    ctx.strokeStyle = '#ff0000';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(sideGap, dangerLineY);
    ctx.lineTo(canvas.width - sideGap, dangerLineY);
    ctx.stroke();
    ctx.setLineDash([]);

    particles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
    });
    ctx.globalAlpha = 1;

    powerups.forEach(pu => {
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#0f0';
        ctx.fillStyle = '#0f0';
        ctx.beginPath();
        ctx.arc(pu.x, pu.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    drawPlayerRocket(player.x, player.y, player.w, player.h);

    projectiles.forEach(p => {
        ctx.fillStyle = '#ff4b2b';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff4b2b';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.shadowBlur = 0;
    });
    
    enemies.forEach(enemy => drawEnemyRocket(enemy));

    update();
    requestAnimationFrame(draw);
}

// --- DRAWING UTILS ---

function drawPlayerRocket(x, y, w, h) {
    ctx.save();
    const mainColor = powerupActive ? '#ff00ff' : '#0dcaf0';
    if (gameActive && !isPaused) {
        ctx.fillStyle = Math.random() > 0.5 ? '#ffca3a' : '#ff595e';
        ctx.beginPath();
        ctx.moveTo(x + w/2 - 5, y + h);
        ctx.lineTo(x + w/2 + 5, y + h);
        ctx.lineTo(x + w/2, y + h + 15 + Math.random() * 10);
        ctx.fill();
    }
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.moveTo(x + w/2, y);
    ctx.bezierCurveTo(x + w, y + h, x + w, y + h, x + w/2, y + h);
    ctx.bezierCurveTo(x, y + h, x, y + h, x + w/2, y);
    ctx.fill();
    ctx.fillStyle = '#005f73';
    ctx.fillRect(x, y + h - 15, 8, 12);
    ctx.fillRect(x + w - 8, y + h - 15, 8, 12);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x + w/2, y + 25, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawEnemyRocket(enemy) {
    ctx.save();
    ctx.translate(enemy.x + enemy.size / 2, enemy.y + enemy.size / 2);
    if (enemy.type === 'diagonal') ctx.rotate(enemy.hSpeed * 0.1); 

    const s = enemy.size;
    ctx.fillStyle = enemy.color;
    ctx.fillRect(-s/4, -s/4, s/2, s/2);

    ctx.beginPath();
    ctx.moveTo(-s/4, s/4);
    ctx.lineTo(s/4, s/4);
    ctx.lineTo(0, s/2 + 10);
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(-s/4, -s/4); ctx.lineTo(-s/2, 0); ctx.lineTo(-s/4, 0); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(s/4, -s/4); ctx.lineTo(s/2, 0); ctx.lineTo(s/4, 0); ctx.fill();

    ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
    ctx.fillRect(-s/8, -s/4, s/4, s/8);
    ctx.restore();
}

// --- EVENT LISTENERS ---

function endGame() {
    gameActive = false;
    clearTimeout(spawnTimer);
    finalScoreEl.innerText = score;
    gameOverScreen.classList.remove('d-none');
}

function togglePause() {
    if (!gameActive) return;
    isPaused = !isPaused;
    if (isPaused) {
        pauseScreen.classList.remove('d-none');
        clearTimeout(spawnTimer);
    } else {
        pauseScreen.classList.add('d-none');
        spawnEnemy();
    }
}

window.addEventListener('mousemove', (e) => {
    if (isPaused || !gameActive) return;
    let targetX = e.clientX - player.w / 2;
    if (targetX < sideGap) targetX = sideGap;
    if (targetX > canvas.width - player.w - sideGap) targetX = canvas.width - player.w - sideGap;
    player.x = targetX;
});

// Start the game loop when user clicks start (assuming you have a button)
// startGame();
