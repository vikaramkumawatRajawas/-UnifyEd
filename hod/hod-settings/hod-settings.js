/**
 * UNIFYED HOD PORTAL - SETTINGS CONTROLLER
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

    function initPage() {
        // Tab Navigation Handler
        const tabBtns = document.querySelectorAll(".settings-tab-btn");
        const panels = document.querySelectorAll(".settings-panel");

        tabBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const targetPanelId = this.getAttribute("data-panel");
                tabBtns.forEach(b => b.classList.remove("active"));
                panels.forEach(p => p.classList.remove("active"));

                this.classList.add("active");
                const targetPanel = document.getElementById(targetPanelId);
                if (targetPanel) targetPanel.classList.add("active");
            });
        });

        // Toggle Switch Click Handler
        document.querySelectorAll(".settings-toggle-switch").forEach(toggle => {
            toggle.addEventListener("click", function () {
                this.classList.toggle("active");
                const toggleKey = this.getAttribute("data-toggle");
                const isActivated = this.classList.contains("active");
                localStorage.setItem(`setting_${toggleKey}`, isActivated);
                showToast(`${toggleKey} preference ${isActivated ? 'enabled' : 'disabled'}`, "info");
            });
        });

        // Email Settings Form
        const formEmailSettings = document.getElementById("formEmailSettings");
        if (formEmailSettings) {
            formEmailSettings.addEventListener("submit", function (e) {
                e.preventDefault();
                const primary = document.getElementById("settingPrimaryEmail").value.trim();
                if (!primary) return;
                localStorage.setItem("registeredEmail", primary);
                showToast("Email address preferences updated!", "success");
            });
        }

        // Password Form
        const formSecurityPass = document.getElementById("formSecurityPass");
        if (formSecurityPass) {
            formSecurityPass.addEventListener("submit", function (e) {
                e.preventDefault();
                document.getElementById("settingCurrPass").value = "";
                document.getElementById("settingNewPass").value = "";
                showToast("Security password updated successfully!", "success");
            });
        }

        // Save Dept System Defaults
        const btnSaveDeptDefaults = document.getElementById("btnSaveDeptDefaults");
        if (btnSaveDeptDefaults) {
            btnSaveDeptDefaults.addEventListener("click", () => {
                const term = document.getElementById("settingDefaultTerm").value;
                const threshold = document.getElementById("settingAttThreshold").value;
                localStorage.setItem("setting_default_term", term);
                localStorage.setItem("setting_att_threshold", threshold);
                showToast("Saved department system defaults!", "success");
            });
        }

        // Reset Settings Handler
        const btnResetSettings = document.getElementById("btnResetSettings");
        if (btnResetSettings) {
            btnResetSettings.addEventListener("click", () => {
                showToast("Reset portal settings to default values", "warning");
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
