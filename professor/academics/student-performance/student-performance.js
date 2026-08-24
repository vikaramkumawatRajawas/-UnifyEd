
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

            function initPerformance() {
                const select = document.getElementById("perfStudentSelect");
                const deptDisplay = document.getElementById("perfDeptDisplay");
                const cgpa = document.getElementById("perfCgpa");
                const attendance = document.getElementById("perfAttendance");
                const assignments = document.getElementById("perfAssignments");
                const backlogs = document.getElementById("perfBacklogs");
                const tableBody = document.getElementById("perfMarksBody");
                const feedbackInput = document.getElementById("mentorFeedbackInput");
                const saveBtn = document.getElementById("saveFeedbackBtn");

                let gpaChart = null;
                let radarChart = null;

                const studentData = {
                    "BCA23015": {
                        name: "Vikram Kumawat",
                        dept: "BCA - 2nd Year (Sem 3)",
                        cgpa: "8.64",
                        att: "92.5%",
                        assign: "12 / 12",
                        backlogs: "0",
                        gpaProg: [8.2, 8.5, 8.64],
                        radar: [90, 85, 92, 88, 95],
                        subjects: [
                            { name: "Database Management Systems", mt1: 18, mt2: 17, prac: 45, ext: 88 },
                            { name: "Data Structures & Algorithms", mt1: 17, mt2: 16, prac: 44, ext: 85 },
                            { name: "Web Technology Lab", mt1: 19, mt2: 18, prac: 47, ext: 90 }
                        ]
                    },
                    "CSE23099": {
                        name: "Priya Sharma",
                        dept: "B.Tech CSE - 2nd Year (Sem 3)",
                        cgpa: "8.12",
                        att: "88.0%",
                        assign: "11 / 12",
                        backlogs: "0",
                        gpaProg: [7.8, 8.0, 8.12],
                        radar: [82, 78, 85, 80, 88],
                        subjects: [
                            { name: "Database Management Systems", mt1: 15, mt2: 16, prac: 42, ext: 78 },
                            { name: "Data Structures & Algorithms", mt1: 14, mt2: 15, prac: 40, ext: 81 },
                            { name: "Digital Electronics", mt1: 16, mt2: 14, prac: 38, ext: 79 }
                        ]
                    },
                    "CSE23115": {
                        name: "Aditya Bose",
                        dept: "B.Tech CSE - 2nd Year (Sem 3)",
                        cgpa: "7.84",
                        att: "81.2%",
                        assign: "10 / 12",
                        backlogs: "0",
                        gpaProg: [7.5, 7.6, 7.84],
                        radar: [75, 72, 80, 78, 82],
                        subjects: [
                            { name: "Database Management Systems", mt1: 14, mt2: 15, prac: 40, ext: 81 },
                            { name: "Data Structures & Algorithms", mt1: 13, mt2: 14, prac: 38, ext: 75 },
                            { name: "Web Technology Lab", mt1: 15, mt2: 16, prac: 41, ext: 78 }
                        ]
                    },
                    "BCA23088": {
                        name: "Neha Sen",
                        dept: "BCA - 2nd Year (Sem 3)",
                        cgpa: "9.28",
                        att: "95.0%",
                        assign: "12 / 12",
                        backlogs: "0",
                        gpaProg: [9.0, 9.1, 9.28],
                        radar: [95, 92, 96, 94, 98],
                        subjects: [
                            { name: "Database Management Systems", mt1: 17, mt2: 19, prac: 46, ext: 92 },
                            { name: "Data Structures & Algorithms", mt1: 19, mt2: 18, prac: 48, ext: 94 },
                            { name: "Web Technology Lab", mt1: 18, mt2: 19, prac: 47, ext: 95 }
                        ]
                    },
                    "CSE23045": {
                        name: "Amit Roy",
                        dept: "B.Tech CSE - 2nd Year (Sem 3)",
                        cgpa: "6.72",
                        att: "72.4%",
                        assign: "9 / 12",
                        backlogs: "1",
                        gpaProg: [6.5, 6.8, 6.72],
                        radar: [60, 65, 70, 58, 68],
                        subjects: [
                            { name: "Database Management Systems", mt1: 12, mt2: 14, prac: 38, ext: 65 },
                            { name: "Data Structures & Algorithms", mt1: 10, mt2: 11, prac: 30, ext: 55 },
                            { name: "Web Technology Lab", mt1: 11, mt2: 12, prac: 35, ext: 60 }
                        ]
                    }
                };

                function updateProfile() {
                    const id = select.value;
                    const data = studentData[id];
                    if (!data) return;

                    deptDisplay.value = data.dept;
                    cgpa.textContent = data.cgpa;
                    attendance.textContent = data.att;
                    assignments.textContent = data.assign;
                    backlogs.textContent = data.backlogs;

                    // Color code attendance health
                    const attVal = parseFloat(data.att);
                    if (attVal < 75) {
                        attendance.style.color = "#ef4444";
                    } else if (attVal < 85) {
                        attendance.style.color = "#f59e0b";
                    } else {
                        attendance.style.color = "#10b981";
                    }

                    // Render subjects marks list
                    tableBody.innerHTML = data.subjects.map(s => {
                        const total = s.mt1 + s.mt2 + s.prac + s.ext;
                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.mt1 + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.mt2 + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.prac + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.ext + '</td>' +
                            '<td style="text-align:center; font-family:monospace; font-weight:700; color:var(--primary);">' + total + '</td>' +
                            '</tr>';
                    }).join("");

                    // Load saved mentor feedback from localStorage
                    const savedFeedback = localStorage.getItem("mentorFeedback_" + id) || "";
                    feedbackInput.value = savedFeedback;

                    // Initialize / Update GPA progression chart
                    renderGpaChart(data.gpaProg);
                    renderRadarChart(data.radar);
                }

                function renderGpaChart(gpaData) {
                    const ctx = document.getElementById("semGpaChart").getContext("2d");
                    if (gpaChart) {
                        gpaChart.destroy();
                    }

                    gpaChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ["Semester 1", "Semester 2", "Semester 3"],
                            datasets: [{
                                label: 'GPA',
                                data: gpaData,
                                borderColor: '#6366f1',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: { min: 4, max: 10 }
                            }
                        }
                    });
                }

                function renderRadarChart(radarData) {
                    const ctx = document.getElementById("courseRadarChart").getContext("2d");
                    if (radarChart) {
                        radarChart.destroy();
                    }

                    radarChart = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: ["Theory Tests", "Programming", "Practicals", "Classroom Activity", "End Sem Exam"],
                            datasets: [{
                                label: 'Subject Performance',
                                data: radarData,
                                borderColor: '#a855f7',
                                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                                borderWidth: 2,
                                fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                r: { min: 0, max: 100 }
                            }
                        }
                    });
                }

                // Bind save button click
                saveBtn.addEventListener("click", () => {
                    const id = select.value;
                    localStorage.setItem("mentorFeedback_" + id, feedbackInput.value);
                    showToast("Success: Mentor feedback remarks updated successfully!");
                });

                select.addEventListener("change", updateProfile);

                // Run initial profile load
                updateProfile();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initPerformance);
            } else {
                initPerformance();
            }
        