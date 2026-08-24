/**
 * UNIFYED HOD PORTAL - MASTER TIMETABLE OPERATIONAL CONTROLLER
 */
(function () {
    const timeSlots = [
        { time: "09:00-10:00", label: "09:00 - 10:00 AM" },
        { time: "10:15-11:15", label: "10:15 - 11:15 AM" },
        { time: "11:30-12:30", label: "11:30 - 12:30 PM" },
        { time: "13:30-14:30", label: "01:30 - 02:30 PM (Break)", isBreak: true },
        { time: "14:30-15:30", label: "02:30 - 03:30 PM" },
        { time: "15:45-16:45", label: "03:45 - 04:45 PM" }
    ];

    const defaultMatrix = {
        "09:00-10:00": {
            mon: { subject: "Data Structures", teacher: "Dr. Robert Hayes", room: "Room A-101", color: "var(--primary)" },
            tue: { subject: "Database Systems", teacher: "Prof. Emma Davis", room: "Room A-102", color: "var(--success)" },
            wed: { subject: "Data Structures", teacher: "Dr. Robert Hayes", room: "Room A-101", color: "var(--primary)" },
            thu: { subject: "Algorithms", teacher: "Dr. Kevin Anderson", room: "Room A-103", color: "var(--warning)" },
            fri: { subject: "Database Systems", teacher: "Prof. Emma Davis", room: "Room A-102", color: "var(--success)" }
        },
        "10:15-11:15": {
            mon: { subject: "Software Engineering", teacher: "Dr. Sarah Williams", room: "Room B-101", color: "var(--info)" },
            tue: { subject: "Algorithms", teacher: "Dr. Kevin Anderson", room: "Room A-103", color: "var(--warning)" },
            wed: { subject: "Software Engineering", teacher: "Dr. Sarah Williams", room: "Room B-101", color: "var(--info)" },
            thu: { subject: "Database Systems", teacher: "Prof. Emma Davis", room: "Room A-102", color: "var(--success)" },
            fri: { subject: "Data Structures", teacher: "Dr. Robert Hayes", room: "Room A-101", color: "var(--primary)" }
        },
        "11:30-12:30": {
            mon: { subject: "Web Dev Lab", teacher: "Prof. David Brown", room: "Lab C-102", color: "#ec4899" },
            tue: { subject: "Software Engineering", teacher: "Dr. Sarah Williams", room: "Room B-101", color: "var(--info)" },
            wed: { subject: "Algorithms", teacher: "Dr. Kevin Anderson", room: "Room A-103", color: "var(--warning)" },
            thu: { subject: "Web Dev Lab", teacher: "Prof. David Brown", room: "Lab C-102", color: "#ec4899" },
            fri: null
        },
        "14:30-15:30": {
            mon: { subject: "Operating Systems", teacher: "Dr. Michael Johnson", room: "Room A-104", color: "#8b5cf6" },
            tue: { subject: "Operating Systems", teacher: "Dr. Michael Johnson", room: "Room A-104", color: "#8b5cf6" },
            wed: null,
            thu: { subject: "Operating Systems", teacher: "Dr. Michael Johnson", room: "Room A-104", color: "#8b5cf6" },
            fri: { subject: "Web Dev Lab", teacher: "Prof. David Brown", room: "Lab C-102", color: "#ec4899" }
        },
        "15:45-16:45": {
            mon: null,
            tue: { subject: "Web Dev Lab", teacher: "Prof. David Brown", room: "Lab C-102", color: "#ec4899" },
            wed: { subject: "Operating Systems", teacher: "Dr. Michael Johnson", room: "Room A-104", color: "#8b5cf6" },
            thu: null,
            fri: { subject: "Operating Systems", teacher: "Dr. Michael Johnson", room: "Room A-104", color: "#8b5cf6" }
        }
    };

    const defaultSummary = [
        { name: "CSE 3A", dept: "Computer Science", sem: "3", courses: 5, freeSlots: 5 },
        { name: "CSE 3B", dept: "Computer Science", sem: "3", courses: 5, freeSlots: 4 },
        { name: "ECE 2A", dept: "Electronics", sem: "2", courses: 6, freeSlots: 3 },
        { name: "Mechanical 1A", dept: "Mechanical Engineering", sem: "1", courses: 6, freeSlots: 6 },
        { name: "Civil 4A", dept: "Civil Engineering", sem: "4", courses: 5, freeSlots: 2 }
    ];

    function getTimetableState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.timetableMatrix) {
                    return parsed.timetableMatrix;
                }
            } catch (e) {}
        }
        return defaultMatrix;
    }

    function saveTimetableState(matrix) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.timetableMatrix = matrix;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let scheduleMatrix = getTimetableState();
    let classSummary = defaultSummary;

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

    function renderTimetableGrid() {
        const tbody = document.getElementById("timetableGridBody");
        const summaryBody = document.getElementById("classSummaryBody");

        if (tbody) {
            const days = ["mon", "tue", "wed", "thu", "fri"];
            let html = "";

            timeSlots.forEach(slot => {
                if (slot.isBreak) {
                    html += `
                        <tr style="background:rgba(99, 102, 241, 0.05);">
                            <td style="font-weight:700; color:var(--text-secondary);">${slot.time}</td>
                            <td colspan="5" style="text-align:center; color:var(--text-tertiary); font-weight:700; font-size:12px; letter-spacing:1px; text-transform:uppercase;">
                                <i class="fa-solid fa-mug-hot" style="margin-right:8px;"></i> Department Lunch & Recess Break
                            </td>
                        </tr>
                    `;
                } else {
                    const rowSlots = scheduleMatrix[slot.time] || {};
                    html += `<tr>`;
                    html += `<td style="font-weight:700; color:var(--primary); font-size:12px;">${slot.time}</td>`;

                    days.forEach(day => {
                        const cell = rowSlots[day];
                        if (cell) {
                            html += `
                                <td style="padding:8px; text-align:center;">
                                    <div class="timetable-slot-chip btn-slot-detail" data-subject="${cell.subject}" data-teacher="${cell.teacher}" data-room="${cell.room}" data-time="${slot.time}" style="background:${cell.color || 'var(--primary)'};">
                                        <strong>${cell.subject}</strong>
                                        <span class="slot-sub">${cell.teacher}</span>
                                        <span class="slot-sub"><i class="fa-solid fa-location-dot"></i> ${cell.room}</span>
                                    </div>
                                </td>
                            `;
                        } else {
                            html += `<td style="text-align:center; color:var(--text-tertiary); font-size:12px; opacity:0.6;"><em>Free Slot</em></td>`;
                        }
                    });

                    html += `</tr>`;
                }
            });

            tbody.innerHTML = html;
        }

        // Render Summary Table
        if (summaryBody) {
            summaryBody.innerHTML = classSummary.map(c => `
                <tr>
                    <td><strong style="color:var(--text-primary); font-size:14px;">${c.name}</strong></td>
                    <td><span style="color:var(--text-secondary); font-size:12px;">${c.dept}</span></td>
                    <td style="text-align:center;"><span class="badge badge-primary">Sem ${c.sem}</span></td>
                    <td style="text-align:center;"><strong style="color:var(--text-primary);">${c.courses} Courses</strong></td>
                    <td style="text-align:center;"><span class="badge badge-success">${c.freeSlots} Free Slots</span></td>
                    <td style="text-align:center;">
                        <button type="button" class="btn btn-secondary" style="padding:4px 12px; font-size:11px;" onclick="showToast('Viewing ${c.name} schedule breakdown', 'info')"><i class="fa-solid fa-eye"></i> View</button>
                    </td>
                </tr>
            `).join("");
        }

        // Attach Slot Detail Click Handlers
        document.querySelectorAll(".btn-slot-detail").forEach(chip => {
            chip.addEventListener("click", function () {
                const subject = this.getAttribute("data-subject");
                const teacher = this.getAttribute("data-teacher");
                const room = this.getAttribute("data-room");
                const time = this.getAttribute("data-time");

                openSlotDetail(subject, teacher, room, time);
            });
        });
    }

    function openSlotDetail(subject, teacher, room, time) {
        const subElem = document.getElementById("detailSlotSubject");
        const teacherElem = document.getElementById("detailSlotTeacher");
        const locElem = document.getElementById("detailSlotLocation");

        if (subElem) subElem.textContent = subject;
        if (teacherElem) teacherElem.textContent = `Assigned Instructor: ${teacher}`;
        if (locElem) locElem.textContent = `Location: ${room} • Time Period: ${time}`;

        openModal("slotDetailModal");
    }

    function initPage() {
        renderTimetableGrid();

        // Create Slot Trigger
        const btnCreateSlot = document.getElementById("btnCreateSlot");
        if (btnCreateSlot) {
            btnCreateSlot.addEventListener("click", () => openModal("createSlotModal"));
        }

        // Export Schedule CSV
        const btnExportTimetable = document.getElementById("btnExportTimetable");
        if (btnExportTimetable) {
            btnExportTimetable.addEventListener("click", () => {
                let csvContent = "Time Slot,Monday,Tuesday,Wednesday,Thursday,Friday\n";
                timeSlots.forEach(slot => {
                    if (!slot.isBreak) {
                        const row = scheduleMatrix[slot.time] || {};
                        const mon = row.mon ? `${row.mon.subject} (${row.mon.teacher})` : "Free";
                        const tue = row.tue ? `${row.tue.subject} (${row.tue.teacher})` : "Free";
                        const wed = row.wed ? `${row.wed.subject} (${row.wed.teacher})` : "Free";
                        const thu = row.thu ? `${row.thu.subject} (${row.thu.teacher})` : "Free";
                        const fri = row.fri ? `${row.fri.subject} (${row.fri.teacher})` : "Free";
                        csvContent += `"${slot.time}","${mon}","${tue}","${wed}","${thu}","${fri}"\n`;
                    }
                });

                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "Master_Timetable_Schedule.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast("Downloaded Master Timetable CSV export!", "success");
            });
        }

        // Create Slot Form Submission
        const createSlotForm = document.getElementById("createSlotForm");
        if (createSlotForm) {
            createSlotForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const subject = document.getElementById("inputSlotSubject").value.trim();
                const teacher = document.getElementById("inputSlotTeacher").value.trim();
                const room = document.getElementById("inputSlotRoom").value.trim();
                const day = document.getElementById("inputSlotDay").value;
                const time = document.getElementById("inputSlotTime").value;

                if (!subject || !teacher) return;

                const colors = ["var(--primary)", "var(--success)", "var(--warning)", "var(--info)", "#ec4899", "#8b5cf6"];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                if (!scheduleMatrix[time]) scheduleMatrix[time] = {};
                scheduleMatrix[time][day] = {
                    subject: subject,
                    teacher: teacher,
                    room: room,
                    color: randomColor
                };

                saveTimetableState(scheduleMatrix);
                renderTimetableGrid();
                closeModal("createSlotModal");
                createSlotForm.reset();
                showToast(`Assigned ${subject} (${teacher}) to ${day.toUpperCase()} at ${time}!`, "success");
            });
        }

        // Semester Filter Select
        const semFilterSelect = document.getElementById("semFilterSelect");
        if (semFilterSelect) {
            semFilterSelect.addEventListener("change", function () {
                const heading = document.getElementById("timetableHeading");
                if (heading) heading.textContent = `Weekly Timetable - ${this.options[this.selectedIndex].text}`;
                showToast(`Viewing schedule for ${this.options[this.selectedIndex].text}`, "info");
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
                document.querySelectorAll(".timetable-slot-chip").forEach(chip => {
                    const match = chip.textContent.toLowerCase().includes(query);
                    chip.style.opacity = query && !match ? "0.3" : "1";
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
