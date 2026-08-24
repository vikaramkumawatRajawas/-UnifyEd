
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

            function initGrades() {
                const gridBody = document.getElementById("evaluationGridBody");
                const saveDraftBtn = document.getElementById("saveGradesDraftBtn");
                const publishBtn = document.getElementById("publishGradesBtn");
                const classAvgLabel = document.getElementById("gradeClassAvg");

                // Default grading database
                const defaultGrades = {
                    "BCA23015": { name: "Vikram Kumawat", att: 9.5, assign: 28, quiz: 18, participation: 38 },
                    "CSE23099": { name: "Priya Sharma", att: 8.8, assign: 26, quiz: 15, participation: 34 },
                    "CSE23115": { name: "Aditya Bose", att: 8.1, assign: 24, quiz: 16, participation: 32 },
                    "BCA23088": { name: "Neha Sen", att: 9.8, assign: 29, quiz: 19, participation: 39 },
                    "CSE23045": { name: "Amit Roy", att: 7.2, assign: 18, quiz: 10, participation: 22 }
                };

                // Render grid
                function loadGrades() {
                    const savedDraft = JSON.parse(localStorage.getItem("classroomGradesDraft")) || defaultGrades;

                    let totalGradePoint = 0;
                    const studentKeys = Object.keys(savedDraft);

                    gridBody.innerHTML = studentKeys.map(k => {
                        const s = savedDraft[k];
                        const total = s.att + s.assign + s.quiz + s.participation;
                        
                        let grade = "F";
                        let gradePoint = 0;
                        if (total >= 90) { grade = "A"; gradePoint = 10; }
                        else if (total >= 80) { grade = "B"; gradePoint = 8; }
                        else if (total >= 70) { grade = "C"; gradePoint = 6; }
                        else if (total >= 50) { grade = "D"; gradePoint = 4; }
                        else { grade = "F"; gradePoint = 0; }

                        totalGradePoint += gradePoint;

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + k + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.att + ' <span style="font-size:10px; color:var(--text-tertiary);">/10</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.assign + ' <span style="font-size:10px; color:var(--text-tertiary);">/30</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.quiz + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center;">' +
                                '<input type="number" id="partInput_' + k + '" oninput="recalcRow(\'' + k + '\')" class="form-input" style="height:28px; width:70px; text-align:center; display:inline-block; font-size:11px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-secondary);" min="0" max="40" value="' + s.participation + '">' +
                                '<span style="font-size:11px; color:var(--text-tertiary); margin-left:5px;">/40</span>' +
                            '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace; font-weight:700; color:var(--primary);" id="total_' + k + '">' + total + '</td>' +
                            '<td style="text-align:center;"><span class="grade-badge badge-' + grade + '" id="badge_' + k + '">' + grade + '</span></td>' +
                            '</tr>';
                    }).join("");

                    classAvgLabel.textContent = (totalGradePoint / studentKeys.length).toFixed(2);
                }

                // Recalculate row on keypress/input
                window.recalcRow = function(studentId) {
                    const input = document.getElementById("partInput_" + studentId);
                    const totalLabel = document.getElementById("total_" + studentId);
                    const badge = document.getElementById("badge_" + studentId);

                    const val = parseInt(input.value) || 0;
                    
                    const savedDraft = JSON.parse(localStorage.getItem("classroomGradesDraft")) || defaultGrades;
                    const s = savedDraft[studentId];

                    if (s) {
                        const total = s.att + s.assign + s.quiz + val;
                        totalLabel.textContent = total;

                        let grade = "F";
                        if (total >= 90) grade = "A";
                        else if (total >= 80) grade = "B";
                        else if (total >= 70) grade = "C";
                        else if (total >= 50) grade = "D";
                        else grade = "F";

                        badge.className = "grade-badge badge-" + grade;
                        badge.textContent = grade;
                    }
                };

                // Save draft
                saveDraftBtn.addEventListener("click", () => {
                    const currentDraft = {};
                    const savedDraft = JSON.parse(localStorage.getItem("classroomGradesDraft")) || defaultGrades;

                    Object.keys(savedDraft).forEach(k => {
                        const input = document.getElementById("partInput_" + k);
                        const val = parseInt(input.value) || 0;
                        currentDraft[k] = {
                            name: savedDraft[k].name,
                            att: savedDraft[k].att,
                            assign: savedDraft[k].assign,
                            quiz: savedDraft[k].quiz,
                            participation: val
                        };
                    });

                    localStorage.setItem("classroomGradesDraft", JSON.stringify(currentDraft));
                    showToast("Evaluation draft saved successfully!");
                });

                // Publish
                publishBtn.addEventListener("click", () => {
                    if (!confirm("Are you sure you want to publish final grades to the registry? This will update student portal records.")) return;
                    
                    saveDraftBtn.click(); // Sync first
                    showToast("Success: Course final grades published to registry!");
                });

                loadGrades();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initGrades);
            } else {
                initGrades();
            }
        