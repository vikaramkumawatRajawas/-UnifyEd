/**
 * UNIFYED FEES MANAGER PORTAL - RECEIPTS REGISTRY CONTROLLER
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

        // Receipt Preview Modal
        document.querySelectorAll(".btn-preview-rcpt").forEach(btn => {
            btn.addEventListener("click", function() {
                const rcpt = this.getAttribute("data-rcpt");
                const student = this.getAttribute("data-student");
                const amt = this.getAttribute("data-amt");
                const head = this.getAttribute("data-head");

                document.getElementById("previewVoucherNo").textContent = rcpt;
                document.getElementById("previewStudent").textContent = student;
                document.getElementById("previewHead").textContent = head;
                document.getElementById("previewAmt").textContent = `₹${parseInt(amt).toLocaleString()}`;

                openModal("receiptPreviewModal");
            });
        });

        // PDF Download
        document.querySelectorAll(".btn-download-pdf").forEach(btn => {
            btn.addEventListener("click", function() {
                const rcpt = this.getAttribute("data-rcpt");
                showToast(`Downloading certified PDF voucher for ${rcpt}...`, "info");
            });
        });

        // Generate Receipt Modal
        const btnOpenRcpt = document.getElementById("btnOpenGenerateRcpt");
        if (btnOpenRcpt) {
            btnOpenRcpt.addEventListener("click", () => {
                document.getElementById("genStudentName").value = "";
                document.getElementById("genAmount").value = "";
                openModal("generateReceiptModal");
            });
        }

        const generateForm = document.getElementById("generateReceiptForm");
        if (generateForm) {
            generateForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const name = document.getElementById("genStudentName").value.trim();
                const amt = document.getElementById("genAmount").value;
                const newRcpt = "RCP-2026-" + Math.floor(1000 + Math.random() * 9000);

                closeModal("generateReceiptModal");
                generateForm.reset();
                showToast(`Issued Tax Fee Voucher ${newRcpt} of ₹${amt} for ${name}`, "success");
            });
        }

        // Filtering
        let activeType = "all";

        const searchInput = document.getElementById("receiptSearchInput");
        const dateSelect = document.getElementById("dateFilterSelect");
        const typeBtns = document.querySelectorAll(".filter-pill-btn");

        function filterTable() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
            document.querySelectorAll("#receiptsTable tbody tr").forEach(row => {
                const text = row.textContent.toLowerCase();
                const rowType = row.getAttribute("data-type");

                const matchesQuery = !query || text.includes(query);
                const matchesType = activeType === "all" || rowType === activeType;

                row.style.display = matchesQuery && matchesType ? "" : "none";
            });
        }

        if (searchInput) searchInput.addEventListener("input", filterTable);
        if (dateSelect) dateSelect.addEventListener("change", filterTable);

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
