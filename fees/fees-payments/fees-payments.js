/**
 * UNIFYED FEES MANAGER PORTAL - PAYMENTS LOG CONTROLLER
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

        // View Receipt Popup
        document.querySelectorAll(".btn-view-receipt").forEach(btn => {
            btn.addEventListener("click", function() {
                const txn = this.getAttribute("data-txn");
                const student = this.getAttribute("data-student");
                const amt = this.getAttribute("data-amt");
                const mode = this.getAttribute("data-mode");

                document.getElementById("rcptTxnId").textContent = txn;
                document.getElementById("rcptAmt").textContent = `₹${parseInt(amt).toLocaleString()}`;
                document.getElementById("rcptStudent").textContent = student;
                document.getElementById("rcptMode").textContent = mode;

                openModal("receiptDetailsModal");
            });
        });

        // PDF Download
        document.querySelectorAll(".btn-download-pdf").forEach(btn => {
            btn.addEventListener("click", function() {
                const txn = this.getAttribute("data-txn");
                showToast(`Downloading PDF voucher for ${txn}...`, "info");
            });
        });

        // Verify Demand Draft
        document.querySelectorAll(".btn-verify-txn").forEach(btn => {
            btn.addEventListener("click", function() {
                const txn = this.getAttribute("data-txn");
                showToast(`Verified demand draft ${txn}. Status updated to Success!`, "success");
                const tr = this.closest("tr");
                if (tr) {
                    tr.setAttribute("data-status", "success");
                    const statusTd = tr.querySelector("td:nth-child(6)");
                    if (statusTd) {
                        statusTd.innerHTML = `<span class="status-pill status-success"><span class="status-dot"></span> Success</span>`;
                    }
                    this.parentElement.innerHTML = `<button class="act-btn act-btn-pdf btn-download-pdf" data-txn="${txn}"><i class="fa-solid fa-file-pdf"></i> PDF</button>`;
                }
            });
        });

        // Record Txn Modal
        const btnOpenTxn = document.getElementById("btnOpenRecordTxn");
        if (btnOpenTxn) {
            btnOpenTxn.addEventListener("click", () => {
                document.getElementById("txnStudentName").value = "";
                document.getElementById("txnAmount").value = "";
                openModal("recordTxnModal");
            });
        }

        const recordTxnForm = document.getElementById("recordTxnForm");
        if (recordTxnForm) {
            recordTxnForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const name = document.getElementById("txnStudentName").value.trim();
                const amt = document.getElementById("txnAmount").value;
                const newTxn = "TXN-" + Math.floor(100000 + Math.random() * 900000);

                closeModal("recordTxnModal");
                recordTxnForm.reset();
                showToast(`Successfully logged payment of ₹${amt} for ${name} (${newTxn})`, "success");
            });
        }

        // Filtering
        let activeMode = "all";
        let activeStatus = "all";

        const searchInput = document.getElementById("paymentSearchInput");
        const statusSelect = document.getElementById("statusFilterSelect");
        const modeBtns = document.querySelectorAll(".filter-pill-btn");

        function filterTable() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
            document.querySelectorAll("#paymentsTable tbody tr").forEach(row => {
                const text = row.textContent.toLowerCase();
                const rowMode = row.getAttribute("data-mode");
                const rowStatus = row.getAttribute("data-status");

                const matchesQuery = !query || text.includes(query);
                const matchesMode = activeMode === "all" || rowMode === activeMode;
                const matchesStatus = activeStatus === "all" || rowStatus === activeStatus;

                row.style.display = matchesQuery && matchesMode && matchesStatus ? "" : "none";
            });
        }

        if (searchInput) searchInput.addEventListener("input", filterTable);
        if (statusSelect) {
            statusSelect.addEventListener("change", function() {
                activeStatus = this.value;
                filterTable();
            });
        }

        modeBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                modeBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
                activeMode = this.getAttribute("data-mode");
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
