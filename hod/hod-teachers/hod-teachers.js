/**
 * UNIFYED HOD PORTAL - FACULTY ROSTER CONTROLLER
 */
(function () {
    const defaultFaculty = [
        { id: 1, name: "Dr. Rajesh Kumar", empId: "CSE-EMP-204", designation: "Senior Professor & HOD", spec: "Artificial Intelligence & DBMS", qualification: "Ph.D. in Computer Science (IIT Delhi)", classes: "BCA-3A (DBMS), B.Tech-5B (AI)", rating: "4.9", status: "On Duty", avatar: "RK" },
        { id: 2, name: "Prof. Meera Patel", empId: "CSE-EMP-309", designation: "Associate Professor", spec: "Web Tech & Full Stack", qualification: "M.Tech in Software Engineering", classes: "CSE-4B (Web Tech), MCA-2A (Node.js)", rating: "4.8", status: "On Duty", avatar: "MP" },
        { id: 3, name: "Dr. Kevin Anderson", empId: "CSE-EMP-412", designation: "Assistant Professor", spec: "Data Structures & Algorithms", qualification: "Ph.D. in Computer Algorithms (Stanford)", classes: "BCA-3A (DS), B.Tech-5A (Algo)", rating: "4.7", status: "On Research Leave", avatar: "KA" },
        { id: 4, name: "Dr. Ananya Sharma", empId: "CSE-EMP-450", designation: "Associate Professor", spec: "Cloud Computing & DevOps", qualification: "Ph.D. in Cloud Architecture", classes: "CSE-2B, M.Tech-1A", rating: "4.9", status: "On Duty", avatar: "AS" }
    ];

    function getFacultyState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.faculty && parsed.faculty.length > 0) {
                    return parsed.faculty.map((item, idx) => ({
                        id: item.id || idx + 1,
                        name: item.name,
                        empId: item.empId || `CSE-EMP-${200 + idx * 15}`,
                        designation: item.designation || "Faculty Professor",
                        spec: item.spec || "Computer Science",
                        qualification: item.qualification || "Ph.D. / M.Tech",
                        classes: item.classes || "CSE Courses",
                        rating: item.rating || "4.8",
                        status: item.status === "Active" ? "On Duty" : (item.status || "On Duty"),
                        avatar: item.avatar || item.name.split(" ").map(n=>n[0]).join("").slice(0,2)
                    }));
                }
            } catch (e) {}
        }
        return defaultFaculty;
    }

    function saveFacultyState(facultyList) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = savedState ? JSON.parse(savedState) : {};
        stateObj.faculty = facultyList;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let facultyList = getFacultyState();

    // Toast Alert Manager
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

    // Render Table & Grid Views
    function renderRoster() {
        const tbody = document.getElementById("profTableBody");
        const grid = document.getElementById("rosterGridView");
        const badgeCount = document.getElementById("rosterBadgeCount");
        const totalFacultyKpi = document.getElementById("totalFacultyKpi");

        if (badgeCount) badgeCount.textContent = `${facultyList.length} Professors`;
        if (totalFacultyKpi) totalFacultyKpi.textContent = facultyList.length;

        // Render Table View
        if (tbody) {
            tbody.innerHTML = facultyList.map(prof => `
                <tr>
                    <td>
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div class="faculty-avatar-circle">${prof.avatar}</div>
                            <div>
                                <strong style="color:var(--text-primary); font-size:14px;">${prof.name}</strong>
                                <div style="font-size:11px; color:var(--text-secondary);">${prof.designation} • ${prof.empId}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div style="font-weight:600; color:var(--text-primary);">${prof.spec}</div>
                        <div style="font-size:11px; color:var(--text-tertiary);">${prof.qualification}</div>
                    </td>
                    <td><span class="badge badge-primary">${prof.classes}</span></td>
                    <td>
                        <span style="color:#f59e0b; font-weight:700; font-size:13px;"><i class="fa-solid fa-star"></i> ${prof.rating}</span> / 5.0
                    </td>
                    <td>
                        <span class="badge ${prof.status.includes('Leave') ? 'badge-warning' : 'badge-success'}">
                            <i class="fa-solid ${prof.status.includes('Leave') ? 'fa-clock' : 'fa-circle'}" style="font-size:7px; margin-right:4px;"></i> ${prof.status}
                        </span>
                    </td>
                    <td style="text-align:center;">
                        <button class="btn btn-secondary btn-view-dossier" data-id="${prof.id}" style="padding:4px 10px; font-size:11px;"><i class="fa-solid fa-eye"></i> View</button>
                        <button class="btn btn-secondary" style="padding:4px 10px; font-size:11px; color:var(--primary);" onclick="showToast('Editing ${prof.name} role details', 'info')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    </td>
                </tr>
            `).join("");
        }

        // Render Grid View
        if (grid) {
            grid.innerHTML = facultyList.map(prof => `
                <div class="faculty-grid-card">
                    <div class="faculty-card-header">
                        <div class="faculty-avatar-circle" style="width:48px; height:48px; font-size:16px;">${prof.avatar}</div>
                        <div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block;">${prof.name}</strong>
                            <span style="font-size:12px; color:var(--text-secondary);">${prof.designation}</span>
                            <div style="font-size:11px; color:var(--primary); font-weight:700;">${prof.empId}</div>
                        </div>
                    </div>
                    <div class="faculty-card-body">
                        <div style="font-weight:600; color:var(--text-primary); margin-bottom:4px;">${prof.spec}</div>
                        <div style="font-size:11px; color:var(--text-tertiary);">${prof.classes}</div>
                    </div>
                    <div class="faculty-card-footer">
                        <span class="badge ${prof.status.includes('Leave') ? 'badge-warning' : 'badge-success'}">${prof.status}</span>
                        <button class="btn btn-primary btn-view-dossier" data-id="${prof.id}" style="height:30px; padding:4px 12px; font-size:11px;">View Dossier</button>
                    </div>
                </div>
            `).join("");
        }

        // Attach Dossier View Trigger
        document.querySelectorAll(".btn-view-dossier").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                openFacultyDossier(id);
            });
        });
    }

    function openFacultyDossier(id) {
        const prof = facultyList.find(p => p.id === id);
        if (!prof) return;

        document.getElementById("dossierAvatarCircle").textContent = prof.avatar;
        document.getElementById("dossierProfName").textContent = prof.name;
        document.getElementById("dossierProfEmpId").textContent = `${prof.empId} • ${prof.designation}`;
        document.getElementById("dossierProfSpec").textContent = `${prof.spec} (${prof.qualification})`;
        document.getElementById("dossierClasses").textContent = prof.classes;
        document.getElementById("dossierStatus").textContent = `${prof.rating} / 5.0 Rating • ${prof.status}`;

        openModal("dossierModal");
    }

    // View Switching (Table vs Grid)
    window.switchRosterView = function (mode) {
        const table = document.getElementById("rosterTableView");
        const grid = document.getElementById("rosterGridView");
        const btnTable = document.getElementById("viewTableBtn");
        const btnGrid = document.getElementById("viewGridBtn");

        if (mode === "grid") {
            table.style.display = "none";
            grid.style.display = "grid";
            btnGrid.classList.add("active");
            btnTable.classList.remove("active");
        } else {
            table.style.display = "block";
            grid.style.display = "none";
            btnTable.classList.add("active");
            btnGrid.classList.remove("active");
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        renderRoster();

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

        // Open Add Professor Modal
        const btnOpenAddProfModal = document.getElementById("btnOpenAddProfModal");
        if (btnOpenAddProfModal) {
            btnOpenAddProfModal.addEventListener("click", () => openModal("addProfModal"));
        }

        // Export Roster PDF
        const btnExportRosterPdf = document.getElementById("btnExportRosterPdf");
        if (btnExportRosterPdf) {
            btnExportRosterPdf.addEventListener("click", () => {
                showToast("Generating Department Faculty Roster PDF...", "info");
                setTimeout(() => window.print(), 500);
            });
        }

        // Onboard Faculty Form Submit
        const addProfForm = document.getElementById("addProfForm");
        if (addProfForm) {
            addProfForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("inputProfName").value.trim();
                const empId = document.getElementById("inputProfEmpId").value.trim();
                const designation = document.getElementById("inputProfDesignation").value;
                const spec = document.getElementById("inputProfSpec").value.trim();
                const classes = document.getElementById("inputProfClasses").value.trim();

                if (!name || !classes) return;

                const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

                const newProf = {
                    id: Date.now(),
                    name: name,
                    empId: empId || `CSE-EMP-${Math.floor(Math.random() * 800 + 100)}`,
                    designation: designation,
                    spec: spec || "Computer Science",
                    qualification: "M.Tech / Ph.D.",
                    classes: classes,
                    rating: "5.0",
                    status: "On Duty",
                    avatar: initials
                };

                facultyList.push(newProf);
                saveFacultyState(facultyList);
                renderRoster();
                closeModal("addProfModal");
                addProfForm.reset();
                showToast(`Professor ${name} successfully onboarded!`, "success");
            });
        }

        // Live Search Filter
        const searchInput = document.getElementById("portalSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll("#profTableBody tr").forEach(row => {
                    row.style.display = query && !row.textContent.toLowerCase().includes(query) ? "none" : "";
                });
                document.querySelectorAll("#rosterGridView .faculty-grid-card").forEach(card => {
                    card.style.display = query && !card.textContent.toLowerCase().includes(query) ? "none" : "";
                });
            });
        }

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = "../../auth/login.html";
            });
        });
    });
})();

