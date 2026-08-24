/**
 * UNIFYED SYSTEM ADMIN PORTAL - SECURITY GOVERNANCE CONTROLLER
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

        // Search Filter
        const adminSearchInput = document.getElementById("adminSearchInput");
        if (adminSearchInput) {
            adminSearchInput.addEventListener("input", function() {
                const q = this.value.toLowerCase().trim();
                document.querySelectorAll("#secLogsTable tbody tr").forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = !q || text.includes(q) ? "" : "none";
                });
            });
        }

        // Run Firewall Scan
        const btnRunScan = document.getElementById("btnRunScan");
        if (btnRunScan) {
            btnRunScan.addEventListener("click", () => {
                showToast("Executing full Zero-Trust Sentinel firewall scan...", "info");
                setTimeout(() => showToast("Firewall scan complete! 0 active intrusion threats detected.", "success"), 1200);
            });
        }

        // Save Policies
        const btnSavePolicies = document.getElementById("btnSavePolicies");
        if (btnSavePolicies) {
            btnSavePolicies.addEventListener("click", () => {
                showToast("Saved security policies & firewall rules across all nodes!", "success");
            });
        }

        // IP Ban Trigger
        document.querySelectorAll(".btn-ban-ip").forEach(btn => {
            btn.addEventListener("click", function() {
                const ip = this.getAttribute("data-ip") || "Target IP";
                if (confirm(`Are you sure you want to add IP ${ip} to permanent firewall blacklist?`)) {
                    showToast(`Blacklisted IP ${ip} permanently!`, "warning");
                    this.disabled = true;
                    this.style.opacity = "0.5";
                }
            });
        });

        // View Event details
        document.querySelectorAll(".btn-view-event").forEach(btn => {
            btn.addEventListener("click", function() {
                showToast("Fetching Sentinel security event audit transcript...", "info");
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
