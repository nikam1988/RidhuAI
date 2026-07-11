(() => {
    // ----------------------------------------------------
    // 1. QUESTION BANK DATABASE (CBSE & NCERT for Grades 1, 2, 3)
    // ----------------------------------------------------
    const questionBank = {
        '1': {
            'cbse': {
                'math': {
                    name: 'Mathematics',
                    topics: {
                        'addition': {
                            name: 'Simple Addition',
                            questions: [
                                { type: 'mcq', question: 'What is 3 + 2?', options: ['4', '5', '6', '3'], answer: '5' },
                                { type: 'mcq', question: 'Add: 4 + 4 = ?', options: ['7', '8', '9', '10'], answer: '8' },
                                { type: 'mcq', question: 'What is 1 + 5?', options: ['5', '6', '7', '8'], answer: '6' },
                                { type: 'binary', question: '3 + 3 is equal to 6.', answer: 'true' },
                                { type: 'binary', question: '2 + 7 is equal to 8.', answer: 'false' },
                                { type: 'match', left: '2 + 1', right: '3' },
                                { type: 'match', left: '5 + 0', right: '5' }
                            ]
                        },
                        'subtraction': {
                            name: 'Simple Subtraction',
                            questions: [
                                { type: 'mcq', question: 'What is 5 - 2?', options: ['2', '3', '4', '1'], answer: '3' },
                                { type: 'mcq', question: 'What is 8 - 4?', options: ['3', '4', '5', '6'], answer: '4' },
                                { type: 'binary', question: '9 - 3 is equal to 6.', answer: 'true' },
                                { type: 'binary', question: '4 - 1 is equal to 2.', answer: 'false' },
                                { type: 'match', left: '7 - 2', right: '5' },
                                { type: 'match', left: '6 - 6', right: '0' }
                            ]
                        }
                    }
                },
                'english': {
                    name: 'English Alphabet',
                    topics: {
                        'vowels': {
                            name: 'Vowels & Consonants',
                            questions: [
                                { type: 'mcq', question: 'Which of the following is a vowel?', options: ['B', 'E', 'G', 'H'], answer: 'E' },
                                { type: 'mcq', question: 'How many vowels are there in the alphabet?', options: ['4', '5', '6', '7'], answer: '5' },
                                { type: 'binary', question: 'The letter "Y" is always a vowel.', answer: 'false' },
                                { type: 'binary', question: 'The letter "A" is a vowel.', answer: 'true' },
                                { type: 'match', left: 'Apple starts with', right: 'A' },
                                { type: 'match', left: 'Umbrella starts with', right: 'U' }
                            ]
                        }
                    }
                }
            },
            'ncert': {
                'math': {
                    name: 'Math Magic',
                    topics: {
                        'shapes': {
                            name: 'Shapes & Space',
                            questions: [
                                { type: 'mcq', question: 'Which shape looks like a football?', options: ['Square', 'Circle', 'Triangle', 'Star'], answer: 'Circle' },
                                { type: 'mcq', question: 'How many corners does a triangle have?', options: ['2', '3', '4', '0'], answer: '3' },
                                { type: 'binary', question: 'A blackboard has a circular shape.', answer: 'false' },
                                { type: 'binary', question: 'A square has 4 equal sides.', answer: 'true' },
                                { type: 'match', left: 'Ball shape', right: 'Round' },
                                { type: 'match', left: 'Box shape', right: 'Square' }
                            ]
                        }
                    }
                }
            }
        },
        '2': {
            'cbse': {
                'math': {
                    name: 'Mathematics',
                    topics: {
                        'geometry': {
                            name: 'Shapes & Geometry',
                            questions: [
                                { type: 'mcq', question: 'How many vertices does a cube have?', options: ['6', '8', '12', '4'], answer: '8' },
                                { type: 'mcq', question: 'A cylinder has how many flat faces?', options: ['1', '2', '3', '0'], answer: '2' },
                                { type: 'binary', question: 'A cone has 2 sharp vertices.', answer: 'false' },
                                { type: 'binary', question: 'A rectangle has opposite sides equal.', answer: 'true' },
                                { type: 'match', left: 'Dice shape', right: 'Cube' },
                                { type: 'match', left: 'Globe shape', right: 'Sphere' }
                            ]
                        }
                    }
                },
                'english': {
                    name: 'English Grammar',
                    topics: {
                        'opposites': {
                            name: 'Opposites (Antonyms)',
                            questions: [
                                { type: 'mcq', question: 'What is the opposite of "Fast"?', options: ['Quick', 'Slow', 'Heavy', 'Light'], answer: 'Slow' },
                                { type: 'mcq', question: 'What is the opposite of "Happy"?', options: ['Joyful', 'Sad', 'Angry', 'Proud'], answer: 'Sad' },
                                { type: 'binary', question: 'The opposite of "Dark" is "Light".', answer: 'true' },
                                { type: 'binary', question: 'The opposite of "Tall" is "Fat".', answer: 'false' },
                                { type: 'match', left: 'Hot', right: 'Cold' },
                                { type: 'match', left: 'Up', right: 'Down' },
                                { type: 'match', left: 'Big', right: 'Small' },
                                { type: 'match', left: 'Soft', right: 'Hard' }
                            ]
                        }
                    }
                }
            },
            'ncert': {
                'english': {
                    name: 'Marigold English',
                    topics: {
                        'nouns': {
                            name: 'Naming Words (Nouns)',
                            questions: [
                                { type: 'mcq', question: 'Which word is a person?', options: ['Teacher', 'School', 'Pen', 'Run'], answer: 'Teacher' },
                                { type: 'mcq', question: 'Identify the noun in: "The dog barked."', options: ['The', 'dog', 'barked', 'loudly'], answer: 'dog' },
                                { type: 'binary', question: '"Beautiful" is a naming word.', answer: 'false' },
                                { type: 'binary', question: '"Taj Mahal" is a proper noun.', answer: 'true' },
                                { type: 'match', left: 'Delhi', right: 'Place' },
                                { type: 'match', left: 'Tiger', right: 'Animal' }
                            ]
                        }
                    }
                }
            }
        },
        '3': {
            'cbse': {
                'math': {
                    name: 'Mathematics',
                    topics: {
                        'multiplication': {
                            name: 'Multiplication Tables',
                            questions: [
                                { type: 'mcq', question: 'What is 6 x 7?', options: ['42', '36', '48', '40'], answer: '42' },
                                { type: 'mcq', question: 'Solve: 9 x 8 = ?', options: ['72', '81', '64', '70'], answer: '72' },
                                { type: 'binary', question: '5 x 4 is equal to 20.', answer: 'true' },
                                { type: 'binary', question: '3 x 9 is equal to 28.', answer: 'false' },
                                { type: 'match', left: '4 x 3', right: '12' },
                                { type: 'match', left: '6 x 5', right: '30' }
                            ]
                        }
                    }
                },
                'science': {
                    name: 'Science / EVS',
                    topics: {
                        'living': {
                            name: 'Living & Non-Living Things',
                            questions: [
                                { type: 'mcq', question: 'Which of the following can breathe?', options: ['Chair', 'Fish', 'Stone', 'Paper'], answer: 'Fish' },
                                { type: 'mcq', question: 'What do living things need to grow?', options: ['Food & Water', 'Only Toys', 'Stones', 'Nothing'], answer: 'Food & Water' },
                                { type: 'binary', question: 'Plants are non-living because they cannot walk.', answer: 'false' },
                                { type: 'binary', question: 'Animals are living things.', answer: 'true' },
                                { type: 'match', left: 'Breathe', right: 'Living' },
                                { type: 'match', left: 'Toy car', right: 'Non-Living' }
                            ]
                        }
                    }
                }
            },
            'ncert': {
                'evs': {
                    name: 'Looking Around (EVS)',
                    topics: {
                        'plants': {
                            name: 'The Plant Fairy',
                            questions: [
                                { type: 'mcq', question: 'Which part of the plant grows below the ground?', options: ['Stem', 'Root', 'Leaf', 'Flower'], answer: 'Root' },
                                { type: 'mcq', question: 'What part of the plant prepares food?', options: ['Stem', 'Root', 'Leaf', 'Fruit'], answer: 'Leaf' },
                                { type: 'binary', question: 'Flowers are the colourful parts of a plant.', answer: 'true' },
                                { type: 'binary', question: 'Roots absorb sunlight for photosynthesis.', answer: 'false' },
                                { type: 'match', left: 'Rose plant', right: 'Shrub' },
                                { type: 'match', left: 'Pumpkin plant', right: 'Creeper' }
                            ]
                        }
                    }
                }
            }
        }
    };

    // ----------------------------------------------------
    // 2. STATE MANAGEMENT & DOM REFERENCES
    // ----------------------------------------------------
    let selectedClass = null;
    let selectedBoard = null;
    let selectedSubject = null;
    let selectedTopic = null;
    let selectedGame = null;

    let currentStep = 1;
    const totalSteps = 5;

    // Selection dashboard views
    const dashboard = document.getElementById('setup-dashboard');
    const btnNext = document.getElementById('btn-next-step');
    const btnBack = document.getElementById('btn-back-step');
    const subjectsContainer = document.getElementById('subjects-container');
    const topicsContainer = document.getElementById('topics-container');

    // Gameplay cabinet views
    const arcadeWorkspace = document.getElementById('arcade-workspace');
    const gameScreen = document.getElementById('arcade-game-screen');
    const gameBoardContainer = document.getElementById('game-board-container');
    const pregameOverlay = document.getElementById('pregame-overlay');
    const victoryOverlay = document.getElementById('victory-overlay');
    
    const gameScoreVal = document.getElementById('game-score');
    const gameProgressVal = document.getElementById('game-progress');
    const gameLivesVal = document.getElementById('game-lives');
    const controlsHelper = document.getElementById('game-controls-helper');

    // Gameplay active state variables
    let gameActiveQuestions = [];
    let gameScore = 0;
    let currentQuestionIdx = 0;
    let gameLives = 3;
    let gameAccuracyCount = 0;
    let startTime = null;

    // Web Audio Synthesizer
    const playSound = (type) => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (type === 'select') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(500, ctx.currentTime);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            } else if (type === 'success') {
                const playNote = (freq, start, duration) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
                    gain.gain.setValueAtTime(0.08, ctx.currentTime + start);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
                    osc.start(ctx.currentTime + start);
                    osc.stop(ctx.currentTime + start + duration);
                };
                playNote(523.25, 0, 0.12); // C5
                playNote(659.25, 0.08, 0.12); // E5
                playNote(783.99, 0.16, 0.3); // G5
            } else if (type === 'fail') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'victory') {
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
                playNote(523.25, 0, 0.1);
                playNote(659.25, 0.08, 0.1);
                playNote(783.99, 0.16, 0.1);
                playNote(1046.50, 0.24, 0.4);
            }
        } catch (e) {
            console.log('Audio error:', e);
        }
    };

    // ----------------------------------------------------
    // 3. STEP NAVIGATION LOGIC
    // ----------------------------------------------------
    const updateDashboard = () => {
        // Toggle Step Panels Visibility
        document.querySelectorAll('.step-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(`step-panel-${currentStep}`).classList.add('active');

        // Toggle dot states
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            const stepNum = idx + 1;
            dot.className = 'dot';
            if (stepNum === currentStep) dot.classList.add('active');
            else if (stepNum < currentStep) dot.classList.add('completed');
        });

        // Toggle back button visibility
        btnBack.style.display = currentStep > 1 ? 'block' : 'none';

        // Update button text on last step
        if (currentStep === totalSteps) {
            btnNext.innerHTML = 'Start Practice 🎮';
        } else {
            btnNext.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }

        // Validate current step choice to toggle Next button disabled state
        validateStepInput();
    };

    const validateStepInput = () => {
        let isValid = false;
        if (currentStep === 1 && selectedClass !== null) isValid = true;
        else if (currentStep === 2 && selectedBoard !== null) isValid = true;
        else if (currentStep === 3 && selectedSubject !== null) isValid = true;
        else if (currentStep === 4 && selectedTopic !== null) isValid = true;
        else if (currentStep === 5 && selectedGame !== null) isValid = true;

        btnNext.disabled = !isValid;
    };

    // Handle dashboard card clicks
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.selection-card');
        if (!card) return;

        const step = parseInt(card.dataset.step);
        const value = card.dataset.val;

        playSound('select');

        // Clear sibling selection styles
        card.parentNode.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        if (step === 1) {
            selectedClass = value;
            // Clear subsequent selections when switching root
            selectedBoard = null;
            selectedSubject = null;
            selectedTopic = null;
            document.querySelectorAll('[data-step="2"]').forEach(c => c.classList.remove('selected'));
        } else if (step === 2) {
            selectedBoard = value;
            selectedSubject = null;
            selectedTopic = null;
            buildSubjectsPanel();
        } else if (step === 3) {
            selectedSubject = value;
            selectedTopic = null;
            buildTopicsPanel();
        } else if (step === 4) {
            selectedTopic = value;
        } else if (step === 5) {
            selectedGame = value;
        }

        validateStepInput();
    });

    const buildSubjectsPanel = () => {
        subjectsContainer.innerHTML = '';
        const classData = questionBank[selectedClass]?.[selectedBoard] || {};
        
        for (const [key, data] of Object.entries(classData)) {
            subjectsContainer.innerHTML += `
                <div class="selection-card" data-step="3" data-val="${key}">
                    <span class="card-icon">${key === 'math' ? '🧮' : key === 'english' ? '📖' : key === 'science' ? '🧪' : '🍀'}</span>
                    <div class="card-title">${data.name}</div>
                </div>
            `;
        }
    };

    const buildTopicsPanel = () => {
        topicsContainer.innerHTML = '';
        const topics = questionBank[selectedClass]?.[selectedBoard]?.[selectedSubject]?.topics || {};

        for (const [key, data] of Object.entries(topics)) {
            topicsContainer.innerHTML += `
                <div class="selection-card" data-step="4" data-val="${key}">
                    <span class="card-icon">📌</span>
                    <div class="card-title">${data.name}</div>
                </div>
            `;
        }
    };

    btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateDashboard();
        } else {
            // Load gameplay cabinet arena
            dashboard.style.display = 'none';
            arcadeWorkspace.style.display = 'block';
            setupPracticeGame();
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateDashboard();
        }
    });

    // ----------------------------------------------------
    // 4. GAMEPLAY SETUPS & LAYOUTS
    // ----------------------------------------------------
    const setupPracticeGame = () => {
        // Fetch raw questions
        const topicData = questionBank[selectedClass]?.[selectedBoard]?.[selectedSubject]?.topics?.[selectedTopic] || {};
        const rawQuestions = topicData.questions || [];
        
        // Ensure at least 4-5 questions exist or generate fallbacks
        gameActiveQuestions = rawQuestions.length >= 4 ? rawQuestions : [...rawQuestions, ...generateFallbacks()];
        
        // Shuffler
        gameActiveQuestions = gameActiveQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);

        // UI Setup
        currentQuestionIdx = 0;
        gameScore = 0;
        gameLives = 3;
        gameAccuracyCount = 0;
        startTime = new Date();

        gameScoreVal.textContent = '0000';
        gameProgressVal.textContent = `0/${gameActiveQuestions.length}`;
        gameLivesVal.textContent = '❤️❤️❤️';
        victoryOverlay.classList.remove('active');

        // Pregame instructions
        const marqueeTitle = document.getElementById('marquee-game-title');
        const overlayIcon = document.getElementById('pregame-icon');
        const overlayTitle = document.getElementById('pregame-title');
        const overlayDesc = document.getElementById('pregame-desc');

        marqueeTitle.textContent = `${selectedGame.toUpperCase()} PRACTICER`;
        
        if (selectedGame === 'bubble') {
            overlayIcon.textContent = '🫧🫧';
            overlayTitle.textContent = 'Bubble Pop Mode';
            overlayDesc.textContent = 'A question is displayed. Pop the bubble that contains the correct answer!';
            controlsHelper.innerHTML = '<i class="fas fa-mouse-pointer"></i> Use your mouse click/touch to pop correct bubbles.';
        } else if (selectedGame === 'drag-drop') {
            overlayIcon.textContent = '🧩🎯';
            overlayTitle.textContent = 'Drag & Drop Mode';
            overlayDesc.textContent = 'Drag matching values from the left and drop them in the empty slots on the right.';
            controlsHelper.innerHTML = '<i class="fas fa-arrows-alt"></i> Drag and drop the cards into matching targets.';
        } else if (selectedGame === 'matching') {
            overlayIcon.textContent = '🔗🤝';
            overlayTitle.textContent = 'Match Columns Mode';
            overlayDesc.textContent = 'Click on a card from the left column, then select its match from the right column.';
            controlsHelper.innerHTML = '<i class="fas fa-hand-pointer"></i> Click one item in each column to pair them up.';
        } else if (selectedGame === 'true-false') {
            overlayIcon.textContent = '✅❌';
            overlayTitle.textContent = 'True or False Mode';
            overlayDesc.textContent = 'Decide if the statement is TRUE or FALSE by clicking the correct button.';
            controlsHelper.innerHTML = '<i class="fas fa-check-circle"></i> Click the Green (True) or Red (False) button.';
        }

        pregameOverlay.style.display = 'flex';
        gameBoardContainer.style.display = 'none';
        gameBoardContainer.innerHTML = '';
    };

    const generateFallbacks = () => {
        // Fallback simple addition/subtraction questions if topic is empty
        return [
            { type: 'mcq', question: 'Solve: 5 + 5 = ?', options: ['9', '10', '11', '12'], answer: '10' },
            { type: 'mcq', question: 'Solve: 10 - 2 = ?', options: ['7', '8', '9', '6'], answer: '8' },
            { type: 'binary', question: '7 + 3 is equal to 10.', answer: 'true' },
            { type: 'binary', question: '6 - 2 is equal to 3.', answer: 'false' },
            { type: 'match', left: '8 + 1', right: '9' },
            { type: 'match', left: '9 - 1', right: '8' }
        ];
    };

    document.getElementById('btn-start-gameplay').addEventListener('click', () => {
        pregameOverlay.style.display = 'none';
        gameBoardContainer.style.display = 'block';
        loadNextGameplayQuestion();
    });

    const loadNextGameplayQuestion = () => {
        gameProgressVal.textContent = `${currentQuestionIdx + 1}/${gameActiveQuestions.length}`;
        gameBoardContainer.innerHTML = '';

        if (currentQuestionIdx >= gameActiveQuestions.length) {
            triggerVictory();
            return;
        }

        const q = gameActiveQuestions[currentQuestionIdx];

        if (selectedGame === 'bubble') {
            renderBubbleGame(q);
        } else if (selectedGame === 'drag-drop') {
            renderDragDropGame(q);
        } else if (selectedGame === 'matching') {
            renderMatchingGame(q);
        } else if (selectedGame === 'true-false') {
            renderTrueFalseGame(q);
        }
    };

    // ----------------------------------------------------
    // GAME 1: BUBBLE POP LOGIC
    // ----------------------------------------------------
    const renderBubbleGame = (q) => {
        // Adapt question data if not MCQ
        const questionText = q.question || `${q.left} = ?`;
        const correctAnswer = q.answer || q.right;
        
        let bubbleOptions = [];
        if (q.options) {
            bubbleOptions = [...q.options];
        } else {
            // Generate dynamic fake choices
            const numericAns = parseInt(correctAnswer);
            if (!isNaN(numericAns)) {
                bubbleOptions = [correctAnswer, String(numericAns + 2), String(numericAns - 1), String(numericAns + 5)];
            } else {
                bubbleOptions = [correctAnswer, 'True', 'False', 'None'];
            }
        }
        bubbleOptions = bubbleOptions.sort(() => 0.5 - Math.random());

        // Injected CSS styled board
        gameBoardContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; height:100%;">
                <h3 style="font-size: 1.6rem; color: #FFF; margin-bottom: 25px;">${questionText}</h3>
                <div id="bubble-container" style="position:relative; width:100%; height:320px; overflow:hidden;"></div>
            </div>
        `;

        const container = document.getElementById('bubble-container');
        const bubbleSpeed = 1.2;
        let animationFrame = null;
        let bubbles = [];

        bubbleOptions.forEach((opt, idx) => {
            const bubble = document.createElement('div');
            bubble.textContent = opt;
            bubble.style.cssText = `
                position: absolute;
                bottom: -80px;
                left: ${15 + idx * 22}%;
                width: 75px;
                height: 75px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, rgba(28, 176, 246, 0.4), rgba(28, 176, 246, 0.7));
                border: 3px solid #FFF;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Fredoka One', cursive;
                font-size: 1.25rem;
                color: white;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(255,255,255,0.2);
                transition: transform 0.1s;
                user-select: none;
                z-index: 10;
            `;

            bubble.addEventListener('click', () => {
                cancelAnimationFrame(animationFrame);
                handleBubblePop(opt, correctAnswer, bubble);
            });

            container.appendChild(bubble);
            bubbles.push({
                el: bubble,
                y: -80,
                x: 15 + idx * 22,
                wobble: Math.random() * 100
            });
        });

        // Floating loop animation
        const animateBubbles = () => {
            if (!gameActive) return;
            let resetNeeded = false;

            bubbles.forEach(b => {
                b.y += bubbleSpeed;
                b.wobble += 0.05;
                const offset = Math.sin(b.wobble) * 1.5;
                
                b.el.style.bottom = `${b.y}px`;
                b.el.style.transform = `translateX(${offset}px)`;

                // Loop bubbles back down if they reach the top
                if (b.y > 330) {
                    b.y = -80;
                }
            });
            animationFrame = requestAnimationFrame(animateBubbles);
        };

        let gameActive = true;
        animateBubbles();

        const handleBubblePop = (selected, correct, bubbleEl) => {
            gameActive = false;
            bubbleEl.style.transform = 'scale(1.4)';
            
            // Trigger pop animations and color changes
            if (selected === correct) {
                bubbleEl.style.background = 'radial-gradient(circle at 30% 30%, rgba(88, 204, 2, 0.6), rgba(88, 204, 2, 0.9))';
                playSound('success');
                gameScore += 100;
                gameAccuracyCount++;
                gameScoreVal.textContent = String(gameScore).padStart(4, '0');
            } else {
                bubbleEl.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 75, 75, 0.6), rgba(255, 75, 75, 0.9))';
                playSound('fail');
                loseLife();
            }

            setTimeout(() => {
                currentQuestionIdx++;
                loadNextGameplayQuestion();
            }, 1000);
        };
    };

    // ----------------------------------------------------
    // GAME 2: DRAG & DROP LOGIC
    // ----------------------------------------------------
    const renderDragDropGame = (q) => {
        const questionText = q.question || `Pair of: ${q.left}`;
        const correctAnswer = q.answer || q.right;

        // Dynamic decoy pool
        let items = [correctAnswer];
        const numericAns = parseInt(correctAnswer);
        if (!isNaN(numericAns)) {
            items = [correctAnswer, String(numericAns + 3), String(numericAns - 2)];
        } else {
            items = [correctAnswer, 'Incorrect', 'Decoy'];
        }
        items = items.sort(() => 0.5 - Math.random());

        gameBoardContainer.innerHTML = `
            <div style="padding: 30px; text-align: center; height:100%; display: flex; flex-direction: column; justify-content: space-around;">
                <h3 style="font-size: 1.8rem; color: #FFF;">${questionText}</h3>
                
                <div style="display: flex; gap: 40px; justify-content: center; align-items: center; margin: 30px 0;">
                    <!-- Draggables on left -->
                    <div id="drag-items" style="display: flex; flex-direction: column; gap: 15px; width: 45%;">
                        ${items.map(item => `
                            <div class="drag-card" draggable="true" data-val="${item}" style="
                                background: white;
                                border: 3px solid var(--color-primary);
                                border-radius: 12px;
                                padding: 12px;
                                font-family: 'Fredoka One', cursive;
                                font-size: 1.3rem;
                                color: var(--color-text-main);
                                cursor: grab;
                                text-align: center;
                                user-select: none;
                            ">${item}</div>
                        `).join('')}
                    </div>

                    <!-- Drop Zone on right -->
                    <div id="drop-target" data-answer="${correctAnswer}" style="
                        width: 45%;
                        height: 120px;
                        border: 4px dashed #94A3B8;
                        border-radius: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Fredoka One', cursive;
                        font-size: 1.4rem;
                        color: #94A3B8;
                        background: rgba(255,255,255,0.05);
                        transition: var(--transition);
                    ">
                        DROP ANSWER HERE
                    </div>
                </div>
            </div>
        `;

        const dropTarget = document.getElementById('drop-target');
        const draggables = document.querySelectorAll('.drag-card');

        // Click-to-select fallback to ensure best UX
        let selectedDragCard = null;

        draggables.forEach(card => {
            // Drag listeners
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', card.dataset.val);
                card.style.opacity = '0.5';
            });
            card.addEventListener('dragend', () => {
                card.style.opacity = '1';
            });

            // Click matching logic fallback
            card.addEventListener('click', () => {
                playSound('select');
                draggables.forEach(c => c.style.borderColor = 'var(--color-primary)');
                card.style.borderColor = 'var(--color-yellow)';
                selectedDragCard = card;
            });
        });

        // Drop listeners
        dropTarget.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropTarget.style.background = 'rgba(28, 176, 246, 0.1)';
            dropTarget.style.borderColor = 'var(--color-primary)';
        });

        dropTarget.addEventListener('dragleave', () => {
            dropTarget.style.background = 'rgba(255,255,255,0.05)';
            dropTarget.style.borderColor = '#94A3B8';
        });

        dropTarget.addEventListener('drop', (e) => {
            e.preventDefault();
            const val = e.dataTransfer.getData('text/plain');
            const targetAnswer = dropTarget.dataset.answer;
            handleDropResolve(val, targetAnswer);
        });

        // Fallback target click matching
        dropTarget.addEventListener('click', () => {
            if (!selectedDragCard) return;
            const val = selectedDragCard.dataset.val;
            const targetAnswer = dropTarget.dataset.answer;
            handleDropResolve(val, targetAnswer);
        });

        const handleDropResolve = (val, targetAnswer) => {
            if (val === targetAnswer) {
                dropTarget.style.background = 'rgba(88, 204, 2, 0.15)';
                dropTarget.style.borderColor = 'var(--color-secondary)';
                dropTarget.style.color = 'var(--color-secondary)';
                dropTarget.innerHTML = `<i class="fas fa-check-circle"></i> ${val}`;
                playSound('success');
                gameScore += 100;
                gameAccuracyCount++;
                gameScoreVal.textContent = String(gameScore).padStart(4, '0');
            } else {
                dropTarget.style.background = 'rgba(255, 75, 75, 0.15)';
                dropTarget.style.borderColor = 'var(--color-red)';
                dropTarget.style.color = 'var(--color-red)';
                dropTarget.innerHTML = `<i class="fas fa-times-circle"></i> ${val}`;
                playSound('fail');
                loseLife();
            }

            setTimeout(() => {
                currentQuestionIdx++;
                loadNextGameplayQuestion();
            }, 1200);
        };
    };

    // ----------------------------------------------------
    // GAME 3: MATCH THE FOLLOWING COLUMNS
    // ----------------------------------------------------
    const renderMatchingGame = (q) => {
        // Display side-by-side matches
        // To construct a mini matching deck of 3 pairs, fetch siblings
        const currentIdx = currentQuestionIdx;
        const deckRaw = gameActiveQuestions.slice(Math.max(0, currentIdx - 2), Math.min(gameActiveQuestions.length, currentIdx + 2));
        
        let pairs = [];
        deckRaw.forEach(item => {
            if (item.left && item.right) {
                pairs.push({ l: item.left, r: item.right });
            } else {
                pairs.push({ l: item.question, r: item.answer });
            }
        });

        // Unique safety check
        if (pairs.length < 2) {
            pairs = [
                { l: 'Happy', r: 'Sad' },
                { l: 'Fast', r: 'Slow' },
                { l: 'Hot', r: 'Cold' }
            ];
        }

        const leftSide = pairs.map(p => p.l).sort(() => 0.5 - Math.random());
        const rightSide = pairs.map(p => p.r).sort(() => 0.5 - Math.random());

        gameBoardContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; height:100%;">
                <h3 style="font-size: 1.5rem; color: #FFF; margin-bottom: 20px;">Connect the correct matching pairs!</h3>
                <div style="display: flex; justify-content: space-between; gap: 30px; padding: 10px 20px;">
                    
                    <!-- Left Column -->
                    <div id="col-left" style="display: flex; flex-direction: column; gap: 15px; width: 45%;">
                        ${leftSide.map(l => `
                            <div class="match-left-card" data-val="${l}" style="
                                background: white;
                                border: 3px solid #475569;
                                border-bottom: 6px solid #475569;
                                border-radius: 12px;
                                padding: 14px;
                                font-family: 'Fredoka One', cursive;
                                font-size: 1.2rem;
                                color: var(--color-text-main);
                                cursor: pointer;
                                text-align: center;
                                user-select: none;
                                transition: var(--transition);
                            ">${l}</div>
                        `).join('')}
                    </div>

                    <!-- Right Column -->
                    <div id="col-right" style="display: flex; flex-direction: column; gap: 15px; width: 45%;">
                        ${rightSide.map(r => `
                            <div class="match-right-card" data-val="${r}" style="
                                background: white;
                                border: 3px solid #475569;
                                border-bottom: 6px solid #475569;
                                border-radius: 12px;
                                padding: 14px;
                                font-family: 'Fredoka One', cursive;
                                font-size: 1.2rem;
                                color: var(--color-text-main);
                                cursor: pointer;
                                text-align: center;
                                user-select: none;
                                transition: var(--transition);
                            ">${r}</div>
                        `).join('')}
                    </div>

                </div>
            </div>
        `;

        let selectedLeft = null;
        let selectedRight = null;

        const leftCards = document.querySelectorAll('.match-left-card');
        const rightCards = document.querySelectorAll('.match-right-card');

        leftCards.forEach(c => {
            c.addEventListener('click', () => {
                playSound('select');
                leftCards.forEach(card => {
                    if (!card.classList.contains('matched')) {
                        card.style.borderColor = '#475569';
                        card.style.background = 'white';
                    }
                });
                c.style.borderColor = 'var(--color-primary)';
                c.style.background = '#E0F2FE';
                selectedLeft = c;
                checkMatchDeck();
            });
        });

        rightCards.forEach(c => {
            c.addEventListener('click', () => {
                playSound('select');
                rightCards.forEach(card => {
                    if (!card.classList.contains('matched')) {
                        card.style.borderColor = '#475569';
                        card.style.background = 'white';
                    }
                });
                c.style.borderColor = 'var(--color-primary)';
                c.style.background = '#E0F2FE';
                selectedRight = c;
                checkMatchDeck();
            });
        });

        const checkMatchDeck = () => {
            if (!selectedLeft || !selectedRight) return;

            const lVal = selectedLeft.dataset.val;
            const rVal = selectedRight.dataset.val;

            // Check if matches the pairs mapping list
            const correctPair = pairs.find(p => p.l === lVal && p.r === rVal);

            if (correctPair) {
                // Correct Match
                playSound('success');
                selectedLeft.classList.add('matched');
                selectedRight.classList.add('matched');

                selectedLeft.style.borderColor = 'var(--color-secondary)';
                selectedLeft.style.background = '#DCFCE7';
                selectedRight.style.borderColor = 'var(--color-secondary)';
                selectedRight.style.background = '#DCFCE7';

                gameScore += 50;
                gameScoreVal.textContent = String(gameScore).padStart(4, '0');

                selectedLeft = null;
                selectedRight = null;

                // Check if all on screen matched
                const activeMatches = document.querySelectorAll('.match-left-card:not(.matched)');
                if (activeMatches.length === 0) {
                    gameAccuracyCount++;
                    setTimeout(() => {
                        currentQuestionIdx++;
                        loadNextGameplayQuestion();
                    }, 1000);
                }
            } else {
                // Failed Match
                playSound('fail');
                selectedLeft.style.borderColor = 'var(--color-red)';
                selectedLeft.style.background = '#FEE2E2';
                selectedRight.style.borderColor = 'var(--color-red)';
                selectedRight.style.background = '#FEE2E2';
                
                loseLife();

                selectedLeft = null;
                selectedRight = null;
            }
        };
    };

    // ----------------------------------------------------
    // GAME 4: TRUE OR FALSE SELECTIONS
    // ----------------------------------------------------
    const renderTrueFalseGame = (q) => {
        let questionText = q.question;
        let isCorrectTrue = true;

        if (q.type === 'binary') {
            isCorrectTrue = (q.answer === 'true');
        } else {
            // Convert standard MCQ or match dynamically to True/False statements
            const correctVal = q.answer || q.right;
            const flipStatement = Math.random() < 0.5;
            
            if (flipStatement) {
                questionText = `The answer to ${q.question || q.left} is ${correctVal}.`;
                isCorrectTrue = true;
            } else {
                // Pick decoy value
                const decoy = q.options ? q.options.find(o => o !== correctVal) : 'Incorrect';
                questionText = `The answer to ${q.question || q.left} is ${decoy}.`;
                isCorrectTrue = false;
            }
        }

        gameBoardContainer.innerHTML = `
            <div style="padding: 40px 30px; text-align: center; height:100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="background: rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; border: 2px dashed rgba(255,255,255,0.15);">
                    <h3 style="font-size: 1.8rem; color: #FFF; line-height: 1.5; font-family: 'Nunito', sans-serif;">"${questionText}"</h3>
                </div>
                
                <div style="display: flex; gap: 30px; justify-content: center; width: 100%; margin-bottom: 20px;">
                    <button id="btn-click-true" class="arcade-btn btn-green" style="font-size: 1.5rem; padding: 20px 50px; width: 45%;">
                        <i class="fas fa-check-circle"></i> TRUE
                    </button>
                    <button id="btn-click-false" class="arcade-btn btn-red" style="font-size: 1.5rem; padding: 20px 50px; width: 45%;">
                        <i class="fas fa-times-circle"></i> FALSE
                    </button>
                </div>
            </div>
        `;

        document.getElementById('btn-click-true').addEventListener('click', () => handleBinarySelection(true, isCorrectTrue));
        document.getElementById('btn-click-false').addEventListener('click', () => handleBinarySelection(false, isCorrectTrue));

        const handleBinarySelection = (chosen, correct) => {
            const btnTrue = document.getElementById('btn-click-true');
            const btnFalse = document.getElementById('btn-click-false');

            if (chosen === correct) {
                playSound('success');
                gameScore += 100;
                gameAccuracyCount++;
                gameScoreVal.textContent = String(gameScore).padStart(4, '0');
                if (chosen) btnTrue.style.boxShadow = '0 0 20px rgba(88, 204, 2, 0.8)';
                else btnFalse.style.boxShadow = '0 0 20px rgba(88, 204, 2, 0.8)';
            } else {
                playSound('fail');
                loseLife();
                if (chosen) btnTrue.style.boxShadow = '0 0 20px rgba(255, 75, 75, 0.8)';
                else btnFalse.style.boxShadow = '0 0 20px rgba(255, 75, 75, 0.8)';
            }

            setTimeout(() => {
                currentQuestionIdx++;
                loadNextGameplayQuestion();
            }, 1000);
        };
    };

    // ----------------------------------------------------
    // 5. HELPER ACTIONS & SCORING
    // ----------------------------------------------------
    const loseLife = () => {
        gameLives--;
        if (gameLives === 2) {
            gameLivesVal.textContent = '❤️❤️';
        } else if (gameLives === 1) {
            gameLivesVal.textContent = '❤️';
        } else {
            gameLivesVal.textContent = '💀';
            triggerVictory(true); // Game over / Out of lives
        }
    };

    const triggerVictory = (gameOver = false) => {
        gameBoardContainer.style.display = 'none';
        victoryOverlay.classList.add('active');

        const starsContainer = document.getElementById('victory-stars');
        const details = document.getElementById('victory-details');
        const vTitle = victoryOverlay.querySelector('.overlay-title');
        
        let starsEarned = 0;
        let accuracy = Math.round((gameAccuracyCount / gameActiveQuestions.length) * 100);
        if (isNaN(accuracy)) accuracy = 0;

        if (gameOver) {
            vTitle.textContent = 'GAME OVER!';
            vTitle.style.color = 'var(--color-red)';
            starsEarned = 0;
            details.innerHTML = `You ran out of lives! You scored <strong>${gameScore} points</strong>. Try again to get a perfect score!`;
        } else {
            vTitle.textContent = 'LEVEL COMPLETED!';
            vTitle.style.color = 'var(--color-yellow)';
            
            // Calculate Stars
            if (accuracy >= 90) starsEarned = 3;
            else if (accuracy >= 60) starsEarned = 2;
            else if (accuracy > 0) starsEarned = 1;

            playSound('victory');
            
            // Trigger Confetti Party!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            details.innerHTML = `You scored <strong>${gameScore} points</strong> with <strong>${accuracy}% accuracy</strong>!`;
        }

        // Render Stars
        let starsHTML = '';
        for (let i = 1; i <= 3; i++) {
            if (i <= starsEarned) {
                starsHTML += `<i class="fas fa-star gold"></i>`;
            } else {
                starsHTML += `<i class="fas fa-star"></i>`;
            }
        }
        starsContainer.innerHTML = starsHTML;
    };

    // Quit Gameplay Action
    document.getElementById('btn-quit-game').addEventListener('click', () => {
        if (confirm('Are you sure you want to quit this practice session?')) {
            arcadeWorkspace.style.display = 'none';
            dashboard.style.display = 'block';
            currentStep = 1;
            
            // Reset selection values
            selectedClass = null;
            selectedBoard = null;
            selectedSubject = null;
            selectedTopic = null;
            selectedGame = null;

            // Reset cards styling
            document.querySelectorAll('.selection-card').forEach(card => card.classList.remove('selected'));
            updateDashboard();
        }
    });

    // Replay game Action
    document.getElementById('btn-restart-game').addEventListener('click', () => {
        setupPracticeGame();
        pregameOverlay.style.display = 'none';
        gameBoardContainer.style.display = 'block';
        loadNextGameplayQuestion();
    });

    // Go back to selections Action
    document.getElementById('btn-lobby-game').addEventListener('click', () => {
        arcadeWorkspace.style.display = 'none';
        dashboard.style.display = 'block';
        currentStep = 1;

        selectedClass = null;
        selectedBoard = null;
        selectedSubject = null;
        selectedTopic = null;
        selectedGame = null;

        document.querySelectorAll('.selection-card').forEach(card => card.classList.remove('selected'));
        updateDashboard();
    });

    // Initial run
    updateDashboard();

})();
