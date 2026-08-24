/**
 * UNIFYED FEES MANAGER PORTAL - AUDIT REPORTS CONTROLLER
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

        // Report Preview Modal
        document.querySelectorAll(".btn-preview-report").forEach(btn => {
            btn.addEventListener("click", function() {
                const code = this.getAttribute("data-code");
                const title = this.getAttribute("data-title");
                const val = this.getAttribute("data-val");

                document.getElementById("previewReportCode").textContent = code;
                document.getElementById("previewReportTitle").textContent = title;
                document.getElementById("previewReportVal").textContent = `₹${val}`;

                openModal("reportPreviewModal");
            });
        });

        // PDF Download
        document.querySelectorAll(".btn-download-report").forEach(btn => {
            btn.addEventListener("click", function() {
                const code = this.getAttribute("data-code");
                showToast(`Downloading certified audit dossier for ${code}...`, "info");
            });
        });

        // Generate Custom Audit Modal
        const btnOpenGen = document.getElementById("btnOpenGenerateReport");
        if (btnOpenGen) {
            btnOpenGen.addEventListener("click", () => {
                document.getElementById("repTitle").value = "";
                openModal("generateReportModal");
            });
        }

        const generateReportForm = document.getElementById("generateReportForm");
        if (generateReportForm) {
            generateReportForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const title = document.getElementById("repTitle").value.trim();
                const newCode = "AUD-2026-" + Math.floor(100 + Math.random() * 900);

                closeModal("generateReportModal");
                generateReportForm.reset();
                showToast(`Generated official Audit Dossier ${newCode} for "${title}"`, "success");
            });
        }

        // Filtering
        let activeCat = "all";

        const searchInput = document.getElementById("reportSearchInput");
        const fiscalSelect = document.getElementById("fiscalYearSelect");
        const catBtns = document.querySelectorAll(".filter-pill-btn");

        function filterTable() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
            document.querySelectorAll("#reportsTable tbody tr").forEach(row => {
                const text = row.textContent.toLowerCase();
                const rowCat = row.getAttribute("data-cat");

                const matchesQuery = !query || text.includes(query);
                const matchesCat = activeCat === "all" || rowCat === activeCat;

                row.style.display = matchesQuery && matchesCat ? "" : "none";
            });
        }

        if (searchInput) searchInput.addEventListener("input", filterTable);
        if (fiscalSelect) fiscalSelect.addEventListener("change", filterTable);

        catBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                catBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                activeCat = this.getAttribute("data-cat");
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
