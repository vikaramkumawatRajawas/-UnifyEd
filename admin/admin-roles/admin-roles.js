/**
 * UNIFYED SYSTEM ADMIN PORTAL - ROLE ASSIGNMENT CONTROLLER
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
                document.querySelectorAll(".role-card").forEach(card => {
                    const text = card.textContent.toLowerCase();
                    card.style.display = !q || text.includes(q) ? "" : "none";
                });
            });
        }

        // Modal triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        const btnCreateRole = document.getElementById("btnCreateRole");
        if (btnCreateRole) {
            btnCreateRole.addEventListener("click", () => {
                const titleElem = document.getElementById("roleModalTitle");
                if (titleElem) titleElem.innerHTML = `<i class="fa-solid fa-user-shield" style="color:var(--primary);"></i> Create Custom Role`;
                const form = document.getElementById("roleForm");
                if (form) form.reset();
                openModal("roleModal");
            });
        }

        document.querySelectorAll(".btn-edit-role").forEach(btn => {
            btn.addEventListener("click", function() {
                const roleName = this.getAttribute("data-role") || "Role";
                const titleElem = document.getElementById("roleModalTitle");
                if (titleElem) titleElem.innerHTML = `<i class="fa-solid fa-sliders" style="color:var(--primary);"></i> Configure ${roleName}`;
                const nameInput = document.getElementById("roleNameInput");
                if (nameInput) nameInput.value = roleName;
                openModal("roleModal");
            });
        });

        const roleForm = document.getElementById("roleForm");
        if (roleForm) {
            roleForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const name = document.getElementById("roleNameInput").value.trim();
                closeModal("roleModal");
                roleForm.reset();
                showToast(`Saved access privileges for ${name}!`, "success");
            });
        }

        const btnReset = document.getElementById("btnResetMatrix");
        if (btnReset) {
            btnReset.addEventListener("click", () => {
                if (confirm("Reset role matrix to enterprise default security policies?")) {
                    showToast("Reset access control matrix to defaults!", "info");
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
