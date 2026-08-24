/**
 * UNIFYED SYSTEM ADMIN PORTAL - ADMIN PREFERENCES CONTROLLER
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
        const prefThemeMode = document.getElementById("prefThemeMode");

        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                const activeTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", activeTheme);
                localStorage.setItem("theme", activeTheme);
                if (prefThemeMode) prefThemeMode.value = activeTheme;
                showToast(`Switched to ${activeTheme} mode`, "info");
            });
        }

        if (prefThemeMode) {
            prefThemeMode.value = localStorage.getItem("theme") || "dark";
            prefThemeMode.addEventListener("change", function() {
                document.documentElement.setAttribute("data-theme", this.value);
                localStorage.setItem("theme", this.value);
                showToast(`Applied ${this.value} theme mode!`, "success");
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

        // Save Preferences Trigger
        const btnSavePreferences = document.getElementById("btnSavePreferences");
        if (btnSavePreferences) {
            btnSavePreferences.addEventListener("click", () => {
                showToast("Saved personal executive preferences & workspace settings!", "success");
            });
        }

        // Reset Defaults Trigger
        const btnResetDefaults = document.getElementById("btnResetDefaults");
        if (btnResetDefaults) {
            btnResetDefaults.addEventListener("click", () => {
                if (confirm("Reset all personal workspace preferences to system factory defaults?")) {
                    showToast("Reset workspace preferences to defaults!", "info");
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
