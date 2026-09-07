
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

            function initMenteesAndStudents() {
                const menteesRoster = document.getElementById("menteesRosterList");
                const allStudentsRoster = document.getElementById("allStudentsRosterList");
                const allSearch = document.getElementById("allStudSearch");
                const menteesCountLabel = document.getElementById("menteesCount");
                const allCountLabel = document.getElementById("allStudentsCount");

                const formContainer = document.getElementById("studentFormContainer");
                const formTitle = document.getElementById("formTitleText");
                const editIdInput = document.getElementById("editOriginalId");
                const nameInput = document.getElementById("studName");
                const enrollInput = document.getElementById("studEnroll");
                const courseInput = document.getElementById("studCourse");
                const cgpaInput = document.getElementById("studCgpa");
                const attInput = document.getElementById("studAtt");
                const isMenteeSelect = document.getElementById("studIsMentee");
                const saveBtn = document.getElementById("saveStudentBtn");

                // Default cohort database fallback
                const defaultMentees = [
                    { id: "BCA23015", name: "Vikram Kumawat", course: "BCA 2nd Year", cgpa: 9.2, attendance: "96%", status: "ontrack", email: "vikram@college.edu" },
                    { id: "CSE23099", name: "Priya Sharma", course: "B.Tech CSE 2nd Year", cgpa: 8.8, attendance: "92%", status: "ontrack", email: "priya@college.edu" },
                    { id: "CSE23115", name: "Aditya Bose", course: "B.Tech CSE 2nd Year", cgpa: 8.5, attendance: "95%", status: "ontrack", email: "aditya@college.edu" },
                    { id: "CSE23045", name: "Amit Roy", course: "B.Tech CSE 2nd Year", cgpa: 6.2, attendance: "74%", status: "alert", email: "amit.roy@college.edu" }
                ];

                const defaultAll = [
                    { id: "BCA23015", name: "Vikram Kumawat", course: "BCA 2nd Year", cgpa: 9.2, attendance: "96%", isMentee: true, email: "vikram@college.edu" },
                    { id: "CSE23099", name: "Priya Sharma", course: "B.Tech CSE 2nd Year", cgpa: 8.8, attendance: "92%", isMentee: true, email: "priya@college.edu" },
                    { id: "CSE23115", name: "Aditya Bose", course: "B.Tech CSE 2nd Year", cgpa: 8.5, attendance: "95%", isMentee: true, email: "aditya@college.edu" },
                    { id: "BCA23088", name: "Neha Sen", course: "BCA 2nd Year", cgpa: 9.1, attendance: "98%", isMentee: false, email: "neha.sen@college.edu" },
                    { id: "CSE23045", name: "Amit Roy", course: "B.Tech CSE 2nd Year", cgpa: 6.2, attendance: "74%", isMentee: true, email: "amit.roy@college.edu" },
                    { id: "BCA23044", name: "Rahul Verma", course: "BCA 2nd Year", cgpa: 7.8, attendance: "85%", isMentee: false, email: "rahul.v@college.edu" },
                    { id: "CSE23012", name: "Sneha Kapoor", course: "B.Tech CSE 2nd Year", cgpa: 8.4, attendance: "89%", isMentee: false, email: "sneha.k@college.edu" },
                    { id: "BCA23019", name: "Rohan Das", course: "BCA 2nd Year", cgpa: 6.9, attendance: "72%", isMentee: false, email: "rohan.das@college.edu" }
                ];

                // Load custom list or default list
                function getMentees() {
                    return JSON.parse(localStorage.getItem("assignedMenteesList")) || defaultMentees;
                }

                function getAllStudents() {
                    return JSON.parse(localStorage.getItem("allClassroomStudentsList")) || defaultAll;
                }

                function saveLists(mentees, all) {
                    localStorage.setItem("assignedMenteesList", JSON.stringify(mentees));
                    localStorage.setItem("allClassroomStudentsList", JSON.stringify(all));
                }

                // Render Assigned Mentees list
                function renderMentees() {
                    const mentees = getMentees();
                    menteesCountLabel.textContent = mentees.length;
                    menteesRoster.innerHTML = mentees.map(m => {
                        let badgeBg = m.status === "ontrack" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)";
                        let badgeColor = m.status === "ontrack" ? "#10b981" : "#ef4444";
                        let statusText = m.status === "ontrack" ? "On Track" : "Alert";

                        return '<div class="student-row-card glassmorphism">' +
                            '<button type="button" class="student-edit-btn" onclick="openEditForm(\'' + m.id + '\')" title="Edit Profile"><i class="fa-solid fa-user-gear"></i> Edit</button>' +
                            '<div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;">' +
                                '<div style="display:flex; align-items:center; gap:10px;">' +
                                    '<i class="fa-solid fa-circle-user" style="font-size:28px; color:var(--primary);"></i>' +
                                    '<div>' +
                                        '<strong style="font-size:12px; color:var(--text-primary);">' + m.name + '</strong>' +
                                        '<p style="margin:2px 0 0 0; font-size:9px; color:var(--text-tertiary);">' + m.id + '</p>' +
                                    '</div>' +
                                '</div>' +
                                '<span style="font-size:8px; background:' + badgeBg + '; color:' + badgeColor + '; padding:2px 6px; border-radius:10px; font-weight:700; text-transform:uppercase;">' + statusText + '</span>' +
                            '</div>' +
                            '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:8px; margin-top:8px;">' +
                                '<span style="font-size:10px; color:var(--text-secondary);">CGPA: <strong>' + m.cgpa + '</strong></span>' +
                                '<span style="font-size:10px; color:var(--text-secondary);">Attendance: <strong style="color:' + (parseInt(m.attendance) < 75 ? "#ef4444" : "var(--text-primary)") + ';">' + m.attendance + '</strong></span>' +
                            '</div>' +
                            '<div style="display:flex; gap:8px; margin-top:10px;">' +
                                '<button type="button" onclick="viewStudentPerformance(\'' + m.id + '\')" class="btn btn-primary" style="flex:1; background-image:linear-gradient(135deg, var(--primary), var(--accent)); font-size:10px; padding:5px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-chart-line"></i> Performance</button>' +
                                '<button type="button" onclick="openEditForm(\'' + m.id + '\')" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);" title="Edit details"><i class="fa-solid fa-pen-to-square"></i></button>' +
                                '<a href="mailto:' + m.email + '" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);"><i class="fa-regular fa-envelope"></i></a>' +
                            '</div>' +
                            '</div>';
                    }).join("");
                }

                // Render All Classroom Students
                function renderAllStudents() {
                    const allList = getAllStudents();
                    const query = allSearch.value.trim().toLowerCase();
                    const filtered = allList.filter(s => s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query));

                    allCountLabel.textContent = allList.length;

                    if (filtered.length === 0) {
                        allStudentsRoster.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0; font-size:11px;">No students match query.</div>';
                        return;
                    }

                    allStudentsRoster.innerHTML = filtered.map(s => {
                        let menteeBadge = s.isMentee ? '<span style="font-size:8px; background:rgba(99,102,241,0.15); color:var(--primary); padding:2px 6px; border-radius:4px; font-weight:700; margin-left:8px;">MENTEE</span>' : "";

                        let menteeActionBtn = s.isMentee 
                            ? '<button type="button" onclick="toggleMenteeStatus(\'' + s.id + '\')" class="btn" style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); color:#10b981; font-size:10px; padding:5px 8px; border-radius:4px; font-weight:700; display:inline-flex; align-items:center; gap:4px;" title="Click to remove from Mentees"><i class="fa-solid fa-user-check"></i> Mentee</button>'
                            : '<button type="button" onclick="toggleMenteeStatus(\'' + s.id + '\')" class="btn btn-primary" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); font-size:10px; padding:5px 10px; border-radius:4px; font-weight:600; border:none; display:inline-flex; align-items:center; gap:4px; white-space:nowrap;" title="Add student to My Mentees group"><i class="fa-solid fa-user-plus"></i> Add to Mentees</button>';

                        return '<div class="student-row-card glassmorphism">' +
                            '<div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;">' +
                                '<div style="display:flex; align-items:center; gap:10px;">' +
                                    '<i class="fa-solid fa-circle-user" style="font-size:28px; color:var(--text-tertiary);"></i>' +
                                    '<div>' +
                                        '<div style="display:flex; align-items:center;">' +
                                            '<strong style="font-size:12px; color:var(--text-primary);">' + s.name + '</strong>' +
                                            menteeBadge +
                                        '</div>' +
                                        '<p style="margin:2px 0 0 0; font-size:9px; color:var(--text-tertiary);">' + s.id + ' • ' + s.course + '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:8px; margin-top:8px;">' +
                                '<span style="font-size:10px; color:var(--text-secondary);">CGPA: <strong>' + s.cgpa + '</strong></span>' +
                                '<span style="font-size:10px; color:var(--text-secondary);">Attendance: <strong>' + s.attendance + '</strong></span>' +
                            '</div>' +
                            '<div style="display:flex; gap:8px; margin-top:10px; align-items:center;">' +
                                '<button type="button" onclick="viewStudentPerformance(\'' + s.id + '\')" class="btn" style="flex:1; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px; border-radius:4px; color:var(--text-primary); font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-chart-line"></i> Performance</button>' +
                                '<button type="button" onclick="openEditForm(\'' + s.id + '\')" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);" title="Edit details"><i class="fa-solid fa-pen-to-square"></i></button>' +
                                '<a href="mailto:' + s.email + '" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);"><i class="fa-regular fa-envelope"></i></a>' +
                                menteeActionBtn +
                            '</div>' +
                            '</div>';
                    }).join("");
                }

                // Toggle Mentee status for a student from Directory
                window.toggleMenteeStatus = function(studentId) {
                    let mentees = getMentees();
                    let allStudents = getAllStudents();

                    const studIndex = allStudents.findIndex(s => s.id === studentId);
                    if (studIndex === -1) return;

                    const student = allStudents[studIndex];
                    student.isMentee = !student.isMentee;

                    if (student.isMentee) {
                        if (!mentees.some(m => m.id === studentId)) {
                            mentees.push({
                                id: student.id,
                                name: student.name,
                                course: student.course,
                                cgpa: student.cgpa,
                                attendance: student.attendance,
                                status: (parseFloat(student.attendance) < 75 || parseFloat(student.cgpa) < 7.0) ? "alert" : "ontrack",
                                email: student.email
                            });
                        }
                        if (typeof window.showToast === "function") {
                            window.showToast(`${student.name} added to My Mentees group!`, "success");
                        }
                    } else {
                        mentees = mentees.filter(m => m.id !== studentId);
                        if (typeof window.showToast === "function") {
                            window.showToast(`${student.name} removed from Mentees group`, "info");
                        }
                    }

                    saveLists(mentees, allStudents);
                    renderMentees();
                    renderAllStudents();
                };

                // Global handlers for opening Form
                window.openAddForm = function() {
                    formContainer.style.display = "block";
                    formTitle.textContent = "Add New Student / Mentee";
                    editIdInput.value = "";
                    nameInput.value = "";
                    enrollInput.value = "";
                    courseInput.value = "BCA 2nd Year";
                    cgpaInput.value = "8.0";
                    attInput.value = "85%";
                    isMenteeSelect.value = "yes";
                    nameInput.focus();
                };

                window.openEditForm = function(studentId) {
                    formContainer.style.display = "block";
                    formTitle.textContent = "Edit Student Details";
                    
                    const allList = getAllStudents();
                    const s = allList.find(x => x.id === studentId);

                    if (s) {
                        editIdInput.value = s.id;
                        nameInput.value = s.name;
                        enrollInput.value = s.id;
                        courseInput.value = s.course;
                        cgpaInput.value = s.cgpa;
                        attInput.value = s.attendance;
                        isMenteeSelect.value = s.isMentee ? "yes" : "no";
                        nameInput.focus();
                    }
                };

                window.toggleStudentForm = function(show) {
                    formContainer.style.display = show ? "block" : "none";
                };

                // Add or edit saving logic
                saveBtn.addEventListener("click", () => {
                    const name = nameInput.value.trim();
                    const enroll = enrollInput.value.trim();
                    const course = courseInput.value.trim();
                    const cgpa = parseFloat(cgpaInput.value) || 0;
                    const att = attInput.value.trim();
                    const isMentee = isMenteeSelect.value === "yes";
                    const editId = editIdInput.value;

                    if (!name || !enroll) {
                        alert("Name and Enrollment ID are required fields.");
                        return;
                    }

                    let mentees = getMentees();
                    let allList = getAllStudents();

                    if (editId) {
                        // Edit flow
                        allList = allList.map(s => {
                            if (s.id === editId) {
                                return { id: enroll, name, course, cgpa, attendance: att, isMentee, email: enroll.toLowerCase() + "@college.edu" };
                            }
                            return s;
                        });

                        mentees = mentees.map(m => {
                            if (m.id === editId) {
                                return { id: enroll, name, course, cgpa, attendance: att, status: cgpa < 7.5 ? "alert" : "ontrack", email: enroll.toLowerCase() + "@college.edu" };
                            }
                            return m;
                        });

                        // If mentorship status changed from No to Yes
                        if (isMentee && !mentees.some(m => m.id === enroll)) {
                            mentees.unshift({ id: enroll, name, course, cgpa, attendance: att, status: cgpa < 7.5 ? "alert" : "ontrack", email: enroll.toLowerCase() + "@college.edu" });
                        }
                        // If mentorship status changed from Yes to No
                        if (!isMentee) {
                            mentees = mentees.filter(m => m.id !== enroll);
                        }
                    } else {
                        // Create flow
                        const newStudent = { id: enroll, name, course, cgpa, attendance: att, isMentee, email: enroll.toLowerCase() + "@college.edu" };
                        allList.unshift(newStudent);

                        if (isMentee) {
                            mentees.unshift({ id: enroll, name, course, cgpa, attendance: att, status: cgpa < 7.5 ? "alert" : "ontrack", email: enroll.toLowerCase() + "@college.edu" });
                        }
                    }

                    saveLists(mentees, allList);
                    formContainer.style.display = "none";
                    renderMentees();
                    renderAllStudents();
                    showToast("Student details synced successfully!");
                });

                // Redirect helper to Student Performance page
                window.viewStudentPerformance = function(studentId) {
                    localStorage.setItem("selectedStudentPerformanceId", studentId);
                    
                    // Trigger sidebar navigation to student-performance
                    const performanceLink = document.querySelector('a[href*="student-performance"]');
                    if (performanceLink) {
                        performanceLink.click();
                    } else {
                        window.location.href = "../../academics/student-performance/student-performance.html";
                    }
                };

                allSearch.addEventListener("input", renderAllStudents);

                renderMentees();
                renderAllStudents();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initMenteesAndStudents);
            } else {
                initMenteesAndStudents();
            }
        