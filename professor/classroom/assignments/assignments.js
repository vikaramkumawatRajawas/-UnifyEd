
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

            function initAssignments() {
                const titleInput = document.getElementById("assignTitle");
                const dateInput = document.getElementById("assignDueDate");
                const maxMarksInput = document.getElementById("assignMaxMarks");
                const instText = document.getElementById("assignInstructions");
                const createBtn = document.getElementById("createAssignBtn");
                const assignList = document.getElementById("activeAssignList");

                const gradingPanel = document.getElementById("gradingPanel");
                const gradingPanelTitle = document.getElementById("gradingPanelTitle");
                const gradingMaxMarksLabel = document.getElementById("gradingMaxMarksLabel");
                const gradingGridBody = document.getElementById("gradingGridBody");

                let selectedAssignId = null;

                // Set default datetime to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(23, 59, 0, 0);
                dateInput.value = tomorrow.toISOString().slice(0, 16);

                // Default active assignments
                const defaultAssignments = [
                    { id: 1, title: "Assignment 1: Entity Relationship Diagrams", maxMarks: 50, due: "Passed (10 Aug)", submitted: 5, total: 5 },
                    { id: 2, title: "Assignment 2: Schema Normalization & Keys", maxMarks: 50, due: "Passed (18 Aug)", submitted: 4, total: 5 },
                    { id: 3, title: "Assignment 3: Relational Algebra & Calculus", maxMarks: 50, due: "Due Monday, 11:59 PM", submitted: 2, total: 5 }
                ];

                // Mock students database for submissions
                const mockSubmissions = {
                    "BCA23015": { name: "Vikram Kumawat", status: "Submitted", file: "vikram_dbms_assign.pdf", marks: 46 },
                    "CSE23099": { name: "Priya Sharma", status: "Submitted", file: "priya_sharma_er.pdf", marks: 44 },
                    "CSE23115": { name: "Aditya Bose", status: "Submitted", file: "aditya_b_assign.pdf", marks: null },
                    "BCA23088": { name: "Neha Sen", status: "Submitted", file: "neha_er_model.pdf", marks: 49 },
                    "CSE23045": { name: "Amit Roy", status: "Not Submitted", file: "", marks: 0 }
                };

                // Populate assignments list
                function renderAssignments() {
                    const localAssigns = JSON.parse(localStorage.getItem("classroomAssignments")) || [];
                    const fullList = [...localAssigns, ...defaultAssignments];

                    if (fullList.length === 0) {
                        assignList.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0;">No active assignments assigned to the class.</div>';
                        return;
                    }

                    assignList.innerHTML = fullList.map(a => {
                        return '<div class="assign-item-card glassmorphism">' +
                            '<div>' +
                                '<h4 style="margin:0; font-size:12px; font-weight:700; color:var(--text-primary);">' + a.title + '</h4>' +
                                '<span style="font-size:10px; color:var(--text-tertiary); display:block; margin-top:4px;">' + a.due + ' • Max Marks: ' + a.maxMarks + '</span>' +
                            '</div>' +
                            '<div style="display:flex; gap:10px; align-items:center;">' +
                                '<span style="font-size:11px; color:var(--text-secondary);">' + a.submitted + ' / ' + a.total + ' Turned In</span>' +
                                '<button type="button" class="btn" onclick="openGradingPanel(' + a.id + ', \'' + a.title.replace(/'/g, "\'") + '\', ' + a.maxMarks + ')" style="background:rgba(99,102,241,0.1); color:var(--primary); font-size:11px; padding:6px 12px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-circle-check"></i> Evaluate</button>' +
                                '<button type="button" class="material-delete-btn" onclick="deleteAssignment(' + a.id + ')" style="position:static; display:block; padding:6px; color:var(--text-tertiary);"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Create assignment action
                createBtn.addEventListener("click", () => {
                    const title = titleInput.value.trim();
                    const dueVal = dateInput.value;
                    const maxMarks = parseInt(maxMarksInput.value);
                    const instructions = instText.value.trim();

                    if (!title) {
                        alert("Please specify assignment title.");
                        return;
                    }

                    const localAssigns = JSON.parse(localStorage.getItem("classroomAssignments")) || [];
                    const newAssign = {
                        id: Date.now(),
                        title: title,
                        maxMarks: maxMarks,
                        due: "Due " + new Date(dueVal).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
                        submitted: 0,
                        total: 5
                    };

                    localAssigns.unshift(newAssign);
                    localStorage.setItem("classroomAssignments", JSON.stringify(localAssigns));

                    titleInput.value = "";
                    instText.value = "";
                    maxMarksInput.value = "50";

                    renderAssignments();
                    showToast("Success: New Assignment assigned to students!");
                });

                // Delete assignment
                window.deleteAssignment = function(id) {
                    if (!confirm("Are you sure you want to delete this assignment and its submissions?")) return;

                    const localAssigns = JSON.parse(localStorage.getItem("classroomAssignments")) || [];
                    const idx = localAssigns.findIndex(a => a.id === id);

                    if (idx !== -1) {
                        localAssigns.splice(idx, 1);
                        localStorage.setItem("classroomAssignments", JSON.stringify(localAssigns));
                        renderAssignments();
                        gradingPanel.style.display = "none";
                        showToast("Assignment removed.");
                    } else {
                        alert("Warning: Default active assignments cannot be removed.");
                    }
                };

                // Open grading grid
                window.openGradingPanel = function(id, title, maxMarks) {
                    selectedAssignId = id;
                    gradingPanel.style.display = "block";
                    gradingPanelTitle.innerHTML = '<i class="fa-solid fa-edit"></i> Evaluating: ' + title;
                    gradingMaxMarksLabel.textContent = "Max Marks: " + maxMarks;

                    // Load saved student assignment grades from localStorage
                    const gradeKey = "assignGrades_" + id;
                    const savedGrades = JSON.parse(localStorage.getItem(gradeKey)) || {};

                    const studentKeys = Object.keys(mockSubmissions);
                    gradingGridBody.innerHTML = studentKeys.map(k => {
                        const s = mockSubmissions[k];
                        // If student marks already saved, use them. Otherwise default mock.
                        const currentMarks = savedGrades[k] !== undefined ? savedGrades[k] : (s.marks !== null ? s.marks : "");
                        
                        let statusBadge = "";
                        if (s.status === "Submitted") {
                            statusBadge = '<span style="font-size:10px; background:rgba(16,185,129,0.12); color:#10b981; padding:2px 6px; border-radius:4px; font-weight:600;"><i class="fa-solid fa-file-pdf"></i> ' + s.file + '</span>';
                        } else {
                            statusBadge = '<span style="font-size:10px; background:rgba(239,68,68,0.12); color:#ef4444; padding:2px 6px; border-radius:4px; font-weight:600;">Not Submitted</span>';
                        }

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + k + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color);">' + statusBadge + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center;">' +
                                '<input type="number" id="gradeMarks_' + k + '" class="form-input" style="height:28px; width:70px; text-align:center; display:inline-block; font-size:11px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-secondary);" min="0" max="' + maxMarks + '" value="' + currentMarks + '">' +
                                '<span style="font-size:11px; color:var(--text-tertiary); margin-left:5px;">/ ' + maxMarks + '</span>' +
                            '</td>' +
                            '<td style="text-align:center;">' +
                                '<button type="button" onclick="saveStudentGrade(\'' + k + '\')" class="btn btn-primary" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:4px 8px; font-size:11px; border-radius:4px; border:none;"><i class="fa-solid fa-save"></i> Save</button>' +
                            '</td>' +
                            '</tr>';
                    }).join("");
                };

                // Save student grade helper
                window.saveStudentGrade = function(studentId) {
                    const marksInput = document.getElementById("gradeMarks_" + studentId);
                    const marks = marksInput.value.trim();

                    if (marks === "") {
                        alert("Please specify evaluation marks.");
                        return;
                    }

                    const gradeKey = "assignGrades_" + selectedAssignId;
                    const savedGrades = JSON.parse(localStorage.getItem(gradeKey)) || {};
                    savedGrades[studentId] = parseInt(marks);
                    localStorage.setItem(gradeKey, JSON.stringify(savedGrades));

                    showToast("Grade updated for student profile.");
                };

                renderAssignments();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initAssignments);
            } else {
                initAssignments();
            }
        