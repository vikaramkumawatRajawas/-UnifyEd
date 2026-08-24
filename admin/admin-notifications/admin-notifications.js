/**
 * UNIFYED SYSTEM ADMIN PORTAL - NOTIFICATIONS CONTROLLER
 */
(function () {
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
    window.showToast = showToast;

    let activeFilter = "all";

    function updateBadgeCounts() {
        const unreadItems = document.querySelectorAll(".notif-item-card.unread");
        const unreadCount = unreadItems.length;

        const hdrNotifBadge = document.getElementById("hdrNotifBadge");
        if (hdrNotifBadge) hdrNotifBadge.textContent = unreadCount;

        const heroUnreadCount = document.getElementById("heroUnreadCount");
        if (heroUnreadCount) heroUnreadCount.textContent = `${unreadCount} Unread Alerts`;

        const kpiUnreadVal = document.getElementById("kpiUnreadVal");
        if (kpiUnreadVal) kpiUnreadVal.textContent = `${unreadCount} Alerts`;
    }

    function filterNotifs() {
        const notifSearch = document.getElementById("notifSearchInput");
        const hdrSearch = document.getElementById("adminSearchInput");
        const q = (notifSearch && notifSearch.value.trim()) || (hdrSearch && hdrSearch.value.trim()) || "";
        const query = q.toLowerCase();

        document.querySelectorAll(".notif-item-card").forEach(card => {
            const text = card.textContent.toLowerCase();
            const cat = (card.getAttribute("data-cat") || "").toLowerCase();
            const isUnread = card.classList.contains("unread");

            const matchesSearch = !query || text.includes(query);
            let matchesTab = true;

            if (activeFilter === "unread") matchesTab = isUnread;
            else if (activeFilter !== "all") matchesTab = cat === activeFilter;

            card.style.display = matchesSearch && matchesTab ? "flex" : "none";
        });
    }

    function initPage() {
        const loggedInUser = localStorage.getItem("loggedInUser") || "System Admin";
        const hdrNameElem = document.getElementById("hdrAdminName");
        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;

        // Sidebar Toggle with memory
        const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
        const sidebar = document.getElementById("sidebar");
        const mainPortal = document.querySelector(".portal-main");

        if (localStorage.getItem("adminSidebarCollapsed") === "true") {
            if (sidebar) sidebar.classList.add("collapsed");
            if (mainPortal) mainPortal.classList.add("expanded");
        }

        if (sidebarToggleBtn && sidebar) {
            sidebarToggleBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle("active");
                } else {
                    const isCollapsed = sidebar.classList.toggle("collapsed");
                    if (mainPortal) mainPortal.classList.toggle("expanded", isCollapsed);
                    localStorage.setItem("adminSidebarCollapsed", isCollapsed ? "true" : "false");
                }
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

        // Search Listeners
        const notifSearchInput = document.getElementById("notifSearchInput");
        if (notifSearchInput) notifSearchInput.addEventListener("input", filterNotifs);

        const adminSearchInput = document.getElementById("adminSearchInput");
        if (adminSearchInput) adminSearchInput.addEventListener("input", filterNotifs);

        // Filter Tabs
        const filterTabs = document.querySelectorAll("#notifFilterTabs .tab-btn");
        filterTabs.forEach(tab => {
            tab.addEventListener("click", function() {
                filterTabs.forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                activeFilter = (this.getAttribute("data-filter") || "all").toLowerCase();
                filterNotifs();
            });
        });

        // Mark Single as Read
        document.querySelectorAll(".btn-mark-read").forEach(btn => {
            btn.addEventListener("click", function() {
                const card = this.closest(".notif-item-card");
                if (card) {
                    card.classList.remove("unread");
                    card.classList.add("read");
                    const dot = card.querySelector(".unread-dot");
                    if (dot) dot.remove();
                    this.remove();
                    updateBadgeCounts();
                    showToast("Marked notification alert as read!", "info");
                }
            });
        });

        // Dismiss Single
        document.querySelectorAll(".btn-dismiss").forEach(btn => {
            btn.addEventListener("click", function() {
                const card = this.closest(".notif-item-card");
                if (card) {
                    card.style.opacity = "0";
                    card.style.transform = "translateX(40px)";
                    setTimeout(() => {
                        card.remove();
                        updateBadgeCounts();
                        showToast("Dismissed notification alert!", "info");
                    }, 300);
                }
            });
        });

        // Mark All Read
        const btnMarkAllRead = document.getElementById("btnMarkAllRead");
        if (btnMarkAllRead) {
            btnMarkAllRead.addEventListener("click", () => {
                document.querySelectorAll(".notif-item-card.unread").forEach(card => {
                    card.classList.remove("unread");
                    card.classList.add("read");
                    const dot = card.querySelector(".unread-dot");
                    if (dot) dot.remove();
                    const readBtn = card.querySelector(".btn-mark-read");
                    if (readBtn) readBtn.remove();
                });
                updateBadgeCounts();
                showToast("Marked all 7 notification alerts as read!", "success");
            });
        }

        // Clear Read Alerts
        const btnClearRead = document.getElementById("btnClearRead");
        if (btnClearRead) {
            btnClearRead.addEventListener("click", () => {
                document.querySelectorAll(".notif-item-card.read").forEach(card => card.remove());
                updateBadgeCounts();
                showToast("Cleared all read notification alerts!", "info");
            });
        }

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
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
