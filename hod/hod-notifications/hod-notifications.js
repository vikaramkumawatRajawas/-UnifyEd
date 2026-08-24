/**
 * UNIFYED HOD PORTAL - NOTIFICATIONS CONTROLLER
 */
(function () {
    const defaultNotifications = [
        {
            id: 1,
            title: "URGENT: Student Attendance Below 75% Threshold",
            category: "urgent",
            catLabel: "URGENT ALERT",
            badgeClass: "badge-danger",
            icon: "fa-triangle-exclamation",
            iconBg: "#ef4444",
            time: "2 hours ago",
            source: "CSE 3A Section Audit",
            unread: true,
            message: "8 students in CSE 3A have attendance dropped below 75%. Immediate academic intervention and parent advisory required."
        },
        {
            id: 2,
            title: "Lab Maintenance Window Reminder - Block C",
            category: "warning",
            catLabel: "REMINDER",
            badgeClass: "badge-warning",
            icon: "fa-calendar-day",
            iconBg: "#f59e0b",
            time: "4 hours ago",
            source: "Block C Infrastructure",
            unread: true,
            message: "Lab maintenance scheduled for Jan 3-4, 2026. All CSE and ECE practical labs will remain closed during maintenance."
        },
        {
            id: 3,
            title: "New Internship Drive - Summer 2026 Recruitment",
            category: "opportunity",
            catLabel: "OPPORTUNITY",
            badgeClass: "badge-primary",
            icon: "fa-briefcase",
            iconBg: "#06b6d4",
            time: "6 hours ago",
            source: "Placement Cell",
            unread: true,
            message: "Google and Microsoft placement drives opened for 3rd and 4th year CSE/ECE students. Registration deadline: Jan 10, 2026."
        },
        {
            id: 4,
            title: "Mid-Semester Assessment Scores Published",
            category: "academic",
            catLabel: "ACADEMIC INFO",
            badgeClass: "badge-success",
            icon: "fa-circle-check",
            iconBg: "#10b981",
            time: "1 day ago",
            source: "Examination Cell",
            unread: true,
            message: "Mid-semester assessment marks for CSE, ECE, and Mechanical departments have been verified and published to student portals."
        },
        {
            id: 5,
            title: "Department Curriculum Review Meeting Scheduled",
            category: "academic",
            catLabel: "MEETING",
            badgeClass: "badge-primary",
            icon: "fa-handshake",
            iconBg: "#6366f1",
            time: "1 day ago",
            source: "Administration",
            unread: false,
            message: "Curriculum alignment and syllabus audit meeting scheduled for Jan 5, 2026 at 10:00 AM in HOD Conference Room A."
        },
        {
            id: 6,
            title: "Faculty Award Nomination: Best Department 2025",
            category: "event",
            catLabel: "RECOGNITION",
            badgeClass: "badge-warning",
            icon: "fa-trophy",
            iconBg: "#8b5cf6",
            time: "2 days ago",
            source: "Academic Senate",
            unread: false,
            message: "Computer Science & Engineering Department has been nominated for the Best Academic Performance Award 2025."
        },
        {
            id: 7,
            title: "Winter Cultural Fest 2026 Registration Open",
            category: "event",
            catLabel: "EVENT",
            badgeClass: "badge-secondary",
            icon: "fa-bullhorn",
            iconBg: "#ec4899",
            time: "3 days ago",
            source: "Student Council",
            unread: false,
            message: "Annual Winter Cultural Fest 2026 registrations are now open for student entries across engineering branches."
        }
    ];

    function getNotificationsState() {
        const savedState = localStorage.getItem("hod_notifications_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {}
        }
        return defaultNotifications;
    }

    function saveNotificationsState(list) {
        localStorage.setItem("hod_notifications_state", JSON.stringify(list));
    }

    let notificationsList = getNotificationsState();
    let currentFilter = "all";

    function showToast(message, type = "success") {
        const container = document.getElementById("toastContainer");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = `toast-alert ${type}`;
        let iconClass = "fa-circle-check";
        if (type === "warning") iconClass = "fa-triangle-exclamation";
        if (type === "info") iconClass = "fa-circle-info";

        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(50px)";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function renderFeed() {
        const feedContainer = document.getElementById("notificationsFeedContainer");
        const kpiUnreadElem = document.getElementById("kpiUnreadCount");
        const hdrBadgeElem = document.getElementById("hdrNotifBadge");
        const countAllElem = document.getElementById("countAll");
        const countUnreadElem = document.getElementById("countUnread");

        const unreadCount = notificationsList.filter(n => n.unread).length;
        if (kpiUnreadElem) kpiUnreadElem.textContent = unreadCount;
        if (hdrBadgeElem) {
            hdrBadgeElem.textContent = unreadCount;
            hdrBadgeElem.style.display = unreadCount > 0 ? "" : "none";
        }
        if (countAllElem) countAllElem.textContent = notificationsList.length;
        if (countUnreadElem) countUnreadElem.textContent = unreadCount;

        if (!feedContainer) return;

        let filtered = notificationsList;
        if (currentFilter === "unread") {
            filtered = filtered.filter(n => n.unread);
        } else if (currentFilter !== "all") {
            filtered = filtered.filter(n => n.category === currentFilter);
        }

        if (filtered.length === 0) {
            feedContainer.innerHTML = `
                <div style="text-align:center; padding:50px 20px; color:var(--text-tertiary);">
                    <i class="fa-solid fa-bell-slash" style="font-size:42px; margin-bottom:14px; opacity:0.5;"></i>
                    <p style="font-size:15px; font-weight:600;">No notifications found in this category.</p>
                </div>
            `;
            return;
        }

        feedContainer.innerHTML = filtered.map(n => `
            <div class="notif-card ${n.category} ${n.unread ? 'unread' : ''}">
                <div style="display:flex; gap:16px; align-items:flex-start;">
                    <div style="width:44px; height:44px; border-radius:50%; background:${n.iconBg}; display:flex; align-items:center; justify-content:center; color:white; font-size:18px; flex-shrink:0; box-shadow:0 4px 12px rgba(0,0,0,0.2);">
                        <i class="fa-solid ${n.icon}"></i>
                    </div>
                    <div style="flex:1;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:6px;">
                            <div>
                                <h3 style="margin:0; color:var(--text-primary); font-size:15px; font-weight:800;">
                                    ${n.unread ? '<i class="fa-solid fa-circle" style="color:var(--primary); font-size:8px; margin-right:6px; vertical-align:middle;"></i>' : ''}
                                    ${n.title}
                                </h3>
                                <div style="color:var(--text-tertiary); font-size:12px; margin-top:3px;">
                                    <span><i class="fa-solid fa-building-columns"></i> ${n.source}</span>
                                    <span style="margin:0 6px;">•</span>
                                    <span><i class="fa-solid fa-clock"></i> ${n.time}</span>
                                </div>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span class="badge ${n.badgeClass}">${n.catLabel}</span>
                                <button type="button" class="btn-dismiss-notif" data-id="${n.id}" style="background:transparent; border:none; color:var(--text-tertiary); cursor:pointer; font-size:14px;" title="Dismiss Notification"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                        <p style="color:var(--text-secondary); font-size:13px; margin:8px 0 0; line-height:1.6;">${n.message}</p>
                    </div>
                </div>
            </div>
        `).join("");

        // Dismiss Notification Click Handlers
        document.querySelectorAll(".btn-dismiss-notif").forEach(btn => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                const id = parseInt(this.getAttribute("data-id"));
                notificationsList = notificationsList.filter(n => n.id !== id);
                saveNotificationsState(notificationsList);
                renderFeed();
                showToast("Dismissed notification", "info");
            });
        });
    }

    function initPage() {
        renderFeed();

        // Filter Tab Handlers
        document.querySelectorAll(".notif-tab-btn").forEach(tab => {
            tab.addEventListener("click", function () {
                document.querySelectorAll(".notif-tab-btn").forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                currentFilter = this.getAttribute("data-filter");
                renderFeed();
            });
        });

        // Mark All Read Handler
        const btnMarkAllRead = document.getElementById("btnMarkAllRead");
        if (btnMarkAllRead) {
            btnMarkAllRead.addEventListener("click", () => {
                notificationsList.forEach(n => n.unread = false);
                saveNotificationsState(notificationsList);
                renderFeed();
                showToast("Marked all notifications as read!", "success");
            });
        }

        // Clear All Handler
        const btnClearAll = document.getElementById("btnClearAll");
        if (btnClearAll) {
            btnClearAll.addEventListener("click", () => {
                notificationsList = [];
                saveNotificationsState(notificationsList);
                renderFeed();
                showToast("Cleared all notifications", "info");
            });
        }

        // Theme Toggle
        const themeBtn = document.getElementById("themeToggleBtn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                const activeTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", activeTheme);
                localStorage.setItem("theme", activeTheme);
                showToast(`Switched to ${activeTheme} mode`, "info");
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
            document.addEventListener("click", (e) => {
                if (!profileMenu.contains(e.target) && e.target !== profileTrigger) {
                    profileMenu.classList.remove("open");
                }
            });
        }

        // Live Search Filter
        const searchInput = document.getElementById("portalSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll(".notif-card").forEach(card => {
                    card.style.display = query && !card.textContent.toLowerCase().includes(query) ? "none" : "";
                });
            });
        }

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedInStudentId");
                window.location.href = "../../auth/login.html";
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPage);
    } else {
        initPage();
    }
})();
