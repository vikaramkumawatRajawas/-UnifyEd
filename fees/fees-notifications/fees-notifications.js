/**
 * UNIFYED FEES MANAGER PORTAL - NOTIFICATIONS CONTROLLER
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

    function initPage() {
        const loggedInUser = localStorage.getItem("loggedInUser") || "Finance Manager";
        const loggedInId = localStorage.getItem("loggedInStudentId") || "FIN-EMP-108";
        const hdrNameElem = document.getElementById("hdrFeesManagerName");
        const hdrCodeElem = document.getElementById("hdrFeesCode");
        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;
        if (hdrCodeElem) hdrCodeElem.textContent = loggedInId;

        // Sidebar Toggle
        const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
        const sidebar = document.getElementById("sidebar");
        const mainPortal = document.querySelector(".portal-main");
        if (sidebarToggleBtn && sidebar) {
            sidebarToggleBtn.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle("active");
                } else {
                    sidebar.classList.toggle("collapsed");
                    if (mainPortal) mainPortal.classList.toggle("expanded");
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

        // Mark All Read
        const btnMarkAll = document.getElementById("btnMarkAllRead");
        if (btnMarkAll) {
            btnMarkAll.addEventListener("click", () => {
                document.querySelectorAll(".notif-item.unread").forEach(item => {
                    item.classList.remove("unread");
                    const dot = item.querySelector(".unread-dot");
                    if (dot) dot.remove();
                });
                const badge = document.getElementById("hdrNotifBadge");
                if (badge) badge.textContent = "0";
                const heroCount = document.getElementById("heroUnreadCount");
                if (heroCount) heroCount.textContent = "0 Notifications";
                showToast("Marked all Treasury Notifications as read", "success");
            });
        }

        // Dismiss Individual Notification
        document.querySelectorAll(".btn-dismiss-notif").forEach(btn => {
            btn.addEventListener("click", function() {
                const item = this.closest(".notif-item");
                if (item) {
                    item.style.opacity = "0";
                    item.style.transform = "translateX(50px)";
                    setTimeout(() => item.remove(), 300);
                }
            });
        });

        // Category Filter
        let activeCat = "all";

        const searchInput = document.getElementById("notifSearchInput");
        const catBtns = document.querySelectorAll(".filter-pill-btn");

        function filterList() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
            document.querySelectorAll("#notifList .notif-item").forEach(item => {
                const text = item.textContent.toLowerCase();
                const itemCat = item.getAttribute("data-cat");

                const matchesQuery = !query || text.includes(query);
                const matchesCat = activeCat === "all" || itemCat === activeCat;

                item.style.display = matchesQuery && matchesCat ? "flex" : "none";
            });
        }

        if (searchInput) searchInput.addEventListener("input", filterList);

        catBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                catBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                activeCat = this.getAttribute("data-cat");
                filterList();
            });
        });

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
