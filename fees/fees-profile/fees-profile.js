/**
 * UNIFYED FEES MANAGER PORTAL - PROFILE CONTROLLER
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
        const loggedInUser = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
        const loggedInId = localStorage.getItem("loggedInStudentId") || "FIN-EMP-108";

        const hdrNameElem = document.getElementById("hdrFeesManagerName");
        const hdrCodeElem = document.getElementById("hdrFeesCode");
        const profNameElem = document.getElementById("profManagerName");
        const profIdElem = document.getElementById("profManagerId");
        const infoNameElem = document.getElementById("infoName");
        const heroAvatarElem = document.getElementById("heroAvatar");

        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;
        if (hdrCodeElem) hdrCodeElem.textContent = loggedInId;
        if (profNameElem) profNameElem.textContent = loggedInUser;
        if (profIdElem) profIdElem.textContent = loggedInId;
        if (infoNameElem) infoNameElem.textContent = loggedInUser;
        if (heroAvatarElem) heroAvatarElem.textContent = loggedInUser.split(" ").map(n => n[0]).join("");

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

        // Modal triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        // Edit Profile
        const btnEdit = document.getElementById("btnEditProfile");
        if (btnEdit) {
            btnEdit.addEventListener("click", () => {
                openModal("editProfileModal");
            });
        }

        const editForm = document.getElementById("editProfileForm");
        if (editForm) {
            editForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const newName = document.getElementById("editName").value.trim();
                const newEmail = document.getElementById("editEmail").value.trim();

                localStorage.setItem("loggedInUser", newName);

                if (hdrNameElem) hdrNameElem.textContent = newName;
                if (profNameElem) profNameElem.textContent = newName;
                if (infoNameElem) infoNameElem.textContent = newName;
                const infoEmailElem = document.getElementById("infoEmail");
                if (infoEmailElem) infoEmailElem.textContent = newEmail;
                if (heroAvatarElem) heroAvatarElem.textContent = newName.split(" ").map(n => n[0]).join("");

                closeModal("editProfileModal");
                showToast("Updated Officer Profile details!", "success");
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
