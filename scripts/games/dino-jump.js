(() => {
    // Sound synthesizer using Web Audio API
    const playSound = (type) => {
        if (window.soundEnabled === false) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (type === 'jump') {
                // Ascending spring jump sound
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.18);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
                osc.start();
                osc.stop(ctx.currentTime + 0.18);
            } else if (type === 'hit') {
                // Crash noise
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.25);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                osc.start();
                osc.stop(ctx.currentTime + 0.25);
            } else if (type === 'select') {
                // Small click
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(500, ctx.currentTime);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } else if (type === 'victory') {
                // Fanfare
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
    let timer = 45;
    let lives = 3;
    let gameActive = true;
    let timerInterval = null;
    let animationFrameId = null;

    let question = '';
    let correctAnswer = 0;
    let options = [];
    let obstacleActive = false;
    let obstacleX = 100; // start at right edge percentage
    let isJumping = false;
    let obstaclePassed = false;
    let questionAnswered = false;

    // Inject CSS styling for Side-Scroller
    const styleId = 'game-dino-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .dino-bg-landscape {
                position: absolute;
                bottom: 0; left: 0; right: 0; top: 0;
                background: linear-gradient(180deg, #A5F3FC 0%, #CFFAFE 60%, #FEF08A 100%); /* sky to desert ground */
                z-index: 1;
            }
            .dino-clouds {
                position: absolute;
                top: 40px;
                left: 0;
                width: 200%;
                font-size: 3rem;
                color: rgba(255,255,255,0.6);
                animation: cloudScroll 30s linear infinite;
                z-index: 2;
                user-select: none;
            }
            .dino-ground {
                position: absolute;
                bottom: 0; left: 0; right: 0;
                height: 80px;
                background: #E2E8F0;
                border-top: 6px solid #94A3B8;
                z-index: 5;
            }
            .dino-runner {
                position: absolute;
                bottom: 65px;
                left: 80px;
                font-size: 4rem;
                z-index: 10;
                transition: transform 0.1s;
                transform-origin: bottom center;
            }
            .dino-runner.running {
                animation: dinoRun 0.4s steps(2) infinite alternate;
            }
            .dino-runner.jumping {
                animation: dinoJump 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            .dino-runner.hurt {
                animation: wiggle 0.4s ease-in-out;
            }
            .obstacle-cactus {
                position: absolute;
                bottom: 74px;
                font-size: 3.5rem;
                z-index: 8;
                user-select: none;
            }
            /* Subtraction Board */
            .dino-question-board {
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(15, 23, 42, 0.9);
                border: 3px solid #FFC800;
                border-radius: 20px;
                padding: 10px 30px;
                color: white;
                text-align: center;
                z-index: 50;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
            .dino-question-txt {
                font-family: 'Fredoka One', cursive;
                font-size: 1.5rem;
                color: white;
            }
            .dino-question-math {
                font-size: 2.2rem;
                color: var(--color-yellow);
                font-family: 'Fredoka One', cursive;
                margin-top: 5px;
            }
            /* Interactive Answer Doors */
            .dino-doors-container {
                position: absolute;
                bottom: 85px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 20px;
                z-index: 60;
                width: 90%;
                justify-content: center;
            }
            .dino-door {
                background: #FFFBEB;
                border: 3px solid #FCD34D;
                border-bottom: 6px solid #FCD34D;
                border-radius: 15px;
                padding: 10px 30px;
                font-family: 'Fredoka One', cursive;
                font-size: 1.8rem;
                color: #78350F;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                transition: all 0.15s ease;
                min-width: 90px;
                text-align: center;
                user-select: none;
            }
            .dino-door:hover {
                background: #FEF3C7;
            }
            .dino-door:active {
                transform: translateY(3px);
                border-bottom-width: 3px;
            }
            .dino-door.correct-door {
                background: #DCFCE7 !important;
                border-color: var(--color-secondary) !important;
                border-bottom-color: var(--color-secondary-dark) !important;
                color: var(--color-secondary-dark) !important;
            }
            .dino-door.wrong-door {
                background: #FEE2E2 !important;
                border-color: var(--color-red) !important;
                border-bottom-color: var(--color-red-dark) !important;
                color: var(--color-red-dark) !important;
            }

            @keyframes cloudScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            @keyframes dinoRun {
                0% { transform: scaleY(1); }
                100% { transform: scaleY(0.96) rotate(-2deg); }
            }
            @keyframes dinoJump {
                0% { bottom: 65px; transform: scaleY(1); }
                45% { bottom: 220px; transform: scaleY(1.08) rotate(3deg); }
                55% { bottom: 220px; transform: scaleY(1.08) rotate(3deg); }
                100% { bottom: 65px; transform: scaleY(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Helper: Select new subtraction question
    const generateQuestion = () => {
        const minuend = Math.floor(Math.random() * 10) + 10; // 10 to 19
        const subtrahend = Math.floor(Math.random() * 8) + 1; // 1 to 8
        correctAnswer = minuend - subtrahend;
        question = `${minuend} - ${subtrahend} = ?`;
        
        // Generate multiple choice options
        const incorrect1 = Math.max(correctAnswer + (Math.random() < 0.5 ? 2 : -2), 0);
        let incorrect2 = correctAnswer + (Math.random() < 0.5 ? 4 : -4);
        while (incorrect2 === incorrect1 || incorrect2 === correctAnswer || incorrect2 < 0) {
            incorrect2 = correctAnswer + (Math.random() < 0.5 ? 3 : -3);
        }
        
        options = [correctAnswer, incorrect1, incorrect2].sort(() => Math.random() - 0.5);

        // Update UI
        const mathEl = document.getElementById('dino-math-equation');
        if (mathEl) mathEl.innerText = question;

        renderDoors();
    };

    const renderDoors = () => {
        const container = document.getElementById('dino-doors-box');
        if (!container) return;

        let html = '';
        options.forEach(opt => {
            html += `<div class="dino-door" onclick="submitDinoAnswer(this, ${opt})">${opt}</div>`;
        });
        container.innerHTML = html;
    };

    // Submits the student answer
    window.submitDinoAnswer = (el, selectedAnswer) => {
        if (!gameActive || questionAnswered) return;

        questionAnswered = true;

        if (selectedAnswer === correctAnswer) {
            // Correct answer triggers JUMP!
            playSound('jump');
            el.classList.add('correct-door');
            
            const dino = document.getElementById('rexy-runner');
            if (dino) {
                dino.className = 'dino-runner jumping';
                isJumping = true;
                setTimeout(() => {
                    if (dino && gameActive) {
                        dino.className = 'dino-runner running';
                        isJumping = false;
                    }
                }, 750);
            }
            
            score += 10;
            scoreVal.innerText = score.toString().padStart(4, '0');
        } else {
            // Wrong answer! Rexy gets hurt!
            playSound('hit');
            el.classList.add('wrong-door');
            
            // Flag correct door
            const doors = document.querySelectorAll('.dino-door');
            doors.forEach(d => {
                if (parseInt(d.innerText) === correctAnswer) d.classList.add('correct-door');
            });

            triggerHurtEffect();
        }
    };

    const triggerHurtEffect = () => {
        lives--;
        updateLivesDisplay();

        const dino = document.getElementById('rexy-runner');
        if (dino) {
            dino.className = 'dino-runner hurt';
            setTimeout(() => {
                if (dino && gameActive) dino.className = 'dino-runner running';
            }, 500);
        }

        // Shake screen
        screen.style.transform = 'translate(8px, 8px)';
        setTimeout(() => screen.style.transform = '', 100);

        if (lives <= 0) {
            endGame(false);
        }
    };

    // Update lives view
    const updateLivesDisplay = () => {
        livesVal.innerText = '❤️'.repeat(Math.max(lives, 0)) + '🖤'.repeat(Math.max(3 - lives, 0));
    };

    // Obstacle and Running Loop
    const gameLoop = () => {
        if (!gameActive) return;

        const cactus = document.getElementById('obstacle-cact');
        
        if (obstacleActive) {
            obstacleX -= 1.6; // move obstacle left
            if (cactus) cactus.style.left = `${obstacleX}%`;

            // Dino position is at 80px out of ~800px width (approx 10%)
            // Check collision when obstacle gets close (e.g. between 10% and 18% horizontal distance)
            if (obstacleX <= 18 && obstacleX >= 10 && !obstaclePassed) {
                if (!isJumping) {
                    // Dino hit cactus!
                    playSound('hit');
                    obstaclePassed = true;
                    triggerHurtEffect();
                }
            }

            // Successfully jumped over cactus
            if (obstacleX < 10 && !obstaclePassed) {
                obstaclePassed = true;
                // Double check jump success
                if (isJumping) {
                    // Spawn score confetti over dino
                    confetti({
                        particleCount: 15,
                        spread: 60,
                        origin: { x: 0.15, y: 0.4 },
                        colors: ['#58CC02', '#FFC800'],
                        disableForced3d: true
                    });
                }
            }

            // Remove obstacle when it goes off screen
            if (obstacleX < -8) {
                obstacleActive = false;
            }
        } else {
            // Spawn new obstacle
            obstacleX = 100;
            obstacleActive = true;
            obstaclePassed = false;
            questionAnswered = false;
            
            if (cactus) {
                cactus.style.left = '100%';
                // Randomly alternate between Cactus and Rock emojis
                cactus.innerText = Math.random() < 0.5 ? '🌵' : '🪨';
            }

            generateQuestion();
        }

        animationFrameId = requestAnimationFrame(gameLoop);
    };

    // End Game
    const endGame = (isTimeUp) => {
        gameActive = false;
        clearInterval(timerInterval);
        cancelAnimationFrame(animationFrameId);

        const isVictory = score >= 80;
        if (isVictory) {
            playSound('victory');
            // Show confetti showers
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
                <div style="font-size: 6rem; margin-bottom: 10px;">${isVictory ? '👑🦕👑' : '🦖💔☠️'}</div>
                <h2 class="overlay-title" style="color: ${isVictory ? 'var(--color-secondary)' : 'var(--color-red)'};">
                    ${isVictory ? 'VICTORY! REXY ESCAPED!' : 'GAME OVER! REXY FELL'}
                </h2>
                <div style="background: rgba(255,255,255,0.1); border: 2px solid #475569; padding: 15px 30px; border-radius: 15px; margin-bottom: 25px;">
                    <p style="font-size: 1.25rem; font-weight: 800; color: #94A3B8; margin-bottom: 5px;">YOUR FINAL SCORE</p>
                    <p style="font-size: 2.8rem; font-family: 'Fredoka One', cursive; color: var(--color-yellow); line-height: 1;">${score} Points</p>
                </div>
                <p class="overlay-desc">${isVictory ? 'Outstanding! Rexy ran like a speed train!' : 'Rexy ran into too many cactus spikes. Try again to help him run further!'}</p>
                <div style="display: flex; gap: 20px;">
                    <button class="arcade-btn btn-green" id="retry-game-btn" style="font-size: 1.25rem;">PLAY AGAIN <i class="fas fa-redo"></i></button>
                    <a href="games.html" class="arcade-btn btn-blue" style="font-size: 1.25rem; display: flex; align-items: center;">PORTAL <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></a>
                </div>
            </div>
        `;

        document.getElementById('retry-game-btn').addEventListener('click', startGame);
    };

    // Start Game
    const startGame = () => {
        score = 0;
        timer = 45;
        lives = 3;
        gameActive = true;
        obstacleActive = false;
        isJumping = false;
        obstaclePassed = false;
        questionAnswered = false;

        scoreVal.innerText = '0000';
        timerVal.innerText = '45s';
        updateLivesDisplay();

        screen.innerHTML = `
            <!-- Scrolling sky and ground -->
            <div class="dino-bg-landscape"></div>
            <div class="dino-clouds">☁️ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ☁️ &nbsp; &nbsp; &nbsp; &nbsp; ☁️</div>
            <div class="dino-ground"></div>
            
            <!-- Running Rexy Dino -->
            <div class="dino-runner running" id="rexy-runner">🦖</div>

            <!-- Obstacle Cactus -->
            <div class="obstacle-cactus" id="obstacle-cact" style="left: 100%;">🌵</div>

            <!-- Question display board -->
            <div class="dino-question-board">
                <div class="dino-question-txt">QUICK! ANSWER TO JUMP:</div>
                <div class="dino-question-math" id="dino-math-equation">0 - 0 = ?</div>
            </div>

            <!-- Answer options doors -->
            <div class="dino-doors-container" id="dino-doors-box">
                <!-- Doors filled dynamically -->
            </div>
        `;

        // Start interval
        timerInterval = setInterval(() => {
            if (!gameActive) return;
            timer--;
            timerVal.innerText = `${timer}s`;

            if (timer <= 0) {
                endGame(true);
            }
        }, 1000);

        gameLoop();
    };

    startGame();
})();
