/**
 * UNIFYED SYSTEM ADMIN PORTAL - ACTIVITY LOGS CONTROLLER
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

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("active");
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    }

    let activeCategoryTab = "all";

    function filterLogsTable() {
        const logSearch = document.getElementById("logSearchInput");
        const hdrSearch = document.getElementById("adminSearchInput");
        const levelFilter = document.getElementById("logLevelFilter");

        const q = (logSearch && logSearch.value.trim()) || (hdrSearch && hdrSearch.value.trim()) || "";
        const query = q.toLowerCase();
        const levelVal = levelFilter ? levelFilter.value.toLowerCase().trim() : "all";

        document.querySelectorAll("#logsTable tbody tr").forEach(row => {
            const text = row.textContent.toLowerCase();
            const rowCat = (row.getAttribute("data-cat") || "").toLowerCase();
            const rowLevel = (row.getAttribute("data-level") || "").toLowerCase();

            const matchesSearch = !query || text.includes(query);
            const matchesCategory = activeCategoryTab === "all" || rowCat === activeCategoryTab;
            const matchesLevel = levelVal === "all" || rowLevel === levelVal;

            row.style.display = matchesSearch && matchesCategory && matchesLevel ? "" : "none";
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

        // Search & Filter Listeners
        const logSearchInput = document.getElementById("logSearchInput");
        if (logSearchInput) logSearchInput.addEventListener("input", filterLogsTable);

        const adminSearchInput = document.getElementById("adminSearchInput");
        if (adminSearchInput) adminSearchInput.addEventListener("input", filterLogsTable);

        const logLevelFilter = document.getElementById("logLevelFilter");
        if (logLevelFilter) logLevelFilter.addEventListener("change", filterLogsTable);

        // Category Filter Tabs
        const logTabs = document.querySelectorAll("#logFilterTabs .tab-btn");
        logTabs.forEach(tab => {
            tab.addEventListener("click", function() {
                logTabs.forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                activeCategoryTab = (this.getAttribute("data-cat") || "all").toLowerCase();
                filterLogsTable();
            });
        });

        // Modal triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        document.querySelectorAll(".btn-view-log-detail").forEach(btn => {
            btn.addEventListener("click", () => openModal("logDetailModal"));
        });

        // Export Logs trigger
        const btnExportLogs = document.getElementById("btnExportLogs");
        if (btnExportLogs) {
            btnExportLogs.addEventListener("click", () => {
                showToast("Packaging system audit logs in JSON & CSV formats...", "info");
                setTimeout(() => showToast("Downloaded full audit logs export!", "success"), 1200);
            });
        }

        // Flush Logs trigger
        const btnFlushLogs = document.getElementById("btnFlushLogs");
        if (btnFlushLogs) {
            btnFlushLogs.addEventListener("click", () => {
                if (confirm("Are you sure you want to flush audit log entries older than 30 days?")) {
                    showToast("Flushed 12,450 historical audit log entries!", "info");
                }
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
