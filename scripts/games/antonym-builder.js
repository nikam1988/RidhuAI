(() => {
    // Sound synthesizer using Web Audio API
    const playSound = (type) => {
        if (window.soundEnabled === false) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (type === 'select') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(550, ctx.currentTime);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } else if (type === 'match') {
                // Happy chord chime
                const playNote = (freq, start, duration) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
                    gain.gain.setValueAtTime(0.1, ctx.currentTime + start);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
                    osc.start(ctx.currentTime + start);
                    osc.stop(ctx.currentTime + start + duration);
                };
                playNote(523.25, 0, 0.12); // C5
                playNote(659.25, 0.08, 0.12); // E5
            } else if (type === 'wrong') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.25);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                osc.start();
                osc.stop(ctx.currentTime + 0.25);
            } else if (type === 'victory') {
                // Energetic success theme
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
                playNote(523.25, 0, 0.12); // C5
                playNote(659.25, 0.08, 0.12); // E5
                playNote(783.99, 0.16, 0.12); // G5
                playNote(1046.50, 0.24, 0.4); // C6
            } else if (type === 'gameover') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.5);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            }
        } catch (e) {
            console.log('Audio error:', e);
        }
    };

    // Game variables
    const screen = document.getElementById('game-screen-area');
    const scoreVal = document.getElementById('status-score-val');
    const timerVal = document.getElementById('status-timer-val');
    const livesVal = document.getElementById('status-lives-val');

    let score = 0;
    let timer = 45;
    let lives = 3;
    let gameActive = true;
    let timerInterval = null;
    let selectedSource = null;
    let matchedCount = 0;
    let level = 1;

    // Word opposites mapping
    const antonymPool = [
        { word: 'Hot', antonym: 'Cold' },
        { word: 'Fast', antonym: 'Slow' },
        { word: 'Big', antonym: 'Small' },
        { word: 'Happy', antonym: 'Sad' },
        { word: 'Day', antonym: 'Night' },
        { word: 'Soft', antonym: 'Hard' },
        { word: 'Tall', antonym: 'Short' },
        { word: 'Heavy', antonym: 'Light' },
        { word: 'Up', antonym: 'Down' },
        { word: 'Clean', antonym: 'Dirty' }
    ];

    // Inject CSS styling
    const styleId = 'game-antonym-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .antonym-container {
                display: flex;
                width: 100%;
                height: 100%;
                padding: 15px 40px;
                gap: 30px;
                justify-content: space-between;
                align-items: flex-start;
                background: linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 55%, #FEF08A 100%);
                z-index: 10;
                position: relative;
            }
            .antonym-col {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 44%;
                z-index: 25;
            }
            .antonym-card {
                background: white;
                border: 3px solid #0EA5E9;
                border-bottom: 5px solid #0EA5E9;
                border-radius: 12px;
                padding: 10px 16px;
                font-family: 'Fredoka One', cursive;
                font-size: 1.25rem;
                color: #0369A1;
                cursor: grab;
                text-align: center;
                user-select: none;
                transition: transform 0.12s;
            }
            .antonym-card:hover {
                transform: scale(1.02);
                border-color: #0284C7;
            }
            .antonym-card.selected {
                background: #F0F9FF;
                border-color: var(--color-primary);
                box-shadow: 0 0 10px rgba(28,176,246,0.6);
            }
            .antonym-card.dragging {
                opacity: 0.5;
            }
            .antonym-card.matched {
                background: #DCFCE7 !important;
                border-color: var(--color-secondary) !important;
                border-bottom-width: 3px !important;
                color: var(--color-secondary-dark) !important;
                cursor: default;
                transform: none !important;
            }
            .antonym-slot {
                background: rgba(255,255,255,0.7);
                border: 3px dashed #0EA5E9;
                border-radius: 12px;
                padding: 10px 16px;
                font-family: 'Fredoka One', cursive;
                font-size: 1.25rem;
                color: #0369A1;
                text-align: center;
                min-height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background 0.15s;
            }
            .antonym-slot.dragover {
                background: #E0F2FE;
                border-style: solid;
                border-color: var(--color-primary);
            }
            .antonym-slot.slot-matched {
                border-style: solid;
                border-color: var(--color-secondary);
                background: #DCFCE7;
                cursor: default;
            }
            /* Visual Canyon Bridge Scene */
            .bridge-scene {
                position: absolute;
                bottom: 0; left: 0; right: 0;
                height: 100px;
                z-index: 15;
                pointer-events: none;
            }
            .canyon-cliff {
                position: absolute;
                bottom: 0;
                height: 70px;
                width: 75px;
                background: #854D0E;
                border-top: 5px solid #166534;
                border-radius: 5px;
            }
            .canyon-cliff-left { left: 0; }
            .canyon-cliff-right { right: 0; }
            .bridge-dino {
                position: absolute;
                bottom: 60px;
                left: 15px;
                font-size: 2.8rem;
                transition: left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .bridge-treasure {
                position: absolute;
                bottom: 73px;
                right: 20px;
                font-size: 2rem;
                transition: transform 0.2s;
            }
            .bridge-treasure.opened {
                transform: scale(1.2);
            }
            .bridge-logs-container {
                position: absolute;
                bottom: 53px;
                left: 75px;
                right: 75px;
                height: 20px;
                display: flex;
                justify-content: space-around;
            }
            .wood-plank {
                font-size: 1.8rem;
                line-height: 1;
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.3s, transform 0.3s ease-out;
            }
            .wood-plank.placed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    // Generate random word antonym pairings
    const getLevelPairs = () => {
        const pairs = [];
        const usedIndexes = [];

        while (pairs.length < 4) {
            const idx = Math.floor(Math.random() * antonymPool.length);
            if (!usedIndexes.includes(idx)) {
                usedIndexes.push(idx);
                pairs.push(antonymPool[idx]);
            }
        }
        return pairs;
    };

    // Render active level
    const renderLevel = () => {
        matchedCount = 0;
        selectedSource = null;

        const pairs = getLevelPairs();
        
        // Shuffle sources and targets independently
        const shuffledSources = [...pairs].sort(() => Math.random() - 0.5);
        const shuffledTargets = [...pairs].sort(() => Math.random() - 0.5);

        screen.innerHTML = `
            <div class="level-banner">LEVEL ${level}</div>
            <div class="antonym-container">
                <!-- Draggable Words on Left -->
                <div class="antonym-col">
                    ${shuffledSources.map((p, idx) => `
                        <div class="antonym-card" id="word-${idx}" data-match="${p.antonym}" draggable="true">${p.word}</div>
                    `).join('')}
                </div>

                <!-- Target Opposites on Right -->
                <div class="antonym-col">
                    ${shuffledTargets.map((p, idx) => `
                        <div class="antonym-slot" id="slot-${idx}" data-val="${p.antonym}">Opposite of: ${p.antonym}</div>
                    `).join('')}
                </div>

                <!-- Bridge Canyon Scene -->
                <div class="bridge-scene">
                    <div class="canyon-cliff canyon-cliff-left"></div>
                    <div class="canyon-cliff canyon-cliff-right"></div>
                    <div class="bridge-dino" id="bridge-rexy">🦖</div>
                    <div class="bridge-treasure" id="bridge-chest">🎁</div>
                    <div class="bridge-logs-container">
                        <span class="wood-plank" id="plank-0">🪵</span>
                        <span class="wood-plank" id="plank-1">🪵</span>
                        <span class="wood-plank" id="plank-2">🪵</span>
                        <span class="wood-plank" id="plank-3">🪵</span>
                    </div>
                </div>
            </div>
        `;

        setupHandlers();
    };

    // Setup drag and click listeners
    const setupHandlers = () => {
        const cards = document.querySelectorAll('.antonym-card');
        const slots = document.querySelectorAll('.antonym-slot');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                if (!gameActive || card.classList.contains('matched')) return;
                card.classList.add('dragging');
                e.dataTransfer.setData('text/plain', card.id);
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });

            card.addEventListener('click', () => {
                if (!gameActive || card.classList.contains('matched')) return;
                playSound('select');
                document.querySelectorAll('.antonym-card').forEach(c => c.classList.remove('selected'));
                selectedSource = card;
                card.classList.add('selected');
            });
        });

        slots.forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!gameActive || slot.classList.contains('slot-matched')) return;
                slot.classList.add('dragover');
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('dragover');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('dragover');
                if (!gameActive || slot.classList.contains('slot-matched')) return;

                const cardId = e.dataTransfer.getData('text/plain');
                const card = document.getElementById(cardId);
                if (card) {
                    processMatch(card, slot);
                }
            });

            slot.addEventListener('click', () => {
                if (!gameActive || slot.classList.contains('slot-matched') || !selectedSource) return;
                processMatch(selectedSource, slot);
            });
        });
    };

    // Processes a match attempt
    const processMatch = (card, slot) => {
        const matchVal = card.getAttribute('data-match');
        const slotVal = slot.getAttribute('data-val');

        if (matchVal === slotVal) {
            // SUCCESS!
            playSound('match');

            card.classList.remove('selected');
            card.classList.add('matched');
            card.draggable = false;

            slot.classList.add('slot-matched');
            slot.innerText = `${card.innerText} ⇆ ${slotVal} ✔`;

            selectedSource = null;

            // Place a plank on the bridge
            const plank = document.getElementById(`plank-${matchedCount}`);
            if (plank) plank.classList.add('placed');

            matchedCount++;
            score += 10;
            scoreVal.innerText = score.toString().padStart(4, '0');

            // Trigger minor confetti at drop spot
            const rect = slot.getBoundingClientRect();
            const screenRect = screen.getBoundingClientRect();
            const x = (rect.left + rect.width / 2 - screenRect.left) / screen.clientWidth;
            const y = (rect.top + rect.height / 2 - screenRect.top) / screen.clientHeight;

            confetti({
                particleCount: 15,
                spread: 70,
                origin: { x, y: 1 - y },
                colors: ['#0EA5E9', '#58CC02', '#FFC800'],
                disableForced3d: true
            });

            // If level completed, Rexy walks across the bridge to the chest!
            if (matchedCount === 4) {
                gameActive = false; // pause timer
                clearInterval(timerInterval);

                setTimeout(() => {
                    const rexy = document.getElementById('bridge-rexy');
                    const chest = document.getElementById('bridge-chest');
                    
                    if (rexy) {
                        // Move Rexy across the screen
                        rexy.style.left = 'calc(100% - 100px)';
                        
                        // Wait for run animation to finish, then open chest and show final score
                        setTimeout(() => {
                            playSound('victory');
                            if (chest) {
                                chest.innerText = '🔓💎';
                                chest.classList.add('opened');
                            }
                            
                            // Blast victory confetti showers
                            confetti({ particleCount: 80, spread: 80, origin: { x: 0.85, y: 0.4 } });
                            
                            setTimeout(() => {
                                endGame(true, true);
                            }, 1200);
                        }, 1000);
                    }
                }, 600);
            }
        } else {
            // MATCH FAIL!
            playSound('wrong');
            
            // Wiggle animations
            card.classList.add('wiggle-effect');
            slot.classList.add('wiggle-effect');
            setTimeout(() => {
                card.classList.remove('wiggle-effect');
                slot.classList.remove('wiggle-effect');
            }, 500);

            card.classList.remove('selected');
            selectedSource = null;

            lives--;
            updateLivesDisplay();

            if (lives <= 0) {
                endGame(false);
            }
        }
    };

    const updateLivesDisplay = () => {
        livesVal.innerText = '❤️'.repeat(Math.max(lives, 0)) + '🖤'.repeat(Math.max(3 - lives, 0));
    };

    // End Game
    const endGame = (isTimeUp, isLevelComplete = false) => {
        gameActive = false;
        clearInterval(timerInterval);

        const isVictory = isLevelComplete || score >= 40;
        if (isVictory) {
            playSound('victory');
            
            // Large double confetti streams
            const duration = 3.5 * 1000;
            const end = Date.now() + duration;
            const interval = setInterval(() => {
                if (Date.now() > end) return clearInterval(interval);
                confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0, y: 0.85 } });
                confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 1, y: 0.85 } });
            }, 250);
        } else {
            playSound('gameover');
        }

        // Calculate gold stars based on lives
        let stars = '⭐';
        if (isVictory) {
            if (lives === 3) stars = '⭐⭐⭐';
            else if (lives === 2) stars = '⭐⭐';
            else stars = '⭐';
        }

        const feedbackMsg = isLevelComplete 
            ? "👑 SUCCESS! Rexy crossed the bridge and found the crystal jewels! 🦖💎" 
            : (isVictory ? "👍 Great Job! Almost perfect!" : "💪 Don't give up! Rexy wants to play again!");

        screen.innerHTML = `
            <div class="game-overlay game-over-panel" style="animation: bounce-scale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); padding: 15px 25px;">
                <div style="font-size: 3.5rem; margin-bottom: 2px; animation: float 2s ease-in-out infinite;">
                    ${isLevelComplete ? '🦖💎🏆' : (isVictory ? '🦕🏅🎈' : '👾💔☠️')}
                </div>
                <h2 class="overlay-title" style="color: ${isVictory ? 'var(--color-secondary)' : 'var(--color-red)'}; font-size: 1.6rem; margin-bottom: 2px;">
                    ${isLevelComplete ? 'BRIDGE COMPLETED!' : 'GAME OVER! TIME EXPIRED'}
                </h2>
                
                <div style="font-size: 1.7rem; color: #FCD34D; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    ${isVictory ? stars : '❌❌❌'}
                </div>

                <div style="background: rgba(255,255,255,0.1); border: 2px solid #475569; padding: 6px 15px; border-radius: 12px; margin-bottom: 10px;">
                    <p style="font-size: 0.95rem; font-weight: 800; color: #94A3B8; margin-bottom: 1px;">YOUR SCORE</p>
                    <p style="font-size: 2rem; font-family: 'Fredoka One', cursive; color: var(--color-yellow); line-height: 1;">${score} Points</p>
                </div>
                
                <p class="overlay-desc" style="font-weight: 800; font-size: 1.1rem; color: #E2E8F0; margin-bottom: 12px; line-height: 1.4;">${feedbackMsg}</p>
                
                <div style="display: flex; gap: 15px;">
                    <button class="arcade-btn btn-green" id="retry-game-btn" style="font-size: 1.1rem; padding: 10px 24px;">
                        PLAY AGAIN <i class="fas fa-redo"></i>
                    </button>
                    ${isLevelComplete ? `
                        <button class="arcade-btn btn-blue" id="next-level-btn" style="font-size: 1.1rem; padding: 10px 24px;">
                            NEXT LEVEL <i class="fas fa-arrow-right"></i>
                        </button>
                    ` : `
                        <a href="games.html" class="arcade-btn btn-blue" style="font-size: 1.1rem; padding: 10px 24px; display: flex; align-items: center;">
                            PORTAL <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                        </a>
                    `}
                </div>
            </div>
        `;

        document.getElementById('retry-game-btn').addEventListener('click', startGame);
        if (isLevelComplete) {
            document.getElementById('next-level-btn').addEventListener('click', () => {
                level++;
                startGame();
            });
        }
    };

    // Start Game loop
    const startGame = () => {
        score = 0;
        timer = 45;
        lives = 3;
        gameActive = true;

        scoreVal.innerText = '0000';
        timerVal.innerText = '45s';
        updateLivesDisplay();

        renderLevel();

        timerInterval = setInterval(() => {
            if (!gameActive) return;
            timer--;
            timerVal.innerText = `${timer}s`;

            if (timer <= 0) {
                endGame(true);
            }
        }, 1000);
    };

    startGame();
})();
