/**
 * UNIFYED SYSTEM ADMIN PORTAL - ADMIN PROFILE CONTROLLER
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
        const loggedInUser = localStorage.getItem("loggedInUser") || "System Administrator";
        const hdrNameElem = document.getElementById("hdrAdminName");
        const profNameElem = document.getElementById("profAdminName");
        const profFullNameText = document.getElementById("profFullNameText");

        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;
        if (profNameElem) profNameElem.textContent = loggedInUser;
        if (profFullNameText) profFullNameText.textContent = loggedInUser;

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

        // Modal triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        const btnEditAdminProf = document.getElementById("btnEditAdminProf");
        if (btnEditAdminProf) btnEditAdminProf.addEventListener("click", () => openModal("editModal"));

        // Edit Profile Form Submit
        const editForm = document.getElementById("editForm");
        if (editForm) {
            editForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const newName = document.getElementById("editAdminName").value.trim();
                const newEmail = document.getElementById("editAdminEmail").value.trim();

                if (newName) {
                    localStorage.setItem("loggedInUser", newName);
                    if (hdrNameElem) hdrNameElem.textContent = newName;
                    if (profNameElem) profNameElem.textContent = newName;
                    if (profFullNameText) profFullNameText.textContent = newName;

                    const heroAvatar = document.getElementById("heroAvatar");
                    if (heroAvatar) {
                        const parts = newName.split(" ");
                        heroAvatar.textContent = parts.length > 1 ? (parts[0][0] + parts[1][0]) : newName.substring(0, 2).toUpperCase();
                    }
                }

                if (newEmail) {
                    const profEmail = document.getElementById("profEmail");
                    const profEmailText = document.getElementById("profEmailText");
                    if (profEmail) profEmail.textContent = newEmail;
                    if (profEmailText) profEmailText.textContent = newEmail;
                }

                closeModal("editModal");
                showToast("Updated executive admin profile metadata!", "success");
            });
        }

        // Change Password Form Submit
        const changePassForm = document.getElementById("changePassForm");
        if (changePassForm) {
            changePassForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const newPass = document.getElementById("newPassInput").value;
                const confirmPass = document.getElementById("confirmPassInput").value;

                if (newPass !== confirmPass) {
                    showToast("New passwords do not match!", "warning");
                    return;
                }

                showToast("Successfully updated security master credentials!", "success");
                changePassForm.reset();
            });
        }

        // Recovery Codes
        const btnRecoveryCodes = document.getElementById("btnRecoveryCodes");
        if (btnRecoveryCodes) {
            btnRecoveryCodes.addEventListener("click", () => {
                showToast("Displaying emergency 2FA recovery keys...", "info");
            });
        }

        // Revoke Sessions
        const btnRevokeSessions = document.getElementById("btnRevokeSessions");
        if (btnRevokeSessions) {
            btnRevokeSessions.addEventListener("click", () => {
                showToast("Revoked 3 remote active device sessions!", "warning");
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
