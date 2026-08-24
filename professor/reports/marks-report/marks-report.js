/**
 * UnifyEd Faculty Portal - Marks Reports Interactivity Engine
 */

// Initial Marks Reports Dataset
let marksReportBank = [
    {
        id: 1,
        studentName: "Ananya Deshmukh",
        rollNo: "23UBCA010",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        midTermScore: 29,
        endTermScore: 67,
        totalScore: 96,
        grade: "O",
        gradeLabel: "O Grade (Outstanding)",
        status: "passed",
        rank: 1
    },
    {
        id: 2,
        studentName: "Priya Sharma",
        rollNo: "23UBCA028",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        midTermScore: 28,
        endTermScore: 63,
        totalScore: 91,
        grade: "A+",
        gradeLabel: "A+ Grade (Excellent)",
        status: "passed",
        rank: 2
    },
    {
        id: 3,
        studentName: "Vikram Kumawat",
        rollNo: "23UBCA015",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        midTermScore: 26,
        endTermScore: 58,
        totalScore: 84,
        grade: "A+",
        gradeLabel: "A+ Grade (Very Good)",
        status: "passed",
        rank: 5
    },
    {
        id: 4,
        studentName: "Rahul Verma",
        rollNo: "23UBCA042",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        midTermScore: 12,
        endTermScore: 32,
        totalScore: 44,
        grade: "F",
        gradeLabel: "F Grade (Backlog Risk)",
        status: "backlog",
        rank: 34
    },
    {
        id: 5,
        studentName: "Siddharth Malhotra",
        rollNo: "22UCSE088",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        midTermScore: 27,
        endTermScore: 61,
        totalScore: 88,
        grade: "A+",
        gradeLabel: "A+ Grade (Excellent)",
        status: "passed",
        rank: 3
    },
    {
        id: 6,
        studentName: "Karan Mehta",
        rollNo: "22UCSE091",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        midTermScore: 14,
        endTermScore: 31,
        totalScore: 45,
        grade: "F",
        gradeLabel: "F Grade (Backlog Risk)",
        status: "backlog",
        rank: 35
    }
];

let activeMarksClassFilter = "bca";
let activeMarksStatusFilter = "all";
let marksSearchQuery = "";
let currentMarksViewMode = "table"; // 'table' or 'grid'

document.addEventListener('DOMContentLoaded', () => {
    renderMarksReportTable();
    setupMarksEventListeners();
});

function setupMarksEventListeners() {
    // Class Select Dropdown Switcher
    const classSelect = document.getElementById('marksClassSelect');
    if (classSelect) {
        classSelect.addEventListener('change', (e) => {
            activeMarksClassFilter = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;
            const titleEl = document.getElementById('activeClassMarksTitle');
            if (titleEl) {
                titleEl.innerText = `${selectedText} Marks Analytics`;
            }
            renderMarksReportTable();
        });
    }

    // Search Input Filter
    const searchInput = document.getElementById('marksSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            marksSearchQuery = e.target.value.toLowerCase().trim();
            renderMarksReportTable();
        });
    }

    // Status Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeMarksStatusFilter = chip.getAttribute('data-filter');
            renderMarksReportTable();
        });
    });

    // Global Backdrop Click Dismissal
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('studentMarksheetModal');
        if (modal && modal.classList.contains('active') && e.target === modal) {
            closeMarksheetModal();
        }
    });
}

function switchMarksRosterView(mode) {
    currentMarksViewMode = mode;
    const btnTable = document.getElementById('marksViewTableBtn');
    const btnGrid = document.getElementById('marksViewGridBtn');

    if (mode === 'table') {
        if (btnTable) btnTable.classList.add('active');
        if (btnGrid) btnGrid.classList.remove('active');
        document.getElementById('marksTableView').style.display = 'block';
        document.getElementById('marksGridView').style.display = 'none';
    } else {
        if (btnGrid) btnGrid.classList.add('active');
        if (btnTable) btnTable.classList.remove('active');
        document.getElementById('marksTableView').style.display = 'none';
        document.getElementById('marksGridView').style.display = 'grid';
    }

    renderMarksReportTable();
}

// Render Master Marks Broadsheet Table Body & Grid Cards
function renderMarksReportTable() {
    const tbody = document.getElementById('marksReportTableBody');
    const gridContainer = document.getElementById('marksGridView');
    if (!tbody || !gridContainer) return;

    let filtered = marksReportBank.filter(s => {
        const matchClass = activeMarksClassFilter === 'all' || s.course === activeMarksClassFilter;
        
        let matchFilter = true;
        if (activeMarksStatusFilter === 'top') matchFilter = s.totalScore >= 90;
        if (activeMarksStatusFilter === 'passed') matchFilter = s.totalScore >= 50 && s.totalScore < 90;
        if (activeMarksStatusFilter === 'backlog') matchFilter = s.totalScore < 50;

        const matchSearch = marksSearchQuery === '' || 
                            s.studentName.toLowerCase().includes(marksSearchQuery) ||
                            s.rollNo.toLowerCase().includes(marksSearchQuery) ||
                            s.gradeLabel.toLowerCase().includes(marksSearchQuery);

        return matchClass && matchFilter && matchSearch;
    });

    updateMarksKpis(filtered);

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:40px; color:var(--text-tertiary);">
                    <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:8px; display:block;"></i>
                    No marks report records match your query.
                </td>
            </tr>
        `;
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">
                No marks report records match your query.
            </div>
        `;
        return;
    }

    // Render Table View
    tbody.innerHTML = filtered.map(s => {
        let gradeClass = "grade-o";
        if (s.grade === 'A+') gradeClass = "grade-ap";
        if (s.grade === 'B+') gradeClass = "grade-bp";
        if (s.grade === 'F')  gradeClass = "grade-f";

        return `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${s.avatar}" class="student-avatar-img" alt="${s.studentName}">
                        <div>
                            <strong style="font-size:14px; color:var(--text-primary); display:block;">${s.studentName}</strong>
                            <span style="font-size:11px; color:var(--text-tertiary);">${s.rollNo} • Rank #${s.rank}</span>
                        </div>
                    </div>
                </td>

                <td>
                    <strong style="font-size:13px; color:var(--text-primary);">${s.midTermScore} / 30</strong>
                </td>

                <td>
                    <strong style="font-size:13px; color:var(--text-primary);">${s.endTermScore} / 70</strong>
                </td>

                <td>
                    <strong style="font-size:14px; color:${s.totalScore < 50 ? '#ef4444' : '#10b981'};">${s.totalScore} / 100</strong>
                </td>

                <td>
                    <span class="grade-pill ${gradeClass}">
                        <i class="fa-solid ${s.totalScore >= 50 ? 'fa-award' : 'fa-triangle-exclamation'}"></i> ${s.gradeLabel}
                    </span>
                </td>

                <td>
                    <div class="table-action-btns">
                        <button onclick="viewStudentMarksReport(${s.id})" class="btn btn-secondary btn-sm" title="View Full Marksheet">
                            <i class="fa-solid fa-file-invoice"></i> Marksheet
                        </button>
                        <button onclick="sendRemedialNotice(${s.id})" class="btn btn-primary btn-sm" style="${s.totalScore < 50 ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'}" title="Send Remedial Support Alert">
                            <i class="fa-solid fa-bell"></i> Alert
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Render Grid Cards View
    gridContainer.innerHTML = filtered.map(s => {
        let gradeClass = "grade-o";
        if (s.grade === 'A+') gradeClass = "grade-ap";
        if (s.grade === 'B+') gradeClass = "grade-bp";
        if (s.grade === 'F')  gradeClass = "grade-f";

        return `
            <div class="marks-student-card">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span class="grade-pill ${gradeClass}">
                            <i class="fa-solid ${s.totalScore >= 50 ? 'fa-award' : 'fa-triangle-exclamation'}"></i> ${s.gradeLabel}
                        </span>
                        <strong style="font-size:16px; color:${s.totalScore < 50 ? '#ef4444' : '#10b981'};">${s.totalScore} / 100</strong>
                    </div>

                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
                        <img src="${s.avatar}" class="student-avatar-img" alt="${s.studentName}">
                        <div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block;">${s.studentName}</strong>
                            <span style="font-size:11px; color:var(--text-tertiary);">${s.rollNo} • Rank #${s.rank}</span>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:10px; background:var(--bg-tertiary); border-radius:8px; border:1px solid var(--border-color); font-size:12px; margin-bottom:10px; text-align:center;">
                        <div>
                            <span style="color:var(--text-tertiary); display:block; font-size:10px; text-transform:uppercase;">Mid-Term (30)</span>
                            <strong style="color:var(--text-primary); font-size:14px;">${s.midTermScore}</strong>
                        </div>
                        <div>
                            <span style="color:var(--text-tertiary); display:block; font-size:10px; text-transform:uppercase;">End-Term (70)</span>
                            <strong style="color:var(--text-primary); font-size:14px;">${s.endTermScore}</strong>
                        </div>
                    </div>
                </div>

                <div class="marks-card-footer">
                    <button onclick="viewStudentMarksReport(${s.id})" class="btn btn-secondary btn-sm" style="flex:1; justify-content:center;">
                        <i class="fa-solid fa-file-invoice"></i> Marksheet
                    </button>
                    <button onclick="sendRemedialNotice(${s.id})" class="btn btn-primary btn-sm" style="${s.totalScore < 50 ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'} flex:1; justify-content:center;">
                        <i class="fa-solid fa-bell"></i> Alert
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateMarksKpis(list) {
    const kpiAvg = document.getElementById('kpiClassAvgScore');
    const kpiHighest = document.getElementById('kpiHighestScore');
    const kpiPass = document.getElementById('kpiPassPct');
    const kpiBacklog = document.getElementById('kpiBacklogCount');

    if (list.length > 0) {
        const sum = list.reduce((acc, curr) => acc + curr.totalScore, 0);
        const avg = (sum / list.length).toFixed(1);
        if (kpiAvg) kpiAvg.innerText = `${avg} / 100`;

        const maxScore = Math.max(...list.map(s => s.totalScore));
        const topStudent = list.find(s => s.totalScore === maxScore);
        if (kpiHighest) kpiHighest.innerText = `${maxScore} / 100`;
    }

    if (kpiPass) kpiPass.innerText = `${((list.filter(s => s.totalScore >= 50).length / list.length) * 100).toFixed(1)}%`;
    if (kpiBacklog) kpiBacklog.innerText = list.filter(s => s.totalScore < 50).length;
}

// 1-Click PDF Marksheet Export
function exportPdfMarksheet() {
    showToast("📄 Exporting Official Semester Marksheet PDFs for DBMS (BCA Sem 3)...");
}

// 1-Click Excel Broadsheet Export
function exportExcelBroadsheet() {
    showToast("📊 Exporting Class Marks Master Broadsheet CSV/Excel file...");
}

// Send Remedial Notice to Single Student
function sendRemedialNotice(id) {
    const s = marksReportBank.find(item => item.id === id);
    if (s) {
        showToast(`🚨 Remedial Support Alert sent to ${s.studentName} (${s.rollNo})`);
    }
}

// Send Bulk Remedial Support Notices
function sendBulkRemedialNotices() {
    const backlogs = marksReportBank.filter(s => s.totalScore < 50);
    if (backlogs.length === 0) {
        showToast("All students have passed the minimum aggregate score criteria.");
        return;
    }
    showToast(`🚨 Bulk Remedial Tutorial Notices dispatched to ${backlogs.length} students!`);
}

// View Student Marksheet Modal Handler
let currentModalMarksheetId = null;

function viewStudentMarksReport(id) {
    const s = marksReportBank.find(item => item.id === id);
    if (!s) return;

    currentModalMarksheetId = id;
    const nameEl = document.getElementById('modalMarksheetStudentName');
    const rollEl = document.getElementById('modalMarksheetStudentRoll');
    const midTermEl = document.getElementById('modalMidTermVal');
    const endTermEl = document.getElementById('modalEndTermVal');
    const totalEl = document.getElementById('modalTotalScoreVal');
    const breakdownEl = document.getElementById('modalMarksheetBreakdown');

    if (nameEl) nameEl.innerText = `${s.studentName}`;
    if (rollEl) rollEl.innerText = `${s.rollNo} • ${s.courseLabel} • Class Rank #${s.rank}`;
    if (midTermEl) midTermEl.innerText = `${s.midTermScore} / 30`;
    if (endTermEl) endTermEl.innerText = `${s.endTermScore} / 70`;
    if (totalEl) totalEl.innerText = `${s.totalScore} / 100`;

    if (breakdownEl) {
        breakdownEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>Unit 1: Relational Database & SQL Queries</span>
                <strong style="color:#10b981;">9.5 / 10</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>Unit 2: Normalization & Transaction Control</span>
                <strong style="color:#10b981;">9.0 / 10</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>Unit 3: Indexing, PL/SQL & Triggers</span>
                <strong style="color:${s.totalScore < 50 ? '#ef4444' : '#10b981'};">${s.totalScore < 50 ? '4.0 / 10 (Needs Practice)' : '8.5 / 10'}</strong>
            </div>
        `;
    }

    const modal = document.getElementById('studentMarksheetModal');
    if (modal) modal.classList.add('active');
}

function closeMarksheetModal() {
    const modal = document.getElementById('studentMarksheetModal');
    if (modal) modal.classList.remove('active');
}

function printMarksheetPdf() {
    if (currentModalMarksheetId) {
        const s = marksReportBank.find(item => item.id === currentModalMarksheetId);
        showToast(`📄 Generating Official University Marksheet PDF for ${s ? s.studentName : 'Student'}...`);
    }
}

// Window scope exports for reliable HTML inline handlers
window.switchMarksRosterView = switchMarksRosterView;
window.exportPdfMarksheet = exportPdfMarksheet;
window.exportExcelBroadsheet = exportExcelBroadsheet;
window.sendRemedialNotice = sendRemedialNotice;
window.sendBulkRemedialNotices = sendBulkRemedialNotices;
window.viewStudentMarksReport = viewStudentMarksReport;
window.closeMarksheetModal = closeMarksheetModal;
window.printMarksheetPdf = printMarksheetPdf;

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