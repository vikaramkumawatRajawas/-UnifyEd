const fs = require('fs');
const path = require('path');

// 35 Pages Definitions for Professor Portal
const allPageKeys = [
    { id: "dashboard", dir: "professor/dashboard", title: "Faculty Dashboard", icon: "fa-chart-pie", category: "Overview" },
    
    // Academic Management
    { id: "my-classes", dir: "professor/academics/my-classes", title: "My Classes", icon: "fa-chalkboard-user", category: "Academic Management" },
    { id: "timetable", dir: "professor/academics/timetable", title: "Weekly Timetable", icon: "fa-calendar-week", category: "Academic Management" },
    { id: "attendance", dir: "professor/academics/attendance", title: "Class Attendance", icon: "fa-clipboard-user", category: "Academic Management" },
    { id: "marks", dir: "professor/academics/marks", title: "Upload Marks", icon: "fa-file-signature", category: "Academic Management" },
    { id: "results", dir: "professor/academics/results", title: "Class Results", icon: "fa-award", category: "Academic Management" },
    { id: "student-performance", dir: "professor/academics/student-performance", title: "Student Performance", icon: "fa-chart-line", category: "Academic Management" },

    // Classroom
    { id: "stream", dir: "professor/classroom/stream", title: "Classroom Stream", icon: "fa-bullhorn", category: "Classroom" },
    { id: "study-materials", dir: "professor/classroom/study-materials", title: "Study Materials", icon: "fa-book-open-reader", category: "Classroom" },
    { id: "assignments", dir: "professor/classroom/assignments", title: "Assignments", icon: "fa-file-lines", category: "Classroom" },
    { id: "quiz", dir: "professor/classroom/quiz", title: "Quizzes & Tests", icon: "fa-lightbulb", category: "Classroom" },
    { id: "discussion", dir: "professor/classroom/discussion", title: "Class Discussions", icon: "fa-comments", category: "Classroom" },
    { id: "grades", dir: "professor/classroom/grades", title: "Evaluate Grades", icon: "fa-percent", category: "Classroom" },
    { id: "members", dir: "professor/classroom/members", title: "Class Members", icon: "fa-users-line", category: "Classroom" },
    { id: "resources", dir: "professor/classroom/resources", title: "Class Resources", icon: "fa-folder-open", category: "Classroom" },

    // Live Classes
    { id: "schedule", dir: "professor/live-classes/schedule", title: "Schedule Lecture", icon: "fa-calendar-plus", category: "Live Classes" },
    { id: "start-class", dir: "professor/live-classes/start-class", title: "Start Class Room", icon: "fa-circle-play", category: "Live Classes" },
    { id: "recordings", dir: "professor/live-classes/recordings", title: "Lecture Recordings", icon: "fa-video", category: "Live Classes" },
    { id: "live-attendance", dir: "professor/live-classes/live-attendance", title: "Live Attendance Log", icon: "fa-users-viewfinder", category: "Live Classes" },
    { id: "polls", dir: "professor/live-classes/polls", title: "Lecture Polls", icon: "fa-square-poll-vertical", category: "Live Classes" },

    // Student Management
    { id: "students", dir: "professor/student-management/students", title: "Students Registry", icon: "fa-address-book", category: "Student Management" },
    { id: "projects", dir: "professor/student-management/projects", title: "Student Projects", icon: "fa-diagram-project", category: "Student Management" },
    { id: "mentor-meeting", dir: "professor/student-management/mentor-meeting", title: "Mentor Meetings", icon: "fa-handshake", category: "Student Management" },
    { id: "applications", dir: "professor/student-management/applications", title: "Leave Applications", icon: "fa-file-invoice", category: "Student Management" },

    // Reports
    { id: "attendance-report", dir: "professor/reports/attendance-report", title: "Attendance Reports", icon: "fa-chart-pie", category: "Reports" },
    { id: "marks-report", dir: "professor/reports/marks-report", title: "Marks Reports", icon: "fa-chart-simple", category: "Reports" },
    { id: "assignment-report", dir: "professor/reports/assignment-report", title: "Assignment Reports", icon: "fa-file-chart-column", category: "Reports" },
    { id: "analytics", dir: "professor/reports/analytics", title: "Class Analytics", icon: "fa-magnifying-glass-chart", category: "Reports" },

    // Single Categories
    { id: "events", dir: "professor/events", title: "College Events", icon: "fa-masks-theater", category: "Overview" },
    { id: "research", dir: "professor/research", title: "Research & Patents", icon: "fa-flask", category: "Overview" },
    
    // Communication
    { id: "chat", dir: "professor/communication/chat", title: "Messenger Chat", icon: "fa-message", category: "Communication" },
    { id: "messages", dir: "professor/communication/messages", title: "Official Notices", icon: "fa-envelope", category: "Communication" },
    { id: "notifications", dir: "professor/communication/notifications", title: "System Alerts", icon: "fa-bell", category: "Communication" },

    { id: "profile", dir: "professor/profile", title: "Faculty Profile", icon: "fa-id-badge", category: "Overview" },
    { id: "settings", dir: "professor/settings", title: "Portal Settings", icon: "fa-sliders", category: "Overview" }
];

const pagesData = {
    dashboard: {
        htmlContent: `
            <div class="welcome-card glassmorphism" style="padding: 25px 30px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; background-image: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12)); position: relative; overflow: hidden; border: 1px solid var(--border-glass); flex-wrap: wrap; gap: 20px;">
                <div class="welcome-text" style="display:flex; align-items:center; gap:20px;">
                    <div style="width: 56px; height: 56px; background: var(--bg-tertiary); border-radius: 50%; display:flex; align-items:center; justify-content:center; border:2px solid var(--primary);">
                        <i class="fa-solid fa-chalkboard-user" style="font-size:24px; color:var(--primary);"></i>
                    </div>
                    <div>
                        <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">Welcome back, <span id="welcomeProfName">Dr. Rajesh Kumar</span>! 👋</h2>
                        <p style="color: var(--text-secondary); font-size: 13px;">Senior Professor • Department of Computer Science & Engineering</p>
                    </div>
                </div>
                <div class="quick-class-start">
                    <a href="../live-classes/start-class/start-class.html" class="btn btn-primary" style="height: 42px; display:inline-flex; align-items:center; gap:8px;"><i class="fa-solid fa-circle-play"></i> Start Today's Live Class</a>
                </div>
            </div>

            <div class="stats-row" style="margin-bottom: 30px;">
                <div class="stat-card glassmorphism">
                    <div class="stat-icon-wrapper" style="background: rgba(99, 102, 241, 0.1); border-radius: 12px; padding: 12px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(99, 102, 241, 0.2);">
                        <i class="fa-solid fa-users" style="font-size: 20px; color: var(--primary);"></i>
                    </div>
                    <div>
                        <h3>180</h3>
                        <p>Total Enrolled</p>
                        <span style="font-size:10px; color:#94a3b8; font-weight: 500;">across 4 courses</span>
                    </div>
                </div>
                <div class="stat-card glassmorphism">
                    <div class="stat-icon-wrapper" style="background: rgba(168, 85, 247, 0.1); border-radius: 12px; padding: 12px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(168, 85, 247, 0.2);">
                        <i class="fa-solid fa-book-open" style="font-size: 20px; color: var(--accent);"></i>
                    </div>
                    <div>
                        <h3>4</h3>
                        <p>Active Courses</p>
                        <span style="font-size:10px; color:#10b981; font-weight:600; display: inline-flex; align-items: center; gap: 4px; background: rgba(16, 185, 129, 0.1); padding: 2px 6px; border-radius: 4px;"><i class="fa-solid fa-circle-check"></i> Sync Done</span>
                    </div>
                </div>
                <div class="stat-card glassmorphism">
                    <div class="stat-icon-wrapper" style="background: rgba(16, 185, 129, 0.1); border-radius: 12px; padding: 12px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.2);">
                        <i class="fa-solid fa-clock-rotate-left" style="font-size: 20px; color: #10b981;"></i>
                    </div>
                    <div>
                        <h3>88.2%</h3>
                        <p>Class Attendance</p>
                        <span style="font-size:10px; color:#ef4444; font-weight:600; display: inline-flex; align-items: center; gap: 4px; background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px;"><i class="fa-solid fa-arrow-trend-down"></i> -1.2% wk</span>
                    </div>
                </div>
                <div class="stat-card glassmorphism">
                    <div class="stat-icon-wrapper" style="background: rgba(245, 158, 11, 0.1); border-radius: 12px; padding: 12px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(245, 158, 11, 0.2);">
                        <i class="fa-solid fa-file-signature" style="font-size: 20px; color: #f59e0b;"></i>
                    </div>
                    <div>
                        <h3 id="pendingApprovalsCount">5</h3>
                        <p>Pending Actions</p>
                        <span style="font-size:10px; color:#f59e0b; font-weight:600; display: inline-flex; align-items: center; gap: 4px; background: rgba(245, 158, 11, 0.1); padding: 2px 6px; border-radius: 4px;">Action req.</span>
                    </div>
                </div>
            </div>

            <!-- Dashboard Main 3-Column Symmetrical Grid (Equal Width & Height) -->
            <div class="dashboard-grid">
                <!-- Card 1: Today's Teaching Schedule -->
                <div class="dashboard-card glassmorphism">
                    <div>
                        <h3><i class="fa-solid fa-calendar-day"></i> Teaching Schedule</h3>
                        
                        <!-- Days Selection Tabs -->
                        <div class="day-tabs" style="display: flex; gap: 6px; margin-top: 12px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 4px;">
                            <button class="day-tab-btn active" onclick="showScheduleDay('MON', this)">MON</button>
                            <button class="day-tab-btn" onclick="showScheduleDay('TUE', this)">TUE</button>
                            <button class="day-tab-btn" onclick="showScheduleDay('WED', this)">WED</button>
                            <button class="day-tab-btn" onclick="showScheduleDay('THU', this)">THU</button>
                            <button class="day-tab-btn" onclick="showScheduleDay('FRI', this)">FRI</button>
                        </div>

                        <!-- MON Schedule -->
                        <div id="schedule-MON" class="schedule-day-content" style="display:flex; flex-direction:column; gap:12px;">
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #94a3b8; padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; opacity: 0.6; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">DBMS (L)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">09:00 AM • Room 403</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(255,255,255,0.05); color:var(--text-secondary); border-radius:12px; font-weight:600; border: 1px solid rgba(255,255,255,0.05);">Done</span>
                            </div>
                            <div class="pulse-glow-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12)); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(99,102,241,0.25); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Web Tech Lab (PR)</strong>
                                    <span style="display:block; font-size:10px; color:var(--primary); font-weight:600; margin-top:2px;">11:30 AM • Lab 3</span>
                                </div>
                                <span class="badge-live-pulse" style="font-size:9px; padding:3px 8px; background:rgba(99,102,241,0.2); color:var(--primary); font-weight:700; border-radius:12px; display:inline-flex; align-items:center; gap:4px; border:1px solid rgba(99,102,241,0.35);"><span style="width:6px; height:6px; background:var(--primary); border-radius:50%; display:inline-block; box-shadow: 0 0 8px var(--primary); animation: livePulse 1.2s infinite alternate;"></span>LIVE</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--accent); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Neural Networks (L)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">02:00 PM • Seminar Hall</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(168,85,247,0.15); color:var(--accent); border-radius:12px; font-weight:600; border: 1px solid rgba(168,85,247,0.2);">Next</span>
                            </div>
                        </div>

                        <!-- TUE Schedule -->
                        <div id="schedule-TUE" class="schedule-day-content" style="display:none; flex-direction:column; gap:12px;">
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">OOP with Java (L)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">10:00 AM • Room 201</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(99,102,241,0.1); color:var(--primary); border-radius:12px; font-weight:600; border: 1px solid rgba(99,102,241,0.2);">Pending</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--accent); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Project Mentoring</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">01:00 PM • Room 204</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(168,85,247,0.1); color:var(--accent); border-radius:12px; font-weight:600; border: 1px solid rgba(168,85,247,0.2);">Scheduled</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Distributed Systems (L)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">03:30 PM • Room 405</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(16,185,129,0.1); color:#10b981; border-radius:12px; font-weight:600; border: 1px solid rgba(16,185,129,0.2);">Scheduled</span>
                            </div>
                        </div>

                        <!-- WED Schedule -->
                        <div id="schedule-WED" class="schedule-day-content" style="display:none; flex-direction:column; gap:12px;">
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #94a3b8; padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">DBMS (L)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">09:00 AM • Room 403</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(255,255,255,0.05); color:var(--text-secondary); border-radius:12px; font-weight:600; border: 1px solid rgba(255,255,255,0.05);">Weekly</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--accent); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Neural Networks (L)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">11:30 AM • Seminar Hall</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(168,85,247,0.1); color:var(--accent); border-radius:12px; font-weight:600; border: 1px solid rgba(168,85,247,0.2);">Scheduled</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Research Review</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">02:00 PM • Meeting Rm 2</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(16,185,129,0.1); color:#10b981; border-radius:12px; font-weight:600; border: 1px solid rgba(16,185,129,0.2);">Scheduled</span>
                            </div>
                        </div>

                        <!-- THU Schedule -->
                        <div id="schedule-THU" class="schedule-day-content" style="display:none; flex-direction:column; gap:12px;">
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Web Tech Lecture</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">10:00 AM • Room 302</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(99,102,241,0.1); color:var(--primary); border-radius:12px; font-weight:600; border: 1px solid rgba(99,102,241,0.2);">Scheduled</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--accent); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">AI Innovations Seminar</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">12:00 PM • Auditorium</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(168,85,247,0.1); color:var(--accent); border-radius:12px; font-weight:600; border: 1px solid rgba(168,85,247,0.2);">Auditorium</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Distributed Systems (L)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">03:00 PM • Room 405</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(16,185,129,0.1); color:#10b981; border-radius:12px; font-weight:600; border: 1px solid rgba(16,185,129,0.2);">Scheduled</span>
                            </div>
                        </div>

                        <!-- FRI Schedule -->
                        <div id="schedule-FRI" class="schedule-day-content" style="display:none; flex-direction:column; gap:12px;">
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">OOP Lab (PR)</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">09:00 AM • Lab 1</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(99,102,241,0.1); color:var(--primary); border-radius:12px; font-weight:600; border: 1px solid rgba(99,102,241,0.2);">Scheduled</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--accent); padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Faculty Meeting</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">01:30 PM • CS Boardroom</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(168,85,247,0.1); color:var(--accent); border-radius:12px; font-weight:600; border: 1px solid rgba(168,85,247,0.2);">Urgent</span>
                            </div>
                            <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 8px; display:flex; justify-content:space-between; align-items:center; border: 1px solid rgba(255,255,255,0.03); border-left-width: 3px;">
                                <div>
                                    <strong style="color:var(--text-primary); font-size:13px;">Doubt Clearance</strong>
                                    <span style="display:block; font-size:10px; color:#94a3b8; margin-top:2px;">03:30 PM • Room 403</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(16,185,129,0.1); color:#10b981; border-radius:12px; font-weight:600; border: 1px solid rgba(16,185,129,0.2);">Clearance</span>
                            </div>
                        </div>
                    </div>
                    <a href="../academics/timetable/timetable.html" style="font-size:11px; color:var(--primary); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">View Full Timetable <i class="fa-solid fa-arrow-right" style="font-size:9px;"></i></a>
                </div>

                <!-- Card 2: Broadcast Quick Announcement -->
                <div class="dashboard-card glassmorphism">
                    <div>
                        <h3><i class="fa-solid fa-bullhorn"></i> Broadcast Notice</h3>
                        <div style="margin-top: 15px; display:flex; flex-direction:column; gap:12px;">
                            <select id="announcementTarget" class="form-input select-input" style="height: 38px; font-size:12px; background-color: var(--bg-tertiary); border: 1px solid var(--border-glass); border-radius: 8px; color: var(--text-primary); padding: 0 10px; width: 100%;">
                                <option value="ALL">All Classes</option>
                                <option value="BCA3">BCA Semester 3</option>
                                <option value="CSE5">B.Tech CSE Sem 5</option>
                            </select>
                            <textarea id="announcementText" class="form-input" style="height:110px; padding:12px; font-size:12px; background-color:var(--bg-tertiary); border: 1px solid var(--border-glass); border-radius: 8px; color: var(--text-primary); resize:none;" placeholder="Type your announcement to students..."></textarea>
                        </div>
                    </div>
                    <button id="postAnnouncementBtn" class="btn btn-primary" style="height:38px; font-size:12px; width:100%; display:flex; justify-content:center; align-items:center; gap:8px; background: linear-gradient(135deg, var(--primary), var(--accent)); border:none; border-radius:8px; font-weight:600; cursor:pointer;"><i class="fa-solid fa-paper-plane"></i> Publish to Stream</button>
                </div>

                <!-- Card 3: Attendance Analytics -->
                <div class="dashboard-card glassmorphism">
                    <div>
                        <h3><i class="fa-solid fa-users-line"></i> Attendance Insights</h3>
                        <div style="margin-top:20px; text-align:center;">
                            <strong style="font-size:36px; color:var(--primary); font-family:monospace; display:block; font-weight:800; background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">88.2%</strong>
                            <span style="font-size:11px; color:#94a3b8; display:block; margin-bottom:15px; font-weight:500;">Class Average Attendance</span>
                            <div style="text-align:left; border-top:1px solid var(--border-glass); padding-top:15px;">
                                <span style="font-size:11px; color:#94a3b8; display:block; margin-bottom:8px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Low Attendance Alerts (&lt;75%):</span>
                                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; background:rgba(239,68,68,0.06); padding:8px 12px; border-radius:8px; border: 1px solid rgba(239,68,68,0.15);">
                                    <span style="font-weight:500;"><i class="fa-solid fa-triangle-exclamation" style="color:#ef4444; margin-right:4px;"></i> Vikram Kumawat (BCA)</span>
                                    <strong style="color:#ef4444; font-weight:700;">72.4%</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="../reports/attendance-report/attendance-report.html" style="font-size:11px; color:var(--primary); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">View Defaulter List <i class="fa-solid fa-arrow-right" style="font-size:9px;"></i></a>
                </div>

                <!-- Card 4: Leave Approvals -->
                <div class="dashboard-card glassmorphism">
                    <div>
                        <h3><i class="fa-solid fa-clipboard-check"></i> Pending Approvals</h3>
                        <div class="table-responsive" style="margin-top: 15px; max-height:180px; overflow-y:auto;">
                            <table class="custom-table" style="font-size:11px; width:100%; border-collapse:collapse;">
                                <tbody>
                                    <tr id="reqRow1" style="border-bottom: 1px solid var(--border-glass);">
                                        <td style="padding: 10px 0;"><strong>Vikram Kumawat</strong><br><span style="font-size:9px; color:#94a3b8;">BCA Sem 3</span></td>
                                        <td style="padding: 10px 0; color:#94a3b8;">Medical Leave</td>
                                        <td style="text-align:right; white-space:nowrap; padding: 10px 0;">
                                            <button onclick="resolveReq(1, 'Approved')" class="btn btn-primary btn-sm" style="padding:6px; font-size:10px; border-radius:50%; width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3); cursor:pointer;"><i class="fa-solid fa-check"></i></button>
                                            <button onclick="resolveReq(1, 'Rejected')" class="btn btn-secondary btn-sm" style="padding:6px; font-size:10px; border-radius:50%; width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); margin-left:4px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                                        </td>
                                    </tr>
                                    <tr id="reqRow2">
                                        <td style="padding: 10px 0;"><strong>Aditya Sharma</strong><br><span style="font-size:9px; color:#94a3b8;">CSE Sem 5</span></td>
                                        <td style="padding: 10px 0; color:#94a3b8;">Term Paper</td>
                                        <td style="text-align:right; padding: 10px 0;">
                                            <a href="../classroom/grades/grades.html" class="btn btn-secondary btn-sm" style="padding:6px; font-size:10px; border-radius:50%; width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; background:rgba(99,102,241,0.15); color:var(--primary); border:1px solid rgba(99,102,241,0.3);"><i class="fa-solid fa-pen"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a href="../student-management/applications/applications.html" style="font-size:11px; color:var(--primary); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">Review All Applications <i class="fa-solid fa-arrow-right" style="font-size:9px;"></i></a>
                </div>

                <!-- Card 5: Class Grade Summary -->
                <div class="dashboard-card glassmorphism">
                    <div>
                        <h3><i class="fa-solid fa-chart-bar"></i> Grade Distribution</h3>
                        <div style="margin-top: 15px; display:flex; flex-direction:column; gap:12px;">
                            <div>
                                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px; font-weight:500;">
                                    <span>Outstanding (O)</span>
                                    <strong style="color:var(--text-primary);">32%</strong>
                                </div>
                                <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; border: 1px solid rgba(255,255,255,0.02);">
                                    <div style="width:32%; height:100%; background:linear-gradient(90deg, var(--primary), #10b981); border-radius:10px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px; font-weight:500;">
                                    <span>Excellent (E)</span>
                                    <strong style="color:var(--text-primary);">48%</strong>
                                </div>
                                <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; border: 1px solid rgba(255,255,255,0.02);">
                                    <div style="width:48%; height:100%; background:linear-gradient(90deg, var(--primary), var(--accent)); border-radius:10px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px; font-weight:500;">
                                    <span>Average (A)</span>
                                    <strong style="color:var(--text-primary);">15%</strong>
                                </div>
                                <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; border: 1px solid rgba(255,255,255,0.02);">
                                    <div style="width:15%; height:100%; background:linear-gradient(90deg, #f59e0b, #ef4444); border-radius:10px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="../reports/marks-report/marks-report.html" style="font-size:11px; color:var(--primary); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">View Performance Analytics <i class="fa-solid fa-arrow-right" style="font-size:9px;"></i></a>
                </div>

                <!-- Card 6: Grants & Patents -->
                <div class="dashboard-card glassmorphism">
                    <div>
                        <h3><i class="fa-solid fa-microscope"></i> Research Grants</h3>
                        <div style="margin-top:15px; display:flex; flex-direction:column; gap:10px; font-size:11px;">
                            <div style="padding:10px 12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <strong style="color:var(--text-primary); display:block; font-size:12px; font-weight:600;">Smart Traffic AI Project</strong>
                                    <span style="color:#94a3b8; display:block; font-size:9px; margin-top:2px;">DST Grant</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(16,185,129,0.12); color:#10b981; border-radius:12px; font-weight:600; border:1px solid rgba(16,185,129,0.2);">Active</span>
                            </div>
                            <div style="padding:10px 12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <strong style="color:var(--text-primary); display:block; font-size:12px; font-weight:600;">IoT Bio-Sensor Array</strong>
                                    <span style="color:#94a3b8; display:block; font-size:9px; margin-top:2px;">Patent Portfolio</span>
                                </div>
                                <span style="font-size:9px; padding:3px 8px; background:rgba(99,102,241,0.12); color:var(--primary); border-radius:12px; font-weight:600; border:1px solid rgba(99,102,241,0.2);">Published</span>
                            </div>
                        </div>
                    </div>
                    <a href="../../professor/research/research.html" style="font-size:11px; color:var(--primary); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">Research Portfolio <i class="fa-solid fa-arrow-right" style="font-size:9px;"></i></a>
                </div>
            </div>
        `,
        cssContent: `
            @keyframes livePulse {
                0% { opacity: 0.5; transform: scale(0.92); }
                100% { opacity: 1; transform: scale(1.08); }
            }
            .stats-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 24px;
                margin-bottom: 35px;
            }
            .stat-card {
                padding: 20px 24px;
                display: flex;
                align-items: center;
                gap: 16px;
                background: rgba(30, 41, 59, 0.45);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
            }
            .stat-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 40px 0 rgba(99, 102, 241, 0.15);
                border-color: rgba(99, 102, 241, 0.3);
            }
            .stat-card h3 {
                font-size: 24px;
                font-weight: 800;
                margin-bottom: 2px;
                color: var(--text-primary);
            }
            .stat-card p {
                font-size: 10px;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 700;
                margin-bottom: 4px;
            }
            .dashboard-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 30px;
                margin-bottom: 30px;
            }
            @media (max-width: 1200px) {
                .dashboard-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 20px;
                }
            }
            @media (max-width: 768px) {
                .dashboard-grid {
                    grid-template-columns: 1fr !important;
                    gap: 20px;
                }
            }
            .dashboard-card {
                padding: 24px;
                background: rgba(30, 41, 59, 0.45);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 380px;
                box-sizing: border-box;
            }
            .dashboard-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 40px 0 rgba(99, 102, 241, 0.15);
                border-color: rgba(99, 102, 241, 0.3);
            }
            .dashboard-card h3 {
                font-size: 15px;
                font-weight: 700;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-primary);
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 12px;
            }
            .dashboard-card h3 i {
                color: var(--primary);
            }
            .schedule-list {
                display: flex;
                flex-direction: column;
                gap: 18px;
            }
            .schedule-item {
                display: flex;
                gap: 15px;
                padding-bottom: 12px;
                border-bottom: 1px dashed var(--border-color);
            }
            .schedule-item:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }
            .schedule-item .time {
                font-family: monospace;
                font-weight: 700;
                color: var(--primary);
                background: var(--primary-glow);
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 11px;
                align-self: flex-start;
            }
            .schedule-item .details strong {
                display: block;
                font-size: 13px;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 2px;
            }
            .day-tab-btn {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: var(--text-secondary);
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 10px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .day-tab-btn.active, .day-tab-btn:hover {
                background: var(--primary);
                color: #fff;
                border-color: var(--primary);
                box-shadow: 0 0 8px var(--primary-glow);
            }
            .schedule-day-content {
                display: flex;
                flex-direction: column;
                gap: 12px;
                animation: fadeIn 0.35s ease;
            }
        `,
        jsContent: `
            console.log("Faculty Dashboard Initialized.");
            
            // Show Schedule Day
            window.showScheduleDay = function(day, btn) {
                // Hide all schedule content views
                const contents = document.querySelectorAll(".schedule-day-content");
                contents.forEach(c => c.style.display = "none");
                
                // Show requested day
                const target = document.getElementById("schedule-" + day);
                if (target) target.style.display = "flex";
                
                // Toggle active tabs
                const tabs = document.querySelectorAll(".day-tab-btn");
                tabs.forEach(t => t.classList.remove("active"));
                btn.classList.add("active");
            };
            
            // Resolve requests
            window.resolveReq = function(id, status) {
                const row = document.getElementById("reqRow" + id);
                if (row) {
                    row.style.transition = "all 0.3s ease";
                    row.style.opacity = "0.3";
                    row.style.transform = "translateX(50px)";
                    setTimeout(() => {
                        row.remove();
                        // Update actions count
                        const cnt = document.getElementById("pendingApprovalsCount");
                        if (cnt) {
                            let curr = parseInt(cnt.textContent) || 0;
                            if (curr > 0) cnt.textContent = curr - 1;
                        }
                    }, 300);
                    alert("Application " + status + " successfully!");
                }
            };

            // Post Announcements
            document.addEventListener("DOMContentLoaded", () => {
                const postBtn = document.getElementById("postAnnouncementBtn");
                const announceText = document.getElementById("announcementText");
                const announceTarget = document.getElementById("announcementTarget");

                if (postBtn && announceText) {
                    postBtn.addEventListener("click", () => {
                        const txt = announceText.value.trim();
                        if (!txt) {
                            alert("Announcement message cannot be empty!");
                            return;
                        }
                        const targetText = announceTarget.options[announceTarget.selectedIndex].text;
                        alert("Successfully published announcement to: " + targetText + "\\nMessage: \\"" + txt + "\\"");
                        announceText.value = "";
                    });
                }
            });
        `
    },
    "my-classes": {
        htmlContent: `
            <div class="welcome-card glassmorphism" style="padding: 25px 30px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; background-image: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12)); position: relative; overflow: hidden; border: 1px solid var(--border-glass);">
                <div>
                    <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 4px;">Assigned Academic Courses</h2>
                    <p style="color: var(--text-secondary); font-size: 13px;">Manage classes, track syllabus completion, and view direct links to classroom hubs.</p>
                </div>
            </div>

            <!-- Courses Grid (Symmetrical Cards) -->
            <div class="courses-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 30px;">
                <!-- Course 1 -->
                <div class="course-card glassmorphism" style="padding: 25px; border: 1px solid var(--border-glass); display: flex; flex-direction: column; justify-content: space-between; height: 260px; box-sizing: border-box;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <div>
                                <span style="font-size: 10px; background: rgba(99, 102, 241, 0.15); color: var(--primary); padding: 2px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase;">BCA Sem 3</span>
                                <h3 style="font-size: 18px; font-weight: 800; margin-top: 6px; color: var(--text-primary);">Database Management Systems</h3>
                            </div>
                            <span style="font-size: 11px; font-family: monospace; color: var(--text-tertiary);">DBMS-301</span>
                        </div>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px;">Lectures & Practical Lab assignments on SQL, database schema design, normalization, and ACID properties.</p>
                    </div>
                    <div>
                        <!-- Syllabus Progress -->
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                                <span style="color: var(--text-secondary);">Syllabus Coverage</span>
                                <strong>80% Completed</strong>
                            </div>
                            <div style="height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;">
                                <div style="width: 80%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 3px;"></div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px;">
                            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;"><i class="fa-solid fa-users" style="margin-right: 5px; color: var(--primary);"></i> 60 Students</span>
                            <a href="../../classroom/stream/stream.html" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 4px 10px;">Go to Classroom</a>
                        </div>
                    </div>
                </div>

                <!-- Course 2 -->
                <div class="course-card glassmorphism" style="padding: 25px; border: 1px solid var(--border-glass); display: flex; flex-direction: column; justify-content: space-between; height: 260px; box-sizing: border-box;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <div>
                                <span style="font-size: 10px; background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 2px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase;">B.Tech Sem 5</span>
                                <h3 style="font-size: 18px; font-weight: 800; margin-top: 6px; color: var(--text-primary);">Web Technology Lab</h3>
                            </div>
                            <span style="font-size: 11px; font-family: monospace; color: var(--text-tertiary);">WT-591</span>
                        </div>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px;">Hands-on coding session covering HTML5, CSS3, Javascript, responsive web design frameworks, and API integrations.</p>
                    </div>
                    <div>
                        <!-- Syllabus Progress -->
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                                <span style="color: var(--text-secondary);">Syllabus Coverage</span>
                                <strong>65% Completed</strong>
                            </div>
                            <div style="height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;">
                                <div style="width: 65%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 3px;"></div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px;">
                            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;"><i class="fa-solid fa-users" style="margin-right: 5px; color: #10b981;"></i> 75 Students</span>
                            <a href="../../classroom/stream/stream.html" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 4px 10px;">Go to Classroom</a>
                        </div>
                    </div>
                </div>

                <!-- Course 3 -->
                <div class="course-card glassmorphism" style="padding: 25px; border: 1px solid var(--border-glass); display: flex; flex-direction: column; justify-content: space-between; height: 260px; box-sizing: border-box;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <div>
                                <span style="font-size: 10px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; padding: 2px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase;">M.Tech Sem 1</span>
                                <h3 style="font-size: 18px; font-weight: 800; margin-top: 6px; color: var(--text-primary);">Neural Networks Seminar</h3>
                            </div>
                            <span style="font-size: 11px; font-family: monospace; color: var(--text-tertiary);">NN-702</span>
                        </div>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px;">Advanced seminar topics including Deep Neural Networks, Backpropagation, CNNs, RNNs, and Transformer layouts.</p>
                    </div>
                    <div>
                        <!-- Syllabus Progress -->
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                                <span style="color: var(--text-secondary);">Syllabus Coverage</span>
                                <strong>40% Completed</strong>
                            </div>
                            <div style="height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;">
                                <div style="width: 40%; height: 100%; background: linear-gradient(90deg, #f59e0b, #fbbf24); border-radius: 3px;"></div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px;">
                            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;"><i class="fa-solid fa-users" style="margin-right: 5px; color: #f59e0b;"></i> 25 Students</span>
                            <a href="../../classroom/stream/stream.html" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 4px 10px;">Go to Classroom</a>
                        </div>
                    </div>
                </div>

                <!-- Course 4 -->
                <div class="course-card glassmorphism" style="padding: 25px; border: 1px solid var(--border-glass); display: flex; flex-direction: column; justify-content: space-between; height: 260px; box-sizing: border-box;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <div>
                                <span style="font-size: 10px; background: rgba(239, 68, 68, 0.15); color: #ef4444; padding: 2px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase;">B.Tech Sem 3</span>
                                <h3 style="font-size: 18px; font-weight: 800; margin-top: 6px; color: var(--text-primary);">Data Structures Lab</h3>
                            </div>
                            <span style="font-size: 11px; font-family: monospace; color: var(--text-tertiary);">DSA-391</span>
                        </div>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 15px;">Practical implementations of Arrays, Stacks, Queues, Linked Lists, Trees, and Sorting algorithms in C++.</p>
                    </div>
                    <div>
                        <!-- Syllabus Progress -->
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                                <span style="color: var(--text-secondary);">Syllabus Coverage</span>
                                <strong>90% Completed</strong>
                            </div>
                            <div style="height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;">
                                <div style="width: 90%; height: 100%; background: #ef4444; border-radius: 3px;"></div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px;">
                            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;"><i class="fa-solid fa-users" style="margin-right: 5px; color: #ef4444;"></i> 20 Students</span>
                            <a href="../../classroom/stream/stream.html" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 4px 10px;">Go to Classroom</a>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            @media (max-width: 1024px) {
                .courses-grid {
                    grid-template-columns: 1fr !important;
                    gap: 20px !important;
                }
            }
        `,
        jsContent: `
            console.log("My Classes Page Loaded.");
        `
    },
    timetable: {
        htmlContent: `
            <div class="welcome-card glassmorphism" style="padding: 25px 30px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; background-image: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12)); border: 1px solid var(--border-glass);">
                <div>
                    <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 4px;">Faculty Weekly Schedule</h2>
                    <p style="color: var(--text-secondary); font-size: 13px;">View assigned teaching slots, classroom allocations, and lab hours across the week.</p>
                </div>
            </div>

            <!-- Timetable Symmetrical Grid Table -->
            <div class="dashboard-card glassmorphism" style="padding:28px; border:1px solid var(--border-glass); margin-bottom:30px; overflow-x:auto;">
                <table class="timetable-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:13px; min-width:800px;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border-color); height:45px;">
                            <th style="color:var(--text-secondary); font-weight:600; width:120px; padding:10px;">Time Slot</th>
                            <th style="color:var(--text-secondary); font-weight:600; padding:10px;">Monday</th>
                            <th style="color:var(--text-secondary); font-weight:600; padding:10px;">Tuesday</th>
                            <th style="color:var(--text-secondary); font-weight:600; padding:10px;">Wednesday</th>
                            <th style="color:var(--text-secondary); font-weight:600; padding:10px;">Thursday</th>
                            <th style="color:var(--text-secondary); font-weight:600; padding:10px;">Friday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Row 1 -->
                        <tr style="border-bottom: 1px solid var(--border-color); height:110px;">
                            <td style="font-family:monospace; font-weight:700; color:var(--primary); padding:10px;">
                                09:00 AM -<br>10:30 AM
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(99, 102, 241, 0.08); border-left:3px solid var(--primary); border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">DBMS (L)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">BCA Sem 3 • Room 403</span>
                                </div>
                            </td>
                            <td style="padding:8px;">
                                <span style="font-size:11px; color:var(--text-tertiary);">No Class</span>
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(99, 102, 241, 0.08); border-left:3px solid var(--primary); border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">DBMS (L)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">BCA Sem 3 • Room 403</span>
                                </div>
                            </td>
                            <td style="padding:8px;">
                                <span style="font-size:11px; color:var(--text-tertiary);">No Class</span>
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(99, 102, 241, 0.08); border-left:3px solid var(--primary); border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">DBMS (L)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">BCA Sem 3 • Room 403</span>
                                </div>
                            </td>
                        </tr>

                        <!-- Row 2 -->
                        <tr style="border-bottom: 1px solid var(--border-color); height:110px;">
                            <td style="font-family:monospace; font-weight:700; color:var(--primary); padding:10px;">
                                10:45 AM -<br>12:15 PM
                            </td>
                            <td style="padding:8px;">
                                <span style="font-size:11px; color:var(--text-tertiary);">No Class</span>
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(16, 185, 129, 0.08); border-left:3px solid #10b981; border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">Web Tech Lab (PR)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">CSE Sem 5 • Lab 3</span>
                                </div>
                            </td>
                            <td style="padding:8px;">
                                <span style="font-size:11px; color:var(--text-tertiary);">No Class</span>
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(16, 185, 129, 0.08); border-left:3px solid #10b981; border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">Web Tech Lab (PR)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">CSE Sem 5 • Lab 3</span>
                                </div>
                            </td>
                            <td style="padding:8px;">
                                <span style="font-size:11px; color:var(--text-tertiary);">No Class</span>
                            </td>
                        </tr>

                        <!-- Row 3 -->
                        <tr style="border-bottom: 1px solid var(--border-color); height:110px;">
                            <td style="font-family:monospace; font-weight:700; color:var(--primary); padding:10px;">
                                01:00 PM -<br>02:30 PM
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(239, 68, 68, 0.08); border-left:3px solid #ef4444; border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">DSA Lab (PR)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">CSE Sem 3 • Lab 1</span>
                                </div>
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(245, 158, 11, 0.08); border-left:3px solid #f59e0b; border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">Neural Sem (L)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">M.Tech S1 • Room 102</span>
                                </div>
                            </td>
                            <td style="padding:8px;">
                                <span style="font-size:11px; color:var(--text-tertiary);">No Class</span>
                            </td>
                            <td style="padding:8px;">
                                <div style="padding:10px; background:rgba(245, 158, 11, 0.08); border-left:3px solid #f59e0b; border-radius:4px;">
                                    <strong style="color:var(--text-primary); display:block; font-size:12px;">Neural Sem (L)</strong>
                                    <span style="font-size:10px; color:var(--text-secondary); display:block;">M.Tech S1 • Room 102</span>
                                </div>
                            </td>
                            <td style="padding:8px;">
                                <span style="font-size:11px; color:var(--text-tertiary);">No Class</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        cssContent: `
            .timetable-table th, .timetable-table td {
                vertical-align: middle;
            }
        `,
        jsContent: `
            console.log("Timetable Page Initialized.");
        `
    },
    attendance: {
        htmlContent: `
            <div class="welcome-card glassmorphism" style="padding: 25px 30px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; background-image: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12)); border: 1px solid var(--border-glass);">
                <div>
                    <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 4px;">Dynamic Class Attendance, MCQ Quiz & Session Controller</h2>
                    <p style="color: var(--text-secondary); font-size: 13px;">Publish attendance codes, design MCQ questions with option options and weights, and reset student sessions if they get logged out.</p>
                </div>
            </div>

            <!-- Toast Notification Container -->
            <div id="toastNotification" style="display:none; position:fixed; top:20px; right:20px; background:#10b981; color:white; padding:12px 24px; border-radius:8px; font-weight:600; font-size:13px; z-index:1000; box-shadow:0 10px 15px rgba(0,0,0,0.3); align-items:center; gap:8px; animation:slideIn 0.3s ease;">
                <i class="fa-solid fa-circle-check"></i> <span id="toastMessage">Action completed successfully!</span>
            </div>

            <div class="attendance-vertical-layout" style="display: flex; flex-direction: column; gap: 30px; margin-bottom: 30px;">
                <!-- Top Card: Code Generator & Question Settings -->
                <div class="dashboard-card glassmorphism" style="padding: 28px; box-sizing: border-box;">
                    <h3><i class="fa-solid fa-gears"></i> Attendance, Timer & MCQ Builder</h3>
                    <p style="color:var(--text-secondary); font-size:12px; margin-top:8px; margin-bottom:20px;">
                        Configure active lecture, set code expiry, and create multiple choice questions (MCQs) with separate credit points.
                    </p>
                    
                    <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:30px; margin-bottom:20px;">
                        <!-- Left inputs: Class and timer -->
                        <div style="display:flex; flex-direction:column; gap:15px;">
                            <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:15px;">
                                <div class="form-group">
                                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Active Lecture</label>
                                    <select id="lectureSelect" class="form-input select-input" style="height:38px; background-color: var(--bg-secondary); font-size:12px; width:100%;">
                                        <option value="" disabled selected>Select Lecture</option>
                                        <option value="DBMS">DBMS (BCA Sem 3)</option>
                                        <option value="WEB">Web Technology (CSE Sem 5)</option>
                                        <option value="NN">Neural Networks (M.Tech Sem 1)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">Code Expiry (Minutes)</label>
                                    <input type="number" id="expiryTimerInput" class="form-input" value="10" min="1" max="60" style="height:38px; background-color: var(--bg-secondary); font-size:12px; width:100%;">
                                </div>
                            </div>

                            <!-- Question List Section -->
                            <div class="form-group">
                                <label style="font-size:11px; font-weight:600; color:var(--text-secondary); display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <span>Class Validation Questions (Max 5)</span>
                                    <button type="button" id="addQuestionBtn" class="btn btn-secondary btn-sm" style="padding:2px 8px; font-size:10px; height:24px;"><i class="fa-solid fa-plus"></i> Add Question</button>
                                </label>
                                <div id="questionsContainer" style="display:flex; flex-direction:column; gap:15px;">
                                    <!-- Dynamic Questions Row -->
                                    <div class="question-row" data-index="1" style="display:flex; flex-direction:column; gap:8px; border-bottom:1px dashed var(--border-color); padding-bottom:12px; animation:fadeIn 0.2s ease;">
                                        <div style="display:flex; gap:12px; align-items:center;">
                                            <span style="font-family:monospace; font-weight:bold; color:var(--primary); font-size:12px; width:15px;">Q1</span>
                                            <input type="text" class="form-input q-text" value="Identify the primary key feature." placeholder="Question text" style="flex:1; height:36px; background-color: var(--bg-secondary); font-size:12px;">
                                            <input type="number" class="form-input q-credits" value="5" min="1" max="50" style="width:70px; height:36px; background-color: var(--bg-secondary); font-size:12px;" title="Credit points">
                                            <span style="font-size:10px; color:var(--text-tertiary);">Credits</span>
                                            <button type="button" onclick="removeQuestionRow(this)" class="btn btn-secondary btn-sm" style="padding:4px 8px; height:36px; color:#ef4444; display:none;"><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                        <div style="display:flex; gap:10px; margin-left:27px;">
                                            <input type="text" class="form-input q-optA" value="Unique & Not Null" placeholder="Option A" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                                            <input type="text" class="form-input q-optB" value="Allows Null" placeholder="Option B" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                                            <input type="text" class="form-input q-optC" value="Duplicate entries" placeholder="Option C" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right panel: Code publish view -->
                        <div style="display:flex; flex-direction:column; justify-content:space-between; border-left:1px solid var(--border-color); padding-left:30px;">
                            <button class="btn btn-primary" id="generateCodeBtn" style="height:42px; display:flex; justify-content:center; align-items:center; font-size:12px; width:100%;"><i class="fa-solid fa-satellite-dish" style="margin-right:5px;"></i> Generate Code & Publish Quiz</button>
                            
                            <div id="codeDisplayBlock" style="display:none; padding:20px; border-radius:var(--border-radius-sm); border:1px solid var(--border-color); background:rgba(255,255,255,0.02); text-align:center; animation:fadeIn 0.3s ease; margin-top:20px;">
                                <span style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:4px;">Active Code</span>
                                <strong id="activeValidationCode" style="font-size:36px; letter-spacing:3px; color:var(--primary); font-family:monospace; display:block; margin-bottom:6px;">NET77</strong>
                                <p style="font-size:11px; color:var(--text-secondary);"><i class="fa-solid fa-circle-notch fa-spin" style="color:var(--accent); margin-right:5px;"></i> Active validation expires in <span id="timerCountdownText">10</span> mins</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Card: Live Records Log -->
                <div class="dashboard-card glassmorphism" style="padding: 28px; box-sizing: border-box;">
                    <h3><i class="fa-solid fa-users-viewfinder"></i> Live Check-In & Assessment Log</h3>
                    <p style="color:var(--text-secondary); font-size:12px; margin-top:5px; margin-bottom:15px;">
                        Displays submitted answers. If a student got logged out, click **Reset Session** to allow them to log in and retake.
                    </p>
                    <div class="table-responsive" style="max-height:450px; overflow-y:auto;">
                        <table class="custom-table" style="font-size:11px; width:100%;">
                            <thead>
                                <tr>
                                    <th style="width:160px;">Student</th>
                                    <th style="width:90px;">Time</th>
                                    <th style="width:150px;">Status</th>
                                    <th>Responses / Answers</th>
                                    <th style="width:180px; text-align:right;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="studentAttendanceTableBody">
                                <tr id="attStudentRow1">
                                    <td><strong>Vikram Kumawat</strong><br><span style="font-size:9px; color:var(--text-tertiary);">BCA23015</span></td>
                                    <td id="attTime1">—</td>
                                    <td><span id="attBadge1" style="padding:2px 6px; background:rgba(239, 68, 68, 0.15); color:#ef4444; border-radius:4px; font-weight:600;">Absent</span></td>
                                    <td id="attAns1" style="font-style:italic; color:var(--text-tertiary);">No response yet</td>
                                    <td style="text-align:right; display:flex; gap:6px; justify-content:flex-end;">
                                        <button onclick="toggleStudentAtt(1)" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px;"><i class="fa-solid fa-pen"></i> Edit</button>
                                        <button onclick="resetStudentSession(1, 'Vikram Kumawat')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px; color:var(--primary);" title="Reset Session"><i class="fa-solid fa-rotate-right"></i> Reset</button>
                                    </td>
                                </tr>
                                <tr id="attStudentRow2">
                                    <td><strong>Priya Sharma</strong><br><span style="font-size:9px; color:var(--text-tertiary);">CSE23099</span></td>
                                    <td id="attTime2">—</td>
                                    <td><span id="attBadge2" style="padding:2px 6px; background:rgba(239, 68, 68, 0.15); color:#ef4444; border-radius:4px; font-weight:600;">Absent</span></td>
                                    <td id="attAns2" style="font-style:italic; color:var(--text-tertiary);">No response yet</td>
                                    <td style="text-align:right; display:flex; gap:6px; justify-content:flex-end;">
                                        <button onclick="toggleStudentAtt(2)" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px;"><i class="fa-solid fa-pen"></i> Edit</button>
                                        <button onclick="resetStudentSession(2, 'Priya Sharma')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px; color:var(--primary);" title="Reset Session"><i class="fa-solid fa-rotate-right"></i> Reset</button>
                                    </td>
                                </tr>
                                <tr id="attStudentRow3">
                                    <td><strong>Aditya Bose</strong><br><span style="font-size:9px; color:var(--text-tertiary);">CSE23115</span></td>
                                    <td id="attTime3">—</td>
                                    <td><span id="attBadge3" style="padding:2px 6px; background:rgba(239, 68, 68, 0.15); color:#ef4444; border-radius:4px; font-weight:600;">Absent</span></td>
                                    <td id="attAns3" style="font-style:italic; color:var(--text-tertiary);">No response yet</td>
                                    <td style="text-align:right; display:flex; gap:6px; justify-content:flex-end;">
                                        <button onclick="toggleStudentAtt(3)" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px;"><i class="fa-solid fa-pen"></i> Edit</button>
                                        <button onclick="resetStudentSession(3, 'Aditya Bose')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px; color:var(--primary);" title="Reset Session"><i class="fa-solid fa-rotate-right"></i> Reset</button>
                                    </td>
                                </tr>
                                <tr id="attStudentRow4">
                                    <td><strong>Neha Sen</strong><br><span style="font-size:9px; color:var(--text-tertiary);">BCA23088</span></td>
                                    <td id="attTime4">—</td>
                                    <td><span id="attBadge4" style="padding:2px 6px; background:rgba(239, 68, 68, 0.15); color:#ef4444; border-radius:4px; font-weight:600;">Absent</span></td>
                                    <td id="attAns4" style="font-style:italic; color:var(--text-tertiary);">No response yet</td>
                                    <td style="text-align:right; display:flex; gap:6px; justify-content:flex-end;">
                                        <button onclick="toggleStudentAtt(4)" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px;"><i class="fa-solid fa-pen"></i> Edit</button>
                                        <button onclick="resetStudentSession(4, 'Neha Sen')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px; color:var(--primary);" title="Reset Session"><i class="fa-solid fa-rotate-right"></i> Reset</button>
                                    </td>
                                </tr>
                                <tr id="attStudentRow5">
                                    <td><strong>Amit Roy</strong><br><span style="font-size:9px; color:var(--text-tertiary);">CSE23045</span></td>
                                    <td id="attTime5">—</td>
                                    <td><span id="attBadge5" style="padding:2px 6px; background:#f59e0b; color:white; border-radius:4px; font-weight:600;">Session Interrupted</span></td>
                                    <td id="attAns5" style="font-style:italic; color:#ef4444;">Interrupted (Locked out)</td>
                                    <td style="text-align:right; display:flex; gap:6px; justify-content:flex-end;">
                                        <button onclick="toggleStudentAtt(5)" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px;"><i class="fa-solid fa-pen"></i> Edit</button>
                                        <button onclick="resetStudentSession(5, 'Amit Roy')" class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:10px; color:var(--primary);" title="Reset Session"><i class="fa-solid fa-rotate-right"></i> Reset</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,
        jsContent: `
            // Global toast helper
            window.showToast = function(msg) {
                const toast = document.getElementById("toastNotification");
                const toastMsg = document.getElementById("toastMessage");
                if (toast && toastMsg) {
                    toastMsg.textContent = msg;
                    toast.style.display = "flex";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 4000);
                }
            };

            // Global function to remove validation questions
            window.removeQuestionRow = function(btn) {
                const row = btn.closest(".question-row");
                const container = document.getElementById("questionsContainer");
                if (container.children.length > 1) {
                    row.remove();
                    reindexQuestions();
                }
            };

            function reindexQuestions() {
                const container = document.getElementById("questionsContainer");
                const rows = container.getElementsByClassName("question-row");
                Array.from(rows).forEach((row, i) => {
                    const idx = i + 1;
                    row.setAttribute("data-index", idx);
                    row.querySelector("span").textContent = "Q" + idx;
                    // Show delete button if more than 1 question exists
                    const delBtn = row.querySelector("button");
                    if (delBtn) {
                        delBtn.style.display = rows.length > 1 ? "block" : "none";
                    }
                });
            }

            // Global function to toggle attendance status manually
            window.toggleStudentAtt = function(id) {
                const badge = document.getElementById("attBadge" + id);
                const timeCell = document.getElementById("attTime" + id);
                const ansCell = document.getElementById("attAns" + id);
                
                if (badge && timeCell && ansCell) {
                    const isAbsent = badge.textContent.trim().toLowerCase() !== "present";
                    if (isAbsent) {
                        badge.textContent = "Present";
                        badge.style.background = "rgba(16, 185, 129, 0.15)";
                        badge.style.color = "#10b981";
                        // Set current time
                        const now = new Date();
                        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        timeCell.textContent = timeStr;
                        // Mock answer override if empty
                        if (ansCell.textContent.includes("No response") || ansCell.textContent.includes("Interrupted")) {
                            ansCell.innerHTML = "Overridden by faculty (All credits awarded)";
                            ansCell.style.fontStyle = "normal";
                            ansCell.style.color = "var(--text-secondary)";
                        }
                    } else {
                        badge.textContent = "Absent";
                        badge.style.background = "rgba(239, 68, 68, 0.15)";
                        badge.style.color = "#ef4444";
                        timeCell.textContent = "—";
                        ansCell.textContent = "No response yet";
                        ansCell.style.fontStyle = "italic";
                        ansCell.style.color = "var(--text-tertiary)";
                    }
                }
            };

            // Global function to reset student session to allow retake
            window.resetStudentSession = function(id, studentName) {
                const badge = document.getElementById("attBadge" + id);
                const timeCell = document.getElementById("attTime" + id);
                const ansCell = document.getElementById("attAns" + id);
                
                if (badge && timeCell && ansCell) {
                    badge.textContent = "Ready to Retake";
                    badge.style.background = "rgba(99, 102, 241, 0.15)";
                    badge.style.color = "var(--primary)";
                    
                    timeCell.textContent = "—";
                    ansCell.textContent = "Session unlocked. Student can start quiz again.";
                    ansCell.style.fontStyle = "italic";
                    ansCell.style.color = "var(--primary)";
                    
                    showToast("Success: Session reset for " + studentName + ". Ready to retake!");
                }
            };

            document.addEventListener("DOMContentLoaded", () => {
                const btn = document.getElementById("generateCodeBtn");
                const select = document.getElementById("lectureSelect");
                const codeBlock = document.getElementById("codeDisplayBlock");
                const activeCode = document.getElementById("activeValidationCode");
                const countdownText = document.getElementById("timerCountdownText");
                const timerInput = document.getElementById("expiryTimerInput");
                const addQBtn = document.getElementById("addQuestionBtn");
                const qContainer = document.getElementById("questionsContainer");

                let simulationInterval = null;

                // Add Question handler
                if (addQBtn && qContainer) {
                    addQBtn.addEventListener("click", () => {
                        const currentCount = qContainer.children.length;
                        if (currentCount >= 5) {
                            alert("You can add up to 5 questions only!");
                            return;
                        }
                        const newIdx = currentCount + 1;
                        const newRow = document.createElement("div");
                        newRow.className = "question-row";
                        newRow.setAttribute("data-index", newIdx);
                        newRow.style.display = "flex";
                        newRow.style.flexDirection = "column";
                        newRow.style.gap = "8px";
                        newRow.style.borderBottom = "1px dashed var(--border-color)";
                        newRow.style.paddingBottom = "12px";
                        newRow.style.animation = "fadeIn 0.2s ease";
                        newRow.innerHTML = \`
                            <div style="display:flex; gap:12px; align-items:center;">
                                <span style="font-family:monospace; font-weight:bold; color:var(--primary); font-size:12px; width:15px;">Q\${newIdx}</span>
                                <input type="text" class="form-input q-text" placeholder="Add validation question..." style="flex:1; height:36px; background-color: var(--bg-secondary); font-size:12px;">
                                <input type="number" class="form-input q-credits" value="5" min="1" max="50" style="width:70px; height:36px; background-color: var(--bg-secondary); font-size:12px;" title="Credit points">
                                <span style="font-size:10px; color:var(--text-tertiary);">Credits</span>
                                <button type="button" onclick="removeQuestionRow(this)" class="btn btn-secondary btn-sm" style="padding:4px 8px; height:36px; color:#ef4444;"><i class="fa-solid fa-trash"></i></button>
                            </div>
                            <div style="display:flex; gap:10px; margin-left:27px;">
                                <input type="text" class="form-input q-optA" placeholder="Option A" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                                <input type="text" class="form-input q-optB" placeholder="Option B" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                                <input type="text" class="form-input q-optC" placeholder="Option C" style="flex:1; height:30px; background-color: var(--bg-tertiary); font-size:11px;">
                            </div>
                        \`;
                        qContainer.appendChild(newRow);
                        reindexQuestions();
                    });
                }

                if (btn) {
                    btn.addEventListener("click", () => {
                        if (!select.value) {
                            alert("Please select a class first!");
                            return;
                        }
                        
                        // Clear previous simulation if active
                        if (simulationInterval) clearInterval(simulationInterval);
                        
                        // Setup Active Code & Timer
                        const randomCodes = ["NET77", "DB99", "VLSI45", "COMP88"];
                        const chosen = randomCodes[Math.floor(Math.random() * randomCodes.length)];
                        activeCode.textContent = chosen;
                        countdownText.textContent = timerInput.value || "10";
                        codeBlock.style.display = "block";
                        
                        // Reset all students
                        for (let i = 1; i <= 5; i++) {
                            const badge = document.getElementById("attBadge" + i);
                            const timeCell = document.getElementById("attTime" + i);
                            const ansCell = document.getElementById("attAns" + i);
                            if (badge) {
                                // Keep student 5 interrupted for simulation start
                                if (i === 5) {
                                    badge.textContent = "Session Interrupted";
                                    badge.style.background = "#f59e0b";
                                    badge.style.color = "white";
                                } else {
                                    badge.textContent = "Absent";
                                    badge.style.background = "rgba(239, 68, 68, 0.15)";
                                    badge.style.color = "#ef4444";
                                }
                            }
                            if (timeCell) timeCell.textContent = "—";
                            if (ansCell) {
                                if (i === 5) {
                                    ansCell.textContent = "Interrupted (Locked out)";
                                    ansCell.style.fontStyle = "italic";
                                    ansCell.style.color = "#ef4444";
                                } else {
                                    ansCell.textContent = "No response yet";
                                    ansCell.style.fontStyle = "italic";
                                    ansCell.style.color = "var(--text-tertiary)";
                                }
                            }
                        }

                        // Read active questions
                        const qRows = qContainer.getElementsByClassName("question-row");
                        const activeQuestions = [];
                        let totalCreditWeight = 0;
                        Array.from(qRows).forEach(row => {
                            const txt = row.querySelector(".q-text").value.trim() || "Validation Question";
                            const cr = parseInt(row.querySelector(".q-credits").value) || 5;
                            const optA = row.querySelector(".q-optA").value.trim() || "";
                            const optB = row.querySelector(".q-optB").value.trim() || "";
                            const optC = row.querySelector(".q-optC").value.trim() || "";
                            activeQuestions.push({ text: txt, credits: cr, optA: optA, optB: optB, optC: optC });
                            totalCreditWeight += cr;
                        });

                        // Publish Dynamic Session to localStorage
                        const activeSession = {
                            code: chosen,
                            lecture: select.value,
                            expiry: timerInput.value,
                            questions: activeQuestions,
                            totalCredits: totalCreditWeight
                        };
                        localStorage.setItem("activeAttendanceSession", JSON.stringify(activeSession));
                        localStorage.removeItem("liveStudentResponses"); // Reset past records

                        // Simulation student answers
                        const mockStudentAnswers = [
                            ["A) Unique & Not Null", "Option A", "A) Self-attention", "Option A", "A) Contiguous"],
                            ["A) Unique & Not Null", "Option A", "A) Gradients", "Option B", "A) LIFO"],
                            ["B) Allows Null", "Option B", "Option A", "Option A", "Option A"],
                            ["A) Unique & Not Null", "Option A", "Option B", "Option A", "Option B"]
                        ];

                        // Simulation check-in (Only students 1-4, student 5 stays interrupted until manually reset!)
                        let studentIndex = 1;
                        simulationInterval = setInterval(() => {
                            // Check if student checked in via student portal, if yes, skip mock simulation
                            const liveResponses = JSON.parse(localStorage.getItem("liveStudentResponses")) || [];
                            
                            if (studentIndex <= 4) {
                                const hasRealResponse = liveResponses.some(r => r.studentName.toLowerCase().includes("vikram") && studentIndex === 1);
                                if (!hasRealResponse) {
                                    toggleStudentAtt(studentIndex);
                                    
                                    // Build responses lists
                                    const ansCell = document.getElementById("attAns" + studentIndex);
                                    if (ansCell) {
                                        let htmlResponse = "<div style='display:flex; flex-direction:column; gap:4px;'>";
                                        activeQuestions.forEach((q, qIdx) => {
                                            const ansText = mockStudentAnswers[studentIndex - 1][qIdx] || q.optA;
                                            htmlResponse += "<div style='margin-bottom:2px;'>" +
                                                "<span style='color:var(--primary); font-weight:700;'>Q" + (qIdx+1) + ":</span> Selected: " + ansText + " " +
                                                "<span style='color:var(--accent); font-size:9px; margin-left:5px;'>(" + q.credits + " Credits)</span>" +
                                            "</div>";
                                        });
                                        htmlResponse += "<div style='border-top:1px dashed var(--border-color); padding-top:4px; font-weight:bold; font-size:10px;'>" +
                                            "Total Earned: <span style='color:#10b981;'>" + totalCreditWeight + " Points</span>" +
                                        "</div>";
                                        htmlResponse += "</div>";
                                        
                                        ansCell.innerHTML = htmlResponse;
                                        ansCell.style.fontStyle = "normal";
                                        ansCell.style.color = "var(--text-secondary)";
                                    }
                                }
                                studentIndex++;
                            } else {
                                clearInterval(simulationInterval);
                            }
                        }, 2000);
                    });
                }

                // Poll localStorage every 1.5 seconds for real student submissions
                setInterval(() => {
                    const activeSession = JSON.parse(localStorage.getItem("activeAttendanceSession"));
                    if (!activeSession) return;

                    const liveResponses = JSON.parse(localStorage.getItem("liveStudentResponses")) || [];
                    liveResponses.forEach(resp => {
                        let targetIndex = 0;
                        if (resp.studentName.toLowerCase().includes("vikram") || resp.studentName.toLowerCase().includes("aditya")) {
                            targetIndex = 1; // Vikram Kumawat maps to row 1
                        }

                        if (targetIndex > 0) {
                            const badge = document.getElementById("attBadge" + targetIndex);
                            const timeCell = document.getElementById("attTime" + targetIndex);
                            const ansCell = document.getElementById("attAns" + targetIndex);
                            
                            if (badge && timeCell && ansCell) {
                                badge.textContent = "Present";
                                badge.style.background = "rgba(16, 185, 129, 0.15)";
                                badge.style.color = "#10b981";
                                timeCell.textContent = resp.time;

                                let htmlResponse = "<div style='display:flex; flex-direction:column; gap:4px;'>";
                                resp.answers.forEach((ansVal, qIdx) => {
                                    htmlResponse += "<div style='margin-bottom:2px;'>" +
                                        "<span style='color:var(--primary); font-weight:700;'>Q" + (qIdx + 1) + ":</span> Selected: " + ansVal +
                                    "</div>";
                                });
                                htmlResponse += "<div style='border-top:1px dashed var(--border-color); padding-top:4px; font-weight:bold; font-size:10px;'>" +
                                    "Total Earned: <span style='color:#10b981;'>" + resp.credits + " Points</span>" +
                                "</div>";
                                htmlResponse += "</div>";

                                ansCell.innerHTML = htmlResponse;
                                ansCell.style.fontStyle = "normal";
                                ansCell.style.color = "var(--text-secondary)";
                            }
                        }
                    });
                }, 1500);
            });
        `
    },
    marks: {
        htmlContent: `
            <div class="dashboard-card glassmorphism" style="margin-bottom:30px; height:auto;">
                <h3 style="border-bottom:none; margin-bottom:0; padding-bottom:0;">
                    <i class="fa-solid fa-file-signature"></i> Final Marks & Grade Upload Portal
                </h3>
                <p style="color:var(--text-secondary); font-size:13px; margin-top:5px; margin-bottom:20px;">
                    Select student cohorts, choose subject records, or import bulk evaluations directly from Google Excel sheets. Grades, averages, and credits calculate dynamically.
                </p>

                <!-- Configuration & Import Panel -->
                <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:25px;">
                    <!-- Filter Options -->
                    <div class="glassmorphism" style="padding:20px; border:1px solid var(--border-color); border-radius:var(--border-radius-sm); display:flex; flex-direction:column; justify-content:space-between;">
                        <h4 style="font-size:14px; margin-bottom:15px; color:var(--primary); font-weight:700;"><i class="fa-solid fa-sliders"></i> Cohort & Subject Selection</h4>
                        
                        <div style="display:grid; grid-template-columns:1fr 1.2fr 0.8fr; gap:15px; margin-bottom:15px;">
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Academic Year</label>
                                <select id="yearSelect" class="form-input" style="height:38px; font-size:12px;">
                                    <option value="1">1st Year (BCA / B.Tech)</option>
                                    <option value="2" selected>2nd Year (BCA / B.Tech)</option>
                                    <option value="3">3rd Year (BCA / B.Tech)</option>
                                    <option value="4">4th Year (B.Tech)</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Subject Taught</label>
                                <select id="subjectSelect" class="form-input" style="height:38px; font-size:12px;">
                                    <!-- Populated dynamically -->
                                </select>
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Subject Code</label>
                                <input type="text" id="subjectCodeDisplay" class="form-input" style="height:38px; font-size:12px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); color:var(--primary); font-weight:700; text-align:center;" readonly value="">
                            </div>
                        </div>

                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:10px 15px; border-radius:6px; border:1px solid var(--border-color);">
                            <span style="font-size:11px; color:var(--text-tertiary);">Current ERP Status: <strong id="erpStatusBadge" style="color:#f59e0b;">Pending Submission</strong></span>
                            <span style="font-size:11px; color:var(--text-tertiary);">Selected Credits: <strong id="erpSubjectCredits" style="color:var(--accent);">4 Credits</strong></span>
                        </div>
                    </div>

                    <!-- Drag & Drop Bulk Import -->
                    <div id="dropzone" class="glassmorphism" style="padding:25px 20px; border:2px dashed var(--primary); border-radius:var(--border-radius-sm); text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer; background:rgba(99, 102, 241, 0.02); transition:all 0.3s ease;">
                        <i class="fa-solid fa-file-excel" style="font-size:32px; color:#10b981; margin-bottom:10px;"></i>
                        <h4 style="font-size:13px; font-weight:700; margin-bottom:4px;">Import Google Sheets</h4>
                        <p style="font-size:10px; color:var(--text-secondary); line-height:1.3; max-width:280px; margin:0 auto 10px auto;">
                            Drag & drop your Excel .xlsx or CSV sheet, or click here to auto-fill the grid
                        </p>
                        <input type="file" id="excelFile" accept=".csv, .xlsx, .xls" style="display:none;">
                        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('excelFile').click()" style="font-size:10px; padding:4px 10px; height:28px;">Browse File</button>
                    </div>
                </div>

                <!-- Marks spreadsheet section -->
                <div class="glassmorphism" style="border:1px solid var(--border-color); border-radius:var(--border-radius-sm); overflow:hidden;">
                    <div style="padding:15px 20px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.01);">
                        <strong style="font-size:13px;"><i class="fa-solid fa-table-list" style="color:var(--primary); margin-right:5px;"></i> Evaluation Grading Grid</strong>
                        <span style="font-size:11px; color:var(--text-tertiary);">Note: Enter marks inside cells. Totals & grades update in real-time.</span>
                    </div>

                    <div class="table-responsive">
                        <table class="excel-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
                            <thead>
                                <tr>
                                    <th rowspan="2" style="width:180px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Student Details</th>
                                    <th colspan="3" style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); background:rgba(99, 102, 241, 0.05);">Internal Marks (50)</th>
                                    <th rowspan="2" style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); background:rgba(236, 72, 153, 0.05); width:80px;">Practical (50)</th>
                                    <th rowspan="2" style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); background:rgba(168, 85, 247, 0.05); width:85px;">External (100)</th>
                                    <th rowspan="2" style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:80px;">Total (200)</th>
                                    <th rowspan="2" style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:75px;">Credits</th>
                                    <th rowspan="2" style="text-align:center; border-bottom:1px solid var(--border-color); width:75px;">Grade</th>
                                </tr>
                                <tr>
                                    <th style="text-align:center; font-size:10px; width:75px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Mid-Term 1 (20)</th>
                                    <th style="text-align:center; font-size:10px; width:75px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Mid-Term 2 (20)</th>
                                    <th style="text-align:center; font-size:10px; width:75px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Attendance (10)</th>
                                </tr>
                            </thead>
                            <tbody id="marksGridBody">
                                <!-- Loaded dynamically via year select -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Action Controls -->
                <div style="display:flex; justify-content:space-between; margin-top:25px; align-items:center; flex-wrap:wrap; gap:15px;">
                    <div>
                        <button type="button" class="btn btn-secondary btn-sm" id="exportExcelBtn" style="gap:6px;"><i class="fa-solid fa-file-arrow-down" style="color:#10b981;"></i> Export Template</button>
                        <button type="button" class="btn btn-secondary btn-sm" id="resetGridBtn" style="margin-left:10px;">Reset Grid</button>
                    </div>
                    <div style="display:flex; gap:12px;">
                        <button type="button" class="btn btn-secondary" id="saveDraftBtn">Save Draft</button>
                        <button type="button" class="btn btn-primary" id="submitErpBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent));">Submit final marks to ERP</button>
                    </div>
                </div>
            </div>

            <!-- ERP Submission Confirmation Modal -->
            <div id="erpConfirmModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center; backdrop-filter:blur(4px);">
                <div class="glassmorphism" style="width:450px; padding:30px; border:1px solid var(--border-glass); border-radius:var(--border-radius-md); background:var(--bg-primary); text-align:center; box-shadow:var(--glass-shadow); animation:fadeIn 0.3s ease;">
                    <i class="fa-solid fa-circle-exclamation" style="font-size:42px; color:#f59e0b; margin-bottom:15px;"></i>
                    <h3 style="font-size:18px; font-weight:800; margin-bottom:10px; border:none; padding:0;">Confirm ERP Submission</h3>
                    <p style="color:var(--text-secondary); font-size:13px; line-height:1.5; margin-bottom:25px;">
                        Are you sure you want to lock and submit these grades to the University Controller of Examinations? This action is <strong style="color:#ef4444;">irreversible</strong> and will publish grades directly to students' ERP accounts.
                    </p>
                    <div style="display:flex; gap:12px; justify-content:center;">
                        <button type="button" class="btn btn-secondary" id="cancelModalBtn" style="padding:10px 24px;">Cancel</button>
                        <button type="button" class="btn btn-primary" id="confirmModalBtn" style="padding:10px 24px; background:#ef4444; border-color:#ef4444;">Confirm & Publish</button>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .excel-table th {
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 10px 12px;
                font-weight: 700;
                border-bottom: 1px solid var(--border-color);
                box-sizing: border-box;
            }
            .excel-table td {
                padding: 8px 12px;
                border-bottom: 1px solid var(--border-color);
                vertical-align: middle;
                color: var(--text-secondary);
                box-sizing: border-box;
            }
            .excel-table tr:hover td {
                background: rgba(255, 255, 255, 0.01);
            }
            .excel-input {
                width: 100%;
                height: 30px;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                background: var(--bg-secondary);
                color: var(--text-primary);
                text-align: center;
                font-family: monospace;
                font-size: 13px;
                box-sizing: border-box;
                transition: border-color 0.2s ease;
            }
            .excel-input:focus {
                border-color: var(--primary);
                outline: none;
                background: var(--bg-tertiary);
            }
            .badge-grade {
                padding: 3px 8px;
                border-radius: 4px;
                font-weight: 700;
                font-size: 11px;
                display: inline-block;
                text-align: center;
                min-width: 25px;
            }
            .grade-O { background: rgba(16, 185, 129, 0.15); color: #10b981; }
            .grade-A { background: rgba(99, 102, 241, 0.15); color: var(--primary); }
            .grade-B { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
            .grade-C { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
            .grade-D { background: rgba(100, 116, 139, 0.15); color: #64748b; }
            .grade-F { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        `,
        jsContent: `
            // Global toast helper
            window.showToast = function(msg) {
                const toast = document.getElementById("toastNotification");
                const toastMsg = document.getElementById("toastMessage");
                if (toast && toastMsg) {
                    toastMsg.textContent = msg;
                    toast.style.display = "flex";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 4000);
                }
            };

            document.addEventListener("DOMContentLoaded", () => {
                const yearSelect = document.getElementById("yearSelect");
                const subjectSelect = document.getElementById("subjectSelect");
                const erpSubjectCredits = document.getElementById("erpSubjectCredits");
                const marksGridBody = document.getElementById("marksGridBody");
                
                // Subjects taught by professor sorted by Year
                const subjectsByYear = {
                    "1": [
                        { code: "CS-101", name: "Computer Programming", credits: 3 },
                        { code: "EC-102", name: "Digital Electronics", credits: 4 }
                    ],
                    "2": [
                        { code: "DBMS-301", name: "Database Management Systems", credits: 4 },
                        { code: "CS-302", name: "Data Structures & Algorithms", credits: 4 }
                    ],
                    "3": [
                        { code: "WT-591", name: "Web Technology Lab", credits: 3 },
                        { code: "CS-502", name: "Operating Systems", credits: 4 }
                    ],
                    "4": [
                        { code: "NN-702", name: "Neural Networks & Deep Learning", credits: 4 },
                        { code: "EC-791", name: "VLSI Design Lab", credits: 3 }
                    ]
                };

                // Students Lists categorized by Subject Taught (Class)
                const studentsBySubject = {
                    "CS-101": [
                        { name: "Rahul Verma", id: "CSE25001" },
                        { name: "Sneha Nair", id: "CSE25042" },
                        { name: "Kunal Sen", id: "BCA25011" },
                        { name: "Aman Gupta", id: "CSE25099" }
                    ],
                    "EC-102": [
                        { name: "Sneha Nair", id: "CSE25042" },
                        { name: "Kunal Sen", id: "BCA25011" },
                        { name: "Aarti Mehta", id: "ECE25088" },
                        { name: "Vicky Singh", id: "ECE25102" }
                    ],
                    "DBMS-301": [
                        { name: "Vikram Kumawat", id: "BCA23015" },
                        { name: "Priya Sharma", id: "CSE23099" },
                        { name: "Aditya Bose", id: "CSE23115" },
                        { name: "Neha Sen", id: "BCA23088" },
                        { name: "Amit Roy", id: "CSE23045" }
                    ],
                    "CS-302": [
                        { name: "Rohan Das", id: "CSE23002" },
                        { name: "Meera Patel", id: "CSE23055" },
                        { name: "Vikram Kumawat", id: "BCA23015" },
                        { name: "Priya Sharma", id: "CSE23099" }
                    ],
                    "WT-591": [
                        { name: "Deepak Joshi", id: "CSE22019" },
                        { name: "Riya Kapoor", id: "BCA22035" },
                        { name: "Tanmay Shah", id: "CSE22071" }
                    ],
                    "CS-502": [
                        { name: "Deepak Joshi", id: "CSE22019" },
                        { name: "Riya Kapoor", id: "BCA22035" },
                        { name: "Kabir Khan", id: "CSE22055" },
                        { name: "Pooja Rao", id: "CSE22102" }
                    ],
                    "NN-702": [
                        { name: "Harsh Vardhan", id: "CSE21004" },
                        { name: "Ananya Iyer", id: "CSE21088" },
                        { name: "Sameer Sen", id: "CSE21101" }
                    ],
                    "EC-791": [
                        { name: "Harsh Vardhan", id: "CSE21004" },
                        { name: "Ananya Iyer", id: "CSE21088" },
                        { name: "Divya Teja", id: "ECE21088" }
                    ]
                };

                // Update subject options when Year selection changes
                function updateSubjects() {
                    const year = yearSelect.value;
                    const subjects = subjectsByYear[year] || [];
                    subjectSelect.innerHTML = subjects.map(sub => 
                        '<option value="' + sub.code + '" data-credits="' + sub.credits + '">' + sub.name + ' (' + sub.code + ')</option>'
                    ).join("");
                    
                    updateCredits();
                    renderStudentsGrid();
                }

                function updateCredits() {
                    const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
                    if (selectedOption) {
                        const credits = selectedOption.getAttribute("data-credits");
                        erpSubjectCredits.textContent = credits + " Credits";
                        
                        const codeDisplay = document.getElementById("subjectCodeDisplay");
                        if (codeDisplay) {
                            codeDisplay.value = subjectSelect.value;
                        }
                    }
                }

                // Render student marks edit spreadsheet
                function renderStudentsGrid() {
                    const subjectCode = subjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];
                    
                    if (students.length === 0) {
                        marksGridBody.innerHTML = '<tr><td colspan="9" style="text-align:center; color:var(--text-tertiary);">No student records found.</td></tr>';
                        return;
                    }

                    // Check for saved draft data in localStorage first
                    const draftKey = "draftMarks_" + subjectSelect.value;
                    const draftData = JSON.parse(localStorage.getItem(draftKey)) || null;

                    // Predefined mock marks to avoid empty cells on initial load
                    const mockScores = {
                        "BCA23015": { mt1: 18, mt2: 17, att: 9, prac: 45, ext: 88, cr: 4 },
                        "CSE23099": { mt1: 15, mt2: 16, att: 8, prac: 42, ext: 78, cr: 4 },
                        "CSE23115": { mt1: 14, mt2: 15, att: 7, prac: 40, ext: 81, cr: 4 },
                        "BCA23088": { mt1: 17, mt2: 19, att: 10, prac: 46, ext: 92, cr: 4 },
                        "CSE23045": { mt1: 12, mt2: 14, att: 6, prac: 38, ext: 65, cr: 4 }
                    };

                    marksGridBody.innerHTML = students.map((stu, index) => {
                        // Use draft score if available, else legacy scores
                        let score = (draftData && draftData[stu.id]) ? draftData[stu.id] : (mockScores[stu.id] || { mt1: 15, mt2: 15, att: 8, prac: 40, ext: 75, cr: 4 });
                        
                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + stu.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + stu.id + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-mt1" value="' + score.mt1 + '" min="0" max="20" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-mt2" value="' + score.mt2 + '" min="0" max="20" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-att" value="' + score.att + '" min="0" max="10" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-prac" value="' + score.prac + '" min="0" max="50" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-ext" value="' + score.ext + '" min="0" max="100" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace; font-weight:700;" class="val-total">0</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace; font-weight:700;" class="val-credits">0</td>' +
                            '<td style="text-align:center;"><span class="badge-grade val-grade">F</span></td>' +
                            '</tr>';
                    }).join("");

                    // Calculate initial totals for all loaded rows
                    const rows = marksGridBody.getElementsByTagName("tr");
                    Array.from(rows).forEach(row => {
                        const mt1Input = row.querySelector(".val-mt1");
                        if (mt1Input) recalcRow(mt1Input);
                    });
                }

                // Calculation logic inside spreadsheet cells
                window.recalcRow = function(inputEl) {
                    const row = inputEl.closest("tr");
                    if (!row) return;

                    const mt1 = Math.min(20, Math.max(0, parseInt(row.querySelector(".val-mt1").value) || 0));
                    const mt2 = Math.min(20, Math.max(0, parseInt(row.querySelector(".val-mt2").value) || 0));
                    const att = Math.min(10, Math.max(0, parseInt(row.querySelector(".val-att").value) || 0));
                    const prac = Math.min(50, Math.max(0, parseInt(row.querySelector(".val-prac").value) || 0));
                    const ext = Math.min(100, Math.max(0, parseInt(row.querySelector(".val-ext").value) || 0));

                    // Keep inputs bounded visually
                    row.querySelector(".val-mt1").value = mt1;
                    row.querySelector(".val-mt2").value = mt2;
                    row.querySelector(".val-att").value = att;
                    row.querySelector(".val-prac").value = prac;
                    row.querySelector(".val-ext").value = ext;

                    const total = mt1 + mt2 + att + prac + ext;
                    row.querySelector(".val-total").textContent = total;

                    // Calculate grade based on percentage (out of 200 max)
                    const percentage = (total / 200) * 100;
                    let grade = "F";
                    if (percentage >= 90) grade = "O";
                    else if (percentage >= 80) grade = "A";
                    else if (percentage >= 70) grade = "B";
                    else if (percentage >= 60) grade = "C";
                    else if (percentage >= 45) grade = "D";

                    const gradeBadge = row.querySelector(".val-grade");
                    gradeBadge.textContent = grade;
                    // Reset class colors
                    gradeBadge.className = "badge-grade val-grade grade-" + grade;

                    // Auto calculated credit points scale based on grade & subject base credits
                    const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
                    const subjectBaseCredits = selectedOption ? parseInt(selectedOption.getAttribute("data-credits")) : 4;
                    let earnedCredits = 0;
                    if (grade === "O") earnedCredits = subjectBaseCredits;
                    else if (grade === "A") earnedCredits = Math.round(subjectBaseCredits * 0.9 * 10) / 10;
                    else if (grade === "B") earnedCredits = Math.round(subjectBaseCredits * 0.8 * 10) / 10;
                    else if (grade === "C") earnedCredits = Math.round(subjectBaseCredits * 0.7 * 10) / 10;
                    else if (grade === "D") earnedCredits = Math.round(subjectBaseCredits * 0.6 * 10) / 10;
                    else earnedCredits = 0;

                    row.querySelector(".val-credits").textContent = earnedCredits;
                };

                // Drag & Drop event bindings
                const dropzone = document.getElementById("dropzone");
                if (dropzone) {
                    // Click drops simulation
                    dropzone.addEventListener("click", (e) => {
                        if (e.target.tagName !== "BUTTON") {
                            importMockSheet();
                        }
                    });

                    dropzone.addEventListener("dragover", (e) => {
                        e.preventDefault();
                        dropzone.style.background = "rgba(99, 102, 241, 0.08)";
                        dropzone.style.borderColor = "#10b981";
                    });

                    dropzone.addEventListener("dragleave", () => {
                        dropzone.style.background = "rgba(99, 102, 241, 0.02)";
                        dropzone.style.borderColor = "var(--primary)";
                    });

                    dropzone.addEventListener("drop", (e) => {
                        e.preventDefault();
                        dropzone.style.background = "rgba(99, 102, 241, 0.02)";
                        dropzone.style.borderColor = "var(--primary)";
                        
                        importMockSheet();
                    });
                }

                // File choose binding
                const excelFileInput = document.getElementById("excelFile");
                if (excelFileInput) {
                    excelFileInput.addEventListener("change", (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            if (!confirm("Are you sure you want to parse and import data from this CSV/Excel file?")) return;
                            
                            const reader = new FileReader();
                            reader.onload = function(evt) {
                                try {
                                    const text = evt.target.result;
                                    const lines = text.split(/\\r?\\n/);
                                    const importedData = {};
                                    
                                    lines.forEach((line, idx) => {
                                        if (idx === 0 || !line.trim()) return; // skip header
                                        const cols = line.split(",");
                                        if (cols.length >= 7) {
                                            const id = cols[1].trim();
                                            const mt1 = parseInt(cols[2]) || 0;
                                            const mt2 = parseInt(cols[3]) || 0;
                                            const att = parseInt(cols[4]) || 0;
                                            const prac = parseInt(cols[5]) || 0;
                                            const ext = parseInt(cols[6]) || 0;
                                            importedData[id] = { mt1, mt2, att, prac, ext };
                                        }
                                    });
                                    
                                    // Populate inputs in the current grid
                                    const rows = marksGridBody.getElementsByTagName("tr");
                                    let matchCount = 0;
                                    Array.from(rows).forEach(row => {
                                        const studentId = row.querySelector("td span").textContent.trim();
                                        if (importedData[studentId]) {
                                            const data = importedData[studentId];
                                            row.querySelector(".val-mt1").value = data.mt1;
                                            row.querySelector(".val-mt2").value = data.mt2;
                                            row.querySelector(".val-att").value = data.att;
                                            row.querySelector(".val-prac").value = data.prac;
                                            row.querySelector(".val-ext").value = data.ext;
                                            
                                            const inputVal = row.querySelector(".val-mt1");
                                            recalcRow(inputVal);
                                            matchCount++;
                                        }
                                    });
                                    showToast("Success: Imported " + matchCount + " student records from sheet!");
                                } catch (err) {
                                    showToast("Error parsing file format.");
                                }
                            };
                            reader.readAsText(file);
                        }
                    });
                }

                function importMockSheet() {
                    if (!confirm("Are you sure you want to import student marks from Google Excel Sheet?")) return;
                    showToast("Success: Imported student records from Google Sheets template!");
                    
                    // Populate with mock imported data
                    const rows = marksGridBody.getElementsByTagName("tr");
                    Array.from(rows).forEach(row => {
                        row.querySelector(".val-mt1").value = Math.floor(Math.random() * 5) + 15; // 15 to 20
                        row.querySelector(".val-mt2").value = Math.floor(Math.random() * 5) + 15; // 15 to 20
                        row.querySelector(".val-att").value = Math.floor(Math.random() * 3) + 8; // 8 to 10
                        row.querySelector(".val-prac").value = Math.floor(Math.random() * 10) + 40; // 40 to 50
                        row.querySelector(".val-ext").value = Math.floor(Math.random() * 20) + 75; // 75 to 95
                        
                        const inputVal = row.querySelector(".val-mt1");
                        recalcRow(inputVal);
                    });
                }

                // Button binds
                yearSelect.addEventListener("change", updateSubjects);
                subjectSelect.addEventListener("change", updateCredits);

                document.getElementById("exportExcelBtn").addEventListener("click", () => {
                    if (!confirm("Do you want to export the marks template CSV file for this cohort?")) return;

                    const subjectCode = subjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];
                    let csvContent = "Student Name,Enrollment ID,Mid-Term 1 (20),Mid-Term 2 (20),Attendance (10),Practical (50),External (100)\\n";
                    students.forEach(s => {
                        csvContent += s.name + "," + s.id + ",,,,,\\n";
                    });

                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute("download", "marks_template_" + subjectSelect.value + ".csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast("Success: Marks upload CSV template downloaded!");
                });

                document.getElementById("resetGridBtn").addEventListener("click", () => {
                    localStorage.removeItem("draftMarks_" + subjectSelect.value);
                    renderStudentsGrid();
                    showToast("Grid reset to default scores.");
                });

                document.getElementById("saveDraftBtn").addEventListener("click", () => {
                    const rows = marksGridBody.getElementsByTagName("tr");
                    const draftData = {};

                    Array.from(rows).forEach(row => {
                        const studentId = row.querySelector("td span").textContent.trim();
                        const mt1 = parseInt(row.querySelector(".val-mt1").value) || 0;
                        const mt2 = parseInt(row.querySelector(".val-mt2").value) || 0;
                        const att = parseInt(row.querySelector(".val-att").value) || 0;
                        const prac = parseInt(row.querySelector(".val-prac").value) || 0;
                        const ext = parseInt(row.querySelector(".val-ext").value) || 0;
                        const cr = parseFloat(row.querySelector(".val-credits").textContent) || 4;

                        draftData[studentId] = { mt1: mt1, mt2: mt2, att: att, prac: prac, ext: ext, cr: cr };
                    });

                    localStorage.setItem("draftMarks_" + subjectSelect.value, JSON.stringify(draftData));
                    showToast("Draft grades saved successfully to ERP local server.");
                });

                // ERP Confirmation Modal handling
                const erpConfirmModal = document.getElementById("erpConfirmModal");
                const submitErpBtn = document.getElementById("submitErpBtn");
                const cancelModalBtn = document.getElementById("cancelModalBtn");
                const confirmModalBtn = document.getElementById("confirmModalBtn");

                submitErpBtn.addEventListener("click", () => {
                    erpConfirmModal.style.display = "flex";
                });

                cancelModalBtn.addEventListener("click", () => {
                    erpConfirmModal.style.display = "none";
                });

                confirmModalBtn.addEventListener("click", () => {
                    erpConfirmModal.style.display = "none";
                    showToast("Success: Final grades submitted to ERP Controller database!");
                    
                    const statusBadge = document.getElementById("erpStatusBadge");
                    if (statusBadge) {
                        statusBadge.textContent = "Submitted to ERP";
                        statusBadge.style.color = "#10b981";
                    }
                    
                    // Disable all grid inputs
                    const inputs = marksGridBody.querySelectorAll("input");
                    inputs.forEach(input => {
                        input.disabled = true;
                    });
                    
                    // Disable actions
                    submitErpBtn.disabled = true;
                    submitErpBtn.style.opacity = "0.5";
                    submitErpBtn.style.cursor = "not-allowed";
                    document.getElementById("saveDraftBtn").disabled = true;
                    document.getElementById("saveDraftBtn").style.opacity = "0.5";
                    document.getElementById("saveDraftBtn").style.cursor = "not-allowed";
                    document.getElementById("resetGridBtn").disabled = true;
                    document.getElementById("resetGridBtn").style.opacity = "0.5";
                    document.getElementById("resetGridBtn").style.cursor = "not-allowed";
                    document.getElementById("dropzone").style.pointerEvents = "none";
                    document.getElementById("dropzone").style.opacity = "0.5";
                });

                // Run initial load
                updateSubjects();
            });
        `
    },
    results: {
        htmlContent: `
            <div class="dashboard-card glassmorphism" style="margin-bottom:30px; height:auto; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); transition: all 0.3s ease;">
                <h3 style="font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px; color:var(--primary);">
                    <i class="fa-solid fa-award" style="background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i> Class Semester Results Dashboard
                </h3>
                <p style="color:var(--text-secondary); font-size:13px; margin-top:5px; margin-bottom:20px;">
                    Monitor student academic performance, final grades, passing rates, and grade sheets filtered by Year, Semester, and assigned Course records.
                </p>

                <!-- Dynamic Results Filters Card -->
                <div class="glassmorphism" style="padding:22px; border:1px solid var(--border-color); border-radius:var(--border-radius-sm); margin-bottom:25px; background: rgba(255,255,255,0.01);">
                    <h4 style="font-size:13px; margin-bottom:15px; color:var(--primary); font-weight:700; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-filter"></i> Result Queries & Filters</h4>
                    
                    <div style="display:grid; grid-template-columns:1fr 1fr 1.2fr 0.8fr; gap:15px;">
                        <div>
                            <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Select Academic Year</label>
                            <select id="resYearSelect" class="form-input" style="height:38px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                <option value="1">1st Year (BCA / B.Tech)</option>
                                <option value="2" selected>2nd Year (BCA / B.Tech)</option>
                                <option value="3">3rd Year (BCA / B.Tech)</option>
                                <option value="4">4th Year (B.Tech)</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Select Semester</label>
                            <select id="resSemSelect" class="form-input" style="height:38px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                <!-- Populated dynamically -->
                            </select>
                        </div>
                        <div>
                            <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Assigned Subject Taught</label>
                            <select id="resSubjectSelect" class="form-input" style="height:38px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                <!-- Populated dynamically -->
                            </select>
                        </div>
                        <div>
                            <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Subject Code</label>
                            <input type="text" id="resSubjectCodeDisplay" class="form-input" style="height:38px; font-size:12px; background:rgba(99, 102, 241, 0.05); border:1px solid var(--border-color); color:var(--primary); font-weight:700; text-align:center; border-radius:6px;" readonly value="">
                        </div>
                    </div>
                </div>

                <!-- Overall Class Performance Stats Cards -->
                <div class="stats-row" style="margin-bottom:25px; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
                    <div class="stat-card glassmorphism" style="padding:18px 20px; display:flex; align-items:center; gap:15px; background:rgba(99, 102, 241, 0.03); border:1px solid rgba(99, 102, 241, 0.1); border-radius:8px;">
                        <i class="fa-solid fa-square-poll-vertical" style="font-size:24px; color:var(--primary);"></i>
                        <div>
                            <h3 id="resClassAverage" style="font-size:18px; font-weight:800; margin:0; color:var(--text-primary);">84.5%</h3>
                            <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Class Average Score</p>
                        </div>
                    </div>
                    <div class="stat-card glassmorphism" style="padding:18px 20px; display:flex; align-items:center; gap:15px; background:rgba(16, 185, 129, 0.03); border:1px solid rgba(16, 185, 129, 0.1); border-radius:8px;">
                        <i class="fa-solid fa-graduation-cap" style="font-size:24px; color:#10b981;"></i>
                        <div>
                            <h3 id="resPassRate" style="font-size:18px; font-weight:800; margin:0; color:#10b981;">100%</h3>
                            <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Passing Rate</p>
                        </div>
                    </div>
                    <div class="stat-card glassmorphism" style="padding:18px 20px; display:flex; align-items:center; gap:15px; background:rgba(245, 158, 11, 0.03); border:1px solid rgba(245, 158, 11, 0.1); border-radius:8px;">
                        <i class="fa-solid fa-users" style="font-size:24px; color:#f59e0b;"></i>
                        <div>
                            <h3 id="resTotalStudents" style="font-size:18px; font-weight:800; margin:0; color:#f59e0b;">5 Students</h3>
                            <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Cohort Size</p>
                        </div>
                    </div>
                    <div class="stat-card glassmorphism" style="padding:18px 20px; display:flex; align-items:center; gap:15px; background:rgba(168, 85, 247, 0.03); border:1px solid rgba(168, 85, 247, 0.1); border-radius:8px;">
                        <i class="fa-solid fa-star" style="font-size:24px; color:var(--accent);"></i>
                        <div>
                            <h3 id="resClassCredits" style="font-size:18px; font-weight:800; margin:0; color:var(--accent);">4.0</h3>
                            <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Subject Credits</p>
                        </div>
                    </div>
                </div>

                <!-- Results Spreadsheet Grading Grid -->
                <div class="glassmorphism" style="border:1px solid var(--border-color); border-radius:var(--border-radius-sm); overflow:hidden; background: rgba(255,255,255,0.01);">
                    <div style="padding:15px 20px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02);">
                        <strong style="font-size:13px; color:var(--text-primary);"><i class="fa-solid fa-table-list" style="color:var(--primary); margin-right:5px;"></i> Class Test Ledger Grid</strong>
                        <span style="font-size:11px; color:var(--text-tertiary);">Evaluation reports based on Class Test evaluations.</span>
                    </div>

                    <div class="table-responsive">
                        <table class="excel-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
                            <thead>
                                <tr>
                                    <th style="width:220px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Student Name</th>
                                    <th style="width:180px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Roll Number / Enrollment ID</th>
                                    <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:120px;">Class Test 1 (20)</th>
                                    <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:120px;">Class Test 2 (20)</th>
                                    <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:120px;">Class Test 3 (20)</th>
                                    <th style="text-align:center; border-bottom:1px solid var(--border-color); width:130px;">Total CT Score (60)</th>
                                </tr>
                            </thead>
                            <tbody id="resultsGridBody">
                                <!-- Loaded dynamically via Subject select -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Action Button for Exporting class grade card sheet -->
                <div style="display:flex; justify-content:flex-end; margin-top:20px;">
                    <button type="button" class="btn btn-primary" id="exportGradeSheetBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); gap:6px; border-radius:6px; font-weight:600; padding:10px 20px;">
                        <i class="fa-solid fa-file-csv"></i> Export Class Test Ledger (CSV)
                    </button>
                </div>
            </div>
        `,
        cssContent: `
            .excel-table th {
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 12px 15px;
                font-weight: 700;
                border-bottom: 1px solid var(--border-color);
                box-sizing: border-box;
            }
            .excel-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
                vertical-align: middle;
                color: var(--text-secondary);
                box-sizing: border-box;
            }
            .excel-table tr:hover td {
                background: rgba(255, 255, 255, 0.02);
            }
        `,
        jsContent: `
            // Log local storage errors for debugging in pair programming
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Robust dynamic toast creator
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initResults() {
                const resYearSelect = document.getElementById("resYearSelect");
                const resSemSelect = document.getElementById("resSemSelect");
                const resSubjectSelect = document.getElementById("resSubjectSelect");
                const resSubjectCodeDisplay = document.getElementById("resSubjectCodeDisplay");
                const resultsGridBody = document.getElementById("resultsGridBody");

                const resClassAverage = document.getElementById("resClassAverage");
                const resPassRate = document.getElementById("resPassRate");
                const resTotalStudents = document.getElementById("resTotalStudents");
                const resClassCredits = document.getElementById("resClassCredits");

                // Mapping of semester options based on Year selection
                const semestersByYear = {
                    "1": [ { val: "1", text: "Semester 1" }, { val: "2", text: "Semester 2" } ],
                    "2": [ { val: "3", text: "Semester 3" }, { val: "4", text: "Semester 4" } ],
                    "3": [ { val: "5", text: "Semester 5" }, { val: "6", text: "Semester 6" } ],
                    "4": [ { val: "7", text: "Semester 7" }, { val: "8", text: "Semester 8" } ]
                };

                // Assigned subjects mapped by Year-Semester keys
                const subjectsBySem = {
                    "1-1": [ { code: "CS-101", name: "Computer Programming", credits: 3 } ],
                    "1-2": [ { code: "EC-102", name: "Digital Electronics", credits: 4 } ],
                    "2-3": [ { code: "DBMS-301", name: "Database Management Systems", credits: 4 } ],
                    "2-4": [ { code: "CS-302", name: "Data Structures & Algorithms", credits: 4 } ],
                    "3-5": [ { code: "WT-591", name: "Web Technology Lab", credits: 3 } ],
                    "3-6": [ { code: "CS-502", name: "Operating Systems", credits: 4 } ],
                    "4-7": [ { code: "NN-702", name: "Neural Networks & Deep Learning", credits: 4 } ],
                    "4-8": [ { code: "EC-791", name: "VLSI Design Lab", credits: 3 } ]
                };

                // Students mapping by Subject Taught
                const studentsBySubject = {
                    "CS-101": [
                        { name: "Rahul Verma", id: "CSE25001" },
                        { name: "Sneha Nair", id: "CSE25042" },
                        { name: "Kunal Sen", id: "BCA25011" },
                        { name: "Aman Gupta", id: "CSE25099" }
                    ],
                    "EC-102": [
                        { name: "Sneha Nair", id: "CSE25042" },
                        { name: "Kunal Sen", id: "BCA25011" },
                        { name: "Aarti Mehta", id: "ECE25088" },
                        { name: "Vicky Singh", id: "ECE25102" }
                    ],
                    "DBMS-301": [
                        { name: "Vikram Kumawat", id: "BCA23015" },
                        { name: "Priya Sharma", id: "CSE23099" },
                        { name: "Aditya Bose", id: "CSE23115" },
                        { name: "Neha Sen", id: "BCA23088" },
                        { name: "Amit Roy", id: "CSE23045" }
                    ],
                    "CS-302": [
                        { name: "Rohan Das", id: "CSE23002" },
                        { name: "Meera Patel", id: "CSE23055" },
                        { name: "Vikram Kumawat", id: "BCA23015" },
                        { name: "Priya Sharma", id: "CSE23099" }
                    ],
                    "WT-591": [
                        { name: "Deepak Joshi", id: "CSE22019" },
                        { name: "Riya Kapoor", id: "BCA22035" },
                        { name: "Tanmay Shah", id: "CSE22071" }
                    ],
                    "CS-502": [
                        { name: "Deepak Joshi", id: "CSE22019" },
                        { name: "Riya Kapoor", id: "BCA22035" },
                        { name: "Kabir Khan", id: "CSE22055" },
                        { name: "Pooja Rao", id: "CSE22102" }
                    ],
                    "NN-702": [
                        { name: "Harsh Vardhan", id: "CSE21004" },
                        { name: "Ananya Iyer", id: "CSE21088" },
                        { name: "Sameer Sen", id: "CSE21101" }
                    ],
                    "EC-791": [
                        { name: "Harsh Vardhan", id: "CSE21004" },
                        { name: "Ananya Iyer", id: "CSE21088" },
                        { name: "Divya Teja", id: "ECE21088" }
                    ]
                };

                // Default mock marks to fall back on if no draft exists
                const mockScores = {
                    "BCA23015": { mt1: 18, mt2: 17, att: 9, prac: 45, ext: 88, cr: 4 },
                    "CSE23099": { mt1: 15, mt2: 16, att: 8, prac: 42, ext: 78, cr: 4 },
                    "CSE23115": { mt1: 14, mt2: 15, att: 7, prac: 40, ext: 81, cr: 4 },
                    "BCA23088": { mt1: 17, mt2: 19, att: 10, prac: 46, ext: 92, cr: 4 },
                    "CSE23045": { mt1: 12, mt2: 14, att: 6, prac: 38, ext: 65, cr: 4 }
                };

                function updateSemesters() {
                    const year = resYearSelect.value;
                    const semesters = semestersByYear[year] || [];
                    resSemSelect.innerHTML = semesters.map(sem =>
                        '<option value="' + sem.val + '">' + sem.text + '</option>'
                    ).join("");
                    
                    updateSubjects();
                }

                function updateSubjects() {
                    const year = resYearSelect.value;
                    const sem = resSemSelect.value;
                    const key = year + "-" + sem;
                    
                    const subjects = subjectsBySem[key] || [];
                    resSubjectSelect.innerHTML = subjects.map(sub =>
                        '<option value="' + sub.code + '" data-credits="' + sub.credits + '">' + sub.name + ' (' + sub.code + ')</option>'
                    ).join("");

                    if (subjects.length > 0) {
                        resSubjectCodeDisplay.value = subjects[0].code;
                        resClassCredits.textContent = parseFloat(subjects[0].credits).toFixed(1);
                    } else {
                        resSubjectCodeDisplay.value = "N/A";
                        resClassCredits.textContent = "0.0";
                    }

                    renderResultsGrid();
                }

                function renderResultsGrid() {
                    const subjectCode = resSubjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];

                    if (students.length === 0) {
                        resultsGridBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-tertiary);">No result records found for this cohort.</td></tr>';
                        resClassAverage.textContent = "—";
                        resPassRate.textContent = "—";
                        resTotalStudents.textContent = "0 Students";
                        return;
                    }

                    // Check for draftMarks stored in localStorage
                    const draftKey = "draftMarks_" + subjectCode;
                    const draftData = JSON.parse(localStorage.getItem(draftKey)) || null;

                    let totalCTSum = 0;
                    let passCount = 0;

                    resultsGridBody.innerHTML = students.map(stu => {
                        let score = (draftData && draftData[stu.id]) ? draftData[stu.id] : (mockScores[stu.id] || { mt1: 15, mt2: 14, att: 8, prac: 38, ext: 72, cr: 4 });
                        
                        // Map internal MT1, MT2 and scale practical to 20 for CT3
                        const ct1 = score.mt1;
                        const ct2 = score.mt2;
                        const ct3 = Math.min(20, Math.round(score.prac / 2.5));
                        const totalCT = ct1 + ct2 + ct3;
                        totalCTSum += totalCT;

                        const passStatus = totalCT >= 30 ? "Pass" : "Fail"; // Pass marks 30 out of 60
                        if (totalCT >= 25) passCount++; // 25 out of 60 passing CT threshold

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + stu.name + '</strong></td>' +
                            '<td style="border-right:1px solid var(--border-color); font-family:monospace; font-weight:600;">' + stu.id + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + ct1 + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + ct2 + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + ct3 + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="text-align:center; font-family:monospace; font-weight:700; color:var(--primary);">' + totalCT + ' <span style="font-size:10px; color:var(--text-tertiary);">/60</span></td>' +
                            '</tr>';
                    }).join("");

                    // Render statistical summaries
                    const classAvg = ((totalCTSum / (students.length * 60)) * 100).toFixed(1);
                    resClassAverage.textContent = classAvg + "%";
                    
                    const passPercent = Math.round((passCount / students.length) * 100);
                    resPassRate.textContent = passPercent + "%";
                    
                    resTotalStudents.textContent = students.length + " Students";
                }

                // Bind event listeners
                resYearSelect.addEventListener("change", updateSemesters);
                resSemSelect.addEventListener("change", updateSubjects);
                resSubjectSelect.addEventListener("change", () => {
                    const selected = resSubjectSelect.options[resSubjectSelect.selectedIndex];
                    if (selected) {
                        resSubjectCodeDisplay.value = resSubjectSelect.value;
                        resClassCredits.textContent = parseFloat(selected.getAttribute("data-credits")).toFixed(1);
                    }
                    renderResultsGrid();
                });

                document.getElementById("exportGradeSheetBtn").addEventListener("click", () => {
                    if (!confirm("Are you sure you want to download the class test results CSV report?")) return;
                    
                    const subjectCode = resSubjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];
                    
                    let csvContent = "Student Name,Roll Number / Enrollment ID,Class Test 1 (20),Class Test 2 (20),Class Test 3 (20),Total CT Score (60)\\n";
                    
                    const draftKey = "draftMarks_" + subjectCode;
                    const draftData = JSON.parse(localStorage.getItem(draftKey)) || null;

                    students.forEach(s => {
                        let score = (draftData && draftData[s.id]) ? draftData[s.id] : (mockScores[s.id] || { mt1: 15, mt2: 14, att: 8, prac: 38, ext: 72, cr: 4 });
                        const ct1 = score.mt1;
                        const ct2 = score.mt2;
                        const ct3 = Math.min(20, Math.round(score.prac / 2.5));
                        const totalCT = ct1 + ct2 + ct3;

                        csvContent += s.name + "," + s.id + "," + ct1 + "," + ct2 + "," + ct3 + "," + totalCT + "\\n";
                    });

                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute("download", "class_test_results_" + subjectCode + ".csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast("Success: Class Test results report downloaded!");
                });

                // Run initial load
                updateSemesters();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initResults);
            } else {
                initResults();
            }
        `
    },
    "student-performance": {
        htmlContent: `
             <!-- Include ChartJS -->
             <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
             <div class="dashboard-card glassmorphism" style="margin-bottom:30px; height:auto; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05);">
                 <h3 style="font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px; color:var(--primary);">
                     <i class="fa-solid fa-chart-line" style="background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i> Student Performance Analytics
                 </h3>
                 <p style="color:var(--text-secondary); font-size:13px; margin-top:5px; margin-bottom:20px;">
                     Track individual student progress, visual semester GPA trends, attendance health, and write mentorship comments.
                 </p>

                 <!-- Search and Selector bar -->
                 <div class="glassmorphism" style="padding:20px; border:1px solid var(--border-color); border-radius:var(--border-radius-sm); margin-bottom:25px; display:flex; gap:15px; align-items:center; background:rgba(255,255,255,0.01);">
                     <div style="flex:1;">
                         <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Select Student Profile</label>
                         <select id="perfStudentSelect" class="form-input" style="height:38px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                             <option value="BCA23015" selected>Vikram Kumawat (BCA23015)</option>
                             <option value="CSE23099">Priya Sharma (CSE23099)</option>
                             <option value="CSE23115">Aditya Bose (CSE23115)</option>
                             <option value="BCA23088">Neha Sen (BCA23088)</option>
                             <option value="CSE23045">Amit Roy (CSE23045)</option>
                         </select>
                     </div>
                     <div style="flex:1;">
                         <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Student Branch / Department</label>
                         <input type="text" id="perfDeptDisplay" class="form-input" style="height:38px; font-size:12px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); color:var(--text-secondary);" readonly value="BCA - 2nd Year">
                     </div>
                 </div>

                 <!-- Key Performance Indicators -->
                 <div class="stats-row" style="margin-bottom:25px; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
                     <div class="stat-card glassmorphism" style="padding:15px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(99, 102, 241, 0.1); border-radius:8px;">
                         <i class="fa-solid fa-graduation-cap" style="font-size:24px; color:var(--primary);"></i>
                         <div>
                             <h3 id="perfCgpa" style="font-size:18px; font-weight:800; margin:0;">8.64</h3>
                             <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Cumulative CGPA</p>
                         </div>
                     </div>
                     <div class="stat-card glassmorphism" style="padding:15px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(16, 185, 129, 0.1); border-radius:8px;">
                         <i class="fa-solid fa-calendar-check" style="font-size:24px; color:#10b981;"></i>
                         <div>
                             <h3 id="perfAttendance" style="font-size:18px; font-weight:800; margin:0;">88.5%</h3>
                             <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Attendance Ratio</p>
                         </div>
                     </div>
                     <div class="stat-card glassmorphism" style="padding:15px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(245, 158, 11, 0.1); border-radius:8px;">
                         <i class="fa-solid fa-list-check" style="font-size:24px; color:#f59e0b;"></i>
                         <div>
                             <h3 id="perfAssignments" style="font-size:18px; font-weight:800; margin:0;">12 / 12</h3>
                             <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Assignments Finished</p>
                         </div>
                     </div>
                     <div class="stat-card glassmorphism" style="padding:15px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(168, 85, 247, 0.1); border-radius:8px;">
                         <i class="fa-solid fa-circle-exclamation" style="font-size:24px; color:var(--accent);"></i>
                         <div>
                             <h3 id="perfBacklogs" style="font-size:18px; font-weight:800; margin:0;">0</h3>
                             <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Active Backlogs</p>
                         </div>
                     </div>
                 </div>

                 <!-- Analytics Visual Charts Row -->
                 <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px;">
                     <div class="glassmorphism" style="padding:20px; border:1px solid var(--border-color); border-radius:8px; background:rgba(255,255,255,0.01);">
                         <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:15px;"><i class="fa-solid fa-chart-line" style="color:var(--primary); margin-right:5px;"></i> Semester GPA Progression Trend</h4>
                         <div style="height:220px; position:relative;">
                             <canvas id="semGpaChart"></canvas>
                         </div>
                     </div>
                     <div class="glassmorphism" style="padding:20px; border:1px solid var(--border-color); border-radius:8px; background:rgba(255,255,255,0.01);">
                         <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:15px;"><i class="fa-solid fa-chart-pie" style="color:var(--accent); margin-right:5px;"></i> Course Strengths Radar</h4>
                         <div style="height:220px; position:relative;">
                             <canvas id="courseRadarChart"></canvas>
                         </div>
                     </div>
                 </div>

                 <!-- Detailed Course Marksheet breakdown -->
                 <div class="glassmorphism" style="border:1px solid var(--border-color); border-radius:var(--border-radius-sm); overflow:hidden; margin-bottom:25px; background:rgba(255,255,255,0.01);">
                     <div style="padding:15px 20px; border-bottom:1px solid var(--border-color); background:rgba(255,255,255,0.02);">
                         <strong style="font-size:13px; color:var(--text-primary);"><i class="fa-solid fa-clipboard-list" style="color:var(--primary); margin-right:5px;"></i> Subject Performance Ledger (Current Sem)</strong>
                     </div>
                     <div class="table-responsive">
                         <table class="excel-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
                             <thead>
                                 <tr>
                                     <th style="width:250px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Subject Title</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:110px;">Mid Term 1 (20)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:110px;">Mid Term 2 (20)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:110px;">Practical (50)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:110px;">External (100)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); width:110px;">Total (200)</th>
                                 </tr>
                             </thead>
                             <tbody id="perfMarksBody">
                                 <!-- Loaded dynamically -->
                             </tbody>
                         </table>
                     </div>
                 </div>

                 <!-- Interactive Mentorship review remarks -->
                 <div class="glassmorphism" style="padding:20px; border:1px solid var(--border-color); border-radius:8px; background:rgba(255,255,255,0.01);">
                     <h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:12px;"><i class="fa-solid fa-comment-medical" style="color:var(--primary); margin-right:5px;"></i> Write Faculty Mentor Remarks</h4>
                     <textarea id="mentorFeedbackInput" class="form-input" style="height:80px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary); resize:vertical; padding:10px; width:100%; box-sizing:border-box; margin-bottom:12px;" placeholder="Add private comments regarding student performance, academic growth, and improvement guidelines..."></textarea>
                     <div style="display:flex; justify-content:flex-end;">
                         <button type="button" class="btn btn-primary" id="saveFeedbackBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:8px 16px; font-size:12px; border-radius:6px; font-weight:600; gap:5px;">
                             <i class="fa-solid fa-floppy-disk"></i> Save Mentor Review
                         </button>
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .excel-table th {
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 12px 15px;
                font-weight: 700;
                border-bottom: 1px solid var(--border-color);
                box-sizing: border-box;
            }
            .excel-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
                vertical-align: middle;
                color: var(--text-secondary);
                box-sizing: border-box;
            }
            .excel-table tr:hover td {
                background: rgba(255, 255, 255, 0.02);
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initPerformance() {
                const select = document.getElementById("perfStudentSelect");
                const deptDisplay = document.getElementById("perfDeptDisplay");
                const cgpa = document.getElementById("perfCgpa");
                const attendance = document.getElementById("perfAttendance");
                const assignments = document.getElementById("perfAssignments");
                const backlogs = document.getElementById("perfBacklogs");
                const tableBody = document.getElementById("perfMarksBody");
                const feedbackInput = document.getElementById("mentorFeedbackInput");
                const saveBtn = document.getElementById("saveFeedbackBtn");

                let gpaChart = null;
                let radarChart = null;

                const studentData = {
                    "BCA23015": {
                        name: "Vikram Kumawat",
                        dept: "BCA - 2nd Year (Sem 3)",
                        cgpa: "8.64",
                        att: "92.5%",
                        assign: "12 / 12",
                        backlogs: "0",
                        gpaProg: [8.2, 8.5, 8.64],
                        radar: [90, 85, 92, 88, 95],
                        subjects: [
                            { name: "Database Management Systems", mt1: 18, mt2: 17, prac: 45, ext: 88 },
                            { name: "Data Structures & Algorithms", mt1: 17, mt2: 16, prac: 44, ext: 85 },
                            { name: "Web Technology Lab", mt1: 19, mt2: 18, prac: 47, ext: 90 }
                        ]
                    },
                    "CSE23099": {
                        name: "Priya Sharma",
                        dept: "B.Tech CSE - 2nd Year (Sem 3)",
                        cgpa: "8.12",
                        att: "88.0%",
                        assign: "11 / 12",
                        backlogs: "0",
                        gpaProg: [7.8, 8.0, 8.12],
                        radar: [82, 78, 85, 80, 88],
                        subjects: [
                            { name: "Database Management Systems", mt1: 15, mt2: 16, prac: 42, ext: 78 },
                            { name: "Data Structures & Algorithms", mt1: 14, mt2: 15, prac: 40, ext: 81 },
                            { name: "Digital Electronics", mt1: 16, mt2: 14, prac: 38, ext: 79 }
                        ]
                    },
                    "CSE23115": {
                        name: "Aditya Bose",
                        dept: "B.Tech CSE - 2nd Year (Sem 3)",
                        cgpa: "7.84",
                        att: "81.2%",
                        assign: "10 / 12",
                        backlogs: "0",
                        gpaProg: [7.5, 7.6, 7.84],
                        radar: [75, 72, 80, 78, 82],
                        subjects: [
                            { name: "Database Management Systems", mt1: 14, mt2: 15, prac: 40, ext: 81 },
                            { name: "Data Structures & Algorithms", mt1: 13, mt2: 14, prac: 38, ext: 75 },
                            { name: "Web Technology Lab", mt1: 15, mt2: 16, prac: 41, ext: 78 }
                        ]
                    },
                    "BCA23088": {
                        name: "Neha Sen",
                        dept: "BCA - 2nd Year (Sem 3)",
                        cgpa: "9.28",
                        att: "95.0%",
                        assign: "12 / 12",
                        backlogs: "0",
                        gpaProg: [9.0, 9.1, 9.28],
                        radar: [95, 92, 96, 94, 98],
                        subjects: [
                            { name: "Database Management Systems", mt1: 17, mt2: 19, prac: 46, ext: 92 },
                            { name: "Data Structures & Algorithms", mt1: 19, mt2: 18, prac: 48, ext: 94 },
                            { name: "Web Technology Lab", mt1: 18, mt2: 19, prac: 47, ext: 95 }
                        ]
                    },
                    "CSE23045": {
                        name: "Amit Roy",
                        dept: "B.Tech CSE - 2nd Year (Sem 3)",
                        cgpa: "6.72",
                        att: "72.4%",
                        assign: "9 / 12",
                        backlogs: "1",
                        gpaProg: [6.5, 6.8, 6.72],
                        radar: [60, 65, 70, 58, 68],
                        subjects: [
                            { name: "Database Management Systems", mt1: 12, mt2: 14, prac: 38, ext: 65 },
                            { name: "Data Structures & Algorithms", mt1: 10, mt2: 11, prac: 30, ext: 55 },
                            { name: "Web Technology Lab", mt1: 11, mt2: 12, prac: 35, ext: 60 }
                        ]
                    }
                };

                function updateProfile() {
                    const id = select.value;
                    const data = studentData[id];
                    if (!data) return;

                    deptDisplay.value = data.dept;
                    cgpa.textContent = data.cgpa;
                    attendance.textContent = data.att;
                    assignments.textContent = data.assign;
                    backlogs.textContent = data.backlogs;

                    // Color code attendance health
                    const attVal = parseFloat(data.att);
                    if (attVal < 75) {
                        attendance.style.color = "#ef4444";
                    } else if (attVal < 85) {
                        attendance.style.color = "#f59e0b";
                    } else {
                        attendance.style.color = "#10b981";
                    }

                    // Render subjects marks list
                    tableBody.innerHTML = data.subjects.map(s => {
                        const total = s.mt1 + s.mt2 + s.prac + s.ext;
                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.mt1 + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.mt2 + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.prac + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.ext + '</td>' +
                            '<td style="text-align:center; font-family:monospace; font-weight:700; color:var(--primary);">' + total + '</td>' +
                            '</tr>';
                    }).join("");

                    // Load saved mentor feedback from localStorage
                    const savedFeedback = localStorage.getItem("mentorFeedback_" + id) || "";
                    feedbackInput.value = savedFeedback;

                    // Initialize / Update GPA progression chart
                    renderGpaChart(data.gpaProg);
                    renderRadarChart(data.radar);
                }

                function renderGpaChart(gpaData) {
                    const ctx = document.getElementById("semGpaChart").getContext("2d");
                    if (gpaChart) {
                        gpaChart.destroy();
                    }

                    gpaChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ["Semester 1", "Semester 2", "Semester 3"],
                            datasets: [{
                                label: 'GPA',
                                data: gpaData,
                                borderColor: '#6366f1',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: { min: 4, max: 10 }
                            }
                        }
                    });
                }

                function renderRadarChart(radarData) {
                    const ctx = document.getElementById("courseRadarChart").getContext("2d");
                    if (radarChart) {
                        radarChart.destroy();
                    }

                    radarChart = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: ["Theory Tests", "Programming", "Practicals", "Classroom Activity", "End Sem Exam"],
                            datasets: [{
                                label: 'Subject Performance',
                                data: radarData,
                                borderColor: '#a855f7',
                                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                                borderWidth: 2,
                                fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                r: { min: 0, max: 100 }
                            }
                        }
                    });
                }

                // Bind save button click
                saveBtn.addEventListener("click", () => {
                    const id = select.value;
                    localStorage.setItem("mentorFeedback_" + id, feedbackInput.value);
                    showToast("Success: Mentor feedback remarks updated successfully!");
                });

                select.addEventListener("change", updateProfile);

                // Run initial profile load
                updateProfile();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initPerformance);
            } else {
                initPerformance();
            }
        `
    },
    "stream": {
        htmlContent: `
             <!-- Classroom Stream Banner -->
             <div class="dashboard-card glassmorphism" style="margin-bottom:25px; border:1px solid rgba(99, 102, 241, 0.2); background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.08)); border-radius:12px; padding:30px; position:relative; overflow:hidden;">
                 <div style="position:relative; z-index:2;">
                     <span style="font-size:10px; background:rgba(99,102,241,0.2); color:var(--primary); padding:4px 10px; border-radius:20px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">DBMS Section-A</span>
                     <h2 style="font-size:24px; font-weight:800; margin:10px 0 5px 0; font-family:'Outfit', sans-serif;">Database Management Systems</h2>
                     <p style="color:var(--text-secondary); font-size:13px; margin:0;">Instructor: Dr. Rajesh Kumar • Room Code: <strong id="streamRoomCode" style="color:var(--primary); font-family:monospace; cursor:pointer;" title="Click to copy invite link">dbms-bca-2026</strong></p>
                 </div>
                 <i class="fa-solid fa-graduation-cap" style="position:absolute; right:20px; bottom:-10px; font-size:120px; color:rgba(99, 102, 241, 0.04); z-index:1;"></i>
             </div>

             <div style="display:grid; grid-template-columns: 260px 1fr; gap:20px; align-items:start;">
                 <!-- Sidebar: Class info and tasks -->
                 <div class="glassmorphism" style="padding:20px; border:1px solid var(--border-color); border-radius:8px; background:rgba(255,255,255,0.01);">
                     <h4 style="font-size:12px; text-transform:uppercase; color:var(--primary); font-weight:700; margin-bottom:12px; letter-spacing:0.5px;"><i class="fa-solid fa-calendar-days"></i> Upcoming Deadlines</h4>
                     <div style="display:flex; flex-direction:column; gap:12px;">
                         <div style="border-left:2px solid var(--accent); padding-left:10px;">
                             <p style="margin:0; font-size:12px; font-weight:600; color:var(--text-primary);">Assignment 3: Normalization</p>
                             <span style="font-size:10px; color:var(--text-tertiary);">Due Monday, 11:59 PM</span>
                         </div>
                         <div style="border-left:2px solid #10b981; padding-left:10px;">
                             <p style="margin:0; font-size:12px; font-weight:600; color:var(--text-primary);">Quiz 2: Relational Algebra</p>
                             <span style="font-size:10px; color:var(--text-tertiary);">Live Wednesday, 10:00 AM</span>
                         </div>
                     </div>
                 </div>

                 <!-- Feed and Announcement editor -->
                 <div style="display:flex; flex-direction:column; gap:20px;">
                     <!-- Share box -->
                     <div class="glassmorphism" style="padding:20px; border:1px solid var(--border-color); border-radius:8px; background:rgba(255,255,255,0.01); display:flex; flex-direction:column; gap:12px;">
                         <div style="display:flex; gap:12px; align-items:center;">
                             <i class="fa-solid fa-circle-user" style="font-size:32px; color:var(--primary);"></i>
                             <input type="text" id="streamAnnounceInput" class="form-input" style="height:40px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary); padding:0 12px; flex:1;" placeholder="Share an announcement, notification or notice with your class...">
                         </div>
                         <div id="announceExpandedArea" style="display:none; flex-direction:column; gap:12px;">
                             <textarea id="streamAnnounceText" class="form-input" style="height:80px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary); padding:10px; resize:vertical; width:100%; box-sizing:border-box;" placeholder="Add details to your announcement..."></textarea>
                             <div style="display:flex; justify-content:space-between; align-items:center;">
                                 <button type="button" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:11px; padding:6px 12px; border-radius:6px; color:var(--text-secondary); gap:5px;">
                                     <i class="fa-solid fa-paperclip"></i> Add Attachment
                                 </button>
                                 <div style="display:flex; gap:10px;">
                                     <button type="button" class="btn" id="streamCancelBtn" style="background:transparent; font-size:12px; color:var(--text-secondary); padding:6px 12px;">Cancel</button>
                                     <button type="button" class="btn btn-primary" id="streamPostBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); font-size:12px; border-radius:6px; padding:6px 16px; font-weight:600;">Post</button>
                                 </div>
                             </div>
                         </div>
                     </div>

                     <!-- Feed Stream -->
                     <div id="classroomFeedStream" style="display:flex; flex-direction:column; gap:20px;">
                         <!-- Dynamic Feed Cards go here -->
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .feed-card {
                padding: 20px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.01);
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .feed-card:hover {
                border-color: rgba(99, 102, 241, 0.25);
            }
            .comment-box {
                margin-top: 15px;
                border-top: 1px solid var(--border-color);
                padding-top: 15px;
            }
            .comment-item {
                display: flex;
                gap: 10px;
                margin-bottom: 10px;
                align-items: start;
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initStream() {
                const roomCode = document.getElementById("streamRoomCode");
                const announceInput = document.getElementById("streamAnnounceInput");
                const expandedArea = document.getElementById("announceExpandedArea");
                const announceText = document.getElementById("streamAnnounceText");
                const cancelBtn = document.getElementById("streamCancelBtn");
                const postBtn = document.getElementById("streamPostBtn");
                const feedStream = document.getElementById("classroomFeedStream");

                // Default mock feed announcements
                const defaultFeed = [
                    {
                        id: 1,
                        author: "Dr. Rajesh Kumar",
                        role: "Faculty Coordinator",
                        time: "Posted 3 hours ago",
                        content: "Dear students, I have uploaded the lecture slides and reference notes for normal forms (1NF, 2NF, 3NF, BCNF) in the classroom study materials tab. Please review them before the upcoming test.",
                        comments: [
                            { author: "Vikram Kumawat", content: "Got it, thank you sir." },
                            { author: "Priya Sharma", content: "Sir, will the quiz contain BCNF questions too?" },
                            { author: "Dr. Rajesh Kumar", content: "Yes Priya, BCNF will be included in Wednesday's quiz." }
                        ]
                    },
                    {
                        id: 2,
                        author: "Dr. Rajesh Kumar",
                        role: "Faculty Coordinator",
                        time: "Posted 1 day ago",
                        content: "Notice: The deadline for submitting Assignment 3 (Database Schema Designs) has been extended to Monday midnight. No further extensions will be granted.",
                        comments: []
                    }
                ];

                // Load custom announcements from localStorage
                function loadFeed() {
                    const localAnnouncements = JSON.parse(localStorage.getItem("streamAnnouncements")) || [];
                    const fullFeed = [...localAnnouncements, ...defaultFeed];

                    feedStream.innerHTML = fullFeed.map(post => {
                        const commentsHtml = post.comments.map(c => 
                            '<div class="comment-item">' +
                                '<i class="fa-solid fa-circle-user" style="font-size:24px; color:var(--text-tertiary);"></i>' +
                                '<div style="background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:6px; flex:1;">' +
                                    '<strong style="font-size:11px; color:var(--text-primary);">' + c.author + '</strong>' +
                                    '<p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">' + c.content + '</p>' +
                                '</div>' +
                            '</div>'
                        ).join("");

                        return '<div class="feed-card glassmorphism" data-id="' + post.id + '">' +
                            '<div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">' +
                                '<i class="fa-solid fa-circle-user" style="font-size:36px; color:var(--primary);"></i>' +
                                '<div>' +
                                    '<strong style="font-size:13px; color:var(--text-primary);">' + post.author + '</strong>' +
                                    '<span style="font-size:9px; background:rgba(99,102,241,0.15); color:var(--primary); padding:2px 6px; border-radius:4px; margin-left:8px; font-weight:600;">' + post.role + '</span>' +
                                    '<p style="margin:2px 0 0 0; font-size:10px; color:var(--text-tertiary);">' + post.time + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<p style="font-size:12px; color:var(--text-secondary); line-height:1.5; margin:0 0 15px 0;">' + post.content + '</p>' +
                            
                            '<div class="comment-box">' +
                                '<div id="commentsList_' + post.id + '" style="margin-bottom:12px; display:flex; flex-direction:column; gap:8px;">' + commentsHtml + '</div>' +
                                '<div style="display:flex; gap:10px; align-items:center; margin-top:10px;">' +
                                    '<input type="text" id="commentInput_' + post.id + '" class="form-input" style="height:32px; font-size:11px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-secondary); padding:0 10px; flex:1;" placeholder="Add a class comment...">' +
                                    '<button type="button" onclick="sendClassComment(' + post.id + ')" class="btn btn-primary" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:6px 12px; font-size:11px; border-radius:4px;"><i class="fa-solid fa-paper-plane"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Expand share box on focus
                announceInput.addEventListener("focus", () => {
                    announceInput.style.display = "none";
                    expandedArea.style.display = "flex";
                    announceText.focus();
                });

                cancelBtn.addEventListener("click", () => {
                    expandedArea.style.display = "none";
                    announceInput.style.display = "block";
                    announceInput.value = "";
                    announceText.value = "";
                });

                // Post announcement
                postBtn.addEventListener("click", () => {
                    const text = announceText.value.trim();
                    if (!text) {
                        alert("Announcement content cannot be empty.");
                        return;
                    }

                    const localAnnouncements = JSON.parse(localStorage.getItem("streamAnnouncements")) || [];
                    const newPost = {
                        id: Date.now(),
                        author: "Dr. Rajesh Kumar",
                        role: "Faculty Coordinator",
                        time: "Posted Just now",
                        content: text,
                        comments: []
                    };

                    localAnnouncements.unshift(newPost);
                    localStorage.setItem("streamAnnouncements", JSON.stringify(localAnnouncements));

                    expandedArea.style.display = "none";
                    announceInput.style.display = "block";
                    announceInput.value = "";
                    announceText.value = "";

                    loadFeed();
                    showToast("Success: Notice published to classroom stream!");
                });

                // Copy Room code link
                roomCode.addEventListener("click", () => {
                    navigator.clipboard.writeText("http://localhost:8080/student/classroom/join.html?code=dbms-bca-2026");
                    showToast("Invite link copied to clipboard!");
                });

                // Bind send comment globally
                window.sendClassComment = function(postId) {
                    const commentInput = document.getElementById("commentInput_" + postId);
                    const commentText = commentInput.value.trim();
                    if (!commentText) return;

                    const localAnnouncements = JSON.parse(localStorage.getItem("streamAnnouncements")) || [];
                    const post = localAnnouncements.find(p => p.id === postId);

                    if (post) {
                        post.comments.push({ author: "Dr. Rajesh Kumar", content: commentText });
                        localStorage.setItem("streamAnnouncements", JSON.stringify(localAnnouncements));
                    } else {
                        // Default mock posts comments addition saved in temp session
                        const defaultPost = defaultFeed.find(p => p.id === postId);
                        if (defaultPost) {
                            defaultPost.comments.push({ author: "Dr. Rajesh Kumar", content: commentText });
                        }
                    }

                    commentInput.value = "";
                    loadFeed();
                    showToast("Comment added!");
                };

                loadFeed();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initStream);
            } else {
                initStream();
            }
        `
    },
    "study-materials": {
        htmlContent: `
             <div style="display:grid; grid-template-columns: 320px 1fr; gap:25px; align-items:start;">
                 <!-- Upload form card -->
                 <div class="dashboard-card glassmorphism" style="padding:22px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); height:auto;">
                     <h3 style="font-size:15px; font-weight:800; color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-cloud-arrow-up"></i> Upload Study Resource</h3>
                     
                     <div style="display:flex; flex-direction:column; gap:12px;">
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Resource Title</label>
                             <input type="text" id="materialTitle" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. Lecture 4: Database Normalization">
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Resource Category</label>
                             <select id="materialCategory" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                 <option value="slides">Lecture Slides</option>
                                 <option value="pdf">Reference PDFs</option>
                                 <option value="video">Video Lectures</option>
                                 <option value="link">Useful Web Links</option>
                             </select>
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">File / Link Destination</label>
                             <input type="text" id="materialLink" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. https://drive.google.com/... or dbms_slides.pdf">
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">File Upload (Click to Browse)</label>
                             <div id="materialDropzone" style="border: 2px dashed var(--border-color); border-radius: 8px; padding: 25px 15px; text-align: center; cursor: pointer; transition: all 0.2s ease; background: rgba(255,255,255,0.01);">
                                 <i class="fa-solid fa-file-circle-plus" style="font-size: 28px; color: var(--text-tertiary); margin-bottom: 8px;"></i>
                                 <p style="font-size: 11px; color: var(--text-secondary); margin: 0;">Drag file here or <span style="color:var(--primary); font-weight:600;">Browse</span></p>
                                 <span id="dropzoneStatus" style="font-size:10px; color:var(--text-tertiary); display:block; margin-top:5px;">Max file size: 50MB</span>
                             </div>
                             <input type="file" id="realFileInput" style="display: none;">
                         </div>
                         <button type="button" class="btn btn-primary" id="addMaterialBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px; border-radius:6px; font-weight:600; font-size:12px; gap:6px; margin-top:10px; justify-content:center;">
                             <i class="fa-solid fa-plus"></i> Add to Class Library
                         </button>
                     </div>
                 </div>

                 <!-- Library card -->
                 <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto;">
                     <!-- Filter Tabs -->
                     <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:15px; flex-wrap:wrap; gap:10px;">
                         <div style="display:flex; gap:8px;" id="materialFilterTabs">
                             <button class="filter-tab active" data-filter="all">All Files</button>
                             <button class="filter-tab" data-filter="slides">Slides</button>
                             <button class="filter-tab" data-filter="pdf">PDFs</button>
                             <button class="filter-tab" data-filter="video">Videos</button>
                             <button class="filter-tab" data-filter="link">Links</button>
                         </div>
                         <span style="font-size:11px; color:var(--text-tertiary);" id="materialCountLabel">Showing 4 resources</span>
                     </div>

                     <!-- Materials Grid -->
                     <div id="materialsGrid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:15px;">
                         <!-- Dynamic Materials Cards go here -->
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .filter-tab {
                background: transparent;
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .filter-tab.active {
                background: var(--primary);
                border-color: var(--primary);
                color: white;
            }
            .filter-tab:hover:not(.active) {
                border-color: rgba(99,102,241,0.5);
                color: var(--text-primary);
            }
            .material-card {
                padding: 18px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.01);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 150px;
                position: relative;
                transition: border-color 0.2s ease, transform 0.2s ease;
            }
            .material-card:hover {
                border-color: rgba(99, 102, 241, 0.25);
                transform: translateY(-2px);
            }
            .material-delete-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: transparent;
                border: none;
                color: var(--text-tertiary);
                cursor: pointer;
                font-size: 13px;
                display: none;
            }
            .material-card:hover .material-delete-btn {
                display: block;
            }
            .material-delete-btn:hover {
                color: #ef4444;
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initMaterials() {
                const titleInput = document.getElementById("materialTitle");
                const catSelect = document.getElementById("materialCategory");
                const linkInput = document.getElementById("materialLink");
                const dropzone = document.getElementById("materialDropzone");
                const dropzoneStatus = document.getElementById("dropzoneStatus");
                const addBtn = document.getElementById("addMaterialBtn");
                const grid = document.getElementById("materialsGrid");
                const tabs = document.querySelectorAll("#materialFilterTabs .filter-tab");
                const countLabel = document.getElementById("materialCountLabel");

                let uploadedFileMock = null;
                let activeFilter = "all";

                // Default library resources
                const defaultMaterials = [
                    { id: 1, title: "DBMS Lecture 1: Relational Model", category: "slides", destination: "dbms_lec1.pptx", size: "4.2 MB", time: "2 days ago" },
                    { id: 2, title: "Database Normal Forms cheat sheet", category: "pdf", destination: "normalization_sheet.pdf", size: "1.1 MB", time: "3 days ago" },
                    { id: 3, title: "SQL Window Functions Video Tutorial", category: "video", destination: "https://youtube.com/dbms-window-funcs", size: "12 min video", time: "5 days ago" },
                    { id: 4, title: "Relational Algebra interactive solver", category: "link", destination: "https://dbis-uibk.github.io/rdb-solver/", size: "External Link", time: "1 week ago" }
                ];

                // Category Icons mapper
                const catIcons = {
                    "slides": { icon: "fa-file-powerpoint", color: "#e05b35" },
                    "pdf": { icon: "fa-file-pdf", color: "#ef4444" },
                    "video": { icon: "fa-file-video", color: "#10b981" },
                    "link": { icon: "fa-link", color: "#a855f7" }
                };

                // Populate grid
                function loadLibrary() {
                    const localMaterials = JSON.parse(localStorage.getItem("studyMaterials")) || [];
                    const fullLibrary = [...localMaterials, ...defaultMaterials];
                    
                    const filtered = fullLibrary.filter(m => activeFilter === "all" || m.category === activeFilter);
                    
                    countLabel.textContent = "Showing " + filtered.length + " resources";

                    if (filtered.length === 0) {
                        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:var(--text-tertiary); padding:40px 0;">No resources found under this filter category.</div>';
                        return;
                    }

                    grid.innerHTML = filtered.map(m => {
                        const styleInfo = catIcons[m.category] || { icon: "fa-file", color: "#6366f1" };
                        return '<div class="material-card glassmorphism">' +
                            '<button type="button" class="material-delete-btn" onclick="deleteMaterial(' + m.id + ')" title="Delete Resource"><i class="fa-solid fa-trash-can"></i></button>' +
                            '<div style="display:flex; gap:12px; align-items:start;">' +
                                '<i class="fa-solid ' + styleInfo.icon + '" style="font-size:28px; color:' + styleInfo.color + '; margin-top:2px;"></i>' +
                                '<div style="flex:1; padding-right:15px;">' +
                                    '<h4 style="margin:0; font-size:12px; font-weight:700; color:var(--text-primary); line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + m.title + '</h4>' +
                                    '<span style="font-size:9px; color:var(--text-tertiary); text-transform:uppercase; font-weight:600; margin-top:4px; display:inline-block;">' + m.category + '</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px; margin-top:10px;">' +
                                '<span style="font-size:10px; color:var(--text-tertiary);">' + m.size + '</span>' +
                                '<a href="' + m.destination + '" target="_blank" class="btn" style="background:rgba(99, 102, 241, 0.1); color:var(--primary); font-size:10px; padding:4px 10px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open</a>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Attach filter tab clicks
                tabs.forEach(tab => {
                    tab.addEventListener("click", () => {
                        tabs.forEach(t => t.classList.remove("active"));
                        tab.classList.add("active");
                        activeFilter = tab.getAttribute("data-filter");
                        loadLibrary();
                    });
                });

                // Real File upload trigger
                const realFileInput = document.getElementById("realFileInput");

                dropzone.addEventListener("click", () => {
                    realFileInput.click();
                });

                realFileInput.addEventListener("change", (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        uploadedFileMock = file.name;
                        const fileSizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
                        dropzoneStatus.textContent = "Selected: " + file.name + " (" + fileSizeStr + ")";
                        dropzoneStatus.style.color = "#10b981";
                        if (!titleInput.value) {
                            // Strip file extension for the title input helper
                            titleInput.value = file.name.split('.').slice(0, -1).join('.') || file.name;
                        }
                        showToast("File selected: " + file.name);
                    }
                });

                // Add material click
                addBtn.addEventListener("click", () => {
                    const title = titleInput.value.trim();
                    const category = catSelect.value;
                    let destination = linkInput.value.trim();

                    if (!title) {
                        alert("Please provide a resource title.");
                        return;
                    }

                    if (!destination && uploadedFileMock) {
                        destination = uploadedFileMock;
                    }

                    if (!destination) {
                        alert("Please upload a file or specify a destination URL.");
                        return;
                    }

                    const localMaterials = JSON.parse(localStorage.getItem("studyMaterials")) || [];
                    const newResource = {
                        id: Date.now(),
                        title: title,
                        category: category,
                        destination: destination,
                        size: uploadedFileMock ? "2.4 MB" : "External Link",
                        time: "Just now"
                    };

                    localMaterials.unshift(newResource);
                    localStorage.setItem("studyMaterials", JSON.stringify(localMaterials));

                    // Reset form
                    titleInput.value = "";
                    linkInput.value = "";
                    uploadedFileMock = null;
                    dropzoneStatus.textContent = "Max file size: 50MB";
                    dropzoneStatus.style.color = "var(--text-tertiary)";

                    loadLibrary();
                    showToast("Success: Resource published to classroom library!");
                });

                // Delete resource helper bind to window
                window.deleteMaterial = function(id) {
                    if (!confirm("Are you sure you want to remove this resource from the classroom?")) return;
                    
                    const localMaterials = JSON.parse(localStorage.getItem("studyMaterials")) || [];
                    const idx = localMaterials.findIndex(m => m.id === id);

                    if (idx !== -1) {
                        localMaterials.splice(idx, 1);
                        localStorage.setItem("studyMaterials", JSON.stringify(localMaterials));
                        loadLibrary();
                        showToast("Resource removed from library.");
                    } else {
                        alert("Warning: Core preloaded resources cannot be deleted.");
                    }
                };

                loadLibrary();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initMaterials);
            } else {
                initMaterials();
            }
        `
    },
    "assignments": {
        htmlContent: `
             <div style="display:grid; grid-template-columns: 340px 1fr; gap:25px; align-items:start;">
                 <!-- Create Assignment Form -->
                 <div class="dashboard-card glassmorphism" style="padding:22px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); height:auto;">
                     <h3 style="font-size:15px; font-weight:800; color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-file-pen"></i> Create Assignment</h3>
                     
                     <div style="display:flex; flex-direction:column; gap:12px;">
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Assignment Title</label>
                             <input type="text" id="assignTitle" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. Assignment 4: ER Diagrams">
                         </div>
                         <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap:10px;">
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Due Date & Time</label>
                                 <input type="datetime-local" id="assignDueDate" class="form-input" style="height:36px; font-size:11px; border-radius:6px; padding:0 8px;">
                             </div>
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Max Marks</label>
                                 <input type="number" id="assignMaxMarks" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" value="50">
                             </div>
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Instructions / Guidelines</label>
                             <textarea id="assignInstructions" class="form-input" style="height:80px; font-size:12px; border-radius:6px; padding:10px; resize:vertical; width:100%; box-sizing:border-box;" placeholder="Add guidelines for submissions..."></textarea>
                         </div>
                         <button type="button" class="btn btn-primary" id="createAssignBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px; border-radius:6px; font-weight:600; font-size:12px; gap:6px; margin-top:10px; justify-content:center;">
                             <i class="fa-solid fa-bullhorn"></i> Assign to Class
                         </button>
                     </div>
                 </div>

                 <div style="display:flex; flex-direction:column; gap:20px;">
                     <!-- Active Assignments list -->
                     <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px;">
                         <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-list-check" style="color:var(--primary); margin-right:5px;"></i> Active Assignments</h3>
                         <div id="activeAssignList" style="display:flex; flex-direction:column; gap:15px;">
                             <!-- Loaded dynamically -->
                         </div>
                     </div>

                     <!-- Submissions and Grading Panel -->
                     <div class="dashboard-card glassmorphism" id="gradingPanel" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px; display:none;">
                         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
                             <h3 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;" id="gradingPanelTitle">Evaluate Submissions</h3>
                             <span id="gradingMaxMarksLabel" style="font-size:11px; background:rgba(99,102,241,0.15); color:var(--primary); padding:3px 8px; border-radius:4px; font-weight:700;">Max Marks: 50</span>
                         </div>
                         <div class="table-responsive">
                             <table class="excel-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
                                 <thead>
                                     <tr>
                                         <th style="width:200px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Student Details</th>
                                         <th style="border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:150px;">Status</th>
                                         <th style="border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:180px; text-align:center;">Entered Marks</th>
                                         <th style="border-bottom:1px solid var(--border-color); text-align:center; width:100px;">Save</th>
                                     </tr>
                                 </thead>
                                 <tbody id="gradingGridBody">
                                     <!-- Loaded dynamically via assignment selection -->
                                 </tbody>
                             </table>
                         </div>
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .assign-item-card {
                padding: 15px 20px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.01);
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: border-color 0.2s ease;
            }
            .assign-item-card:hover {
                border-color: rgba(99, 102, 241, 0.2);
            }
            .excel-table th {
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 10px 12px;
                font-weight: 700;
                border-bottom: 1px solid var(--border-color);
                box-sizing: border-box;
            }
            .excel-table td {
                padding: 10px 12px;
                border-bottom: 1px solid var(--border-color);
                vertical-align: middle;
                color: var(--text-secondary);
                box-sizing: border-box;
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initAssignments() {
                const titleInput = document.getElementById("assignTitle");
                const dateInput = document.getElementById("assignDueDate");
                const maxMarksInput = document.getElementById("assignMaxMarks");
                const instText = document.getElementById("assignInstructions");
                const createBtn = document.getElementById("createAssignBtn");
                const assignList = document.getElementById("activeAssignList");

                const gradingPanel = document.getElementById("gradingPanel");
                const gradingPanelTitle = document.getElementById("gradingPanelTitle");
                const gradingMaxMarksLabel = document.getElementById("gradingMaxMarksLabel");
                const gradingGridBody = document.getElementById("gradingGridBody");

                let selectedAssignId = null;

                // Set default datetime to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(23, 59, 0, 0);
                dateInput.value = tomorrow.toISOString().slice(0, 16);

                // Default active assignments
                const defaultAssignments = [
                    { id: 1, title: "Assignment 1: Entity Relationship Diagrams", maxMarks: 50, due: "Passed (10 Aug)", submitted: 5, total: 5 },
                    { id: 2, title: "Assignment 2: Schema Normalization & Keys", maxMarks: 50, due: "Passed (18 Aug)", submitted: 4, total: 5 },
                    { id: 3, title: "Assignment 3: Relational Algebra & Calculus", maxMarks: 50, due: "Due Monday, 11:59 PM", submitted: 2, total: 5 }
                ];

                // Mock students database for submissions
                const mockSubmissions = {
                    "BCA23015": { name: "Vikram Kumawat", status: "Submitted", file: "vikram_dbms_assign.pdf", marks: 46 },
                    "CSE23099": { name: "Priya Sharma", status: "Submitted", file: "priya_sharma_er.pdf", marks: 44 },
                    "CSE23115": { name: "Aditya Bose", status: "Submitted", file: "aditya_b_assign.pdf", marks: null },
                    "BCA23088": { name: "Neha Sen", status: "Submitted", file: "neha_er_model.pdf", marks: 49 },
                    "CSE23045": { name: "Amit Roy", status: "Not Submitted", file: "", marks: 0 }
                };

                // Populate assignments list
                function renderAssignments() {
                    const localAssigns = JSON.parse(localStorage.getItem("classroomAssignments")) || [];
                    const fullList = [...localAssigns, ...defaultAssignments];

                    if (fullList.length === 0) {
                        assignList.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0;">No active assignments assigned to the class.</div>';
                        return;
                    }

                    assignList.innerHTML = fullList.map(a => {
                        return '<div class="assign-item-card glassmorphism">' +
                            '<div>' +
                                '<h4 style="margin:0; font-size:12px; font-weight:700; color:var(--text-primary);">' + a.title + '</h4>' +
                                '<span style="font-size:10px; color:var(--text-tertiary); display:block; margin-top:4px;">' + a.due + ' • Max Marks: ' + a.maxMarks + '</span>' +
                            '</div>' +
                            '<div style="display:flex; gap:10px; align-items:center;">' +
                                '<span style="font-size:11px; color:var(--text-secondary);">' + a.submitted + ' / ' + a.total + ' Turned In</span>' +
                                '<button type="button" class="btn" onclick="openGradingPanel(' + a.id + ', \\'' + a.title.replace(/'/g, "\\'") + '\\', ' + a.maxMarks + ')" style="background:rgba(99,102,241,0.1); color:var(--primary); font-size:11px; padding:6px 12px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-circle-check"></i> Evaluate</button>' +
                                '<button type="button" class="material-delete-btn" onclick="deleteAssignment(' + a.id + ')" style="position:static; display:block; padding:6px; color:var(--text-tertiary);"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Create assignment action
                createBtn.addEventListener("click", () => {
                    const title = titleInput.value.trim();
                    const dueVal = dateInput.value;
                    const maxMarks = parseInt(maxMarksInput.value);
                    const instructions = instText.value.trim();

                    if (!title) {
                        alert("Please specify assignment title.");
                        return;
                    }

                    const localAssigns = JSON.parse(localStorage.getItem("classroomAssignments")) || [];
                    const newAssign = {
                        id: Date.now(),
                        title: title,
                        maxMarks: maxMarks,
                        due: "Due " + new Date(dueVal).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
                        submitted: 0,
                        total: 5
                    };

                    localAssigns.unshift(newAssign);
                    localStorage.setItem("classroomAssignments", JSON.stringify(localAssigns));

                    titleInput.value = "";
                    instText.value = "";
                    maxMarksInput.value = "50";

                    renderAssignments();
                    showToast("Success: New Assignment assigned to students!");
                });

                // Delete assignment
                window.deleteAssignment = function(id) {
                    if (!confirm("Are you sure you want to delete this assignment and its submissions?")) return;

                    const localAssigns = JSON.parse(localStorage.getItem("classroomAssignments")) || [];
                    const idx = localAssigns.findIndex(a => a.id === id);

                    if (idx !== -1) {
                        localAssigns.splice(idx, 1);
                        localStorage.setItem("classroomAssignments", JSON.stringify(localAssigns));
                        renderAssignments();
                        gradingPanel.style.display = "none";
                        showToast("Assignment removed.");
                    } else {
                        alert("Warning: Default active assignments cannot be removed.");
                    }
                };

                // Open grading grid
                window.openGradingPanel = function(id, title, maxMarks) {
                    selectedAssignId = id;
                    gradingPanel.style.display = "block";
                    gradingPanelTitle.innerHTML = '<i class="fa-solid fa-edit"></i> Evaluating: ' + title;
                    gradingMaxMarksLabel.textContent = "Max Marks: " + maxMarks;

                    // Load saved student assignment grades from localStorage
                    const gradeKey = "assignGrades_" + id;
                    const savedGrades = JSON.parse(localStorage.getItem(gradeKey)) || {};

                    const studentKeys = Object.keys(mockSubmissions);
                    gradingGridBody.innerHTML = studentKeys.map(k => {
                        const s = mockSubmissions[k];
                        // If student marks already saved, use them. Otherwise default mock.
                        const currentMarks = savedGrades[k] !== undefined ? savedGrades[k] : (s.marks !== null ? s.marks : "");
                        
                        let statusBadge = "";
                        if (s.status === "Submitted") {
                            statusBadge = '<span style="font-size:10px; background:rgba(16,185,129,0.12); color:#10b981; padding:2px 6px; border-radius:4px; font-weight:600;"><i class="fa-solid fa-file-pdf"></i> ' + s.file + '</span>';
                        } else {
                            statusBadge = '<span style="font-size:10px; background:rgba(239,68,68,0.12); color:#ef4444; padding:2px 6px; border-radius:4px; font-weight:600;">Not Submitted</span>';
                        }

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + k + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color);">' + statusBadge + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center;">' +
                                '<input type="number" id="gradeMarks_' + k + '" class="form-input" style="height:28px; width:70px; text-align:center; display:inline-block; font-size:11px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-secondary);" min="0" max="' + maxMarks + '" value="' + currentMarks + '">' +
                                '<span style="font-size:11px; color:var(--text-tertiary); margin-left:5px;">/ ' + maxMarks + '</span>' +
                            '</td>' +
                            '<td style="text-align:center;">' +
                                '<button type="button" onclick="saveStudentGrade(\\'' + k + '\\')" class="btn btn-primary" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:4px 8px; font-size:11px; border-radius:4px; border:none;"><i class="fa-solid fa-save"></i> Save</button>' +
                            '</td>' +
                            '</tr>';
                    }).join("");
                };

                // Save student grade helper
                window.saveStudentGrade = function(studentId) {
                    const marksInput = document.getElementById("gradeMarks_" + studentId);
                    const marks = marksInput.value.trim();

                    if (marks === "") {
                        alert("Please specify evaluation marks.");
                        return;
                    }

                    const gradeKey = "assignGrades_" + selectedAssignId;
                    const savedGrades = JSON.parse(localStorage.getItem(gradeKey)) || {};
                    savedGrades[studentId] = parseInt(marks);
                    localStorage.setItem(gradeKey, JSON.stringify(savedGrades));

                    showToast("Grade updated for student profile.");
                };

                renderAssignments();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initAssignments);
            } else {
                initAssignments();
            }
        `
    },
    "quiz": {
        htmlContent: `
             <div style="display:grid; grid-template-columns: 360px 1fr; gap:25px; align-items:start;">
                 <!-- Create Quiz Form -->
                 <div class="dashboard-card glassmorphism" style="padding:22px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); height:auto;">
                     <h3 style="font-size:15px; font-weight:800; color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-lightbulb"></i> Create Quiz & Test</h3>
                     
                     <div style="display:flex; flex-direction:column; gap:12px;">
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Quiz / Test Title</label>
                             <input type="text" id="quizTitle" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. Quiz 3: Relational Calculus">
                         </div>
                         <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Duration (Mins)</label>
                                 <input type="number" id="quizDuration" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" value="15">
                             </div>
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Total Marks</label>
                                 <input type="number" id="quizTotalMarks" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" value="20">
                             </div>
                         </div>
                         
                         <!-- Question Builder block -->
                         <div class="glassmorphism" style="padding:12px; border:1px solid var(--border-color); border-radius:6px; background:rgba(255,255,255,0.01);">
                             <strong style="font-size:11px; color:var(--text-primary); display:block; margin-bottom:10px;"><i class="fa-solid fa-circle-plus" style="color:var(--primary);"></i> Add MCQ Question</strong>
                             <div style="display:flex; flex-direction:column; gap:8px;">
                                 <input type="text" id="qText" class="form-input" style="height:32px; font-size:11px;" placeholder="Question Text">
                                 <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                                     <input type="text" id="qOptA" class="form-input" style="height:30px; font-size:10px;" placeholder="Option A">
                                     <input type="text" id="qOptB" class="form-input" style="height:30px; font-size:10px;" placeholder="Option B">
                                     <input type="text" id="qOptC" class="form-input" style="height:30px; font-size:10px;" placeholder="Option C">
                                     <input type="text" id="qOptD" class="form-input" style="height:30px; font-size:10px;" placeholder="Option D">
                                 </div>
                                 <select id="qCorrect" class="form-input" style="height:30px; font-size:10px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                     <option value="A">Correct Option: A</option>
                                     <option value="B">Correct Option: B</option>
                                     <option value="C">Correct Option: C</option>
                                     <option value="D">Correct Option: D</option>
                                 </select>
                                 <button type="button" class="btn" id="addQuestionBtn" style="background:rgba(99,102,241,0.1); color:var(--primary); font-size:11px; padding:6px; border-radius:4px; font-weight:600; justify-content:center;">Save Question (<span id="addedQuestionsCount">0</span> added)</button>
                             </div>
                         </div>

                         <button type="button" class="btn btn-primary" id="publishQuizBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px; border-radius:6px; font-weight:600; font-size:12px; gap:6px; margin-top:5px; justify-content:center;">
                             <i class="fa-solid fa-square-rss"></i> Publish Quiz Live
                         </button>
                     </div>
                 </div>

                 <div style="display:flex; flex-direction:column; gap:20px;">
                     <!-- Active Quizzes List -->
                     <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px;">
                         <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-rectangle-list" style="color:var(--primary); margin-right:5px;"></i> Class Quiz Registry</h3>
                         <div id="classroomQuizList" style="display:flex; flex-direction:column; gap:15px;">
                             <!-- Loaded dynamically -->
                         </div>
                     </div>

                     <!-- Student Submissions / Responses Panel -->
                     <div class="dashboard-card glassmorphism" id="quizResponsesPanel" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px; display:none;">
                         <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
                             <h3 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;" id="responsesPanelTitle">Quiz Responses Ledger</h3>
                             <span id="responsesAvgLabel" style="font-size:11px; background:rgba(16,185,129,0.15); color:#10b981; padding:3px 8px; border-radius:4px; font-weight:700;">Class Average: 80%</span>
                         </div>
                         <div class="table-responsive">
                             <table class="excel-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
                                 <thead>
                                     <tr>
                                         <th style="width:220px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Student Name</th>
                                         <th style="border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:150px; text-align:center;">Status</th>
                                         <th style="border-bottom:1px solid var(--border-color); width:180px; text-align:center;">Score Earned</th>
                                     </tr>
                                 </thead>
                                 <tbody id="responsesGridBody">
                                     <!-- Loaded dynamically via quiz selection -->
                                 </tbody>
                             </table>
                         </div>
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .quiz-item-card {
                padding: 15px 20px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.01);
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: border-color 0.2s ease;
            }
            .quiz-item-card:hover {
                border-color: rgba(99, 102, 241, 0.2);
            }
            .excel-table th {
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 10px 12px;
                font-weight: 700;
                border-bottom: 1px solid var(--border-color);
                box-sizing: border-box;
            }
            .excel-table td {
                padding: 10px 12px;
                border-bottom: 1px solid var(--border-color);
                vertical-align: middle;
                color: var(--text-secondary);
                box-sizing: border-box;
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initQuiz() {
                const titleInput = document.getElementById("quizTitle");
                const durationInput = document.getElementById("quizDuration");
                const totalMarksInput = document.getElementById("quizTotalMarks");
                const publishBtn = document.getElementById("publishQuizBtn");
                const quizList = document.getElementById("classroomQuizList");

                const qText = document.getElementById("qText");
                const qOptA = document.getElementById("qOptA");
                const qOptB = document.getElementById("qOptB");
                const qOptC = document.getElementById("qOptC");
                const qOptD = document.getElementById("qOptD");
                const qCorrect = document.getElementById("qCorrect");
                const addQBtn = document.getElementById("addQuestionBtn");
                const addedQCount = document.getElementById("addedQuestionsCount");

                const responsesPanel = document.getElementById("quizResponsesPanel");
                const responsesPanelTitle = document.getElementById("responsesPanelTitle");
                const responsesAvgLabel = document.getElementById("responsesAvgLabel");
                const responsesGridBody = document.getElementById("responsesGridBody");

                let currentQuestionsList = [];
                let selectedQuizId = null;

                // Default active quizzes database
                const defaultQuizzes = [
                    { id: 1, title: "Quiz 1: SQL Basic Queries & Filters", duration: 15, marks: 20, qCount: 10, status: "Live", completed: 5, total: 5 },
                    { id: 2, title: "Quiz 2: Database Schema & Relations", duration: 20, marks: 20, qCount: 10, status: "Completed", completed: 4, total: 5 }
                ];

                // Mock student responses for active quizzes
                const mockQuizResponses = {
                    "BCA23015": { name: "Vikram Kumawat", status: "Completed", score: 18 },
                    "CSE23099": { name: "Priya Sharma", status: "Completed", score: 15 },
                    "CSE23115": { name: "Aditya Bose", status: "Completed", score: 16 },
                    "BCA23088": { name: "Neha Sen", status: "Completed", score: 19 },
                    "CSE23045": { name: "Amit Roy", status: "Not Started", score: 0 }
                };

                // Add MCQ Question to buffer
                addQBtn.addEventListener("click", () => {
                    const text = qText.value.trim();
                    const a = qOptA.value.trim();
                    const b = qOptB.value.trim();
                    const c = qOptC.value.trim();
                    const d = qOptD.value.trim();
                    const correct = qCorrect.value;

                    if (!text || !a || !b) {
                        alert("Question text and at least options A and B are required.");
                        return;
                    }

                    currentQuestionsList.push({ text, a, b, c, d, correct });
                    addedQCount.textContent = currentQuestionsList.length;

                    // Clear inputs
                    qText.value = "";
                    qOptA.value = "";
                    qOptB.value = "";
                    qOptC.value = "";
                    qOptD.value = "";
                    qCorrect.value = "A";

                    showToast("Question saved in temporary builder!");
                });

                // Populate quizzes list
                function renderQuizzes() {
                    const localQuizzes = JSON.parse(localStorage.getItem("classroomQuizzes")) || [];
                    const fullList = [...localQuizzes, ...defaultQuizzes];

                    if (fullList.length === 0) {
                        quizList.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0;">No active quizzes found in this registry.</div>';
                        return;
                    }

                    quizList.innerHTML = fullList.map(q => {
                        let statusColor = "";
                        if (q.status === "Live") statusColor = "#10b981";
                        else if (q.status === "Completed") statusColor = "var(--text-tertiary)";
                        else statusColor = "var(--accent)";

                        return '<div class="quiz-item-card glassmorphism">' +
                            '<div>' +
                                '<h4 style="margin:0; font-size:12px; font-weight:700; color:var(--text-primary);">' + q.title + '</h4>' +
                                '<span style="font-size:10px; color:var(--text-tertiary); display:block; margin-top:4px;">' + q.duration + ' Mins • ' + q.qCount + ' MCQs • Total: ' + q.marks + ' Marks</span>' +
                            '</div>' +
                            '<div style="display:flex; gap:10px; align-items:center;">' +
                                '<span style="font-size:10px; background:rgba(255,255,255,0.02); color:' + statusColor + '; padding:3px 8px; border-radius:12px; font-weight:700; border:1px solid ' + statusColor + ';">' + q.status + '</span>' +
                                '<button type="button" class="btn" onclick="openResponsesPanel(' + q.id + ', \\'' + q.title.replace(/'/g, "\\'") + '\\', ' + q.marks + ')" style="background:rgba(99,102,241,0.1); color:var(--primary); font-size:11px; padding:6px 12px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-list-check"></i> Answers</button>' +
                                '<button type="button" class="material-delete-btn" onclick="deleteQuiz(' + q.id + ')" style="position:static; display:block; padding:6px; color:var(--text-tertiary);"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Publish Quiz
                publishBtn.addEventListener("click", () => {
                    const title = titleInput.value.trim();
                    const duration = parseInt(durationInput.value);
                    const marks = parseInt(totalMarksInput.value);

                    if (!title) {
                        alert("Please specify quiz title.");
                        return;
                    }

                    const localQuizzes = JSON.parse(localStorage.getItem("classroomQuizzes")) || [];
                    const newQuiz = {
                        id: Date.now(),
                        title: title,
                        duration: duration,
                        marks: marks,
                        qCount: currentQuestionsList.length > 0 ? currentQuestionsList.length : 10,
                        status: "Live",
                        completed: 0,
                        total: 5
                    };

                    localQuizzes.unshift(newQuiz);
                    localStorage.setItem("classroomQuizzes", JSON.stringify(localQuizzes));

                    // Reset
                    titleInput.value = "";
                    durationInput.value = "15";
                    totalMarksInput.value = "20";
                    currentQuestionsList = [];
                    addedQCount.textContent = "0";

                    renderQuizzes();
                    showToast("Success: MCQ Quiz is now LIVE for students!");
                });

                // Delete Quiz
                window.deleteQuiz = function(id) {
                    if (!confirm("Are you sure you want to remove this quiz from class records?")) return;

                    const localQuizzes = JSON.parse(localStorage.getItem("classroomQuizzes")) || [];
                    const idx = localQuizzes.findIndex(q => q.id === id);

                    if (idx !== -1) {
                        localQuizzes.splice(idx, 1);
                        localStorage.setItem("classroomQuizzes", JSON.stringify(localQuizzes));
                        renderQuizzes();
                        responsesPanel.style.display = "none";
                        showToast("Quiz removed.");
                    } else {
                        alert("Warning: Core preloaded quizzes cannot be deleted.");
                    }
                };

                // Open responses panel
                window.openResponsesPanel = function(id, title, maxMarks) {
                    selectedQuizId = id;
                    responsesPanel.style.display = "block";
                    responsesPanelTitle.innerHTML = '<i class="fa-solid fa-clipboard-question"></i> Responses: ' + title;

                    let scoreSum = 0;
                    let compCount = 0;
                    const studentKeys = Object.keys(mockQuizResponses);

                    responsesGridBody.innerHTML = studentKeys.map(k => {
                        const s = mockQuizResponses[k];
                        let statusColor = s.status === "Completed" ? "#10b981" : "#ef4444";
                        
                        if (s.status === "Completed") {
                            scoreSum += s.score;
                            compCount++;
                        }

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + k + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center;"><span style="font-size:10px; background:rgba(255,255,255,0.02); color:' + statusColor + '; padding:2px 6px; border-radius:4px; border:1px solid ' + statusColor + '; font-weight:600;">' + s.status + '</span></td>' +
                            '<td style="text-align:center; font-family:monospace; font-weight:700; color:var(--primary);">' + (s.status === "Completed" ? s.score : "—") + ' <span style="font-size:10px; color:var(--text-tertiary);">/ ' + maxMarks + '</span></td>' +
                            '</tr>';
                    }).join("");

                    const avg = compCount > 0 ? ((scoreSum / (compCount * maxMarks)) * 100).toFixed(1) : "—";
                    responsesAvgLabel.textContent = "Class Average: " + avg + "%";
                };

                renderQuizzes();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initQuiz);
            } else {
                initQuiz();
            }
        `
    },
    "discussion": {
        htmlContent: `
             <div style="display:grid; grid-template-columns: 340px 1fr; gap:25px; align-items:start;">
                 <!-- Create Topic Card -->
                 <div class="dashboard-card glassmorphism" style="padding:22px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); height:auto;">
                     <h3 style="font-size:15px; font-weight:800; color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-comments"></i> Start Discussion</h3>
                     
                     <div style="display:flex; flex-direction:column; gap:12px;">
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Discussion Topic</label>
                             <input type="text" id="discTitle" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. Clarification on Relational Algebra">
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Category Tag</label>
                             <select id="discTag" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                 <option value="general">General Queries</option>
                                 <option value="project">Project Work</option>
                                 <option value="exam">Exams & Tests</option>
                                 <option value="help">Technical Help</option>
                             </select>
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Topic Description</label>
                             <textarea id="discDesc" class="form-input" style="height:80px; font-size:12px; border-radius:6px; padding:10px; resize:vertical; width:100%; box-sizing:border-box;" placeholder="Add initial post details..."></textarea>
                         </div>
                         <button type="button" class="btn btn-primary" id="createDiscBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px; border-radius:6px; font-weight:600; font-size:12px; gap:6px; margin-top:10px; justify-content:center;">
                             <i class="fa-solid fa-paper-plane"></i> Launch Topic
                         </button>
                     </div>
                 </div>

                 <div style="display:flex; flex-direction:column; gap:20px;">
                     <!-- Active Discussions list -->
                     <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px;">
                         <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-solid fa-message" style="color:var(--primary); margin-right:5px;"></i> Active Topics</h3>
                         <div id="activeDiscList" style="display:flex; flex-direction:column; gap:12px;">
                             <!-- Loaded dynamically -->
                         </div>
                     </div>

                     <!-- Discussion Thread Detail Panel -->
                     <div class="dashboard-card glassmorphism" id="threadPanel" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px; display:none;">
                         <div style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
                             <div style="display:flex; justify-content:space-between; align-items:center;">
                                 <h3 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;" id="threadPanelTitle">Topic Details</h3>
                                 <span id="threadCategoryBadge" style="font-size:10px; background:rgba(99,102,241,0.15); color:var(--primary); padding:3px 8px; border-radius:4px; font-weight:700; text-transform:uppercase;">GENERAL</span>
                             </div>
                             <p style="margin:8px 0 0 0; font-size:12px; color:var(--text-secondary); line-height:1.5;" id="threadPanelDesc">Topic initial description text goes here.</p>
                         </div>
                         
                         <!-- Messages Stream -->
                         <div id="threadMessagesStream" style="display:flex; flex-direction:column; gap:12px; max-height:300px; overflow-y:auto; margin-bottom:15px; padding-right:5px;">
                             <!-- Loaded dynamically -->
                         </div>

                         <!-- Reply input box -->
                         <div style="display:flex; gap:10px; align-items:center; border-top:1px solid var(--border-color); padding-top:15px;">
                             <input type="text" id="threadReplyInput" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary); padding:0 12px; flex:1;" placeholder="Type your reply to this topic...">
                             <button type="button" id="sendReplyBtn" class="btn btn-primary" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px 16px; font-size:12px; border-radius:6px; font-weight:600; gap:5px;"><i class="fa-solid fa-reply"></i> Reply</button>
                         </div>
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .disc-item-card {
                padding: 12px 18px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.01);
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: border-color 0.2s ease;
            }
            .disc-item-card:hover {
                border-color: rgba(99, 102, 241, 0.2);
            }
            .reply-message-item {
                display: flex;
                gap: 12px;
                align-items: start;
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initDiscussion() {
                const titleInput = document.getElementById("discTitle");
                const tagSelect = document.getElementById("discTag");
                const descInput = document.getElementById("discDesc");
                const createBtn = document.getElementById("createDiscBtn");
                const discList = document.getElementById("activeDiscList");

                const threadPanel = document.getElementById("threadPanel");
                const threadPanelTitle = document.getElementById("threadPanelTitle");
                const threadCategoryBadge = document.getElementById("threadCategoryBadge");
                const threadPanelDesc = document.getElementById("threadPanelDesc");
                const messagesStream = document.getElementById("threadMessagesStream");
                const replyInput = document.getElementById("threadReplyInput");
                const sendReplyBtn = document.getElementById("sendReplyBtn");

                let selectedTopicId = null;

                // Default active discussion topics
                const defaultDiscussions = [
                    {
                        id: 1,
                        title: "Clarification on BCNF vs 3NF decomposition",
                        category: "exam",
                        desc: "Hi everyone, can someone explain with a simple example when a relation is in 3NF but not in BCNF? We need this clarified before Wednesday's quiz.",
                        replies: [
                            { author: "Vikram Kumawat", content: "Sir, if we have relation R(A,B,C) with FDs A->B and C->A. Here keys are A and C. C->A has superkey on LHS but A->B does not. So it's in 3NF but not in BCNF." },
                            { author: "Dr. Rajesh Kumar", content: "Exactly Vikram, well explained. C->A is perfectly fine since C is a key, but in A->B, A is prime (part of key AC) but not superkey. Excellent example." }
                        ]
                    },
                    {
                        id: 2,
                        author: "Dr. Rajesh Kumar",
                        title: "Group Mini-Project Topics suggestions",
                        category: "project",
                        desc: "Please submit your group project proposals (min 3 members, max 4 members) detailing the schema design and tech stack you will use by this Saturday.",
                        replies: [
                            { author: "Priya Sharma", content: "Sir, can we build an Online Book Store database system?" },
                            { author: "Dr. Rajesh Kumar", content: "Yes Priya, Online Book Store is a good topic. Ensure you have at least 8 entity tables with normalized forms." }
                        ]
                    }
                ];

                // Populate active discussions list
                function renderDiscussions() {
                    const localDiscs = JSON.parse(localStorage.getItem("classroomDiscussions")) || [];
                    const fullList = [...localDiscs, ...defaultDiscussions];

                    if (fullList.length === 0) {
                        discList.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0;">No active discussion topics started.</div>';
                        return;
                    }

                    discList.innerHTML = fullList.map(d => {
                        let tagColor = "var(--primary)";
                        if (d.category === "project") tagColor = "#f59e0b";
                        else if (d.category === "exam") tagColor = "#ef4444";
                        else if (d.category === "help") tagColor = "#10b981";

                        return '<div class="disc-item-card glassmorphism">' +
                            '<div>' +
                                '<span style="font-size:8px; background:rgba(255,255,255,0.02); color:' + tagColor + '; border:1px solid ' + tagColor + '; padding:2px 6px; border-radius:4px; font-weight:700; text-transform:uppercase;">' + d.category + '</span>' +
                                '<h4 style="margin:6px 0 0 0; font-size:12px; font-weight:700; color:var(--text-primary);">' + d.title + '</h4>' +
                            '</div>' +
                            '<div style="display:flex; gap:10px; align-items:center;">' +
                                '<span style="font-size:11px; color:var(--text-secondary);"><i class="fa-regular fa-comment"></i> ' + d.replies.length + ' Replies</span>' +
                                '<button type="button" class="btn" onclick="openThreadPanel(' + d.id + ')" style="background:rgba(99,102,241,0.1); color:var(--primary); font-size:11px; padding:6px 12px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-regular fa-folder-open"></i> Open</button>' +
                                '<button type="button" class="material-delete-btn" onclick="deleteTopic(' + d.id + ')" style="position:static; display:block; padding:6px; color:var(--text-tertiary);"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Start Discussion topic
                createBtn.addEventListener("click", () => {
                    const title = titleInput.value.trim();
                    const category = tagSelect.value;
                    const desc = descInput.value.trim();

                    if (!title || !desc) {
                        alert("Topic title and description are required.");
                        return;
                    }

                    const localDiscs = JSON.parse(localStorage.getItem("classroomDiscussions")) || [];
                    const newTopic = {
                        id: Date.now(),
                        title: title,
                        category: category,
                        desc: desc,
                        replies: []
                    };

                    localDiscs.unshift(newTopic);
                    localStorage.setItem("classroomDiscussions", JSON.stringify(localDiscs));

                    titleInput.value = "";
                    descInput.value = "";

                    renderDiscussions();
                    showToast("Success: Discussion topic launched to class feed!");
                });

                // Delete topic
                window.deleteTopic = function(id) {
                    if (!confirm("Are you sure you want to delete this discussion topic?")) return;

                    const localDiscs = JSON.parse(localStorage.getItem("classroomDiscussions")) || [];
                    const idx = localDiscs.findIndex(d => d.id === id);

                    if (idx !== -1) {
                        localDiscs.splice(idx, 1);
                        localStorage.setItem("classroomDiscussions", JSON.stringify(localDiscs));
                        renderDiscussions();
                        threadPanel.style.display = "none";
                        showToast("Discussion topic removed.");
                    } else {
                        alert("Warning: Core preloaded topics cannot be deleted.");
                    }
                };

                // Open discussion thread details
                window.openThreadPanel = function(id) {
                    selectedTopicId = id;
                    threadPanel.style.display = "block";

                    const localDiscs = JSON.parse(localStorage.getItem("classroomDiscussions")) || [];
                    const fullList = [...localDiscs, ...defaultDiscussions];
                    const topic = fullList.find(d => d.id === id);

                    if (!topic) return;

                    threadPanelTitle.textContent = topic.title;
                    threadPanelDesc.textContent = topic.desc;
                    threadCategoryBadge.textContent = topic.category;

                    // Load replies
                    renderReplies(topic.replies);
                };

                function renderReplies(replies) {
                    if (replies.length === 0) {
                        messagesStream.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0; font-size:11px;">No replies yet. Start the conversation below!</div>';
                        return;
                    }

                    messagesStream.innerHTML = replies.map(r => {
                        return '<div class="reply-message-item">' +
                            '<i class="fa-solid fa-circle-user" style="font-size:28px; color:var(--primary); margin-top:2px;"></i>' +
                            '<div style="background:rgba(255,255,255,0.02); padding:10px 14px; border-radius:8px; border:1px solid var(--border-color); flex:1;">' +
                                '<strong style="font-size:11px; color:var(--text-primary);">' + r.author + '</strong>' +
                                '<p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary); line-height:1.5;">' + r.content + '</p>' +
                            '</div>' +
                        '</div>';
                    }).join("");

                    // Auto scroll to bottom
                    messagesStream.scrollTop = messagesStream.scrollHeight;
                }

                // Send reply action
                sendReplyBtn.addEventListener("click", () => {
                    const text = replyInput.value.trim();
                    if (!text) return;

                    const localDiscs = JSON.parse(localStorage.getItem("classroomDiscussions")) || [];
                    const topic = localDiscs.find(d => d.id === selectedTopicId);

                    if (topic) {
                        topic.replies.push({ author: "Dr. Rajesh Kumar", content: text });
                        localStorage.setItem("classroomDiscussions", JSON.stringify(localDiscs));
                        renderReplies(topic.replies);
                    } else {
                        // Preloaded default topic
                        const defaultTopic = defaultDiscussions.find(d => d.id === selectedTopicId);
                        if (defaultTopic) {
                            defaultTopic.replies.push({ author: "Dr. Rajesh Kumar", content: text });
                            renderReplies(defaultTopic.replies);
                        }
                    }

                    replyInput.value = "";
                    renderDiscussions();
                    showToast("Reply posted successfully!");
                });

                // Bind enter key on reply input
                replyInput.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        sendReplyBtn.click();
                    }
                });

                renderDiscussions();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initDiscussion);
            } else {
                initDiscussion();
            }
        `
    },
    "grades": {
        htmlContent: `
             <div class="dashboard-card glassmorphism" style="margin-bottom:25px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05);">
                 <h3 style="font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px; color:var(--primary);">
                     <i class="fa-solid fa-percent" style="background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i> Course Grading & Evaluation
                 </h3>
                 <p style="color:var(--text-secondary); font-size:13px; margin-top:5px; margin-bottom:20px;">
                     Evaluate final student grades based on attendance ratio, assignment submissions, quiz evaluations, and classroom participation.
                 </p>

                 <!-- Overall statistics panel -->
                 <div class="stats-row" style="margin-bottom:25px; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:15px;">
                     <div class="stat-card glassmorphism" style="padding:15px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(99, 102, 241, 0.1); border-radius:8px;">
                         <i class="fa-solid fa-calculator" style="font-size:24px; color:var(--primary);"></i>
                         <div>
                             <h3 id="gradeClassAvg" style="font-size:18px; font-weight:800; margin:0;">8.42</h3>
                             <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Class Avg Grade Point</p>
                         </div>
                     </div>
                     <div class="stat-card glassmorphism" style="padding:15px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(16, 185, 129, 0.1); border-radius:8px;">
                         <i class="fa-solid fa-user-check" style="font-size:24px; color:#10b981;"></i>
                         <div>
                             <h3 id="gradeEvaluated" style="font-size:18px; font-weight:800; margin:0;">5 / 5</h3>
                             <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Graded Cohort</p>
                         </div>
                     </div>
                     <div class="stat-card glassmorphism" style="padding:15px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(245, 158, 11, 0.1); border-radius:8px;">
                         <i class="fa-solid fa-clock-rotate-left" style="font-size:24px; color:#f59e0b;"></i>
                         <div>
                             <h3 id="gradePending" style="font-size:18px; font-weight:800; margin:0;">0</h3>
                             <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Pending Approvals</p>
                         </div>
                     </div>
                 </div>

                 <!-- Spreadsheet Evaluation grid -->
                 <div class="glassmorphism" style="border:1px solid var(--border-color); border-radius:var(--border-radius-sm); overflow:hidden; background:rgba(255,255,255,0.01); margin-bottom:20px;">
                     <div style="padding:15px 20px; border-bottom:1px solid var(--border-color); background:rgba(255,255,255,0.02); display:flex; justify-content:space-between; align-items:center;">
                         <strong style="font-size:13px; color:var(--text-primary);"><i class="fa-solid fa-table-list" style="color:var(--primary); margin-right:5px;"></i> Final Evaluation Sheet</strong>
                         <span style="font-size:11px; color:var(--text-tertiary);">Edit participation marks to adjust final calculated grades.</span>
                     </div>
                     <div class="table-responsive">
                         <table class="excel-table" style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
                             <thead>
                                 <tr>
                                     <th style="width:200px; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color);">Student Name</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:120px;">Attendance (10)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:120px;">Assignments (30)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:120px;">Quizzes (20)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:130px;">Class Participation (40)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); width:110px;">Total (100)</th>
                                     <th style="text-align:center; border-bottom:1px solid var(--border-color); width:100px;">Final Grade</th>
                                 </tr>
                             </thead>
                             <tbody id="evaluationGridBody">
                                 <!-- Loaded dynamically -->
                             </tbody>
                         </table>
                     </div>
                 </div>

                 <!-- Publish Actions -->
                 <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:20px;">
                     <button type="button" class="btn" id="saveGradesDraftBtn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); padding:10px 20px; font-weight:600; font-size:12px; border-radius:6px; color:var(--text-secondary);"><i class="fa-solid fa-floppy-disk"></i> Save Draft</button>
                     <button type="button" class="btn btn-primary" id="publishGradesBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px 20px; font-weight:600; font-size:12px; border-radius:6px;"><i class="fa-solid fa-paper-plane"></i> Publish Final Grades</button>
                 </div>
             </div>
        `,
        cssContent: `
            .excel-table th {
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 12px 15px;
                font-weight: 700;
                border-bottom: 1px solid var(--border-color);
                box-sizing: border-box;
            }
            .excel-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
                vertical-align: middle;
                color: var(--text-secondary);
                box-sizing: border-box;
            }
            .excel-table tr:hover td {
                background: rgba(255, 255, 255, 0.02);
            }
            .grade-badge {
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 700;
                display: inline-block;
            }
            .badge-A { background: rgba(16, 185, 129, 0.15); color: #10b981; }
            .badge-B { background: rgba(99, 102, 241, 0.15); color: var(--primary); }
            .badge-C { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
            .badge-D { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
            .badge-F { background: rgba(239, 68, 68, 0.25); color: #ef4444; border:1px solid #ef4444; }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initGrades() {
                const gridBody = document.getElementById("evaluationGridBody");
                const saveDraftBtn = document.getElementById("saveGradesDraftBtn");
                const publishBtn = document.getElementById("publishGradesBtn");
                const classAvgLabel = document.getElementById("gradeClassAvg");

                // Default grading database
                const defaultGrades = {
                    "BCA23015": { name: "Vikram Kumawat", att: 9.5, assign: 28, quiz: 18, participation: 38 },
                    "CSE23099": { name: "Priya Sharma", att: 8.8, assign: 26, quiz: 15, participation: 34 },
                    "CSE23115": { name: "Aditya Bose", att: 8.1, assign: 24, quiz: 16, participation: 32 },
                    "BCA23088": { name: "Neha Sen", att: 9.8, assign: 29, quiz: 19, participation: 39 },
                    "CSE23045": { name: "Amit Roy", att: 7.2, assign: 18, quiz: 10, participation: 22 }
                };

                // Render grid
                function loadGrades() {
                    const savedDraft = JSON.parse(localStorage.getItem("classroomGradesDraft")) || defaultGrades;

                    let totalGradePoint = 0;
                    const studentKeys = Object.keys(savedDraft);

                    gridBody.innerHTML = studentKeys.map(k => {
                        const s = savedDraft[k];
                        const total = s.att + s.assign + s.quiz + s.participation;
                        
                        let grade = "F";
                        let gradePoint = 0;
                        if (total >= 90) { grade = "A"; gradePoint = 10; }
                        else if (total >= 80) { grade = "B"; gradePoint = 8; }
                        else if (total >= 70) { grade = "C"; gradePoint = 6; }
                        else if (total >= 50) { grade = "D"; gradePoint = 4; }
                        else { grade = "F"; gradePoint = 0; }

                        totalGradePoint += gradePoint;

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + s.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + k + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.att + ' <span style="font-size:10px; color:var(--text-tertiary);">/10</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.assign + ' <span style="font-size:10px; color:var(--text-tertiary);">/30</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + s.quiz + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center;">' +
                                '<input type="number" id="partInput_' + k + '" oninput="recalcRow(\\'' + k + '\\')" class="form-input" style="height:28px; width:70px; text-align:center; display:inline-block; font-size:11px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-secondary);" min="0" max="40" value="' + s.participation + '">' +
                                '<span style="font-size:11px; color:var(--text-tertiary); margin-left:5px;">/40</span>' +
                            '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace; font-weight:700; color:var(--primary);" id="total_' + k + '">' + total + '</td>' +
                            '<td style="text-align:center;"><span class="grade-badge badge-' + grade + '" id="badge_' + k + '">' + grade + '</span></td>' +
                            '</tr>';
                    }).join("");

                    classAvgLabel.textContent = (totalGradePoint / studentKeys.length).toFixed(2);
                }

                // Recalculate row on keypress/input
                window.recalcRow = function(studentId) {
                    const input = document.getElementById("partInput_" + studentId);
                    const totalLabel = document.getElementById("total_" + studentId);
                    const badge = document.getElementById("badge_" + studentId);

                    const val = parseInt(input.value) || 0;
                    
                    const savedDraft = JSON.parse(localStorage.getItem("classroomGradesDraft")) || defaultGrades;
                    const s = savedDraft[studentId];

                    if (s) {
                        const total = s.att + s.assign + s.quiz + val;
                        totalLabel.textContent = total;

                        let grade = "F";
                        if (total >= 90) grade = "A";
                        else if (total >= 80) grade = "B";
                        else if (total >= 70) grade = "C";
                        else if (total >= 50) grade = "D";
                        else grade = "F";

                        badge.className = "grade-badge badge-" + grade;
                        badge.textContent = grade;
                    }
                };

                // Save draft
                saveDraftBtn.addEventListener("click", () => {
                    const currentDraft = {};
                    const savedDraft = JSON.parse(localStorage.getItem("classroomGradesDraft")) || defaultGrades;

                    Object.keys(savedDraft).forEach(k => {
                        const input = document.getElementById("partInput_" + k);
                        const val = parseInt(input.value) || 0;
                        currentDraft[k] = {
                            name: savedDraft[k].name,
                            att: savedDraft[k].att,
                            assign: savedDraft[k].assign,
                            quiz: savedDraft[k].quiz,
                            participation: val
                        };
                    });

                    localStorage.setItem("classroomGradesDraft", JSON.stringify(currentDraft));
                    showToast("Evaluation draft saved successfully!");
                });

                // Publish
                publishBtn.addEventListener("click", () => {
                    if (!confirm("Are you sure you want to publish final grades to the registry? This will update student portal records.")) return;
                    
                    saveDraftBtn.click(); // Sync first
                    showToast("Success: Course final grades published to registry!");
                });

                loadGrades();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initGrades);
            } else {
                initGrades();
            }
        `
    },
    "members": {
        htmlContent: `
             <!-- Teachers Section -->
             <div class="dashboard-card glassmorphism" style="margin-bottom:25px; border:1px solid rgba(99, 102, 241, 0.1); height:auto; padding:22px;">
                 <h3 style="font-size:14px; font-weight:800; color:var(--primary); margin-bottom:15px; text-transform:uppercase; letter-spacing:0.5px;"><i class="fa-solid fa-chalkboard-user"></i> Teachers</h3>
                 <div style="display:flex; align-items:center; gap:15px; background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:12px 18px; border-radius:8px; width:fit-content; min-width:320px;">
                     <i class="fa-solid fa-circle-user" style="font-size:40px; color:var(--primary);"></i>
                     <div style="flex:1;">
                         <h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text-primary);">Dr. Rajesh Kumar</h4>
                         <span style="font-size:10px; color:var(--text-tertiary);">Faculty Coordinator • rajesh.kumar@college.edu</span>
                     </div>
                 </div>
             </div>

             <!-- Students Directory -->
             <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px;">
                 <!-- Directory Header & Search -->
                 <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
                     <h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin:0;"><i class="fa-solid fa-users" style="color:var(--primary); margin-right:5px;"></i> Class Students Roster</h3>
                     
                     <div style="display:flex; gap:10px; align-items:center;">
                         <input type="text" id="memberSearch" class="form-input" style="height:32px; width:220px; font-size:11px; border-radius:6px;" placeholder="Search by student name or roll no...">
                         <span id="memberCountLabel" style="font-size:11px; background:rgba(99,102,241,0.15); color:var(--primary); padding:3px 8px; border-radius:4px; font-weight:700;">5 Students</span>
                     </div>
                 </div>

                 <!-- Roster Grid -->
                 <div id="rosterList" style="display:flex; flex-direction:column; gap:12px;">
                     <!-- Loaded dynamically -->
                 </div>
             </div>
        `,
        cssContent: `
            .roster-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 20px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.01);
                transition: border-color 0.2s ease, transform 0.2s ease;
            }
            .roster-row:hover {
                border-color: rgba(99, 102, 241, 0.2);
                transform: translateX(2px);
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initMembers() {
                const search = document.getElementById("memberSearch");
                const countLabel = document.getElementById("memberCountLabel");
                const rosterList = document.getElementById("rosterList");

                // Default cohort database
                const defaultCohort = [
                    { id: "BCA23015", name: "Vikram Kumawat", role: "Class Representative", email: "vikram.kumawat@college.edu", status: "Active" },
                    { id: "CSE23099", name: "Priya Sharma", role: "Student", email: "priya.sharma@college.edu", status: "Active" },
                    { id: "CSE23115", name: "Aditya Bose", role: "Student", email: "aditya.bose@college.edu", status: "Active" },
                    { id: "BCA23088", name: "Neha Sen", role: "Student", email: "neha.sen@college.edu", status: "Active" },
                    { id: "CSE23045", name: "Amit Roy", role: "Student", email: "amit.roy@college.edu", status: "Inactive" }
                ];

                function renderRoster() {
                    const localCohort = JSON.parse(localStorage.getItem("classroomCohort")) || defaultCohort;
                    const query = search.value.trim().toLowerCase();

                    const filtered = localCohort.filter(s => 
                        s.name.toLowerCase().includes(query) || 
                        s.id.toLowerCase().includes(query)
                    );

                    countLabel.textContent = filtered.length + " Students";

                    if (filtered.length === 0) {
                        rosterList.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0;">No matching student profiles found.</div>';
                        return;
                    }

                    rosterList.innerHTML = filtered.map(s => {
                        let roleBadge = "";
                        if (s.role === "Class Representative") {
                            roleBadge = '<span style="font-size:9px; background:rgba(99,102,241,0.15); color:var(--primary); padding:2px 6px; border-radius:4px; font-weight:700; margin-left:10px;">CR</span>';
                        }

                        let statusColor = s.status === "Active" ? "#10b981" : "var(--text-tertiary)";

                        return '<div class="roster-row glassmorphism">' +
                            '<div style="display:flex; align-items:center; gap:12px;">' +
                                '<i class="fa-solid fa-circle-user" style="font-size:32px; color:var(--primary);"></i>' +
                                '<div>' +
                                    '<div style="display:flex; align-items:center;">' +
                                        '<strong style="font-size:12px; color:var(--text-primary);">' + s.name + '</strong>' +
                                        roleBadge +
                                    '</div>' +
                                    '<span style="font-size:9px; color:var(--text-tertiary);">' + s.id + ' • ' + s.email + '</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; align-items:center; gap:15px;">' +
                                '<span style="display:flex; align-items:center; gap:5px; font-size:10px; color:var(--text-secondary);">' +
                                    '<span style="width:6px; height:6px; background:' + statusColor + '; border-radius:50%; display:inline-block;"></span> ' + s.status +
                                '</span>' +
                                '<a href="mailto:' + s.email + '" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:11px; padding:6px 12px; border-radius:6px; color:var(--text-secondary); gap:5px;"><i class="fa-regular fa-envelope"></i> Contact</a>' +
                                '<button type="button" class="btn" onclick="removeCohortStudent(\\'' + s.id + '\\')" style="background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.15); font-size:11px; padding:6px 12px; border-radius:6px; color:#ef4444; gap:5px;"><i class="fa-solid fa-user-minus"></i> Remove</button>' +
                            '</div>' +
                            '</div>';
                    }).join("");
                }

                // Remove cohort student helper
                window.removeCohortStudent = function(studentId) {
                    if (!confirm("Are you sure you want to remove this student from the classroom cohort?")) return;

                    const localCohort = JSON.parse(localStorage.getItem("classroomCohort")) || defaultCohort;
                    const idx = localCohort.findIndex(s => s.id === studentId);

                    if (idx !== -1) {
                        localCohort.splice(idx, 1);
                        localStorage.setItem("classroomCohort", JSON.stringify(localCohort));
                        renderRoster();
                        showToast("Student removed from class registry.");
                    } else {
                        alert("Warning: Core cohort students cannot be removed.");
                    }
                };

                // Add search listener
                search.addEventListener("input", renderRoster);

                renderRoster();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initMembers);
            } else {
                initMembers();
            }
        `
    },
    "schedule": {
        htmlContent: `
             <div style="display:grid; grid-template-columns: 340px 1fr; gap:25px; align-items:start;">
                 <!-- Schedule Form Card -->
                 <div class="dashboard-card glassmorphism" style="padding:22px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); height:auto;">
                     <h3 style="font-size:15px; font-weight:800; color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-calendar-plus"></i> Schedule Live Class</h3>
                     
                     <div style="display:flex; flex-direction:column; gap:12px;">
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Lecture Topic</label>
                             <input type="text" id="lectureTopic" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. DBMS Normalization (3NF & BCNF)">
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Target Course/Batch</label>
                             <select id="lectureBatch" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                 <option value="BCA-A">BCA Sem 3 (Sec A)</option>
                                 <option value="BCA-B">BCA Sem 3 (Sec B)</option>
                                 <option value="CSE-5">B.Tech CSE Sem 5</option>
                             </select>
                         </div>
                         <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Date</label>
                                 <input type="date" id="lectureDate" class="form-input" style="height:36px; font-size:11px; border-radius:6px;">
                             </div>
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Start Time</label>
                                 <input type="time" id="lectureTime" class="form-input" style="height:36px; font-size:11px; border-radius:6px;">
                             </div>
                         </div>
                         <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Duration</label>
                                 <select id="lectureDuration" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                     <option value="45 Min">45 Min</option>
                                     <option value="1 Hour">1 Hour</option>
                                     <option value="1.5 Hours" selected>1.5 Hours</option>
                                     <option value="2 Hours">2 Hours</option>
                                 </select>
                             </div>
                             <div>
                                 <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Platform</label>
                                 <select id="lecturePlatform" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                     <option value="UnifyEd Live">UnifyEd Live</option>
                                     <option value="Google Meet">Google Meet</option>
                                     <option value="Zoom Link">Zoom</option>
                                 </select>
                             </div>
                         </div>
                         <button type="button" class="btn btn-primary" id="scheduleBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px; border-radius:6px; font-weight:600; font-size:12px; gap:6px; margin-top:10px; justify-content:center;">
                             <i class="fa-solid fa-calendar-plus"></i> Schedule Lecture
                         </button>
                     </div>
                 </div>

                 <!-- Upcoming Scheduled Lectures -->
                 <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding: 22px;">
                     <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:15px;">
                         <h3 style="margin:0; font-size:15px; font-weight:700; color:var(--text-primary);"><i class="fa-solid fa-list-check"></i> Upcoming Live Lectures</h3>
                         <span style="font-size:11px; color:var(--text-tertiary);" id="lectureCountLabel">3 lectures scheduled</span>
                     </div>

                     <!-- Lectures List -->
                     <div id="lecturesList" style="display:flex; flex-direction:column; gap:15px;">
                         <!-- Dynamic Schedule items go here -->
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .lecture-item-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                background: rgba(30, 41, 59, 0.45);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                transition: transform 0.2s ease, border-color 0.2s ease;
                gap: 15px;
                flex-wrap: wrap;
            }
            .lecture-item-row:hover {
                transform: translateY(-2px);
                border-color: rgba(99, 102, 241, 0.25);
            }
            .lecture-badge {
                font-size: 9px;
                padding: 3px 8px;
                border-radius: 12px;
                font-weight: 700;
                text-transform: uppercase;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }
            .lecture-delete-btn {
                background: transparent;
                border: none;
                color: var(--text-tertiary);
                cursor: pointer;
                font-size: 13px;
                padding: 6px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            .lecture-delete-btn:hover {
                color: #ef4444;
                background: rgba(239, 68, 68, 0.1);
            }
        `,
        jsContent: `
            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initScheduleLectures() {
                const topicInput = document.getElementById("lectureTopic");
                const batchSelect = document.getElementById("lectureBatch");
                const dateInput = document.getElementById("lectureDate");
                const timeInput = document.getElementById("lectureTime");
                const durationSelect = document.getElementById("lectureDuration");
                const platformSelect = document.getElementById("lecturePlatform");
                const scheduleBtn = document.getElementById("scheduleBtn");
                const listContainer = document.getElementById("lecturesList");
                const countLabel = document.getElementById("lectureCountLabel");

                // Set default date as today
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
                timeInput.value = "10:30";

                // Default starting scheduled classes
                const defaultLectures = [
                    { id: 201, topic: "DBMS Lecture: Normalization & Keys", batch: "BCA Sem 3 (Sec A)", datetime: today + " • 10:30 AM", duration: "1.5 Hours", platform: "UnifyEd Live", link: "../../live-classes/start-class/start-class.html" },
                    { id: 202, topic: "Web Technology Lab: CSS Grid Layouts", batch: "BCA Sem 3 (Sec B)", datetime: today + " • 01:00 PM", duration: "1.5 Hours", platform: "UnifyEd Live", link: "../../live-classes/start-class/start-class.html" },
                    { id: 203, topic: "Neural Networks: Backpropagation Alg.", batch: "B.Tech CSE Sem 5", datetime: "Tomorrow • 09:30 AM", duration: "1 Hour", platform: "Google Meet", link: "https://meet.google.com/abc-defg-hij" }
                ];

                function loadSchedule() {
                    const localSched = JSON.parse(localStorage.getItem("lectureSchedules")) || [];
                    const allSched = [...localSched, ...defaultLectures];
                    
                    countLabel.textContent = allSched.length + " lectures scheduled";

                    if (allSched.length === 0) {
                        listContainer.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:40px 0;">No lectures scheduled. Create one above!</div>';
                        return;
                    }

                    listContainer.innerHTML = allSched.map(l => {
                        const platColor = l.platform.includes("UnifyEd") ? "rgba(99,102,241,0.15)" : "rgba(168,85,247,0.15)";
                        const platText = l.platform.includes("UnifyEd") ? "var(--primary)" : "var(--accent)";
                        
                        let actionBtn = "";
                        if (l.platform === "UnifyEd Live") {
                            actionBtn = '<a href="' + l.link + '" class="btn btn-primary btn-sm" style="font-size:11px; padding:6px 12px; gap:6px;"><i class="fa-solid fa-circle-play"></i> Start Lecture</a>';
                        } else {
                            actionBtn = '<a href="' + l.link + '" target="_blank" class="btn btn-secondary btn-sm" style="font-size:11px; padding:6px 12px; gap:6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Join link</a>';
                        }

                        return '<div class="lecture-item-row">' +
                            '<div style="display:flex; align-items:center; gap:16px; flex:1; min-width: 250px;">' +
                                '<div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center;">' +
                                    '<i class="fa-solid fa-headset" style="font-size:18px; color:var(--primary);"></i>' +
                                '</div>' +
                                '<div>' +
                                    '<h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text-primary);">' + l.topic + '</h4>' +
                                    '<p style="margin:4px 0 0 0; font-size:10px; color:var(--text-tertiary);">' +
                                        'Batch: <strong>' + l.batch + '</strong> • Length: ' + l.duration +
                                    '</p>' +
                                    '<p style="margin:3px 0 0 0; font-size:10px; color:#10b981; font-weight:600;"><i class="fa-solid fa-calendar-check" style="margin-right:4px;"></i>' + l.datetime + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; align-items:center; gap:12px;">' +
                                '<span class="lecture-badge" style="background:' + platColor + '; color:' + platText + '; border-color:' + platColor + ';">' + l.platform + '</span>' +
                                actionBtn +
                                '<button onclick="deleteLecture(' + l.id + ')" class="lecture-delete-btn" title="Cancel Lecture"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                scheduleBtn.addEventListener("click", () => {
                    const topic = topicInput.value.trim();
                    const batchVal = batchSelect.value;
                    const dateVal = dateInput.value;
                    const timeVal = timeInput.value;
                    const durationVal = durationSelect.value;
                    const platformVal = platformSelect.value;

                    if (!topic || !dateVal || !timeVal) {
                        alert("Please fill in the lecture topic, date, and start time.");
                        return;
                    }

                    // Format batch readable
                    let batchLabel = "";
                    if (batchVal === "BCA-A") batchLabel = "BCA Sem 3 (Sec A)";
                    if (batchVal === "BCA-B") batchLabel = "BCA Sem 3 (Sec B)";
                    if (batchVal === "CSE-5") batchLabel = "B.Tech CSE Sem 5";

                    // Format date readable
                    const dateParts = dateVal.split("-");
                    const dateFormatted = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

                    const localSched = JSON.parse(localStorage.getItem("lectureSchedules")) || [];
                    const newLecture = {
                        id: Date.now(),
                        topic: topic,
                        batch: batchLabel,
                        datetime: dateFormatted + " • " + timeVal,
                        duration: durationVal,
                        platform: platformVal,
                        link: platformVal === "UnifyEd Live" ? "../../live-classes/start-class/start-class.html" : "https://meet.google.com/new-live"
                    };

                    localSched.unshift(newLecture);
                    localStorage.setItem("lectureSchedules", JSON.stringify(localSched));

                    topicInput.value = "";
                    loadSchedule();
                    showToast("Lecture scheduled successfully & invitations sent!");
                });

                window.deleteLecture = function(id) {
                    if (!confirm("Are you sure you want to cancel this scheduled lecture?")) return;

                    const localSched = JSON.parse(localStorage.getItem("lectureSchedules")) || [];
                    const idx = localSched.findIndex(l => l.id === id);

                    if (idx !== -1) {
                        localSched.splice(idx, 1);
                        localStorage.setItem("lectureSchedules", JSON.stringify(localSched));
                        loadSchedule();
                        showToast("Lecture cancelled.");
                    } else {
                        alert("Core preloaded lectures cannot be removed.");
                    }
                };

                loadSchedule();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initScheduleLectures);
            } else {
                initScheduleLectures();
            }
        `
    },
    "start-class": {
        htmlContent: `
             <div style="display:grid; grid-template-columns: 1fr 340px; gap:25px; align-items:start;">
                 <!-- Live Stage (Video Feed & Actions) -->
                 <div class="dashboard-card glassmorphism" style="padding:22px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); height:auto;">
                     <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                         <div style="display:flex; align-items:center; gap:10px;">
                             <span style="display:inline-block; width:10px; height:10px; background-color:#ef4444; border-radius:50%; animation: pulse-red 1.5s infinite;"></span>
                             <h3 style="margin:0; font-size:15px; font-weight:800; color:var(--text-primary);">DBMS Lecture: Live Classroom</h3>
                         </div>
                         <div style="font-size:11px; color:var(--text-secondary); background:rgba(255,255,255,0.05); padding:4px 10px; border-radius:6px; font-weight:600;">
                             <i class="fa-solid fa-clock" style="color:var(--primary); margin-right:4px;"></i> Elapsed: <span id="classTimer">00:00:00</span>
                         </div>
                     </div>

                     <!-- Video Stream Mock Area -->
                     <div id="liveStreamArea" style="position:relative; width:100%; height:420px; background:radial-gradient(circle, #1e1b4b 0%, #09090b 100%); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; border:1px solid rgba(255,255,255,0.05);">
                         
                         <!-- Video Feed Status Indicator -->
                         <div id="webcamOverlay" style="text-align:center; transition: all 0.3s ease;">
                             <div style="width:100px; height:100px; border-radius:50%; background:rgba(99, 102, 241, 0.1); border:2px solid var(--primary); display:flex; align-items:center; justify-content:center; margin:0 auto 15px auto; box-shadow:0 0 25px rgba(99, 102, 241, 0.2);">
                                 <i class="fa-solid fa-user-tie" style="font-size:42px; color:var(--primary);"></i>
                             </div>
                             <h4 style="margin:0; font-size:15px; color:white; font-weight:700;">Dr. Rajesh Kumar</h4>
                             <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Host • Presenting Screen</p>
                         </div>

                         <!-- Screen Share mock visualization (hidden by default) -->
                         <div id="screenShareOverlay" style="display:none; text-align:center; width:100%; height:100%; padding:40px; box-sizing:border-box; background:rgba(15,23,42,0.9); flex-direction:column; align-items:center; justify-content:center;">
                             <i class="fa-solid fa-desktop" style="font-size:64px; color:var(--accent); margin-bottom:15px; text-shadow:0 0 20px rgba(168,85,247,0.3);"></i>
                             <h4 style="margin:0; font-size:16px; color:white; font-weight:700;">You are sharing your desktop screen</h4>
                             <p style="margin:6px 0 0 0; font-size:12px; color:var(--text-secondary); max-width:400px; line-height:1.5;">Students can now view your slides, applications, and browser windows in real time.</p>
                         </div>

                         <!-- Floating overlay badge -->
                         <div style="position:absolute; top:15px; left:15px; display:flex; gap:8px;">
                             <span style="font-size:10px; background:rgba(16,185,129,0.2); color:#10b981; border:1px solid rgba(16,185,129,0.3); padding:4px 8px; border-radius:4px; font-weight:700;"><i class="fa-solid fa-circle-check"></i> STREAM ACTIVE</span>
                             <span id="recordingBadge" style="font-size:10px; background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid rgba(239,68,68,0.3); padding:4px 8px; border-radius:4px; font-weight:700; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-circle" style="font-size:6px; animation:blink-red 1s infinite;"></i> REC</span>
                         </div>

                         <div style="position:absolute; top:15px; right:15px;">
                             <span style="font-size:10px; background:rgba(0,0,0,0.6); color:white; padding:4px 8px; border-radius:4px; font-weight:600;"><i class="fa-solid fa-users"></i> 34 Attendees</span>
                         </div>

                         <!-- Bottom Media Control Bar -->
                         <div style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:12px; background:rgba(15,23,42,0.85); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); padding:8px 18px; border-radius:30px; border:1px solid rgba(255,255,255,0.08); z-index:10;">
                             <button onclick="toggleAudio()" id="audioBtn" class="control-circle" style="background:rgba(255,255,255,0.08); color:white;" title="Mute/Unmute Mic"><i class="fa-solid fa-microphone"></i></button>
                             <button onclick="toggleVideo()" id="videoBtn" class="control-circle" style="background:rgba(255,255,255,0.08); color:white;" title="Start/Stop Video"><i class="fa-solid fa-video"></i></button>
                             <button onclick="toggleShare()" id="shareBtn" class="control-circle" title="Share Screen"><i class="fa-solid fa-desktop"></i></button>
                             <button onclick="toggleRecording()" id="recBtn" class="control-circle" style="background:rgba(255,255,255,0.08); color:#ef4444;" title="Pause/Resume Recording"><i class="fa-solid fa-circle-dot"></i></button>
                             <div style="width:1px; background:rgba(255,255,255,0.15); margin:4px 5px;"></div>
                             <button onclick="endClass()" class="control-circle" style="background:#ef4444; color:white; border-color:#ef4444;" title="End Meeting"><i class="fa-solid fa-phone-slash"></i></button>
                         </div>
                     </div>
                 </div>

                 <!-- Sidebar widgets (Chat & Polls) -->
                 <div style="display:flex; flex-direction:column; gap:25px;">
                     <!-- Live Chat Box -->
                     <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:320px; padding: 18px; display:flex; flex-direction:column; justify-content:space-between;">
                         <h3 style="margin:0 0 12px 0; font-size:13px; font-weight:800; color:var(--primary); text-transform:uppercase; border-bottom:1px solid var(--border-color); padding-bottom:8px;"><i class="fa-regular fa-comments"></i> Live Classroom Chat</h3>
                         
                         <!-- Messages List -->
                         <div id="liveChatMessages" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:10px; margin-bottom:10px; padding-right:5px;">
                             <!-- Mock messages -->
                             <div style="font-size:11px;">
                                 <strong style="color:var(--primary);">Amit Sharma:</strong> <span style="color:var(--text-primary);">Good morning sir! Ready for Relational Algebra.</span>
                             </div>
                             <div style="font-size:11px;">
                                 <strong style="color:var(--accent);">Priya Sen:</strong> <span style="color:var(--text-primary);">Sir, DBMS normalization slides link open nahi ho raha tha last night.</span>
                             </div>
                             <div style="font-size:11px;">
                                 <strong style="color:var(--text-secondary);">Rahul Kumar:</strong> <span style="color:var(--text-primary);">Open link slide share me tha, Priya. I can share again.</span>
                             </div>
                             <div style="font-size:11px;">
                                 <strong style="color:var(--primary);">Amit Sharma:</strong> <span style="color:var(--text-primary);">Sir, BCNF validation rule clarify please.</span>
                             </div>
                         </div>

                         <!-- Chat input -->
                         <div style="display:flex; gap:8px;">
                             <input type="text" id="chatInput" class="form-input" style="height:32px; font-size:11px; flex:1;" placeholder="Send chat to all students...">
                             <button onclick="sendChatMessage()" class="btn btn-primary btn-sm" style="padding:0 12px; height:32px;"><i class="fa-solid fa-paper-plane"></i></button>
                         </div>
                     </div>

                     <!-- Quick Controls Widget -->
                     <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding: 18px;">
                         <h3 style="margin:0 0 12px 0; font-size:13px; font-weight:800; color:var(--primary); text-transform:uppercase; border-bottom:1px solid var(--border-color); padding-bottom:8px;"><i class="fa-solid fa-sliders"></i> Moderator Tools</h3>
                         
                         <div style="display:flex; flex-direction:column; gap:8px;">
                             <button onclick="triggerQuickPoll()" class="btn btn-secondary btn-sm" style="justify-content:flex-start; padding:8px 12px; font-size:11px; gap:8px;"><i class="fa-solid fa-square-poll-horizontal" style="color:var(--accent);"></i> Start Classroom Poll</button>
                             <button onclick="triggerWhiteboard()" class="btn btn-secondary btn-sm" style="justify-content:flex-start; padding:8px 12px; font-size:11px; gap:8px;"><i class="fa-solid fa-chalkboard" style="color:#10b981;"></i> Share Virtual Whiteboard</button>
                             <button onclick="muteAllStudents()" class="btn btn-secondary btn-sm" style="justify-content:flex-start; padding:8px 12px; font-size:11px; gap:8px; color:#ef4444;"><i class="fa-solid fa-microphone-slash"></i> Mute All Students</button>
                         </div>
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .control-circle {
                width: 38px;
                height: 38px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: var(--text-secondary);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
            }
            .control-circle:hover {
                background: rgba(99, 102, 241, 0.15);
                border-color: var(--primary);
                color: white;
            }
            .control-circle.active {
                background: rgba(255,255,255,0.08);
                color: white;
            }
            .control-circle.muted {
                background: rgba(239, 68, 68, 0.1) !important;
                border-color: #ef4444 !important;
                color: #ef4444 !important;
            }
            @keyframes pulse-red {
                0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
            }
            @keyframes blink-red {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `,
        jsContent: `
            // Timer state
            let elapsedSec = 0;
            let timerInterval = null;

            function startTimer() {
                const timerSpan = document.getElementById("classTimer");
                timerInterval = setInterval(() => {
                    elapsedSec++;
                    const hrs = String(Math.floor(elapsedSec / 3600)).padStart(2, '0');
                    const mins = String(Math.floor((elapsedSec % 3600) / 60)).padStart(2, '0');
                    const secs = String(elapsedSec % 60).padStart(2, '0');
                    timerSpan.textContent = hrs + ":" + mins + ":" + secs;
                }, 1000);
            }

            // Audio mute toggle
            window.toggleAudio = function() {
                const audioBtn = document.getElementById("audioBtn");
                audioBtn.classList.toggle("muted");
                const icon = audioBtn.querySelector("i");
                if (audioBtn.classList.contains("muted")) {
                    icon.className = "fa-solid fa-microphone-slash";
                    showToast("Microphone muted");
                } else {
                    icon.className = "fa-solid fa-microphone";
                    showToast("Microphone unmuted");
                }
            };

            // Video camera toggle
            window.toggleVideo = function() {
                const videoBtn = document.getElementById("videoBtn");
                videoBtn.classList.toggle("muted");
                const icon = videoBtn.querySelector("i");
                const webcam = document.getElementById("webcamOverlay");
                
                if (videoBtn.classList.contains("muted")) {
                    icon.className = "fa-solid fa-video-slash";
                    webcam.style.opacity = "0.2";
                    showToast("Video camera stopped");
                } else {
                    icon.className = "fa-solid fa-video";
                    webcam.style.opacity = "1";
                    showToast("Video camera active");
                }
            };

            // Desktop screen share toggle
            window.toggleShare = function() {
                const shareBtn = document.getElementById("shareBtn");
                const webcam = document.getElementById("webcamOverlay");
                const screenShare = document.getElementById("screenShareOverlay");
                
                shareBtn.classList.toggle("active");
                if (shareBtn.classList.contains("active")) {
                    webcam.style.display = "none";
                    screenShare.style.display = "flex";
                    showToast("Sharing your screen...");
                } else {
                    webcam.style.display = "block";
                    screenShare.style.display = "none";
                    showToast("Stopped screen sharing.");
                }
            };

            // Pause/Resume recording toggle
            window.toggleRecording = function() {
                const recBtn = document.getElementById("recBtn");
                const recBadge = document.getElementById("recordingBadge");
                recBtn.classList.toggle("muted");
                
                if (recBtn.classList.contains("muted")) {
                    recBadge.style.display = "none";
                    showToast("Lecture recording paused.");
                } else {
                    recBadge.style.display = "flex";
                    showToast("Lecture recording resumed.");
                }
            };

            // Send dynamic chat message
            window.sendChatMessage = function() {
                const chatInput = document.getElementById("chatInput");
                const text = chatInput.value.trim();
                if (!text) return;

                const chatList = document.getElementById("liveChatMessages");
                const newMsg = document.createElement("div");
                newMsg.style.fontSize = "11px";
                newMsg.innerHTML = '<strong style="color:var(--primary);">You:</strong> <span style="color:var(--text-primary);">' + text + '</span>';
                chatList.appendChild(newMsg);
                chatList.scrollTop = chatList.scrollHeight;
                
                chatInput.value = "";
                showToast("Message broadcasted to room");
            };

            // Moderator Tools
            window.triggerQuickPoll = function() {
                const question = prompt("Enter quick poll question:", "Are Normal forms clear so far?");
                if (question) {
                    showToast("Poll launched: " + question);
                }
            };

            window.triggerWhiteboard = function() {
                showToast("Opening collaborative whiteboard layer...");
            };

            window.muteAllStudents = function() {
                showToast("All student microphones muted by host.");
            };

            window.endClass = function() {
                if (confirm("Are you sure you want to end this live class? This will close the room for all students.")) {
                    clearInterval(timerInterval);
                    window.location.href = "../schedule/schedule.html";
                }
            };

            function initLiveRoom() {
                startTimer();
                
                // Allow chat send on enter key
                document.getElementById("chatInput").addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                        sendChatMessage();
                    }
                });
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initLiveRoom);
            } else {
                initLiveRoom();
            }
        `
    },
    "recordings": {
        htmlContent: `
             <!-- Top Metrics Row -->
             <div class="stats-row" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:20px; margin-bottom:25px;">
                 <div class="stats-card glassmorphism">
                     <div class="stats-icon" style="background:rgba(99,102,241,0.15); color:var(--primary);"><i class="fa-solid fa-film"></i></div>
                     <div class="stats-info">
                         <span class="stats-label">Total Recordings</span>
                         <h2 class="stats-number" id="statsTotal">14 Lectures</h2>
                     </div>
                 </div>
                 <div class="stats-card glassmorphism">
                     <div class="stats-icon" style="background:rgba(168,85,247,0.15); color:var(--accent);"><i class="fa-solid fa-hard-drive"></i></div>
                     <div class="stats-info">
                         <span class="stats-label">Cloud Storage</span>
                         <h2 class="stats-number">18.4 / 50 GB</h2>
                     </div>
                 </div>
                 <div class="stats-card glassmorphism">
                     <div class="stats-icon" style="background:rgba(16,185,129,0.15); color:#10b981;"><i class="fa-solid fa-eye"></i></div>
                     <div class="stats-info">
                         <span class="stats-label">Total Views</span>
                         <h2 class="stats-number">1,420 Views</h2>
                     </div>
                 </div>
                 <div class="stats-card glassmorphism">
                     <div class="stats-icon" style="background:rgba(245,158,11,0.15); color:#f59e0b;"><i class="fa-solid fa-file-lines"></i></div>
                     <div class="stats-info">
                         <span class="stats-label">Transcripts Synced</span>
                         <h2 class="stats-number">12 Files</h2>
                     </div>
                 </div>
             </div>

             <!-- Main Repository Area -->
             <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding:22px;">
                 <!-- Controls & Filters -->
                 <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:15px; flex-wrap:wrap; gap:12px;">
                     <div style="display:flex; gap:8px;" id="recordingsFilters">
                         <button class="filter-tab active" data-filter="all">All Batches</button>
                         <button class="filter-tab" data-filter="BCA-A">BCA Sec A</button>
                         <button class="filter-tab" data-filter="BCA-B">BCA Sec B</button>
                         <button class="filter-tab" data-filter="CSE-5">B.Tech CSE</button>
                     </div>
                     <div style="position:relative; width:220px;">
                         <input type="text" id="recSearch" class="form-input" style="height:32px; font-size:11px; padding-left:30px; border-radius:20px;" placeholder="Search topic...">
                         <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:11px; color:var(--text-tertiary);"></i>
                     </div>
                 </div>

                 <!-- Grid of Video items -->
                 <div id="recordingsGrid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:20px;">
                     <!-- Dynamic video items go here -->
                 </div>
             </div>
        `,
        cssContent: `
            .filter-tab {
                background: transparent;
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .filter-tab.active {
                background: var(--primary);
                border-color: var(--primary);
                color: white;
            }
            .filter-tab:hover:not(.active) {
                border-color: rgba(99,102,241,0.5);
                color: var(--text-primary);
            }
            .recording-video-card {
                background: rgba(30, 41, 59, 0.45);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .recording-video-card:hover {
                transform: translateY(-4px);
                border-color: rgba(99, 102, 241, 0.25);
            }
            .video-thumbnail-mock {
                width: 100%;
                height: 140px;
                background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%);
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .play-overlay-icon {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: rgba(99, 102, 241, 0.85);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                transition: transform 0.2s ease;
                cursor: pointer;
            }
            .recording-video-card:hover .play-overlay-icon {
                transform: scale(1.1);
                background: var(--primary);
            }
            .rec-time-badge {
                position: absolute;
                bottom: 8px;
                right: 8px;
                background: rgba(0, 0, 0, 0.75);
                color: white;
                font-size: 10px;
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: 600;
            }
        `,
        jsContent: `
            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initRecordings() {
                const grid = document.getElementById("recordingsGrid");
                const filters = document.querySelectorAll("#recordingsFilters .filter-tab");
                const search = document.getElementById("recSearch");
                const totalLabel = document.getElementById("statsTotal");

                let activeFilter = "all";

                // Mock list of lectures
                const defaultRecordings = [
                    { id: 301, topic: "DBMS Lecture 4: Relational Algebra Operators", batch: "BCA-A", date: "Aug 12, 2026", duration: "01:22:45", views: 42, size: "385 MB" },
                    { id: 302, topic: "OOP with Java: Multithreading & Sync", batch: "BCA-B", date: "Aug 13, 2026", duration: "01:15:20", views: 38, size: "340 MB" },
                    { id: 303, topic: "Artificial Intelligence: State Space Search Models", batch: "CSE-5", date: "Aug 10, 2026", duration: "01:28:10", views: 56, size: "410 MB" },
                    { id: 304, topic: "DBMS Lecture 5: 1NF, 2NF and 3NF Normalization", batch: "BCA-A", date: "Aug 14, 2026", duration: "01:30:15", views: 49, size: "405 MB" }
                ];

                function renderRecordings() {
                    const localRecs = JSON.parse(localStorage.getItem("lectureRecordings")) || [];
                    const allRecs = [...localRecs, ...defaultRecordings];
                    
                    const query = search.value.trim().toLowerCase();
                    const filtered = allRecs.filter(r => {
                        const matchFilter = activeFilter === "all" || r.batch === activeFilter;
                        const matchQuery = r.topic.toLowerCase().includes(query);
                        return matchFilter && matchQuery;
                    });

                    totalLabel.textContent = allRecs.length + " Lectures";

                    if (filtered.length === 0) {
                        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:var(--text-tertiary); padding:40px 0;">No lecture recordings found.</div>';
                        return;
                    }

                    grid.innerHTML = filtered.map(r => {
                        let batchText = "BCA Sem 3 (Sec A)";
                        if (r.batch === "BCA-B") batchText = "BCA Sem 3 (Sec B)";
                        if (r.batch === "CSE-5") batchText = "B.Tech CSE Sem 5";

                        return '<div class="recording-video-card">' +
                            '<div class="video-thumbnail-mock">' +
                                '<div class="play-overlay-icon" onclick="playMockRecording(\\'' + r.topic + '\\')"><i class="fa-solid fa-play"></i></div>' +
                                '<span class="rec-time-badge">' + r.duration + '</span>' +
                            '</div>' +
                            '<div style="padding:15px; display:flex; flex-direction:column; justify-content:space-between; flex:1;">' +
                                '<div>' +
                                    '<h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text-primary); line-height:1.4;">' + r.topic + '</h4>' +
                                    '<p style="margin:6px 0 0 0; font-size:10px; color:var(--text-secondary); font-weight:600;">' + batchText + '</p>' +
                                '</div>' +
                                '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px; margin-top:12px; font-size:10px; color:var(--text-tertiary);">' +
                                    '<span><i class="fa-regular fa-calendar" style="margin-right:3px;"></i> ' + r.date + '</span>' +
                                    '<span><i class="fa-regular fa-eye" style="margin-right:3px;"></i> ' + r.views + ' views</span>' +
                                '</div>' +
                                '<div style="display:flex; gap:8px; margin-top:12px;">' +
                                    '<button onclick="playMockRecording(\\'' + r.topic + '\\')" class="btn btn-secondary btn-sm" style="flex:1; font-size:10px; padding:5px; justify-content:center;"><i class="fa-solid fa-video"></i> Playback</button>' +
                                    '<button onclick="deleteRecording(' + r.id + ')" class="btn btn-sm" style="background:rgba(239, 68, 68, 0.08); border:1px solid rgba(239, 68, 68, 0.2); color:#ef4444; font-size:10px; padding:5px 8px;" title="Delete Recording"><i class="fa-solid fa-trash-can"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Filter tabs event
                filters.forEach(f => {
                    f.addEventListener("click", () => {
                        filters.forEach(t => t.classList.remove("active"));
                        f.classList.add("active");
                        activeFilter = f.getAttribute("data-filter");
                        renderRecordings();
                    });
                });

                // Search event
                search.addEventListener("input", renderRecordings);

                window.playMockRecording = function(topic) {
                    showToast("Loading Player: " + topic);
                    alert("Simulated Video Player: Playback launched for lecture '" + topic + "'.");
                };

                window.deleteRecording = function(id) {
                    if (!confirm("Are you sure you want to delete this class recording from cloud storage? This action cannot be undone.")) return;

                    const localRecs = JSON.parse(localStorage.getItem("lectureRecordings")) || [];
                    const idx = localRecs.findIndex(r => r.id === id);

                    if (idx !== -1) {
                        localRecs.splice(idx, 1);
                        localStorage.setItem("lectureRecordings", JSON.stringify(localRecs));
                        renderRecordings();
                        showToast("Recording permanently removed from database.");
                    } else {
                        alert("Core preloaded recordings cannot be removed from cloud repository.");
                    }
                };

                renderRecordings();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initRecordings);
            } else {
                initRecordings();
            }
        `
    },
    "resources": {
        htmlContent: `
             <div style="display:grid; grid-template-columns: 320px 1fr; gap:25px; align-items:start;">
                 <!-- Upload form card -->
                 <div class="dashboard-card glassmorphism" style="padding:22px; border:1px solid rgba(99, 102, 241, 0.15); box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05); height:auto;">
                     <h3 style="font-size:15px; font-weight:800; color:var(--primary); margin-bottom:15px;"><i class="fa-solid fa-folder-plus"></i> Share New Resource</h3>
                     
                     <div style="display:flex; flex-direction:column; gap:12px;">
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Resource Name</label>
                             <input type="text" id="resourceName" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. Lab Manual - Experiment 1">
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Resource Type</label>
                             <select id="resourceType" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                 <option value="syllabus">Syllabus & Lesson Plan</option>
                                 <option value="manual">Lab Manuals & Handouts</option>
                                 <option value="textbook">Textbook Reference</option>
                                 <option value="template">Course Templates</option>
                             </select>
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Web URL / File Destination</label>
                             <input type="text" id="resourceLink" class="form-input" style="height:36px; font-size:12px; border-radius:6px;" placeholder="e.g. https://drive.google.com/...">
                         </div>
                         <div>
                             <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:6px; font-weight:600;">Target Class Section</label>
                             <select id="resourceSection" class="form-input" style="height:36px; font-size:12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                                 <option value="ALL">All Cohorts</option>
                                 <option value="BCA-A">BCA Sec A</option>
                                 <option value="BCA-B">BCA Sec B</option>
                             </select>
                         </div>
                         <button type="button" class="btn btn-primary" id="addResourceBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:10px; border-radius:6px; font-weight:600; font-size:12px; gap:6px; margin-top:10px; justify-content:center;">
                             <i class="fa-solid fa-share-nodes"></i> Share Resource
                         </button>
                     </div>
                 </div>

                 <!-- Class Resources Library -->
                 <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255,255,255,0.03); height:auto; padding: 22px;">
                     <!-- Filter Tabs -->
                     <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:15px; flex-wrap:wrap; gap:10px;">
                         <div style="display:flex; gap:8px;" id="resourceFilterTabs">
                             <button class="filter-tab active" data-filter="all">All Shared</button>
                             <button class="filter-tab" data-filter="syllabus">Syllabi</button>
                             <button class="filter-tab" data-filter="manual">Lab Manuals</button>
                             <button class="filter-tab" data-filter="textbook">Textbooks</button>
                             <button class="filter-tab" data-filter="template">Templates</button>
                         </div>
                         <span style="font-size:11px; color:var(--text-tertiary);" id="resourceCountLabel">Showing 4 shared files</span>
                     </div>

                     <!-- Resources List -->
                     <div id="resourcesList" style="display:flex; flex-direction:column; gap:12px;">
                         <!-- Dynamic Resources List items go here -->
                     </div>
                 </div>
             </div>
        `,
        cssContent: `
            .filter-tab {
                background: transparent;
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .filter-tab.active {
                background: var(--primary);
                border-color: var(--primary);
                color: white;
            }
            .filter-tab:hover:not(.active) {
                border-color: rgba(99,102,241,0.5);
                color: var(--text-primary);
            }
            .resource-item-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 14px 18px;
                background: rgba(30, 41, 59, 0.45);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .resource-item-row:hover {
                transform: translateY(-2px);
                border-color: rgba(99, 102, 241, 0.25);
            }
            .resource-delete-btn {
                background: transparent;
                border: none;
                color: var(--text-tertiary);
                cursor: pointer;
                font-size: 13px;
                padding: 6px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            .resource-delete-btn:hover {
                color: #ef4444;
                background: rgba(239, 68, 68, 0.1);
            }
        `,
        jsContent: `
            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initClassResources() {
                const nameInput = document.getElementById("resourceName");
                const typeSelect = document.getElementById("resourceType");
                const linkInput = document.getElementById("resourceLink");
                const sectionSelect = document.getElementById("resourceSection");
                const addBtn = document.getElementById("addResourceBtn");
                const listContainer = document.getElementById("resourcesList");
                const tabs = document.querySelectorAll("#resourceFilterTabs .filter-tab");
                const countLabel = document.getElementById("resourceCountLabel");

                let activeFilter = "all";

                // Default starting resources
                const defaultResources = [
                    { id: 101, name: "BCA Sem 3 Syllabus & Syllabus Sync Log", type: "syllabus", url: "https://drive.google.com/syllabus_bca3", section: "ALL", date: "Aug 10, 2026" },
                    { id: 102, name: "Experiment 1-8: DBMS SQL Lab Manual Pack", type: "manual", url: "https://drive.google.com/dbms_manual", section: "BCA-A", date: "Aug 11, 2026" },
                    { id: 103, name: "Database System Concepts - 7th Edition Reference", type: "textbook", url: "https://drive.google.com/dbms_concepts_ref", section: "ALL", date: "Aug 08, 2026" },
                    { id: 104, name: "incubation Capstone Project proposal PPT template", type: "template", url: "https://drive.google.com/proposal_template", section: "BCA-B", date: "Aug 13, 2026" }
                ];

                const typeIcons = {
                    "syllabus": { icon: "fa-scroll", color: "#10b981" },
                    "manual": { icon: "fa-flask-vial", color: "#6366f1" },
                    "textbook": { icon: "fa-book", color: "#f59e0b" },
                    "template": { icon: "fa-file-powerpoint", color: "#a855f7" }
                };

                function loadResources() {
                    const localRes = JSON.parse(localStorage.getItem("classResources")) || [];
                    const allResources = [...localRes, ...defaultResources];
                    const filtered = allResources.filter(r => activeFilter === "all" || r.type === activeFilter);

                    countLabel.textContent = "Showing " + filtered.length + " shared files";

                    if (filtered.length === 0) {
                        listContainer.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:40px 0;">No shared resources found under this category.</div>';
                        return;
                    }

                    listContainer.innerHTML = filtered.map(r => {
                        const styleInfo = typeIcons[r.type] || { icon: "fa-file", color: "#94a3b8" };
                        return '<div class="resource-item-row">' +
                            '<div style="display:flex; align-items:center; gap:16px; flex:1;">' +
                                '<div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center;">' +
                                    '<i class="fa-solid ' + styleInfo.icon + '" style="font-size:18px; color:' + styleInfo.color + ';"></i>' +
                                '</div>' +
                                '<div>' +
                                    '<h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text-primary);">' + r.name + '</h4>' +
                                    '<p style="margin:4px 0 0 0; font-size:10px; color:var(--text-tertiary);">' +
                                        '<span style="text-transform:uppercase; font-weight:600; color:' + styleInfo.color + ';">' + r.type + '</span> • ' +
                                        'Class: <strong>' + r.section + '</strong> • Shared: ' + r.date +
                                    '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; align-items:center; gap:12px;">' +
                                '<a href="' + r.url + '" target="_blank" class="btn btn-secondary btn-sm" style="font-size:11px; padding:6px 12px; gap:6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Resource</a>' +
                                '<button onclick="deleteResource(' + r.id + ')" class="resource-delete-btn" title="Delete Resource"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                tabs.forEach(tab => {
                    tab.addEventListener("click", () => {
                        tabs.forEach(t => t.classList.remove("active"));
                        tab.classList.add("active");
                        activeFilter = tab.getAttribute("data-filter");
                        loadResources();
                    });
                });

                addBtn.addEventListener("click", () => {
                    const name = nameInput.value.trim();
                    const type = typeSelect.value;
                    const url = linkInput.value.trim();
                    const section = sectionSelect.value;

                    if (!name || !url) {
                        alert("Please enter a resource name and a valid destination link.");
                        return;
                    }

                    const localRes = JSON.parse(localStorage.getItem("classResources")) || [];
                    const newResource = {
                        id: Date.now(),
                        name: name,
                        type: type,
                        url: url,
                        section: section,
                        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                    };

                    localRes.unshift(newResource);
                    localStorage.setItem("classResources", JSON.stringify(localRes));

                    nameInput.value = "";
                    linkInput.value = "";

                    loadResources();
                    showToast("Resource shared successfully!");
                });

                window.deleteResource = function(id) {
                    if (!confirm("Are you sure you want to remove this resource?")) return;

                    const localRes = JSON.parse(localStorage.getItem("classResources")) || [];
                    const idx = localRes.findIndex(r => r.id === id);

                    if (idx !== -1) {
                        localRes.splice(idx, 1);
                        localStorage.setItem("classResources", JSON.stringify(localRes));
                        loadResources();
                        showToast("Resource deleted.");
                    } else {
                        alert("Core preloaded resource templates cannot be deleted.");
                    }
                };

                loadResources();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initClassResources);
            } else {
                initClassResources();
            }
        `
    },
    "students": {
        htmlContent: `
             <!-- Add/Edit Student Form Panel -->
             <div id="studentFormContainer" class="dashboard-card glassmorphism" style="display:none; margin-bottom:25px; border:1px solid var(--primary); padding:20px; height:auto;">
                 <h4 style="margin:0 0 15px 0; font-size:14px; font-weight:800; color:var(--primary);" id="formTitleText">Add New Student / Mentee</h4>
                 <input type="hidden" id="editOriginalId">
                 <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-bottom:15px;">
                     <div>
                         <label style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px; font-weight:600;">Full Name</label>
                         <input type="text" id="studName" class="form-input" style="height:32px; font-size:11px;" placeholder="e.g. Rahul Sen">
                     </div>
                     <div>
                         <label style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px; font-weight:600;">Enrollment ID / Roll No</label>
                         <input type="text" id="studEnroll" class="form-input" style="height:32px; font-size:11px;" placeholder="e.g. BCA23095">
                     </div>
                     <div>
                         <label style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px; font-weight:600;">Course / Branch</label>
                         <input type="text" id="studCourse" class="form-input" style="height:32px; font-size:11px;" value="BCA 2nd Year">
                     </div>
                     <div>
                         <label style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px; font-weight:600;">CGPA</label>
                         <input type="number" step="0.1" id="studCgpa" class="form-input" style="height:32px; font-size:11px;" value="8.0">
                     </div>
                     <div>
                         <label style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px; font-weight:600;">Attendance %</label>
                         <input type="text" id="studAtt" class="form-input" style="height:32px; font-size:11px;" value="85%">
                     </div>
                     <div>
                         <label style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px; font-weight:600;">Mentorship Assignment</label>
                         <select id="studIsMentee" class="form-input" style="height:32px; font-size:11px; border:1px solid var(--border-color); background:var(--bg-secondary);">
                             <option value="yes">Yes (Assign as my Mentee)</option>
                             <option value="no">No (Regular Class Student only)</option>
                         </select>
                     </div>
                 </div>
                 <div style="display:flex; justify-content:flex-end; gap:10px;">
                     <button type="button" class="btn" onclick="toggleStudentForm(false)" style="font-size:11px; padding:6px 12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); color:var(--text-secondary);">Cancel</button>
                     <button type="button" class="btn btn-primary" id="saveStudentBtn" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); font-size:11px; padding:6px 16px;">Save Student</button>
                 </div>
             </div>

             <!-- Statistics Panel -->
             <div class="stats-row" style="margin-bottom:25px; display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:15px;">
                 <div class="stat-card glassmorphism" style="padding:18px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(99, 102, 241, 0.1); border-radius:8px;">
                     <i class="fa-solid fa-user-graduate" style="font-size:26px; color:var(--primary);"></i>
                     <div>
                         <h3 style="font-size:18px; font-weight:800; margin:0;" id="menteesCount">4</h3>
                         <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">My Mentees</p>
                     </div>
                 </div>
                 <div class="stat-card glassmorphism" style="padding:18px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(16, 185, 129, 0.1); border-radius:8px;">
                     <i class="fa-solid fa-users" style="font-size:26px; color:#10b981;"></i>
                     <div>
                         <h3 style="font-size:18px; font-weight:800; margin:0;" id="allStudentsCount">8</h3>
                         <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Total Class Students</p>
                     </div>
                 </div>
                 <div class="stat-card glassmorphism" style="padding:18px 20px; display:flex; align-items:center; gap:15px; border:1px solid rgba(239, 68, 68, 0.1); border-radius:8px;">
                     <i class="fa-solid fa-triangle-exclamation" style="font-size:26px; color:#ef4444;"></i>
                     <div>
                         <h3 style="font-size:18px; font-weight:800; margin:0;">1</h3>
                         <p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">Academic Alerts</p>
                     </div>
                 </div>
             </div>

             <!-- Grid Layout: Mentees & All Students -->
             <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; align-items:start;" class="students-container-grid">
                 
                 <!-- Column 1: Assigned Mentees -->
                 <div class="dashboard-card glassmorphism" style="border:1px solid rgba(99, 102, 241, 0.15); height:auto; padding:22px;">
                     <div style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
                         <h3 style="font-size:14px; font-weight:800; color:var(--primary); margin:0;"><i class="fa-solid fa-id-card-clip"></i> My Mentees</h3>
                         <button type="button" class="btn btn-primary" onclick="openAddForm()" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); font-size:10px; padding:4px 10px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-user-plus"></i> Add Mentee</button>
                     </div>
                     <div style="display:flex; flex-direction:column; gap:12px;" id="menteesRosterList">
                         <!-- Loaded dynamically -->
                     </div>
                 </div>

                 <!-- Column 2: All Classroom Students -->
                 <div class="dashboard-card glassmorphism" style="border:1px solid rgba(255, 255, 255, 0.03); height:auto; padding:22px;">
                     <div style="border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                         <h3 style="font-size:14px; font-weight:800; color:var(--text-primary); margin:0;"><i class="fa-solid fa-users"></i> All Students Directory</h3>
                         <input type="text" id="allStudSearch" class="form-input" style="height:28px; width:160px; font-size:10px; border-radius:4px;" placeholder="Search student name...">
                     </div>
                     <div style="display:flex; flex-direction:column; gap:12px;" id="allStudentsRosterList">
                         <!-- Loaded dynamically -->
                     </div>
                 </div>

             </div>
        `,
        cssContent: `
            .student-row-card {
                padding: 15px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.01);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: border-color 0.2s ease, transform 0.2s ease;
                position: relative;
            }
            .student-row-card:hover {
                border-color: rgba(99, 102, 241, 0.2);
                transform: translateX(2px);
            }
            .student-edit-btn {
                position: absolute;
                top: 12px;
                right: 12px;
                background: transparent;
                border: none;
                color: var(--text-tertiary);
                cursor: pointer;
                font-size: 11px;
                display: none;
            }
            .student-row-card:hover .student-edit-btn {
                display: block;
            }
            .student-edit-btn:hover {
                color: var(--primary);
            }
            @media (max-width: 900px) {
                .students-container-grid {
                    grid-template-columns: 1fr !important;
                }
            }
        `,
        jsContent: `
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Dynamic Toast
            window.showToast = function(msg) {
                let toast = document.getElementById("toastNotification");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "toastNotification";
                    toast.style.position = "fixed";
                    toast.style.bottom = "20px";
                    toast.style.right = "20px";
                    toast.style.background = "#10b981";
                    toast.style.color = "white";
                    toast.style.padding = "12px 24px";
                    toast.style.borderRadius = "8px";
                    toast.style.zIndex = "99999";
                    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    toast.style.fontFamily = "sans-serif";
                    toast.style.fontSize = "13px";
                    toast.style.fontWeight = "600";
                    document.body.appendChild(toast);
                }
                toast.textContent = msg;
                toast.style.display = "block";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 4000);
            };

            function initMenteesAndStudents() {
                const menteesRoster = document.getElementById("menteesRosterList");
                const allStudentsRoster = document.getElementById("allStudentsRosterList");
                const allSearch = document.getElementById("allStudSearch");
                const menteesCountLabel = document.getElementById("menteesCount");
                const allCountLabel = document.getElementById("allStudentsCount");

                const formContainer = document.getElementById("studentFormContainer");
                const formTitle = document.getElementById("formTitleText");
                const editIdInput = document.getElementById("editOriginalId");
                const nameInput = document.getElementById("studName");
                const enrollInput = document.getElementById("studEnroll");
                const courseInput = document.getElementById("studCourse");
                const cgpaInput = document.getElementById("studCgpa");
                const attInput = document.getElementById("studAtt");
                const isMenteeSelect = document.getElementById("studIsMentee");
                const saveBtn = document.getElementById("saveStudentBtn");

                // Default cohort database fallback
                const defaultMentees = [
                    { id: "BCA23015", name: "Vikram Kumawat", course: "BCA 2nd Year", cgpa: 9.2, attendance: "96%", status: "ontrack", email: "vikram@college.edu" },
                    { id: "CSE23099", name: "Priya Sharma", course: "B.Tech CSE 2nd Year", cgpa: 8.8, attendance: "92%", status: "ontrack", email: "priya@college.edu" },
                    { id: "CSE23115", name: "Aditya Bose", course: "B.Tech CSE 2nd Year", cgpa: 8.5, attendance: "95%", status: "ontrack", email: "aditya@college.edu" },
                    { id: "CSE23045", name: "Amit Roy", course: "B.Tech CSE 2nd Year", cgpa: 6.2, attendance: "74%", status: "alert", email: "amit.roy@college.edu" }
                ];

                const defaultAll = [
                    { id: "BCA23015", name: "Vikram Kumawat", course: "BCA 2nd Year", cgpa: 9.2, attendance: "96%", isMentee: true, email: "vikram@college.edu" },
                    { id: "CSE23099", name: "Priya Sharma", course: "B.Tech CSE 2nd Year", cgpa: 8.8, attendance: "92%", isMentee: true, email: "priya@college.edu" },
                    { id: "CSE23115", name: "Aditya Bose", course: "B.Tech CSE 2nd Year", cgpa: 8.5, attendance: "95%", isMentee: true, email: "aditya@college.edu" },
                    { id: "BCA23088", name: "Neha Sen", course: "BCA 2nd Year", cgpa: 9.1, attendance: "98%", isMentee: false, email: "neha.sen@college.edu" },
                    { id: "CSE23045", name: "Amit Roy", course: "B.Tech CSE 2nd Year", cgpa: 6.2, attendance: "74%", isMentee: true, email: "amit.roy@college.edu" },
                    { id: "BCA23044", name: "Rahul Verma", course: "BCA 2nd Year", cgpa: 7.8, attendance: "85%", isMentee: false, email: "rahul.v@college.edu" },
                    { id: "CSE23012", name: "Sneha Kapoor", course: "B.Tech CSE 2nd Year", cgpa: 8.4, attendance: "89%", isMentee: false, email: "sneha.k@college.edu" },
                    { id: "BCA23019", name: "Rohan Das", course: "BCA 2nd Year", cgpa: 6.9, attendance: "72%", isMentee: false, email: "rohan.das@college.edu" }
                ];

                // Load custom list or default list
                function getMentees() {
                    return JSON.parse(localStorage.getItem("assignedMenteesList")) || defaultMentees;
                }

                function getAllStudents() {
                    return JSON.parse(localStorage.getItem("allClassroomStudentsList")) || defaultAll;
                }

                function saveLists(mentees, all) {
                    localStorage.setItem("assignedMenteesList", JSON.stringify(mentees));
                    localStorage.setItem("allClassroomStudentsList", JSON.stringify(all));
                }

                // Render Assigned Mentees list
                function renderMentees() {
                    const mentees = getMentees();
                    menteesCountLabel.textContent = mentees.length;
                    menteesRoster.innerHTML = mentees.map(m => {
                        let badgeBg = m.status === "ontrack" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)";
                        let badgeColor = m.status === "ontrack" ? "#10b981" : "#ef4444";
                        let statusText = m.status === "ontrack" ? "On Track" : "Alert";

                        return '<div class="student-row-card glassmorphism">' +
                            '<button type="button" class="student-edit-btn" onclick="openEditForm(\\'' + m.id + '\\')" title="Edit Profile"><i class="fa-solid fa-user-gear"></i> Edit</button>' +
                            '<div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;">' +
                                '<div style="display:flex; align-items:center; gap:10px;">' +
                                    '<i class="fa-solid fa-circle-user" style="font-size:28px; color:var(--primary);"></i>' +
                                    '<div>' +
                                        '<strong style="font-size:12px; color:var(--text-primary);">' + m.name + '</strong>' +
                                        '<p style="margin:2px 0 0 0; font-size:9px; color:var(--text-tertiary);">' + m.id + '</p>' +
                                    '</div>' +
                                '</div>' +
                                '<span style="font-size:8px; background:' + badgeBg + '; color:' + badgeColor + '; padding:2px 6px; border-radius:10px; font-weight:700; text-transform:uppercase;">' + statusText + '</span>' +
                            '</div>' +
                            '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:8px; margin-top:8px;">' +
                                '<span style="font-size:10px; color:var(--text-secondary);">CGPA: <strong>' + m.cgpa + '</strong></span>' +
                                '<span style="font-size:10px; color:var(--text-secondary);">Attendance: <strong style="color:' + (parseInt(m.attendance) < 75 ? "#ef4444" : "var(--text-primary)") + ';">' + m.attendance + '</strong></span>' +
                            '</div>' +
                            '<div style="display:flex; gap:8px; margin-top:10px;">' +
                                '<button type="button" onclick="viewStudentPerformance(\\'' + m.id + '\\')" class="btn btn-primary" style="flex:1; background-image:linear-gradient(135deg, var(--primary), var(--accent)); font-size:10px; padding:5px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-chart-line"></i> Performance</button>' +
                                '<button type="button" onclick="openEditForm(\\'' + m.id + '\\')" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);" title="Edit details"><i class="fa-solid fa-pen-to-square"></i></button>' +
                                '<a href="mailto:' + m.email + '" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);"><i class="fa-regular fa-envelope"></i></a>' +
                            '</div>' +
                            '</div>';
                    }).join("");
                }

                // Render All Classroom Students
                function renderAllStudents() {
                    const allList = getAllStudents();
                    const query = allSearch.value.trim().toLowerCase();
                    const filtered = allList.filter(s => s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query));

                    allCountLabel.textContent = allList.length;

                    if (filtered.length === 0) {
                        allStudentsRoster.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:20px 0; font-size:11px;">No students match query.</div>';
                        return;
                    }

                    allStudentsRoster.innerHTML = filtered.map(s => {
                        let menteeBadge = s.isMentee ? '<span style="font-size:8px; background:rgba(99,102,241,0.15); color:var(--primary); padding:2px 6px; border-radius:4px; font-weight:700; margin-left:8px;">MENTEE</span>' : "";

                        return '<div class="student-row-card glassmorphism">' +
                            '<div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;">' +
                                '<div style="display:flex; align-items:center; gap:10px;">' +
                                    '<i class="fa-solid fa-circle-user" style="font-size:28px; color:var(--text-tertiary);"></i>' +
                                    '<div>' +
                                        '<div style="display:flex; align-items:center;">' +
                                            '<strong style="font-size:12px; color:var(--text-primary);">' + s.name + '</strong>' +
                                            menteeBadge +
                                        '</div>' +
                                        '<p style="margin:2px 0 0 0; font-size:9px; color:var(--text-tertiary);">' + s.id + ' • ' + s.course + '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:8px; margin-top:8px;">' +
                                '<span style="font-size:10px; color:var(--text-secondary);">CGPA: <strong>' + s.cgpa + '</strong></span>' +
                                '<span style="font-size:10px; color:var(--text-secondary);">Attendance: <strong>' + s.attendance + '</strong></span>' +
                            '</div>' +
                            '<div style="display:flex; gap:8px; margin-top:10px;">' +
                                '<button type="button" onclick="viewStudentPerformance(\\'' + s.id + '\\')" class="btn" style="flex:1; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px; border-radius:4px; color:var(--text-primary); font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-chart-line"></i> Performance</button>' +
                                '<button type="button" onclick="openEditForm(\\'' + s.id + '\\')" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);" title="Edit details"><i class="fa-solid fa-pen-to-square"></i></button>' +
                                '<a href="mailto:' + s.email + '" class="btn" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); font-size:10px; padding:5px 8px; border-radius:4px; color:var(--text-secondary);"><i class="fa-regular fa-envelope"></i></a>' +
                            '</div>' +
                            '</div>';
                    }).join("");
                }

                // Global handlers for opening Form
                window.openAddForm = function() {
                    formContainer.style.display = "block";
                    formTitle.textContent = "Add New Student / Mentee";
                    editIdInput.value = "";
                    nameInput.value = "";
                    enrollInput.value = "";
                    courseInput.value = "BCA 2nd Year";
                    cgpaInput.value = "8.0";
                    attInput.value = "85%";
                    isMenteeSelect.value = "yes";
                    nameInput.focus();
                };

                window.openEditForm = function(studentId) {
                    formContainer.style.display = "block";
                    formTitle.textContent = "Edit Student Details";
                    
                    const allList = getAllStudents();
                    const s = allList.find(x => x.id === studentId);

                    if (s) {
                        editIdInput.value = s.id;
                        nameInput.value = s.name;
                        enrollInput.value = s.id;
                        courseInput.value = s.course;
                        cgpaInput.value = s.cgpa;
                        attInput.value = s.attendance;
                        isMenteeSelect.value = s.isMentee ? "yes" : "no";
                        nameInput.focus();
                    }
                };

                window.toggleStudentForm = function(show) {
                    formContainer.style.display = show ? "block" : "none";
                };

                // Add or edit saving logic
                saveBtn.addEventListener("click", () => {
                    const name = nameInput.value.trim();
                    const enroll = enrollInput.value.trim();
                    const course = courseInput.value.trim();
                    const cgpa = parseFloat(cgpaInput.value) || 0;
                    const att = attInput.value.trim();
                    const isMentee = isMenteeSelect.value === "yes";
                    const editId = editIdInput.value;

                    if (!name || !enroll) {
                        alert("Name and Enrollment ID are required fields.");
                        return;
                    }

                    let mentees = getMentees();
                    let allList = getAllStudents();

                    if (editId) {
                        // Edit flow
                        allList = allList.map(s => {
                            if (s.id === editId) {
                                return { id: enroll, name, course, cgpa, attendance: att, isMentee, email: enroll.toLowerCase() + "@college.edu" };
                            }
                            return s;
                        });

                        mentees = mentees.map(m => {
                            if (m.id === editId) {
                                return { id: enroll, name, course, cgpa, attendance: att, status: cgpa < 7.5 ? "alert" : "ontrack", email: enroll.toLowerCase() + "@college.edu" };
                            }
                            return m;
                        });

                        // If mentorship status changed from No to Yes
                        if (isMentee && !mentees.some(m => m.id === enroll)) {
                            mentees.unshift({ id: enroll, name, course, cgpa, attendance: att, status: cgpa < 7.5 ? "alert" : "ontrack", email: enroll.toLowerCase() + "@college.edu" });
                        }
                        // If mentorship status changed from Yes to No
                        if (!isMentee) {
                            mentees = mentees.filter(m => m.id !== enroll);
                        }
                    } else {
                        // Create flow
                        const newStudent = { id: enroll, name, course, cgpa, attendance: att, isMentee, email: enroll.toLowerCase() + "@college.edu" };
                        allList.unshift(newStudent);

                        if (isMentee) {
                            mentees.unshift({ id: enroll, name, course, cgpa, attendance: att, status: cgpa < 7.5 ? "alert" : "ontrack", email: enroll.toLowerCase() + "@college.edu" });
                        }
                    }

                    saveLists(mentees, allList);
                    formContainer.style.display = "none";
                    renderMentees();
                    renderAllStudents();
                    showToast("Student details synced successfully!");
                });

                // Redirect helper to Student Performance page
                window.viewStudentPerformance = function(studentId) {
                    localStorage.setItem("selectedStudentPerformanceId", studentId);
                    
                    // Trigger sidebar navigation to student-performance
                    const performanceLink = document.querySelector('a[href*="student-performance"]');
                    if (performanceLink) {
                        performanceLink.click();
                    } else {
                        window.location.href = "../../academics/student-performance/student-performance.html";
                    }
                };

                allSearch.addEventListener("input", renderAllStudents);

                renderMentees();
                renderAllStudents();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initMenteesAndStudents);
            } else {
                initMenteesAndStudents();
            }
        `
    }
};

function createGenericPageData(id, title, icon, category) {
    return {
        htmlContent: `
            <div class="dashboard-card glassmorphism" style="margin-bottom:30px;">
                <h3><i class="fa-solid ${icon}"></i> ${title} Management</h3>
                <p style="color:var(--text-secondary); font-size:13px; margin-bottom:20px;">
                    This is the administrative control module for ${title}. Configure and view operational details below.
                </p>
                <div class="status-box" style="display:flex; justify-content:space-between; padding:15px 20px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); flex-wrap:wrap; gap:10px;">
                    <span style="font-size:13px; color:var(--text-secondary);"><i class="fa-solid fa-circle-check" style="color:#10b981; margin-right:5px;"></i> Module Status: Fully Configured</span>
                    <span style="font-size:12px; color:var(--text-tertiary);">Last sync: Just now</span>
                </div>
            </div>
        `,
        cssContent: ``,
        jsContent: `console.log("${title} Page Initialized.");`
    };
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// 1. Copy shared assets from student
const studentCssPath = path.join(__dirname, '..', 'student', 'student-shared.css');
const studentJsPath = path.join(__dirname, '..', 'student', 'student-shared.js');
const professorCssPath = path.join(__dirname, '..', 'professor', 'professor-shared.css');
const professorJsPath = path.join(__dirname, '..', 'professor', 'professor-shared.js');

ensureDirectoryExistence(professorCssPath);

if (fs.existsSync(studentCssPath)) {
    let css = fs.readFileSync(studentCssPath, 'utf8');
    css = css.replace(/STUDENT/g, 'FACULTY')
             .replace(/student-portal-body/g, 'professor-portal-body')
             .replace(/Student Portal/g, 'Faculty Portal');
    fs.writeFileSync(professorCssPath, css, 'utf8');
}

if (fs.existsSync(studentJsPath)) {
    let js = fs.readFileSync(studentJsPath, 'utf8');
    js = js.replace(/Aditya Sharma/g, 'Dr. Rajesh Kumar')
           .replace(/UNIFY-2026-1024/g, 'CSE-EMP-204')
           .replace(/Vikram Kumawat/g, 'Dr. Rajesh Kumar')
           .replace(/STU202600145/g, 'CSE-EMP-204')
           .replace(/student/g, 'professor');

    // Dynamically patch welcomeName selector for welcomeProfName
    js = js.replace('const welcomeName = document.getElementById("welcomeStudentName");',
                    'const welcomeName = document.getElementById("welcomeStudentName") || document.getElementById("welcomeProfName");');
    js = js.replace('welcomeName.textContent = displayName.split(" ")[0]; // First name only',
                    'welcomeName.textContent = displayName; // Full display name');

    // Append MutationObserver name replacement at the end of DOMContentLoaded
    const insertionPoint = '});';
    const lastIndex = js.lastIndexOf(insertionPoint);
    if (lastIndex !== -1) {
        const replacementCode = `
    // 10. Global Name Replacement (Dr. Rajesh Kumar -> displayName)
    function replaceProfNameInNode(node) {
        if (!node) return;
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.includes("Dr. Rajesh Kumar")) {
                node.nodeValue = node.nodeValue.replace(/Dr\\. Rajesh Kumar/g, displayName);
            }
        } else {
            if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
                const children = Array.from(node.childNodes);
                for (let child of children) {
                    replaceProfNameInNode(child);
                }
            }
        }
    }
    replaceProfNameInNode(document.body);

    const nameObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                replaceProfNameInNode(node);
            });
        });
    });
    nameObserver.observe(document.body, { childList: true, subtree: true });
});`;
        js = js.substring(0, lastIndex) + replacementCode + js.substring(lastIndex + insertionPoint.length);
    }
    fs.writeFileSync(professorJsPath, js, 'utf8');
}

// 2. Generate all 35 pages
allPageKeys.forEach(pKey => {
    let pInfo = pagesData[pKey.id];
    if (!pInfo) {
        pInfo = createGenericPageData(pKey.id, pKey.title, pKey.icon, pKey.category);
    }

    const htmlPath = path.join(__dirname, '..', pKey.dir, `${pKey.id}.html`);
    const cssPath = path.join(__dirname, '..', pKey.dir, `${pKey.id}.css`);
    const jsPath = path.join(__dirname, '..', pKey.dir, `${pKey.id}.js`);

    const folderDepth = pKey.dir.split('/').length - 1;
    const relPrefix = '../'.repeat(folderDepth);

    // Sidebar items
    const sidebarHtml = allPageKeys.map(sidebarKey => {
        const activeClass = sidebarKey.id === pKey.id ? 'active' : '';
        let relPath = path.relative(pKey.dir, sidebarKey.dir).replace(/\\/g, '/');
        const link = relPath ? `${relPath}/${sidebarKey.id}.html` : `${sidebarKey.id}.html`;

        return `
                <a href="${link}" class="sidebar-item ${activeClass}">
                    <i class="fa-solid ${sidebarKey.icon}"></i>
                    <span>${sidebarKey.title}</span>
                </a>
        `;
    }).join('\n');

    // Page HTML template
    const fullHtml = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <script>
        (function() {
            const currentTheme = localStorage.getItem("theme") || "dark";
            document.documentElement.setAttribute("data-theme", currentTheme);
        })();
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UnifyEd Faculty Portal - ${pKey.title}</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Shared Style System -->
    <link rel="stylesheet" href="${relPrefix}professor-shared.css">
    <!-- Page Specific Stylesheet -->
    <link rel="stylesheet" href="${pKey.id}.css">
</head>
<body class="professor-portal-body">

    <!-- Mobile Header -->
    <header class="mobile-portal-header">
        <button class="mobile-menu-toggle" id="menuToggle">
            <i class="fa-solid fa-bars"></i>
        </button>
        <div class="portal-brand">
            <i class="fa-solid fa-graduation-cap"></i>
            <h2>UnifyEd</h2>
        </div>
        <button class="theme-toggle-btn" id="themeToggleBtn">
            <i class="fa-solid fa-sun icon-sun"></i>
            <i class="fa-solid fa-moon icon-moon"></i>
        </button>
    </header>

    <div class="portal-layout">
        <!-- Sidebar Navigation -->
        <aside class="portal-sidebar" id="sidebar">
            <div class="sidebar-brand">
                <i class="fa-solid fa-graduation-cap"></i>
                <h2>UnifyEd</h2>
            </div>
            <div class="sidebar-menu">
                ${sidebarHtml}
            </div>
            <div class="sidebar-footer">
                <a href="${relPrefix}../auth/login.html" class="logout-link">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Log Out</span>
                </a>
            </div>
        </aside>

        <!-- Main Body Wrapper -->
        <div class="portal-main">
            <!-- Header bar -->
            <header class="main-portal-header">
                <div style="display: flex; align-items: center; gap: 20px; width: 100%; max-width: 480px;">
                    <button class="sidebar-toggle-btn" id="desktopSidebarToggle" title="Toggle Sidebar">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <div class="header-search" style="max-width: 100%; position: relative;">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="portalSearchInput" placeholder="Search students, classes, reports..." autocomplete="off">
                    </div>
                </div>
                <div class="header-actions">
                    <button class="theme-toggle-btn" id="headerThemeToggle" title="Toggle Theme">
                        <i class="fa-solid fa-sun icon-sun"></i>
                        <i class="fa-solid fa-moon icon-moon"></i>
                    </button>
                    <div class="user-profile-widget" id="portalProfileTrigger" style="position: relative; cursor: pointer;">
                        <div class="details">
                            <strong>Dr. Rajesh Kumar</strong>
                            <span>CSE-EMP-204</span>
                        </div>
                        <i class="fa-solid fa-circle-user profile-avatar" style="font-size: 24px; color: var(--primary);"></i>
                    </div>
                </div>
            </header>

            <!-- Content Area -->
            <main class="portal-content">
                <div class="page-header">
                    <h1>${pKey.title}</h1>
                    <span class="breadcrumbs">UnifyEd • Faculty Portal • ${pKey.category} • ${pKey.title}</span>
                </div>

                <!-- Custom Content Block -->
                ${pInfo.htmlContent}
            </main>
        </div>
    </div>

    <!-- Shared Portal Script -->
    <script src="${relPrefix}professor-shared.js"></script>
    <!-- Page Specific Script -->
    <script src="${pKey.id}.js?v=${Date.now()}"></script>
</body>
</html>
`;

    ensureDirectoryExistence(htmlPath);
    fs.writeFileSync(htmlPath, fullHtml, 'utf8');
    fs.writeFileSync(cssPath, pInfo.cssContent || '', 'utf8');
    fs.writeFileSync(jsPath, pInfo.jsContent || '', 'utf8');
    console.log(`Generated: ${pKey.dir}/${pKey.id}.html, .css, .js`);
});
console.log("Professor portal generation complete.");
