/**
 * UnifyEd Faculty Portal - Assignment Reports Interactivity Engine
 */

// Initial Assignment Reports Dataset
let assignmentReportBank = [
    {
        id: 1,
        studentName: "Ananya Deshmukh",
        rollNo: "23UBCA010",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        submissionDate: "14 Aug 2026, 04:30 PM",
        score: "9.5 / 10",
        scoreVal: 9.5,
        plagPct: 2,
        plagStatus: "clean",
        status: "graded",
        statusLabel: "Graded & Approved",
        fileName: "SQL_Schema_Design_Ananya.pdf"
    },
    {
        id: 2,
        studentName: "Vikram Kumawat",
        rollNo: "23UBCA015",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        submissionDate: "14 Aug 2026, 06:15 PM",
        score: "9.0 / 10",
        scoreVal: 9.0,
        plagPct: 4,
        plagStatus: "clean",
        status: "graded",
        statusLabel: "Graded & Approved",
        fileName: "SQL_Schema_Design_Vikram.pdf"
    },
    {
        id: 3,
        studentName: "Priya Sharma",
        rollNo: "23UBCA028",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        submissionDate: "15 Aug 2026, 11:20 AM",
        score: "Needs Grading",
        scoreVal: 0,
        plagPct: 1,
        plagStatus: "clean",
        status: "pending",
        statusLabel: "Pending Review",
        fileName: "SQL_Schema_Design_Priya.pdf"
    },
    {
        id: 4,
        studentName: "Rahul Verma",
        rollNo: "23UBCA042",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        submissionDate: "Not Submitted",
        score: "0 / 10",
        scoreVal: 0,
        plagPct: 0,
        plagStatus: "clean",
        status: "overdue",
        statusLabel: "Overdue / Missing",
        fileName: "N/A"
    },
    {
        id: 5,
        studentName: "Siddharth Malhotra",
        rollNo: "22UCSE088",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        submissionDate: "13 Aug 2026, 02:45 PM",
        score: "8.5 / 10",
        scoreVal: 8.5,
        plagPct: 3,
        plagStatus: "clean",
        status: "graded",
        statusLabel: "Graded & Approved",
        fileName: "React_State_Hooks_Siddharth.pdf"
    },
    {
        id: 6,
        studentName: "Karan Mehta",
        rollNo: "22UCSE091",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        submissionDate: "Not Submitted",
        score: "0 / 10",
        scoreVal: 0,
        plagPct: 0,
        plagStatus: "clean",
        status: "overdue",
        statusLabel: "Overdue / Missing",
        fileName: "N/A"
    }
];

let activeAssignmentClassFilter = "bca";
let activeAssignmentStatusFilter = "all";
let assignmentSearchQuery = "";
let currentAssignmentViewMode = "table"; // 'table' or 'grid'

document.addEventListener('DOMContentLoaded', () => {
    renderAssignmentReportTable();
    setupAssignmentEventListeners();
});

function setupAssignmentEventListeners() {
    // Class Select Dropdown Switcher
    const classSelect = document.getElementById('assignmentClassSelect');
    if (classSelect) {
        classSelect.addEventListener('change', (e) => {
            activeAssignmentClassFilter = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;
            const titleEl = document.getElementById('activeClassAssignmentTitle');
            if (titleEl) {
                titleEl.innerText = `${selectedText} Assignment Reports`;
            }
            renderAssignmentReportTable();
        });
    }

    // Search Input Filter
    const searchInput = document.getElementById('assignmentSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            assignmentSearchQuery = e.target.value.toLowerCase().trim();
            renderAssignmentReportTable();
        });
    }

    // Status Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeAssignmentStatusFilter = chip.getAttribute('data-filter');
            renderAssignmentReportTable();
        });
    });

    // Global Backdrop Click Dismissal
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('submissionInspectorModal');
        if (modal && modal.classList.contains('active') && e.target === modal) {
            closeInspectorModal();
        }
    });
}

function switchAssignmentRosterView(mode) {
    currentAssignmentViewMode = mode;
    const btnTable = document.getElementById('assignmentViewTableBtn');
    const btnGrid = document.getElementById('assignmentViewGridBtn');

    if (mode === 'table') {
        if (btnTable) btnTable.classList.add('active');
        if (btnGrid) btnGrid.classList.remove('active');
        document.getElementById('assignmentTableView').style.display = 'block';
        document.getElementById('assignmentGridView').style.display = 'none';
    } else {
        if (btnGrid) btnGrid.classList.add('active');
        if (btnTable) btnTable.classList.remove('active');
        document.getElementById('assignmentTableView').style.display = 'none';
        document.getElementById('assignmentGridView').style.display = 'grid';
    }

    renderAssignmentReportTable();
}

// Render Master Submissions Table Body & Grid Cards
function renderAssignmentReportTable() {
    const tbody = document.getElementById('assignmentReportTableBody');
    const gridContainer = document.getElementById('assignmentGridView');
    if (!tbody || !gridContainer) return;

    let filtered = assignmentReportBank.filter(s => {
        const matchClass = activeAssignmentClassFilter === 'all' || s.course === activeAssignmentClassFilter;
        
        let matchFilter = true;
        if (activeAssignmentStatusFilter === 'graded') matchFilter = s.status === 'graded';
        if (activeAssignmentStatusFilter === 'pending') matchFilter = s.status === 'pending';
        if (activeAssignmentStatusFilter === 'overdue') matchFilter = s.status === 'overdue';

        const matchSearch = assignmentSearchQuery === '' || 
                            s.studentName.toLowerCase().includes(assignmentSearchQuery) ||
                            s.rollNo.toLowerCase().includes(assignmentSearchQuery) ||
                            s.statusLabel.toLowerCase().includes(assignmentSearchQuery);

        return matchClass && matchFilter && matchSearch;
    });

    updateAssignmentKpis(filtered);

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:40px; color:var(--text-tertiary);">
                    <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:8px; display:block;"></i>
                    No assignment submission records match your query.
                </td>
            </tr>
        `;
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">
                No assignment submission records match your query.
            </div>
        `;
        return;
    }

    // Render Table View
    tbody.innerHTML = filtered.map(s => {
        let statusClass = "graded";
        if (s.status === 'pending') statusClass = "pending";
        if (s.status === 'overdue') statusClass = "overdue";

        let plagClass = "clean";
        if (s.plagPct > 10 && s.plagPct <= 25) plagClass = "warn";
        if (s.plagPct > 25) plagClass = "flag";

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
                    <span style="font-size:12px; color:var(--text-secondary);">${s.submissionDate}</span>
                </td>

                <td>
                    <strong style="font-size:14px; color:${s.status === 'overdue' ? '#ef4444' : 'var(--primary)'};">${s.score}</strong>
                </td>

                <td>
                    <span class="plag-pill ${plagClass}">
                        <i class="fa-solid fa-shield-halved"></i> ${s.plagPct}% Match
                    </span>
                </td>

                <td>
                    <span class="sub-status-pill ${statusClass}">
                        <i class="fa-solid ${s.status === 'graded' ? 'fa-circle-check' : (s.status === 'pending' ? 'fa-clock' : 'fa-triangle-exclamation')}"></i> ${s.statusLabel}
                    </span>
                </td>

                <td>
                    <div class="table-action-btns">
                        <button onclick="viewAssignmentSubmission(${s.id})" class="btn btn-secondary btn-sm" title="View PDF Solution">
                            <i class="fa-solid fa-eye"></i> View PDF
                        </button>
                        <button onclick="sendSubmissionReminder(${s.id})" class="btn btn-primary btn-sm" style="${s.status === 'overdue' ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'}" title="Send Submission Reminder">
                            <i class="fa-solid fa-bell"></i> Remind
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Render Grid Cards View
    gridContainer.innerHTML = filtered.map(s => {
        let statusClass = "graded";
        if (s.status === 'pending') statusClass = "pending";
        if (s.status === 'overdue') statusClass = "overdue";

        let plagClass = "clean";
        if (s.plagPct > 10 && s.plagPct <= 25) plagClass = "warn";
        if (s.plagPct > 25) plagClass = "flag";

        return `
            <div class="assignment-student-card">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span class="sub-status-pill ${statusClass}">
                            <i class="fa-solid ${s.status === 'graded' ? 'fa-circle-check' : (s.status === 'pending' ? 'fa-clock' : 'fa-triangle-exclamation')}"></i> ${s.statusLabel}
                        </span>
                        <span class="plag-pill ${plagClass}">
                            <i class="fa-solid fa-shield-halved"></i> ${s.plagPct}% Match
                        </span>
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
                            <span style="color:var(--text-secondary);">Submitted Date:</span>
                            <strong style="color:var(--text-primary);">${s.submissionDate}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Score:</span>
                            <strong style="color:${s.status === 'overdue' ? '#ef4444' : 'var(--primary)'};">${s.score}</strong>
                        </div>
                    </div>
                </div>

                <div class="assignment-card-footer">
                    <button onclick="viewAssignmentSubmission(${s.id})" class="btn btn-secondary btn-sm" style="flex:1; justify-content:center;">
                        <i class="fa-solid fa-eye"></i> View PDF
                    </button>
                    <button onclick="sendSubmissionReminder(${s.id})" class="btn btn-primary btn-sm" style="${s.status === 'overdue' ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'} flex:1; justify-content:center;">
                        <i class="fa-solid fa-bell"></i> Remind
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateAssignmentKpis(list) {
    const kpiRate = document.getElementById('kpiSubmissionRate');
    const kpiEval = document.getElementById('kpiEvaluatedCount');
    const kpiPlag = document.getElementById('kpiAvgPlag');
    const kpiOverdue = document.getElementById('kpiOverdueCount');

    if (list.length > 0) {
        const submitted = list.filter(s => s.status !== 'overdue').length;
        if (kpiRate) kpiRate.innerText = `${((submitted / list.length) * 100).toFixed(1)}%`;
        if (kpiEval) kpiEval.innerText = `${list.filter(s => s.status === 'graded').length} / ${submitted}`;
    }

    if (kpiOverdue) kpiOverdue.innerText = list.filter(s => s.status === 'overdue').length;
}

// 1-Click PDF Audit Export
function exportPdfSubmissionReport() {
    showToast("📄 Exporting Assignment Submission Audit PDF Report...");
}

// 1-Click CSV Summary Export
function exportCsvSummary() {
    showToast("📊 Exporting Assignment Submissions CSV Summary sheet...");
}

// Send Reminder to Single Student
function sendSubmissionReminder(id) {
    const s = assignmentReportBank.find(item => item.id === id);
    if (s) {
        showToast(`🔔 Submission Reminder notification sent to ${s.studentName} (${s.rollNo})`);
    }
}

// Send Bulk Overdue Reminders
function sendBulkOverdueReminders() {
    const overdues = assignmentReportBank.filter(s => s.status === 'overdue');
    if (overdues.length === 0) {
        showToast("No students currently have overdue assignment submissions.");
        return;
    }
    showToast(`🚨 Bulk Overdue Assignment Reminders sent to ${overdues.length} students!`);
}

// View PDF Submission Inspector Modal Handler
let currentModalSubmissionId = null;

function viewAssignmentSubmission(id) {
    const s = assignmentReportBank.find(item => item.id === id);
    if (!s) return;

    currentModalSubmissionId = id;
    const nameEl = document.getElementById('modalInspectorStudentName');
    const rollEl = document.getElementById('modalInspectorStudentRoll');
    const dateEl = document.getElementById('modalSubDateVal');
    const plagEl = document.getElementById('modalPlagPctVal');
    const marksEl = document.getElementById('modalMarksVal');

    if (nameEl) nameEl.innerText = `${s.studentName}`;
    if (rollEl) rollEl.innerText = `${s.rollNo} • ${s.courseLabel}`;
    if (dateEl) dateEl.innerText = s.submissionDate;
    if (plagEl) plagEl.innerText = `${s.plagPct}% Match`;
    if (marksEl) marksEl.innerText = s.score;

    const modal = document.getElementById('submissionInspectorModal');
    if (modal) modal.classList.add('active');
}

function closeInspectorModal() {
    const modal = document.getElementById('submissionInspectorModal');
    if (modal) modal.classList.remove('active');
}

function saveGradeEvaluation() {
    if (currentModalSubmissionId) {
        const s = assignmentReportBank.find(item => item.id === currentModalSubmissionId);
        if (s) {
            s.status = "graded";
            s.statusLabel = "Graded & Approved";
            renderAssignmentReportTable();
            showToast(`✅ Submission Grade saved & approved for ${s.studentName}!`);
        }
    }
    closeInspectorModal();
}

// Window scope exports for reliable HTML inline handlers
window.switchAssignmentRosterView = switchAssignmentRosterView;
window.exportPdfSubmissionReport = exportPdfSubmissionReport;
window.exportCsvSummary = exportCsvSummary;
window.sendSubmissionReminder = sendSubmissionReminder;
window.sendBulkOverdueReminders = sendBulkOverdueReminders;
window.viewAssignmentSubmission = viewAssignmentSubmission;
window.closeInspectorModal = closeInspectorModal;
window.saveGradeEvaluation = saveGradeEvaluation;

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