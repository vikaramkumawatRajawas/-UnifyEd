/**
 * UNIFYED SYSTEM ADMIN PORTAL - DATA MANAGEMENT CONTROLLER
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
                document.querySelectorAll("#migrationLogsTable tbody tr").forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = !q || text.includes(q) ? "" : "none";
                });
            });
        }

        // Drag and drop area trigger
        const dragDropArea = document.getElementById("dragDropArea");
        if (dragDropArea) {
            dragDropArea.addEventListener("click", () => openModal("importModal"));
        }

        // Modal triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        const btnOpenImport = document.getElementById("btnOpenImportModal");
        if (btnOpenImport) btnOpenImport.addEventListener("click", () => openModal("importModal"));

        const btnTriggerUpload = document.getElementById("btnTriggerUpload");
        if (btnTriggerUpload) btnTriggerUpload.addEventListener("click", () => openModal("importModal"));

        // Import form submission
        const importForm = document.getElementById("importForm");
        if (importForm) {
            importForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const entity = document.getElementById("importEntityType").value;
                closeModal("importModal");
                importForm.reset();
                showToast(`Successfully queued batch import for ${entity}!`, "success");
            });
        }

        // Generate Export trigger
        const btnTriggerExport = document.getElementById("btnTriggerExport");
        if (btnTriggerExport) {
            btnTriggerExport.addEventListener("click", () => {
                const dataset = document.getElementById("exportDatasetSelect").value;
                showToast(`Generating encrypted database dump for dataset: ${dataset}...`, "info");
            });
        }

        const btnOpenExportModal = document.getElementById("btnOpenExportModal");
        if (btnOpenExportModal) {
            btnOpenExportModal.addEventListener("click", () => {
                const dataset = document.getElementById("exportDatasetSelect").value;
                showToast(`Downloading database dump archive...`, "success");
            });
        }

        // Optimize database indexes trigger
        const btnOptimizeDb = document.getElementById("btnOptimizeDb");
        if (btnOptimizeDb) {
            btnOptimizeDb.addEventListener("click", () => {
                showToast("Re-indexing database foreign keys and flushing query cache...", "info");
                setTimeout(() => showToast("Database index optimization completed cleanly!", "success"), 1200);
            });
        }

        // Run Sanitation trigger
        const btnPurgeOrphans = document.getElementById("btnPurgeOrphans");
        const btnRunSanitation = document.getElementById("btnRunSanitation");
        
        function runSanitationTask() {
            showToast("Scanning database for unlinked references and orphaned tokens...", "info");
            setTimeout(() => showToast("Purged 0 orphaned keys. System health 99.8% clean!", "success"), 1200);
        }

        if (btnPurgeOrphans) btnPurgeOrphans.addEventListener("click", runSanitationTask);
        if (btnRunSanitation) btnRunSanitation.addEventListener("click", runSanitationTask);

        // View Log details
        document.querySelectorAll(".btn-view-log").forEach(btn => {
            btn.addEventListener("click", function() {
                showToast("Opening detailed migration log transcript...", "info");
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
