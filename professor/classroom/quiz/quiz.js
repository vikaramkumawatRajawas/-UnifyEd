
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initQuiz() {
                const titleInput = document.getElementById("quizTitle");
                const durationInput = document.getElementById("quizDuration");
                const totalMarksInput = document.getElementById("quizTotalMarks");
                const publishBtn = document.getElementById("publishQuizBtn");
                const quizList = document.getElementById("classroomQuizList");

                const qText = document.getElementById("qText");
                const qOptA = document.getElementById("qOptA");
                const qOptB = document.getElementById("qOptB");
                const qOptC = document.getElementById("qOptC");
                const qOptD = document.getElementById("qOptD");
                const qCorrect = document.getElementById("qCorrect");
                const addQBtn = document.getElementById("addQuestionBtn");
                const addedQCount = document.getElementById("addedQuestionsCount");

                const responsesPanel = document.getElementById("quizResponsesPanel");
                const responsesPanelTitle = document.getElementById("responsesPanelTitle");
                const responsesAvgLabel = document.getElementById("responsesAvgLabel");
                const responsesGridBody = document.getElementById("responsesGridBody");

                let currentQuestionsList = [];
                let selectedQuizId = null;

                // Default active quizzes database
                const defaultQuizzes = [
                    { id: 1, title: "Quiz 1: SQL Basic Queries & Filters", duration: 15, marks: 20, qCount: 10, status: "Live", completed: 5, total: 5 },
                    { id: 2, title: "Quiz 2: Database Schema & Relations", duration: 20, marks: 20, qCount: 10, status: "Completed", completed: 4, total: 5 }
                ];

                // Mock student responses for active quizzes
                const mockQuizResponses = {
                    "BCA23015": { name: "Vikram Kumawat", status: "Completed", score: 18 },
                    "CSE23099": { name: "Priya Sharma", status: "Completed", score: 15 },
                    "CSE23115": { name: "Aditya Bose", status: "Completed", score: 16 },
                    "BCA23088": { name: "Neha Sen", status: "Completed", score: 19 },
                    "CSE23045": { name: "Amit Roy", status: "Not Started", score: 0 }
                };

                // Add MCQ Question to buffer
                addQBtn.addEventListener("click", () => {
                    const text = qText.value.trim();
                    const a = qOptA.value.trim();
                    const b = qOptB.value.trim();
                    const c = qOptC.value.trim();
                    const d = qOptD.value.trim();
                    const correct = qCorrect.value;

                    if (!text || !a || !b) {
                        alert("Question text and at least options A and B are required.");
                        return;
                    }

                    currentQuestionsList.push({ text, a, b, c, d, correct });
                    addedQCount.textContent = currentQuestionsList.length;

                    // Clear inputs
                    qText.value = "";
                    qOptA.value = "";
                    qOptB.value = "";
                    qOptC.value = "";
                    qOptD.value = "";
                    qCorrect.value = "A";

                    showToast("Question saved in temporary builder!");
                });

                // Populate quizzes list
                function renderQuizzes() {
                    const localQuizzes = JSON.parse(localStorage.getItem("classroomQuizzes")) || [];
                    const fullList = [...localQuizzes, ...defaultQuizzes];

                    if (fullList.length === 0) {
                        quizList.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0;">No active quizzes found in this registry.</div>';
                        return;
                    }

                    quizList.innerHTML = fullList.map(q => {
                        let statusColor = "";
                        if (q.status === "Live") statusColor = "#10b981";
                        else if (q.status === "Completed") statusColor = "var(--text-tertiary)";
                        else statusColor = "var(--accent)";

                        return '<div class="quiz-item-card glassmorphism">' +
                            '<div>' +
                                '<h4 style="margin:0; font-size:12px; font-weight:700; color:var(--text-primary);">' + q.title + '</h4>' +
                                '<span style="font-size:10px; color:var(--text-tertiary); display:block; margin-top:4px;">' + q.duration + ' Mins • ' + q.qCount + ' MCQs • Total: ' + q.marks + ' Marks</span>' +
                            '</div>' +
                            '<div style="display:flex; gap:10px; align-items:center;">' +
                                '<span style="font-size:10px; background:rgba(255,255,255,0.02); color:' + statusColor + '; padding:3px 8px; border-radius:12px; font-weight:700; border:1px solid ' + statusColor + ';">' + q.status + '</span>' +
                                '<button type="button" class="btn" onclick="openResponsesPanel(' + q.id + ', \'' + q.title.replace(/'/g, "\'") + '\', ' + q.marks + ')" style="background:rgba(99,102,241,0.1); color:var(--primary); font-size:11px; padding:6px 12px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-list-check"></i> Answers</button>' +
                                '<button type="button" class="material-delete-btn" onclick="deleteQuiz(' + q.id + ')" style="position:static; display:block; padding:6px; color:var(--text-tertiary);"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Publish Quiz
                publishBtn.addEventListener("click", () => {
                    const title = titleInput.value.trim();
                    const duration = parseInt(durationInput.value);
                    const marks = parseInt(totalMarksInput.value);

                    if (!title) {
                        alert("Please specify quiz title.");
                        return;
                    }

                    const localQuizzes = JSON.parse(localStorage.getItem("classroomQuizzes")) || [];
                    const newQuiz = {
                        id: Date.now(),
                        title: title,
                        duration: duration,
                        marks: marks,
                        qCount: currentQuestionsList.length > 0 ? currentQuestionsList.length : 10,
                        status: "Live",
                        completed: 0,
                        total: 5
                    };

                    localQuizzes.unshift(newQuiz);
                    localStorage.setItem("classroomQuizzes", JSON.stringify(localQuizzes));

                    // Reset
                    titleInput.value = "";
                    durationInput.value = "15";
                    totalMarksInput.value = "20";
                    currentQuestionsList = [];
                    addedQCount.textContent = "0";

                    renderQuizzes();
                    showToast("Success: MCQ Quiz is now LIVE for students!");
                });

                // Delete Quiz
                window.deleteQuiz = function(id) {
                    if (!confirm("Are you sure you want to remove this quiz from class records?")) return;

                    const localQuizzes = JSON.parse(localStorage.getItem("classroomQuizzes")) || [];
                    const idx = localQuizzes.findIndex(q => q.id === id);

                    if (idx !== -1) {
                        localQuizzes.splice(idx, 1);
                        localStorage.setItem("classroomQuizzes", JSON.stringify(localQuizzes));
                        renderQuizzes();
                        responsesPanel.style.display = "none";
                        showToast("Quiz removed.");
                    } else {
                        alert("Warning: Core preloaded quizzes cannot be deleted.");
                    }
                };

                // Open responses panel
                window.openResponsesPanel = function(id, title, maxMarks) {
                    selectedQuizId = id;
                    responsesPanel.style.display = "block";
                    responsesPanelTitle.innerHTML = '<i class="fa-solid fa-clipboard-question"></i> Responses: ' + title;

                    let scoreSum = 0;
                    let compCount = 0;
                    const studentKeys = Object.keys(mockQuizResponses);

                    responsesGridBody.innerHTML = studentKeys.map(k => {
                        const s = mockQuizResponses[k];
                        let statusColor = s.status === "Completed" ? "#10b981" : "#ef4444";
                        
                        if (s.status === "Completed") {
                            scoreSum += s.score;
                            compCount++;
                        }

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + k + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center;"><span style="font-size:10px; background:rgba(255,255,255,0.02); color:' + statusColor + '; padding:2px 6px; border-radius:4px; border:1px solid ' + statusColor + '; font-weight:600;">' + s.status + '</span></td>' +
                            '<td style="text-align:center; font-family:monospace; font-weight:700; color:var(--primary);">' + (s.status === "Completed" ? s.score : "—") + ' <span style="font-size:10px; color:var(--text-tertiary);">/ ' + maxMarks + '</span></td>' +
                            '</tr>';
                    }).join("");

                    const avg = compCount > 0 ? ((scoreSum / (compCount * maxMarks)) * 100).toFixed(1) : "—";
                    responsesAvgLabel.textContent = "Class Average: " + avg + "%";
                };

                renderQuizzes();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initQuiz);
            } else {
                initQuiz();
            }
        