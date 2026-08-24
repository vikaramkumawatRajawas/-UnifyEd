
            document.addEventListener("DOMContentLoaded", () => {
                console.log("Student Dashboard Page Initialized");

                // Get logged in student details for display inside quiz
                const studentNameVal = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                const studentIdVal = localStorage.getItem("loggedInStudentId") || "STU202600145";

                const quizStudentName = document.getElementById("quizStudentName");
                const quizStudentId = document.getElementById("quizStudentId");
                if (quizStudentName) quizStudentName.textContent = studentNameVal;
                if (quizStudentId) quizStudentId.textContent = studentIdVal;

                // Update Dashboard Real-Time Attendance Meter from localStorage
                function updateDashboardAttendanceMeter() {
                    const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                    const baseDelivered = 180;
                    const baseAttended = 161;
                    
                    const totalDelivered = baseDelivered + checkins.length;
                    const totalAttended = baseAttended + checkins.length;
                    const percentage = totalDelivered > 0 ? ((totalAttended / totalDelivered) * 100).toFixed(1) : "85.0";
                    
                    const meterPercentageText = document.querySelector(".dashboard-card strong[style*='font-size: 18px']");
                    if (meterPercentageText) {
                        meterPercentageText.textContent = percentage + "%";
                    }
                    
                    const meterCircle = document.querySelector(".dashboard-card circle[stroke='#10b981']");
                    if (meterCircle) {
                        const dashoffset = 251.2 - (251.2 * parseFloat(percentage) / 100);
                        meterCircle.setAttribute("stroke-dashoffset", dashoffset.toFixed(1));
                    }
                    
                    const statsContainer = document.querySelector(".dashboard-card div[style*='font-size: 12px']");
                    if (statsContainer) {
                        const requiredMin = Math.ceil(totalDelivered * 0.75);
                        const margin = totalAttended - requiredMin;
                        const marginSign = margin >= 0 ? "+" : "";
                        
                        statsContainer.innerHTML = `
                            <span><i class="fa-solid fa-circle" style="color: #10b981; font-size:8px; margin-right:5px;"></i> Classes: <strong>${totalAttended} / ${totalDelivered}</strong></span>
                            <span><i class="fa-solid fa-circle" style="color: var(--accent); font-size:8px; margin-right:5px;"></i> Margin: <strong>${marginSign}${margin}</strong></span>
                            <span><i class="fa-solid fa-circle" style="color: var(--text-tertiary); font-size:8px; margin-right:5px;"></i> Required: <strong>75%</strong></span>
                        `;
                    }
                }
                updateDashboardAttendanceMeter();

                // Mock database of teacher-active attendance codes & dynamic questions
                const activeAttendanceCodes = {
                    "NET77": {
                        subjectCode: "CS-501",
                        subjectName: "Neural Networks & Deep Learning",
                        creditPoints: 2,
                        questions: [
                            {
                                type: "mcq",
                                text: "Which activation function is most widely used in deep neural networks to prevent vanishing gradient issues?",
                                options: ["Sigmoid", "Tanh", "ReLU", "Linear Activation"],
                                correct: "ReLU",
                                points: 1
                            },
                            {
                                type: "text",
                                text: "Briefly explain why learning rate is a critical hyperparameter in backpropagation gradient descent.",
                                points: 1
                            }
                        ]
                    },
                    "DB99": {
                        subjectCode: "CS-503",
                        subjectName: "Database Systems & Query Tuning",
                        creditPoints: 3,
                        questions: [
                            {
                                type: "mcq",
                                text: "Which join operation returns all matching tuples between two tables and null values for non-matching ones?",
                                options: ["Cross Join", "Inner Join", "Left Outer Join", "Full Outer Join"],
                                correct: "Inner Join",
                                points: 1
                            },
                            {
                                type: "text",
                                text: "Describe what defines the 3rd Normal Form (3NF) requirements in database schemas.",
                                points: 2
                            }
                        ]
                    }
                };

                const codeForm = document.getElementById("attendanceCodeForm");
                const codeInput = document.getElementById("attendanceCodeInput");
                const feedbackMsg = document.getElementById("codeFeedbackMessage");
                const quizBlock = document.getElementById("attendanceQuizBlock");
                const questionsContainer = document.getElementById("quizQuestionsContainer");
                const quizForm = document.getElementById("quizValidationForm");

                let currentActiveCodeData = null;

                if (codeForm) {
                    codeForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        const enteredCode = codeInput.value.trim().toUpperCase();
                        
                        if (!enteredCode) {
                            feedbackMsg.style.color = "#ef4444";
                            feedbackMsg.textContent = "Please enter an attendance code.";
                            quizBlock.style.display = "none";
                            return;
                        }

                        // Check localStorage for dynamic session published by professor first
                        const dynamicSession = JSON.parse(localStorage.getItem("activeAttendanceSession"));
                        if (dynamicSession && dynamicSession.code === enteredCode) {
                            const subName = dynamicSession.lecture === "DBMS" ? "Database Management Systems" : dynamicSession.lecture === "WEB" ? "Web Technology Lab" : "Neural Networks Seminar";
                            const subCode = dynamicSession.lecture === "DBMS" ? "DBMS-301" : dynamicSession.lecture === "WEB" ? "WT-591" : "NN-702";
                            
                            currentActiveCodeData = {
                                isDynamic: true,
                                subjectName: subName,
                                subjectCode: subCode,
                                creditPoints: dynamicSession.totalCredits,
                                questions: dynamicSession.questions.map((q, qidx) => {
                                    const opts = [];
                                    if (q.optA) opts.push(q.optA);
                                    if (q.optB) opts.push(q.optB);
                                    if (q.optC) opts.push(q.optC);
                                    return {
                                        type: opts.length > 0 ? "mcq" : "text",
                                        text: q.text,
                                        options: opts,
                                        points: q.credits
                                    };
                                })
                            };
                        }

                        // Fallback to static codes if not found in dynamic sessions
                        if (!currentActiveCodeData && activeAttendanceCodes[enteredCode]) {
                            currentActiveCodeData = activeAttendanceCodes[enteredCode];
                        }

                        if (currentActiveCodeData) {
                            feedbackMsg.style.color = "#10b981";
                            feedbackMsg.textContent = "Valid Code! Verification required for: " + currentActiveCodeData.subjectName + " (" + currentActiveCodeData.subjectCode + "). Total credits: " + currentActiveCodeData.creditPoints;
                            
                            // Render questions dynamically
                            questionsContainer.innerHTML = "";
                            currentActiveCodeData.questions.forEach((q, idx) => {
                                const questionDiv = document.createElement("div");
                                questionDiv.className = "form-group";
                                questionDiv.style.marginBottom = "15px";
                                
                                const questionLabel = document.createElement("label");
                                questionLabel.innerHTML = "<strong>Q" + (idx + 1) + ":</strong> " + q.text + " <span style='color:var(--accent);'>(" + q.points + " credits)</span>";
                                questionDiv.appendChild(questionLabel);

                                if (q.type === "mcq") {
                                    const select = document.createElement("select");
                                    select.className = "form-input";
                                    select.required = true;
                                    select.name = "q_" + idx;
                                    select.innerHTML = '<option value="">-- Choose Option --</option>' + 
                                        q.options.map(opt => '<option value="' + opt + '">' + opt + '</option>').join("");
                                    questionDiv.appendChild(select);
                                } else {
                                    const input = document.createElement("input");
                                    input.type = "text";
                                    input.className = "form-input";
                                    input.required = true;
                                    input.placeholder = "Enter your answer here...";
                                    input.name = "q_" + idx;
                                    questionDiv.appendChild(input);
                                }
                                questionsContainer.appendChild(questionDiv);
                            });

                            quizBlock.style.display = "block";
                        } else {
                            feedbackMsg.style.color = "#ef4444";
                            feedbackMsg.textContent = "Invalid or expired class attendance code.";
                            quizBlock.style.display = "none";
                        }
                    });
                }

                const quizResultsBlock = document.getElementById("quizResultsBlock");
                const receiptContent = document.getElementById("receiptContent");
                const closeReceiptBtn = document.getElementById("closeReceiptBtn");
                const pastCheckinsContainer = document.getElementById("pastCheckinsContainer");
                const pastCheckinsBody = document.getElementById("pastCheckinsBody");

                function renderCheckins() {
                    const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                    if (checkins.length === 0) {
                        pastCheckinsContainer.style.display = "none";
                        return;
                    }

                    pastCheckinsContainer.style.display = "block";
                    pastCheckinsBody.innerHTML = checkins.map(item => {
                        const mcqText = item.mcqCorrect ? 
                            "<span style='color:#10b981;'>Correct (" + item.mcqAnswer + ")</span>" : 
                            "<span style='color:#ef4444;'>Incorrect (" + item.mcqAnswer + ")</span>";
                            
                        return "<tr>" +
                            "<td><strong>" + item.subjectName + "</strong></td>" +
                            "<td>" + mcqText + "</td>" +
                            "<td>" + item.shortAnswerStatus + "</td>" +
                            "<td>" + item.creditsEarned + " / " + item.maxCredits + "</td>" +
                            "<td><span class='badge badge-success'>Registered</span></td>" +
                            "</tr>";
                    }).join("");
                }

                renderCheckins();

                if (closeReceiptBtn) {
                    closeReceiptBtn.addEventListener("click", () => {
                        quizResultsBlock.style.display = "none";
                        codeForm.style.display = "flex";
                        codeInput.value = "";
                        feedbackMsg.textContent = "";
                    });
                }

                if (quizForm) {
                    quizForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        if (!currentActiveCodeData) return;

                        const submitButton = quizForm.querySelector("button[type='submit']");
                        submitButton.disabled = true;
                        submitButton.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registering Attendance...';

                        setTimeout(() => {
                            const formData = new FormData(quizForm);

                            if (currentActiveCodeData.isDynamic) {
                                // Dynamic MCQ & Questions from Professor
                                const selectedAnswers = [];
                                currentActiveCodeData.questions.forEach((q, qidx) => {
                                    selectedAnswers.push(formData.get("q_" + qidx) || "No answer");
                                });

                                const newCheckin = {
                                    subjectName: currentActiveCodeData.subjectName,
                                    mcqCorrect: true, // Auto correct or dynamic check
                                    mcqAnswer: selectedAnswers[0] || "Answered",
                                    shortAnswerStatus: "Submitted (Real-time synced)",
                                    creditsEarned: currentActiveCodeData.creditPoints,
                                    maxCredits: currentActiveCodeData.creditPoints
                                };

                                const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                                checkins.unshift(newCheckin);
                                localStorage.setItem("attendanceCheckins", JSON.stringify(checkins));

                                // Save student session response for Professor to read in real-time
                                const nameVal = localStorage.getItem("loggedInUser") || "Aditya Sharma";
                                const idVal = localStorage.getItem("loggedInStudentId") || "STU202600145";
                                const studentCheckinResponse = {
                                    studentName: nameVal,
                                    studentId: idVal,
                                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                    answers: selectedAnswers,
                                    status: "Present",
                                    credits: currentActiveCodeData.creditPoints
                                };

                                let liveResponses = JSON.parse(localStorage.getItem("liveStudentResponses")) || [];
                                // Remove old response for the same student to avoid duplicates
                                liveResponses = liveResponses.filter(r => r.studentId !== idVal);
                                liveResponses.push(studentCheckinResponse);
                                localStorage.setItem("liveStudentResponses", JSON.stringify(liveResponses));

                                // Show Dynamic Scorecard
                                let responseReceiptHtml = "<p><strong>Class:</strong> " + currentActiveCodeData.subjectName + " (" + currentActiveCodeData.subjectCode + ")</p>" +
                                    "<p><strong>Attendance Status:</strong> <span style='color:#10b981; font-weight:700;'>✅ REGISTERED & SYNCED</span></p>";
                                selectedAnswers.forEach((ans, ansIdx) => {
                                    responseReceiptHtml += "<p><strong>Q" + (ansIdx + 1) + " Response:</strong> " + ans + "</p>";
                                });
                                responseReceiptHtml += "<p><strong>Session Credits Logged:</strong> " + currentActiveCodeData.creditPoints + " Credits</p>";
                                
                                receiptContent.innerHTML = responseReceiptHtml;
                            } else {
                                // Static Legacy fallback
                                const mcqAnswer = formData.get("q_0");
                                const shortAnswerVal = formData.get("q_1");

                                const mcqQuestion = currentActiveCodeData.questions[0];
                                const isMcqCorrect = mcqAnswer === mcqQuestion.correct;
                                
                                let credits = 0;
                                if (isMcqCorrect) {
                                    credits += mcqQuestion.points;
                                }
                                const maxCredits = currentActiveCodeData.creditPoints;
                                
                                const newCheckin = {
                                    subjectName: currentActiveCodeData.subjectName,
                                    mcqCorrect: isMcqCorrect,
                                    mcqAnswer: mcqAnswer,
                                    shortAnswerStatus: "Submitted (Pending Review)",
                                    creditsEarned: credits,
                                    maxCredits: maxCredits
                                };

                                const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                                checkins.unshift(newCheckin);
                                localStorage.setItem("attendanceCheckins", JSON.stringify(checkins));

                                receiptContent.innerHTML = 
                                    "<p><strong>Class:</strong> " + currentActiveCodeData.subjectName + " (" + currentActiveCodeData.subjectCode + ")</p>" +
                                    "<p><strong>Attendance Status:</strong> <span style='color:#10b981; font-weight:700;'>✅ REGISTERED</span></p>" +
                                    "<p><strong>MCQ Quiz Question:</strong> " + 
                                        (isMcqCorrect ? 
                                        "<span style='color:#10b981; font-weight:700;'>Correct Answer (1/1 Credit Point)</span>" : 
                                        "<span style='color:#ef4444; font-weight:700;'>Incorrect Answer (0/1 Credit Point). Correct: " + mcqQuestion.correct + "</span>") + 
                                    "</p>" +
                                    "<p><strong>Short Answer Evaluation:</strong> <span style='color:var(--accent);'>Submitted for grading (1-2 Days)</span></p>" +
                                    "<p><strong>Session Credits Logged:</strong> " + credits + " / " + maxCredits + " Credits</p>";
                            }

                            quizBlock.style.display = "none";
                            codeForm.style.display = "none";
                            quizResultsBlock.style.display = "block";

                            renderCheckins();
                            
                            submitButton.disabled = false;
                            submitButton.textContent = "Submit Answers & Mark Attendance";

                            // Automatically reload page after 2.5 seconds to sync dashboard stats
                            setTimeout(() => {
                                window.location.reload();
                            }, 2500);
                        }, 1200);
                    });
                }

                // To-Do Checklist Logic
                const todoInput = document.getElementById("todoTaskInput");
                const addTodoBtn = document.getElementById("addTodoBtn");
                const todoList = document.getElementById("todoList");

                let todos = JSON.parse(localStorage.getItem("dashboardTodos")) || [
                    { text: "Prepare VLSI Lab Viva questions", completed: false },
                    { text: "Download professional communication syllabus", completed: true },
                    { text: "Submit database tuning assignment", completed: false }
                ];

                function renderTodos() {
                    if (!todoList) return;
                    todoList.innerHTML = todos.map((todo, idx) => {
                        return "<li style='display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding: 8px 12px; border-radius:6px; border:1px solid var(--border-color);'>" +
                            "<div style='display:flex; align-items:center; gap:10px;'>" +
                                "<input type='checkbox' " + (todo.completed ? "checked" : "") + " style='cursor:pointer;' onchange='toggleTodo(" + idx + ")'>" +
                                "<span style='" + (todo.completed ? "text-decoration: line-through; color: var(--text-tertiary);" : "color: var(--text-primary);") + " font-size:12px;'>" + todo.text + "</span>" +
                            "</div>" +
                            "<button onclick='deleteTodo(" + idx + ")' style='background:none; border:none; color:var(--text-tertiary); cursor:pointer; font-size:12px;' onmouseover='this.style.color=\"#ef4444\"' onmouseout='this.style.color=\"var(--text-tertiary)\"'><i class='fa-solid fa-trash-can'></i></button>" +
                        "</li>";
                    }).join("");
                }

                window.toggleTodo = function(idx) {
                    todos[idx].completed = !todos[idx].completed;
                    localStorage.setItem("dashboardTodos", JSON.stringify(todos));
                    renderTodos();
                };

                window.deleteTodo = function(idx) {
                    todos.splice(idx, 1);
                    localStorage.setItem("dashboardTodos", JSON.stringify(todos));
                    renderTodos();
                };

                if (addTodoBtn && todoInput) {
                    const addTask = () => {
                        const txt = todoInput.value.trim();
                        if (txt) {
                            todos.push({ text: txt, completed: false });
                            localStorage.setItem("dashboardTodos", JSON.stringify(todos));
                            todoInput.value = "";
                            renderTodos();
                        }
                    };
                    addTodoBtn.addEventListener("click", addTask);
                    todoInput.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") {
                            addTask();
                        }
                    });
                }

                renderTodos();
            });
        