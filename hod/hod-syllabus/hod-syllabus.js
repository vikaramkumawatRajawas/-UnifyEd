/**
 * UNIFYED HOD PORTAL - SYLLABUS & AUDIT CONTROL CONTROLLER
 */
(function () {
    const defaultEngPrograms = [
        { id: 1, name: "B.Tech CSE", sem: "Sem 1", courses: 6, credits: 26, status: "Active" },
        { id: 2, name: "B.Tech ECE", sem: "Sem 1", courses: 6, credits: 26, status: "Active" },
        { id: 3, name: "B.Tech Mechanical", sem: "Sem 2", courses: 6, credits: 26, status: "Active" },
        { id: 4, name: "B.Tech Civil", sem: "Sem 2", courses: 6, credits: 26, status: "Active" },
        { id: 5, name: "M.Tech AI & ML", sem: "Sem 1", courses: 5, credits: 24, status: "Draft" }
    ];

    const defaultMgmtPrograms = [
        { id: 1, name: "MBA", spec: "Finance", sem: "Sem 1", courses: 5, status: "Active" },
        { id: 2, name: "MBA", spec: "HR Management", sem: "Sem 1", courses: 5, status: "Active" },
        { id: 3, name: "BBA", spec: "General", sem: "Sem 1", courses: 6, status: "Active" }
    ];

    function getSyllabusState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.syllabi && Array.isArray(parsed.syllabi) && parsed.syllabi.length > 0) {
                    return parsed.syllabi;
                }
            } catch (e) {}
        }
        return defaultEngPrograms;
    }

    function saveSyllabusState(engList) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.syllabi = engList;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let engPrograms = getSyllabusState();
    let mgmtPrograms = defaultMgmtPrograms;

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

    function renderSyllabusTables() {
        const engBody = document.getElementById("engTableBody");
        const mgmtBody = document.getElementById("mgmtTableBody");
        const approvedCountElem = document.getElementById("kpiApprovedCourses");

        let totalCourses = 0;
        engPrograms.forEach(p => totalCourses += (p.courses || 1));
        mgmtPrograms.forEach(p => totalCourses += (p.courses || 1));

        if (approvedCountElem) approvedCountElem.textContent = totalCourses;

        // Render Engineering Programs Table
        if (engBody) {
            engBody.innerHTML = engPrograms.map(prog => `
                <tr>
                    <td><strong style="color:var(--text-primary); font-size:14px;">${prog.name}</strong></td>
                    <td><span class="badge badge-primary">${prog.sem}</span></td>
                    <td style="text-align:center;"><strong style="color:var(--text-primary);">${prog.courses}</strong></td>
                    <td style="text-align:center;"><strong style="color:var(--primary);">${prog.credits}</strong></td>
                    <td style="text-align:center;">
                        <span class="badge ${prog.status === 'Active' ? 'badge-success' : 'badge-warning'}">${prog.status}</span>
                    </td>
                    <td style="text-align:center;">
                        <button type="button" class="btn btn-secondary btn-view-course" data-name="${prog.name}" data-sem="${prog.sem}" data-courses="${prog.courses}" data-credits="${prog.credits}" style="padding:4px 12px; font-size:11px;"><i class="fa-solid fa-eye"></i> View</button>
                    </td>
                </tr>
            `).join("");
        }

        // Render Management Programs Table
        if (mgmtBody) {
            mgmtBody.innerHTML = mgmtPrograms.map(prog => `
                <tr>
                    <td><strong style="color:var(--text-primary); font-size:14px;">${prog.name}</strong></td>
                    <td><span style="color:var(--text-secondary); font-size:12px;">${prog.spec}</span></td>
                    <td style="text-align:center;"><span class="badge badge-primary">${prog.sem}</span></td>
                    <td style="text-align:center;"><strong style="color:var(--text-primary);">${prog.courses}</strong></td>
                    <td style="text-align:center;">
                        <span class="badge badge-success">${prog.status}</span>
                    </td>
                    <td style="text-align:center;">
                        <button type="button" class="btn btn-secondary btn-view-course" data-name="${prog.name} (${prog.spec})" data-sem="${prog.sem}" data-courses="${prog.courses}" data-credits="24" style="padding:4px 12px; font-size:11px;"><i class="fa-solid fa-eye"></i> View</button>
                    </td>
                </tr>
            `).join("");
        }

        // Attach View Buttons
        document.querySelectorAll(".btn-view-course").forEach(btn => {
            btn.addEventListener("click", function () {
                const name = this.getAttribute("data-name");
                const sem = this.getAttribute("data-sem");
                const courses = this.getAttribute("data-courses");
                const credits = this.getAttribute("data-credits");

                openCourseDetail(name, sem, courses, credits);
            });
        });
    }

    function openCourseDetail(name, sem, courses, credits) {
        const titleElem = document.getElementById("detailProgramTitle");
        const infoElem = document.getElementById("detailSemesterInfo");

        if (titleElem) titleElem.textContent = name;
        if (infoElem) infoElem.textContent = `${sem} • ${courses} Courses • ${credits} Total Credits`;

        openModal("courseDetailModal");
    }

    function initPage() {
        renderSyllabusTables();

        // Add Course Trigger
        const btnAddCourse = document.getElementById("btnAddCourse");
        if (btnAddCourse) {
            btnAddCourse.addEventListener("click", () => openModal("addCourseModal"));
        }

        // Export Syllabus CSV Trigger
        const btnExportSyllabus = document.getElementById("btnExportSyllabus");
        if (btnExportSyllabus) {
            btnExportSyllabus.addEventListener("click", () => {
                let csvContent = "Program,Semester,Courses Count,Credits,Status\n";
                engPrograms.forEach(p => {
                    csvContent += `"${p.name}","${p.sem}","${p.courses}","${p.credits}","${p.status}"\n`;
                });
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "Department_Syllabus_Audit_Export.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast("Downloaded Department Syllabus CSV export!", "success");
            });
        }

        // Import Curriculum Trigger
        const btnImportCurriculum = document.getElementById("btnImportCurriculum");
        if (btnImportCurriculum) {
            btnImportCurriculum.addEventListener("click", () => {
                showToast("Curriculum Import tool ready. Select file to upload.", "info");
            });
        }

        // Add Course Form Submission
        const addCourseForm = document.getElementById("addCourseForm");
        if (addCourseForm) {
            addCourseForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("inputCourseName").value.trim();
                const category = document.getElementById("inputProgramType").value;
                const sem = document.getElementById("inputSemester").value.trim();
                const credits = parseInt(document.getElementById("inputCredits").value) || 4;
                const status = document.getElementById("inputCourseStatus").value;

                if (!name) return;

                const newProg = {
                    id: Date.now(),
                    name: name,
                    sem: sem,
                    courses: 1,
                    credits: credits,
                    status: status
                };

                if (category === "management") {
                    mgmtPrograms.push({ id: Date.now(), name: name, spec: "General", sem: sem, courses: 1, status: status });
                } else {
                    engPrograms.push(newProg);
                    saveSyllabusState(engPrograms);
                }

                renderSyllabusTables();
                closeModal("addCourseModal");
                addCourseForm.reset();
                showToast(`Course "${name}" added to syllabus governance!`, "success");
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
