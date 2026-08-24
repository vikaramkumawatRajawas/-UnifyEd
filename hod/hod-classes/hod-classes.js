/**
 * UNIFYED HOD PORTAL - CLASS ALLOCATION CONTROL CONTROLLER
 */
(function () {
    const defaultEngClasses = [
        { id: 1, name: "CSE 1A", dept: "Computer Science", sem: "1", teacher: "Dr. Robert Hayes", strength: 62, room: "A-101", status: "Active" },
        { id: 2, name: "CSE 1B", dept: "Computer Science", sem: "1", teacher: "Prof. Emma Davis", strength: 58, room: "A-102", status: "Active" },
        { id: 3, name: "ECE 2A", dept: "Electronics & Communication", sem: "2", teacher: "Dr. Kevin Anderson", strength: 56, room: "B-101", status: "Active" },
        { id: 4, name: "Mechanical 3A", dept: "Mechanical Engineering", sem: "3", teacher: "Dr. Sarah Williams", strength: 54, room: "C-101", status: "Active" },
        { id: 5, name: "Civil 4A", dept: "Civil Engineering", sem: "4", teacher: "Prof. David Brown", strength: 48, room: "D-101", status: "Active" }
    ];

    const defaultMgmtClasses = [
        { id: 1, name: "MBA 1A", program: "MBA", spec: "Finance", teacher: "Dr. Michael Johnson", strength: 45, room: "E-101", status: "Active" },
        { id: 2, name: "MBA 1B", program: "MBA", spec: "HR Management", teacher: "Dr. Anita Gupta", strength: 42, room: "E-102", status: "Active" },
        { id: 3, name: "BBA 1A", program: "BBA", spec: "General Management", teacher: "Prof. Ravi Patel", strength: 64, room: "F-101", status: "Active" }
    ];

    function getClassState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.classesList && Array.isArray(parsed.classesList) && parsed.classesList.length > 0) {
                    return parsed.classesList;
                }
            } catch (e) {}
        }
        return defaultEngClasses;
    }

    function saveClassState(engList) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.classesList = engList;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let engClasses = getClassState();
    let mgmtClasses = defaultMgmtClasses;

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

    function renderClassesTables(filterDept = "all") {
        const engBody = document.getElementById("engClassesBody");
        const mgmtBody = document.getElementById("mgmtClassesBody");
        const totalClassesElem = document.getElementById("kpiActiveClasses");
        const totalStudentsElem = document.getElementById("kpiTotalStudents");

        let filteredEng = engClasses;
        let filteredMgmt = mgmtClasses;

        if (filterDept !== "all") {
            filteredEng = engClasses.filter(c => c.dept.toLowerCase().includes(filterDept.toLowerCase()));
            filteredMgmt = mgmtClasses.filter(c => c.spec.toLowerCase().includes(filterDept.toLowerCase()) || filterDept === "Management");
        }

        let totalHeadcount = 0;
        engClasses.forEach(c => totalHeadcount += c.strength);
        mgmtClasses.forEach(c => totalHeadcount += c.strength);

        if (totalClassesElem) totalClassesElem.textContent = engClasses.length + mgmtClasses.length;
        if (totalStudentsElem) totalStudentsElem.textContent = totalHeadcount.toLocaleString();

        // Render Engineering Classes Table
        if (engBody) {
            engBody.innerHTML = filteredEng.map(c => `
                <tr>
                    <td><strong style="color:var(--text-primary); font-size:14px;">${c.name}</strong></td>
                    <td><span style="color:var(--text-secondary); font-size:12px;">${c.dept}</span></td>
                    <td style="text-align:center;"><span class="badge badge-primary">Sem ${c.sem}</span></td>
                    <td style="text-align:center;"><strong style="color:var(--text-primary);">${c.teacher}</strong></td>
                    <td style="text-align:center;"><strong style="color:var(--primary);">${c.strength} Students</strong></td>
                    <td style="text-align:center;"><span class="badge badge-warning"><i class="fa-solid fa-door-closed"></i> ${c.room}</span></td>
                    <td style="text-align:center;">
                        <span class="badge badge-success">${c.status}</span>
                    </td>
                    <td style="text-align:center;">
                        <button type="button" class="btn btn-secondary btn-edit-class" data-id="${c.id}" style="padding:4px 12px; font-size:11px;"><i class="fa-solid fa-pen"></i> Edit</button>
                    </td>
                </tr>
            `).join("");
        }

        // Render Management Classes Table
        if (mgmtBody) {
            mgmtBody.innerHTML = filteredMgmt.map(c => `
                <tr>
                    <td><strong style="color:var(--text-primary); font-size:14px;">${c.name}</strong></td>
                    <td><span class="badge badge-primary">${c.program}</span></td>
                    <td><span style="color:var(--text-secondary); font-size:12px;">${c.spec}</span></td>
                    <td style="text-align:center;"><strong style="color:var(--text-primary);">${c.teacher}</strong></td>
                    <td style="text-align:center;"><strong style="color:var(--primary);">${c.strength} Students</strong></td>
                    <td style="text-align:center;"><span class="badge badge-warning"><i class="fa-solid fa-door-closed"></i> ${c.room}</span></td>
                    <td style="text-align:center;">
                        <span class="badge badge-success">${c.status}</span>
                    </td>
                    <td style="text-align:center;">
                        <button type="button" class="btn btn-secondary btn-edit-mgmt" data-id="${c.id}" style="padding:4px 12px; font-size:11px;"><i class="fa-solid fa-pen"></i> Edit</button>
                    </td>
                </tr>
            `).join("");
        }

        // Attach Edit Click Handlers
        document.querySelectorAll(".btn-edit-class").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                openEditAllocation(id, engClasses, "eng");
            });
        });

        document.querySelectorAll(".btn-edit-mgmt").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                openEditAllocation(id, mgmtClasses, "mgmt");
            });
        });
    }

    function openEditAllocation(id, list, type) {
        const item = list.find(c => c.id === id);
        if (!item) return;

        const idElem = document.getElementById("editClassId");
        const nameElem = document.getElementById("editClassName");
        const teacherElem = document.getElementById("editClassTeacher");
        const roomElem = document.getElementById("editClassRoom");
        const strengthElem = document.getElementById("editClassStrength");

        if (idElem) idElem.value = `${type}_${id}`;
        if (nameElem) nameElem.value = item.name;
        if (teacherElem) teacherElem.value = item.teacher;
        if (roomElem) roomElem.value = item.room;
        if (strengthElem) strengthElem.value = item.strength;

        openModal("editAllocationModal");
    }

    function initPage() {
        renderClassesTables();

        // Add Class Trigger
        const btnAddClass = document.getElementById("btnAddClass");
        if (btnAddClass) {
            btnAddClass.addEventListener("click", () => openModal("addClassModal"));
        }

        // Export Allocation CSV Trigger
        const btnExportAllocation = document.getElementById("btnExportAllocation");
        if (btnExportAllocation) {
            btnExportAllocation.addEventListener("click", () => {
                let csvContent = "Class Name,Department/Program,Semester/Spec,Class Teacher,Strength,Allocated Room,Status\n";
                engClasses.forEach(c => {
                    csvContent += `"${c.name}","${c.dept}","Sem ${c.sem}","${c.teacher}","${c.strength}","${c.room}","${c.status}"\n`;
                });
                mgmtClasses.forEach(c => {
                    csvContent += `"${c.name}","${c.program}","${c.spec}","${c.teacher}","${c.strength}","${c.room}","${c.status}"\n`;
                });
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "Department_Class_Allocations.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast("Downloaded Department Class Allocations CSV!", "success");
            });
        }

        // Add Class Form Submission
        const addClassForm = document.getElementById("addClassForm");
        if (addClassForm) {
            addClassForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("inputClassName").value.trim();
                const dept = document.getElementById("inputClassDept").value;
                const sem = document.getElementById("inputClassSem").value.trim();
                const strength = parseInt(document.getElementById("inputClassStrength").value) || 50;
                const teacher = document.getElementById("inputClassTeacher").value.trim();
                const room = document.getElementById("inputClassRoom").value.trim();

                if (!name || !teacher) return;

                const newClass = {
                    id: Date.now(),
                    name: name,
                    dept: dept,
                    sem: sem,
                    teacher: teacher,
                    strength: strength,
                    room: room,
                    status: "Active"
                };

                if (dept === "Management") {
                    mgmtClasses.push({ id: Date.now(), name: name, program: "MBA", spec: "General", teacher: teacher, strength: strength, room: room, status: "Active" });
                } else {
                    engClasses.push(newClass);
                    saveClassState(engClasses);
                }

                renderClassesTables();
                closeModal("addClassModal");
                addClassForm.reset();
                showToast(`Registered section ${name} assigned to ${teacher} (${room})!`, "success");
            });
        }

        // Edit Allocation Form Submission
        const editAllocationForm = document.getElementById("editAllocationForm");
        if (editAllocationForm) {
            editAllocationForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const idVal = document.getElementById("editClassId").value;
                const teacher = document.getElementById("editClassTeacher").value.trim();
                const room = document.getElementById("editClassRoom").value.trim();
                const strength = parseInt(document.getElementById("editClassStrength").value) || 50;

                const [type, idStr] = idVal.split("_");
                const id = parseInt(idStr);

                if (type === "eng") {
                    const item = engClasses.find(c => c.id === id);
                    if (item) {
                        item.teacher = teacher;
                        item.room = room;
                        item.strength = strength;
                        saveClassState(engClasses);
                    }
                } else {
                    const item = mgmtClasses.find(c => c.id === id);
                    if (item) {
                        item.teacher = teacher;
                        item.room = room;
                        item.strength = strength;
                    }
                }

                renderClassesTables();
                closeModal("editAllocationModal");
                showToast("Saved class allocation updates!", "success");
            });
        }

        // Department Filter Handler
        const deptFilterSelect = document.getElementById("deptFilterSelect");
        if (deptFilterSelect) {
            deptFilterSelect.addEventListener("change", function () {
                renderClassesTables(this.value);
                showToast(`Filtered by ${this.options[this.selectedIndex].text}`, "info");
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
