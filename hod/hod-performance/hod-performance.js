/**
 * UNIFYED HOD PORTAL - ACADEMIC PERFORMANCE & AUDIT CONTROLLER
 */
(function () {
    const performanceData = {
        autumn2025: {
            kpis: { passRate: "94.2%", avgGpa: "8.6 / 10", papers: "38 Papers", syllabus: "92.4%" },
            batches: [
                { id: 1, name: "BCA 3rd Semester (BCA-3A)", lead: "Dr. Rajesh Kumar", students: "52 Students", passRate: "96.2%", avgMarks: "88.5 / 100", attendance: "95.8%", rating: "4.9", ratingVal: 4.9, notes: "Outstanding academic performance across all laboratory practicals and midterm assessments." },
                { id: 2, name: "B.Tech CSE 5th Semester (CSE-5B)", lead: "Prof. Meera Patel", students: "48 Students", passRate: "94.0%", avgMarks: "85.2 / 100", attendance: "94.1%", rating: "4.8", ratingVal: 4.8, notes: "Solid project submissions in Web Engineering and Operating Systems." },
                { id: 3, name: "MCA 2nd Semester (MCA-2A)", lead: "Dr. Kevin Anderson", students: "50 Students", passRate: "92.5%", avgMarks: "84.0 / 100", attendance: "93.5%", rating: "4.7", ratingVal: 4.7, notes: "High research interest in Cloud Computing modules." },
                { id: 4, name: "B.Tech CSE 7th Semester (CSE-7A)", lead: "Dr. Sarah Williams", students: "55 Students", passRate: "89.1%", avgMarks: "81.5 / 100", attendance: "91.8%", rating: "4.5", ratingVal: 4.5, notes: "Capstone project phase 1 completed on time." }
            ],
            subjects: [
                { name: "Database Management Systems", mastery: "92%", level: "92% Mastery (Outstanding)", color: "var(--primary)" },
                { name: "Web Technologies & Frameworks", mastery: "89%", level: "89% Mastery (Very Good)", color: "var(--accent)" },
                { name: "Artificial Intelligence & ML", mastery: "94%", level: "94% Mastery (Outstanding)", color: "var(--success)" },
                { name: "Data Structures & Algorithms", mastery: "86%", level: "86% Mastery (Good)", color: "var(--warning)" }
            ],
            grades: [
                { title: "O Grade (Outstanding: 90-100%)", count: "198 Students", pct: "32%", type: "badge-success" },
                { title: "A+ Grade (Excellent: 80-89%)", count: "272 Students", pct: "44%", type: "badge-primary" },
                { title: "A Grade (Very Good: 70-79%)", count: "111 Students", pct: "18%", type: "badge-warning" },
                { title: "B Grade (Above Average: 60-69%)", count: "39 Students", pct: "6%", type: "badge-secondary" }
            ]
        },
        spring2025: {
            kpis: { passRate: "91.8%", avgGpa: "8.3 / 10", papers: "31 Papers", syllabus: "88.6%" },
            batches: [
                { id: 1, name: "BCA 2nd Semester (BCA-2A)", lead: "Dr. Rajesh Kumar", students: "50 Students", passRate: "93.0%", avgMarks: "84.5 / 100", attendance: "92.4%", rating: "4.6", ratingVal: 4.6, notes: "Consistent progress in Object Oriented Programming with C++." },
                { id: 2, name: "B.Tech CSE 4th Semester (CSE-4B)", lead: "Prof. Meera Patel", students: "46 Students", passRate: "91.2%", avgMarks: "82.0 / 100", attendance: "91.5%", rating: "4.5", ratingVal: 4.5, notes: "Discrete Mathematics tutorials require additional practice sessions." },
                { id: 3, name: "MCA 1st Semester (MCA-1A)", lead: "Dr. Kevin Anderson", students: "48 Students", passRate: "90.0%", avgMarks: "80.5 / 100", attendance: "90.8%", rating: "4.4", ratingVal: 4.4, notes: "Good foundation in Computer Organization and Architecture." }
            ],
            subjects: [
                { name: "Object Oriented Programming", mastery: "88%", level: "88% Mastery (Very Good)", color: "var(--primary)" },
                { name: "Computer Networks & Security", mastery: "85%", level: "85% Mastery (Good)", color: "var(--accent)" },
                { name: "Software Engineering & Agile", mastery: "91%", level: "91% Mastery (Outstanding)", color: "var(--success)" },
                { name: "Discrete Mathematical Structures", mastery: "80%", level: "80% Mastery (Good)", color: "var(--warning)" }
            ],
            grades: [
                { title: "O Grade (Outstanding: 90-100%)", count: "165 Students", pct: "28%", type: "badge-success" },
                { title: "A+ Grade (Excellent: 80-89%)", count: "240 Students", pct: "41%", type: "badge-primary" },
                { title: "A Grade (Very Good: 70-79%)", count: "135 Students", pct: "23%", type: "badge-warning" },
                { title: "B Grade (Above Average: 60-69%)", count: "48 Students", pct: "8%", type: "badge-secondary" }
            ]
        }
    };

    let currentTerm = "autumn2025";

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

    function renderTermData(termKey) {
        const data = performanceData[termKey] || performanceData.autumn2025;

        // Render KPIs
        const passElem = document.getElementById("kpiPassRate");
        const gpaElem = document.getElementById("kpiAvgGpa");
        const papersElem = document.getElementById("kpiResearchPapers");
        const syllabusElem = document.getElementById("kpiSyllabusCompletion");

        if (passElem) passElem.textContent = data.kpis.passRate;
        if (gpaElem) gpaElem.textContent = data.kpis.avgGpa;
        if (papersElem) papersElem.textContent = data.kpis.papers;
        if (syllabusElem) syllabusElem.textContent = data.kpis.syllabus;

        // Render Batch Matrix Table
        const tbody = document.getElementById("batchPerfTableBody");
        if (tbody) {
            tbody.innerHTML = data.batches.map(b => `
                <tr>
                    <td>
                        <strong style="color:var(--text-primary);">${b.name}</strong><br>
                        <span style="font-size:11px; color:var(--text-tertiary);">Lead: ${b.lead}</span>
                    </td>
                    <td><strong style="color:var(--text-primary);">${b.students}</strong></td>
                    <td><span class="badge ${parseFloat(b.passRate) > 90 ? 'badge-success' : 'badge-warning'}">${b.passRate}</span></td>
                    <td><strong style="color:var(--text-primary);">${b.avgMarks}</strong></td>
                    <td><span class="badge badge-success">${b.attendance}</span></td>
                    <td><span style="color:#f59e0b; font-weight:700;"><i class="fa-solid fa-star"></i> ${b.rating}</span> / 5.0</td>
                    <td style="text-align:center;">
                        <button type="button" class="btn btn-secondary btn-audit-batch" data-id="${b.id}" style="padding:4px 12px; font-size:11px;"><i class="fa-solid fa-chart-pie"></i> Audit</button>
                    </td>
                </tr>
            `).join("");
        }

        // Attach Audit Click Handlers
        document.querySelectorAll(".btn-audit-batch").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                openBatchAudit(id, data.batches);
            });
        });

        // Render Subject Mastery
        const subjContainer = document.getElementById("subjectMasteryContainer");
        if (subjContainer) {
            subjContainer.innerHTML = data.subjects.map(s => `
                <div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:13px;">
                        <strong>${s.name}</strong>
                        <span style="color:${s.color}; font-weight:700;">${s.level}</span>
                    </div>
                    <div style="background:var(--bg-tertiary); height:10px; border-radius:5px; overflow:hidden;">
                        <div class="subject-meter-fill" style="background:${s.color}; width:${s.mastery};"></div>
                    </div>
                </div>
            `).join("");
        }

        // Render Grade Distribution
        const gradeContainer = document.getElementById("gradeDistContainer");
        if (gradeContainer) {
            gradeContainer.innerHTML = data.grades.map(g => `
                <div class="grade-dist-card">
                    <div>
                        <strong style="color:var(--text-primary); font-size:13px;">${g.title}</strong>
                        <div style="font-size:11px; color:var(--text-tertiary);">${g.count}</div>
                    </div>
                    <span class="badge ${g.type}">${g.pct}</span>
                </div>
            `).join("");
        }
    }

    function openBatchAudit(id, batches) {
        const batch = batches.find(b => b.id === id);
        if (!batch) return;

        const nameElem = document.getElementById("auditBatchName");
        const leadElem = document.getElementById("auditFacultyLead");
        const countElem = document.getElementById("auditStudentCount");
        const passElem = document.getElementById("auditPassRate");
        const marksElem = document.getElementById("auditAvgMarks");
        const notesElem = document.getElementById("auditSummaryNotes");

        if (nameElem) nameElem.textContent = batch.name;
        if (leadElem) leadElem.textContent = `Faculty Lead: ${batch.lead}`;
        if (countElem) countElem.textContent = `${batch.students} Enrolled`;
        if (passElem) passElem.textContent = batch.passRate;
        if (marksElem) marksElem.textContent = batch.avgMarks;
        if (notesElem) notesElem.textContent = batch.notes;

        openModal("batchAuditModal");
    }

    function initPage() {
        renderTermData(currentTerm);

        // Term Filter Handler
        const termSelect = document.getElementById("termSelect");
        if (termSelect) {
            termSelect.addEventListener("change", function () {
                currentTerm = this.value;
                renderTermData(currentTerm);
                showToast(`Updated performance view for ${this.options[this.selectedIndex].text}`, "info");
            });
        }

        // Export PDF Report Handler
        const btnExportAuditPdf = document.getElementById("btnExportAuditPdf");
        if (btnExportAuditPdf) {
            btnExportAuditPdf.addEventListener("click", () => {
                let reportContent = `UNIFYED HOD PORTAL - ACADEMIC AUDIT REPORT\nGenerated: ${new Date().toLocaleDateString()}\nTerm: ${currentTerm}\n\nOVERALL KPIS:\n`;
                const data = performanceData[currentTerm];
                reportContent += `Pass Rate: ${data.kpis.passRate}\nAverage GPA: ${data.kpis.avgGpa}\nResearch Papers: ${data.kpis.papers}\nSyllabus Completion: ${data.kpis.syllabus}\n\nBATCH BREAKDOWN:\n`;
                data.batches.forEach(b => {
                    reportContent += `- ${b.name} (Lead: ${b.lead}): Pass Rate ${b.passRate}, Avg Marks ${b.avgMarks}\n`;
                });
                const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "Department_Academic_Audit_Report.txt");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast("Downloaded Department Academic Audit Report!", "success");
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
                document.querySelectorAll("#batchPerfTableBody tr").forEach(row => {
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
