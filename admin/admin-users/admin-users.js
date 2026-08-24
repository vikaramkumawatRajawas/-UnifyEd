/**
 * UNIFYED SYSTEM ADMIN PORTAL - USER MANAGEMENT CONTROLLER
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

    let activeRoleTab = "all";

    function filterUserDirectory() {
        const dirSearch = document.getElementById("dirSearchInput");
        const hdrSearch = document.getElementById("adminSearchInput");
        const statusFilter = document.getElementById("dirStatusFilter");

        const q = (dirSearch && dirSearch.value.trim()) || (hdrSearch && hdrSearch.value.trim()) || "";
        const query = q.toLowerCase();
        const statusVal = statusFilter ? statusFilter.value.toLowerCase().trim() : "all";

        document.querySelectorAll("#usersTable tbody tr").forEach(row => {
            const text = row.textContent.toLowerCase();
            const rowRole = (row.getAttribute("data-role") || "").toLowerCase();
            const rowStatus = (row.getAttribute("data-status") || "").toLowerCase();

            const matchesSearch = !query || text.includes(query);
            const matchesRole = activeRoleTab === "all" || rowRole === activeRoleTab;
            const matchesStatus = statusVal === "all" || rowStatus === statusVal;

            row.style.display = matchesSearch && matchesRole && matchesStatus ? "" : "none";
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
        const dirSearchInput = document.getElementById("dirSearchInput");
        if (dirSearchInput) dirSearchInput.addEventListener("input", filterUserDirectory);

        const adminSearchInput = document.getElementById("adminSearchInput");
        if (adminSearchInput) adminSearchInput.addEventListener("input", filterUserDirectory);

        const dirStatusFilter = document.getElementById("dirStatusFilter");
        if (dirStatusFilter) dirStatusFilter.addEventListener("change", filterUserDirectory);

        // Role Filter Tabs
        const roleTabs = document.querySelectorAll("#roleFilterTabs .tab-btn");
        roleTabs.forEach(tab => {
            tab.addEventListener("click", function() {
                roleTabs.forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                activeRoleTab = (this.getAttribute("data-role") || "all").toLowerCase();
                filterUserDirectory();
            });
        });

        // Modals
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        const btnAddUser = document.getElementById("btnAddNewUser");
        if (btnAddUser) {
            btnAddUser.addEventListener("click", () => {
                const titleElem = document.getElementById("modalTitleText");
                if (titleElem) titleElem.innerHTML = `<i class="fa-solid fa-user-plus" style="color:var(--primary);"></i> Create New User Account`;
                const form = document.getElementById("userForm");
                if (form) form.reset();
                openModal("userModal");
            });
        }

        // Edit User Buttons
        document.querySelectorAll(".btn-edit-user").forEach(btn => {
            btn.addEventListener("click", function() {
                const id = this.getAttribute("data-id") || "";
                const titleElem = document.getElementById("modalTitleText");
                if (titleElem) titleElem.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:var(--primary);"></i> Edit Account (${id})`;
                openModal("userModal");
            });
        });

        // Lock User Buttons
        document.querySelectorAll(".btn-lock-user").forEach(btn => {
            btn.addEventListener("click", function() {
                if (this.hasAttribute("disabled")) return;
                const icon = this.querySelector("i");
                if (icon.classList.contains("fa-lock")) {
                    icon.className = "fa-solid fa-lock-open";
                    showToast("Account locked temporarily", "warning");
                } else {
                    icon.className = "fa-solid fa-lock";
                    showToast("Account unlocked", "success");
                }
            });
        });

        // Delete / Revoke Access
        document.querySelectorAll(".btn-delete-user").forEach(btn => {
            btn.addEventListener("click", function() {
                const row = this.closest("tr");
                if (row && confirm("Are you sure you want to revoke account access for this user?")) {
                    row.style.opacity = "0";
                    row.style.transform = "translateX(50px)";
                    setTimeout(() => {
                        row.remove();
                        showToast("Revoked user access rights", "danger");
                    }, 300);
                }
            });
        });

        // User Form Submit
        const userForm = document.getElementById("userForm");
        if (userForm) {
            userForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const name = document.getElementById("userNameInput").value.trim();
                const role = document.getElementById("userRoleSelect").value;

                closeModal("userModal");
                userForm.reset();
                showToast(`Saved ${role} account for ${name}!`, "success");
            });
        }

        // Import & Export Action Triggers
        const btnImport = document.getElementById("btnImportCsv");
        if (btnImport) {
            btnImport.addEventListener("click", () => {
                showToast("Opening CSV User Roster Importer...", "info");
            });
        }

        const btnExport = document.getElementById("btnExportJson");
        if (btnExport) {
            btnExport.addEventListener("click", () => {
                showToast("Downloading full user roster JSON file...", "success");
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
