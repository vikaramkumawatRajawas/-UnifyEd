/**
 * UnifyEd Faculty Portal - Lecture Polls Interactivity & Real-Time Engine
 */

// Initial Active Poll Data
let currentPoll = {
    id: 4,
    subject: "dbms",
    question: "Q4: Which Normal Form (NF) specifically eliminates Transitive Functional Dependency?",
    options: [
        { text: "1NF (First Normal Form)", votes: 5, isCorrect: false },
        { text: "2NF (Second Normal Form)", votes: 9, isCorrect: false },
        { text: "3NF (Third Normal Form)", votes: 46, isCorrect: true },
        { text: "BCNF (Boyce-Codd Normal Form)", votes: 4, isCorrect: false }
    ],
    totalEnrolled: 64,
    timerSeconds: 45,
    maxTimerSeconds: 45
};

let pollTimerInterval = null;
let liveTickerInterval = null;

// Poll History Archive Bank Data
let pollHistoryBank = [
    { id: 1, subject: "dbms", title: "Q1: What does ACID property stand for in Databases?", date: "Today, 10:15 AM", responses: "62/64", accuracy: "91%", status: "Completed" },
    { id: 2, subject: "dbms", title: "Q2: Which SQL command is used to remove a table and its data completely?", date: "Today, 10:28 AM", responses: "64/64", accuracy: "84%", status: "Completed" },
    { id: 3, subject: "dbms", title: "Q3: Candidate key is a minimal super key — True or False?", date: "Today, 10:38 AM", responses: "60/64", accuracy: "95%", status: "Completed" },
    { id: 10, subject: "webtech", title: "Q1: Which CSS property creates a Flexbox layout container?", date: "Yesterday", responses: "58/60", accuracy: "98%", status: "Completed" },
    { id: 11, subject: "webtech", title: "Q2: What is the main purpose of useEffect hook in ReactJS?", date: "Yesterday", responses: "55/60", accuracy: "76%", status: "Completed" },
    { id: 20, subject: "ds", title: "Q1: What is the worst-case time complexity of QuickSort?", date: "2 days ago", responses: "50/52", accuracy: "68%", status: "Completed" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderActivePoll();
    renderPollHistory();
    startPollTimer();
    startLiveTicker();
    setupEventListeners();
});

function setupEventListeners() {
    // Subject Dropdown Switcher
    const classSelect = document.getElementById('pollClassSelect');
    if (classSelect) {
        classSelect.addEventListener('change', (e) => {
            const selectedVal = e.target.value;
            const selectedText = e.target.options[e.target.selectedIndex].text;

            const titleEl = document.getElementById('activePollSubjectTitle');
            if (titleEl) {
                const subjectName = selectedText.split('(')[0].trim();
                const batchName = selectedText.includes('(') ? selectedText.substring(selectedText.indexOf('(') + 1, selectedText.indexOf(')')) : 'Active Batch';
                titleEl.innerText = `${subjectName} Lecture — ${batchName}`;
            }

            // Switch poll topic based on subject
            if (selectedVal === 'webtech') {
                currentPoll.question = "Q1: Which HTTP method is idempotent and used to replace resources?";
                currentPoll.options = [
                    { text: "GET", votes: 4, isCorrect: false },
                    { text: "POST", votes: 11, isCorrect: false },
                    { text: "PUT", votes: 42, isCorrect: true },
                    { text: "DELETE", votes: 3, isCorrect: false }
                ];
            } else if (selectedVal === 'ds') {
                currentPoll.question = "Q1: Which data structure uses LIFO (Last In First Out) ordering?";
                currentPoll.options = [
                    { text: "Queue", votes: 6, isCorrect: false },
                    { text: "Stack", votes: 48, isCorrect: true },
                    { text: "Binary Tree", votes: 3, isCorrect: false },
                    { text: "Linked List", votes: 2, isCorrect: false }
                ];
            } else if (selectedVal === 'nn') {
                currentPoll.question = "Q1: Which activation function solves the vanishing gradient problem?";
                currentPoll.options = [
                    { text: "Sigmoid", votes: 2, isCorrect: false },
                    { text: "Tanh", votes: 4, isCorrect: false },
                    { text: "ReLU (Rectified Linear Unit)", votes: 26, isCorrect: true },
                    { text: "Softmax", votes: 3, isCorrect: false }
                ];
            } else {
                currentPoll.question = "Q4: Which Normal Form (NF) specifically eliminates Transitive Functional Dependency?";
                currentPoll.options = [
                    { text: "1NF (First Normal Form)", votes: 5, isCorrect: false },
                    { text: "2NF (Second Normal Form)", votes: 9, isCorrect: false },
                    { text: "3NF (Third Normal Form)", votes: 46, isCorrect: true },
                    { text: "BCNF (Boyce-Codd Normal Form)", votes: 4, isCorrect: false }
                ];
            }

            currentPoll.subject = selectedVal;
            currentPoll.timerSeconds = 45;
            currentPoll.maxTimerSeconds = 45;

            renderActivePoll();
            renderPollHistory(selectedVal);
            startPollTimer();
            showToast(`Switched active poll session to: ${selectedText}`);
        });
    }

    // Poll History Search Filter
    const searchInput = document.getElementById('pollSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderPollHistory(currentPoll.subject, e.target.value.toLowerCase());
        });
    }
}

// Render Active Poll UI & Option Bars
function renderActivePoll() {
    const qTitle = document.getElementById('activeQuestionText');
    if (qTitle) qTitle.innerText = currentPoll.question;

    const totalVotes = currentPoll.options.reduce((sum, opt) => sum + opt.votes, 0);
    const votesLabel = document.getElementById('activeTotalVotes');
    if (votesLabel) votesLabel.innerText = `${totalVotes} / ${currentPoll.totalEnrolled} Students`;

    const container = document.getElementById('activePollOptionsContainer');
    if (!container) return;

    const letters = ['A', 'B', 'C', 'D', 'E'];
    container.innerHTML = currentPoll.options.map((opt, idx) => {
        const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
        const isCorrectClass = opt.isCorrect ? 'correct-answer' : '';
        const correctBadgeHtml = opt.isCorrect ? `<span class="correct-badge"><i class="fa-solid fa-check"></i> Correct</span>` : '';
        const letterBg = opt.isCorrect ? 'style="background:#10b981; color:#fff;"' : '';
        const pctColor = opt.isCorrect ? 'style="color:#10b981;"' : '';

        return `
            <div class="poll-option-item ${isCorrectClass}" onclick="voteForOption(${idx})">
                <div class="poll-option-fill" id="optFill-${idx}" style="width: ${pct}%;"></div>
                <div class="poll-option-content">
                    <div class="poll-option-left">
                        <div class="option-letter-badge" ${letterBg}>${letters[idx] || (idx + 1)}</div>
                        <span class="option-text">${opt.text}</span>
                        ${correctBadgeHtml}
                    </div>
                    <div class="poll-option-right">
                        <span class="vote-count-label" id="optVotes-${idx}">${opt.votes} votes</span>
                        <span class="vote-percent-badge" id="optPct-${idx}" ${pctColor}>${pct}%</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Vote for Option by Faculty / Student
function voteForOption(optIdx) {
    if (currentPoll.options[optIdx]) {
        currentPoll.options[optIdx].votes++;
        renderActivePoll();
        showToast(`Vote recorded for Option ${String.fromCharCode(65 + optIdx)}`);
    }
}

// Simulate Live Student Voting Burst
function simulateLiveVotes(isManual = false) {
    const studentNames = ["Vikram Kumawat", "Priya Sharma", "Aditya Bose", "Neha Sen", "Rahul Verma", "Ananya Deshmukh"];
    const randomStudent = studentNames[Math.floor(Math.random() * studentNames.length)];

    // Favor correct answer or random choice
    const randOpt = Math.random() > 0.3 ? currentPoll.options.findIndex(o => o.isCorrect) : Math.floor(Math.random() * currentPoll.options.length);
    if (randOpt >= 0 && currentPoll.options[randOpt]) {
        currentPoll.options[randOpt].votes++;
        renderActivePoll();

        // Add item to Live Ticker silently
        addLiveTickerItem(randomStudent, String.fromCharCode(65 + randOpt), currentPoll.options[randOpt].isCorrect);

        // ONLY show toast if manually triggered by clicking button
        if (isManual === true) {
            showToast(`⚡ Live Vote: ${randomStudent} voted Option ${String.fromCharCode(65 + randOpt)}`);
        }
    }
}

function addLiveTickerItem(studentName, optLetter, isCorrect) {
    const ticker = document.getElementById('liveVoteTicker');
    if (!ticker) return;

    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'space-between';
    item.style.padding = '8px 12px';
    item.style.background = 'var(--bg-tertiary)';
    item.style.borderRadius = '8px';
    item.style.fontSize = '12px';
    item.style.border = '1px solid var(--border-color)';

    item.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-circle-check" style="color:${isCorrect ? '#10b981' : 'var(--primary)'};"></i>
            <strong style="color:var(--text-primary);">${studentName}</strong>
        </div>
        <span style="font-weight:700; color:var(--primary); font-family:monospace;">Option ${optLetter}</span>
    `;

    ticker.insertBefore(item, ticker.firstChild);
    if (ticker.children.length > 5) {
        ticker.removeChild(ticker.lastChild);
    }
}

function startLiveTicker() {
    clearInterval(liveTickerInterval);
    liveTickerInterval = setInterval(() => {
        if (Math.random() > 0.4) {
            simulateLiveVotes(false); // Silent background stream
        }
    }, 4500);
}

// Countdown Timer Engine
function startPollTimer() {
    clearInterval(pollTimerInterval);
    currentPoll.timerSeconds = currentPoll.maxTimerSeconds || 45;

    pollTimerInterval = setInterval(() => {
        if (currentPoll.timerSeconds <= 0) {
            clearInterval(pollTimerInterval);
            endActivePoll(true);
        } else {
            currentPoll.timerSeconds--;
            updateTimerDisplay();
        }
    }, 1000);

    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerText = document.getElementById('pollTimerDisplay');
    const timerRing = document.getElementById('timerRing');

    const s = currentPoll.timerSeconds;
    const formatted = `00:${s.toString().padStart(2, '0')}`;
    if (timerText) timerText.innerText = formatted;

    if (timerRing) {
        const circumference = 376; // 2 * PI * 60
        const pctLeft = s / (currentPoll.maxTimerSeconds || 45);
        const offset = circumference * (1 - pctLeft);
        timerRing.style.strokeDashoffset = offset;
    }
}

function extendTimer() {
    currentPoll.timerSeconds += 30;
    currentPoll.maxTimerSeconds += 30;
    updateTimerDisplay();
    showToast("Poll timer extended by +30 seconds!");
}

function endActivePoll(autoClosed = false) {
    clearInterval(pollTimerInterval);
    if (autoClosed) {
        showToast("⏰ Poll Time Expired! Final answers locked.");
    } else {
        showToast("🏁 Poll ended by Professor. Showing final results.");
    }

    const timerText = document.getElementById('pollTimerDisplay');
    if (timerText) timerText.innerText = "ENDED";
}

// 1-Click Quick Presets Launcher
function launchPresetPoll(type) {
    if (type === 'understanding') {
        currentPoll.question = "Quick Check: How well did you understand today's topic on Database Normalization?";
        currentPoll.options = [
            { text: "5 - Crystal Clear / Understood Fully", votes: 32, isCorrect: true },
            { text: "4 - Mostly Clear (Few Minor Doubts)", votes: 18, isCorrect: false },
            { text: "3 - Somewhat Clear (Need Revision)", votes: 8, isCorrect: false },
            { text: "1-2 - Needs Explanation Again", votes: 2, isCorrect: false }
        ];
    } else if (type === 'pace') {
        currentPoll.question = "Pace Check: Is the current lecture delivery speed suitable for taking notes?";
        currentPoll.options = [
            { text: "Just Right (Perfect Pace)", votes: 44, isCorrect: true },
            { text: "Too Fast (Please Slow Down)", votes: 12, isCorrect: false },
            { text: "Too Slow (Speed Up)", votes: 4, isCorrect: false }
        ];
    } else if (type === 'truefalse') {
        currentPoll.question = "Concept Check: BCNF is strictly stronger than 3NF. True or False?";
        currentPoll.options = [
            { text: "True (Every BCNF relation is in 3NF)", votes: 52, isCorrect: true },
            { text: "False", votes: 8, isCorrect: false }
        ];
    }

    currentPoll.timerSeconds = 45;
    currentPoll.maxTimerSeconds = 45;
    renderActivePoll();
    startPollTimer();
    showToast("Launched 1-Click Quick Classroom Poll!");
}

// Render Poll History Bank List
function renderPollHistory(subject = 'all', searchQuery = '') {
    const container = document.getElementById('pollHistoryList');
    if (!container) return;

    let filtered = pollHistoryBank.filter(item => {
        const matchSub = subject === 'all' || item.subject === subject || subject === undefined;
        const matchSearch = item.title.toLowerCase().includes(searchQuery);
        return matchSub && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:30px; color:var(--text-tertiary);">
                <i class="fa-solid fa-folder-open" style="font-size:28px; margin-bottom:8px; opacity:0.5; display:block;"></i>
                No historical polls found for the selected criteria.
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="poll-history-card">
            <div class="poll-history-header">
                <span style="font-size:11px; font-weight:700; color:var(--primary); text-transform:uppercase; letter-spacing:0.5px;">${item.subject.toUpperCase()} • ${item.status}</span>
                <span style="font-size:11px; color:var(--text-tertiary);"><i class="fa-solid fa-calendar-day"></i> ${item.date}</span>
            </div>
            <div class="poll-history-title">${item.title}</div>
            <div class="poll-history-meta">
                <span><i class="fa-solid fa-user-check" style="color:#10b981;"></i> Responses: <strong>${item.responses}</strong></span>
                <span><i class="fa-solid fa-bullseye" style="color:#ec4899;"></i> Accuracy: <strong>${item.accuracy}</strong></span>
                <button onclick="reusePoll('${item.title}')" class="btn btn-secondary btn-sm" style="padding:2px 8px; font-size:10px; margin-left:auto;">
                    <i class="fa-solid fa-rotate"></i> Reuse Question
                </button>
            </div>
        </div>
    `).join('');
}

function reusePoll(title) {
    currentPoll.question = title;
    currentPoll.timerSeconds = 45;
    currentPoll.maxTimerSeconds = 45;
    currentPoll.options.forEach(o => o.votes = Math.floor(Math.random() * 5));
    renderActivePoll();
    startPollTimer();
    showToast(`Re-launched question: "${title.substring(0, 30)}..."`);
}

function addPollOptionInput() {
    const list = document.getElementById('optionsInputsList');
    if (!list) return;
    const count = list.children.length;
    const letter = String.fromCharCode(65 + count);

    const row = document.createElement('div');
    row.className = 'poll-opt-row';
    row.innerHTML = `
        <div class="option-letter-badge">${letter}</div>
        <input type="text" class="form-input poll-opt-input" placeholder="Option ${letter}">
        <button type="button" onclick="removeOptionRow(this)" class="btn-remove-opt" title="Remove Option"><i class="fa-solid fa-trash"></i></button>
    `;
    list.appendChild(row);
    reindexOptionBadges();
}

function removeOptionRow(btn) {
    const list = document.getElementById('optionsInputsList');
    if (!list) return;
    if (list.children.length <= 2) {
        showToast("At least 2 options are required for a poll!");
        return;
    }
    const row = btn.closest('.poll-opt-row');
    if (row) {
        row.remove();
        reindexOptionBadges();
    }
}

function reindexOptionBadges() {
    const list = document.getElementById('optionsInputsList');
    if (!list) return;
    Array.from(list.children).forEach((row, idx) => {
        const badge = row.querySelector('.option-letter-badge');
        const inp = row.querySelector('.poll-opt-input');
        const letter = String.fromCharCode(65 + idx);
        if (badge) badge.innerText = letter;
        if (inp) inp.placeholder = `Option ${letter}`;
    });
}

// Modal Controllers
function openCreatePollModal() {
    const modal = document.getElementById('createPollModal');
    if (modal) modal.classList.add('active');
}

function closeCreatePollModal() {
    const modal = document.getElementById('createPollModal');
    if (modal) modal.classList.remove('active');
}

function submitNewPoll() {
    const qInput = document.getElementById('newPollQuestion');
    const qText = qInput ? qInput.value.trim() : '';

    if (!qText) {
        showToast("Please enter a valid poll question!");
        return;
    }

    const optInputs = document.querySelectorAll('.poll-opt-input');
    const newOptions = [];
    optInputs.forEach((inp, idx) => {
        if (inp.value.trim()) {
            newOptions.push({
                text: inp.value.trim(),
                votes: 0,
                isCorrect: idx === 0 // Default first option as correct or toggleable
            });
        }
    });

    if (newOptions.length < 2) {
        showToast("Please enter at least 2 option texts!");
        return;
    }

    const timerSelect = document.getElementById('newPollTimer');
    const timerSecs = timerSelect ? parseInt(timerSelect.value) : 45;

    currentPoll.question = qText;
    currentPoll.options = newOptions;
    currentPoll.timerSeconds = timerSecs;
    currentPoll.maxTimerSeconds = timerSecs;

    closeCreatePollModal();
    renderActivePoll();
    startPollTimer();
    showToast(`🎉 New Lecture Poll Launched: "${qText.substring(0, 35)}..."`);
}

// Attach functions globally to window for 100% reliable HTML onclick handlers
window.openCreatePollModal = openCreatePollModal;
window.closeCreatePollModal = closeCreatePollModal;
window.submitNewPoll = submitNewPoll;
window.addPollOptionInput = addPollOptionInput;
window.removeOptionRow = removeOptionRow;
window.simulateLiveVotes = simulateLiveVotes;
window.endActivePoll = endActivePoll;
window.extendTimer = extendTimer;
window.launchPresetPoll = launchPresetPoll;
window.reusePoll = reusePoll;

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