/**
 * UNIFYED HOD PORTAL - DEPARTMENT ANALYTICS CONTROLLER
 */
(function () {
    const analyticsData = {
        this_sem: {
            kpis: { gpa: "3.82 / 4.0", attendance: "91.2%", passRate: "87.5%", students: "1,248", trend: "+6.8%" },
            classes: [
                { name: "B.Tech CSE - Sem 1", score: 88, color: "var(--info)" },
                { name: "B.Tech ECE - Sem 2", score: 92, color: "var(--success)" },
                { name: "B.Tech Mechanical - Sem 1", score: 84, color: "var(--warning)" },
                { name: "B.Tech Civil - Sem 2", score: 86, color: "var(--accent)" },
                { name: "M.Tech AI & ML - Sem 1", score: 79, color: "var(--danger)" },
                { name: "MBA - Sem 1", score: 90, color: "var(--info)" }
            ],
            subjects: [
                { code: "CS201", title: "Data Structures & Algorithms", score: "8.7 / 10", pass: "96%", rating: "Outstanding", badge: "badge-success" },
                { code: "CS202", title: "Database Management Systems", score: "8.4 / 10", pass: "92%", rating: "Excellent", badge: "badge-success" },
                { code: "CS203", title: "Web Engineering Frameworks", score: "8.2 / 10", pass: "89%", rating: "Very Good", badge: "badge-primary" },
                { code: "CS204", title: "Design & Analysis of Algorithms", score: "7.8 / 10", pass: "82%", rating: "Good", badge: "badge-warning" },
                { code: "CS205", title: "Software Engineering & Agile", score: "7.5 / 10", pass: "78%", rating: "Average", badge: "badge-secondary" }
            ]
        },
        last_sem: {
            kpis: { gpa: "3.67 / 4.0", attendance: "88.9%", passRate: "88.7%", students: "1,203", trend: "+4.2%" },
            classes: [
                { name: "B.Tech CSE - Sem 1", score: 84, color: "var(--info)" },
                { name: "B.Tech ECE - Sem 2", score: 89, color: "var(--success)" },
                { name: "B.Tech Mechanical - Sem 1", score: 81, color: "var(--warning)" },
                { name: "B.Tech Civil - Sem 2", score: 83, color: "var(--accent)" },
                { name: "M.Tech AI & ML - Sem 1", score: 82, color: "var(--success)" },
                { name: "MBA - Sem 1", score: 87, color: "var(--info)" }
            ],
            subjects: [
                { code: "CS101", title: "Computer Programming in C", score: "8.5 / 10", pass: "94%", rating: "Excellent", badge: "badge-success" },
                { code: "CS102", title: "Discrete Mathematics", score: "8.1 / 10", pass: "88%", rating: "Very Good", badge: "badge-primary" },
                { code: "CS103", title: "Digital Logic Design", score: "7.9 / 10", pass: "84%", rating: "Good", badge: "badge-warning" }
            ]
        },
        this_year: {
            kpis: { gpa: "3.75 / 4.0", attendance: "90.1%", passRate: "88.1%", students: "1,248", trend: "+5.5%" },
            classes: [
                { name: "B.Tech CSE Overall", score: 86, color: "var(--info)" },
                { name: "B.Tech ECE Overall", score: 90, color: "var(--success)" },
                { name: "B.Tech Mechanical Overall", score: 83, color: "var(--warning)" },
                { name: "MBA Overall", score: 89, color: "var(--accent)" }
            ],
            subjects: [
                { code: "CS201", title: "Data Structures & Algorithms", score: "8.7 / 10", pass: "96%", rating: "Outstanding", badge: "badge-success" },
                { code: "CS202", title: "Database Management Systems", score: "8.4 / 10", pass: "92%", rating: "Excellent", badge: "badge-success" }
            ]
        }
    };

    let currentTerm = "this_sem";
    let currentProg = "all";

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

    function renderAnalytics() {
        const data = analyticsData[currentTerm] || analyticsData.this_sem;

        // Render KPIs
        const trendElem = document.getElementById("kpiHealthTrend");
        const gpaElem = document.getElementById("valAvgGpa");
        const attElem = document.getElementById("valAttendance");
        const passElem = document.getElementById("valPassRate");
        const studElem = document.getElementById("valStudents");

        if (trendElem) trendElem.textContent = data.kpis.trend;
        if (gpaElem) gpaElem.textContent = data.kpis.gpa;
        if (attElem) attElem.textContent = data.kpis.attendance;
        if (passElem) passElem.textContent = data.kpis.passRate;
        if (studElem) studElem.textContent = data.kpis.students;

        // Render Class Meters
        const metersContainer = document.getElementById("classMetersContainer");
        if (metersContainer) {
            let classes = data.classes;
            if (currentProg !== "all") {
                classes = classes.filter(c => c.name.toLowerCase().includes(currentProg.toLowerCase()));
            }

            metersContainer.innerHTML = classes.map(c => `
                <div class="class-perf-card">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">
                        <strong style="color:var(--text-primary);">${c.name}</strong>
                        <span style="color:${c.color}; font-weight:800;">${c.score}%</span>
                    </div>
                    <div style="background:var(--bg-card); height:8px; border-radius:4px; overflow:hidden;">
                        <div style="background:${c.color}; width:${c.score}%; height:100%; border-radius:4px;"></div>
                    </div>
                </div>
            `).join("");
        }

        // Render Subject Table
        const tbody = document.getElementById("subjectAnalyticsBody");
        if (tbody) {
            tbody.innerHTML = data.subjects.map(s => `
                <tr>
                    <td><strong style="color:var(--primary); font-size:13px;">${s.code}</strong></td>
                    <td><strong style="color:var(--text-primary); font-size:13px;">${s.title}</strong></td>
                    <td style="text-align:center;"><strong style="color:var(--text-primary);">${s.score}</strong></td>
                    <td style="text-align:center;"><span class="badge badge-success">${s.pass}</span></td>
                    <td style="text-align:center;"><span class="badge ${s.badge}">${s.rating}</span></td>
                </tr>
            `).join("");
        }
    }

    function initPage() {
        renderAnalytics();

        // Time Filter Handler
        const timeFilterSelect = document.getElementById("timeFilterSelect");
        if (timeFilterSelect) {
            timeFilterSelect.addEventListener("change", function () {
                currentTerm = this.value;
                renderAnalytics();
                showToast(`Updated analytics view for ${this.options[this.selectedIndex].text}`, "info");
            });
        }

        // Program Filter Handler
        const progFilterSelect = document.getElementById("progFilterSelect");
        if (progFilterSelect) {
            progFilterSelect.addEventListener("change", function () {
                currentProg = this.value;
                renderAnalytics();
                showToast(`Filtered by ${this.options[this.selectedIndex].text}`, "info");
            });
        }

        // Export Report CSV Handler
        const btnExportAnalytics = document.getElementById("btnExportAnalytics");
        if (btnExportAnalytics) {
            btnExportAnalytics.addEventListener("click", () => {
                const data = analyticsData[currentTerm];
                let reportContent = `UNIFYED HOD PORTAL - DEPARTMENT ANALYTICS REPORT\nGenerated: ${new Date().toLocaleDateString()}\n\nKPIS:\nGPA: ${data.kpis.gpa}\nAttendance: ${data.kpis.attendance}\nPass Rate: ${data.kpis.passRate}\nTotal Enrolled: ${data.kpis.students}\n\nSUBJECT PERFORMANCE:\n`;
                data.subjects.forEach(s => {
                    reportContent += `${s.code} - ${s.title}: Score ${s.score}, Pass ${s.pass}, Rating ${s.rating}\n`;
                });

                const blob = new Blob([reportContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "Department_Analytics_Report.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast("Downloaded Department Analytics Report CSV!", "success");
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
