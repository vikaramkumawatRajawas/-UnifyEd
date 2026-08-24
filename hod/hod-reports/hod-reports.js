/**
 * UNIFYED HOD PORTAL - AUDIT RECORDS CONTROLLER
 */
(function () {
    const defaultReports = [
        { id: 1, name: "Academic Performance Report - Sem 1", type: "PDF", date: "Jan 02, 2026", size: "2.4 MB", icon: "fa-file-pdf", color: "#ef4444" },
        { id: 2, name: "Attendance Compliance Report - December", type: "XLSX", date: "Dec 28, 2025", size: "1.8 MB", icon: "fa-file-excel", color: "#10b981" },
        { id: 3, name: "Faculty Roster & Qualifications Audit", type: "PDF", date: "Dec 15, 2025", size: "3.2 MB", icon: "fa-file-pdf", color: "#ef4444" },
        { id: 4, name: "Semester Exam Results - Midterm", type: "XLSX", date: "Dec 10, 2025", size: "2.1 MB", icon: "fa-file-excel", color: "#10b981" },
        { id: 5, name: "Student Progress & Enrollment Log", type: "PDF", date: "Dec 05, 2025", size: "2.9 MB", icon: "fa-file-pdf", color: "#ef4444" }
    ];

    function getAuditReportsState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.auditReports && Array.isArray(parsed.auditReports) && parsed.auditReports.length > 0) {
                    return parsed.auditReports;
                }
            } catch (e) {}
        }
        return defaultReports;
    }

    function saveAuditReportsState(list) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.auditReports = list;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let reportList = getAuditReportsState();

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

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("active");
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("active");
    }

    function renderAuditTable() {
        const tbody = document.getElementById("auditRecordsBody");
        const countElem = document.getElementById("kpiRecordCount");

        if (countElem) countElem.textContent = reportList.length;
        if (!tbody) return;

        tbody.innerHTML = reportList.map(r => `
            <tr>
                <td>
                    <i class="fa-solid ${r.icon}" style="color:${r.color}; margin-right:8px; font-size:16px;"></i>
                    <strong style="color:var(--text-primary); font-size:13px;">${r.name}</strong>
                </td>
                <td><span class="badge ${r.type === 'PDF' ? 'badge-danger' : 'badge-success'}">${r.type}</span></td>
                <td style="text-align:center;"><span style="color:var(--text-secondary); font-size:12px;">${r.date}</span></td>
                <td style="text-align:center;"><strong style="color:var(--primary);">${r.size}</strong></td>
                <td style="text-align:center;">
                    <button type="button" class="btn btn-primary btn-download-report" data-name="${r.name}" data-type="${r.type}" style="padding:4px 10px; font-size:11px; margin-right:6px;" title="Download File"><i class="fa-solid fa-download"></i></button>
                    <button type="button" class="btn btn-secondary btn-delete-report" data-id="${r.id}" style="padding:4px 10px; font-size:11px; background:rgba(239,68,68,0.15); color:var(--danger); border:1px solid rgba(239,68,68,0.3);" title="Delete Record"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join("");

        // Attach Download Click Handlers
        document.querySelectorAll(".btn-download-report").forEach(btn => {
            btn.addEventListener("click", function () {
                const name = this.getAttribute("data-name");
                const type = this.getAttribute("data-type");

                const content = `UNIFYED HOD PORTAL - AUDIT RECORD\nDocument: ${name}\nFormat: ${type}\nExport Date: ${new Date().toLocaleDateString()}`;
                const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", `${name.replace(/[^a-z0-9]/gi, '_')}.${type.toLowerCase() === 'pdf' ? 'txt' : 'csv'}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast(`Downloaded audit record "${name}"!`, "success");
            });
        });

        // Attach Delete Click Handlers
        document.querySelectorAll(".btn-delete-report").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                reportList = reportList.filter(r => r.id !== id);
                saveAuditReportsState(reportList);
                renderAuditTable();
                showToast("Removed audit record from archive log", "info");
            });
        });
    }

    function initPage() {
        renderAuditTable();

        // Generate Report Trigger
        const btnGenerateReport = document.getElementById("btnGenerateReport");
        if (btnGenerateReport) {
            btnGenerateReport.addEventListener("click", () => openModal("generateReportModal"));
        }

        // Template Card Triggers
        document.querySelectorAll(".audit-template-card").forEach(card => {
            card.addEventListener("click", function () {
                const type = this.getAttribute("data-type");
                const title = this.getAttribute("data-title");

                const titleInput = document.getElementById("inputReportTitle");
                const typeSelect = document.getElementById("inputReportType");

                if (titleInput) titleInput.value = title;
                if (typeSelect) typeSelect.value = type;

                openModal("generateReportModal");
            });
        });

        // Generate Report Form Submission
        const generateReportForm = document.getElementById("generateReportForm");
        if (generateReportForm) {
            generateReportForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const title = document.getElementById("inputReportTitle").value.trim();
                const format = document.getElementById("inputReportFormat").value;

                if (!title) return;

                const newReport = {
                    id: Date.now(),
                    name: title,
                    type: format,
                    date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                    size: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
                    icon: format === "PDF" ? "fa-file-pdf" : "fa-file-excel",
                    color: format === "PDF" ? "#ef4444" : "#10b981"
                };

                reportList.unshift(newReport);
                saveAuditReportsState(reportList);
                renderAuditTable();
                closeModal("generateReportModal");
                generateReportForm.reset();
                showToast(`Generated audit record "${title}" (${format})!`, "success");
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

        // Sidebar Navigation Toggles
        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");
        if (menuToggle && sidebar) {
            menuToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                sidebar.classList.toggle("active");
            });
        }

        const desktopSidebarToggle = document.getElementById("desktopSidebarToggle");
        const portalLayout = document.querySelector(".portal-layout");
        if (desktopSidebarToggle && portalLayout) {
            desktopSidebarToggle.addEventListener("click", () => {
                portalLayout.classList.toggle("sidebar-collapsed");
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

        // Modal Close Triggers
        document.querySelectorAll("[data-close-modal]").forEach(btn => {
            btn.addEventListener("click", function () {
                const targetId = this.getAttribute("data-close-modal");
                closeModal(targetId);
            });
        });

        // Search Filter
        const searchInput = document.getElementById("portalSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll("tbody tr").forEach(row => {
                    row.style.display = query && !row.textContent.toLowerCase().includes(query) ? "none" : "";
                });
            });
        }

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
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
