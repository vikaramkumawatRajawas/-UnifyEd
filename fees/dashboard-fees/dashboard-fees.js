/**
 * UNIFYED FEES MANAGER PORTAL - EXECUTIVE DASHBOARD CONTROLLER
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
        // Read logged-in user details from auth session
        const loggedInUser = localStorage.getItem("loggedInUser");
        const loggedInId = localStorage.getItem("loggedInStudentId") || "FIN-EMP-108";
        const regFirst = localStorage.getItem("registeredFirstName");
        const regLast = localStorage.getItem("registeredLastName");

        let name = "Finance Manager";
        if (regFirst) {
            name = regLast ? `${regFirst} ${regLast}`.trim() : regFirst.trim();
        } else if (loggedInUser && loggedInUser.trim()) {
            if (loggedInUser.includes("@")) {
                name = loggedInUser.split("@")[0].split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            } else {
                name = loggedInUser.trim();
            }
        }

        const welcomeElem = document.getElementById("welcome-name");
        const hdrNameElem = document.getElementById("hdrFeesManagerName");
        const hdrCodeElem = document.getElementById("hdrFeesCode");

        if (welcomeElem) welcomeElem.textContent = name;
        if (hdrNameElem) hdrNameElem.textContent = name;
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

        // Modal Triggers
        const btnOpenGenerate = document.getElementById("btnOpenGenerateModal");
        const btnQuickGenerate = document.getElementById("btnQuickGenerate");
        if (btnOpenGenerate) btnOpenGenerate.addEventListener("click", () => openModal("generateReceiptModal"));
        if (btnQuickGenerate) btnQuickGenerate.addEventListener("click", () => openModal("generateReceiptModal"));

        const btnOpenReminder = document.getElementById("btnOpenReminderModal");
        const btnQuickBroadcast = document.getElementById("btnQuickBroadcast");
        if (btnOpenReminder) btnOpenReminder.addEventListener("click", () => openModal("sendReminderModal"));
        if (btnQuickBroadcast) btnQuickBroadcast.addEventListener("click", () => openModal("sendReminderModal"));

        // Close buttons for modals
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        // Generate Receipt Form Submit
        const generateForm = document.getElementById("generateReceiptForm");
        if (generateForm) {
            generateForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const name = document.getElementById("rcptStudentName").value.trim();
                const roll = document.getElementById("rcptRollNo").value.trim();
                const dept = document.getElementById("rcptDept").value;
                const cat = document.getElementById("rcptCategory").value;
                const amt = document.getElementById("rcptAmount").value;

                if (!name || !roll || !amt) {
                    showToast("Please fill all required fields", "warning");
                    return;
                }

                // Add row to recent payments table
                const tbody = document.querySelector("#recentPaymentsTable tbody");
                if (tbody) {
                    const newRow = document.createElement("tr");
                    newRow.innerHTML = `
                        <td><strong>${name}</strong><br><small style="color:var(--text-tertiary);">${dept} • Roll #${roll}</small></td>
                        <td>${cat}</td>
                        <td>₹${parseInt(amt).toLocaleString("en-IN")}</td>
                        <td><span class="status-pill status-paid">Paid</span></td>
                    `;
                    tbody.insertBefore(newRow, tbody.firstChild);
                }

                closeModal("generateReceiptModal");
                generateForm.reset();
                showToast(`Digital Receipt generated for ${name} (₹${amt})`, "success");
            });
        }

        // Broadcast Reminder Form Submit
        const broadcastForm = document.getElementById("broadcastReminderForm");
        if (broadcastForm) {
            broadcastForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const group = document.getElementById("remRecipientGroup").value;
                closeModal("sendReminderModal");
                broadcastForm.reset();
                showToast(`Broadcast reminder dispatched to ${group}`, "info");
            });
        }

        // Single Student Remind Buttons
        document.querySelectorAll(".btn-remind-single").forEach(btn => {
            btn.addEventListener("click", function() {
                const student = this.getAttribute("data-student");
                showToast(`Payment reminder SMS & Email sent to ${student}`, "info");
            });
        });

        // Live Table Filter
        const searchInput = document.getElementById("feesSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function() {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll(".fees-table tbody tr").forEach(row => {
                    row.style.display = query && !row.textContent.toLowerCase().includes(query) ? "none" : "";
                });
            });
        }

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedInStudentId");
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
