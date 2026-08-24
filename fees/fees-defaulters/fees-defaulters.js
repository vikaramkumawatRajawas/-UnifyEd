/**
 * UNIFYED FEES MANAGER PORTAL - DEFAULTERS ROSTER CONTROLLER
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

        // Individual Send Notice
        document.querySelectorAll(".btn-send-notice").forEach(btn => {
            btn.addEventListener("click", function() {
                const student = this.getAttribute("data-student");
                const dues = this.getAttribute("data-dues");

                document.getElementById("noticeStudentName").value = student;
                document.getElementById("noticeDuesAmt").value = `₹${parseInt(dues).toLocaleString()}`;
                openModal("sendNoticeModal");
            });
        });

        // Form Submit
        const noticeForm = document.getElementById("sendNoticeForm");
        if (noticeForm) {
            noticeForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const student = document.getElementById("noticeStudentName").value;
                closeModal("sendNoticeModal");
                showToast(`Dispatched official SMS & email notice to ${student}`, "warning");
            });
        }

        // Mass Broadcast
        const btnBroadcast = document.getElementById("btnBroadcastAllNotices");
        if (btnBroadcast) {
            btnBroadcast.addEventListener("click", () => {
                showToast("Broadcasted urgent payment alerts to all 45 defaulter students", "warning");
            });
        }

        // Settle Dues
        document.querySelectorAll(".btn-settle-dues").forEach(btn => {
            btn.addEventListener("click", function() {
                const student = this.getAttribute("data-student");
                showToast(`Opening payment settlement terminal for ${student}...`, "info");
                setTimeout(() => {
                    window.location.href = "../fees-student-fees/fees-student-fees.html";
                }, 800);
            });
        });

        // Filtering
        let activeRisk = "all";
        let activeDept = "all";

        const searchInput = document.getElementById("defaulterSearchInput");
        const deptSelect = document.getElementById("deptDefaulterSelect");
        const riskBtns = document.querySelectorAll(".filter-pill-btn");

        function filterTable() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
            document.querySelectorAll("#defaultersTable tbody tr").forEach(row => {
                const text = row.textContent.toLowerCase();
                const rowRisk = row.getAttribute("data-risk");
                const rowDept = row.getAttribute("data-dept");

                const matchesQuery = !query || text.includes(query);
                const matchesRisk = activeRisk === "all" || rowRisk === activeRisk;
                const matchesDept = activeDept === "all" || rowDept === activeDept;

                row.style.display = matchesQuery && matchesRisk && matchesDept ? "" : "none";
            });
        }

        if (searchInput) searchInput.addEventListener("input", filterTable);
        if (deptSelect) {
            deptSelect.addEventListener("change", function() {
                activeDept = this.value;
                filterTable();
            });
        }

        riskBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                riskBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                activeRisk = this.getAttribute("data-risk");
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
