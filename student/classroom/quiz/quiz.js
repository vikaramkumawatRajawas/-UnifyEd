
            document.addEventListener("DOMContentLoaded", () => {
                const quizSessions = [
                    {
                        id: "quiz_act_functions",
                        title: "Short Quiz 2: Activation Functions & Gradients",
                        subject: "Neural Networks & Deep Learning",
                        duration: "5 Mins",
                        questionsCount: 3,
                        warnings: "Webcam required. 1 attempt allowed.",
                        status: "pending",
                        score: null
                    },
                    {
                        id: "quiz_intro_neurons",
                        title: "Short Quiz 1: Introduction to Neurons & Logical Gates",
                        subject: "Neural Networks & Deep Learning",
                        duration: "10 Mins",
                        questionsCount: 10,
                        warnings: "Completed Session",
                        status: "completed",
                        score: "9 / 10"
                    }
                ];

                const quizQuestions = [
                    {
                        q: "What is the derivative of the ReLU activation function for x > 0?",
                        options: ["f'(x) = 0", "f'(x) = 1", "f'(x) = x", "f'(x) = -1"],
                        correct: 1
                    },
                    {
                        q: "Which activation function outputs values strictly in the range [0, 1]?",
                        options: ["tanh", "ReLU", "Sigmoid", "LeakyReLU"],
                        correct: 2
                    },
                    {
                        q: "What issue is Leaky ReLU specifically designed to prevent?",
                        options: ["Overfitting", "Vanishing Gradient", "Dying ReLU Problem", "Exploding Gradient"],
                        correct: 2
                    }
                ];

                let currentQuestionIndex = 0;
                let userAnswers = [];
                let examTimer = null;
                let secondsLeft = 300;

                function getQuizzes() {
                    const saved = localStorage.getItem("classroom_quizzes");
                    if (saved) return JSON.parse(saved);
                    return quizSessions;
                }

                function saveQuizzes(list) {
                    localStorage.setItem("classroom_quizzes", JSON.stringify(list));
                }

                window.renderQuizzesList = function() {
                    const container = document.getElementById("quizListContainer");
                    if (!container) return;

                    const list = getQuizzes();
                    container.innerHTML = list.map(item => `
                        <div class="quiz-row-item" style="display:flex; justify-content:space-between; align-items:center; padding:20px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); margin-bottom:15px;">
                            <div class="details">
                                <strong style="font-size:14px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:4px;">${item.title}</strong>
                                <p style="font-size:12px; color:var(--text-secondary); margin:0 0 6px 0;">Subject: ${item.subject} • Duration: ${item.duration} • Questions: ${item.questionsCount}</p>
                                <span class="warning-text" style="font-size:11px; font-weight:600; color:${item.status === 'pending' ? 'var(--accent)' : '#10b981'};">
                                    ${item.status === 'pending' ? '<i class="fa-solid fa-triangle-exclamation"></i> ' + item.warnings : '<i class="fa-solid fa-circle-check"></i> Grade: <strong>' + item.score + '</strong>'}
                                </span>
                            </div>
                            <div>
                                ${item.status === 'pending' ? 
                                    `<button class="btn btn-primary btn-sm" onclick="startQuizExam('${item.id}')" style="height:32px; font-size:11px;">Start Quiz</button>` : 
                                    `<span style="color:#10b981; font-weight:700; font-size:12px;"><i class="fa-solid fa-circle-check"></i> Completed</span>`
                                }
                            </div>
                        </div>
                    `).join("");
                };

                window.startQuizExam = function(id) {
                    const modal = document.getElementById("proctoredQuizModal");
                    if (!modal) return;

                    currentQuestionIndex = 0;
                    userAnswers = [];
                    secondsLeft = 300;
                    modal.style.display = "block";

                    loadQuestion();
                    startExamTimer();
                };

                function loadQuestion() {
                    const currentQ = quizQuestions[currentQuestionIndex];
                    const progressText = document.getElementById("questionProgressText");
                    const questionText = document.getElementById("quizQuestionText");
                    const optionsContainer = document.getElementById("quizOptionsContainer");
                    const nextBtn = document.getElementById("nextQuestionBtn");

                    if (progressText) progressText.textContent = "Question " + (currentQuestionIndex + 1) + " of " + quizQuestions.length;
                    if (questionText) questionText.textContent = currentQ.q;
                    
                    if (nextBtn) {
                        nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Submit Quiz Exam" : "Next Question";
                    }

                    if (optionsContainer) {
                        optionsContainer.innerHTML = currentQ.options.map((opt, i) => `
                            <label style="display:flex; align-items:center; gap:10px; padding:15px; border:1px solid var(--border-color); border-radius:8px; cursor:pointer; font-size:13px; background:rgba(255,255,255,0.01);" class="quiz-option-label">
                                <input type="radio" name="quiz_opt" value="${i}" style="margin:0;">
                                <span>${opt}</span>
                            </label>
                        `).join("");
                    }
                }

                window.submitAnswerAndNext = function() {
                    const checked = document.querySelector('input[name="quiz_opt"]:checked');
                    if (!checked) {
                        alert("Please select an answer option to proceed!");
                        return;
                    }

                    userAnswers.push(parseInt(checked.value));

                    if (currentQuestionIndex < quizQuestions.length - 1) {
                        currentQuestionIndex++;
                        loadQuestion();
                    } else {
                        finishQuizExam();
                    }
                };

                function startExamTimer() {
                    if (examTimer) clearInterval(examTimer);
                    
                    const timerText = document.getElementById("timerText");
                    examTimer = setInterval(() => {
                        secondsLeft--;
                        let mins = Math.floor(secondsLeft / 60);
                        let secs = secondsLeft % 60;
                        if (timerText) timerText.textContent = mins.toString().padStart(2, '0') + ":" + secs.toString().padStart(2, '0');

                        if (secondsLeft <= 0) {
                            clearInterval(examTimer);
                            alert("Time is up! Your quiz has been auto-submitted.");
                            finishQuizExam();
                        }
                    }, 1000);
                }

                function finishQuizExam() {
                    clearInterval(examTimer);
                    const modal = document.getElementById("proctoredQuizModal");
                    if (modal) modal.style.display = "none";

                    let correctCount = 0;
                    userAnswers.forEach((ans, i) => {
                        if (ans === quizQuestions[i].correct) correctCount++;
                    });

                    const list = getQuizzes();
                    const match = list.find(item => item.id === "quiz_act_functions");
                    if (match) {
                        match.status = "completed";
                        match.score = correctCount + " / " + quizQuestions.length;
                        saveQuizzes(list);
                    }

                    renderQuizzesList();
                    alert("Quiz submitted successfully! Your score: " + correctCount + " / " + quizQuestions.length);
                }

                window.abortQuizExam = function() {
                    if (confirm("Are you sure you want to abort the exam? You will receive a score of 0.")) {
                        clearInterval(examTimer);
                        const modal = document.getElementById("proctoredQuizModal");
                        if (modal) modal.style.display = "none";

                        const list = getQuizzes();
                        const match = list.find(item => item.id === "quiz_act_functions");
                        if (match) {
                            match.status = "completed";
                            match.score = "0 / " + quizQuestions.length;
                            saveQuizzes(list);
                        }

                        renderQuizzesList();
                        alert("Exam aborted. Score recorded: 0");
                    }
                };

                // Initial load
                renderQuizzesList();
            });
        