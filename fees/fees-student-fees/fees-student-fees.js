/**
 * UNIFYED FEES MANAGER PORTAL - STUDENT FEES REGISTRY CONTROLLER
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
        const btnRecord = document.getElementById("btnOpenRecordPayment");
        if (btnRecord) {
            btnRecord.addEventListener("click", () => {
                document.getElementById("recStudentName").value = "";
                document.getElementById("recRollId").value = "";
                document.getElementById("recAmount").value = "";
                openModal("recordPaymentModal");
            });
        }

        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        // Record Payment for individual student row
        document.querySelectorAll(".btn-action-pay").forEach(btn => {
            btn.addEventListener("click", function() {
                const student = this.getAttribute("data-student");
                const roll = this.getAttribute("data-roll");
                const dues = this.getAttribute("data-dues");

                document.getElementById("recStudentName").value = student;
                document.getElementById("recRollId").value = roll;
                document.getElementById("recAmount").value = dues > 0 ? dues : 10000;
                openModal("recordPaymentModal");
            });
        });

        // View Ledger Modal
        document.querySelectorAll(".btn-action-ledger").forEach(btn => {
            btn.addEventListener("click", function() {
                const student = this.getAttribute("data-student");
                const title = document.getElementById("ledgerStudentTitle");
                if (title) title.textContent = `Fee Payment Ledger Statement for ${student}`;
                openModal("studentLedgerModal");
            });
        });

        // Remind button
        document.querySelectorAll(".btn-action-remind").forEach(btn => {
            btn.addEventListener("click", function() {
                const student = this.getAttribute("data-student");
                showToast(`Payment alert sent to ${student}`, "info");
            });
        });

        // Form Submission
        const recordForm = document.getElementById("recordPaymentForm");
        if (recordForm) {
            recordForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const name = document.getElementById("recStudentName").value.trim();
                const amt = document.getElementById("recAmount").value;

                closeModal("recordPaymentModal");
                recordForm.reset();
                showToast(`Recorded fee payment of ₹${amt} for ${name}`, "success");
            });
        }

        // Filtering Logic
        let activeStatus = "all";
        let activeDept = "all";

        const searchInput = document.getElementById("studentFeeSearchInput");
        const deptSelect = document.getElementById("deptFilterSelect");
        const statusBtns = document.querySelectorAll(".filter-pill-btn");

        function filterRoster() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
            document.querySelectorAll("#studentFeeTable tbody tr").forEach(row => {
                const text = row.textContent.toLowerCase();
                const rowDept = row.getAttribute("data-dept");
                const rowStatus = row.getAttribute("data-status");

                const matchesQuery = !query || text.includes(query);
                const matchesDept = activeDept === "all" || rowDept === activeDept;
                const matchesStatus = activeStatus === "all" || rowStatus === activeStatus;

                row.style.display = matchesQuery && matchesDept && matchesStatus ? "" : "none";
            });
        }

        if (searchInput) searchInput.addEventListener("input", filterRoster);
        if (deptSelect) {
            deptSelect.addEventListener("change", function() {
                activeDept = this.value;
                filterRoster();
            });
        }

        statusBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                statusBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                activeStatus = this.getAttribute("data-filter");
                filterRoster();
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
