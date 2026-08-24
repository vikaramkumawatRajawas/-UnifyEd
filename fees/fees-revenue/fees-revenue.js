/**
 * UNIFYED FEES MANAGER PORTAL - REVENUE STREAM CONTROLLER
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
        const loggedInUser = localStorage.getItem("loggedInUser") || "Finance Manager";
        const loggedInId = localStorage.getItem("loggedInStudentId") || "FIN-EMP-108";
        const hdrNameElem = document.getElementById("hdrFeesManagerName");
        const hdrCodeElem = document.getElementById("hdrFeesCode");
        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;
        if (hdrCodeElem) hdrCodeElem.textContent = loggedInId;

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

        // Breakdown Modal
        document.querySelectorAll(".btn-breakdown").forEach(btn => {
            btn.addEventListener("click", function() {
                const stream = this.getAttribute("data-stream");
                const amt = this.getAttribute("data-amt");
                const title = document.getElementById("breakdownTitle");
                if (title) title.textContent = `Detailed Audit: ${stream} (₹${amt})`;
                openModal("revenueBreakdownModal");
            });
        });

        // Search Filter
        const searchInput = document.getElementById("feesSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function() {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll(".fees-table tbody tr").forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = !query || text.includes(query) ? "" : "none";
                });
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
