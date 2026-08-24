/**
 * UNIFYED HOD EXECUTIVE DASHBOARD - FULL INTERACTIVE CONTROLLER
 */
(function () {
    // Default initial state setup in localStorage
    const defaultState = {
        faculty: [
            { id: 1, name: "Dr. Rajesh Kumar", designation: "Senior Professor & HOD", classes: "CSE-3A, BCA-5B", attendance: "96.2%", status: "Active", avatar: "RK" },
            { id: 2, name: "Prof. Meera Patel", designation: "Associate Professor", classes: "CSE-4B, MCA-2A", attendance: "94.8%", status: "Active", avatar: "MP" },
            { id: 3, name: "Dr. Kevin Anderson", designation: "Assistant Professor", classes: "BCA-3A, B.Tech-5A", attendance: "93.5%", status: "Active", avatar: "KA" },
            { id: 4, name: "Dr. Ananya Sharma", designation: "Associate Professor", classes: "CSE-2B, M.Tech-1A", attendance: "97.0%", status: "Active", avatar: "AS" }
        ],
        syllabi: [
            { id: 101, subject: "Database Management Systems", lead: "Prof. Meera Patel", status: "Pending Review", code: "CSE-304", credits: "4.0" },
            { id: 102, subject: "Advanced Web Development", lead: "Dr. Rajesh Kumar", status: "Approved", code: "CSE-402", credits: "3.5" },
            { id: 103, subject: "Data Structures & Algorithms", lead: "Dr. Kevin Anderson", status: "In Progress", code: "CSE-201", credits: "4.0" },
            { id: 104, subject: "Artificial Intelligence & ML", lead: "Dr. Ananya Sharma", status: "Pending Review", code: "CSE-501", credits: "4.0" }
        ],
        bulletins: [
            { id: 201, title: "Autumn Mid-Term Schedule Approved", category: "academic", text: "Final exam timetable published to faculty board.", time: "2 hours ago" },
            { id: 202, title: "Faculty Performance Review Completed", category: "event", text: "Annual appraisal logs submitted to Registrar.", time: "1 day ago" },
            { id: 203, title: "Departmental Council Assembly", category: "meeting", text: "Monthly faculty council meeting scheduled for Friday at 3 PM.", time: "3 days ago" }
        ],
        notifications: [
            { id: 301, title: "New Syllabus Submission", desc: "Prof. Meera Patel submitted DBMS syllabus for audit.", time: "10 mins ago", unread: true },
            { id: 302, title: "Leave Request Approved", desc: "Dr. Kevin Anderson requested 2 days casual leave.", time: "1 hour ago", unread: true },
            { id: 303, title: "Academic Audit Complete", desc: "Registrar verified CSE Autumn Term report.", time: "5 hours ago", unread: true },
            { id: 304, title: "Student Council Election", desc: "Nomination forms received for CSE department.", time: "1 day ago", unread: false }
        ],
        kpis: {
            students: 620,
            gpa: "8.6 / 10",
            attendance: "94.8%"
        }
    };

    // Load state from localStorage or initialize defaults
    function getHODState() {
        const saved = localStorage.getItem("hod_dashboard_state");
        if (!saved) {
            localStorage.setItem("hod_dashboard_state", JSON.stringify(defaultState));
            return defaultState;
        }
        try {
            return JSON.parse(saved);
        } catch (e) {
            return defaultState;
        }
    }

    function saveHODState(state) {
        localStorage.setItem("hod_dashboard_state", JSON.stringify(state));
    }

    let state = getHODState();
    let currentSyllabusAuditId = null;

    // Toast Notification Manager
    function showToast(message, type = "success") {
        const container = document.getElementById("toastContainer");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast-alert ${type}`;
        
        let iconClass = "fa-circle-check";
        if (type === "warning") iconClass = "fa-triangle-exclamation";
        if (type === "danger") iconClass = "fa-circle-xmark";

        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(50px)";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Modal Helper Utilities
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("active");
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    }

    // Dynamic Renderers
    function renderFacultyRoster() {
        const tbody = document.getElementById("facultyRosterTbody");
        if (!tbody) return;

        tbody.innerHTML = state.faculty.map(prof => `
            <tr>
                <td>
                    <div class="faculty-info-cell">
                        <div class="faculty-avatar-circle">${prof.avatar || 'DR'}</div>
                        <div>
                            <strong>${prof.name}</strong><br>
                            <span style="font-size:11px; color:var(--text-tertiary);">${prof.designation}</span>
                        </div>
                    </div>
                </td>
                <td>${prof.classes}</td>
                <td><span class="badge badge-success">${prof.attendance}</span></td>
                <td><span class="badge badge-primary">${prof.status}</span></td>
            </tr>
        `).join("");

        const kpiFacultyVal = document.getElementById("kpiFacultyVal");
        if (kpiFacultyVal) kpiFacultyVal.textContent = state.faculty.length;

        const auditFacultyCount = document.getElementById("auditFacultyCount");
        if (auditFacultyCount) auditFacultyCount.textContent = `${state.faculty.length} Professors`;
    }

    function renderSyllabusReviews() {
        const tbody = document.getElementById("syllabusReviewTbody");
        if (!tbody) return;

        tbody.innerHTML = state.syllabi.map(item => {
            let badgeClass = "badge-warning";
            if (item.status === "Approved") badgeClass = "badge-success";
            if (item.status === "Revision Required") badgeClass = "badge-danger";
            if (item.status === "In Progress") badgeClass = "badge-primary";

            return `
                <tr>
                    <td><strong>${item.subject}</strong><br><span style="font-size:10px; color:var(--text-tertiary);">${item.code || ''}</span></td>
                    <td>${item.lead}</td>
                    <td><span class="badge ${badgeClass}">${item.status}</span></td>
                    <td>
                        <button type="button" class="btn btn-secondary btn-audit-syllabus" data-id="${item.id}" style="padding:4px 10px; font-size:11px;">
                            ${item.status === 'Approved' ? '<i class="fa-solid fa-eye"></i> View' : '<i class="fa-solid fa-file-signature"></i> Audit'}
                        </button>
                    </td>
                </tr>
            `;
        }).join("");

        // Attach click triggers for Syllabus Audit Modal
        document.querySelectorAll(".btn-audit-syllabus").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                openSyllabusAuditModal(id);
            });
        });
    }

    function openSyllabusAuditModal(id) {
        const item = state.syllabi.find(s => s.id === id);
        if (!item) return;

        currentSyllabusAuditId = id;
        document.getElementById("syllabusSubjectName").textContent = item.subject;
        document.getElementById("syllabusLeadName").textContent = item.lead;
        document.getElementById("syllabusReviewRemarks").value = "";
        openModal("syllabusModal");
    }

    function renderBulletins() {
        const feed = document.getElementById("bulletinFeedList");
        if (!feed) return;

        feed.innerHTML = state.bulletins.map(b => `
            <div class="bulletin-card-item">
                <span class="bulletin-category-pill ${b.category || 'academic'}">${b.category || 'NOTICE'}</span>
                <strong style="display:block; font-size:13px; color:var(--text-primary);">${b.title}</strong>
                <p style="font-size:11px; color:var(--text-secondary); margin-top:2px;">${b.text}</p>
                <span style="font-size:10px; color:var(--text-tertiary); display:block; margin-top:4px;"><i class="fa-regular fa-clock"></i> ${b.time}</span>
            </div>
        `).join("");
    }

    function renderNotifications() {
        const container = document.getElementById("notificationListContainer");
        const badge = document.getElementById("notificationCountBadge");
        if (!container) return;

        const unreadCount = state.notifications.filter(n => n.unread).length;
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? "flex" : "none";
        }

        container.innerHTML = state.notifications.length === 0 
            ? `<div style="padding:16px; text-align:center; color:var(--text-tertiary); font-size:12px;">No department notifications</div>`
            : state.notifications.map(n => `
                <div class="notification-item ${n.unread ? 'unread' : ''}" data-id="${n.id}">
                    <div class="notification-item-icon"><i class="fa-solid fa-bell"></i></div>
                    <div class="notification-item-content">
                        <div class="notification-item-title">${n.title}</div>
                        <div class="notification-item-desc">${n.desc}</div>
                        <div class="notification-item-time">${n.time}</div>
                    </div>
                </div>
            `).join("");
    }

    function renderKPIs() {
        const kpiStudentVal = document.getElementById("kpiStudentVal");
        const kpiGpaVal = document.getElementById("kpiGpaVal");
        const kpiAttendanceVal = document.getElementById("kpiAttendanceVal");

        if (kpiStudentVal) kpiStudentVal.textContent = state.kpis.students;
        if (kpiGpaVal) kpiGpaVal.textContent = state.kpis.gpa;
        if (kpiAttendanceVal) kpiAttendanceVal.textContent = state.kpis.attendance;
    }

    // Attach Event Listeners on DOM Loaded
    document.addEventListener("DOMContentLoaded", () => {
        // Initial Render
        renderFacultyRoster();
        renderSyllabusReviews();
        renderBulletins();
        renderNotifications();
        renderKPIs();

        // Theme Toggle
        const themeToggleBtn = document.getElementById("themeToggleBtn");
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener("click", () => {
                const active = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", active);
                localStorage.setItem("theme", active);
                showToast(`Switched to ${active} mode`, "info");
            });
        }

        // Sidebar Navigation Toggles
        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");
        if (menuToggle && sidebar) {
            menuToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                sidebar.classList.toggle("active");
            });
        }

        const desktopSidebarToggle = document.getElementById("desktopSidebarToggle");
        const portalLayout = document.querySelector(".portal-layout");
        if (desktopSidebarToggle && portalLayout) {
            desktopSidebarToggle.addEventListener("click", () => {
                portalLayout.classList.toggle("sidebar-collapsed");
            });
        }

        // Profile Menu Dropdown
        const profileTrigger = document.getElementById("portalProfileTrigger");
        const profileMenu = document.getElementById("profileMenu");
        if (profileTrigger && profileMenu) {
            profileTrigger.addEventListener("click", (e) => {
                e.stopPropagation();
                profileMenu.classList.toggle("open");
            });
        }

        // Notifications Popover Toggle
        const bellBtn = document.getElementById("notificationBellBtn");
        const popover = document.getElementById("notificationPopover");
        if (bellBtn && popover) {
            bellBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                popover.classList.toggle("active");
            });
        }

        // Click outside closes popovers & menus
        document.addEventListener("click", (e) => {
            if (profileMenu && !profileMenu.contains(e.target) && e.target !== profileTrigger) {
                profileMenu.classList.remove("open");
            }
            if (popover && !popover.contains(e.target) && e.target !== bellBtn) {
                popover.classList.remove("active");
            }
        });

        // Mark all notifications read
        const btnMarkRead = document.getElementById("btnMarkNotificationsRead");
        if (btnMarkRead) {
            btnMarkRead.addEventListener("click", () => {
                state.notifications.forEach(n => n.unread = false);
                saveHODState(state);
                renderNotifications();
                showToast("All notifications marked as read");
            });
        }

        // Modal Close Buttons
        document.querySelectorAll("[data-close-modal]").forEach(btn => {
            btn.addEventListener("click", function () {
                const targetId = this.getAttribute("data-close-modal");
                closeModal(targetId);
            });
        });

        // Modal Triggers
        const btnPostBulletinTrigger = document.getElementById("btnPostBulletinTrigger");
        const btnQuickPostBulletin = document.getElementById("btnQuickPostBulletin");
        const cmdPostBulletin = document.getElementById("cmdPostBulletin");
        [btnPostBulletinTrigger, btnQuickPostBulletin, cmdPostBulletin].forEach(btn => {
            if (btn) btn.addEventListener("click", () => openModal("bulletinModal"));
        });

        const btnAddFacultyTrigger = document.getElementById("btnAddFacultyTrigger");
        const cmdAddFaculty = document.getElementById("cmdAddFaculty");
        [btnAddFacultyTrigger, cmdAddFaculty].forEach(btn => {
            if (btn) btn.addEventListener("click", () => openModal("facultyModal"));
        });

        const btnExportReportTrigger = document.getElementById("btnExportReportTrigger");
        if (btnExportReportTrigger) {
            btnExportReportTrigger.addEventListener("click", () => openModal("auditModal"));
        }

        // Bulletin Form Submission
        const bulletinForm = document.getElementById("bulletinForm");
        if (bulletinForm) {
            bulletinForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const title = document.getElementById("bulletinTitle").value.trim();
                const category = document.getElementById("bulletinCategory").value;
                const text = document.getElementById("bulletinDetails").value.trim();

                if (!title || !text) return;

                const newBulletin = {
                    id: Date.now(),
                    title: title,
                    category: category,
                    text: text,
                    time: "Just now"
                };

                state.bulletins.unshift(newBulletin);

                // Add to notifications as well
                state.notifications.unshift({
                    id: Date.now(),
                    title: "Bulletin Published",
                    desc: title,
                    time: "Just now",
                    unread: true
                });

                saveHODState(state);
                renderBulletins();
                renderNotifications();
                closeModal("bulletinModal");
                bulletinForm.reset();
                showToast("Department Bulletin posted successfully!", "success");
            });
        }

        // Faculty Form Submission
        const facultyForm = document.getElementById("facultyForm");
        if (facultyForm) {
            facultyForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("profName").value.trim();
                const designation = document.getElementById("profDesignation").value;
                const classes = document.getElementById("profClasses").value.trim();

                if (!name || !classes) return;

                const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

                const newProf = {
                    id: Date.now(),
                    name: name,
                    designation: designation,
                    classes: classes,
                    attendance: "98.0%",
                    status: "Active",
                    avatar: initials
                };

                state.faculty.push(newProf);
                saveHODState(state);
                renderFacultyRoster();
                closeModal("facultyModal");
                facultyForm.reset();
                showToast(`Prof. ${name} added to Department Roster!`, "success");
            });
        }

        // Syllabus Audit Approval & Revision Handlers
        const btnSyllabusApprove = document.getElementById("btnSyllabusApprove");
        const btnSyllabusReject = document.getElementById("btnSyllabusReject");

        if (btnSyllabusApprove) {
            btnSyllabusApprove.addEventListener("click", () => {
                if (!currentSyllabusAuditId) return;
                const item = state.syllabi.find(s => s.id === currentSyllabusAuditId);
                if (item) {
                    item.status = "Approved";
                    saveHODState(state);
                    renderSyllabusReviews();
                    closeModal("syllabusModal");
                    showToast(`Syllabus for ${item.subject} APPROVED!`, "success");
                }
            });
        }

        if (btnSyllabusReject) {
            btnSyllabusReject.addEventListener("click", () => {
                if (!currentSyllabusAuditId) return;
                const item = state.syllabi.find(s => s.id === currentSyllabusAuditId);
                if (item) {
                    item.status = "Revision Required";
                    saveHODState(state);
                    renderSyllabusReviews();
                    closeModal("syllabusModal");
                    showToast(`Revision requested for ${item.subject}`, "warning");
                }
            });
        }

        // Live Search Filter Across Tables & Cards
        const searchInput = document.getElementById("portalSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const query = this.value.trim().toLowerCase();
                
                document.querySelectorAll("#facultyRosterTbody tr").forEach(row => {
                    row.style.display = query && !row.textContent.toLowerCase().includes(query) ? "none" : "";
                });

                document.querySelectorAll("#syllabusReviewTbody tr").forEach(row => {
                    row.style.display = query && !row.textContent.toLowerCase().includes(query) ? "none" : "";
                });

                document.querySelectorAll("#bulletinFeedList .bulletin-card-item").forEach(card => {
                    card.style.display = query && !card.textContent.toLowerCase().includes(query) ? "none" : "";
                });
            });
        }

        // KPI Card click handlers
        document.getElementById("kpiFacultyCard")?.addEventListener("click", () => {
            showToast(`Department Faculty: ${state.faculty.length} active professors`, "info");
        });

        document.getElementById("kpiStudentCard")?.addEventListener("click", () => {
            showToast(`Total Students Enrolled: ${state.kpis.students} students`, "info");
        });

        document.getElementById("kpiGpaCard")?.addEventListener("click", () => {
            showToast(`Department Average GPA: ${state.kpis.gpa}`, "info");
        });

        document.getElementById("kpiAttendanceCard")?.addEventListener("click", () => {
            showToast(`Overall Attendance Average: ${state.kpis.attendance}`, "info");
        });

        // Logout handlers
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = "../../auth/login.html";
            });
        });
    });
})();

