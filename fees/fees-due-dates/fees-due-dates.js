/**
 * UNIFYED FEES MANAGER PORTAL - FEE SCHEDULES & DUE DATES CONTROLLER
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

        // Create Schedule Modal
        const btnOpenCreate = document.getElementById("btnOpenCreateSchedule");
        if (btnOpenCreate) {
            btnOpenCreate.addEventListener("click", () => {
                document.getElementById("schedTitle").value = "";
                document.getElementById("schedDueDate").value = "";
                document.getElementById("schedPenalty").value = "";
                openModal("scheduleModal");
            });
        }

        // Edit Schedule Modal
        document.querySelectorAll(".btn-edit-sched").forEach(btn => {
            btn.addEventListener("click", function() {
                const name = this.getAttribute("data-name");
                const date = this.getAttribute("data-date");

                document.getElementById("schedTitle").value = name;
                document.getElementById("schedDueDate").value = date;
                document.getElementById("schedPenalty").value = "500";

                openModal("scheduleModal");
            });
        });

        const schedForm = document.getElementById("scheduleForm");
        if (schedForm) {
            schedForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const title = document.getElementById("schedTitle").value.trim();
                closeModal("scheduleModal");
                schedForm.reset();
                showToast(`Saved Fee Schedule configuration for "${title}"`, "success");
            });
        }

        // Filtering
        let activeType = "all";

        const searchInput = document.getElementById("scheduleSearchInput");
        const progSelect = document.getElementById("programFilterSelect");
        const typeBtns = document.querySelectorAll(".filter-pill-btn");

        function filterTable() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
            document.querySelectorAll("#schedulesTable tbody tr").forEach(row => {
                const text = row.textContent.toLowerCase();
                const rowType = row.getAttribute("data-type");

                const matchesQuery = !query || text.includes(query);
                const matchesType = activeType === "all" || rowType === activeType;

                row.style.display = matchesQuery && matchesType ? "" : "none";
            });
        }

        if (searchInput) searchInput.addEventListener("input", filterTable);
        if (progSelect) progSelect.addEventListener("change", filterTable);

        typeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                typeBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                activeType = this.getAttribute("data-type");
                filterTable();
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
