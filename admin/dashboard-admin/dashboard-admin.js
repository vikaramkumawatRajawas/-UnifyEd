/**
 * UNIFYED SYSTEM ADMIN PORTAL - DASHBOARD CONTROLLER
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

    function filterRosterTable() {
        const searchInput = document.getElementById("rosterSearchInput") || document.getElementById("adminSearchInput");
        const roleFilter = document.getElementById("rosterRoleFilter");

        const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const roleVal = roleFilter ? roleFilter.value.toLowerCase().trim() : "all";

        document.querySelectorAll("#recentUsersTable tbody tr").forEach(row => {
            const text = row.textContent.toLowerCase();
            const rowRole = (row.getAttribute("data-role") || "").toLowerCase();

            const matchesText = !q || text.includes(q);
            const matchesRole = roleVal === "all" || rowRole === roleVal;

            row.style.display = matchesText && matchesRole ? "" : "none";
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

        // Roster Search & Filter Inputs
        const searchInput = document.getElementById("rosterSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", filterRosterTable);
        }

        const adminSearchInput = document.getElementById("adminSearchInput");
        if (adminSearchInput) {
            adminSearchInput.addEventListener("input", filterRosterTable);
        }

        const roleFilter = document.getElementById("rosterRoleFilter");
        if (roleFilter) {
            roleFilter.addEventListener("change", filterRosterTable);
        }

        // Quick View User Buttons
        document.querySelectorAll(".btn-view-user").forEach(btn => {
            btn.addEventListener("click", function() {
                const userName = this.getAttribute("data-user") || "User";
                showToast(`Fetching profile details for ${userName}...`, "info");
            });
        });

        // Modal Triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const backdrop = this.closest(".modal-backdrop");
                if (backdrop) backdrop.classList.remove("active");
            });
        });

        const btnOpenUser = document.getElementById("btnOpenUserModal");
        if (btnOpenUser) {
            btnOpenUser.addEventListener("click", () => {
                openModal("userModal");
            });
        }

        const btnOpenMaint = document.getElementById("btnOpenMaintModal");
        if (btnOpenMaint) {
            btnOpenMaint.addEventListener("click", () => {
                openModal("maintModal");
            });
        }

        // Add User Form Submission
        const userForm = document.getElementById("userForm");
        if (userForm) {
            userForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const name = document.getElementById("userNameInput").value.trim();
                const role = document.getElementById("userRoleSelect").value;

                closeModal("userModal");
                userForm.reset();
                showToast(`Created new ${role} account for ${name}`, "success");
            });
        }

        // System Maintenance Triggers
        const btnFlushCache = document.getElementById("btnFlushCache");
        if (btnFlushCache) {
            btnFlushCache.addEventListener("click", () => {
                showToast("Flushed Redis system cache buffers successfully!", "success");
            });
        }

        const btnOptimizeDb = document.getElementById("btnOptimizeDb");
        if (btnOptimizeDb) {
            btnOptimizeDb.addEventListener("click", () => {
                showToast("DB Index Optimization triggered in background!", "info");
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
