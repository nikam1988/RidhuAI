(() => {
    // Sound synthesizer using Web Audio API (integrates with parent settings)
    const playSound = (type) => {
        if (window.soundEnabled === false) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (type === 'pop') {
                // Short organic pop sound
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } else if (type === 'wrong') {
                // Low pitch boing
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'victory') {
                // Celebration notes
                const playNote = (freq, start, duration) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
                    gain.gain.setValueAtTime(0.12, ctx.currentTime + start);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
                    osc.start(ctx.currentTime + start);
                    osc.stop(ctx.currentTime + start + duration);
                };
                playNote(523.25, 0, 0.15); // C5
                playNote(659.25, 0.1, 0.15); // E5
                playNote(783.99, 0.2, 0.15); // G5
                playNote(1046.50, 0.3, 0.5); // C6
            } else if (type === 'gameover') {
                // Sad failure sound
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.6);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
                osc.start();
                osc.stop(ctx.currentTime + 0.6);
            }
        } catch (e) {
            console.log('Audio error:', e);
        }
    };

    // Game Variables
    const screen = document.getElementById('game-screen-area');
    const scoreVal = document.getElementById('status-score-val');
    const timerVal = document.getElementById('status-timer-val');
    const livesVal = document.getElementById('status-lives-val');

    let score = 0;
    let timer = 45; // 45 seconds game duration
    let lives = 3;
    let targetSum = 0;
    let gameActive = true;
    let bubbleInterval = null;
    let timerInterval = null;
    let targetChangeInterval = null;
    let bubblesArray = [];

    // CSS styling for bubbles injected dynamically
    const styleId = 'game-bubble-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .game-target-board {
                position: absolute;
                top: 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 3px solid #1CB0F6;
                border-bottom: 6px solid #1CB0F6;
                border-radius: 20px;
                padding: 8px 30px;
                color: #0F172A;
                font-family: 'Fredoka One', cursive;
                font-size: 1.5rem;
                z-index: 50;
                box-shadow: 0 4px 15px rgba(28, 176, 246, 0.3);
                text-align: center;
                animation: float 2s ease-in-out infinite;
            }
            .game-target-num {
                color: var(--color-red);
                font-size: 2.2rem;
                display: block;
                line-height: 1;
            }
            .bubble-item {
                position: absolute;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(28, 176, 246, 0.4) 60%, rgba(24, 153, 214, 0.8) 100%);
                border: 2px solid rgba(255,255,255,0.6);
                box-shadow: 0 4px 10px rgba(0,0,0,0.1), inset 0 -4px 10px rgba(28, 176, 246, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0F172A;
                font-family: 'Fredoka One', cursive;
                font-size: 1.3rem;
                cursor: pointer;
                user-select: none;
                z-index: 10;
                transition: transform 0.1s;
            }
            .bubble-item:active {
                transform: scale(0.8);
            }
            .bubble-item.wrong-pop {
                background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(239, 68, 68, 0.5) 60%, rgba(220, 38, 38, 0.9) 100%);
                animation: wiggle 0.3s ease-in-out;
            }
            .game-over-panel {
                z-index: 80;
            }
        `;
        document.head.appendChild(style);
    }

    // Helper: Select new target number (between 5 and 20 for Grade 2 math)
    const selectNewTarget = () => {
        const prevTarget = targetSum;
        while (targetSum === prevTarget) {
            targetSum = Math.floor(Math.random() * 12) + 6; // 6 to 17
        }
        
        const boardNum = document.getElementById('target-sum-val');
        if (boardNum) {
            boardNum.innerText = targetSum;
            // Pop effect on board
            boardNum.parentElement.classList.add('bounce-effect');
            setTimeout(() => boardNum.parentElement.classList.remove('bounce-effect'), 400);
        }
    };

    // Helper: Generate equations
    const generateEquation = (shouldMatch) => {
        if (shouldMatch) {
            // Addition equations that sum up to targetSum
            const a = Math.floor(Math.random() * (targetSum - 1)) + 1; // 1 to target-1
            const b = targetSum - a;
            return `${a}+${b}`;
        } else {
            // Equations that do NOT sum up to targetSum
            let a = Math.floor(Math.random() * 10) + 1;
            let b = Math.floor(Math.random() * 10) + 1;
            while (a + b === targetSum) {
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
            }
            return `${a}+${b}`;
        }
    };

    // Spawn a bubble
    const spawnBubble = () => {
        if (!gameActive) return;

        const bubble = document.createElement('div');
        bubble.className = 'bubble-item';

        // 45% chance of spawning correct equation
        const isCorrect = Math.random() < 0.45;
        const equation = generateEquation(isCorrect);
        bubble.innerText = equation;

        // Position
        const startX = Math.floor(Math.random() * (screen.clientWidth - 90)) + 5;
        bubble.style.left = `${startX}px`;
        bubble.style.bottom = `-90px`;

        screen.appendChild(bubble);

        const bubbleObj = {
            element: bubble,
            y: -90,
            speed: Math.random() * 2 + 1.5, // Float speed
            correct: isCorrect
        };

        // Click Handler
        bubble.addEventListener('click', () => {
            if (!gameActive) return;
            
            if (bubbleObj.correct) {
                playSound('pop');
                score += 10;
                scoreVal.innerText = score.toString().padStart(4, '0');
                
                // Trigger quick tiny visual pop confetti on the bubble spot
                const rect = bubble.getBoundingClientRect();
                const screenRect = screen.getBoundingClientRect();
                const x = (rect.left + rect.width / 2 - screenRect.left) / screen.clientWidth;
                const y = (rect.top + rect.height / 2 - screenRect.top) / screen.clientHeight;
                
                confetti({
                    particleCount: 15,
                    spread: 80,
                    origin: { x, y: 1 - y },
                    colors: ['#1CB0F6', '#58CC02', '#FFC800'],
                    disableForced3d: true
                });

                // Periodic target changes every 40 points to make it dynamic
                if (score > 0 && score % 40 === 0) {
                    selectNewTarget();
                }

                removeBubble(bubbleObj);
            } else {
                playSound('wrong');
                bubble.classList.add('wrong-pop');
                lives--;
                updateLivesDisplay();

                // Screen shake
                screen.style.transform = 'translate(6px, 6px)';
                setTimeout(() => screen.style.transform = '', 100);

                if (lives <= 0) {
                    endGame(false);
                }
                
                setTimeout(() => removeBubble(bubbleObj), 300);
            }
        });

        bubblesArray.push(bubbleObj);
    };

    const removeBubble = (bubbleObj) => {
        if (bubbleObj.element && bubbleObj.element.parentNode) {
            bubbleObj.element.parentNode.removeChild(bubbleObj.element);
        }
        bubblesArray = bubblesArray.filter(b => b !== bubbleObj);
    };

    // Update lives display with heart emojis
    const updateLivesDisplay = () => {
        livesVal.innerText = '❤️'.repeat(Math.max(lives, 0)) + '🖤'.repeat(Math.max(3 - lives, 0));
    };

    // Animation Loop
    const animate = () => {
        if (!gameActive) return;

        bubblesArray.forEach(bubbleObj => {
            bubbleObj.y += bubbleObj.speed;
            bubbleObj.element.style.bottom = `${bubbleObj.y}px`;

            // If it escapes off the top of screen
            if (bubbleObj.y > screen.clientHeight) {
                if (bubbleObj.correct) {
                    // Missed a correct sum bubble: minor score reduction
                    score = Math.max(score - 5, 0);
                    scoreVal.innerText = score.toString().padStart(4, '0');
                }
                removeBubble(bubbleObj);
            }
        });

        requestAnimationFrame(animate);
    };

    // Game Over
    const endGame = (isTimeUp) => {
        gameActive = false;
        clearInterval(bubbleInterval);
        clearInterval(timerInterval);
        
        // Remove all bubbles from screen
        bubblesArray.forEach(b => {
            if (b.element && b.element.parentNode) b.element.parentNode.removeChild(b.element);
        });
        bubblesArray = [];

        // Remove Target Board
        const board = document.getElementById('game-target-board-el');
        if (board) board.parentNode.removeChild(board);

        // Display results
        const isVictory = score >= 80; // 80 points is win target
        if (isVictory) {
            playSound('victory');
            // Victory Confetti showers!
            const duration = 2.5 * 1000;
            const end = Date.now() + duration;
            const interval = setInterval(() => {
                if (Date.now() > end) return clearInterval(interval);
                confetti({ startVelocity: 25, spread: 360, particleCount: 30, origin: { x: Math.random(), y: Math.random() - 0.2 } });
            }, 200);
        } else {
            playSound('gameover');
        }

        screen.innerHTML = `
            <div class="game-overlay game-over-panel">
                <div style="font-size: 6rem; margin-bottom: 10px;">${isVictory ? '🎉🥇🎉' : '🦕💔🦕'}</div>
                <h2 class="overlay-title" style="color: ${isVictory ? 'var(--color-secondary)' : 'var(--color-red)'};">
                    ${isVictory ? 'VICTORY! YOU WON!' : 'GAME OVER! TRY AGAIN'}
                </h2>
                <div style="background: rgba(255,255,255,0.1); border: 2px solid #475569; padding: 15px 30px; border-radius: 15px; margin-bottom: 25px;">
                    <p style="font-size: 1.25rem; font-weight: 800; color: #94A3B8; margin-bottom: 5px;">YOUR FINAL SCORE</p>
                    <p style="font-size: 2.8rem; font-family: 'Fredoka One', cursive; color: var(--color-yellow); line-height: 1;">${score} Points</p>
                </div>
                <p class="overlay-desc">${isVictory ? 'Outstanding arithmetic skills, little Einstein!' : 'No worries! Practice makes perfect. Rexy wants to play again!'}</p>
                <div style="display: flex; gap: 20px;">
                    <button class="arcade-btn btn-green" id="retry-game-btn" style="font-size: 1.25rem;">PLAY AGAIN <i class="fas fa-redo"></i></button>
                    <a href="games.html" class="arcade-btn btn-blue" style="font-size: 1.25rem; display: flex; align-items: center;">PORTAL <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></a>
                </div>
            </div>
        `;

        document.getElementById('retry-game-btn').addEventListener('click', startGame);
    };

    // Main Init / Start Game loop
    const startGame = () => {
        // Reset Variables
        score = 0;
        timer = 45;
        lives = 3;
        gameActive = true;
        bubblesArray = [];
        
        scoreVal.innerText = '0000';
        timerVal.innerText = '45s';
        updateLivesDisplay();

        // Clear screen content
        screen.innerHTML = '';

        // Add Target Board UI element
        const targetBoard = document.createElement('div');
        targetBoard.className = 'game-target-board';
        targetBoard.id = 'game-target-board-el';
        targetBoard.innerHTML = `FIND EQUATIONS THAT EQUAL:<span id="target-sum-val" class="game-target-num">0</span>`;
        screen.appendChild(targetBoard);

        // Select first target
        selectNewTarget();

        // Setup intervals
        bubbleInterval = setInterval(spawnBubble, 1600);
        
        timerInterval = setInterval(() => {
            if (!gameActive) return;
            timer--;
            timerVal.innerText = `${timer}s`;
            
            if (timer <= 0) {
                endGame(true);
            }
        }, 1000);

        // Kick off animations
        animate();
    };

    // Run Game
    startGame();
})();
