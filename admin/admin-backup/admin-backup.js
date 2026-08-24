/**
 * UNIFYED SYSTEM ADMIN PORTAL - BACKUP & RESTORE CONTROLLER
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
                document.querySelectorAll("#snapshotsTable tbody tr").forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = !q || text.includes(q) ? "" : "none";
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

        // Take Instant Snapshot Triggers
        function triggerInstantSnapshot() {
            showToast("Generating point-in-time database snapshot & SHA-256 checksum...", "info");
            setTimeout(() => showToast("Created full snapshot: unifyed_manual_backup_2026_08.sql.gz!", "success"), 1400);
        }

        const btnTakeSnapshot = document.getElementById("btnTakeSnapshot");
        if (btnTakeSnapshot) btnTakeSnapshot.addEventListener("click", triggerInstantSnapshot);

        const btnCreateInstantBackup = document.getElementById("btnCreateInstantBackup");
        if (btnCreateInstantBackup) btnCreateInstantBackup.addEventListener("click", triggerInstantSnapshot);

        // Sync Cloud Vault
        const btnSyncCloud = document.getElementById("btnSyncCloud");
        if (btnSyncCloud) {
            btnSyncCloud.addEventListener("click", () => {
                showToast("Synchronizing local backup archives to AWS S3 Cloud Vault...", "info");
                setTimeout(() => showToast("Cloud Vault sync complete! All 14 snapshots verified.", "success"), 1200);
            });
        }

        // Verify Checksums
        const btnVerifyAudit = document.getElementById("btnVerifyAudit");
        if (btnVerifyAudit) {
            btnVerifyAudit.addEventListener("click", () => {
                showToast("Auditing SHA-256 hash checksums across all snapshots...", "info");
                setTimeout(() => showToast("100% Checksum Verification Passed! 0 corruption errors.", "success"), 1200);
            });
        }

        // Save Schedule
        const btnSaveSchedule = document.getElementById("btnSaveSchedule");
        if (btnSaveSchedule) {
            btnSaveSchedule.addEventListener("click", () => {
                showToast("Saved automated cron backup schedule & retention settings!", "success");
            });
        }

        // Test Cloud Connection
        const btnTestCloud = document.getElementById("btnTestCloud");
        if (btnTestCloud) {
            btnTestCloud.addEventListener("click", () => {
                showToast("Pinged AWS S3 Vault endpoint (s3://unifyed-backup-vault-asia)...", "info");
                setTimeout(() => showToast("Cloud connection verified! Response time: 24ms", "success"), 1000);
            });
        }

        // Restore Modal Triggers
        let currentTargetSnapshot = "unifyed_full_backup_2026_08_20.sql.gz";

        const btnOpenRestoreModal = document.getElementById("btnOpenRestoreModal");
        if (btnOpenRestoreModal) {
            btnOpenRestoreModal.addEventListener("click", () => {
                const targetElem = document.getElementById("restoreTargetFilename");
                if (targetElem) targetElem.textContent = currentTargetSnapshot;
                openModal("restoreModal");
            });
        }

        document.querySelectorAll(".btn-restore-snap").forEach(btn => {
            btn.addEventListener("click", function() {
                currentTargetSnapshot = this.getAttribute("data-name") || "snapshot.sql.gz";
                const targetElem = document.getElementById("restoreTargetFilename");
                if (targetElem) targetElem.textContent = currentTargetSnapshot;
                openModal("restoreModal");
            });
        });

        // Confirm Restore
        const btnConfirmRestore = document.getElementById("btnConfirmRestore");
        if (btnConfirmRestore) {
            btnConfirmRestore.addEventListener("click", () => {
                closeModal("restoreModal");
                showToast(`Initiated system state restore from ${currentTargetSnapshot}...`, "warning");
                setTimeout(() => showToast("System state successfully restored!", "success"), 1500);
            });
        }

        // Download Snapshot
        document.querySelectorAll(".btn-dl-snap").forEach(btn => {
            btn.addEventListener("click", function() {
                showToast("Downloading backup archive (.SQL.GZ)...", "info");
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
