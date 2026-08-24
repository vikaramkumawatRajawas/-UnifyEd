
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

            function initMembers() {
                const search = document.getElementById("memberSearch");
                const countLabel = document.getElementById("memberCountLabel");
                const rosterList = document.getElementById("rosterList");

                // Default cohort database
                const defaultCohort = [
                    { id: "BCA23015", name: "Vikram Kumawat", role: "Class Representative", email: "vikram.kumawat@college.edu", status: "Active" },
                    { id: "CSE23099", name: "Priya Sharma", role: "Student", email: "priya.sharma@college.edu", status: "Active" },
                    { id: "CSE23115", name: "Aditya Bose", role: "Student", email: "aditya.bose@college.edu", status: "Active" },
                    { id: "BCA23088", name: "Neha Sen", role: "Student", email: "neha.sen@college.edu", status: "Active" },
                    { id: "CSE23045", name: "Amit Roy", role: "Student", email: "amit.roy@college.edu", status: "Inactive" }
                ];

                function renderRoster() {
                    const localCohort = JSON.parse(localStorage.getItem("classroomCohort")) || defaultCohort;
                    const query = search.value.trim().toLowerCase();

                    const filtered = localCohort.filter(s => 
                        s.name.toLowerCase().includes(query) || 
                        s.id.toLowerCase().includes(query)
                    );

                    countLabel.textContent = filtered.length + " Students";

                    if (filtered.length === 0) {
                        rosterList.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0;">No matching student profiles found.</div>';
                        return;
                    }

                    rosterList.innerHTML = filtered.map(s => {
                        let roleBadge = "";
                        if (s.role === "Class Representative") {
                            roleBadge = '<span style="font-size:9px; background:rgba(99,102,241,0.15); color:var(--primary); padding:2px 6px; border-radius:4px; font-weight:700; margin-left:10px;">CR</span>';
                        }

                        let statusColor = s.status === "Active" ? "#10b981" : "var(--text-tertiary)";

                        return '<div class="roster-row glassmorphism">' +
                            '<div style="display:flex; align-items:center; gap:12px;">' +
                                '<i class="fa-solid fa-circle-user" style="font-size:32px; color:var(--primary);"></i>' +
                                '<div>' +
                                    '<div style="display:flex; align-items:center;">' +
                                        '<strong style="font-size:12px; color:var(--text-primary);">' + s.name + '</strong>' +
                                        roleBadge +
                                    '</div>' +
                                    '<span style="font-size:9px; color:var(--text-tertiary);">' + s.id + ' • ' + s.email + '</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; align-items:center; gap:15px;">' +
                                '<span style="display:flex; align-items:center; gap:5px; font-size:10px; color:var(--text-secondary);">' +
                                    '<span style="width:6px; height:6px; background:' + statusColor + '; border-radius:50%; display:inline-block;"></span> ' + s.status +
                                '</span>' +
                                '<a href="mailto:' + s.email + '" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:11px; padding:6px 12px; border-radius:6px; color:var(--text-secondary); gap:5px;"><i class="fa-regular fa-envelope"></i> Contact</a>' +
                                '<button type="button" class="btn" onclick="removeCohortStudent(\'' + s.id + '\')" style="background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.15); font-size:11px; padding:6px 12px; border-radius:6px; color:#ef4444; gap:5px;"><i class="fa-solid fa-user-minus"></i> Remove</button>' +
                            '</div>' +
                            '</div>';
                    }).join("");
                }

                // Remove cohort student helper
                window.removeCohortStudent = function(studentId) {
                    if (!confirm("Are you sure you want to remove this student from the classroom cohort?")) return;

                    const localCohort = JSON.parse(localStorage.getItem("classroomCohort")) || defaultCohort;
                    const idx = localCohort.findIndex(s => s.id === studentId);

                    if (idx !== -1) {
                        localCohort.splice(idx, 1);
                        localStorage.setItem("classroomCohort", JSON.stringify(localCohort));
                        renderRoster();
                        showToast("Student removed from class registry.");
                    } else {
                        alert("Warning: Core cohort students cannot be removed.");
                    }
                };

                // Add search listener
                search.addEventListener("input", renderRoster);

                renderRoster();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initMembers);
            } else {
                initMembers();
            }
        