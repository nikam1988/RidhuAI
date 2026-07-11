document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('solver-container');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--color-red);">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h2>Error: No Worksheet ID provided.</h2>
                <a href="worksheets.html" class="btn btn-primary" style="margin-top: 20px;">Browse Worksheets</a>
            </div>
        `;
        return;
    }

    let worksheet = null;

    // Kids Sound Effects using Web Audio API
    const playSound = (type) => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (type === 'select') {
                // Short cute pling sound
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            } else if (type === 'success') {
                // Happy victory chords (fanfare)
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
                playNote(523.25, 0, 0.15);     // C5
                playNote(659.25, 0.1, 0.15);    // E5
                playNote(783.99, 0.2, 0.15);    // G5
                playNote(1046.50, 0.3, 0.4);   // C6
            } else if (type === 'fail') {
                // Sad bouncy slide down
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(250, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.35);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            }
        } catch (e) {
            console.log('Audio Context error:', e);
        }
    };

    try {
        worksheet = await window.api.getWorksheetById(id);
        
        // Check if there are questions
        if (!worksheet.questions || worksheet.questions.length === 0) {
            container.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-sad-tear text-yellow" style="font-size: 4rem; margin-bottom: 20px;"></i>
                    <h2>This worksheet doesn't support online solving yet!</h2>
                    <p style="color: var(--color-text-muted); margin: 15px 0 30px;">But you can still purchase and download the PDF worksheet.</p>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <a href="worksheet-detail.html?id=${worksheet.id}" class="btn btn-primary">Go to Details</a>
                        <a href="worksheets.html" class="btn btn-secondary">Browse Others</a>
                    </div>
                </div>
            `;
            return;
        }

        renderSolver(worksheet);
    } catch (error) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--color-red);">
                <i class="fas fa-times-circle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h2>Failed to load worksheet: ${error.message}</h2>
                <a href="worksheets.html" class="btn btn-primary" style="margin-top: 20px;">Try Again</a>
            </div>
        `;
    }

    function renderSolver(ws) {
        let questionsHTML = '';

        ws.questions.forEach((q, idx) => {
            let inputHTML = '';

            if (q.type === 'mcq') {
                inputHTML = `<div class="options-list">`;
                q.options.forEach((opt, optIdx) => {
                    inputHTML += `
                        <div class="option-item" data-q-id="${q.id}">
                            <input type="radio" id="q-${q.id}-opt-${optIdx}" name="q-${q.id}" value="${opt}">
                            <label for="q-${q.id}-opt-${optIdx}" class="option-label">${opt}</label>
                        </div>
                    `;
                });
                inputHTML += `</div>`;
            } else if (q.type === 'text') {
                inputHTML = `
                    <div class="text-input-container">
                        <input type="text" class="text-answer-input" placeholder="Type your answer here..." data-q-id="${q.id}" name="q-${q.id}">
                    </div>
                `;
            }

            questionsHTML += `
                <div class="question-box" id="q-box-${q.id}">
                    <div class="question-number">Question ${idx + 1}</div>
                    <div class="question-text">${q.question}</div>
                    ${inputHTML}
                    <div class="feedback-message" id="feedback-${q.id}" style="display: none;"></div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="solver-header">
                <h1 class="solver-title">${ws.title}</h1>
                <div class="solver-meta">
                    <span>Subject: <strong style="text-transform: capitalize;">${ws.subject}</strong></span>
                    <span>Grade: <strong>Grade ${ws.classLevel}</strong></span>
                    <span>Difficulty: <strong>${ws.difficulty}</strong></span>
                </div>
            </div>

            <!-- Fun Mascot Section -->
            <div class="mascot-container" id="mascot-container">
                <div class="mascot-bubble" id="mascot-speech">Hey there! 🦖 I am Rexy! Let's solve these fun math puzzles together! Can you get a 5/5 score?</div>
                <div class="mascot-character" id="mascot-face">🦖</div>
            </div>

            <!-- Colorful Progress Bar -->
            <div class="progress-container">
                <div class="progress-bar" id="solver-progress" style="width: 0%;"></div>
            </div>
            
            <div id="questions-form">
                ${questionsHTML}
                
                <div style="text-align: center; margin-top: 40px; display: flex; gap: 20px; justify-content: center;">
                    <button id="submit-answers-btn" class="btn btn-secondary" style="font-size: 1.3rem; padding: 18px 40px;">
                        Check My Answers! <i class="fas fa-check-circle" style="margin-left: 10px;"></i>
                    </button>
                    <a href="worksheet-detail.html?id=${ws.id}" class="btn btn-primary" style="font-size: 1.3rem; padding: 18px 40px; display: flex; align-items: center;">
                        <i class="fas fa-arrow-left" style="margin-right: 10px;"></i> Back to Details
                    </a>
                </div>
            </div>

            <!-- Results Section -->
            <div id="results-panel" class="results-panel" style="display: none;">
                <div id="trophy-icon" style="font-size: 5.5rem; margin-bottom: 10px;">🏆</div>
                <h2 class="score-feedback-text" id="score-feedback-text">Splendid Job!</h2>
                <div class="score-circle">
                    <span class="score-value" id="score-value">0/5</span>
                    <span class="score-label">Correct</span>
                </div>
                <p style="font-size: 1.3rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 30px;" id="score-percentage-text">You scored 100%!</p>
                <div style="display: flex; gap: 20px; justify-content: center;">
                    <button id="retry-btn" class="btn btn-yellow" style="font-size: 1.25rem; padding: 18px 36px; box-shadow: 0 4px 0 #D4A600;">
                        Try Again <i class="fas fa-redo" style="margin-left: 8px;"></i>
                    </button>
                    <a href="worksheets.html" class="btn btn-primary" style="font-size: 1.25rem; padding: 18px 36px; display: flex; align-items: center;">
                        More Worksheets <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                    </a>
                </div>
            </div>
        `;

        setupFormHandlers(ws);
    }

    function setupFormHandlers(ws) {
        const submitBtn = document.getElementById('submit-answers-btn');
        const resultsPanel = document.getElementById('results-panel');
        const questionsForm = document.getElementById('questions-form');
        const scoreValue = document.getElementById('score-value');
        const scorePercentageText = document.getElementById('score-percentage-text');
        const scoreFeedbackText = document.getElementById('score-feedback-text');
        const trophyIcon = document.getElementById('trophy-icon');
        const retryBtn = document.getElementById('retry-btn');
        
        const progressBar = document.getElementById('solver-progress');
        const mascotSpeech = document.getElementById('mascot-speech');
        const mascotFace = document.getElementById('mascot-face');
        const mascotContainer = document.getElementById('mascot-container');

        const totalQuestions = ws.questions.length;

        // Function to update progress and speech
        const updateQuizProgress = () => {
            let answeredCount = 0;
            ws.questions.forEach(q => {
                if (q.type === 'mcq') {
                    if (document.querySelector(`input[name="q-${q.id}"]:checked`)) {
                        answeredCount++;
                    }
                } else if (q.type === 'text') {
                    const txt = document.querySelector(`input[name="q-${q.id}"]`);
                    if (txt && txt.value.trim() !== '') {
                        answeredCount++;
                    }
                }
            });

            // Update Progress Bar
            const percent = Math.min((answeredCount / totalQuestions) * 100, 100);
            progressBar.style.width = `${percent}%`;

            // Change Mascot messages based on questions answered
            if (answeredCount === 0) {
                mascotSpeech.innerText = "Hey there! 🦖 I am Rexy! Let's solve these fun math puzzles together! Can you get a 5/5 score?";
                mascotFace.innerText = "🦖";
            } else if (answeredCount === 1) {
                mascotSpeech.innerText = "Great start! 🌟 First answer locked in! You are doing awesome!";
                mascotFace.innerText = "🦕";
            } else if (answeredCount === 3) {
                mascotSpeech.innerText = "Awesome! More than halfway through! You are a little math genius! 🚀";
                mascotFace.innerText = "🦁";
            } else if (answeredCount === totalQuestions) {
                mascotSpeech.innerText = "Aww yeah! All questions answered! 🤩 Click 'Check My Answers!' to see your score!";
                mascotFace.innerText = "🤩";
            }
        };

        // Add event listeners to input elements for sound and progress
        ws.questions.forEach(q => {
            if (q.type === 'mcq') {
                const radios = document.querySelectorAll(`input[name="q-${q.id}"]`);
                radios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        playSound('select');
                        updateQuizProgress();
                    });
                });
            } else if (q.type === 'text') {
                const textInput = document.querySelector(`input[name="q-${q.id}"]`);
                textInput.addEventListener('input', () => {
                    // Update progress on input
                    updateQuizProgress();
                });
                textInput.addEventListener('focus', () => {
                    playSound('select');
                });
            }
        });

        // Trigger wiggles on Mascot click just for fun
        mascotFace.addEventListener('click', () => {
            playSound('select');
            mascotFace.style.transform = 'scale(1.4) rotate(15deg)';
            setTimeout(() => mascotFace.style.transform = '', 300);
            
            const quotes = [
                "Math is like magic! ✨",
                "Roar! Let's conquer these numbers! 🦖",
                "You're doing fantastic, kiddo! 🎈",
                "Rexy believes in you! 💖",
                "Keep scanning those answers! 🧐"
            ];
            mascotSpeech.innerText = quotes[Math.floor(Math.random() * quotes.length)];
        });

        submitBtn.addEventListener('click', () => {
            let score = 0;

            ws.questions.forEach((q) => {
                const questionBox = document.getElementById(`q-box-${q.id}`);
                const feedbackBox = document.getElementById(`feedback-${q.id}`);
                let userAnswer = '';
                let isCorrect = false;

                if (q.type === 'mcq') {
                    const checkedRadio = document.querySelector(`input[name="q-${q.id}"]:checked`);
                    userAnswer = checkedRadio ? checkedRadio.value : '';

                    // Stylize choices
                    const options = document.querySelectorAll(`.option-item[data-q-id="${q.id}"]`);
                    options.forEach(optItem => {
                        const val = optItem.querySelector('input').value;
                        if (val === q.answer) {
                            optItem.classList.add('correct-answer');
                        } else if (val === userAnswer) {
                            optItem.classList.add('incorrect-answer');
                        }
                    });
                } else if (q.type === 'text') {
                    const inputElement = document.querySelector(`input[name="q-${q.id}"]`);
                    userAnswer = inputElement ? inputElement.value.trim() : '';
                    if (inputElement) {
                        inputElement.disabled = true;
                    }
                }

                // Check correctness
                if (userAnswer.toString().toLowerCase() === q.answer.toString().toLowerCase()) {
                    isCorrect = true;
                    score++;
                }

                // Add styling to question boxes with bounce or wiggle animations
                if (isCorrect) {
                    questionBox.classList.add('correct');
                    questionBox.classList.add('bounce-effect');
                    feedbackBox.innerHTML = `<i class="fas fa-check-circle" style="color: var(--color-secondary);"></i> Correct! Awesome job! ⭐`;
                    feedbackBox.className = 'feedback-message feedback-correct';
                } else {
                    questionBox.classList.add('incorrect');
                    questionBox.classList.add('wiggle-effect');
                    feedbackBox.innerHTML = `<i class="fas fa-times-circle" style="color: var(--color-red);"></i> Oops! The correct answer is <strong>${q.answer}</strong>.`;
                    feedbackBox.className = 'feedback-message feedback-incorrect';
                }
                feedbackBox.style.display = 'flex';

                // Disable input controls after submission
                if (q.type === 'mcq') {
                    document.querySelectorAll(`input[name="q-${q.id}"]`).forEach(input => input.disabled = true);
                }
            });

            // Display Results
            submitBtn.style.display = 'none';
            resultsPanel.style.display = 'block';

            // Calculate percentage
            const percentage = Math.round((score / totalQuestions) * 100);
            scoreValue.innerText = `${score}/${totalQuestions}`;
            scorePercentageText.innerText = `You scored ${percentage}%!`;

            // Give funny cartoon feedbacks and sounds
            if (percentage === 100) {
                playSound('success');
                scoreFeedbackText.innerText = "⭐ Perfect Score! You're a Math Wizard! ⭐";
                trophyIcon.innerText = "👑🏆👑";
                mascotSpeech.innerText = "👑 HOORAY! Perfect 5/5 score! You are a total Math Wizard! Rexy is so incredibly proud of you! 🦖🏆";
                mascotFace.innerText = "🥳";
                mascotContainer.style.background = "#ECFDF5";
                mascotContainer.style.borderColor = "var(--color-secondary)";
                triggerConfetti();
            } else if (percentage >= 80) {
                playSound('success');
                scoreFeedbackText.innerText = "🎉 Superb Job! Almost Perfect! 🎉";
                trophyIcon.innerText = "🎈🏅🎈";
                mascotSpeech.innerText = "🎉 Woah! So close to perfect! You did amazing! Rexy is jumping with joy! 🦕🥳";
                mascotFace.innerText = "🥳";
                mascotContainer.style.background = "#ECFDF5";
                mascotContainer.style.borderColor = "var(--color-secondary)";
                triggerConfetti();
            } else if (percentage >= 50) {
                playSound('select');
                scoreFeedbackText.innerText = "👍 Good Effort! Keep Practicing! 👍";
                trophyIcon.innerText = "✨👍✨";
                mascotSpeech.innerText = "👍 Nice try! You got some correct! Let's practice a bit more and we'll get 5/5 next time! 🦁📚";
                mascotFace.innerText = "🦁";
                mascotContainer.style.background = "#FEF3C7";
                mascotContainer.style.borderColor = "var(--color-yellow)";
            } else {
                playSound('fail');
                scoreFeedbackText.innerText = "💪 Don't give up! Try again to score better! 💪";
                trophyIcon.innerText = "📚✏️📚";
                mascotSpeech.innerText = "💪 Mistakes help us learn and grow! Try again, Rexy knows you can do it! 🦖📝";
                mascotFace.innerText = "🦖";
                mascotContainer.style.background = "#FEF2F2";
                mascotContainer.style.borderColor = "var(--color-red)";
            }

            // Scroll down to results panel smoothly
            resultsPanel.scrollIntoView({ behavior: 'smooth' });
        });

        // Retry handler
        retryBtn.addEventListener('click', () => {
            renderSolver(ws);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function triggerConfetti() {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
