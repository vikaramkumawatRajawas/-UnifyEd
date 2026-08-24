
            // Global toast helper
            window.showToast = function(msg) {
                const toast = document.getElementById("toastNotification");
                const toastMsg = document.getElementById("toastMessage");
                if (toast && toastMsg) {
                    toastMsg.textContent = msg;
                    toast.style.display = "flex";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 4000);
                }
            };

            // Global function to remove validation questions
            window.removeQuestionRow = function(btn) {
                const row = btn.closest(".question-row");
                const container = document.getElementById("questionsContainer");
                if (container.children.length > 1) {
                    row.remove();
                    reindexQuestions();
                }
            };

            function reindexQuestions() {
                const container = document.getElementById("questionsContainer");
                const rows = container.getElementsByClassName("question-row");
                Array.from(rows).forEach((row, i) => {
                    const idx = i + 1;
                    row.setAttribute("data-index", idx);
                    row.querySelector("span").textContent = "Q" + idx;
                    // Show delete button if more than 1 question exists
                    const delBtn = row.querySelector("button");
                    if (delBtn) {
                        delBtn.style.display = rows.length > 1 ? "block" : "none";
                    }
                });
            }

            // Global function to toggle attendance status manually
            window.toggleStudentAtt = function(id) {
                const badge = document.getElementById("attBadge" + id);
                const timeCell = document.getElementById("attTime" + id);
                const ansCell = document.getElementById("attAns" + id);
                
                if (badge && timeCell && ansCell) {
                    const isAbsent = badge.textContent.trim().toLowerCase() !== "present";
                    if (isAbsent) {
                        badge.textContent = "Present";
                        badge.style.background = "rgba(16, 185, 129, 0.15)";
                        badge.style.color = "#10b981";
                        // Set current time
                        const now = new Date();
                        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        timeCell.textContent = timeStr;
                        // Mock answer override if empty
                        if (ansCell.textContent.includes("No response") || ansCell.textContent.includes("Interrupted")) {
                            ansCell.innerHTML = "Overridden by faculty (All credits awarded)";
                            ansCell.style.fontStyle = "normal";
                            ansCell.style.color = "var(--text-secondary)";
                        }
                    } else {
                        badge.textContent = "Absent";
                        badge.style.background = "rgba(239, 68, 68, 0.15)";
                        badge.style.color = "#ef4444";
                        timeCell.textContent = "—";
                        ansCell.textContent = "No response yet";
                        ansCell.style.fontStyle = "italic";
                        ansCell.style.color = "var(--text-tertiary)";
                    }
                }
            };

            // Global function to reset student session to allow retake
            window.resetStudentSession = function(id, studentName) {
                const badge = document.getElementById("attBadge" + id);
                const timeCell = document.getElementById("attTime" + id);
                const ansCell = document.getElementById("attAns" + id);
                
                if (badge && timeCell && ansCell) {
                    badge.textContent = "Ready to Retake";
                    badge.style.background = "rgba(99, 102, 241, 0.15)";
                    badge.style.color = "var(--primary)";
                    
                    timeCell.textContent = "—";
                    ansCell.textContent = "Session unlocked. Student can start quiz again.";
                    ansCell.style.fontStyle = "italic";
                    ansCell.style.color = "var(--primary)";
                    
                    showToast("Success: Session reset for " + studentName + ". Ready to retake!");
                }
            };

            document.addEventListener("DOMContentLoaded", () => {
                const btn = document.getElementById("generateCodeBtn");
                const select = document.getElementById("lectureSelect");
                const codeBlock = document.getElementById("codeDisplayBlock");
                const activeCode = document.getElementById("activeValidationCode");
                const countdownText = document.getElementById("timerCountdownText");
                const timerInput = document.getElementById("expiryTimerInput");
                const addQBtn = document.getElementById("addQuestionBtn");
                const qContainer = document.getElementById("questionsContainer");

                let simulationInterval = null;

                // Add Question handler
                if (addQBtn && qContainer) {
                    addQBtn.addEventListener("click", () => {
                        const currentCount = qContainer.children.length;
                        if (currentCount >= 5) {
                            alert("You can add up to 5 questions only!");
                            return;
                        }
                        const newIdx = currentCount + 1;
                        const newRow = document.createElement("div");
                        newRow.className = "question-row";
                        newRow.setAttribute("data-index", newIdx);
                        newRow.style.display = "flex";
                        newRow.style.flexDirection = "column";
                        newRow.style.gap = "8px";
                        newRow.style.borderBottom = "1px dashed var(--border-color)";
                        newRow.style.paddingBottom = "12px";
                        newRow.style.animation = "fadeIn 0.2s ease";
                        newRow.innerHTML = `
                            <div style="display:flex; gap:12px; align-items:center;">
                                <span style="font-family:monospace; font-weight:bold; color:var(--primary); font-size:12px; width:15px;">Q${newIdx}</span>
                                <input type="text" class="form-input q-text" placeholder="Add validation question..." style="flex:1; height:36px; background-color: var(--bg-secondary); font-size:12px;">
                                <input type="number" class="form-input q-credits" value="5" min="1" max="50" style="width:70px; height:36px; background-color: var(--bg-secondary); font-size:12px;" title="Credit points">
                                <span style="font-size:10px; color:var(--text-tertiary);">Credits</span>
                                <button type="button" onclick="removeQuestionRow(this)" class="btn btn-secondary btn-sm" style="padding:4px 8px; height:36px; color:#ef4444;"><i class="fa-solid fa-trash"></i></button>
                            </div>
                            <div style="display:flex; gap:10px; margin-left:27px;">
                                <input type="text" class="form-input q-optA" placeholder="Option A" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                                <input type="text" class="form-input q-optB" placeholder="Option B" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                                <input type="text" class="form-input q-optC" placeholder="Option C" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                            </div>
                        `;
                        qContainer.appendChild(newRow);
                        reindexQuestions();
                    });
                }

                if (btn) {
                    btn.addEventListener("click", () => {
                        if (!select.value) {
                            alert("Please select a class first!");
                            return;
                        }
                        
                        // Clear previous simulation if active
                        if (simulationInterval) clearInterval(simulationInterval);
                        
                        // Setup Active Code & Timer
                        const randomCodes = ["NET77", "DB99", "VLSI45", "COMP88"];
                        const chosen = randomCodes[Math.floor(Math.random() * randomCodes.length)];
                        activeCode.textContent = chosen;
                        countdownText.textContent = timerInput.value || "10";
                        codeBlock.style.display = "block";
                        
                        // Reset all students
                        for (let i = 1; i <= 5; i++) {
                            const badge = document.getElementById("attBadge" + i);
                            const timeCell = document.getElementById("attTime" + i);
                            const ansCell = document.getElementById("attAns" + i);
                            if (badge) {
                                // Keep student 5 interrupted for simulation start
                                if (i === 5) {
                                    badge.textContent = "Session Interrupted";
                                    badge.style.background = "#f59e0b";
                                    badge.style.color = "white";
                                } else {
                                    badge.textContent = "Absent";
                                    badge.style.background = "rgba(239, 68, 68, 0.15)";
                                    badge.style.color = "#ef4444";
                                }
                            }
                            if (timeCell) timeCell.textContent = "—";
                            if (ansCell) {
                                if (i === 5) {
                                    ansCell.textContent = "Interrupted (Locked out)";
                                    ansCell.style.fontStyle = "italic";
                                    ansCell.style.color = "#ef4444";
                                } else {
                                    ansCell.textContent = "No response yet";
                                    ansCell.style.fontStyle = "italic";
                                    ansCell.style.color = "var(--text-tertiary)";
                                }
                            }
                        }

                        // Read active questions
                        const qRows = qContainer.getElementsByClassName("question-row");
                        const activeQuestions = [];
                        let totalCreditWeight = 0;
                        Array.from(qRows).forEach(row => {
                            const txt = row.querySelector(".q-text").value.trim() || "Validation Question";
                            const cr = parseInt(row.querySelector(".q-credits").value) || 5;
                            const optA = row.querySelector(".q-optA").value.trim() || "";
                            const optB = row.querySelector(".q-optB").value.trim() || "";
                            const optC = row.querySelector(".q-optC").value.trim() || "";
                            activeQuestions.push({ text: txt, credits: cr, optA: optA, optB: optB, optC: optC });
                            totalCreditWeight += cr;
                        });

                        // Publish Dynamic Session to localStorage
                        const activeSession = {
                            code: chosen,
                            lecture: select.value,
                            expiry: timerInput.value,
                            questions: activeQuestions,
                            totalCredits: totalCreditWeight
                        };
                        localStorage.setItem("activeAttendanceSession", JSON.stringify(activeSession));
                        localStorage.removeItem("liveStudentResponses"); // Reset past records

                        // Simulation student answers
                        const mockStudentAnswers = [
                            ["A) Unique & Not Null", "Option A", "A) Self-attention", "Option A", "A) Contiguous"],
                            ["A) Unique & Not Null", "Option A", "A) Gradients", "Option B", "A) LIFO"],
                            ["B) Allows Null", "Option B", "Option A", "Option A", "Option A"],
                            ["A) Unique & Not Null", "Option A", "Option B", "Option A", "Option B"]
                        ];

                        // Simulation check-in (Only students 1-4, student 5 stays interrupted until manually reset!)
                        let studentIndex = 1;
                        simulationInterval = setInterval(() => {
                            // Check if student checked in via student portal, if yes, skip mock simulation
                            const liveResponses = JSON.parse(localStorage.getItem("liveStudentResponses")) || [];
                            
                            if (studentIndex <= 4) {
                                const hasRealResponse = liveResponses.some(r => r.studentName.toLowerCase().includes("vikram") && studentIndex === 1);
                                if (!hasRealResponse) {
                                    toggleStudentAtt(studentIndex);
                                    
                                    // Build responses lists
                                    const ansCell = document.getElementById("attAns" + studentIndex);
                                    if (ansCell) {
                                        let htmlResponse = "<div style='display:flex; flex-direction:column; gap:4px;'>";
                                        activeQuestions.forEach((q, qIdx) => {
                                            const ansText = mockStudentAnswers[studentIndex - 1][qIdx] || q.optA;
                                            htmlResponse += "<div style='margin-bottom:2px;'>" +
                                                "<span style='color:var(--primary); font-weight:700;'>Q" + (qIdx+1) + ":</span> Selected: " + ansText + " " +
                                                "<span style='color:var(--accent); font-size:9px; margin-left:5px;'>(" + q.credits + " Credits)</span>" +
                                            "</div>";
                                        });
                                        htmlResponse += "<div style='border-top:1px dashed var(--border-color); padding-top:4px; font-weight:bold; font-size:10px;'>" +
                                            "Total Earned: <span style='color:#10b981;'>" + totalCreditWeight + " Points</span>" +
                                        "</div>";
                                        htmlResponse += "</div>";
                                        
                                        ansCell.innerHTML = htmlResponse;
                                        ansCell.style.fontStyle = "normal";
                                        ansCell.style.color = "var(--text-secondary)";
                                    }
                                }
                                studentIndex++;
                            } else {
                                clearInterval(simulationInterval);
                            }
                        }, 2000);
                    });
                }

                // Poll localStorage every 1.5 seconds for real student submissions
                setInterval(() => {
                    const activeSession = JSON.parse(localStorage.getItem("activeAttendanceSession"));
                    if (!activeSession) return;

                    const liveResponses = JSON.parse(localStorage.getItem("liveStudentResponses")) || [];
                    liveResponses.forEach(resp => {
                        let targetIndex = 0;
                        if (resp.studentName.toLowerCase().includes("vikram") || resp.studentName.toLowerCase().includes("aditya")) {
                            targetIndex = 1; // Vikram Kumawat maps to row 1
                        }

                        if (targetIndex > 0) {
                            const badge = document.getElementById("attBadge" + targetIndex);
                            const timeCell = document.getElementById("attTime" + targetIndex);
                            const ansCell = document.getElementById("attAns" + targetIndex);
                            
                            if (badge && timeCell && ansCell) {
                                badge.textContent = "Present";
                                badge.style.background = "rgba(16, 185, 129, 0.15)";
                                badge.style.color = "#10b981";
                                timeCell.textContent = resp.time;

                                let htmlResponse = "<div style='display:flex; flex-direction:column; gap:4px;'>";
                                resp.answers.forEach((ansVal, qIdx) => {
                                    htmlResponse += "<div style='margin-bottom:2px;'>" +
                                        "<span style='color:var(--primary); font-weight:700;'>Q" + (qIdx + 1) + ":</span> Selected: " + ansVal +
                                    "</div>";
                                });
                                htmlResponse += "<div style='border-top:1px dashed var(--border-color); padding-top:4px; font-weight:bold; font-size:10px;'>" +
                                    "Total Earned: <span style='color:#10b981;'>" + resp.credits + " Points</span>" +
                                "</div>";
                                htmlResponse += "</div>";

                                ansCell.innerHTML = htmlResponse;
                                ansCell.style.fontStyle = "normal";
                                ansCell.style.color = "var(--text-secondary)";
                            }
                        }
                    });
                }, 1500);
            });
        