/**
 * UnifyEd Faculty Portal - Leave Applications Interactivity Engine
 */

// Initial Leave Applications Dataset
let applicationsBank = [
    {
        id: 1,
        studentName: "Vikram Kumawat",
        rollNo: "23UBCA015",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        leaveType: "medical",
        leaveTypeLabel: "Medical Exemption",
        dates: "Aug 22, 2026 - Aug 24, 2026",
        daysCount: "3 Days",
        reason: "Viral Fever & High Temperature. Recommended rest by AIIMS Hospital Resident Doctor.",
        documentFile: "Medical_Certificate_AIIMS.pdf",
        currentAttendance: "82%",
        exemptedAttendance: "88%",
        status: "pending", // pending, approved, rejected
        statusLabel: "Pending Approval"
    },
    {
        id: 2,
        studentName: "Priya Sharma",
        rollNo: "23UBCA028",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        leaveType: "duty",
        leaveTypeLabel: "Duty Leave (Hackathon)",
        dates: "Aug 18, 2026 - Aug 19, 2026",
        daysCount: "2 Days",
        reason: "Representing College at Smart India Hackathon 2026 Grand Finale at IIT Delhi.",
        documentFile: "SIH2026_Selection_Letter.pdf",
        currentAttendance: "91%",
        exemptedAttendance: "95%",
        status: "approved",
        statusLabel: "Approved by Dr. Rajesh"
    },
    {
        id: 3,
        studentName: "Rahul Verma",
        rollNo: "23UBCA042",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        leaveType: "casual",
        leaveTypeLabel: "Personal Emergency",
        dates: "Aug 15, 2026",
        daysCount: "1 Day",
        reason: "Urgent family event in hometown. Applied casual absence approval.",
        documentFile: "Casual_Leave_Form.pdf",
        currentAttendance: "64%",
        exemptedAttendance: "64%",
        status: "rejected",
        statusLabel: "Rejected (Shortfall)"
    },
    {
        id: 4,
        studentName: "Ananya Deshmukh",
        rollNo: "23UBCA010",
        course: "bca",
        courseLabel: "DBMS (BCA Sem 3)",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        leaveType: "medical",
        leaveTypeLabel: "Medical Exemption",
        dates: "Aug 25, 2026 - Aug 27, 2026",
        daysCount: "3 Days",
        reason: "Dental Surgery recovery & medication period. Medical slip attached.",
        documentFile: "Dental_Clinic_Slip.pdf",
        currentAttendance: "94%",
        exemptedAttendance: "97%",
        status: "pending",
        statusLabel: "Pending Approval"
    }
];

let activeClassFilter = "all";
let activeTypeFilter = "all";
let searchQuery = "";

document.addEventListener('DOMContentLoaded', () => {
    renderApplications();
    renderRecentApprovalLog();
    setupEventListeners();
});

function setupEventListeners() {
    // Class Select Dropdown Switcher
    const classSelect = document.getElementById('leaveClassSelect');
    if (classSelect) {
        classSelect.addEventListener('change', (e) => {
            activeClassFilter = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;
            const titleEl = document.getElementById('activeClassLeaveTitle');
            if (titleEl) {
                titleEl.innerText = selectedText.includes('(') ? selectedText : `${selectedText} Leave Approvals`;
            }
            renderApplications();
        });
    }

    // Search Input Filter
    const searchInput = document.getElementById('appSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderApplications();
        });
    }

    // Type Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeTypeFilter = chip.getAttribute('data-type');
            renderApplications();
        });
    });
}

// Render Leave Application Cards Grid
function renderApplications() {
    const container = document.getElementById('applicationsCardsContainer');
    if (!container) return;

    let filtered = applicationsBank.filter(app => {
        const matchClass = activeClassFilter === 'all' || app.course === activeClassFilter;
        const matchType = activeTypeFilter === 'all' || app.leaveType === activeTypeFilter;
        const matchSearch = searchQuery === '' || 
                            app.studentName.toLowerCase().includes(searchQuery) ||
                            app.rollNo.toLowerCase().includes(searchQuery) ||
                            app.reason.toLowerCase().includes(searchQuery) ||
                            app.documentFile.toLowerCase().includes(searchQuery);
        return matchClass && matchType && matchSearch;
    });

    updateKpis(filtered);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; background:var(--glass-bg); border-radius:var(--border-radius-md); border:1px solid var(--border-glass);">
                <i class="fa-solid fa-folder-open" style="font-size:36px; color:var(--text-tertiary); margin-bottom:12px;"></i>
                <h4 style="color:var(--text-primary); margin-bottom:6px;">No leave applications found</h4>
                <p style="font-size:12px; color:var(--text-secondary);">Try clearing your search query or selecting a different leave type chip.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(app => {
        let statusBadgeClass = "pending";
        if (app.status === 'approved') statusBadgeClass = "approved";
        if (app.status === 'rejected') statusBadgeClass = "rejected";

        const isApproved = app.status === 'approved';
        const isRejected = app.status === 'rejected';

        const approveBtnStyle = isApproved ? 'background:#10b981; color:#fff; border-color:#10b981; flex:1;' : 'background:rgba(16, 185, 129, 0.15); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); flex:1;';
        const rejectBtnStyle = isRejected ? 'background:#ef4444; color:#fff; border-color:#ef4444; flex:1;' : 'background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3); flex:1;';

        return `
            <div class="application-item-card">
                <div>
                    <div class="application-card-header">
                        <span class="application-type-badge">${app.leaveTypeLabel.toUpperCase()}</span>
                        <span class="application-status-badge ${statusBadgeClass}">${app.statusLabel}</span>
                    </div>

                    <div class="student-profile-box">
                        <img src="${app.avatar}" class="student-avatar-img" alt="${app.studentName}">
                        <div class="student-info-details">
                            <span class="student-name">${app.studentName}</span>
                            <span class="student-roll">${app.rollNo} • ${app.courseLabel}</span>
                        </div>
                    </div>

                    <div class="leave-details-box">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:var(--text-primary);"><i class="fa-regular fa-calendar-days" style="color:var(--primary);"></i> ${app.dates}</strong>
                            <span style="font-size:11px; font-weight:700; color:var(--primary);">${app.daysCount}</span>
                        </div>
                        <span style="font-size:11px; color:var(--text-tertiary);">Current: ${app.currentAttendance} ➔ Expected: <strong style="color:#10b981;">${app.exemptedAttendance}</strong></span>
                    </div>

                    <p class="leave-reason-text">"${app.reason}"</p>

                    <div style="margin-bottom:12px;">
                        <button onclick="openDocumentModal(${app.id})" class="document-proof-pill">
                            <i class="fa-solid fa-paperclip"></i> ${app.documentFile}
                        </button>
                    </div>
                </div>

                <div>
                    <div class="application-card-footer">
                        <button onclick="rejectLeaveApp(${app.id})" class="btn btn-sm" style="${rejectBtnStyle}">
                            <i class="fa-solid fa-xmark"></i> ${isRejected ? 'Rejected' : 'Reject'}
                        </button>
                        <button onclick="approveLeaveApp(${app.id})" class="btn btn-sm" style="${approveBtnStyle}">
                            <i class="fa-solid fa-check"></i> ${isApproved ? 'Approved' : 'Approve'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateKpis(list) {
    const kpiTotal = document.getElementById('kpiTotalApps');
    const kpiPending = document.getElementById('kpiPendingApps');
    const kpiApproved = document.getElementById('kpiApprovedApps');
    const kpiRejected = document.getElementById('kpiRejectedApps');

    if (kpiTotal) kpiTotal.innerText = list.length;
    if (kpiPending) kpiPending.innerText = list.filter(a => a.status === 'pending').length;
    if (kpiApproved) kpiApproved.innerText = list.filter(a => a.status === 'approved').length;
    if (kpiRejected) kpiRejected.innerText = list.filter(a => a.status === 'rejected').length;
}

// 1-Click Approve Leave Application Action
function approveLeaveApp(id) {
    const app = applicationsBank.find(item => item.id === id);
    if (app) {
        app.status = 'approved';
        app.statusLabel = 'Approved by Dr. Rajesh';
        renderApplications();
        renderRecentApprovalLog();
        showToast(`🎉 Leave Approved for ${app.studentName}. Attendance waiver credited!`);
    }
}

// 1-Click Reject Leave Application Action
function rejectLeaveApp(id) {
    const app = applicationsBank.find(item => item.id === id);
    if (app) {
        app.status = 'rejected';
        app.statusLabel = 'Rejected Request';
        renderApplications();
        renderRecentApprovalLog();
        showToast(`🚫 Leave Application for ${app.studentName} has been rejected.`);
    }
}

// Bulk Approve Pending Applications
function bulkApprovePending() {
    const pendingList = applicationsBank.filter(a => a.status === 'pending');
    if (pendingList.length === 0) {
        showToast("No pending leave applications to approve!");
        return;
    }

    pendingList.forEach(a => {
        a.status = 'approved';
        a.statusLabel = 'Approved by Dr. Rajesh';
    });

    renderApplications();
    renderRecentApprovalLog();
    showToast(`🎉 Bulk Approved ${pendingList.length} pending leave requests!`);
}

// Render Recent Approval Activity Log
function renderRecentApprovalLog() {
    const container = document.getElementById('recentApprovalLog');
    if (!container) return;

    const approvedList = applicationsBank.filter(a => a.status === 'approved' || a.status === 'rejected');

    if (approvedList.length === 0) {
        container.innerHTML = `<div style="font-size:12px; color:var(--text-tertiary);">No recent approval activity recorded.</div>`;
        return;
    }

    container.innerHTML = approvedList.slice(0, 4).map(a => `
        <div style="padding:10px 12px; background:var(--bg-tertiary); border-radius:8px; border:1px solid var(--border-color); font-size:12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <strong style="color:var(--text-primary);">${a.studentName}</strong>
                <span style="font-size:10px; font-weight:700; color:${a.status === 'approved' ? '#10b981' : '#ef4444'};">${a.status.toUpperCase()}</span>
            </div>
            <p style="margin:0; font-size:11px; color:var(--text-secondary); line-height:1.3;">${a.leaveTypeLabel} • ${a.daysCount}</p>
        </div>
    `).join('');
}

// View Document Modal Handler
let currentModalAppId = null;

function openDocumentModal(id) {
    const app = applicationsBank.find(item => item.id === id);
    if (!app) return;

    currentModalAppId = id;
    const nameEl = document.getElementById('modalStudentName');
    const datesEl = document.getElementById('modalLeaveDates');
    const reasonEl = document.getElementById('modalReasonText');
    const fileEl = document.getElementById('modalFileName');
    const letterheadEl = document.getElementById('modalDocLetterhead');

    if (nameEl) nameEl.innerText = `${app.studentName} (${app.rollNo})`;
    if (datesEl) datesEl.innerText = `${app.dates} • ${app.daysCount}`;
    if (reasonEl) reasonEl.innerText = app.reason;
    if (fileEl) fileEl.innerText = app.documentFile;

    // Render realistic document letterhead preview
    if (letterheadEl) {
        if (app.documentFile.includes('SIH2026') || app.leaveType === 'duty') {
            letterheadEl.innerHTML = `
                <div style="text-align:center; margin-bottom:12px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
                    <strong style="color:var(--primary); font-size:14px; text-transform:uppercase; letter-spacing:1px; display:block;">SMART INDIA HACKATHON 2026</strong>
                    <span style="font-size:11px; color:var(--text-tertiary);">Ministry of Education Innovation Cell & IIT Delhi</span>
                </div>
                <div style="font-size:12px; color:var(--text-primary); margin-bottom:10px;">
                    <strong style="color:#10b981;"><i class="fa-solid fa-file-contract"></i> OFFICIAL SELECTION & DUTY LEAVE ORDER:</strong>
                    <p style="margin:6px 0; color:var(--text-secondary); line-height:1.5;">This is to certify that <strong>${app.studentName}</strong> (Roll No: ${app.rollNo}) has been officially selected as Team Leader for SIH 2026 Grand Finale at IIT Delhi Campus from ${app.dates}. Full Duty Leave & Attendance Credit is authorized.</p>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:var(--text-tertiary); margin-top:10px; border-top:1px dashed var(--border-color); padding-top:8px;">
                    <span>Ref No: MIC/SIH2026/DEL-4821</span>
                    <span style="color:#10b981; font-weight:700;"><i class="fa-solid fa-stamp"></i> VERIFIED OFFICIAL SEAL</span>
                </div>
            `;
        } else if (app.documentFile.includes('AIIMS') || app.leaveType === 'medical') {
            letterheadEl.innerHTML = `
                <div style="text-align:center; margin-bottom:12px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
                    <strong style="color:#ef4444; font-size:14px; text-transform:uppercase; letter-spacing:1px; display:block;">ALL INDIA INSTITUTE OF MEDICAL SCIENCES (AIIMS)</strong>
                    <span style="font-size:11px; color:var(--text-tertiary);">Outpatient Medical Department & Resident Clinic</span>
                </div>
                <div style="font-size:12px; color:var(--text-primary); margin-bottom:10px;">
                    <strong style="color:#ef4444;"><i class="fa-solid fa-notes-medical"></i> MEDICAL CERTIFICATE & REST EXEMPTION:</strong>
                    <p style="margin:6px 0; color:var(--text-secondary); line-height:1.5;">Patient <strong>${app.studentName}</strong> was under medical treatment for acute condition from ${app.dates}. Absolute physical rest was advised during this period.</p>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:var(--text-tertiary); margin-top:10px; border-top:1px dashed var(--border-color); padding-top:8px;">
                    <span>Reg No: AIIMS/OPD/2026/9842</span>
                    <span style="color:#10b981; font-weight:700;"><i class="fa-solid fa-user-doctor"></i> Dr. A. K. Sharma (Senior Resident)</span>
                </div>
            `;
        } else {
            letterheadEl.innerHTML = `
                <div style="text-align:center; margin-bottom:12px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
                    <strong style="color:var(--primary); font-size:14px; text-transform:uppercase; display:block;">UNIFYED UNIVERSITY STUDENT LEAVE FORM</strong>
                    <span style="font-size:11px; color:var(--text-tertiary);">Department of Computer Science & Applications</span>
                </div>
                <div style="font-size:12px; color:var(--text-primary); margin-bottom:10px;">
                    <strong>STUDENT ABSENCE DECLARATION:</strong>
                    <p style="margin:6px 0; color:var(--text-secondary); line-height:1.5;">Requesting leave approval for <strong>${app.studentName}</strong> for dates ${app.dates} on grounds of: "${app.reason}".</p>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:10px; color:var(--text-tertiary); margin-top:10px; border-top:1px dashed var(--border-color); padding-top:8px;">
                    <span>Form ID: UNIFY/LV/2026/5512</span>
                    <span style="color:var(--primary); font-weight:700;"><i class="fa-solid fa-signature"></i> Student Digital Signature</span>
                </div>
            `;
        }
    }

    const modal = document.getElementById('viewDocumentModal');
    if (modal) modal.classList.add('active');
}

function openFullPdfViewer() {
    if (!currentModalAppId) return;
    const app = applicationsBank.find(item => item.id === currentModalAppId);
    if (!app) return;

    const titleEl = document.getElementById('pdfToolbarTitle');
    const paperEl = document.getElementById('pdfPaperContent');

    if (titleEl) titleEl.innerText = app.documentFile;

    if (paperEl) {
        if (app.documentFile.includes('SIH2026') || app.leaveType === 'duty') {
            paperEl.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0f172a; padding-bottom:15px; margin-bottom:20px;">
                    <div>
                        <h2 style="margin:0; font-size:18px; font-weight:800; color:#4f46e5;">MINISTRY OF EDUCATION</h2>
                        <span style="font-size:11px; color:#475569; text-transform:uppercase; font-weight:700; letter-spacing:0.5px;">Innovation Cell • Government of India</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:11px; font-weight:700; color:#0f172a;">SIH-2026 GRAND FINALE</span>
                        <span style="display:block; font-size:10px; color:#64748b;">IIT Delhi Campus</span>
                    </div>
                </div>

                <div style="text-align:center; margin-bottom:25px;">
                    <h3 style="font-size:16px; font-weight:800; color:#0f172a; text-decoration:underline; text-transform:uppercase;">OFFICIAL SELECTION & DUTY LEAVE SANCTION ORDER</h3>
                    <span style="font-size:11px; color:#64748b;">Order Ref: MIC/SIH2026/DEL-4821 • Date: August 18, 2026</span>
                </div>

                <div style="font-size:13px; line-height:1.7; color:#1e293b; margin-bottom:30px;">
                    <p>To Whom It May Concern,</p>
                    <p>This official order certifies that <strong>${app.studentName}</strong> (Roll Number: <strong>${app.rollNo}</strong>), student of ${app.courseLabel}, has been officially selected as Team Leader for the <strong>Smart India Hackathon 2026 Grand Finale</strong> taking place at IIT Delhi Campus.</p>
                    <p>The student is authorized to attend the competition during the dates: <strong>${app.dates}</strong> (${app.daysCount}).</p>
                    <p>As per Ministry of Education guidelines, the institute is hereby requested to grant full <strong>Duty Leave & Attendance Exemption</strong> for all lectures held during this duration.</p>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:60px; border-top:1px dashed #cbd5e1; padding-top:20px;">
                    <div>
                        <div style="width:80px; height:80px; border-radius:50%; border:2px solid #10b981; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#10b981; font-size:9px; font-weight:800; text-align:center; transform:rotate(-12deg);">
                            <i class="fa-solid fa-stamp" style="font-size:16px; margin-bottom:2px;"></i>
                            <span>GOVT SEAL</span>
                            <span>VERIFIED</span>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <strong style="font-size:13px; color:#0f172a; display:block;">Dr. Abhay Jere</strong>
                        <span style="font-size:11px; color:#64748b;">Chief Innovation Officer (CIO)</span>
                        <span style="font-size:10px; color:#94a3b8; display:block; margin-top:2px;">Ministry of Education, New Delhi</span>
                    </div>
                </div>
            `;
        } else if (app.documentFile.includes('AIIMS') || app.leaveType === 'medical') {
            paperEl.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #ef4444; padding-bottom:15px; margin-bottom:20px;">
                    <div>
                        <h2 style="margin:0; font-size:18px; font-weight:800; color:#dc2626;"><i class="fa-solid fa-hospital"></i> AIIMS HOSPITAL</h2>
                        <span style="font-size:11px; color:#475569; text-transform:uppercase; font-weight:700;">All India Institute of Medical Sciences</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:11px; font-weight:700; color:#0f172a;">OPD / CLINICAL DEPT</span>
                        <span style="display:block; font-size:10px; color:#64748b;">Emergency & Resident Care</span>
                    </div>
                </div>

                <div style="text-align:center; margin-bottom:25px;">
                    <h3 style="font-size:16px; font-weight:800; color:#0f172a; text-decoration:underline; text-transform:uppercase;">MEDICAL FITNESS & REST CERTIFICATE</h3>
                    <span style="font-size:11px; color:#64748b;">Certificate No: AIIMS/OPD/2026/9842</span>
                </div>

                <div style="font-size:13px; line-height:1.7; color:#1e293b; margin-bottom:30px;">
                    <p>This is to certify that <strong>${app.studentName}</strong> (Age: 20, Roll No: <strong>${app.rollNo}</strong>) was under my medical treatment for acute condition from <strong>${app.dates}</strong>.</p>
                    <p>Diagnosis: <em>${app.reason}</em></p>
                    <p>The patient was advised complete physical rest and isolation during the period of ${app.daysCount}. He/She is now declared medically fit to resume academic coursework.</p>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:60px; border-top:1px dashed #cbd5e1; padding-top:20px;">
                    <div>
                        <div style="width:80px; height:80px; border-radius:50%; border:2px solid #ef4444; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#ef4444; font-size:9px; font-weight:800; text-align:center; transform:rotate(-8deg);">
                            <i class="fa-solid fa-user-doctor" style="font-size:16px; margin-bottom:2px;"></i>
                            <span>AIIMS OPD</span>
                            <span>APPROVED</span>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <strong style="font-size:13px; color:#0f172a; display:block;">Dr. A. K. Sharma, MD</strong>
                        <span style="font-size:11px; color:#64748b;">Senior Resident Medical Officer</span>
                        <span style="font-size:10px; color:#94a3b8; display:block; margin-top:2px;">Reg. No: MCI-89412</span>
                    </div>
                </div>
            `;
        } else {
            paperEl.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #4f46e5; padding-bottom:15px; margin-bottom:20px;">
                    <div>
                        <h2 style="margin:0; font-size:18px; font-weight:800; color:#4f46e5;">UNIFYED UNIVERSITY</h2>
                        <span style="font-size:11px; color:#475569; text-transform:uppercase; font-weight:700;">Department of Student Affairs</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:11px; font-weight:700; color:#0f172a;">LEAVE APPLICATION FORM</span>
                    </div>
                </div>

                <div style="font-size:13px; line-height:1.7; color:#1e293b; margin-bottom:30px;">
                    <p>Student Name: <strong>${app.studentName}</strong> (Roll No: <strong>${app.rollNo}</strong>)</p>
                    <p>Dates Requested: <strong>${app.dates}</strong> (${app.daysCount})</p>
                    <p>Reason: ${app.reason}</p>
                </div>
            `;
        }
    }

    const pdfModal = document.getElementById('pdfViewerModal');
    if (pdfModal) pdfModal.classList.add('active');
}

function closePdfViewerModal() {
    const pdfModal = document.getElementById('pdfViewerModal');
    if (pdfModal) {
        pdfModal.classList.remove('active');
        pdfModal.style.display = 'none';
        setTimeout(() => { pdfModal.style.display = ''; }, 100);
    }
}

function closeDocumentModal() {
    const modal = document.getElementById('viewDocumentModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        setTimeout(() => { modal.style.display = ''; }, 100);
    }
}

// Global Backdrop Click Close Listener
document.addEventListener('click', (e) => {
    const pdfModal = document.getElementById('pdfViewerModal');
    if (pdfModal && pdfModal.classList.contains('active') && e.target === pdfModal) {
        closePdfViewerModal();
    }
    const docModal = document.getElementById('viewDocumentModal');
    if (docModal && docModal.classList.contains('active') && e.target === docModal) {
        closeDocumentModal();
    }
});

function printPdfDocument() {
    window.print();
}

function downloadPdfDocument() {
    if (!currentModalAppId) return;
    const app = applicationsBank.find(item => item.id === currentModalAppId);
    showToast(`📥 Downloading PDF document: ${app ? app.documentFile : 'document.pdf'}`);
}

// Window scope exports for reliable HTML inline handlers
window.approveLeaveApp = approveLeaveApp;
window.rejectLeaveApp = rejectLeaveApp;
window.bulkApprovePending = bulkApprovePending;
window.openDocumentModal = openDocumentModal;
window.openFullPdfViewer = openFullPdfViewer;
window.closePdfViewerModal = closePdfViewerModal;
window.closeDocumentModal = closeDocumentModal;
window.printPdfDocument = printPdfDocument;
window.downloadPdfDocument = downloadPdfDocument;
window.approveFromModal = approveFromModal;
window.rejectFromModal = rejectFromModal;

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