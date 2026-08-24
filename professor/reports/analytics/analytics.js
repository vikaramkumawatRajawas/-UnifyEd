/**
 * UnifyEd Faculty Portal - Class Analytics Interactivity Engine
 */

// Initial Class Analytics Dataset
let analyticsReportBank = [
    {
        id: 1,
        studentName: "Ananya Deshmukh",
        rollNo: "23UBCA010",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        attendancePct: 92.8,
        totalScore: 96,
        riskScore: 4,
        riskTier: "low",
        riskLabel: "Low Risk (4%)",
        status: "star"
    },
    {
        id: 2,
        studentName: "Priya Sharma",
        rollNo: "23UBCA028",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        attendancePct: 95.2,
        totalScore: 91,
        riskScore: 6,
        riskTier: "low",
        riskLabel: "Low Risk (6%)",
        status: "star"
    },
    {
        id: 3,
        studentName: "Vikram Kumawat",
        rollNo: "23UBCA015",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        attendancePct: 90.5,
        totalScore: 84,
        riskScore: 12,
        riskTier: "low",
        riskLabel: "Low Risk (12%)",
        status: "optimal"
    },
    {
        id: 4,
        studentName: "Rahul Verma",
        rollNo: "23UBCA042",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        attendancePct: 61.9,
        totalScore: 44,
        riskScore: 82,
        riskTier: "high",
        riskLabel: "High Risk (82%)",
        status: "high_risk"
    },
    {
        id: 5,
        studentName: "Siddharth Malhotra",
        rollNo: "22UCSE088",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        attendancePct: 87.5,
        totalScore: 88,
        riskScore: 10,
        riskTier: "low",
        riskLabel: "Low Risk (10%)",
        status: "optimal"
    },
    {
        id: 6,
        studentName: "Karan Mehta",
        rollNo: "22UCSE091",
        course: "cse",
        courseLabel: "Web Tech (CSE Sem 5)",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        attendancePct: 62.5,
        totalScore: 45,
        riskScore: 78,
        riskTier: "high",
        riskLabel: "High Risk (78%)",
        status: "high_risk"
    }
];

let activeAnalyticsClassFilter = "bca";
let activeAnalyticsStatusFilter = "all";
let analyticsSearchQuery = "";
let currentAnalyticsViewMode = "table"; // 'table' or 'grid'

document.addEventListener('DOMContentLoaded', () => {
    renderAnalyticsReportTable();
    setupAnalyticsEventListeners();
});

function setupAnalyticsEventListeners() {
    // Class Select Dropdown Switcher
    const classSelect = document.getElementById('analyticsClassSelect');
    if (classSelect) {
        classSelect.addEventListener('change', (e) => {
            activeAnalyticsClassFilter = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;
            const titleEl = document.getElementById('activeClassAnalyticsTitle');
            if (titleEl) {
                titleEl.innerText = `${selectedText} Class Performance Telemetry`;
            }
            renderAnalyticsReportTable();
        });
    }

    // Search Input Filter
    const searchInput = document.getElementById('analyticsSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            analyticsSearchQuery = e.target.value.toLowerCase().trim();
            renderAnalyticsReportTable();
        });
    }

    // Status Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeAnalyticsStatusFilter = chip.getAttribute('data-filter');
            renderAnalyticsReportTable();
        });
    });

    // Global Backdrop Click Dismissal
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('studentAnalyticsModal');
        if (modal && modal.classList.contains('active') && e.target === modal) {
            closeAnalyticsModal();
        }
    });
}

function switchAnalyticsRosterView(mode) {
    currentAnalyticsViewMode = mode;
    const btnTable = document.getElementById('analyticsViewTableBtn');
    const btnGrid = document.getElementById('analyticsViewGridBtn');

    if (mode === 'table') {
        if (btnTable) btnTable.classList.add('active');
        if (btnGrid) btnGrid.classList.remove('active');
        document.getElementById('analyticsTableView').style.display = 'block';
        document.getElementById('analyticsGridView').style.display = 'none';
    } else {
        if (btnGrid) btnGrid.classList.add('active');
        if (btnTable) btnTable.classList.remove('active');
        document.getElementById('analyticsTableView').style.display = 'none';
        document.getElementById('analyticsGridView').style.display = 'grid';
    }

    renderAnalyticsReportTable();
}

// Render Master AI Risk Matrix Table Body & Grid Cards
function renderAnalyticsReportTable() {
    const tbody = document.getElementById('analyticsReportTableBody');
    const gridContainer = document.getElementById('analyticsGridView');
    if (!tbody || !gridContainer) return;

    let filtered = analyticsReportBank.filter(s => {
        const matchClass = activeAnalyticsClassFilter === 'all' || s.course === activeAnalyticsClassFilter;
        
        let matchFilter = true;
        if (activeAnalyticsStatusFilter === 'high') matchFilter = s.riskTier === 'high';
        if (activeAnalyticsStatusFilter === 'medium') matchFilter = s.riskTier === 'medium';
        if (activeAnalyticsStatusFilter === 'low') matchFilter = s.riskTier === 'low';

        const matchSearch = analyticsSearchQuery === '' || 
                            s.studentName.toLowerCase().includes(analyticsSearchQuery) ||
                            s.rollNo.toLowerCase().includes(analyticsSearchQuery) ||
                            s.riskLabel.toLowerCase().includes(analyticsSearchQuery);

        return matchClass && matchFilter && matchSearch;
    });

    updateAnalyticsKpis(filtered);

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px; color:var(--text-tertiary);">
                    <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:8px; display:block;"></i>
                    No class analytics records match your query.
                </td>
            </tr>
        `;
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">
                No class analytics records match your query.
            </div>
        `;
        return;
    }

    // Render Table View
    tbody.innerHTML = filtered.map(s => {
        let riskClass = "low";
        if (s.riskTier === 'medium') riskClass = "medium";
        if (s.riskTier === 'high')   riskClass = "high";

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
                    <strong style="font-size:13px; color:${s.attendancePct < 75 ? '#ef4444' : '#10b981'};">${s.attendancePct}%</strong>
                </td>

                <td>
                    <strong style="font-size:14px; color:${s.totalScore < 50 ? '#ef4444' : 'var(--primary)'};">${s.totalScore} / 100</strong>
                </td>

                <td>
                    <span class="risk-pill ${riskClass}">
                        <i class="fa-solid ${s.riskTier === 'high' ? 'fa-triangle-exclamation' : 'fa-shield-check'}"></i> ${s.riskLabel}
                    </span>
                </td>

                <td>
                    <div class="table-action-btns">
                        <button onclick="viewAnalyticsReport(${s.id})" class="btn btn-secondary btn-sm" title="View 360° Deep Analytics">
                            <i class="fa-solid fa-chart-line"></i> Deep Analysis
                        </button>
                        <button onclick="triggerCounseling(${s.id})" class="btn btn-primary btn-sm" style="${s.riskTier === 'high' ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'}" title="Issue Counselor Notice">
                            <i class="fa-solid fa-user-shield"></i> Counselor
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Render Grid Cards View
    gridContainer.innerHTML = filtered.map(s => {
        let riskClass = "low";
        if (s.riskTier === 'medium') riskClass = "medium";
        if (s.riskTier === 'high')   riskClass = "high";

        return `
            <div class="analytics-student-card">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span class="risk-pill ${riskClass}">
                            <i class="fa-solid ${s.riskTier === 'high' ? 'fa-triangle-exclamation' : 'fa-shield-check'}"></i> ${s.riskLabel}
                        </span>
                        <strong style="font-size:14px; color:${s.totalScore < 50 ? '#ef4444' : '#10b981'};">${s.totalScore} / 100 Marks</strong>
                    </div>

                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
                        <img src="${s.avatar}" class="student-avatar-img" alt="${s.studentName}">
                        <div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block;">${s.studentName}</strong>
                            <span style="font-size:11px; color:var(--text-tertiary);">${s.rollNo} • ${s.courseLabel}</span>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:10px; background:var(--bg-tertiary); border-radius:8px; border:1px solid var(--border-color); font-size:12px; margin-bottom:10px; text-align:center;">
                        <div>
                            <span style="color:var(--text-tertiary); display:block; font-size:10px; text-transform:uppercase;">Attendance</span>
                            <strong style="color:${s.attendancePct < 75 ? '#ef4444' : '#10b981'}; font-size:14px;">${s.attendancePct}%</strong>
                        </div>
                        <div>
                            <span style="color:var(--text-tertiary); display:block; font-size:10px; text-transform:uppercase;">Risk Score</span>
                            <strong style="color:${s.riskScore > 50 ? '#ef4444' : 'var(--primary)'}; font-size:14px;">${s.riskScore}%</strong>
                        </div>
                    </div>
                </div>

                <div class="analytics-card-footer">
                    <button onclick="viewAnalyticsReport(${s.id})" class="btn btn-secondary btn-sm" style="flex:1; justify-content:center;">
                        <i class="fa-solid fa-chart-line"></i> Deep Analysis
                    </button>
                    <button onclick="triggerCounseling(${s.id})" class="btn btn-primary btn-sm" style="${s.riskTier === 'high' ? 'background:#ef4444;' : 'background:rgba(99, 102, 241, 0.2); color:var(--primary);'} flex:1; justify-content:center;">
                        <i class="fa-solid fa-user-shield"></i> Counselor
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateAnalyticsKpis(list) {
    const kpiHealth = document.getElementById('kpiClassHealth');
    const kpiAtt = document.getElementById('kpiAttendanceAvg');
    const kpiScore = document.getElementById('kpiExamScoreIndex');
    const kpiRisk = document.getElementById('kpiRiskCount');

    if (list.length > 0) {
        const sumAtt = list.reduce((acc, curr) => acc + curr.attendancePct, 0);
        if (kpiAtt) kpiAtt.innerText = `${(sumAtt / list.length).toFixed(1)}%`;

        const sumScore = list.reduce((acc, curr) => acc + curr.totalScore, 0);
        if (kpiScore) kpiScore.innerText = `${(sumScore / list.length).toFixed(1)}%`;
    }

    if (kpiRisk) kpiRisk.innerText = list.filter(s => s.riskTier === 'high').length;
}

// 1-Click Executive Analytics PDF Export
function exportExecutiveAnalyticsPdf() {
    showToast("📄 Exporting Executive 360° Class Analytics PDF Report...");
}

// Run AI Diagnosis Engine
function runAiDiagnosis() {
    showToast("🪄 Running AI Predictive Risk Diagnosis across student telemetry...");
}

// Trigger Counseling Session for Single Student
function triggerCounseling(id) {
    const s = analyticsReportBank.find(item => item.id === id);
    if (s) {
        showToast(`🛡️ Academic Counselor Notice issued for ${s.studentName} (${s.rollNo})`);
    }
}

// Send Bulk Counselor Notices
function sendBulkCounselorNotices() {
    const highRisks = analyticsReportBank.filter(s => s.riskTier === 'high');
    if (highRisks.length === 0) {
        showToast("No students currently flagged in High Risk Tier.");
        return;
    }
    showToast(`🚨 Bulk Academic Counseling Notices issued to ${highRisks.length} students!`);
}

// View Student Deep Analytics Modal Handler
let currentModalAnalyticsId = null;

function viewAnalyticsReport(id) {
    const s = analyticsReportBank.find(item => item.id === id);
    if (!s) return;

    currentModalAnalyticsId = id;
    const nameEl = document.getElementById('modalAnalyticsStudentName');
    const rollEl = document.getElementById('modalAnalyticsStudentRoll');
    const attEl = document.getElementById('modalAnalyticsAttendedVal');
    const scoreEl = document.getElementById('modalAnalyticsScoreVal');
    const riskEl = document.getElementById('modalAnalyticsRiskVal');
    const assessmentEl = document.getElementById('modalAnalyticsAssessment');

    if (nameEl) nameEl.innerText = `${s.studentName}`;
    if (rollEl) rollEl.innerText = `${s.rollNo} • ${s.courseLabel}`;
    if (attEl) attEl.innerText = `${s.attendancePct}%`;
    if (scoreEl) scoreEl.innerText = `${s.totalScore} / 100`;
    if (riskEl) riskEl.innerText = `${s.riskLabel}`;

    if (assessmentEl) {
        assessmentEl.innerHTML = `
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>Classroom Engagement Index</span>
                <strong style="color:${s.attendancePct < 75 ? '#ef4444' : '#10b981'};">${s.attendancePct < 75 ? 'Low Attendance Alert' : 'Active Participation'}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>Exam Competency Score</span>
                <strong style="color:${s.totalScore < 50 ? '#ef4444' : '#10b981'};">${s.totalScore < 50 ? 'Remedial Support Recommended' : 'Good Subject Knowledge'}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-tertiary); border-radius:6px; font-size:12px;">
                <span>AI Predicted End-Term Grade</span>
                <strong style="color:var(--primary);">${s.totalScore >= 90 ? 'O Grade (Outstanding)' : (s.totalScore >= 50 ? 'A+ Grade (Good Standing)' : 'F Backlog Risk')}</strong>
            </div>
        `;
    }

    const modal = document.getElementById('studentAnalyticsModal');
    if (modal) modal.classList.add('active');
}

function closeAnalyticsModal() {
    const modal = document.getElementById('studentAnalyticsModal');
    if (modal) modal.classList.remove('active');
}

function scheduleCounselingSession() {
    if (currentModalAnalyticsId) {
        const s = analyticsReportBank.find(item => item.id === currentModalAnalyticsId);
        showToast(`📅 Scheduling Academic Counseling Session for ${s ? s.studentName : 'Student'}...`);
    }
    closeAnalyticsModal();
}

// Window scope exports for reliable HTML inline handlers
window.switchAnalyticsRosterView = switchAnalyticsRosterView;
window.exportExecutiveAnalyticsPdf = exportExecutiveAnalyticsPdf;
window.runAiDiagnosis = runAiDiagnosis;
window.triggerCounseling = triggerCounseling;
window.sendBulkCounselorNotices = sendBulkCounselorNotices;
window.viewAnalyticsReport = viewAnalyticsReport;
window.closeAnalyticsModal = closeAnalyticsModal;
window.scheduleCounselingSession = scheduleCounselingSession;

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