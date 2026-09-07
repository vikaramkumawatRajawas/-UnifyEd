/**
 * UnifyEd Faculty Portal - Student Projects Management Interactive Engine
 */

// Initial Projects Dataset
let projectsBank = [
    {
        id: 1,
        title: "UnifyEd Biometric Attendance System using AI & GPS Geo-fencing",
        category: "webtech",
        techStack: ["ReactJS", "Node.js", "Python OpenCV", "PostgreSQL"],
        leader: "Vikram Kumawat",
        members: [
            { name: "Vikram Kumawat", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
            { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
            { name: "Aditya Bose", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
        ],
        progress: 85,
        status: "review", // review, in-progress, completed, approved
        statusLabel: "Code Review Pending",
        description: "Automated student check-in portal with real-time QR passcode verification and facial recognition tracking.",
        githubUrl: "https://github.com/unifyed/biometric-attendance",
        grade: null
    },
    {
        id: 2,
        title: "Distributed DBMS Query Optimizer & B-Tree Index Visualizer",
        category: "dbms",
        techStack: ["C++", "SQL", "WebAssembly", "Chart.js"],
        leader: "Ananya Deshmukh",
        members: [
            { name: "Ananya Deshmukh", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
            { name: "Rahul Verma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" }
        ],
        progress: 100,
        status: "approved",
        statusLabel: "Grade Released (A+)",
        description: "Visual simulation of relational algebra query execution trees and B+ Tree node splitting in DBMS storage.",
        githubUrl: "https://github.com/unifyed/dbms-btree-visualizer",
        grade: "94/100"
    },
    {
        id: 3,
        title: "Autonomous Drone Swarm Navigation using Deep Reinforcement Learning",
        category: "ai",
        techStack: ["Python", "PyTorch", "ROS2", "Gazebo"],
        leader: "Siddharth Malhotra",
        members: [
            { name: "Siddharth Malhotra", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
            { name: "Neha Sen", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
            { name: "Karan Mehta", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" }
        ],
        progress: 60,
        status: "in-progress",
        statusLabel: "Mid-Term Prototype",
        description: "Multi-agent pathfinding and obstacle avoidance algorithm for drone fleets in urban search and rescue missions.",
        githubUrl: "https://github.com/unifyed/drone-swarm-ai",
        grade: null
    },
    {
        id: 4,
        title: "Campus Food Delivery & Digital Canteen Token System",
        category: "capstone",
        techStack: ["Flutter", "Firebase", "Node.js", "Razorpay"],
        leader: "Rohan Kapoor",
        members: [
            { name: "Rohan Kapoor", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" },
            { name: "Sneha Patel", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }
        ],
        progress: 100,
        status: "completed",
        statusLabel: "Final Viva Completed",
        description: "Cross-platform mobile app for students to pre-order meals with real-time kitchen order status tracking.",
        githubUrl: "https://github.com/unifyed/campus-eats-flutter",
        grade: "88/100"
    }
];

let activeCategory = "all";
let activeTechFilter = "all";
let searchQuery = "";

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderRecentActivity();
    setupEventListeners();
});

function setupEventListeners() {
    // Subject / Category Dropdown Switcher
    const catSelect = document.getElementById('projectCategorySelect');
    if (catSelect) {
        catSelect.addEventListener('change', (e) => {
            activeCategory = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;
            const titleEl = document.getElementById('activeProjectBatchTitle');
            if (titleEl) {
                titleEl.innerText = selectedText.includes('(') ? selectedText : `${selectedText} Projects`;
            }
            renderProjects();
        });
    }

    // Search Input Filter
    const searchInput = document.getElementById('projectSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderProjects();
        });
    }

    // Tech Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeTechFilter = chip.getAttribute('data-tech');
            renderProjects();
        });
    });
}

// Render Projects Cards Container
function renderProjects() {
    const container = document.getElementById('projectsCardsContainer');
    if (!container) return;

    let filtered = projectsBank.filter(p => {
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        const matchTech = activeTechFilter === 'all' || p.techStack.some(t => t.toLowerCase().includes(activeTechFilter));
        const matchSearch = searchQuery === '' || 
                            p.title.toLowerCase().includes(searchQuery) ||
                            p.leader.toLowerCase().includes(searchQuery) ||
                            p.techStack.some(t => t.toLowerCase().includes(searchQuery));
        return matchCat && matchTech && matchSearch;
    });

    // Update KPI numbers dynamically
    updateKpis(filtered);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; background:var(--glass-bg); border-radius:var(--border-radius-md); border:1px solid var(--border-glass);">
                <i class="fa-solid fa-folder-open" style="font-size:36px; color:var(--text-tertiary); margin-bottom:12px;"></i>
                <h4 style="color:var(--text-primary); margin-bottom:6px;">No projects found</h4>
                <p style="font-size:12px; color:var(--text-secondary);">Try clearing your search query or selecting a different tech stack filter.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(p => {
        let statusBadgeClass = "in-progress";
        if (p.status === 'review') statusBadgeClass = "review";
        if (p.status === 'completed') statusBadgeClass = "completed";
        if (p.status === 'approved') statusBadgeClass = "approved";

        const avatarsHtml = p.members.map(m => `
            <img src="${m.avatar}" class="team-avatar-img" title="${m.name}" alt="${m.name}">
        `).join('');

        const techTagsHtml = p.techStack.map(t => `
            <span class="tech-tag">${t}</span>
        `).join('');

        const gradeBadgeHtml = p.grade ? `<span class="project-grade-pill"><i class="fa-solid fa-star"></i> ${p.grade}</span>` : '';

        return `
            <div class="project-item-card">
                <div>
                    <div class="project-card-header">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span class="project-category-badge">${p.category.toUpperCase()}</span>
                            ${gradeBadgeHtml}
                        </div>
                        <span class="project-status-badge ${statusBadgeClass}">${p.statusLabel}</span>
                    </div>

                    <h3 class="project-title">${p.title}</h3>
                    <p class="project-description">${p.description}</p>

                    <div class="tech-stack-wrapper">
                        ${techTagsHtml}
                    </div>

                    <div class="project-progress-wrapper">
                        <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary);">
                            <span>Milestone Progress</span>
                            <strong>${p.progress}%</strong>
                        </div>
                        <div class="project-progress-bar">
                            <div class="project-progress-fill" style="width: ${p.progress}%;"></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="team-members-row">
                        <div class="team-avatars-group">
                            ${avatarsHtml}
                        </div>
                        <span class="team-leader-badge"><i class="fa-solid fa-crown" style="color:#f59e0b; margin-right:4px;"></i> ${p.leader}</span>
                    </div>

                    <div class="project-card-footer">
                        <a href="${p.githubUrl}" target="_blank" class="btn btn-secondary btn-sm" style="font-size:11px; padding:6px 12px; gap:6px; border-radius:8px;" title="View Source Code">
                            <i class="fa-brands fa-github"></i> Code Repo
                        </a>
                        <button onclick="openEvaluateModal(${p.id})" class="btn btn-primary btn-sm" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); font-size:11px; padding:6px 14px; gap:6px; border-radius:8px; border:none; box-shadow:0 4px 12px rgba(99, 102, 241, 0.25);">
                            <i class="fa-solid fa-pen-to-square"></i> Evaluate
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateKpis(projectsList) {
    const kpiTotal = document.getElementById('kpiTotalProjects');
    const kpiPending = document.getElementById('kpiPendingReviews');
    const kpiApproved = document.getElementById('kpiApprovedProjects');

    if (kpiTotal) kpiTotal.innerText = projectsList.length;
    if (kpiPending) kpiPending.innerText = projectsList.filter(p => p.status === 'review' || p.status === 'in-progress').length;
    if (kpiApproved) kpiApproved.innerText = projectsList.filter(p => p.status === 'approved' || p.status === 'completed').length;
}

// Render Recent Code Pushes Activity Stream
function renderRecentActivity() {
    const container = document.getElementById('recentCodePushesList');
    if (!container) return;

    const activity = [
        { student: "Vikram K.", project: "Biometric Attendance", time: "10 mins ago", commit: "Added facial recognition API endpoint" },
        { student: "Ananya D.", project: "DBMS Visualizer", time: "1 hour ago", commit: "Merged B+ Tree node splitting logic" },
        { student: "Siddharth M.", project: "Drone Swarm AI", time: "3 hours ago", commit: "Updated Gazebo simulation environment" }
    ];

    container.innerHTML = activity.map(a => `
        <div style="padding:10px 12px; background:var(--bg-tertiary); border-radius:8px; border:1px solid var(--border-color); font-size:12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <strong style="color:var(--text-primary);">${a.student}</strong>
                <span style="font-size:10px; color:var(--text-tertiary);">${a.time}</span>
            </div>
            <p style="margin:0; font-size:11px; color:var(--text-secondary); line-height:1.3;">"${a.commit}"</p>
        </div>
    `).join('');
}

// Evaluate & Grade Modal Handler
let currentEvaluatingId = null;

function openEvaluateModal(projId) {
    const p = projectsBank.find(item => item.id === projId);
    if (!p) return;

    currentEvaluatingId = projId;
    const titleEl = document.getElementById('evalProjectTitle');
    const teamEl = document.getElementById('evalTeamName');

    if (titleEl) titleEl.innerText = p.title;
    if (teamEl) teamEl.innerText = `Team Leader: ${p.leader} • Category: ${p.category.toUpperCase()}`;

    calcTotalScore();

    const modal = document.getElementById('evaluateProjectModal');
    if (modal) modal.classList.add('active');
}

function closeEvaluateModal() {
    const modal = document.getElementById('evaluateProjectModal');
    if (modal) modal.classList.remove('active');
}

function calcTotalScore() {
    const code = parseInt(document.getElementById('evalScoreCode')?.value || 0);
    const innov = parseInt(document.getElementById('evalScoreInnov')?.value || 0);
    const docs = parseInt(document.getElementById('evalScoreDocs')?.value || 0);
    const viva = parseInt(document.getElementById('evalScoreViva')?.value || 0);

    const total = Math.min(100, code + innov + docs + viva);
    const display = document.getElementById('evalTotalScoreDisplay');

    let gradeLetter = "A";
    if (total >= 90) gradeLetter = "A+";
    else if (total >= 80) gradeLetter = "A";
    else if (total >= 70) gradeLetter = "B+";

    if (display) {
        display.innerText = `${total} / 100 (Grade ${gradeLetter})`;
    }
}

function saveEvaluationGrade() {
    if (!currentEvaluatingId) return;

    const p = projectsBank.find(item => item.id === currentEvaluatingId);
    if (p) {
        const code = parseInt(document.getElementById('evalScoreCode')?.value || 0);
        const innov = parseInt(document.getElementById('evalScoreInnov')?.value || 0);
        const docs = parseInt(document.getElementById('evalScoreDocs')?.value || 0);
        const viva = parseInt(document.getElementById('evalScoreViva')?.value || 0);
        const total = Math.min(100, code + innov + docs + viva);

        p.status = 'approved';
        p.statusLabel = 'Grade Released';
        p.progress = 100;
        p.grade = `${total}/100`;

        closeEvaluateModal();
        renderProjects();
        showToast(`🎉 Grade Released for "${p.title.substring(0, 30)}...": ${total}/100`);
    }
}

// Assign New Project Modal Handler
function openAssignProjectModal() {
    const modal = document.getElementById('assignProjectModal');
    if (modal) modal.classList.add('active');
}

function closeAssignProjectModal() {
    const modal = document.getElementById('assignProjectModal');
    if (modal) modal.classList.remove('active');
}

function submitNewProject() {
    const titleInput = document.getElementById('newProjectTitle');
    const catSelect = document.getElementById('newProjectCategory');
    const techInput = document.getElementById('newProjectTech');
    const leaderInput = document.getElementById('newProjectLeader');
    const descInput = document.getElementById('newProjectDesc');

    const title = titleInput ? titleInput.value.trim() : '';
    const cat = catSelect ? catSelect.value : 'webtech';
    const tech = techInput ? techInput.value.split(',').map(s => s.trim()).filter(Boolean) : ['HTML/CSS'];
    const leader = leaderInput ? leaderInput.value.trim() : 'Unassigned';
    const desc = descInput ? descInput.value.trim() : 'Project specification brief assigned by Professor.';

    if (!title) {
        showToast("Please enter a valid project title!");
        return;
    }

    const newObj = {
        id: Date.now(),
        title: title,
        category: cat,
        techStack: tech.length > 0 ? tech : ["Web Tech"],
        leader: leader,
        members: [
            { name: leader, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
            { name: "Team Member 2", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
        ],
        progress: 10,
        status: "in-progress",
        statusLabel: "Assigned • SRS Stage",
        description: desc,
        githubUrl: "#",
        grade: null
    };

    projectsBank.unshift(newObj);
    closeAssignProjectModal();
    renderProjects();
    showToast(`🎉 New Project Assigned: "${title.substring(0, 30)}..."`);
}

// Window scope exports for reliable HTML inline handlers
window.openEvaluateModal = openEvaluateModal;
window.closeEvaluateModal = closeEvaluateModal;
window.calcTotalScore = calcTotalScore;
window.saveEvaluationGrade = saveEvaluationGrade;
window.openAssignProjectModal = openAssignProjectModal;
window.closeAssignProjectModal = closeAssignProjectModal;
window.submitNewProject = submitNewProject;

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