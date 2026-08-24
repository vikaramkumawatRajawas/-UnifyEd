/**
 * UNIFYED VICE CHANCELLOR (VC) PORTAL - DASHBOARD CONTROLLER
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
        const loggedInUser = localStorage.getItem("loggedInUser") || "Prof. Vice Chancellor";
        const hdrNameElem = document.getElementById("hdrAdminName");
        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;

        // Sidebar Toggle with Memory
        const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
        const sidebar = document.getElementById("sidebar");
        const mainPortal = document.querySelector(".portal-main");

        if (localStorage.getItem("vcSidebarCollapsed") === "true") {
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
                    localStorage.setItem("vcSidebarCollapsed", isCollapsed ? "true" : "false");
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

        // Header Live Search Filtering
        const searchInput = document.getElementById("vcSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                const query = e.target.value.toLowerCase().trim();
                const tableRows = document.querySelectorAll(".vc-table tbody tr");
                tableRows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = !query || text.includes(query) ? "" : "none";
                });
            });
        }

        // Action Buttons Simulation
        document.querySelectorAll(".btn-approve-req").forEach(btn => {
            btn.addEventListener("click", function () {
                const row = this.closest("tr");
                if (row) {
                    const pill = row.querySelector(".status-pill");
                    if (pill) {
                        pill.className = "status-pill pill-success";
                        pill.innerHTML = `<i class="fa-solid fa-circle-check"></i> Approved`;
                    }
                    this.remove();
                    showToast("Approved executive senate request successfully!", "success");
                }
            });
        });

        const btnExportBriefing = document.getElementById("btnExportBriefing");
        if (btnExportBriefing) {
            btnExportBriefing.addEventListener("click", () => {
                showToast("Exporting Vice Chancellor Executive Briefing PDF...", "info");
                setTimeout(() => showToast("Executive Briefing downloaded to your system!", "success"), 1800);
            });
        }

        const btnInitiateSenate = document.getElementById("btnInitiateSenate");
        if (btnInitiateSenate) {
            btnInitiateSenate.addEventListener("click", () => {
                showToast("Senate Meeting Notification broadcasted to all Deans & HODs!", "purple");
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
