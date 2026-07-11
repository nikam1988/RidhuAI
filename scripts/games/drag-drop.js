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
                osc.frequency.setValueAtTime(500, ctx.currentTime);
                gain.gain.setValueAtTime(0.06, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } else if (type === 'match') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'wrong') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.25);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
                osc.start();
                osc.stop(ctx.currentTime + 0.25);
            } else if (type === 'victory') {
                // Victory chords
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

    // Inject CSS styling
    const styleId = 'game-drag-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .drag-game-container {
                display: flex;
                width: 100%;
                height: 100%;
                padding: 20px 40px;
                gap: 40px;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%); /* soft purple kids background */
                z-index: 10;
            }
            .drag-sources-col, .drop-targets-col {
                display: flex;
                flex-direction: column;
                gap: 15px;
                width: 44%;
            }
            .drag-card {
                background: white;
                border: 3px solid #C084FC;
                border-bottom: 6px solid #C084FC;
                border-radius: 15px;
                padding: 14px 20px;
                font-family: 'Fredoka One', cursive;
                font-size: 1.4rem;
                color: #581C87;
                cursor: grab;
                text-align: center;
                user-select: none;
                transition: transform 0.15s, border-color 0.15s;
            }
            .drag-card:hover {
                transform: scale(1.03);
                border-color: #A855F7;
            }
            .drag-card.selected {
                background: #F3E8FF;
                border-color: var(--color-primary);
                border-bottom-color: var(--color-primary-dark);
                box-shadow: 0 0 12px rgba(28,176,246,0.6);
            }
            .drag-card.dragging {
                opacity: 0.5;
            }
            .drag-card.matched {
                background: #DCFCE7 !important;
                border-color: var(--color-secondary) !important;
                border-bottom-width: 3px !important;
                color: var(--color-secondary-dark) !important;
                cursor: default;
                transform: none !important;
            }
            .drop-slot {
                background: rgba(255,255,255,0.7);
                border: 3px dashed #C084FC;
                border-radius: 15px;
                padding: 14px 20px;
                font-family: 'Fredoka One', cursive;
                font-size: 1.4rem;
                color: #581C87;
                text-align: center;
                min-height: 58px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.15s, border-style 0.15s;
                cursor: pointer;
            }
            .drop-slot.dragover {
                background: #F3E8FF;
                border-style: solid;
                border-color: var(--color-primary);
            }
            .drop-slot.slot-matched {
                border-style: solid;
                border-color: var(--color-secondary);
                background: #DCFCE7;
                cursor: default;
            }
            .level-banner {
                position: absolute;
                top: 15px;
                left: 50%;
                transform: translateX(-50%);
                background: #A855F7;
                color: white;
                padding: 6px 20px;
                border-radius: var(--radius-pill);
                font-family: 'Fredoka One', cursive;
                font-size: 1.1rem;
                box-shadow: 0 4px 0 #7E22CE;
                z-index: 20;
            }
        `;
        document.head.appendChild(style);
    }

    // Helper: Select dynamic list of equations
    const generateLevelEquations = () => {
        const equations = [];
        const answers = [];

        for (let i = 0; i < 4; i++) {
            let equationText = '';
            let val = 0;

            const op = Math.random() < 0.5 ? '+' : '-';

            if (op === '+') {
                const a = Math.floor(Math.random() * 8) + 1; // 1-8
                const b = Math.floor(Math.random() * 8) + 1; // 1-8
                val = a + b;
                equationText = `${a} + ${b}`;
            } else {
                const a = Math.floor(Math.random() * 10) + 6; // 6-15
                const b = Math.floor(Math.random() * 5) + 1;  // 1-5
                val = a - b;
                equationText = `${a} - ${b}`;
            }

            // Ensure no duplicate answers to prevent ambiguity
            if (answers.includes(val)) {
                i--; // retry
                continue;
            }

            equations.push({ id: `eq-${i}`, text: equationText, val: val });
            answers.push(val);
        }

        return { equations, answers };
    };

    // Main Renderer
    const renderLevel = () => {
        matchedCount = 0;
        selectedSource = null;

        const { equations, answers } = generateLevelEquations();

        // Shuffle arrays independently
        const shuffledEquations = [...equations].sort(() => Math.random() - 0.5);
        const shuffledAnswers = answers.map((val, idx) => ({ id: `ans-${idx}`, val })).sort(() => Math.random() - 0.5);

        screen.innerHTML = `
            <div class="level-banner">LEVEL ${level}</div>
            <div class="drag-game-container">
                <!-- Sources (Equations) -->
                <div class="drag-sources-col">
                    ${shuffledEquations.map(eq => `
                        <div class="drag-card" id="${eq.id}" data-val="${eq.val}" draggable="true">${eq.text}</div>
                    `).join('')}
                </div>

                <!-- Targets (Answers) -->
                <div class="drop-targets-col">
                    ${shuffledAnswers.map(ans => `
                        <div class="drop-slot" id="${ans.id}" data-val="${ans.val}">Answer: ${ans.val}</div>
                    `).join('')}
                </div>
            </div>
        `;

        setupHandlers();
    };

    // Handlers logic
    const setupHandlers = () => {
        const cards = document.querySelectorAll('.drag-card');
        const slots = document.querySelectorAll('.drop-slot');

        // Drag and Drop implementation
        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                if (!gameActive || card.classList.contains('matched')) return;
                card.classList.add('dragging');
                e.dataTransfer.setData('text/plain', card.id);
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });

            // Click-to-select logic (mobile/accessible fallback)
            card.addEventListener('click', () => {
                if (!gameActive || card.classList.contains('matched')) return;

                playSound('select');

                // Remove previous selected highlight
                document.querySelectorAll('.drag-card').forEach(c => c.classList.remove('selected'));

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
                    processMatchAttempt(card, slot);
                }
            });

            // Click-to-match logic
            slot.addEventListener('click', () => {
                if (!gameActive || slot.classList.contains('slot-matched') || !selectedSource) return;

                processMatchAttempt(selectedSource, slot);
            });
        });
    };

    // Validates if matched equation equals slot answer
    const processMatchAttempt = (card, slot) => {
        const cardVal = parseInt(card.getAttribute('data-val'));
        const slotVal = parseInt(slot.getAttribute('data-val'));

        if (cardVal === slotVal) {
            // MATCH SUCCESS!
            playSound('match');

            card.classList.remove('selected');
            card.classList.add('matched');
            card.draggable = false;
            card.style.cursor = 'default';

            slot.classList.add('slot-matched');
            slot.innerText = `${card.innerText} = ${slotVal} ✔`;

            selectedSource = null;
            matchedCount++;
            score += 10;
            scoreVal.innerText = score.toString().padStart(4, '0');

            // Confetti
            const rect = slot.getBoundingClientRect();
            const screenRect = screen.getBoundingClientRect();
            const x = (rect.left + rect.width / 2 - screenRect.left) / screen.clientWidth;
            const y = (rect.top + rect.height / 2 - screenRect.top) / screen.clientHeight;

            confetti({
                particleCount: 15,
                spread: 70,
                origin: { x, y: 1 - y },
                colors: ['#8B5CF6', '#58CC02', '#FFC800'],
                disableForced3d: true
            });

            // Level Cleared Check
            if (matchedCount === 4) {
                setTimeout(() => {
                    if (gameActive) {
                        endGame(true, true); // Level Complete!
                    }
                }, 800);
            }
        } else {
            // MATCH FAIL!
            playSound('wrong');
            
            // Wiggle card and slot
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
            
            // Fantastic double confetti cannon animations for victory!
            const duration = 3.5 * 1000;
            const end = Date.now() + duration;
            const interval = setInterval(() => {
                if (Date.now() > end) return clearInterval(interval);
                
                confetti({
                    particleCount: 30,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.85 }
                });
                confetti({
                    particleCount: 30,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.85 }
                });
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
            ? "👑 WOW! You are a superstar math wizard! Rexy is so proud of you! 🦖🎉" 
            : (isVictory ? "👍 Great Job! Almost perfect!" : "💪 Don't give up! Rexy wants to play again!");

        screen.innerHTML = `
            <div class="game-overlay game-over-panel" style="animation: bounce-scale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); padding: 15px 25px;">
                <div style="font-size: 3.5rem; margin-bottom: 2px; animation: float 2s ease-in-out infinite;">
                    ${isLevelComplete ? '🦖🏆🎉' : (isVictory ? '🦕🏅🎈' : '👾💔☠️')}
                </div>
                <h2 class="overlay-title" style="color: ${isVictory ? 'var(--color-secondary)' : 'var(--color-red)'}; font-size: 1.6rem; margin-bottom: 2px;">
                    ${isLevelComplete ? 'LEVEL CLEARED!' : 'GAME OVER! TIME EXPIRED'}
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

    // Start Game
    const startGame = () => {
        score = 0;
        timer = 45;
        lives = 3;
        level = 1;
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
