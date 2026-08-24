/**
 * UNIFYED HOD PORTAL - STUDENTS MASTER REGISTRY CONTROLLER
 */
(function () {
    const defaultStudents = [
        { id: 1, name: "Vikram Kumawat", roll: "STU202600145", className: "BCA 3rd Sem (BCA-3A)", classKey: "bca3", email: "vikram@uem.edu.in", phone: "+91 98765 43210", attendance: "96.5%", cgpa: "8.8", status: "Enrolled", avatar: "VK" },
        { id: 2, name: "Rohit Sharma", roll: "STU202600146", className: "B.Tech CSE 5th Sem (CSE-5B)", classKey: "cse5", email: "rohit@uem.edu.in", phone: "+91 98765 43211", attendance: "94.2%", cgpa: "8.5", status: "Enrolled", avatar: "RS" },
        { id: 3, name: "Ananya Gupta", roll: "STU202600147", className: "BCA 3rd Sem (BCA-3A)", classKey: "bca3", email: "ananya@uem.edu.in", phone: "+91 98765 43212", attendance: "88.0%", cgpa: "9.1", status: "Enrolled", avatar: "AG" },
        { id: 4, name: "Aarav Mehta", roll: "STU202600148", className: "MCA 2nd Sem (MCA-2A)", classKey: "mca2", email: "aarav@uem.edu.in", phone: "+91 98765 43213", attendance: "97.8%", cgpa: "9.4", status: "Enrolled", avatar: "AM" }
    ];

    function getStudentState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.students && Array.isArray(parsed.students) && parsed.students.length > 0) {
                    return parsed.students;
                }
            } catch (e) {}
        }
        return defaultStudents;
    }

    function saveStudentState(studentsList) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.students = studentsList;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let studentsList = getStudentState();

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

    // Render Table & Cards Grid Views
    function renderStudents() {
        const tbody = document.getElementById("studentTableBody");
        const grid = document.getElementById("studentGridView");
        const kpiTotalStudents = document.getElementById("kpiTotalStudents");

        if (kpiTotalStudents) kpiTotalStudents.textContent = 620 + (studentsList.length - defaultStudents.length);

        // Render Table View
        if (tbody) {
            tbody.innerHTML = studentsList.map(stu => `
                <tr data-class="${stu.classKey || 'bca3'}">
                    <td>
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div class="student-card-avatar" style="width:40px; height:40px; font-size:14px;">${stu.avatar || 'ST'}</div>
                            <div>
                                <strong style="color:var(--text-primary); font-size:14px;">${stu.name}</strong>
                                <div style="font-size:11px; color:var(--text-secondary);">${stu.className}</div>
                            </div>
                        </div>
                    </td>
                    <td><strong style="color:var(--primary); font-size:13px;">${stu.roll}</strong></td>
                    <td><span class="badge badge-primary">${stu.className}</span></td>
                    <td>
                        <div style="font-size:12px; color:var(--text-primary);">${stu.email}</div>
                        <div style="font-size:11px; color:var(--text-tertiary);">${stu.phone}</div>
                    </td>
                    <td><span class="badge ${parseFloat(stu.attendance) < 90 ? 'badge-warning' : 'badge-success'}">${stu.attendance}</span></td>
                    <td><strong style="color:#10b981;">${stu.cgpa} / 10</strong></td>
                    <td><span class="badge badge-success"><i class="fa-solid fa-circle" style="font-size:7px; margin-right:4px;"></i> ${stu.status || 'Enrolled'}</span></td>
                    <td style="text-align:center;">
                        <button class="btn btn-secondary btn-view-dossier" data-id="${stu.id}" style="padding:4px 10px; font-size:11px;"><i class="fa-solid fa-eye"></i> View</button>
                        <button class="btn btn-secondary btn-edit-student" data-id="${stu.id}" style="padding:4px 10px; font-size:11px; color:var(--primary);"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    </td>
                </tr>
            `).join("");
        }

        // Render Grid Cards View
        if (grid) {
            grid.innerHTML = studentsList.map(stu => `
                <div class="student-grid-card" data-class="${stu.classKey || 'bca3'}">
                    <div class="student-card-header">
                        <div class="student-card-avatar">${stu.avatar || 'ST'}</div>
                        <div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block;">${stu.name}</strong>
                            <span style="font-size:12px; color:var(--text-secondary);">${stu.className}</span>
                            <div style="font-size:11px; color:var(--primary); font-weight:700;">${stu.roll}</div>
                        </div>
                    </div>
                    <div class="student-card-body">
                        <div class="student-metric-row">
                            <span>Attendance Progress:</span>
                            <strong style="color:${parseFloat(stu.attendance) < 90 ? 'var(--warning)' : 'var(--success)'};">${stu.attendance}</strong>
                        </div>
                        <div class="student-metric-row">
                            <span>Cumulative CGPA:</span>
                            <strong style="color:var(--primary);">${stu.cgpa} / 10</strong>
                        </div>
                    </div>
                    <div class="student-card-footer">
                        <span class="badge badge-success">${stu.status || 'Enrolled'}</span>
                        <div>
                            <button class="btn btn-secondary btn-edit-student" data-id="${stu.id}" style="height:30px; padding:4px 10px; font-size:11px; margin-right:4px;"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                            <button class="btn btn-primary btn-view-dossier" data-id="${stu.id}" style="height:30px; padding:4px 10px; font-size:11px;">View Profile</button>
                        </div>
                    </div>
                </div>
            `).join("");
        }

        // Attach Dossier & Edit Triggers
        document.querySelectorAll(".btn-view-dossier").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                openStudentDossier(id);
            });
        });

        document.querySelectorAll(".btn-edit-student").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                openEditStudentModal(id);
            });
        });
    }

    function openStudentDossier(id) {
        const stu = studentsList.find(s => s.id === id);
        if (!stu) return;

        const avatarElem = document.getElementById("dossierStudentAvatar");
        const nameElem = document.getElementById("dossierStudentName");
        const rollElem = document.getElementById("dossierStudentRoll");
        const contactElem = document.getElementById("dossierStudentContact");
        const attElem = document.getElementById("dossierStudentAttendance");
        const cgpaElem = document.getElementById("dossierStudentCgpa");

        if (avatarElem) avatarElem.textContent = stu.avatar || 'ST';
        if (nameElem) nameElem.textContent = stu.name;
        if (rollElem) rollElem.textContent = `${stu.roll} • ${stu.className}`;
        if (contactElem) contactElem.textContent = `${stu.email} • ${stu.phone}`;
        if (attElem) attElem.textContent = stu.attendance;
        if (cgpaElem) cgpaElem.textContent = `${stu.cgpa} / 10`;

        openModal("studentDossierModal");
    }

    function openEditStudentModal(id) {
        const stu = studentsList.find(s => s.id === id);
        if (!stu) return;

        document.getElementById("editStudentId").value = stu.id;
        document.getElementById("editStudentName").value = stu.name;
        document.getElementById("editStudentRoll").value = stu.roll;
        document.getElementById("editStudentClass").value = stu.className;
        document.getElementById("editStudentAttendance").value = stu.attendance;
        document.getElementById("editStudentCgpa").value = stu.cgpa;
        document.getElementById("editStudentEmail").value = stu.email;
        document.getElementById("editStudentPhone").value = stu.phone;

        openModal("editStudentModal");
    }

    // View Switcher (Table vs Grid)
    window.switchStudentView = function (mode) {
        const table = document.getElementById("studentTableView");
        const grid = document.getElementById("studentGridView");
        const btnTable = document.getElementById("viewTableBtn");
        const btnGrid = document.getElementById("viewGridBtn");

        if (mode === "grid") {
            if (table) table.style.display = "none";
            if (grid) grid.style.display = "grid";
            if (btnGrid) btnGrid.classList.add("active");
            if (btnTable) btnTable.classList.remove("active");
        } else {
            if (table) table.style.display = "block";
            if (grid) grid.style.display = "none";
            if (btnTable) btnTable.classList.add("active");
            if (btnGrid) btnGrid.classList.remove("active");
        }
    };

    function initPage() {
        renderStudents();

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

        // Open Register Student Modal
        const btnOpenAddStudentModal = document.getElementById("btnOpenAddStudentModal");
        if (btnOpenAddStudentModal) {
            btnOpenAddStudentModal.addEventListener("click", () => openModal("addStudentModal"));
        }

        // Working Export Excel Action (Generates CSV File Download)
        const btnExportExcel = document.getElementById("btnExportExcel");
        if (btnExportExcel) {
            btnExportExcel.addEventListener("click", () => {
                let csvContent = "Roll Number,Student Name,Class & Semester,Email,Phone,Attendance,CGPA,Status\n";
                studentsList.forEach(s => {
                    csvContent += `"${s.roll}","${s.name}","${s.className}","${s.email}","${s.phone}","${s.attendance}","${s.cgpa}","${s.status || 'Enrolled'}"\n`;
                });
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "Students_Master_Registry.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast("Downloaded Students Master Registry CSV file!", "success");
            });
        }

        // Add Student Form Submission
        const addStudentForm = document.getElementById("addStudentForm");
        if (addStudentForm) {
            addStudentForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("inputStudentName").value.trim();
                const roll = document.getElementById("inputStudentRoll").value.trim();
                const className = document.getElementById("inputStudentClass").value;
                const email = document.getElementById("inputStudentEmail").value.trim();
                const phone = document.getElementById("inputStudentPhone").value.trim();

                if (!name || !roll) return;

                let classKey = "bca3";
                if (className.includes("CSE")) classKey = "cse5";
                if (className.includes("MCA")) classKey = "mca2";

                const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

                const newStudent = {
                    id: Date.now(),
                    name: name,
                    roll: roll,
                    className: className,
                    classKey: classKey,
                    email: email,
                    phone: phone,
                    attendance: "95.0%",
                    cgpa: "8.5",
                    status: "Enrolled",
                    avatar: initials
                };

                studentsList.push(newStudent);
                saveStudentState(studentsList);
                renderStudents();
                closeModal("addStudentModal");
                addStudentForm.reset();
                showToast(`Student ${name} (${roll}) registered successfully!`, "success");
            });
        }

        // Edit Student Form Submission
        const editStudentForm = document.getElementById("editStudentForm");
        if (editStudentForm) {
            editStudentForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const id = parseInt(document.getElementById("editStudentId").value);
                const stu = studentsList.find(s => s.id === id);
                if (!stu) return;

                stu.name = document.getElementById("editStudentName").value.trim();
                stu.roll = document.getElementById("editStudentRoll").value.trim();
                stu.className = document.getElementById("editStudentClass").value;
                stu.attendance = document.getElementById("editStudentAttendance").value.trim();
                stu.cgpa = document.getElementById("editStudentCgpa").value.trim();
                stu.email = document.getElementById("editStudentEmail").value.trim();
                stu.phone = document.getElementById("editStudentPhone").value.trim();
                stu.avatar = stu.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

                if (stu.className.includes("CSE")) stu.classKey = "cse5";
                else if (stu.className.includes("MCA")) stu.classKey = "mca2";
                else stu.classKey = "bca3";

                saveStudentState(studentsList);
                renderStudents();
                closeModal("editStudentModal");
                showToast(`Updated student record for ${stu.name}!`, "success");
            });
        }

        // Class Filter Select Handler
        const classFilterSelect = document.getElementById("classFilterSelect");
        if (classFilterSelect) {
            classFilterSelect.addEventListener("change", function () {
                const val = this.value;
                document.querySelectorAll("#studentTableBody tr").forEach(row => {
                    const cls = row.getAttribute("data-class");
                    row.style.display = (val === "all" || cls === val) ? "" : "none";
                });
                document.querySelectorAll("#studentGridView .student-grid-card").forEach(card => {
                    const cls = card.getAttribute("data-class");
                    card.style.display = (val === "all" || cls === val) ? "" : "none";
                });
            });
        }

        // Live Search Filter
        const searchInput = document.getElementById("portalSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll("#studentTableBody tr").forEach(row => {
                    row.style.display = query && !row.textContent.toLowerCase().includes(query) ? "none" : "";
                });
                document.querySelectorAll("#studentGridView .student-grid-card").forEach(card => {
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
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPage);
    } else {
        initPage();
    }
})();
