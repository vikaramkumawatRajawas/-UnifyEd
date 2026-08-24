/**
 * UnifyEd Faculty Portal - Mentor Meetings Interactivity Engine
 */

// Initial Mentorship Sessions Dataset
let mentorMeetingsBank = [
    {
        id: 1,
        menteeName: "Vikram Kumawat",
        rollNo: "23UBCA015",
        group: "bca",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        topicCategory: "academic",
        topicLabel: "Academic Progress & CGPA Review",
        dateTime: "Tomorrow, 02:30 PM",
        venueMode: "Office 304 (In-Person)",
        cgpa: "8.92",
        attendance: "92%",
        status: "scheduled", // scheduled, completed, urgent
        statusLabel: "Scheduled Today",
        remarks: "Discussed database normalization concepts & career path in Cloud Architecture."
    },
    {
        id: 2,
        menteeName: "Rahul Verma",
        rollNo: "23UBCA042",
        group: "bca",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        topicCategory: "attendance",
        topicLabel: "Attendance Counseling & Warning",
        dateTime: "Aug 20, 11:00 AM",
        venueMode: "Faculty Cabin A-12",
        cgpa: "6.40",
        attendance: "62%",
        status: "urgent",
        statusLabel: "Urgent Intervention",
        remarks: "Issued attendance shortfall warning notice. Student pledged to attend all DBMS & Web Tech labs."
    },
    {
        id: 3,
        menteeName: "Ananya Deshmukh",
        rollNo: "23UBCA010",
        group: "bca",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        topicCategory: "career",
        topicLabel: "Internship & Placement Guidance",
        dateTime: "Yesterday, 04:00 PM",
        venueMode: "Google Meet (Online)",
        cgpa: "9.45",
        attendance: "96%",
        status: "completed",
        statusLabel: "Session Completed",
        remarks: "Reviewed resume & portfolio website for summer research internship application."
    },
    {
        id: 4,
        menteeName: "Siddharth Malhotra",
        rollNo: "22UCSE088",
        group: "cse",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        topicCategory: "project",
        topicLabel: "Capstone Project Mentor Review",
        dateTime: "Aug 22, 03:00 PM",
        venueMode: "Office 304 (In-Person)",
        cgpa: "8.15",
        attendance: "88%",
        status: "scheduled",
        statusLabel: "Scheduled Next",
        remarks: "Review ROS2 autonomous drone simulation prototype deliverables."
    }
];

// Master All College Students Dataset
let allCollegeStudentsBank = [
    { id: 101, name: "Vikram Kumawat", rollNo: "23UBCA015", course: "BCA Sem 3", mentor: "Dr. Rajesh Kumar", isMyMentee: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", cgpa: "8.92", attendance: "92%" },
    { id: 102, name: "Priya Sharma", rollNo: "23UBCA028", course: "BCA Sem 3", mentor: "Dr. Rajesh Kumar", isMyMentee: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", cgpa: "9.10", attendance: "95%" },
    { id: 103, name: "Rahul Verma", rollNo: "23UBCA042", course: "BCA Sem 3", mentor: "Dr. Rajesh Kumar", isMyMentee: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", cgpa: "6.40", attendance: "62%" },
    { id: 104, name: "Ananya Deshmukh", rollNo: "23UBCA010", course: "BCA Sem 3", mentor: "Dr. Rajesh Kumar", isMyMentee: true, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80", cgpa: "9.45", attendance: "96%" },
    { id: 105, name: "Aditya Bose", rollNo: "22UCSE014", course: "CSE Sem 5", mentor: "Prof. Sunita Sharma", isMyMentee: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", cgpa: "8.75", attendance: "89%" },
    { id: 106, name: "Sneha Patel", rollNo: "22UCSE055", course: "CSE Sem 5", mentor: "Dr. Alok Verma", isMyMentee: false, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", cgpa: "7.20", attendance: "78%" },
    { id: 107, name: "Siddharth Malhotra", rollNo: "22UCSE088", course: "CSE Sem 5", mentor: "Dr. Rajesh Kumar", isMyMentee: true, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80", cgpa: "8.15", attendance: "88%" },
    { id: 108, name: "Karan Mehta", rollNo: "22UCSE091", course: "CSE Sem 5", mentor: "Unassigned", isMyMentee: false, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80", cgpa: "7.80", attendance: "81%" },
    { id: 109, name: "Neha Sen", rollNo: "24UMTECH04", course: "M.Tech Sem 1", mentor: "Unassigned", isMyMentee: false, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80", cgpa: "9.20", attendance: "94%" },
    { id: 110, name: "Rohan Kapoor", rollNo: "23UBCA060", course: "BCA Sem 3", mentor: "Unassigned", isMyMentee: false, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80", cgpa: "8.30", attendance: "85%" }
];

let activeGroupFilter = "all";
let activeTopicFilter = "all";
let searchQuery = "";
let currentViewMode = "my-mentees"; // 'my-mentees' or 'all-students'

document.addEventListener('DOMContentLoaded', () => {
    updateTabCounts();
    renderMentorMeetings();
    setupEventListeners();
});

function switchMentorView(mode) {
    currentViewMode = mode;
    const btnMy = document.getElementById('tabMyMenteesBtn');
    const btnAll = document.getElementById('tabAllStudentsBtn');

    if (mode === 'my-mentees') {
        if (btnMy) btnMy.classList.add('active');
        if (btnAll) btnAll.classList.remove('active');
    } else {
        if (btnAll) btnAll.classList.add('active');
        if (btnMy) btnMy.classList.remove('active');
    }

    renderMentorMeetings();
}

function updateTabCounts() {
    const myCount = allCollegeStudentsBank.filter(s => s.isMyMentee).length;
    const allCount = allCollegeStudentsBank.length;

    const myLabel = document.getElementById('myMenteesCountLabel');
    const allLabel = document.getElementById('allStudentsCountLabel');

    if (myLabel) myLabel.innerText = myCount;
    if (allLabel) allLabel.innerText = allCount;
}

function setupEventListeners() {
    // Mentee Group Select Dropdown
    const groupSelect = document.getElementById('mentorGroupSelect');
    if (groupSelect) {
        groupSelect.addEventListener('change', (e) => {
            activeGroupFilter = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;
            const titleEl = document.getElementById('activeMentorGroupTitle');
            if (titleEl) {
                titleEl.innerText = selectedText.includes('(') ? selectedText : `${selectedText} Mentorship Sessions`;
            }
            renderMentorMeetings();
        });
    }

    // Search Input Filter
    const searchInput = document.getElementById('mentorSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderMentorMeetings();
        });
    }

    // Topic Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeTopicFilter = chip.getAttribute('data-topic');
            renderMentorMeetings();
        });
    });
}

// Render Mentorship Session Cards Grid
function renderMentorMeetings() {
    const container = document.getElementById('mentorCardsContainer');
    if (!container) return;

    if (currentViewMode === 'all-students') {
        renderAllStudentsView(container);
        return;
    }

    let filtered = mentorMeetingsBank.filter(m => {
        const matchGroup = activeGroupFilter === 'all' || m.group === activeGroupFilter;
        const matchTopic = activeTopicFilter === 'all' || m.topicCategory === activeTopicFilter;
        const matchSearch = searchQuery === '' || 
                            m.menteeName.toLowerCase().includes(searchQuery) ||
                            m.rollNo.toLowerCase().includes(searchQuery) ||
                            m.topicLabel.toLowerCase().includes(searchQuery);
        return matchGroup && matchTopic && matchSearch;
    });

    updateKpis(filtered);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; background:var(--glass-bg); border-radius:var(--border-radius-md); border:1px solid var(--border-glass);">
                <i class="fa-solid fa-folder-open" style="font-size:36px; color:var(--text-tertiary); margin-bottom:12px;"></i>
                <h4 style="color:var(--text-primary); margin-bottom:6px;">No assigned mentee sessions found</h4>
                <p style="font-size:12px; color:var(--text-secondary);">Switch to the <strong>"All College Students Directory"</strong> tab to assign new students under your mentorship.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(m => {
        let statusBadgeClass = "scheduled";
        if (m.status === 'completed') statusBadgeClass = "completed";
        if (m.status === 'urgent') statusBadgeClass = "urgent";

        return `
            <div class="mentor-item-card">
                <div>
                    <div class="mentor-card-header">
                        <span class="mentor-topic-badge">${m.topicCategory.toUpperCase()}</span>
                        <span class="mentor-status-badge ${statusBadgeClass}">${m.statusLabel}</span>
                    </div>

                    <div class="mentee-profile-box">
                        <img src="${m.avatar}" class="mentee-avatar-img" alt="${m.menteeName}">
                        <div class="mentee-info-details">
                            <span class="mentee-name">${m.menteeName}</span>
                            <span class="mentee-roll">${m.rollNo} • Group ${m.group.toUpperCase()}</span>
                        </div>
                    </div>

                    <div style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:10px;">
                        <i class="fa-solid fa-comments" style="color:var(--primary); margin-right:6px;"></i> ${m.topicLabel}
                    </div>

                    <div class="meeting-schedule-box">
                        <span><i class="fa-regular fa-calendar-days" style="color:var(--primary);"></i> ${m.dateTime}</span>
                        <span style="font-weight:600;"><i class="fa-solid fa-location-dot" style="color:#10b981;"></i> ${m.venueMode}</span>
                    </div>

                    <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); margin-bottom:12px;">
                        <span>Academic CGPA: <strong style="color:var(--text-primary);">${m.cgpa}</strong></span>
                        <span>Attendance: <strong style="color:${parseFloat(m.attendance) < 75 ? '#ef4444' : '#10b981'};">${m.attendance}</strong></span>
                    </div>
                </div>

                <div>
                    <div class="mentor-card-footer">
                        <button onclick="openRemarksModal(${m.id})" class="btn btn-secondary btn-sm" title="View / Edit Session Remarks">
                            <i class="fa-solid fa-note-sticky"></i> Remarks
                        </button>
                        <button onclick="rescheduleSession(${m.id})" class="btn btn-primary btn-sm" title="Join or Reschedule Session">
                            <i class="fa-solid fa-video"></i> Session Link
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderAllStudentsView(container) {
    let list = allCollegeStudentsBank.filter(s => {
        const matchSearch = searchQuery === '' || 
                            s.name.toLowerCase().includes(searchQuery) ||
                            s.rollNo.toLowerCase().includes(searchQuery) ||
                            s.course.toLowerCase().includes(searchQuery) ||
                            s.mentor.toLowerCase().includes(searchQuery);
        return matchSearch;
    });

    if (list.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">
                No college students match your search criteria.
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(s => {
        const isMine = s.isMyMentee;
        const mentorLabel = isMine ? `<span style="color:#10b981; font-weight:700;"><i class="fa-solid fa-user-check"></i> Assigned to You</span>` : `<span style="color:var(--text-secondary);"><i class="fa-solid fa-user-tie"></i> Mentor: <strong>${s.mentor}</strong></span>`;
        const actionBtn = isMine ? `
            <button class="btn btn-secondary btn-sm" disabled style="opacity:0.75; width:100%; justify-content:center;">
                <i class="fa-solid fa-check"></i> My Active Mentee
            </button>
        ` : `
            <button onclick="assignStudentToMyMentorship(${s.id})" class="btn btn-primary btn-sm" style="width:100%; justify-content:center;">
                <i class="fa-solid fa-user-plus"></i> Assign to My Mentorship
            </button>
        `;

        return `
            <div class="mentor-item-card">
                <div>
                    <div class="mentor-card-header">
                        <span class="mentor-topic-badge">${s.course}</span>
                        <span class="mentor-status-badge ${isMine ? 'completed' : 'scheduled'}">${isMine ? 'My Mentee' : s.mentor}</span>
                    </div>

                    <div class="mentee-profile-box">
                        <img src="${s.avatar}" class="mentee-avatar-img" alt="${s.name}">
                        <div class="mentee-info-details">
                            <span class="mentee-name">${s.name}</span>
                            <span class="mentee-roll">${s.rollNo} • ${s.course}</span>
                        </div>
                    </div>

                    <div class="meeting-schedule-box">
                        ${mentorLabel}
                        <span><i class="fa-solid fa-chart-line" style="color:var(--primary);"></i> CGPA: <strong>${s.cgpa}</strong></span>
                    </div>
                </div>

                <div class="mentor-card-footer" style="margin-top:10px;">
                    ${actionBtn}
                </div>
            </div>
        `;
    }).join('');
}

function assignStudentToMyMentorship(studentId) {
    const student = allCollegeStudentsBank.find(s => s.id === studentId);
    if (!student) return;

    student.isMyMentee = true;
    student.mentor = "Dr. Rajesh Kumar";

    // Add to mentorMeetingsBank if not present
    const existing = mentorMeetingsBank.find(m => m.menteeName.toLowerCase() === student.name.toLowerCase());
    if (!existing) {
        mentorMeetingsBank.unshift({
            id: Date.now(),
            menteeName: student.name,
            rollNo: student.rollNo,
            group: student.course.toLowerCase().includes('bca') ? 'bca' : 'cse',
            avatar: student.avatar,
            topicCategory: "academic",
            topicLabel: "Academic Performance & Mentorship",
            dateTime: "Schedule Pending",
            venueMode: "Office 304",
            cgpa: student.cgpa,
            attendance: student.attendance,
            status: "scheduled",
            statusLabel: "Newly Assigned",
            remarks: "Student assigned under mentorship of Dr. Rajesh Kumar."
        });
    }

    updateTabCounts();
    renderMentorMeetings();
    showToast(`🎉 Student ${student.name} (${student.rollNo}) is now assigned under your mentorship!`);
}

function updateKpis(list) {
    const kpiTotal = document.getElementById('kpiTotalMentees');
    const kpiUpcoming = document.getElementById('kpiUpcomingMeetings');
    const kpiCompleted = document.getElementById('kpiCompletedSessions');
    const kpiUrgent = document.getElementById('kpiUrgentAlerts');

    if (kpiTotal) kpiTotal.innerText = list.length;
    if (kpiUpcoming) kpiUpcoming.innerText = list.filter(m => m.status === 'scheduled').length;
    if (kpiCompleted) kpiCompleted.innerText = list.filter(m => m.status === 'completed').length;
    if (kpiUrgent) kpiUrgent.innerText = list.filter(m => m.status === 'urgent').length;
}

// Reschedule / Session Link Action
function rescheduleSession(id) {
    const m = mentorMeetingsBank.find(item => item.id === id);
    if (m) {
        showToast(`🔗 Session Launched for ${m.menteeName}: ${m.venueMode}`);
    }
}

// Remarks & Counseling Log Modal Handler
let currentRemarksId = null;

function openRemarksModal(id) {
    const m = mentorMeetingsBank.find(item => item.id === id);
    if (!m) return;

    currentRemarksId = id;
    const nameEl = document.getElementById('remarksMenteeName');
    const topicEl = document.getElementById('remarksTopicLabel');
    const textEl = document.getElementById('remarksSummaryText');
    const statusSelect = document.getElementById('remarksStatusSelect');

    if (nameEl) nameEl.innerText = `${m.menteeName} (${m.rollNo})`;
    if (topicEl) topicEl.innerText = `${m.topicLabel} • ${m.dateTime}`;
    if (textEl) textEl.value = m.remarks || '';
    if (statusSelect) statusSelect.value = m.status;

    const modal = document.getElementById('meetingRemarksModal');
    if (modal) modal.classList.add('active');
}

function closeRemarksModal() {
    const modal = document.getElementById('meetingRemarksModal');
    if (modal) modal.classList.remove('active');
}

function saveMeetingRemarks() {
    if (!currentRemarksId) return;

    const m = mentorMeetingsBank.find(item => item.id === currentRemarksId);
    if (m) {
        const textEl = document.getElementById('remarksSummaryText');
        const statusSelect = document.getElementById('remarksStatusSelect');

        m.remarks = textEl ? textEl.value.trim() : m.remarks;
        if (statusSelect) {
            m.status = statusSelect.value;
            if (m.status === 'completed') m.statusLabel = "Session Completed";
            if (m.status === 'urgent') m.statusLabel = "Urgent Follow-up";
            if (m.status === 'scheduled') m.statusLabel = "Scheduled";
        }

        closeRemarksModal();
        renderMentorMeetings();
        showToast(`🎉 Mentorship counseling log saved for ${m.menteeName}`);
    }
}

// Schedule New Meeting Modal Handler
function openScheduleMeetingModal() {
    const modal = document.getElementById('scheduleMeetingModal');
    if (modal) modal.classList.add('active');
}

function closeScheduleMeetingModal() {
    const modal = document.getElementById('scheduleMeetingModal');
    if (modal) modal.classList.remove('active');
}

function submitNewMeeting() {
    const menteeSelect = document.getElementById('newMeetingMenteeSelect');
    const topicSelect = document.getElementById('newMeetingTopicSelect');
    const modeSelect = document.getElementById('newMeetingMode');
    const notesInput = document.getElementById('newMeetingNotes');

    const menteeFull = menteeSelect ? menteeSelect.value : "Student";
    const topicCat = topicSelect ? topicSelect.value : "academic";
    const venue = modeSelect ? modeSelect.value : "Office 304";
    const notes = notesInput ? notesInput.value.trim() : "Mentorship guidance session.";

    const nameParts = menteeFull.split('(');
    const menteeName = nameParts[0].trim();
    const rollNo = nameParts[1] ? nameParts[1].replace(')', '').trim() : "23UBCA001";

    let topicLabelText = "Academic Review";
    if (topicCat === 'career') topicLabelText = "Career & Placement Guidance";
    if (topicCat === 'attendance') topicLabelText = "Attendance Counseling";
    if (topicCat === 'project') topicLabelText = "Project Mentor Review";

    const newObj = {
        id: Date.now(),
        menteeName: menteeName,
        rollNo: rollNo,
        group: "bca",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        topicCategory: topicCat,
        topicLabel: topicLabelText,
        dateTime: "Tomorrow, 11:30 AM",
        venueMode: venue,
        cgpa: "8.50",
        attendance: "88%",
        status: "scheduled",
        statusLabel: "Scheduled Today",
        remarks: notes
    };

    mentorMeetingsBank.unshift(newObj);
    closeScheduleMeetingModal();
    renderMentorMeetings();
    showToast(`🎉 Mentorship Session Scheduled for ${menteeName}`);
}

// Window scope exports for reliable HTML inline handlers
window.switchMentorView = switchMentorView;
window.assignStudentToMyMentorship = assignStudentToMyMentorship;
window.openRemarksModal = openRemarksModal;
window.closeRemarksModal = closeRemarksModal;
window.saveMeetingRemarks = saveMeetingRemarks;
window.openScheduleMeetingModal = openScheduleMeetingModal;
window.closeScheduleMeetingModal = closeScheduleMeetingModal;
window.submitNewMeeting = submitNewMeeting;
window.rescheduleSession = rescheduleSession;

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