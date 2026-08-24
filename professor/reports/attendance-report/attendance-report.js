/**
 * UnifyEd Faculty Portal - Attendance Reports Interactivity Engine
 */

// Initial Attendance Reports Dataset
let attendanceReportBank = [
    {
        id: 1,
        studentName: "Vikram Kumawat",
        rollNo: "23UBCA015",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        totalLectures: 42,
        attendedLectures: 38,
        percentage: 90.5,
        status: "eligible",
        statusLabel: "Eligible (>75%)",
        medicalWaiver: false
    },
    {
        id: 2,
        studentName: "Priya Sharma",
        rollNo: "23UBCA028",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        totalLectures: 42,
        attendedLectures: 40,
        percentage: 95.2,
        status: "eligible",
        statusLabel: "Star Performer",
        medicalWaiver: false
    },
    {
        id: 3,
        studentName: "Rahul Verma",
        rollNo: "23UBCA042",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        totalLectures: 42,
        attendedLectures: 26,
        percentage: 61.9,
        status: "warning",
        statusLabel: "Shortfall Warning",
        medicalWaiver: false
    },
    {
        id: 4,
        studentName: "Ananya Deshmukh",
        rollNo: "23UBCA010",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        totalLectures: 42,
        attendedLectures: 39,
        percentage: 92.8,
        status: "eligible",
        statusLabel: "Eligible (>75%)",
        medicalWaiver: true
    },
    {
        id: 5,
        studentName: "Siddharth Malhotra",
        rollNo: "22UCSE088",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        totalLectures: 40,
        attendedLectures: 35,
        percentage: 87.5,
        status: "eligible",
        statusLabel: "Eligible (>75%)",
        medicalWaiver: false
    },
    {
        id: 6,
        studentName: "Karan Mehta",
        rollNo: "22UCSE091",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        totalLectures: 40,
        attendedLectures: 25,
        percentage: 62.5,
        status: "warning",
        statusLabel: "Exam Debar Risk",
        medicalWaiver: false
    }
];

let activeClassFilter = "bca";
let activeStatusFilter = "all";
let searchQuery = "";

document.addEventListener('DOMContentLoaded', () => {
    renderAttendanceReportTable();
    setupEventListeners();
});

function setupEventListeners() {
    // Class Select Dropdown Switcher
    const classSelect = document.getElementById('reportClassSelect');
    if (classSelect) {
        classSelect.addEventListener('change', (e) => {
            activeClassFilter = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;
            const titleEl = document.getElementById('activeClassReportTitle');
            if (titleEl) {
                titleEl.innerText = `${selectedText} Attendance Analytics`;
            }
            renderAttendanceReportTable();
        });
    }

    // Search Input Filter
    const searchInput = document.getElementById('reportSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderAttendanceReportTable();
        });
    }

    // Status Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeStatusFilter = chip.getAttribute('data-filter');
            renderAttendanceReportTable();
        });
    });

    // Global Backdrop Click Dismissal
    document.addEventListener('click', (e) => {
        const histModal = document.getElementById('studentHistoryModal');
        if (histModal && histModal.classList.contains('active') && e.target === histModal) {
            closeHistoryModal();
        }
    });
}

let currentRosterViewMode = "table"; // 'table' or 'grid'

function switchReportRosterView(mode) {
    currentRosterViewMode = mode;
    const btnTable = document.getElementById('viewTableBtn');
    const btnGrid = document.getElementById('viewGridBtn');

    if (mode === 'table') {
        if (btnTable) btnTable.classList.add('active');
        if (btnGrid) btnGrid.classList.remove('active');
        document.getElementById('rosterTableView').style.display = 'block';
        document.getElementById('rosterGridView').style.display = 'none';
    } else {
        if (btnGrid) btnGrid.classList.add('active');
        if (btnTable) btnTable.classList.remove('active');
        document.getElementById('rosterTableView').style.display = 'none';
        document.getElementById('rosterGridView').style.display = 'grid';
    }

    renderAttendanceReportTable();
}

// Render Master Attendance Roster Table Body & Grid Cards
function renderAttendanceReportTable() {
    const tbody = document.getElementById('attendanceReportTableBody');
    const gridContainer = document.getElementById('rosterGridView');
    if (!tbody || !gridContainer) return;

    let filtered = attendanceReportBank.filter(s => {
        const matchClass = activeClassFilter === 'all' || s.course === activeClassFilter;
        
        let matchFilter = true;
        if (activeStatusFilter === 'eligible') matchFilter = s.percentage >= 75;
        if (activeStatusFilter === 'warning') matchFilter = s.percentage < 75;
        if (activeStatusFilter === 'medical') matchFilter = s.medicalWaiver === true;

        const matchSearch = searchQuery === '' || 
                            s.studentName.toLowerCase().includes(searchQuery) ||
                            s.rollNo.toLowerCase().includes(searchQuery) ||
                            s.statusLabel.toLowerCase().includes(searchQuery);

        return matchClass && matchFilter && matchSearch;
    });

    updateKpis(filtered);

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px; color:var(--text-tertiary);">
                    <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:8px; display:block;"></i>
                    No attendance report records match your query.
                </td>
            </tr>
        `;
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">
                No attendance report records match your query.
            </div>
        `;
        return;
    }

    // Render Table View
    tbody.innerHTML = filtered.map(s => {
        let pctClass = "high";
        if (s.percentage < 90 && s.percentage >= 75) pctClass = "medium";
        if (s.percentage < 75) pctClass = "low";

        let pillClass = "eligible";
        if (s.percentage < 75) pillClass = "warning";
        if (s.percentage < 65) pillClass = "debarred";

        return `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${s.avatar}" class="student-avatar-img" alt="${s.studentName}">
                        <div>
                            <strong style="font-size:14px; color:var(--text-primary); display:block;">${s.studentName}</strong>
                            <span style="font-size:11px; color:var(--text-tertiary);">${s.rollNo} • ${s.courseLabel}</span>
                        </div>
                    </div>
                </td>

                <td>
                    <strong style="font-size:13px; color:var(--text-primary);">${s.attendedLectures} / ${s.totalLectures}</strong>
                    <span style="font-size:11px; color:var(--text-tertiary); display:block;">Lectures</span>
                </td>

                <td style="min-width:140px;">
                    <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700;">
                        <span style="color:${s.percentage < 75 ? '#ef4444' : '#10b981'};">${s.percentage}%</span>
                        ${s.medicalWaiver ? '<span style="font-size:10px; color:var(--primary);" title="Medical Waiver Approved"><i class="fa-solid fa-notes-medical"></i> Waiver</span>' : ''}
                    </div>
                    <div class="attendance-progress-track">
                        <div class="attendance-progress-fill ${pctClass}" style="width: ${s.percentage}%;"></div>
                    </div>
                </td>

                <td>
                    <span class="status-pill ${pillClass}">
                        <i class="fa-solid ${s.percentage >= 75 ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> ${s.statusLabel}
                    </span>
                </td>

                <td>
                    <div class="table-action-btns">
                        <button onclick="viewStudentAttendanceReport(${s.id})" class="btn btn-secondary btn-sm" title="View Full History">
                            <i class="fa-solid fa-chart-line"></i> History
                        </button>
                        <button onclick="sendWarningNotice(${s.id})" class="btn btn-primary btn-sm" style="${s.percentage < 75 ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'}" title="Send Shortfall Alert">
                            <i class="fa-solid fa-bell"></i> Alert
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Render Grid Cards View
    gridContainer.innerHTML = filtered.map(s => {
        let pctClass = "high";
        if (s.percentage < 90 && s.percentage >= 75) pctClass = "medium";
        if (s.percentage < 75) pctClass = "low";

        let pillClass = "eligible";
        if (s.percentage < 75) pillClass = "warning";
        if (s.percentage < 65) pillClass = "debarred";

        return `
            <div class="roster-student-card">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span class="status-pill ${pillClass}">
                            <i class="fa-solid ${s.percentage >= 75 ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> ${s.statusLabel}
                        </span>
                        <strong style="font-size:14px; color:${s.percentage < 75 ? '#ef4444' : '#10b981'};">${s.percentage}%</strong>
                    </div>

                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
                        <img src="${s.avatar}" class="student-avatar-img" alt="${s.studentName}">
                        <div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block;">${s.studentName}</strong>
                            <span style="font-size:11px; color:var(--text-tertiary);">${s.rollNo} • ${s.courseLabel}</span>
                        </div>
                    </div>

                    <div style="padding:10px 12px; background:var(--bg-tertiary); border-radius:8px; border:1px solid var(--border-color); font-size:12px; margin-bottom:10px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                            <span style="color:var(--text-secondary);">Attended Lectures:</span>
                            <strong style="color:var(--text-primary);">${s.attendedLectures} / ${s.totalLectures}</strong>
                        </div>
                        <div class="attendance-progress-track">
                            <div class="attendance-progress-fill ${pctClass}" style="width: ${s.percentage}%;"></div>
                        </div>
                    </div>
                </div>

                <div class="roster-card-footer">
                    <button onclick="viewStudentAttendanceReport(${s.id})" class="btn btn-secondary btn-sm" style="flex:1; justify-content:center;">
                        <i class="fa-solid fa-chart-line"></i> History
                    </button>
                    <button onclick="sendWarningNotice(${s.id})" class="btn btn-primary btn-sm" style="${s.percentage < 75 ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'} flex:1; justify-content:center;">
                        <i class="fa-solid fa-bell"></i> Alert
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateKpis(list) {
    const kpiAvg = document.getElementById('kpiClassAvg');
    const kpiTotal = document.getElementById('kpiTotalLectures');
    const kpiStar = document.getElementById('kpiStarPerformers');
    const kpiShortfall = document.getElementById('kpiShortfallCount');

    if (list.length > 0) {
        const sum = list.reduce((acc, curr) => acc + curr.percentage, 0);
        const avg = (sum / list.length).toFixed(1);
        if (kpiAvg) kpiAvg.innerText = `${avg}%`;
    }

    if (kpiStar) kpiStar.innerText = list.filter(s => s.percentage >= 85).length;
    if (kpiShortfall) kpiShortfall.innerText = list.filter(s => s.percentage < 75).length;
}

// 1-Click PDF Register Export
function exportPdfRegister() {
    showToast("📄 Exporting Attendance Register PDF for DBMS (BCA Sem 3)...");
}

// 1-Click Excel Register Export
function exportExcelRegister() {
    showToast("📊 Exporting Attendance Master Roster CSV/Excel sheet...");
}

// Send Warning Notice to Single Student
function sendWarningNotice(id) {
    const s = attendanceReportBank.find(item => item.id === id);
    if (s) {
        showToast(`🚨 Shortfall Warning Alert sent to ${s.studentName} (${s.rollNo})`);
    }
}

// Send Bulk Shortfall Warning Notices
function sendBulkShortfallWarnings() {
    const warnings = attendanceReportBank.filter(s => s.percentage < 75);
    if (warnings.length === 0) {
        showToast("No students currently below 75% attendance threshold.");
        return;
    }
    showToast(`🚨 Bulk Attendance Warning Notices dispatched to ${warnings.length} students!`);
}

// View Student History Modal Handler
let currentModalStudentId = null;

function viewStudentAttendanceReport(id) {
    const s = attendanceReportBank.find(item => item.id === id);
    if (!s) return;

    currentModalStudentId = id;
    const nameEl = document.getElementById('modalStudentHistoryName');
    const rollEl = document.getElementById('modalStudentHistoryRoll');
    const conductedEl = document.getElementById('modalConductedVal');
    const attendedEl = document.getElementById('modalAttendedVal');
    const pctEl = document.getElementById('modalPctVal');
    const monthlyLogEl = document.getElementById('modalMonthlyLog');

    if (nameEl) nameEl.innerText = `${s.studentName}`;
    if (rollEl) rollEl.innerText = `${s.rollNo} • ${s.courseLabel}`;
    if (conductedEl) conductedEl.innerText = s.totalLectures;
    if (attendedEl) attendedEl.innerText = s.attendedLectures;
    if (pctEl) pctEl.innerText = `${s.percentage}%`;

    if (monthlyLogEl) {
        monthlyLogEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>August Week 1 (DBMS Regular)</span>
                <strong style="color:#10b981;">10/10 Present</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>August Week 2 (DBMS Lab & Theory)</span>
                <strong style="color:#10b981;">10/10 Present</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>August Week 3 (SQL Mid-Term Revision)</span>
                <strong style="color:${s.percentage < 75 ? '#ef4444' : '#10b981'};">${s.percentage < 75 ? '4/10 Shortfall' : '9/10 Present'}</strong>
            </div>
        `;
    }

    const modal = document.getElementById('studentHistoryModal');
    if (modal) modal.classList.add('active');
}

function closeHistoryModal() {
    const modal = document.getElementById('studentHistoryModal');
    if (modal) modal.classList.remove('active');
}

function printStudentCertificate() {
    if (currentModalStudentId) {
        const s = attendanceReportBank.find(item => item.id === currentModalStudentId);
        showToast(`📄 Generating Official Attendance Certificate PDF for ${s ? s.studentName : 'Student'}...`);
    }
}

// Window scope exports for reliable HTML inline handlers
window.switchReportRosterView = switchReportRosterView;
window.exportPdfRegister = exportPdfRegister;
window.exportExcelRegister = exportExcelRegister;
window.sendWarningNotice = sendWarningNotice;
window.sendBulkShortfallWarnings = sendBulkShortfallWarnings;
window.viewStudentAttendanceReport = viewStudentAttendanceReport;
window.closeHistoryModal = closeHistoryModal;
window.printStudentCertificate = printStudentCertificate;

// Toast Notification Helper
function showToast(message) {
    let toast = document.getElementById('liveToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'liveToast';
        toast.className = 'custom-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}