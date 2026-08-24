const fs = require('fs');
const path = require('path');

// 26 Pages Definitions
const pages = [
    {
        id: "dashboard",
        dir: "student/dashboard",
        title: "Student Dashboard",
        icon: "fa-chart-pie",
        category: "Overview",
        htmlContent: `
            <div class="welcome-card glassmorphism" style="padding: 30px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; background-image: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12)); position: relative; overflow: hidden; border: 1px solid var(--border-glass);">
                <div class="welcome-text">
                    <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 6px;">Welcome back, <span id="welcomeStudentName">Aditya Sharma</span>! 👋</h2>
                    <p style="color: var(--text-secondary); font-size: 14px;">Here is what's happening with your academic progress today. You have <strong style="color: var(--primary);">3 pending tasks</strong> to complete.</p>
                </div>
                <div class="welcome-date" style="text-align: right;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); font-weight: 700; display: block; margin-bottom: 4px;">Today's Date</span>
                    <strong style="font-size: 14px; color: var(--text-primary);" id="welcomeDateDisplay">Fall Sem 2026</strong>
                </div>
            </div>

            <div class="stats-row">
                <div class="stat-card glassmorphism">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <div>
                        <h3>9.42</h3>
                        <p>Cumulative GPA</p>
                    </div>
                </div>
                <div class="stat-card glassmorphism">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <div>
                        <h3>89.5%</h3>
                        <p>Total Attendance</p>
                    </div>
                </div>
                <div class="stat-card glassmorphism">
                    <i class="fa-solid fa-book-open"></i>
                    <div>
                        <h3>6</h3>
                        <p>Active Courses</p>
                    </div>
                </div>
                <div class="stat-card glassmorphism">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <div>
                        <h3>3</h3>
                        <p>Pending Tasks</p>
                    </div>
                </div>
            </div>

            <!-- Quick Actions Panel -->
            <div class="quick-actions-bar glassmorphism" style="padding: 15px 25px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap; border: 1px solid var(--border-glass);">
                <span style="font-size: 13px; font-weight: 700; color: var(--text-secondary);"><i class="fa-solid fa-bolt" style="color: var(--accent); margin-right: 5px;"></i> Quick Actions:</span>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="../services/applications/applications.html" class="btn btn-secondary btn-sm" style="font-size: 12px; gap: 6px; padding: 6px 12px;"><i class="fa-solid fa-file-signature"></i> Apply Leave</a>
                    <a href="../services/fees/fees.html" class="btn btn-secondary btn-sm" style="font-size: 12px; gap: 6px; padding: 6px 12px;"><i class="fa-solid fa-credit-card"></i> Pay Fees</a>
                    <a href="../ai-assistant/ai-assistant.html" class="btn btn-secondary btn-sm" style="font-size: 12px; gap: 6px; padding: 6px 12px;"><i class="fa-solid fa-robot"></i> Ask AI Assistant</a>
                    <a href="../classroom/stream/stream.html" class="btn btn-secondary btn-sm" style="font-size: 12px; gap: 6px; padding: 6px 12px;"><i class="fa-solid fa-graduation-cap"></i> My Classrooms</a>
                    <a href="../profile/profile.html" class="btn btn-secondary btn-sm" style="font-size: 12px; gap: 6px; padding: 6px 12px;"><i class="fa-solid fa-id-card"></i> View ERP ID</a>
                </div>
            </div>

            <!-- Daily Attendance Verification Widget -->
            <div class="attendance-verify-widget glassmorphism" style="padding: 25px; margin-bottom: 30px; border: 1px solid var(--border-glass);">
                <h3 style="font-size: 18px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; color: var(--accent);">
                    <i class="fa-solid fa-clipboard-user"></i> Daily Class Attendance Check-in
                </h3>
                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">
                    Enter the attendance validation code provided by your teacher in class to mark your daily attendance and earn credits.
                </p>
                
                <form id="attendanceCodeForm" style="display: flex; gap: 12px; max-width: 500px; margin-bottom: 15px;">
                    <input type="text" id="attendanceCodeInput" placeholder="Enter class code (e.g. NET77, DB99)" class="form-input" style="height: 42px; text-transform: uppercase;">
                    <button type="submit" class="btn btn-primary" style="height: 42px; padding: 0 24px; white-space: nowrap;">Verify Code</button>
                </form>
                <div id="codeFeedbackMessage" style="font-size: 13px; font-weight: 500;"></div>

                <!-- Dynamic Quiz Form -->
                <div id="attendanceQuizBlock" style="display: none; margin-top: 25px; padding-top: 25px; border-top: 1px solid var(--border-color);">
                    <h4 style="font-size: 16px; margin-bottom: 15px; color: var(--primary);">Class Validation Quiz</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.02); padding: 15px; border-radius: var(--border-radius-sm);">
                        <div>
                            <span style="font-size:11px; color:var(--text-secondary); display:block;">Student Name</span>
                            <strong id="quizStudentName" style="font-size:14px;">Vikram Kumawat</strong>
                        </div>
                        <div>
                            <span style="font-size:11px; color:var(--text-secondary); display:block;">Enrollment Number</span>
                            <strong id="quizStudentId" style="font-size:14px;">STU202600145</strong>
                        </div>
                    </div>
                    
                    <form id="quizValidationForm">
                        <div id="quizQuestionsContainer"></div>
                        <button type="submit" class="btn btn-primary btn-full" style="margin-top: 15px;">Submit Answers & Mark Attendance</button>
                    </form>
                </div>

                <!-- Quiz Results / Status Card -->
                <div id="quizResultsBlock" style="display: none; margin-top: 25px; padding: 20px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background: rgba(16, 185, 129, 0.05); animation: fadeIn 0.4s ease;">
                    <h4 style="font-size: 15px; margin-bottom: 15px; color: #10b981; display:flex; align-items:center; gap:8px;">
                        <i class="fa-solid fa-circle-check"></i> Attendance Receipt & Quiz Scorecard
                    </h4>
                    <div id="receiptContent" style="font-size: 13px; display:flex; flex-direction:column; gap:8px;"></div>
                    <button class="btn btn-secondary btn-sm" id="closeReceiptBtn" style="margin-top:15px; height:32px;">Verify Another Code</button>
                </div>

                <!-- Past Check-ins Log -->
                <div id="pastCheckinsContainer" style="margin-top: 25px; display: none; border-top: 1px dashed var(--border-color); padding-top: 20px;">
                    <h5 style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;"><i class="fa-solid fa-clock-rotate-left"></i> Session Verification History</h5>
                    <div class="table-responsive">
                        <table class="custom-table" style="font-size: 12px; width: 100%;">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>MCQ Verification</th>
                                    <th>Short Answer</th>
                                    <th>Credits</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="pastCheckinsBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- 2-by-2 Equal Width & Height Grid for all 6 Cards -->
            <div class="dashboard-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 30px; align-items: stretch;">
                
                <!-- Card 1: Today's Schedule -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-calendar-day"></i> Today's Schedule</h3>
                        
                        <!-- Next Class Highlight Block -->
                        <div class="next-class-alert" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12)); padding: 15px; border-radius: var(--border-radius-sm); border: 1px solid var(--primary); margin-bottom: 20px;">
                            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); font-weight: 700; display: block; margin-bottom: 6px;">Next Class starts in 45 mins</span>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong style="font-size: 14px; color: var(--text-primary); display:block;">Embedded Systems & VLSI</strong>
                                    <span style="font-size: 11px; color: var(--text-secondary);">Lab 3B • Dr. A. Verma</span>
                                </div>
                                <div style="text-align: right;">
                                    <strong style="font-size: 13px; color: var(--primary); display:block;">11:30 AM</strong>
                                    <span style="font-size: 10px; color: var(--text-tertiary);">1.5 Hrs</span>
                                </div>
                            </div>
                        </div>

                        <!-- Schedule List -->
                        <div class="schedule-list">
                            <div class="schedule-item" style="opacity: 0.5;">
                                <span class="time" style="background: rgba(255,255,255,0.04); color: var(--text-tertiary);">09:00 AM</span>
                                <div class="details">
                                    <strong>Neural Networks (Completed)</strong>
                                    <span>Room 403 • Prof. S. Sharma</span>
                                </div>
                            </div>
                            <div class="schedule-item" style="border-left: 3px solid var(--primary); padding-left: 10px;">
                                <span class="time">11:30 AM</span>
                                <div class="details">
                                    <strong>Embedded Systems VLSI (Next Class)</strong>
                                    <span>Lab 3B • Dr. A. Verma</span>
                                </div>
                            </div>
                            <div class="schedule-item">
                                <span class="time">02:00 PM</span>
                                <div class="details">
                                    <strong>Professional Communication</strong>
                                    <span>Seminar Hall 1 • Ms. R. Joshi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2: Upcoming Exams & Vivas -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-file-invoice"></i> Upcoming Exams & Vivas</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                                <div>
                                    <strong style="display: block; font-size: 14px;">Theory Mid-Term Exams</strong>
                                    <span style="font-size: 11px; color: var(--text-tertiary);">Pen-and-paper mode • All subjects</span>
                                </div>
                                <span class="badge badge-error" style="font-size: 11px; font-weight:700;">12 Days Left</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                                <div>
                                    <strong style="display: block; font-size: 14px;">Embedded VLSI Lab Viva</strong>
                                    <span style="font-size: 11px; color: var(--text-tertiary);">Internal Evaluation • Lab 3B</span>
                                </div>
                                <span class="badge badge-warning" style="font-size: 11px; font-weight:700;">19 Days Left</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong style="display: block; font-size: 14px;">Robotics Final Project Review</strong>
                                    <span style="font-size: 11px; color: var(--text-tertiary);">HOD presentation • Seminar Hall</span>
                                </div>
                                <span class="badge badge-success" style="font-size: 11px; font-weight:700;">28 Days Left</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 3: Semester SGPA Performance -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-chart-bar"></i> Semester SGPA Performance</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 10px;">
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
                                    <span>Semester 1 (Autumn 2024)</span>
                                    <strong>9.20 SGPA</strong>
                                </div>
                                <div style="height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
                                    <div style="width: 92%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 4px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
                                    <span>Semester 2 (Spring 2025)</span>
                                    <strong>9.50 SGPA</strong>
                                </div>
                                <div style="height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
                                    <div style="width: 95%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 4px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px;">
                                    <span>Semester 3 (Current Session)</span>
                                    <strong>9.42 SGPA (Projected)</strong>
                                </div>
                                <div style="height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
                                    <div style="width: 94.2%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 4px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 4: Library Books Issued -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-book"></i> Library Books Issued</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                                <div>
                                    <strong style="display: block; font-size: 14px;">Introduction to Algorithms</strong>
                                    <span style="font-size: 11px; color: var(--text-tertiary);">Issued on: 15 July 2026</span>
                                </div>
                                <span class="badge badge-success" style="font-size: 11px;">Due: 12 Aug 2026</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                                <div>
                                    <strong style="display: block; font-size: 14px;">Deep Learning (Ian Goodfellow)</strong>
                                    <span style="font-size: 11px; color: var(--text-tertiary);">Issued on: 28 July 2026</span>
                                </div>
                                <span class="badge badge-warning" style="font-size: 11px;">Due: 18 Aug 2026</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong style="display: block; font-size: 14px;">Database System Concepts</strong>
                                    <span style="font-size: 11px; color: var(--text-tertiary);">Issued on: 02 Aug 2026</span>
                                </div>
                                <span class="badge badge-success" style="font-size: 11px;">Due: 16 Aug 2026</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 5: Assigned Faculty Mentor -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-user-tie"></i> Assigned Faculty Mentor</h3>
                        <div style="display: flex; align-items: center; gap: 15px; margin-top: 10px; margin-bottom: 20px;">
                            <i class="fa-solid fa-circle-user" style="font-size: 40px; color: var(--primary);"></i>
                            <div>
                                <strong style="display: block; font-size: 15px;">Dr. Rajesh Kumar</strong>
                                <span style="font-size: 12px; color: var(--text-secondary); display: block; margin-top: 2px;">Senior Professor, CS Department</span>
                                <span style="font-size: 11px; color: var(--text-tertiary); display: block;">Cabin 304 • rajesh.kumar@unifyed.edu</span>
                            </div>
                        </div>
                    </div>
                    <a href="../communication/communication.html" class="btn btn-secondary btn-sm btn-full" style="justify-content: center; margin-top: auto;">
                        <i class="fa-solid fa-paper-plane"></i> Contact Mentor
                    </a>
                </div>

                <!-- Card 6: Latest Announcements -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-bell"></i> Latest Announcements</h3>
                        <div class="announcements-list">
                            <div class="announce-item">
                                <div class="bullet badge-warning"></div>
                                <div class="content">
                                    <strong>Mid-Term Registration Deadline</strong>
                                    <p>Register your elective specializations before this Friday via ERP.</p>
                                    <span class="date">3 hours ago</span>
                                </div>
                            </div>
                            <div class="announce-item">
                                <div class="bullet badge-success"></div>
                                <div class="content">
                                    <strong>Placements: TCS Ninja Hiring Drive</strong>
                                    <p>TCS drive registrations are open for 2026 batches.</p>
                                    <span class="date">1 day ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 7: Personal Task Planner -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-list-check"></i> Personal Task Planner</h3>
                        <div style="display: flex; gap: 8px; margin-bottom: 15px;">
                            <input type="text" id="todoTaskInput" placeholder="Add a quick task..." class="form-input" style="height: 34px; font-size: 12px; border-radius: 6px;">
                            <button id="addTodoBtn" class="btn btn-primary" style="height: 34px; padding: 0 12px; font-size: 12px; white-space: nowrap; border-radius: 6px;"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <ul id="todoList" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; max-height: 180px; overflow-y: auto;">
                            <!-- Dynamic checklist items -->
                        </ul>
                    </div>
                </div>

                <!-- Card 8: Overall Attendance Gauge -->
                <div class="dashboard-card glassmorphism" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <h3><i class="fa-solid fa-chart-pie"></i> Real-Time Attendance Meter</h3>
                        <div style="display: flex; align-items: center; justify-content: space-around; gap: 15px; margin-top: 10px;">
                            <!-- Circular SVG Gauge -->
                            <div style="position: relative; width: 100px; height: 100px; flex-shrink: 0;">
                                <svg style="width: 100px; height: 100px; transform: rotate(-90deg);">
                                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" stroke-width="8" fill="transparent"/>
                                    <circle cx="50" cy="50" r="40" stroke="#10b981" stroke-width="8" stroke-dasharray="251.2" stroke-dashoffset="37.68" fill="transparent" style="stroke-linecap: round; filter: drop-shadow(0 0 4px #10b981);"/>
                                </svg>
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;">
                                    <strong style="font-size: 18px; color: var(--text-primary); display:block; line-height: 1;">85.0%</strong>
                                    <span style="font-size: 8px; color: #10b981; font-weight:700; text-transform:uppercase; margin-top: 3px; display: block;">Safe Zone</span>
                                </div>
                            </div>
                            <div style="font-size: 12px; display:flex; flex-direction:column; gap:6px;">
                                <span><i class="fa-solid fa-circle" style="color: #10b981; font-size:8px; margin-right:5px;"></i> Classes: <strong>85 / 100</strong></span>
                                <span><i class="fa-solid fa-circle" style="color: var(--accent); font-size:8px; margin-right:5px;"></i> Margin: <strong>+10</strong></span>
                                <span><i class="fa-solid fa-circle" style="color: var(--text-tertiary); font-size:8px; margin-right:5px;"></i> Required: <strong>75%</strong></span>
                            </div>
                        </div>
                    </div>
                    <a href="../academics/attendance/attendance.html" class="btn btn-secondary btn-sm btn-full" style="justify-content: center; margin-top: 15px;">
                        <i class="fa-solid fa-arrow-right"></i> Detailed Report
                    </a>
                </div>

            </div>
        `,
        cssContent: `
            .stats-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 24px;
                margin-bottom: 35px;
            }
            .stat-card {
                padding: 24px;
                display: flex;
                align-items: center;
                gap: 20px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                border: 1px solid var(--border-glass);
            }
            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--glass-shadow);
            }
            .stat-card i {
                font-size: 28px;
                color: var(--primary);
                background: var(--primary-glow);
                padding: 12px;
                border-radius: 12px;
                width: 56px;
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .stat-card h3 {
                font-size: 26px;
                font-weight: 800;
                margin-bottom: 2px;
                background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .stat-card p {
                font-size: 11px;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 600;
            }
            .dashboard-grid {
                display: grid;
                grid-template-columns: 1.2fr 0.8fr;
                gap: 30px;
                margin-bottom: 30px;
            }
            @media (max-width: 1024px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
            }
            .dashboard-card {
                padding: 28px;
                border: 1px solid var(--border-glass);
                transition: transform 0.3s ease, border-color 0.3s ease;
            }
            .dashboard-card:hover {
                border-color: var(--primary);
            }
            .dashboard-card h3 {
                font-size: 15px;
                font-weight: 700;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-primary);
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 12px;
            }
            .dashboard-card h3 i {
                color: var(--primary);
            }
            .schedule-list, .announcements-list {
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
            .schedule-item .details span {
                font-size: 11px;
                color: var(--text-secondary);
            }
            .announce-item {
                display: flex;
                gap: 12px;
            }
            .announce-item .bullet {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-top: 6px;
                flex-shrink: 0;
            }
            .announce-item .content strong {
                font-size: 13px;
                font-weight: 600;
                display: block;
                color: var(--text-primary);
                margin-bottom: 2px;
            }
            .announce-item .content p {
                font-size: 12px;
                color: var(--text-secondary);
                line-height: 1.4;
                margin-bottom: 4px;
            }
            .announce-item .content .date {
                font-size: 10px;
                color: var(--text-tertiary);
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                console.log("Student Dashboard Page Initialized");

                // Get logged in student details for display inside quiz
                const studentNameVal = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                const studentIdVal = localStorage.getItem("loggedInStudentId") || "STU202600145";

                const quizStudentName = document.getElementById("quizStudentName");
                const quizStudentId = document.getElementById("quizStudentId");
                if (quizStudentName) quizStudentName.textContent = studentNameVal;
                if (quizStudentId) quizStudentId.textContent = studentIdVal;

                // Update Dashboard Real-Time Attendance Meter from localStorage
                function updateDashboardAttendanceMeter() {
                    const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                    const baseDelivered = 180;
                    const baseAttended = 161;
                    
                    const totalDelivered = baseDelivered + checkins.length;
                    const totalAttended = baseAttended + checkins.length;
                    const percentage = totalDelivered > 0 ? ((totalAttended / totalDelivered) * 100).toFixed(1) : "85.0";
                    
                    const meterPercentageText = document.querySelector(".dashboard-card strong[style*='font-size: 18px']");
                    if (meterPercentageText) {
                        meterPercentageText.textContent = percentage + "%";
                    }
                    
                    const meterCircle = document.querySelector(".dashboard-card circle[stroke='#10b981']");
                    if (meterCircle) {
                        const dashoffset = 251.2 - (251.2 * parseFloat(percentage) / 100);
                        meterCircle.setAttribute("stroke-dashoffset", dashoffset.toFixed(1));
                    }
                    
                    const statsContainer = document.querySelector(".dashboard-card div[style*='font-size: 12px']");
                    if (statsContainer) {
                        const requiredMin = Math.ceil(totalDelivered * 0.75);
                        const margin = totalAttended - requiredMin;
                        const marginSign = margin >= 0 ? "+" : "";
                        
                        statsContainer.innerHTML = \`
                            <span><i class="fa-solid fa-circle" style="color: #10b981; font-size:8px; margin-right:5px;"></i> Classes: <strong>\${totalAttended} / \${totalDelivered}</strong></span>
                            <span><i class="fa-solid fa-circle" style="color: var(--accent); font-size:8px; margin-right:5px;"></i> Margin: <strong>\${marginSign}\${margin}</strong></span>
                            <span><i class="fa-solid fa-circle" style="color: var(--text-tertiary); font-size:8px; margin-right:5px;"></i> Required: <strong>75%</strong></span>
                        \`;
                    }
                }
                updateDashboardAttendanceMeter();

                // Mock database of teacher-active attendance codes & dynamic questions
                const activeAttendanceCodes = {
                    "NET77": {
                        subjectCode: "CS-501",
                        subjectName: "Neural Networks & Deep Learning",
                        creditPoints: 2,
                        questions: [
                            {
                                type: "mcq",
                                text: "Which activation function is most widely used in deep neural networks to prevent vanishing gradient issues?",
                                options: ["Sigmoid", "Tanh", "ReLU", "Linear Activation"],
                                correct: "ReLU",
                                points: 1
                            },
                            {
                                type: "text",
                                text: "Briefly explain why learning rate is a critical hyperparameter in backpropagation gradient descent.",
                                points: 1
                            }
                        ]
                    },
                    "DB99": {
                        subjectCode: "CS-503",
                        subjectName: "Database Systems & Query Tuning",
                        creditPoints: 3,
                        questions: [
                            {
                                type: "mcq",
                                text: "Which join operation returns all matching tuples between two tables and null values for non-matching ones?",
                                options: ["Cross Join", "Inner Join", "Left Outer Join", "Full Outer Join"],
                                correct: "Inner Join",
                                points: 1
                            },
                            {
                                type: "text",
                                text: "Describe what defines the 3rd Normal Form (3NF) requirements in database schemas.",
                                points: 2
                            }
                        ]
                    }
                };

                const codeForm = document.getElementById("attendanceCodeForm");
                const codeInput = document.getElementById("attendanceCodeInput");
                const feedbackMsg = document.getElementById("codeFeedbackMessage");
                const quizBlock = document.getElementById("attendanceQuizBlock");
                const questionsContainer = document.getElementById("quizQuestionsContainer");
                const quizForm = document.getElementById("quizValidationForm");

                let currentActiveCodeData = null;

                if (codeForm) {
                    codeForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        const enteredCode = codeInput.value.trim().toUpperCase();
                        
                        if (!enteredCode) {
                            feedbackMsg.style.color = "#ef4444";
                            feedbackMsg.textContent = "Please enter an attendance code.";
                            quizBlock.style.display = "none";
                            return;
                        }

                        // Check localStorage for dynamic session published by professor first
                        const dynamicSession = JSON.parse(localStorage.getItem("activeAttendanceSession"));
                        if (dynamicSession && dynamicSession.code === enteredCode) {
                            const subName = dynamicSession.lecture === "DBMS" ? "Database Management Systems" : dynamicSession.lecture === "WEB" ? "Web Technology Lab" : "Neural Networks Seminar";
                            const subCode = dynamicSession.lecture === "DBMS" ? "DBMS-301" : dynamicSession.lecture === "WEB" ? "WT-591" : "NN-702";
                            
                            currentActiveCodeData = {
                                isDynamic: true,
                                subjectName: subName,
                                subjectCode: subCode,
                                creditPoints: dynamicSession.totalCredits,
                                questions: dynamicSession.questions.map((q, qidx) => {
                                    const opts = [];
                                    if (q.optA) opts.push(q.optA);
                                    if (q.optB) opts.push(q.optB);
                                    if (q.optC) opts.push(q.optC);
                                    return {
                                        type: opts.length > 0 ? "mcq" : "text",
                                        text: q.text,
                                        options: opts,
                                        points: q.credits
                                    };
                                })
                            };
                        }

                        // Fallback to static codes if not found in dynamic sessions
                        if (!currentActiveCodeData && activeAttendanceCodes[enteredCode]) {
                            currentActiveCodeData = activeAttendanceCodes[enteredCode];
                        }

                        if (currentActiveCodeData) {
                            feedbackMsg.style.color = "#10b981";
                            feedbackMsg.textContent = "Valid Code! Verification required for: " + currentActiveCodeData.subjectName + " (" + currentActiveCodeData.subjectCode + "). Total credits: " + currentActiveCodeData.creditPoints;
                            
                            // Render questions dynamically
                            questionsContainer.innerHTML = "";
                            currentActiveCodeData.questions.forEach((q, idx) => {
                                const questionDiv = document.createElement("div");
                                questionDiv.className = "form-group";
                                questionDiv.style.marginBottom = "15px";
                                
                                const questionLabel = document.createElement("label");
                                questionLabel.innerHTML = "<strong>Q" + (idx + 1) + ":</strong> " + q.text + " <span style='color:var(--accent);'>(" + q.points + " credits)</span>";
                                questionDiv.appendChild(questionLabel);

                                if (q.type === "mcq") {
                                    const select = document.createElement("select");
                                    select.className = "form-input";
                                    select.required = true;
                                    select.name = "q_" + idx;
                                    select.innerHTML = '<option value="">-- Choose Option --</option>' + 
                                        q.options.map(opt => '<option value="' + opt + '">' + opt + '</option>').join("");
                                    questionDiv.appendChild(select);
                                } else {
                                    const input = document.createElement("input");
                                    input.type = "text";
                                    input.className = "form-input";
                                    input.required = true;
                                    input.placeholder = "Enter your answer here...";
                                    input.name = "q_" + idx;
                                    questionDiv.appendChild(input);
                                }
                                questionsContainer.appendChild(questionDiv);
                            });

                            quizBlock.style.display = "block";
                        } else {
                            feedbackMsg.style.color = "#ef4444";
                            feedbackMsg.textContent = "Invalid or expired class attendance code.";
                            quizBlock.style.display = "none";
                        }
                    });
                }

                const quizResultsBlock = document.getElementById("quizResultsBlock");
                const receiptContent = document.getElementById("receiptContent");
                const closeReceiptBtn = document.getElementById("closeReceiptBtn");
                const pastCheckinsContainer = document.getElementById("pastCheckinsContainer");
                const pastCheckinsBody = document.getElementById("pastCheckinsBody");

                function renderCheckins() {
                    const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                    if (checkins.length === 0) {
                        pastCheckinsContainer.style.display = "none";
                        return;
                    }

                    pastCheckinsContainer.style.display = "block";
                    pastCheckinsBody.innerHTML = checkins.map(item => {
                        const mcqText = item.mcqCorrect ? 
                            "<span style='color:#10b981;'>Correct (" + item.mcqAnswer + ")</span>" : 
                            "<span style='color:#ef4444;'>Incorrect (" + item.mcqAnswer + ")</span>";
                            
                        return "<tr>" +
                            "<td><strong>" + item.subjectName + "</strong></td>" +
                            "<td>" + mcqText + "</td>" +
                            "<td>" + item.shortAnswerStatus + "</td>" +
                            "<td>" + item.creditsEarned + " / " + item.maxCredits + "</td>" +
                            "<td><span class='badge badge-success'>Registered</span></td>" +
                            "</tr>";
                    }).join("");
                }

                renderCheckins();

                if (closeReceiptBtn) {
                    closeReceiptBtn.addEventListener("click", () => {
                        quizResultsBlock.style.display = "none";
                        codeForm.style.display = "flex";
                        codeInput.value = "";
                        feedbackMsg.textContent = "";
                    });
                }

                if (quizForm) {
                    quizForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        if (!currentActiveCodeData) return;

                        const submitButton = quizForm.querySelector("button[type='submit']");
                        submitButton.disabled = true;
                        submitButton.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registering Attendance...';

                        setTimeout(() => {
                            const formData = new FormData(quizForm);

                            if (currentActiveCodeData.isDynamic) {
                                // Dynamic MCQ & Questions from Professor
                                const selectedAnswers = [];
                                currentActiveCodeData.questions.forEach((q, qidx) => {
                                    selectedAnswers.push(formData.get("q_" + qidx) || "No answer");
                                });

                                const newCheckin = {
                                    subjectName: currentActiveCodeData.subjectName,
                                    mcqCorrect: true, // Auto correct or dynamic check
                                    mcqAnswer: selectedAnswers[0] || "Answered",
                                    shortAnswerStatus: "Submitted (Real-time synced)",
                                    creditsEarned: currentActiveCodeData.creditPoints,
                                    maxCredits: currentActiveCodeData.creditPoints
                                };

                                const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                                checkins.unshift(newCheckin);
                                localStorage.setItem("attendanceCheckins", JSON.stringify(checkins));

                                // Save student session response for Professor to read in real-time
                                const nameVal = localStorage.getItem("loggedInUser") || "Aditya Sharma";
                                const idVal = localStorage.getItem("loggedInStudentId") || "STU202600145";
                                const studentCheckinResponse = {
                                    studentName: nameVal,
                                    studentId: idVal,
                                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                    answers: selectedAnswers,
                                    status: "Present",
                                    credits: currentActiveCodeData.creditPoints
                                };

                                let liveResponses = JSON.parse(localStorage.getItem("liveStudentResponses")) || [];
                                // Remove old response for the same student to avoid duplicates
                                liveResponses = liveResponses.filter(r => r.studentId !== idVal);
                                liveResponses.push(studentCheckinResponse);
                                localStorage.setItem("liveStudentResponses", JSON.stringify(liveResponses));

                                // Show Dynamic Scorecard
                                let responseReceiptHtml = "<p><strong>Class:</strong> " + currentActiveCodeData.subjectName + " (" + currentActiveCodeData.subjectCode + ")</p>" +
                                    "<p><strong>Attendance Status:</strong> <span style='color:#10b981; font-weight:700;'>✅ REGISTERED & SYNCED</span></p>";
                                selectedAnswers.forEach((ans, ansIdx) => {
                                    responseReceiptHtml += "<p><strong>Q" + (ansIdx + 1) + " Response:</strong> " + ans + "</p>";
                                });
                                responseReceiptHtml += "<p><strong>Session Credits Logged:</strong> " + currentActiveCodeData.creditPoints + " Credits</p>";
                                
                                receiptContent.innerHTML = responseReceiptHtml;
                            } else {
                                // Static Legacy fallback
                                const mcqAnswer = formData.get("q_0");
                                const shortAnswerVal = formData.get("q_1");

                                const mcqQuestion = currentActiveCodeData.questions[0];
                                const isMcqCorrect = mcqAnswer === mcqQuestion.correct;
                                
                                let credits = 0;
                                if (isMcqCorrect) {
                                    credits += mcqQuestion.points;
                                }
                                const maxCredits = currentActiveCodeData.creditPoints;
                                
                                const newCheckin = {
                                    subjectName: currentActiveCodeData.subjectName,
                                    mcqCorrect: isMcqCorrect,
                                    mcqAnswer: mcqAnswer,
                                    shortAnswerStatus: "Submitted (Pending Review)",
                                    creditsEarned: credits,
                                    maxCredits: maxCredits
                                };

                                const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                                checkins.unshift(newCheckin);
                                localStorage.setItem("attendanceCheckins", JSON.stringify(checkins));

                                receiptContent.innerHTML = 
                                    "<p><strong>Class:</strong> " + currentActiveCodeData.subjectName + " (" + currentActiveCodeData.subjectCode + ")</p>" +
                                    "<p><strong>Attendance Status:</strong> <span style='color:#10b981; font-weight:700;'>✅ REGISTERED</span></p>" +
                                    "<p><strong>MCQ Quiz Question:</strong> " + 
                                        (isMcqCorrect ? 
                                        "<span style='color:#10b981; font-weight:700;'>Correct Answer (1/1 Credit Point)</span>" : 
                                        "<span style='color:#ef4444; font-weight:700;'>Incorrect Answer (0/1 Credit Point). Correct: " + mcqQuestion.correct + "</span>") + 
                                    "</p>" +
                                    "<p><strong>Short Answer Evaluation:</strong> <span style='color:var(--accent);'>Submitted for grading (1-2 Days)</span></p>" +
                                    "<p><strong>Session Credits Logged:</strong> " + credits + " / " + maxCredits + " Credits</p>";
                            }

                            quizBlock.style.display = "none";
                            codeForm.style.display = "none";
                            quizResultsBlock.style.display = "block";

                            renderCheckins();
                            
                            submitButton.disabled = false;
                            submitButton.textContent = "Submit Answers & Mark Attendance";

                            // Automatically reload page after 2.5 seconds to sync dashboard stats
                            setTimeout(() => {
                                window.location.reload();
                            }, 2500);
                        }, 1200);
                    });
                }

                // To-Do Checklist Logic
                const todoInput = document.getElementById("todoTaskInput");
                const addTodoBtn = document.getElementById("addTodoBtn");
                const todoList = document.getElementById("todoList");

                let todos = JSON.parse(localStorage.getItem("dashboardTodos")) || [
                    { text: "Prepare VLSI Lab Viva questions", completed: false },
                    { text: "Download professional communication syllabus", completed: true },
                    { text: "Submit database tuning assignment", completed: false }
                ];

                function renderTodos() {
                    if (!todoList) return;
                    todoList.innerHTML = todos.map((todo, idx) => {
                        return "<li style='display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding: 8px 12px; border-radius:6px; border:1px solid var(--border-color);'>" +
                            "<div style='display:flex; align-items:center; gap:10px;'>" +
                                "<input type='checkbox' " + (todo.completed ? "checked" : "") + " style='cursor:pointer;' onchange='toggleTodo(" + idx + ")'>" +
                                "<span style='" + (todo.completed ? "text-decoration: line-through; color: var(--text-tertiary);" : "color: var(--text-primary);") + " font-size:12px;'>" + todo.text + "</span>" +
                            "</div>" +
                            "<button onclick='deleteTodo(" + idx + ")' style='background:none; border:none; color:var(--text-tertiary); cursor:pointer; font-size:12px;' onmouseover='this.style.color=\\\"#ef4444\\\"' onmouseout='this.style.color=\\\"var(--text-tertiary)\\\"'><i class='fa-solid fa-trash-can'></i></button>" +
                        "</li>";
                    }).join("");
                }

                window.toggleTodo = function(idx) {
                    todos[idx].completed = !todos[idx].completed;
                    localStorage.setItem("dashboardTodos", JSON.stringify(todos));
                    renderTodos();
                };

                window.deleteTodo = function(idx) {
                    todos.splice(idx, 1);
                    localStorage.setItem("dashboardTodos", JSON.stringify(todos));
                    renderTodos();
                };

                if (addTodoBtn && todoInput) {
                    const addTask = () => {
                        const txt = todoInput.value.trim();
                        if (txt) {
                            todos.push({ text: txt, completed: false });
                            localStorage.setItem("dashboardTodos", JSON.stringify(todos));
                            todoInput.value = "";
                            renderTodos();
                        }
                    };
                    addTodoBtn.addEventListener("click", addTask);
                    todoInput.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") {
                            addTask();
                        }
                    });
                }

                renderTodos();
            });
        `
    },
    {
        id: "timetable",
        dir: "student/academics/timetable",
        title: "Class Timetable",
        icon: "fa-calendar-week",
        category: "Academics",
        htmlContent: `
            <div class="timetable-controls-wrapper">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; gap: 15px; flex-wrap: wrap;">
                    <div style="display: flex; gap: 10px; background: rgba(255,255,255,0.02); padding: 5px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <button class="tab-btn active" onclick="switchTimetableTab('day')"><i class="fa-solid fa-calendar-day"></i> Day View</button>
                        <button class="tab-btn" onclick="switchTimetableTab('week')"><i class="fa-solid fa-calendar-week"></i> Full Week Grid</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <select id="sectionSelect" class="form-input" style="height: 36px; padding: 0 10px; font-size:12px; width: 140px; margin: 0; background: var(--bg-secondary); border-radius: 6px;">
                            <option value="sec_a">Section A (CS-A)</option>
                            <option value="sec_b">Section B (CS-B)</option>
                        </select>
                        <button id="downloadPdfBtn" class="btn btn-secondary btn-sm" style="height: 36px; gap: 6px; padding: 0 16px;"><i class="fa-solid fa-file-pdf"></i> Download PDF</button>
                    </div>
                </div>

                <!-- Day View Container (Active by default) -->
                <div id="dayTimetableContainer" style="display: block; margin-bottom: 30px;">
                    <!-- Mon-Fri Tab pills -->
                    <div style="display: flex; gap: 10px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 5px;">
                        <button class="day-pill active" onclick="showDaySchedule('Monday')">Mon</button>
                        <button class="day-pill" onclick="showDaySchedule('Tuesday')">Tue</button>
                        <button class="day-pill" onclick="showDaySchedule('Wednesday')">Wed</button>
                        <button class="day-pill" onclick="showDaySchedule('Thursday')">Thu</button>
                        <button class="day-pill" onclick="showDaySchedule('Friday')">Fri</button>
                    </div>

                    <!-- Timeline Schedule cards -->
                    <div id="dailyTimeline" style="display: flex; flex-direction: column; gap: 15px;">
                        <!-- Javascript renders these daily timeline blocks -->
                    </div>
                </div>

                <!-- Week Grid Container (Hidden by default) -->
                <div id="weekTimetableContainer" class="timetable-card glassmorphism" style="display: none; padding: 30px;">
                    <div class="card-header" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="font-size: 16px; font-weight:700; color: var(--accent);"><i class="fa-solid fa-table"></i> Complete Weekly Matrix</h3>
                        <span style="font-size:12px; color:var(--text-secondary);">Section A • Autumn Session</span>
                    </div>
                    <div class="table-responsive">
                        <table class="timetable-table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>09:00 - 10:30 AM</th>
                                    <th>11:00 - 12:30 PM</th>
                                    <th>01:30 - 03:00 PM</th>
                                    <th>03:15 - 04:45 PM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td class="slot-active"><strong>Neural Networks</strong>Room 403</td>
                                    <td class="slot-active"><strong>Embedded VLSI</strong>Lab 3B</td>
                                    <td class="slot-free">Lunch Interval</td>
                                    <td class="slot-active"><strong>Robotics Lab</strong>Lab 1A</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td class="slot-active"><strong>AI Specializations</strong>Seminar Hall</td>
                                    <td class="slot-free">Self Study</td>
                                    <td class="slot-active"><strong>Database Systems</strong>Room 402</td>
                                    <td class="slot-active"><strong>Humanities</strong>Room 405</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td class="slot-active"><strong>Neural Networks</strong>Room 403</td>
                                    <td class="slot-active"><strong>Database Systems</strong>Room 402</td>
                                    <td class="slot-free">Lunch Interval</td>
                                    <td class="slot-active"><strong>VLSI Systems</strong>Room 410</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td class="slot-active"><strong>Embedded VLSI</strong>Lab 3B</td>
                                    <td class="slot-active"><strong>AI Specializations</strong>Seminar Hall</td>
                                    <td class="slot-free">Self Study</td>
                                    <td class="slot-active"><strong>Database Systems</strong>Room 402</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td class="slot-active"><strong>Robotics Lab</strong>Lab 1A</td>
                                    <td class="slot-active"><strong>Humanities</strong>Room 405</td>
                                    <td class="slot-free">Lunch Interval</td>
                                    <td class="slot-free">Weekly Review</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .tab-btn {
                background: none;
                border: none;
                padding: 8px 16px;
                font-size: 13px;
                color: var(--text-secondary);
                cursor: pointer;
                border-radius: 6px;
                transition: all 0.3s ease;
                font-weight: 600;
            }
            .tab-btn.active {
                background: var(--primary);
                color: #fff;
            }
            .day-pill {
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                padding: 8px 20px;
                font-size: 13px;
                color: var(--text-secondary);
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 600;
            }
            .day-pill.active {
                background: rgba(99, 102, 241, 0.15);
                border-color: var(--primary);
                color: var(--primary);
            }
            .timeline-card {
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 20px;
                border-radius: 12px;
                border: 1px solid var(--border-glass);
                transition: transform 0.3s ease, border-color 0.3s ease;
            }
            .timeline-card:hover {
                transform: translateX(5px);
                border-color: var(--primary);
            }
            .timeline-time {
                min-width: 130px;
                font-size: 13px;
                font-weight: 700;
                color: var(--primary);
                font-family: monospace;
            }
            .timeline-content {
                flex-grow: 1;
            }
            .timeline-badge {
                font-size: 10px;
                padding: 3px 8px;
                border-radius: 4px;
                font-weight: 700;
                text-transform: uppercase;
                margin-left: 10px;
            }
            .badge-class { background: rgba(99,102,241,0.15); color: var(--primary); }
            .badge-lab { background: rgba(236,72,153,0.15); color: var(--accent); }
            .badge-free { background: rgba(255,255,255,0.05); color: var(--text-tertiary); }

            .timetable-card {
                padding: 30px;
                border: 1px solid var(--border-glass);
            }
            .timetable-table {
                width: 100%;
                border-collapse: collapse;
                text-align: center;
            }
            .timetable-table th, .timetable-table td {
                padding: 16px;
                border: 1px solid var(--border-color);
                font-size: 13px;
            }
            .timetable-table th {
                background-color: var(--bg-tertiary);
                font-weight: 700;
                color: var(--text-primary);
            }
            .timetable-table td:first-child {
                font-weight: 700;
                background-color: var(--bg-tertiary);
                color: var(--text-secondary);
            }
            .slot-active {
                background-color: rgba(99, 102, 241, 0.04);
                color: var(--text-primary);
                transition: background-color 0.3s ease;
            }
            .slot-active:hover {
                background-color: rgba(99, 102, 241, 0.08);
            }
            .slot-active strong {
                color: var(--primary);
                display: block;
                margin-bottom: 4px;
            }
            .slot-free {
                background-color: transparent;
                color: var(--text-tertiary);
                font-style: italic;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const timetableData = {
                    Monday: [
                        { time: "09:00 - 10:30 AM", type: "class", subject: "Neural Networks (CS-501)", detail: "Room 403 • Prof. S. Sharma" },
                        { time: "11:00 - 12:30 PM", type: "lab", subject: "Embedded VLSI (CS-502)", detail: "Lab 3B • Dr. A. Verma" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Lunch Interval", detail: "Cafeteria / Recreation Center" },
                        { time: "03:15 - 04:45 PM", type: "lab", subject: "Robotics Lab (CS-505)", detail: "Lab 1A • Prof. M. Seth" }
                    ],
                    Tuesday: [
                        { time: "09:00 - 10:30 AM", type: "class", subject: "AI Specializations (CS-507)", detail: "Seminar Hall • Dr. K. Roy" },
                        { time: "11:00 - 12:30 PM", type: "free", subject: "Self Study Session", detail: "Central Library Study Room" },
                        { time: "01:30 - 03:00 PM", type: "class", subject: "Database Systems (CS-503)", detail: "Room 402 • Prof. V. Gupta" },
                        { time: "03:15 - 04:45 PM", type: "class", subject: "Humanities & Comm (HU-501)", detail: "Room 405 • Ms. R. Joshi" }
                    ],
                    Wednesday: [
                        { time: "09:00 - 10:30 AM", type: "class", subject: "Neural Networks (CS-501)", detail: "Room 403 • Prof. S. Sharma" },
                        { time: "11:00 - 12:30 PM", type: "class", subject: "Database Systems (CS-503)", detail: "Room 402 • Prof. V. Gupta" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Lunch Interval", detail: "Cafeteria" },
                        { time: "03:15 - 04:45 PM", type: "class", subject: "VLSI Systems (CS-510)", detail: "Room 410 • Dr. A. Verma" }
                    ],
                    Thursday: [
                        { time: "09:00 - 10:30 AM", type: "lab", subject: "Embedded VLSI (CS-502)", detail: "Lab 3B • Dr. A. Verma" },
                        { time: "11:00 - 12:30 PM", type: "class", subject: "AI Specializations (CS-507)", detail: "Seminar Hall • Dr. K. Roy" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Self Study Session", detail: "Central Library" },
                        { time: "03:15 - 04:45 PM", type: "class", subject: "Database Systems (CS-503)", detail: "Room 402 • Prof. V. Gupta" }
                    ],
                    Friday: [
                        { time: "09:00 - 10:30 AM", type: "lab", subject: "Robotics Lab (CS-505)", detail: "Lab 1A • Prof. M. Seth" },
                        { time: "11:00 - 12:30 PM", type: "class", subject: "Humanities & Comm (HU-501)", detail: "Room 405 • Ms. R. Joshi" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Lunch Interval", detail: "Cafeteria" },
                        { time: "03:15 - 04:45 PM", type: "free", subject: "Weekly Mentor Review", detail: "Seminar Hall" }
                    ]
                };

                window.switchTimetableTab = function(tabName) {
                    const dayContainer = document.getElementById("dayTimetableContainer");
                    const weekContainer = document.getElementById("weekTimetableContainer");
                    const buttons = document.querySelectorAll(".tab-btn");

                    buttons.forEach(btn => btn.classList.remove("active"));

                    if (tabName === "day") {
                        if (dayContainer) dayContainer.style.display = "block";
                        if (weekContainer) weekContainer.style.display = "none";
                        buttons[0].classList.add("active");
                    } else {
                        if (dayContainer) dayContainer.style.display = "none";
                        if (weekContainer) weekContainer.style.display = "block";
                        buttons[1].classList.add("active");
                    }
                };

                window.showDaySchedule = function(dayName) {
                    const pills = document.querySelectorAll(".day-pill");
                    pills.forEach(p => {
                        p.classList.remove("active");
                        if (p.textContent.trim().toLowerCase() === dayName.substring(0,3).toLowerCase()) {
                            p.classList.add("active");
                        }
                    });

                    const timeline = document.getElementById("dailyTimeline");
                    if (!timeline) return;

                    const daySlots = timetableData[dayName] || [];
                    timeline.innerHTML = daySlots.map(slot => {
                        let badgeClass = "badge-free";
                        let badgeLabel = "Free Slot";
                        let glowColor = "rgba(255,255,255,0.02)";
                        
                        if (slot.type === "class") {
                            badgeClass = "badge-class";
                            badgeLabel = "Lecture";
                            glowColor = "rgba(99, 102, 241, 0.03)";
                        } else if (slot.type === "lab") {
                            badgeClass = "badge-lab";
                            badgeLabel = "Lab session";
                            glowColor = "rgba(236, 72, 153, 0.03)";
                        }

                        return "<div class='timeline-card glassmorphism' style='background:" + glowColor + ";'>" +
                            "<div class='timeline-time'><i class='fa-solid fa-clock' style='margin-right:6px;'></i>" + slot.time + "</div>" +
                            "<div class='timeline-content'>" +
                                "<strong style='font-size:14px; color:var(--text-primary);'>" + slot.subject + "</strong>" +
                                "<span class='timeline-badge " + badgeClass + "'>" + badgeLabel + "</span>" +
                                "<p style='font-size:12px; color:var(--text-secondary); margin-top:5px; margin-bottom:0;'><i class='fa-solid fa-location-dot' style='margin-right:6px;'></i>" + slot.detail + "</p>" +
                            "</div>" +
                        "</div>";
                    }).join("");
                };

                // Set Initial Day View
                showDaySchedule("Monday");

                // Mock Download PDF loader
                const dlBtn = document.getElementById("downloadPdfBtn");
                if (dlBtn) {
                    dlBtn.addEventListener("click", () => {
                        dlBtn.disabled = true;
                        dlBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating PDF...';
                        setTimeout(() => {
                            alert("PDF Download Triggered! Class_Timetable_BTech_Section_A.pdf has been downloaded successfully.");
                            dlBtn.disabled = false;
                            dlBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download PDF';
                        }, 1500);
                    });
                }
            });
        `
    },
    {
        id: "attendance",
        dir: "student/academics/attendance",
        title: "Class Attendance",
        icon: "fa-clock-rotate-left",
        category: "Academics",
        htmlContent: `
            <div class="attendance-wrapper">
                <!-- Top Row: 3 Symmetrical Cards (Summary, Simulator, Policies) -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 30px; align-items: stretch;">
                    
                    <!-- Card 1: Circular Meter Summary Card -->
                    <div class="attendance-summary glassmorphism" style="padding: 25px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                        <div>
                            <div class="overall-progress" style="margin-bottom: 15px;">
                                <div style="position: relative; width: 110px; height: 110px; margin: 0 auto 10px auto;">
                                    <svg style="width: 110px; height: 110px; transform: rotate(-90deg);">
                                        <circle cx="55" cy="55" r="45" stroke="rgba(255,255,255,0.05)" stroke-width="8" fill="transparent"/>
                                        <circle cx="55" cy="55" r="45" stroke="#10b981" stroke-width="8" stroke-dasharray="282.6" stroke-dashoffset="29.67" fill="transparent" style="stroke-linecap: round; filter: drop-shadow(0 0 4px #10b981);"/>
                                    </svg>
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;">
                                        <strong style="font-size: 20px; color: var(--text-primary); display:block; line-height: 1;">89.5%</strong>
                                        <span style="font-size: 8px; color: #10b981; font-weight:700; text-transform:uppercase; margin-top: 2px; display: block;">Safe Zone</span>
                                    </div>
                                </div>
                                <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">Overall Attendance</h3>
                                <p style="font-size: 11px; color: var(--text-secondary);">6th Semester • Section A</p>
                            </div>
                            <div style="display: flex; justify-content: space-around; gap: 5px; font-size: 10px; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px;">
                                <div>
                                    <span style="color: var(--text-tertiary); display:block;">Delivered</span>
                                    <strong style="font-size:12px; color:var(--text-primary);">180</strong>
                                </div>
                                <div>
                                    <span style="color: var(--text-tertiary); display:block;">Attended</span>
                                    <strong style="font-size:12px; color:#10b981;">161</strong>
                                </div>
                                <div>
                                    <span style="color: var(--text-tertiary); display:block;">Absent</span>
                                    <strong style="font-size:12px; color:#ef4444;">19</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2: Attendance Simulator Card -->
                    <div class="attendance-summary glassmorphism" style="padding: 25px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                        <div>
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--accent); margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
                                <i class="fa-solid fa-calculator"></i> Attendance Simulator
                            </h3>
                            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
                                <div>
                                    <label style="color: var(--text-secondary); display:block; margin-bottom:3px;">Attend next classes:</label>
                                    <div style="display:flex; gap:6px;">
                                        <input type="number" id="attendSimInput" placeholder="e.g. 5" class="form-input" style="height:28px; font-size:11px;" min="0">
                                        <button onclick="simulateAttendance('attend')" class="btn btn-primary btn-sm" style="height:28px; white-space:nowrap; padding: 0 10px; font-size:11px;">Calc</button>
                                    </div>
                                </div>
                                <div>
                                    <label style="color: var(--text-secondary); display:block; margin-bottom:3px;">Miss next classes:</label>
                                    <div style="display:flex; gap:6px;">
                                        <input type="number" id="missSimInput" placeholder="e.g. 3" class="form-input" style="height:28px; font-size:11px;" min="0">
                                        <button onclick="simulateAttendance('miss')" class="btn btn-secondary btn-sm" style="height:28px; white-space:nowrap; background:#ef4444; border-color:#ef4444; color:#fff; padding: 0 10px; font-size:11px;">Calc</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="simResultBlock" style="margin-top: 10px; padding: 8px; border-radius: 4px; display:none; font-size: 11px; font-weight: 500; line-height: 1.3;">
                            <!-- Simulated Output -->
                        </div>
                    </div>

                    <!-- Card 3: Attendance Policies -->
                    <div class="attendance-summary glassmorphism" style="padding: 25px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                        <div>
                            <h3 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
                                <i class="fa-solid fa-circle-info"></i> ERP Regulations
                            </h3>
                            <div style="font-size: 11px; color: var(--text-secondary); display:flex; flex-direction:column; gap:8px; line-height: 1.4;">
                                <span>• Minimum <strong>75% attendance</strong> is mandatory to write end-semester exams.</span>
                                <span>• Attendance between <strong>60% - 75%</strong> requires a medical certificate or duty leave approval.</span>
                                <span>• Attendance below <strong>60%</strong> leads to academic detention.</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Bottom Row: Wide Matrix Table -->
                <div class="attendance-list glassmorphism" style="padding: 30px;">
                    <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 20px;">
                        Course Wise Attendance Breakup
                    </h3>
                    <div class="table-responsive">
                        <table class="custom-table" style="font-size:13px;">
                            <thead>
                                <tr>
                                    <th>Subject Name</th>
                                    <th>Delivered</th>
                                    <th>Attended</th>
                                    <th style="width: 160px;">Percentage Status</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Neural Networks & Deep Learning</strong></td>
                                    <td>36</td>
                                    <td>33</td>
                                    <td>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:700; color:#10b981; min-width:35px;">91.6%</span>
                                            <div style="flex-grow:1; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                                                <div style="width:91.6%; height:100%; background:#10b981; border-radius:3px;"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-success">Safe</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Embedded VLSI Design</strong></td>
                                    <td>36</td>
                                    <td>31</td>
                                    <td>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:700; color:#10b981; min-width:35px;">86.1%</span>
                                            <div style="flex-grow:1; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                                                <div style="width:86.1%; height:100%; background:#10b981; border-radius:3px;"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-success">Safe</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Robotics Engineering & Control</strong></td>
                                    <td>40</td>
                                    <td>38</td>
                                    <td>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:700; color:#10b981; min-width:35px;">95.0%</span>
                                            <div style="flex-grow:1; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                                                <div style="width:95%; height:100%; background:#10b981; border-radius:3px;"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-success">Safe</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Database Systems & Query Tuning</strong></td>
                                    <td>36</td>
                                    <td>29</td>
                                    <td>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:700; color:#f59e0b; min-width:35px;">80.5%</span>
                                            <div style="flex-grow:1; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                                                <div style="width:80.5%; height:100%; background:#f59e0b; border-radius:3px;"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-warning">Caution</span></td>
                                </tr>
                                <tr>
                                    <td><strong>Humanities & Comm Skills</strong></td>
                                    <td>32</td>
                                    <td>30</td>
                                    <td>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span style="font-weight:700; color:#10b981; min-width:35px;">93.7%</span>
                                            <div style="flex-grow:1; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                                                <div style="width:93.7%; height:100%; background:#10b981; border-radius:3px;"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-success">Safe</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                </div>
            </div>
        `,
        cssContent: `
            .attendance-container {
                display: grid;
                grid-template-columns: 0.8fr 1.2fr;
                gap: 30px;
            }
            @media (max-width: 992px) {
                .attendance-container {
                    grid-template-columns: 1fr;
                }
            }
            .attendance-summary, .attendance-list {
                padding: 30px;
            }
            .overall-progress {
                text-align: center;
                margin-bottom: 24px;
            }
            .progress-circle {
                width: 140px;
                height: 140px;
                border-radius: 50%;
                background: radial-gradient(closest-side, var(--bg-secondary) 79%, transparent 80% 100%),
                            conic-gradient(var(--primary) calc(var(--percent) * 1%), var(--border-color) 0);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px auto;
            }
            .progress-circle .value {
                font-size: 22px;
                font-weight: 700;
                color: var(--text-primary);
            }
            .overall-progress h3 {
                font-size: 18px;
                margin-bottom: 4px;
            }
            .overall-progress p {
                font-size: 13px;
                color: var(--text-secondary);
            }
            .overall-stats {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .stat-box {
                display: flex;
                justify-content: space-between;
                padding: 12px 16px;
                background-color: var(--bg-tertiary);
                border-radius: var(--border-radius-sm);
                border: 1px solid var(--border-color);
            }
            .stat-box span {
                font-size: 13px;
                color: var(--text-secondary);
            }
            .stat-box strong {
                font-size: 15px;
                color: var(--text-primary);
            }
            .attendance-list h3 {
                font-size: 18px;
                color: var(--accent);
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                // Read local storage checkins
                const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                
                // Track dynamic changes to sum up overall totals
                let totalDelivered = 0;
                let totalAttended = 0;

                // Process table rows
                const rows = document.querySelectorAll(".custom-table tbody tr");
                rows.forEach(row => {
                    const subjectCell = row.querySelector("td:first-child strong");
                    if (!subjectCell) return;
                    const subjectName = subjectCell.textContent.trim();
                    
                    let delivered = parseInt(row.querySelector("td:nth-child(2)").textContent) || 0;
                    let attended = parseInt(row.querySelector("td:nth-child(3)").textContent) || 0;
                    
                    // Filter checkins for this subject
                    const subjectCheckins = checkins.filter(c => c.subjectName.toLowerCase() === subjectName.toLowerCase());
                    const addedCount = subjectCheckins.length;
                    
                    delivered += addedCount;
                    attended += addedCount; // Assumes registered attendance counts as attended
                    
                    row.querySelector("td:nth-child(2)").textContent = delivered;
                    row.querySelector("td:nth-child(3)").textContent = attended;
                    
                    // Recalculate percentage
                    const percentage = delivered > 0 ? ((attended / delivered) * 100).toFixed(1) : "0.0";
                    const statusColor = percentage >= 75 ? "#10b981" : "#f59e0b";
                    const statusText = percentage >= 75 ? "Safe" : "Caution";
                    const statusBadgeClass = percentage >= 75 ? "badge-success" : "badge-warning";
                    
                    // Update progress bar cell (4th column)
                    row.querySelector("td:nth-child(4)").innerHTML = \`
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-weight:700; color:\${statusColor}; min-width:35px;">\${percentage}%</span>
                            <div style="flex-grow:1; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                                <div style="width:\${percentage}%; height:100%; background:\${statusColor}; border-radius:3px;"></div>
                            </div>
                        </div>
                    \`;
                    
                    // Update badge cell (5th column)
                    row.querySelector("td:nth-child(5)").innerHTML = \`<span class="badge \${statusBadgeClass}">\${statusText}</span>\`;
                    
                    totalDelivered += delivered;
                    totalAttended += attended;
                });

                // Update Circular Meter & Overall Summary Card if values changed
                if (totalDelivered > 0) {
                    const overallPercentage = ((totalAttended / totalDelivered) * 100).toFixed(1);
                    
                    // Let's target the exact nodes by matching HTML hierarchy inside Circular Meter Card
                    const statValues = document.querySelectorAll(".overall-progress + div strong");
                    if (statValues.length >= 3) {
                        statValues[0].textContent = totalDelivered;
                        statValues[1].textContent = totalAttended;
                        statValues[2].textContent = totalDelivered - totalAttended;
                    }
                    
                    // Update overall percent text
                    const pctTextNode = document.querySelector(".overall-progress strong");
                    if (pctTextNode) pctTextNode.textContent = overallPercentage + "%";
                    
                    // Update SVG stroke-dashoffset
                    // Max dasharray is 282.6.
                    const circleNode = document.querySelector(".overall-progress circle[stroke='#10b981']");
                    if (circleNode) {
                        const dashoffset = 282.6 - (282.6 * overallPercentage / 100);
                        circleNode.setAttribute("stroke-dashoffset", dashoffset.toFixed(1));
                    }
                }

                // Simulate attendance functionality
                window.simulateAttendance = function(type) {
                    const resultBlock = document.getElementById("simResultBlock");
                    let inputVal = 0;
                    
                    if (type === 'attend') {
                        const val = document.getElementById("attendSimInput").value;
                        inputVal = parseInt(val) || 0;
                        if (inputVal <= 0) return;
                        
                        const newTotal = totalDelivered + inputVal;
                        const newAttended = totalAttended + inputVal;
                        const percentage = ((newAttended / newTotal) * 100).toFixed(1);
                        
                        resultBlock.style.display = "block";
                        resultBlock.style.background = "rgba(16, 185, 129, 0.08)";
                        resultBlock.style.border = "1px solid #10b981";
                        resultBlock.style.color = "#10b981";
                        resultBlock.innerHTML = "<strong>✅ Projection:</strong> If you attend next " + inputVal + " classes, your attendance rises to <strong>" + percentage + "%</strong>.";
                    } else {
                        const val = document.getElementById("missSimInput").value;
                        inputVal = parseInt(val) || 0;
                        if (inputVal <= 0) return;
                        
                        const newTotal = totalDelivered + inputVal;
                        const percentage = ((totalAttended / newTotal) * 100).toFixed(1);
                        
                        resultBlock.style.display = "block";
                        if (percentage >= 75) {
                            resultBlock.style.background = "rgba(245, 158, 11, 0.08)";
                            resultBlock.style.border = "1px solid #f59e0b";
                            resultBlock.style.color = "#f59e0b";
                            resultBlock.innerHTML = "<strong>⚠️ Warning:</strong> If you miss next " + inputVal + " classes, your attendance drops to <strong>" + percentage + "%</strong>.";
                        } else {
                            resultBlock.style.background = "rgba(239, 68, 68, 0.08)";
                            resultBlock.style.border = "1px solid #ef4444";
                            resultBlock.style.color = "#ef4444";
                            resultBlock.innerHTML = "<strong>❌ Critical Danger:</strong> If you miss next " + inputVal + " classes, your attendance drops to <strong>" + percentage + "%</strong>. You will be detained from exams (<75%).";
                        }
                    }
                };
            });
        `
    },
    {
        id: "results",
        dir: "student/academics/results",
        title: "Semester Results",
        icon: "fa-award",
        category: "Academics",
        htmlContent: `
            <div class="results-dashboard-wrapper">
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 16px; font-weight:700; color: var(--accent); margin-bottom: 5px;"><i class="fa-solid fa-graduation-cap"></i> Student Marksheet Dashboard</h3>
                    <p style="font-size: 12px; color: var(--text-secondary);">Click on any declared semester card to download/view the official grade card report. Future semesters remain locked.</p>
                </div>

                <!-- Grid of 6 Semester Cards -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 30px;">
                    
                    <!-- Semester 1 Card -->
                    <div class="sem-card glassmorphism" onclick="viewSemesterResult(1)" style="cursor:pointer; padding: 25px; border: 1px solid var(--border-glass); transition: all 0.3s ease; position:relative; overflow:hidden;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <span style="font-size: 11px; text-transform:uppercase; color: var(--primary); font-weight:700;">Academic Year 2024-25</span>
                            <span class="badge badge-success">Declared</span>
                        </div>
                        <h4 style="font-size: 18px; font-weight:700; margin-bottom:10px; color:var(--text-primary);">Semester 1</h4>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary); border-top: 1px solid var(--border-color); padding-top:12px; margin-top:10px;">
                            <span>SGPA: <strong>9.20</strong></span>
                            <span>Credits: <strong>20/20</strong></span>
                        </div>
                    </div>

                    <!-- Semester 2 Card -->
                    <div class="sem-card glassmorphism" onclick="viewSemesterResult(2)" style="cursor:pointer; padding: 25px; border: 1px solid var(--border-glass); transition: all 0.3s ease; position:relative; overflow:hidden;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <span style="font-size: 11px; text-transform:uppercase; color: var(--primary); font-weight:700;">Academic Year 2024-25</span>
                            <span class="badge badge-success">Declared</span>
                        </div>
                        <h4 style="font-size: 18px; font-weight:700; margin-bottom:10px; color:var(--text-primary);">Semester 2</h4>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary); border-top: 1px solid var(--border-color); padding-top:12px; margin-top:10px;">
                            <span>SGPA: <strong>9.50</strong></span>
                            <span>Credits: <strong>22/22</strong></span>
                        </div>
                    </div>

                    <!-- Semester 3 Card -->
                    <div class="sem-card glassmorphism" onclick="viewSemesterResult(3)" style="cursor:pointer; padding: 25px; border: 1px solid var(--border-glass); transition: all 0.3s ease; position:relative; overflow:hidden;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <span style="font-size: 11px; text-transform:uppercase; color: var(--primary); font-weight:700;">Academic Year 2025-26</span>
                            <span class="badge badge-success">Declared</span>
                        </div>
                        <h4 style="font-size: 18px; font-weight:700; margin-bottom:10px; color:var(--text-primary);">Semester 3</h4>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-secondary); border-top: 1px solid var(--border-color); padding-top:12px; margin-top:10px;">
                            <span>SGPA: <strong>9.08</strong></span>
                            <span>Credits: <strong>20/20</strong></span>
                        </div>
                    </div>

                    <!-- Semester 4 Card (Locked) -->
                    <div class="sem-card glassmorphism locked" onclick="viewSemesterResult(4)" style="padding: 25px; border: 1px solid var(--border-glass); opacity: 0.65; position:relative; overflow:hidden;">
                        <div style="position:absolute; top: 15px; right: 15px; font-size: 16px; color: var(--text-tertiary);">
                            <i class="fa-solid fa-lock" style="color:var(--accent);"></i>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <span style="font-size: 11px; text-transform:uppercase; color: var(--text-tertiary); font-weight:700;">Academic Year 2025-26</span>
                            <span class="badge badge-error" style="background:rgba(239,68,68,0.15); color:#ef4444;">Locked</span>
                        </div>
                        <h4 style="font-size: 18px; font-weight:700; margin-bottom:10px; color:var(--text-tertiary);">Semester 4</h4>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-tertiary); border-top: 1px dashed var(--border-color); padding-top:12px; margin-top:10px;">
                            <span>SGPA: <strong>--</strong></span>
                            <span>Credits: <strong>--</strong></span>
                        </div>
                    </div>

                    <!-- Semester 5 Card (Locked) -->
                    <div class="sem-card glassmorphism locked" onclick="viewSemesterResult(5)" style="padding: 25px; border: 1px solid var(--border-glass); opacity: 0.65; position:relative; overflow:hidden;">
                        <div style="position:absolute; top: 15px; right: 15px; font-size: 16px; color: var(--text-tertiary);">
                            <i class="fa-solid fa-lock" style="color:var(--accent);"></i>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <span style="font-size: 11px; text-transform:uppercase; color: var(--text-tertiary); font-weight:700;">Academic Year 2026-27</span>
                            <span class="badge badge-error" style="background:rgba(239,68,68,0.15); color:#ef4444;">Locked</span>
                        </div>
                        <h4 style="font-size: 18px; font-weight:700; margin-bottom:10px; color:var(--text-tertiary);">Semester 5</h4>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-tertiary); border-top: 1px dashed var(--border-color); padding-top:12px; margin-top:10px;">
                            <span>SGPA: <strong>--</strong></span>
                            <span>Credits: <strong>--</strong></span>
                        </div>
                    </div>

                    <!-- Semester 6 Card (Locked) -->
                    <div class="sem-card glassmorphism locked" onclick="viewSemesterResult(6)" style="padding: 25px; border: 1px solid var(--border-glass); opacity: 0.65; position:relative; overflow:hidden;">
                        <div style="position:absolute; top: 15px; right: 15px; font-size: 16px; color: var(--text-tertiary);">
                            <i class="fa-solid fa-lock" style="color:var(--accent);"></i>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <span style="font-size: 11px; text-transform:uppercase; color: var(--text-tertiary); font-weight:700;">Academic Year 2026-27</span>
                            <span class="badge badge-error" style="background:rgba(239,68,68,0.15); color:#ef4444;">Locked</span>
                        </div>
                        <h4 style="font-size: 18px; font-weight:700; margin-bottom:10px; color:var(--text-tertiary);">Semester 6</h4>
                        <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-tertiary); border-top: 1px dashed var(--border-color); padding-top:12px; margin-top:10px;">
                            <span>SGPA: <strong>--</strong></span>
                            <span>Credits: <strong>--</strong></span>
                        </div>
                    </div>

                </div>

                <!-- Grade Card Modal (Overlay) -->
                <div id="gradesModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(8px); z-index:1000; align-items:center; justify-content:center; padding: 20px;">
                    <div class="glassmorphism" style="width:100%; max-width:700px; padding:30px; border: 1px solid var(--border-glass); position:relative; animation: fadeIn 0.3s ease;">
                        
                        <!-- Close button -->
                        <button onclick="closeGradesModal()" style="position:absolute; top:20px; right:20px; background:none; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        
                        <h3 id="modalTitle" style="font-size:18px; font-weight:700; color:var(--accent); margin-bottom:20px;">Semester 1 Grades Sheet</h3>
                        
                        <div class="table-responsive">
                            <table class="custom-table" style="font-size:13px; width: 100%;">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Subject Title</th>
                                        <th>Credits</th>
                                        <th>Grade Point</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody id="modalGradesBody">
                                    <!-- Dynamic rows -->
                                </tbody>
                            </table>
                        </div>

                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding-top:15px; border-top:1px solid var(--border-color); font-size:13px; flex-wrap:wrap; gap: 15px;">
                            <span id="modalSgpa">SGPA: <strong>9.20</strong></span>
                            <span id="modalCgpa">CGPA: <strong>9.20</strong></span>
                            <button class="btn btn-secondary btn-sm" id="downloadReportBtn" style="gap:5px; height: 32px;"><i class="fa-solid fa-file-pdf"></i> Download Gradesheet</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .sem-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid var(--border-glass);
                transition: transform 0.3s ease, border-color 0.3s ease;
            }
            .sem-card:hover {
                transform: translateY(-5px);
                border-color: var(--primary) !important;
                box-shadow: var(--glass-shadow);
            }
            .sem-card.locked {
                opacity: 0.6;
                cursor: not-allowed;
            }
            .sem-card.locked:hover {
                transform: none;
                border-color: var(--border-glass) !important;
                box-shadow: none;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const semesterResults = {
                    1: {
                        title: "Semester 1 (Autumn 2024)",
                        sgpa: "9.20",
                        cgpa: "9.20",
                        subjects: [
                            { code: "CS-101", title: "Introduction to CS & Programming", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "MTH-101", title: "Calculus & Linear Algebra", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "EE-101", title: "Basic Electronics Systems", credits: 4, points: 10, grade: "O (Outstanding)" },
                            { code: "HU-101", title: "English & Comm Skills", credits: 3, points: 9, grade: "E (Excellent)" },
                            { code: "PHY-101", title: "Engineering Physics Lab", credits: 5, points: 9, grade: "E (Excellent)" }
                        ]
                    },
                    2: {
                        title: "Semester 2 (Spring 2025)",
                        sgpa: "9.50",
                        cgpa: "9.36",
                        subjects: [
                            { code: "CS-201", title: "Data Structures & Algorithms", credits: 4, points: 10, grade: "O (Outstanding)" },
                            { code: "MTH-201", title: "Discrete Mathematical Structures", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "EE-201", title: "Digital Circuits & VLSI Intro", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-250", title: "Object Oriented Java Lab", credits: 5, points: 10, grade: "O (Outstanding)" },
                            { code: "ME-201", title: "Engineering Workshop Practicals", credits: 5, points: 9, grade: "E (Excellent)" }
                        ]
                    },
                    3: {
                        title: "Semester 3 (Autumn 2025)",
                        sgpa: "9.08",
                        cgpa: "9.27",
                        subjects: [
                            { code: "CS-301", title: "Computer Organization & Architecture", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-302", title: "Operating Systems Principles", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-303", title: "Object Oriented Design C++", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-350", title: "Python Scripting & Data Tools", credits: 4, points: 10, grade: "O (Outstanding)" },
                            { code: "MTH-301", title: "Probability & Stats Computing", credits: 4, points: 8, grade: "A (Very Good)" }
                        ]
                    }
                };

                window.viewSemesterResult = function(semNum) {
                    if (semNum > 3) {
                        alert("🔒 Locked: Results for Semester " + semNum + " have not been declared yet. Future academic session.");
                        return;
                    }

                    const data = semesterResults[semNum];
                    if (!data) return;

                    document.getElementById("modalTitle").textContent = data.title + " Report Card";
                    document.getElementById("modalSgpa").innerHTML = "SGPA: <strong>" + data.sgpa + "</strong>";
                    document.getElementById("modalCgpa").innerHTML = "CGPA: <strong>" + data.cgpa + "</strong>";

                    const tbody = document.getElementById("modalGradesBody");
                    tbody.innerHTML = data.subjects.map(sub => {
                        return "<tr>" +
                            "<td>" + sub.code + "</td>" +
                            "<td><strong>" + sub.title + "</strong></td>" +
                            "<td>" + sub.credits + "</td>" +
                            "<td>" + sub.points + "</td>" +
                            "<td><span class='badge badge-success'>" + sub.grade + "</span></td>" +
                            "</tr>";
                    }).join("");

                    const modal = document.getElementById("gradesModal");
                    if (modal) modal.style.display = "flex";
                };

                window.closeGradesModal = function() {
                    const modal = document.getElementById("gradesModal");
                    if (modal) modal.style.display = "none";
                };

                // Close modal clicking outside
                window.onclick = function(event) {
                    const modal = document.getElementById("gradesModal");
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                };

                // Mock report card download
                const dlBtn = document.getElementById("downloadReportBtn");
                if (dlBtn) {
                    dlBtn.addEventListener("click", () => {
                        dlBtn.disabled = true;
                        dlBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating PDF...';
                        setTimeout(() => {
                            alert("Gradesheet PDF download triggered successfully!");
                            dlBtn.disabled = false;
                            dlBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download Gradesheet';
                        }, 1200);
                    });
                }
            });
        `
    },
    {
        id: "exams",
        dir: "student/academics/exams",
        title: "Examinations",
        icon: "fa-file-signature",
        category: "Academics",
        htmlContent: `
            <div class="exams-container">
                <!-- Top Card: Exam Controls & Hall Ticket -->
                <div class="exams-card glassmorphism">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; border-bottom:1px solid var(--border-color); padding-bottom:20px; margin-bottom:20px;">
                        <h3 style="margin:0; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-file-invoice"></i> Exam Hall Pass & Seating Checker</h3>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <label style="font-size:12px; color:var(--text-secondary); white-space:nowrap;">Select Exam Type:</label>
                            <select id="examTypeSelect" class="form-input" onchange="renderExams(this.value)" style="height:36px; width:220px; margin:0; background:var(--bg-secondary); font-size:12px; border-radius:6px;">
                                <option value="practical_exam">Practical Exam</option>
                                <option value="project_viva">Project Review & Viva</option>
                                <option value="mid_term_1">Mid-Term I (T1)</option>
                                <option value="mid_term_2" selected>Mid-Term II (T2)</option>
                                <option value="semester_exam">Semester Exam (End-Sem)</option>
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px;">
                        <div>
                            <h4 style="font-size:14px; font-weight:700; color:var(--accent); margin-bottom:12px;"><i class="fa-solid fa-triangle-exclamation"></i> Regulations & Access</h4>
                            <div style="font-size:12px; color:var(--text-secondary); display:flex; flex-direction:column; gap:8px; line-height:1.5;">
                                <span>• Carrying a physical college ID card is mandatory for exam entry.</span>
                                <span>• Smartwatches, mobiles, and electronics are strictly prohibited.</span>
                                <span>• Candidates must report to the hall 20 minutes before the start.</span>
                            </div>
                        </div>
                        <div style="display:flex; flex-direction:column; justify-content:space-between; border-left: 1px solid var(--border-color); padding-left: 30px;">
                            <div>
                                <h4 style="font-size:14px; font-weight:700; color:var(--primary); margin-bottom:8px;"><i class="fa-solid fa-user-shield"></i> Seating Allocation</h4>
                                <p style="font-size:12px; color:var(--text-secondary); margin-bottom:15px;">Check your allotted exam room and seat code to avoid last-minute delays.</p>
                            </div>
                            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                <button class="btn btn-secondary btn-sm" onclick="showAllottedSeat()" style="height:36px; padding: 0 15px;"><i class="fa-solid fa-chair"></i> View Allotted Seat</button>
                                <button class="btn btn-primary btn-sm" id="downloadHallTicketBtn" onclick="downloadHallTicket()" style="height:36px; gap:6px; padding: 0 15px;"><i class="fa-solid fa-download"></i> Download Hall Ticket</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Card: Semester Examination Datesheet Matrix -->
                <div class="exams-card glassmorphism" style="margin-top: 30px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <h3 id="examTitleHeader" style="font-size: 16px; font-weight:700; color:var(--accent); margin:0;"><i class="fa-solid fa-calendar-days"></i> Mid-Term II Examination Schedule</h3>
                        <span style="font-size:12px; color:var(--text-secondary);">Section A • Exam Datesheet</span>
                    </div>
                    <div class="table-responsive">
                        <table class="custom-table" style="width: 100%; border-collapse: collapse; text-align: center; font-size:13px;">
                            <thead>
                                <tr>
                                    <th>Date & Day</th>
                                    <th>Shift / Timings</th>
                                    <th>Subject Code</th>
                                    <th>Subject Title</th>
                                    <th>Room Code</th>
                                </tr>
                            </thead>
                            <tbody id="examScheduleBody">
                                <!-- Dynamic schedule rows -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .exams-card {
                padding: 30px;
            }
            .exams-card h3 {
                font-size: 18px;
                color: var(--accent);
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const examSchedules = {
                    mid_term_1: {
                        name: "Mid-Term I Examination Schedule",
                        ticketName: "Mid-Term I",
                        seatInfo: "Hall 4, Row B, Seat 14",
                        rows: [
                            { date: "Aug 18, 2026 (Tue)", time: "09:30 AM - 11:00 AM", code: "CS-501", subject: "Neural Networks & Deep Learning", room: "Block A - Room 202" },
                            { date: "Aug 19, 2026 (Wed)", time: "09:30 AM - 11:00 AM", code: "CS-502", subject: "Embedded VLSI Design", room: "Block A - Room 203" },
                            { date: "Aug 20, 2026 (Thu)", time: "01:00 PM - 02:30 PM", code: "CS-503", subject: "Database Systems & Tuning", room: "Block B - Room 105" }
                        ]
                    },
                    mid_term_2: {
                        name: "Mid-Term II Examination Schedule",
                        ticketName: "Mid-Term II",
                        seatInfo: "Hall 4, Row F, Seat 12",
                        rows: [
                            { date: "Oct 12, 2026 (Mon)", time: "09:30 AM - 11:00 AM", code: "CS-501", subject: "Neural Networks & Deep Learning", room: "Main Block - Hall 4" },
                            { date: "Oct 14, 2026 (Wed)", time: "09:30 AM - 11:00 AM", code: "CS-502", subject: "Embedded VLSI Design", room: "Main Block - Hall 3" },
                            { date: "Oct 15, 2026 (Thu)", time: "01:00 PM - 02:30 PM", code: "CS-503", subject: "Database Systems & Tuning", room: "Annex Block - Lab A" }
                        ]
                    },
                    semester_exam: {
                        name: "Semester Examination Schedule (End-Sem)",
                        ticketName: "End-Semester",
                        seatInfo: "Hall Alpha, Row A, Seat 45",
                        rows: [
                            { date: "Dec 04, 2026 (Fri)", time: "10:00 AM - 01:00 PM", code: "CS-501", subject: "Neural Networks & Deep Learning", room: "Exams Hall Alpha" },
                            { date: "Dec 07, 2026 (Mon)", time: "10:00 AM - 01:00 PM", code: "CS-502", subject: "Embedded VLSI Design", room: "Exams Hall Beta" },
                            { date: "Dec 10, 2026 (Thu)", time: "10:00 AM - 01:00 PM", code: "CS-503", subject: "Database Systems & Tuning", room: "Exams Hall Alpha" },
                            { date: "Dec 12, 2026 (Sat)", time: "10:00 AM - 01:00 PM", code: "HU-501", subject: "Humanities & Comm Skills", room: "Exams Hall Gamma" }
                        ]
                    },
                    practical_exam: {
                        name: "Practical Examination Schedule",
                        ticketName: "Practicals",
                        seatInfo: "Lab 302, PC-22",
                        rows: [
                            { date: "Nov 23, 2026 (Mon)", time: "09:00 AM - 12:00 PM", code: "CS-551", subject: "Deep Learning Lab Practicals", room: "Lab Block - Room 302" },
                            { date: "Nov 25, 2026 (Wed)", time: "09:00 AM - 12:00 PM", code: "CS-552", subject: "Robotics Hardware Lab Evaluation", room: "Lab Block - Room 104" },
                            { date: "Nov 26, 2026 (Thu)", time: "01:30 PM - 04:30 PM", code: "CS-553", subject: "Database Systems Performance Lab", room: "Lab Block - Room 311" }
                        ]
                    },
                    project_viva: {
                        name: "Project Review & Viva Schedule",
                        ticketName: "Project Viva",
                        seatInfo: "Team 14 - Presentation Slot 2",
                        rows: [
                            { date: "Nov 30, 2026 (Mon)", time: "10:00 AM - 01:00 PM", code: "CS-591", subject: "Major Project Mid-term Evaluation", room: "Seminar Hall Main" },
                            { date: "Dec 15, 2026 (Tue)", time: "10:00 AM - 01:00 PM", code: "CS-592", subject: "Robotics Design Capstone Review", room: "Directorate Boardroom" }
                        ]
                    }
                };

                window.renderExams = function(type) {
                    const data = examSchedules[type];
                    if (!data) return;

                    const titleHeader = document.getElementById("examTitleHeader");
                    const tableBody = document.getElementById("examScheduleBody");
                    const downloadBtn = document.getElementById("downloadHallTicketBtn");

                    if (titleHeader) titleHeader.innerHTML = '<i class="fa-solid fa-calendar-days"></i> ' + data.name;
                    if (downloadBtn) downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download Hall Ticket (' + data.ticketName + ')';
                    
                    if (tableBody) {
                        tableBody.innerHTML = data.rows.map(row => {
                            return "<tr>" +
                                "<td>" + row.date + "</td>" +
                                "<td>" + row.time + "</td>" +
                                "<td><strong>" + row.code + "</strong></td>" +
                                "<td>" + row.subject + "</td>" +
                                "<td>" + row.room + "</td>" +
                                "</tr>";
                        }).join("");
                    }
                };

                window.showAllottedSeat = function() {
                    const selectEl = document.getElementById("examTypeSelect");
                    const type = selectEl ? selectEl.value : 'mid_term_2';
                    const data = examSchedules[type];
                    if (data) {
                        alert("📍 Allotted Seating Allocation:\\n\\nSession: " + data.name + "\\nLocation/Seat: " + data.seatInfo);
                    }
                };

                window.downloadHallTicket = function() {
                    const selectEl = document.getElementById("examTypeSelect");
                    const downloadBtn = document.getElementById("downloadHallTicketBtn");
                    const type = selectEl ? selectEl.value : 'mid_term_2';
                    const data = examSchedules[type];
                    
                    if (downloadBtn && data) {
                        downloadBtn.disabled = true;
                        downloadBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating PDF...';
                        setTimeout(() => {
                            alert("Hall Ticket PDF generated successfully! Hall_Ticket_2026_" + data.ticketName.replace(" ", "_") + ".pdf is saved to downloads.");
                            downloadBtn.disabled = false;
                            downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download Hall Ticket (' + data.ticketName + ')';
                        }, 1200);
                    }
                };

                // Initial load
                renderExams("mid_term_2");
            });
        `
    },
    {
        id: "progress",
        dir: "student/academics/progress",
        title: "Academic Progress",
        icon: "fa-chart-line",
        category: "Academics",
        htmlContent: `
            <div class="progress-container">
                
                <!-- Left Column: Performance Trend Chart -->
                <div class="progress-card glassmorphism">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px; flex-wrap:wrap; gap:10px;">
                        <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--text-primary);"><i class="fa-solid fa-chart-column"></i> Semester SGPA Performance Trend</h3>
                        <span style="font-size:11px; background:rgba(99,102,241,0.15); color:var(--primary); padding:3px 10px; border-radius:12px; font-weight:700;">Average CGPA: 9.27</span>
                    </div>

                    <!-- Visual Chart Container -->
                    <div class="performance-chart-container">
                        <div class="chart-bars">
                            <div class="bar-col">
                                <div class="bar" style="height: 92%;">
                                    <span>9.20</span>
                                </div>
                                <span class="label">Sem 1</span>
                            </div>
                            <div class="bar-col">
                                <div class="bar" style="height: 95%;">
                                    <span>9.50</span>
                                </div>
                                <span class="label">Sem 2</span>
                            </div>
                            <div class="bar-col">
                                <div class="bar" style="height: 91%;">
                                    <span>9.08</span>
                                </div>
                                <span class="label">Sem 3</span>
                            </div>
                            <!-- Future semesters styled locked/dotted outline -->
                            <div class="bar-col" style="opacity:0.4;">
                                <div class="bar" style="height: 10%; background: transparent; border: 2px dashed var(--border-color); border-bottom: none;">
                                    <span><i class="fa-solid fa-lock" style="font-size:8px;"></i></span>
                                </div>
                                <span class="label">Sem 4</span>
                            </div>
                            <div class="bar-col" style="opacity:0.4;">
                                <div class="bar" style="height: 10%; background: transparent; border: 2px dashed var(--border-color); border-bottom: none;">
                                    <span><i class="fa-solid fa-lock" style="font-size:8px;"></i></span>
                                </div>
                                <span class="label">Sem 5</span>
                            </div>
                            <div class="bar-col" style="opacity:0.4;">
                                <div class="bar" style="height: 10%; background: transparent; border: 2px dashed var(--border-color); border-bottom: none;">
                                    <span><i class="fa-solid fa-lock" style="font-size:8px;"></i></span>
                                </div>
                                <span class="label">Sem 6</span>
                            </div>
                        </div>
                    </div>

                    <!-- Metrics summary panel -->
                    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:15px; margin-top:25px;">
                        <div style="padding:15px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; text-align:center;">
                            <span style="font-size:11px; color:var(--text-secondary); display:block; text-transform:uppercase; margin-bottom:4px; font-weight:600;">Credits Earned</span>
                            <strong style="font-size:18px; color:var(--text-primary);">62 Credits</strong>
                        </div>
                        <div style="padding:15px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; text-align:center;">
                            <span style="font-size:11px; color:var(--text-secondary); display:block; text-transform:uppercase; margin-bottom:4px; font-weight:600;">Class Rank</span>
                            <strong style="font-size:18px; color:var(--accent);">4th / 68</strong>
                        </div>
                        <div style="padding:15px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; text-align:center;">
                            <span style="font-size:11px; color:var(--text-secondary); display:block; text-transform:uppercase; margin-bottom:4px; font-weight:600;">Backlogs</span>
                            <strong style="font-size:18px; color:#10b981;">0 Active</strong>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Interactive CGPA Calculator Planner -->
                <div class="progress-card glassmorphism">
                    <div>
                        <h3 style="margin:0 0 10px 0; font-size:16px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-graduation-cap"></i> CGPA Target Planner</h3>
                        <p style="font-size:11px; color:var(--text-secondary); margin-bottom:20px;">Input your projected targets for future semesters to calculate your graduating CGPA.</p>
                        
                        <div style="display:flex; flex-direction:column; gap:16px;">
                            <div>
                                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px;">
                                    <span style="color:var(--text-primary); font-weight:600;">Semester 4 Target:</span>
                                    <span id="sem4Val" style="color:var(--primary); font-weight:700;">8.50</span>
                                </div>
                                <input type="range" id="sem4Range" min="5.0" max="10.0" step="0.1" value="8.5" oninput="calculateProjectedCgpa()" style="width:100%;">
                            </div>
                            <div>
                                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px;">
                                    <span style="color:var(--text-primary); font-weight:600;">Semester 5 Target:</span>
                                    <span id="sem5Val" style="color:var(--primary); font-weight:700;">8.50</span>
                                </div>
                                <input type="range" id="sem5Range" min="5.0" max="10.0" step="0.1" value="8.5" oninput="calculateProjectedCgpa()" style="width:100%;">
                            </div>
                            <div>
                                <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px;">
                                    <span style="color:var(--text-primary); font-weight:600;">Semester 6 Target:</span>
                                    <span id="sem6Val" style="color:var(--primary); font-weight:700;">8.50</span>
                                </div>
                                <input type="range" id="sem6Range" min="5.0" max="10.0" step="0.1" value="8.5" oninput="calculateProjectedCgpa()" style="width:100%;">
                            </div>
                        </div>
                    </div>

                    <div style="margin-top:25px; padding:20px; background:rgba(99,102,241,0.06); border:1px dashed var(--primary); border-radius:10px; text-align:center;">
                        <span style="font-size:12px; color:var(--text-secondary); display:block; margin-bottom:5px; text-transform:uppercase; font-weight:600;">Graduation CGPA Projection</span>
                        <strong id="projectedCgpaText" style="font-size:32px; color:var(--text-primary); filter: drop-shadow(0 0 5px var(--primary));">8.89</strong>
                    </div>
                </div>

            </div>
        `,
        cssContent: `
            .progress-container {
                display: grid;
                grid-template-columns: 1.2fr 0.8fr;
                gap: 30px;
            }
            @media (max-width: 992px) {
                .progress-container {
                    grid-template-columns: 1fr;
                }
            }
            .progress-card {
                padding: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .performance-chart-container {
                height: 240px;
                display: flex;
                align-items: flex-end;
                border-bottom: 2px solid var(--border-color);
                padding-bottom: 10px;
                margin-top: 20px;
            }
            .chart-bars {
                display: flex;
                width: 100%;
                justify-content: space-around;
                height: 100%;
                align-items: flex-end;
            }
            .bar-col {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 50px;
            }
            .bar {
                width: 100%;
                background: linear-gradient(to top, var(--primary), var(--secondary));
                border-radius: 6px 6px 0 0;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 10px;
                transition: height 0.5s ease;
                position: relative;
            }
            .bar span {
                font-size: 11px;
                font-weight: 700;
                color: #ffffff;
            }
            .bar-col .label {
                margin-top: 10px;
                font-size: 12px;
                color: var(--text-secondary);
                font-weight: 600;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const baselineGpas = [9.20, 9.50, 9.08];

                window.calculateProjectedCgpa = function() {
                    const sem4Val = document.getElementById("sem4Val");
                    const sem5Val = document.getElementById("sem5Val");
                    const sem6Val = document.getElementById("sem6Val");
                    const projectedCgpaText = document.getElementById("projectedCgpaText");

                    const sem4 = parseFloat(document.getElementById("sem4Range").value) || 8.5;
                    const sem5 = parseFloat(document.getElementById("sem5Range").value) || 8.5;
                    const sem6 = parseFloat(document.getElementById("sem6Range").value) || 8.5;

                    if (sem4Val) sem4Val.textContent = sem4.toFixed(2);
                    if (sem5Val) sem5Val.textContent = sem5.toFixed(2);
                    if (sem6Val) sem6Val.textContent = sem6.toFixed(2);

                    const allGpas = [...baselineGpas, sem4, sem5, sem6];
                    const sum = allGpas.reduce((a, b) => a + b, 0);
                    const avgCgpa = sum / allGpas.length;

                    if (projectedCgpaText) projectedCgpaText.textContent = avgCgpa.toFixed(2);
                };

                // Trigger initial calculation
                calculateProjectedCgpa();
            });
        `
    },
    {
        id: "stream",
        dir: "student/classroom/stream",
        title: "Classroom Stream",
        icon: "fa-bullhorn",
        category: "Classroom",
        htmlContent: `
            <div class="stream-layout">
                <!-- Class Banner Hero -->
                <div class="stream-banner glassmorphism" style="position:relative; overflow:hidden; border-radius:12px; margin-bottom:25px; padding:35px; background:linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%); border:1px solid var(--border-color);">
                    <div style="position:relative; z-index:2;">
                        <span style="font-size:11px; background:var(--primary); color:#fff; padding:3px 10px; border-radius:20px; font-weight:700; text-transform:uppercase;">Class Active</span>
                        <h1 style="font-size:26px; font-weight:800; margin:10px 0 5px 0; color:var(--text-primary); line-height:1.2;">B.Tech CSE - Neural Networks & Deep Learning</h1>
                        <p style="margin:0; font-size:13px; color:var(--text-secondary);">Fall Electives • 2026 Batch • Section AI-1 • Class Code: <strong style="color:var(--accent);">CSE-NN-501</strong></p>
                    </div>
                </div>

                <!-- 2-Column Content Grid -->
                <div class="stream-grid">
                    
                    <!-- Sidebar Column -->
                    <div class="stream-sidebar">
                        
                        <!-- Meet Link Card -->
                        <div class="stream-card glassmorphism">
                            <h4 style="margin:0 0 8px 0; font-size:13px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-video"></i> Live Class Meet</h4>
                            <p style="font-size:11px; color:var(--text-secondary); margin-bottom:12px; line-height:1.4;">Access the virtual classroom session for lectures and discussions.</p>
                            <a href="https://meet.google.com" target="_blank" class="btn btn-secondary btn-sm" style="width:100%; display:flex; justify-content:center; gap:6px;"><i class="fa-solid fa-up-right-from-square"></i> Join Meet Session</a>
                        </div>

                        <!-- Upcoming Due Dates Card -->
                        <div class="stream-card glassmorphism" style="margin-top: 20px;">
                            <h4 style="margin:0 0 10px 0; font-size:13px; font-weight:700; color:var(--text-primary);"><i class="fa-solid fa-clock"></i> Upcoming Deadlines</h4>
                            <div style="display:flex; flex-direction:column; gap:12px;">
                                <div style="border-left:2px solid #ef4444; padding-left:10px;">
                                    <strong style="font-size:11px; display:block; color:var(--text-primary);">Backprop Code Submission</strong>
                                    <span style="font-size:10px; color:#ef4444; font-weight:600;">Due Oct 10, 11:59 PM</span>
                                </div>
                                <div style="border-left:2px solid var(--primary); padding-left:10px;">
                                    <strong style="font-size:11px; display:block; color:var(--text-primary);">CMOS Inverter Evaluation</strong>
                                    <span style="font-size:10px; color:var(--text-secondary);">Due Oct 15, 04:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Main Stream Feed Column -->
                    <div class="stream-feed">
                        
                        <!-- Announcement Composer -->
                        <div class="announcement-composer glassmorphism">
                            <div style="display:flex; gap:12px; align-items:start;">
                                <div style="width:36px; height:36px; border-radius:50%; background:var(--primary); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:14px;">S</div>
                                <div style="flex:1;">
                                    <textarea id="composerText" placeholder="Announce something to your class..." rows="2" class="form-input" style="width:100%; padding: 12px; border-radius: 8px; margin-bottom:12px; resize:none; font-size:13px; background:rgba(255,255,255,0.02); border:1px solid var(--border-color);"></textarea>
                                    <div style="display:flex; justify-content:flex-end; gap:10px;">
                                        <button class="btn btn-primary btn-sm" onclick="addNewPost()" style="height:32px; font-size:11px;">Post Announcement</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Posts Feed Container -->
                        <div id="postsFeedContainer" style="display:flex; flex-direction:column; gap:20px;">
                            <!-- Posts render dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .stream-grid {
                display: grid;
                grid-template-columns: 280px 1fr;
                gap: 25px;
                align-items: start;
            }
            @media (max-width: 768px) {
                .stream-grid {
                    grid-template-columns: 1fr;
                }
            }
            .stream-card {
                padding: 20px;
                border-radius: 10px;
            }
            .announcement-composer {
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            .stream-post {
                padding: 20px;
                border-radius: 10px;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultPosts = [
                    {
                        author: "Prof. S. Sharma (HOD CSE)",
                        role: "Instructor",
                        avatar: "S",
                        time: "Posted 2 hours ago",
                        content: "Hello Section A. I have posted the lecture slides for Week 5 (Convolutional Neural Networks architectures) in the Study Materials tab. Please review them before tomorrow's lab session, as we will be building a basic LeNet-5 architecture in PyTorch."
                    },
                    {
                        author: "Tanya Verma",
                        role: "Class Representative",
                        avatar: "T",
                        time: "Posted Yesterday",
                        content: "Reminder: The guest lecture on AI Ethics is scheduled for Friday at 2:00 PM in Seminar Hall Beta. Attendance is mandatory for all final year students."
                    }
                ];

                function getPosts() {
                    const saved = localStorage.getItem("class_stream_posts");
                    if (saved) return JSON.parse(saved);
                    return defaultPosts;
                }

                function savePosts(posts) {
                    localStorage.setItem("class_stream_posts", JSON.stringify(posts));
                }

                window.renderFeed = function() {
                    const container = document.getElementById("postsFeedContainer");
                    if (!container) return;

                    const posts = getPosts();
                    container.innerHTML = posts.map((post, index) => \`
                        <div class="stream-post glassmorphism">
                            <div class="post-header" style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                                <div style="width:36px; height:36px; border-radius:50%; background:\${post.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:14px;">\${post.avatar}</div>
                                <div>
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <strong style="font-size:13px; color:var(--text-primary);">\${post.author}</strong>
                                        <span style="font-size:9px; background:\${post.role === 'Instructor' ? 'rgba(236,72,153,0.15)' : 'rgba(99,102,241,0.15)'}; color:\${post.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; padding:2px 8px; border-radius:10px; font-weight:700;">\${post.role}</span>
                                    </div>
                                    <span class="date" style="font-size:10px; color:var(--text-tertiary); font-weight: 500;">\${post.time}</span>
                                </div>
                            </div>
                            <div class="post-content" style="font-size:13px; color:var(--text-secondary); line-height:1.5;">
                                <p style="margin:0;">\${post.content}</p>
                            </div>
                        </div>
                    \`).join("");
                };

                window.addNewPost = function() {
                    const textarea = document.getElementById("composerText");
                    if (!textarea) return;

                    const val = textarea.value.trim();
                    if (!val) {
                        alert("Please type something before posting!");
                        return;
                    }

                    const posts = getPosts();
                    posts.unshift({
                        author: "Student (You)",
                        role: "Student",
                        avatar: "Y",
                        time: "Just now",
                        content: val
                    });

                    savePosts(posts);
                    textarea.value = "";
                    renderFeed();
                };

                // Initial render
                renderFeed();
            });
        `
    },
    {
        id: "assignments",
        dir: "student/classroom/assignments",
        title: "Assignments",
        icon: "fa-file-lines",
        category: "Classroom",
        htmlContent: `
            <div class="assignments-container">
                <!-- Header Stats row -->
                <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-bottom:25px;">
                    <div class="glassmorphism" style="padding:20px; border-radius:10px; text-align:center;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; display:block; margin-bottom:5px; font-weight:600;">Pending Tasks</span>
                        <strong id="pendingCountText" style="font-size:24px; color:var(--accent);">2</strong>
                    </div>
                    <div class="glassmorphism" style="padding:20px; border-radius:10px; text-align:center;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; display:block; margin-bottom:5px; font-weight:600;">Completed Tasks</span>
                        <strong id="completedCountText" style="font-size:24px; color:#10b981;">12</strong>
                    </div>
                    <div class="glassmorphism" style="padding:20px; border-radius:10px; text-align:center;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; display:block; margin-bottom:5px; font-weight:600;">Average Grade</span>
                        <strong style="font-size:24px; color:var(--primary);">9.4 SGPA</strong>
                    </div>
                </div>

                <div class="assignments-card glassmorphism">
                    <!-- Tabs -->
                    <div style="display:flex; gap:15px; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <button class="tab-btn active" id="tabPendingBtn" onclick="switchAssignTab('pending')" style="background:transparent; border:none; color:var(--accent); font-weight:700; font-size:14px; cursor:pointer; padding-bottom:5px; border-bottom:2px solid var(--accent); outline:none;">Pending Assignments</button>
                        <button class="tab-btn" id="tabCompletedBtn" onclick="switchAssignTab('completed')" style="background:transparent; border:none; color:var(--text-secondary); font-weight:600; font-size:14px; cursor:pointer; padding-bottom:5px; outline:none;">Submitted & Graded</button>
                    </div>

                    <!-- Assignments List -->
                    <div id="assignmentsListContainer">
                        <!-- Dynamic list items -->
                    </div>
                </div>

                <!-- Submit Modal Overlay -->
                <div id="submitTaskModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:480px; padding:30px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                            <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);" id="modalTaskTitle">Submit Assignment</h3>
                            <button onclick="closeSubmitModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        
                        <!-- Drag and Drop Area -->
                        <div id="dropzone" style="border:2px dashed var(--border-color); border-radius:8px; padding:35px 20px; text-align:center; cursor:pointer; margin-bottom:20px; transition:border-color 0.3s;" onclick="triggerFileInput()">
                            <i class="fa-solid fa-cloud-arrow-up" style="font-size:36px; color:var(--primary); margin-bottom:12px;"></i>
                            <p style="font-size:13px; font-weight:600; margin:0 0 5px 0; color:var(--text-primary);">Click or Drag & Drop File</p>
                            <span style="font-size:11px; color:var(--text-secondary);">Accepts .zip, .pdf, .ipynb, .docx (Max 15MB)</span>
                            <input type="file" id="modalFileInput" style="display:none;" onchange="handleFileSelect(event)">
                        </div>

                        <!-- Selected File Row -->
                        <div id="selectedFileRow" style="display:none; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); padding:10px 15px; border-radius:6px; margin-bottom:20px;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <i class="fa-solid fa-file-code" style="color:var(--primary); font-size:16px;"></i>
                                <span id="selectedFileName" style="font-size:12px; font-weight:600; color:var(--text-primary);">project.zip</span>
                            </div>
                            <button onclick="clearSelectedFile()" style="background:transparent; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
                        </div>

                        <!-- Comments -->
                        <div style="margin-bottom:20px;">
                            <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Student Private Comments (Optional):</label>
                            <textarea id="modalComments" class="form-input" rows="2" placeholder="Write private comments to your HOD/Teacher..." style="width:100%; padding:10px; border-radius:6px; font-size:12px; resize:none;"></textarea>
                        </div>

                        <!-- Actions -->
                        <div style="display:flex; gap:12px; justify-content:flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="closeSubmitModal()">Cancel</button>
                            <button class="btn btn-primary btn-sm" id="confirmSubmitBtn" onclick="confirmSubmitTask()">Hand In Task</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .assignments-card {
                padding: 30px;
            }
            .tab-btn {
                transition: color 0.3s, border-bottom-color 0.3s;
            }
            .tab-btn:hover {
                color: var(--primary) !important;
            }
            .assign-card-item {
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .assign-card-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultAssignments = [
                    {
                        id: "nn_backprop",
                        title: "Assignment 4: Backpropagation Algorithm Implementation",
                        subject: "Neural Networks & Deep Learning",
                        points: 50,
                        dueDate: "Oct 10, 2026 (11:59 PM)",
                        isOverdue: true,
                        status: "pending"
                    },
                    {
                        id: "vlsi_cmos",
                        title: "VLSI Simulation Lab 2: CMOS Inverter Design",
                        subject: "Embedded VLSI Design",
                        points: 20,
                        dueDate: "Oct 15, 2026 (04:00 PM)",
                        isOverdue: false,
                        status: "pending"
                    },
                    {
                        id: "db_tuning",
                        title: "Assignment 3: Indexing and SQL Performance Tuning",
                        subject: "Database Systems & Tuning",
                        points: 30,
                        dueDate: "Sep 28, 2026 (11:59 PM)",
                        isOverdue: false,
                        status: "completed",
                        grade: "28 / 30"
                    },
                    {
                        id: "nn_mlp",
                        title: "Assignment 2: Multi-Layer Perceptron from Scratch",
                        subject: "Neural Networks & Deep Learning",
                        points: 40,
                        dueDate: "Sep 15, 2026 (11:59 PM)",
                        isOverdue: false,
                        status: "completed",
                        grade: "38 / 40"
                    }
                ];

                let activeTab = "pending";
                let currentSubmitId = null;
                let selectedFile = null;

                function getAssignments() {
                    const saved = localStorage.getItem("classroom_assignments");
                    if (saved) return JSON.parse(saved);
                    return defaultAssignments;
                }

                function saveAssignments(list) {
                    localStorage.setItem("classroom_assignments", JSON.stringify(list));
                }

                window.switchAssignTab = function(tab) {
                    activeTab = tab;
                    
                    const tabPendingBtn = document.getElementById("tabPendingBtn");
                    const tabCompletedBtn = document.getElementById("tabCompletedBtn");

                    if (tabPendingBtn && tabCompletedBtn) {
                        if (tab === "pending") {
                            tabPendingBtn.style.color = "var(--accent)";
                            tabPendingBtn.style.borderBottom = "2px solid var(--accent)";
                            tabCompletedBtn.style.color = "var(--text-secondary)";
                            tabCompletedBtn.style.borderBottom = "none";
                        } else {
                            tabCompletedBtn.style.color = "var(--accent)";
                            tabCompletedBtn.style.borderBottom = "2px solid var(--accent)";
                            tabPendingBtn.style.color = "var(--text-secondary)";
                            tabPendingBtn.style.borderBottom = "none";
                        }
                    }
                    renderList();
                };

                window.renderList = function() {
                    const container = document.getElementById("assignmentsListContainer");
                    const pendingCountText = document.getElementById("pendingCountText");
                    const completedCountText = document.getElementById("completedCountText");
                    if (!container) return;

                    const list = getAssignments();
                    const filtered = list.filter(item => item.status === activeTab);

                    const pendCount = list.filter(i => i.status === "pending").length;
                    const compCount = list.filter(i => i.status === "completed").length;
                    if (pendingCountText) pendingCountText.textContent = pendCount;
                    if (completedCountText) completedCountText.textContent = compCount;

                    if (filtered.length === 0) {
                        container.innerHTML = \`<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-folder-open" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No assignments found in this tab.</div>\`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => \`
                        <div class="assign-card-item" style="display:flex; justify-content:space-between; align-items:center; padding: 20px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); margin-bottom:15px;">
                            <div class="details">
                                <strong style="font-size:14px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:4px;">\${item.title}</strong>
                                <p style="font-size:12px; color:var(--text-secondary); margin:0 0 6px 0;">Subject: \${item.subject} • Max Points: \${item.points}</p>
                                <span class="due \${item.isOverdue && item.status === 'pending' ? 'text-danger' : ''}" style="font-size:11px; font-weight:600;">
                                    \${item.status === 'pending' ? 'Due Date: ' + item.dueDate : 'Graded: <strong style="color:var(--accent);">' + (item.grade || 'Submitted (Awaiting evaluation)') + '</strong>'}
                                </span>
                            </div>
                            <div>
                                \${item.status === 'pending' ? 
                                    \`<button class="btn btn-primary btn-sm" onclick="openSubmitModal('\${item.id}', '\${item.title.replace(/'/g, "\\\\'")}')" style="height:32px; font-size:11px; gap:5px;"><i class="fa-solid fa-cloud-arrow-up"></i> Submit Task</button>\` : 
                                    \`<span style="color:#10b981; font-weight:700; font-size:12px; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-circle-check"></i> Handed In</span>\`
                                }
                            </div>
                        </div>
                    \`).join("");
                };

                window.openSubmitModal = function(id, title) {
                    currentSubmitId = id;
                    const modal = document.getElementById("submitTaskModal");
                    const titleText = document.getElementById("modalTaskTitle");
                    
                    if (modal && titleText) {
                        titleText.textContent = "Submit: " + title;
                        modal.style.display = "flex";
                    }
                };

                window.closeSubmitModal = function() {
                    const modal = document.getElementById("submitTaskModal");
                    if (modal) {
                        modal.style.display = "none";
                    }
                    clearSelectedFile();
                    const commentsText = document.getElementById("modalComments");
                    if (commentsText) commentsText.value = "";
                };

                window.triggerFileInput = function() {
                    const fileInput = document.getElementById("modalFileInput");
                    if (fileInput) fileInput.click();
                };

                window.handleFileSelect = function(e) {
                    const files = e.target.files;
                    if (files.length > 0) {
                        selectedFile = files[0];
                        const row = document.getElementById("selectedFileRow");
                        const nameSpan = document.getElementById("selectedFileName");
                        const dropzone = document.getElementById("dropzone");

                        if (row && nameSpan && dropzone) {
                            nameSpan.textContent = selectedFile.name + " (" + (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB)";
                            row.style.display = "flex";
                            dropzone.style.borderColor = "var(--primary)";
                        }
                    }
                };

                window.clearSelectedFile = function() {
                    selectedFile = null;
                    const row = document.getElementById("selectedFileRow");
                    const fileInput = document.getElementById("modalFileInput");
                    const dropzone = document.getElementById("dropzone");

                    if (row && fileInput && dropzone) {
                        row.style.display = "none";
                        fileInput.value = "";
                        dropzone.style.borderColor = "var(--border-color)";
                    }
                };

                window.confirmSubmitTask = function() {
                    if (!selectedFile) {
                        alert("Please select a file to submit!");
                        return;
                    }

                    const confirmBtn = document.getElementById("confirmSubmitBtn");
                    if (confirmBtn) {
                        confirmBtn.disabled = true;
                        confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';
                    }

                    setTimeout(() => {
                        const list = getAssignments();
                        const match = list.find(item => item.id === currentSubmitId);
                        if (match) {
                            match.status = "completed";
                            match.grade = "Awaiting Evaluation";
                            saveAssignments(list);
                        }

                        if (confirmBtn) {
                            confirmBtn.disabled = false;
                            confirmBtn.innerHTML = "Hand In Task";
                        }

                        closeSubmitModal();
                        renderList();
                        alert("Assignment submitted successfully!");
                    }, 1500);
                };

                // Initial render
                renderList();
            });
        `
    },
    {
        id: "study-materials",
        dir: "student/classroom/study-materials",
        title: "Study Materials",
        icon: "fa-book-open-reader",
        category: "Classroom",
        htmlContent: `
            <div class="materials-container">
                <!-- Search & Filters -->
                <div class="glassmorphism" style="padding: 20px; border-radius:10px; margin-bottom: 25px; display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap;">
                    <div style="display:flex; gap:10px; align-items:center; flex:1; min-width:280px; position:relative;">
                        <i class="fa-solid fa-magnifying-glass" style="color:var(--text-secondary); margin-left: 10px; position:absolute; left: 5px;"></i>
                        <input type="text" id="materialsSearch" placeholder="Search handouts, slide decks, reference books..." oninput="filterMaterials()" style="padding-left:35px; width:100%; height:38px; border-radius:8px; font-size:13px;" class="form-input">
                    </div>
                    
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <button class="filter-btn active" onclick="setSubjectFilter('all')" style="height:36px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--primary); color:#fff; border:none; outline:none;">All Courses</button>
                        <button class="filter-btn" onclick="setSubjectFilter('nn')" style="height:36px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Neural Networks</button>
                        <button class="filter-btn" onclick="setSubjectFilter('vlsi')" style="height:36px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Embedded VLSI</button>
                        <button class="filter-btn" onclick="setSubjectFilter('db')" style="height:36px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Database Systems</button>
                    </div>
                </div>

                <!-- Reference Materials Card -->
                <div class="materials-card glassmorphism">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-book-open-reader"></i> Course Syllabus & Reference Materials</h3>
                        <span style="font-size:11px; color:var(--text-secondary);">Fall Electives • 2026</span>
                    </div>

                    <div id="materialsListContainer">
                        <!-- Dynamic materials loaded here -->
                    </div>
                </div>

                <!-- PDF Preview Modal -->
                <div id="materialPreviewModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:680px; height:85vh; padding:25px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary); display:flex; flex-direction:column; justify-content:space-between;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <i class="fa-solid fa-file-pdf" style="color:#ef4444; font-size:18px;"></i>
                                <h3 style="margin:0; font-size:15px; font-weight:700; color:var(--text-primary);" id="previewModalTitle">Document Preview</h3>
                            </div>
                            <button onclick="closePreviewModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>

                        <!-- Mock Canvas PDF view -->
                        <div style="flex:1; background:rgba(0,0,0,0.2); border:1px solid var(--border-color); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-direction:column; position:relative; overflow:hidden; padding:20px;" id="previewCanvas">
                            <div id="canvasLoader" style="text-align:center;">
                                <i class="fa-solid fa-circle-notch fa-spin" style="font-size:32px; color:var(--primary); margin-bottom:10px;"></i>
                                <p style="font-size:12px; color:var(--text-secondary);">Loading Document Canvas...</p>
                            </div>
                            <div id="canvasContent" style="display:none; text-align:center; width:100%;">
                                <div style="width:100%; max-width:400px; height:260px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px; margin:0 auto 15px auto; display:flex; align-items:center; justify-content:center;">
                                    <i class="fa-regular fa-image" style="font-size:48px; color:var(--text-tertiary);"></i>
                                </div>
                                <h4 style="font-size:14px; margin:0 0 5px 0; color:var(--text-primary);">Interactive PDF Handout Simulator</h4>
                                <p style="font-size:11px; color:var(--text-secondary); margin:0;">Page 1 of 12 • Reference syllabus criteria active</p>
                            </div>
                        </div>

                        <!-- Footer details and download -->
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; border-top:1px solid var(--border-color); padding-top:15px;">
                            <span id="previewModalDetails" style="font-size:11px; color:var(--text-secondary);">Uploaded by Prof. S. Sharma • 2.4 MB</span>
                            <div style="display:flex; gap:10px;">
                                <button class="btn btn-secondary btn-sm" onclick="closePreviewModal()">Close</button>
                                <button class="btn btn-primary btn-sm" id="previewModalDownloadBtn" onclick="downloadPreviewDocument()" style="gap:6px;"><i class="fa-solid fa-download"></i> Download PDF</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .materials-card {
                padding: 30px;
            }
            .filter-btn {
                transition: all 0.3s;
            }
            .material-row-item {
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .material-row-item:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const studyMaterials = [
                    {
                        id: "mat_cnn",
                        title: "Week 5: Convolutional Networks Architectures (LeNet-5, ResNet)",
                        subject: "nn",
                        subjectName: "Neural Networks",
                        uploader: "Prof. S. Sharma",
                        time: "2 days ago",
                        size: "4.2 MB",
                        format: "PDF Format"
                    },
                    {
                        id: "mat_fabrication",
                        title: "CMOS Fabrication Processes Handout",
                        subject: "vlsi",
                        subjectName: "Embedded VLSI Design",
                        uploader: "Dr. A. Verma",
                        time: "5 days ago",
                        size: "2.8 MB",
                        format: "PDF Format"
                    },
                    {
                        id: "mat_backprop",
                        title: "Multi-Layer Backpropagation Mathematical Derivations",
                        subject: "nn",
                        subjectName: "Neural Networks",
                        uploader: "Prof. S. Sharma",
                        time: "1 week ago",
                        size: "1.5 MB",
                        format: "PDF Format"
                    },
                    {
                        id: "mat_indexing",
                        title: "B-Tree & Hash Indexing Performance Guidelines",
                        subject: "db",
                        subjectName: "Database Systems",
                        uploader: "Dr. K. Sen",
                        time: "2 weeks ago",
                        size: "3.4 MB",
                        format: "PDF Format"
                    }
                ];

                let currentSubject = "all";
                let activePreviewId = null;

                window.setSubjectFilter = function(subj) {
                    currentSubject = subj;
                    const buttons = document.querySelectorAll(".filter-btn");
                    buttons.forEach(btn => {
                        const onclickStr = btn.getAttribute("onclick");
                        if (onclickStr && onclickStr.includes("'" + subj + "'")) {
                            btn.style.background = "var(--primary)";
                            btn.style.color = "#fff";
                            btn.style.borderColor = "var(--primary)";
                        } else {
                            btn.style.background = "var(--bg-tertiary)";
                            btn.style.color = "var(--text-secondary)";
                            btn.style.borderColor = "var(--border-color)";
                        }
                    });
                    filterMaterials();
                };

                window.filterMaterials = function() {
                    const searchVal = document.getElementById("materialsSearch").value.toLowerCase();
                    const container = document.getElementById("materialsListContainer");
                    if (!container) return;

                    const filtered = studyMaterials.filter(item => {
                        const matchesSubject = (currentSubject === "all" || item.subject === currentSubject);
                        const matchesSearch = item.title.toLowerCase().includes(searchVal) || item.uploader.toLowerCase().includes(searchVal);
                        return matchesSubject && matchesSearch;
                    });

                    if (filtered.length === 0) {
                        container.innerHTML = \`<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-folder-open" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No study materials matched your filters.</div>\`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => \`
                        <div class="material-row-item" style="display:flex; align-items:center; padding:16px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); gap:20px; margin-bottom:12px;">
                            <i class="fa-solid fa-file-pdf" style="color:#ef4444; font-size:28px;"></i>
                            <div class="details" style="flex-grow:1;">
                                <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
                                    <strong style="font-size:14px; color:var(--text-primary); margin:0;">\${item.title}</strong>
                                    <span style="font-size:9px; background:rgba(99,102,241,0.12); color:var(--primary); padding:2px 8px; border-radius:10px; font-weight:700;">\${item.subjectName}</span>
                                </div>
                                <span style="font-size:11px; color:var(--text-secondary);">Uploaded by \${item.uploader} • \${item.time} • \${item.size} • \${item.format}</span>
                            </div>
                            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                <button class="btn btn-secondary btn-sm" onclick="openPreviewModal('\${item.id}', '\${item.title.replace(/'/g, "\\\\'")}', '\${item.uploader}', '\${item.size}')" style="height:32px; font-size:11px; gap:5px;"><i class="fa-solid fa-eye"></i> Preview</button>
                                <button class="btn btn-primary btn-sm" onclick="downloadMaterial('\${item.title.replace(/'/g, "\\\\'")}')" style="height:32px; font-size:11px; gap:5px;"><i class="fa-solid fa-download"></i> Download</button>
                            </div>
                        </div>
                    \`).join("");
                };

                window.openPreviewModal = function(id, title, uploader, size) {
                    activePreviewId = id;
                    const modal = document.getElementById("materialPreviewModal");
                    const titleText = document.getElementById("previewModalTitle");
                    const detailsSpan = document.getElementById("previewModalDetails");
                    
                    const loader = document.getElementById("canvasLoader");
                    const content = document.getElementById("canvasContent");

                    if (modal && titleText && detailsSpan && loader && content) {
                        titleText.textContent = "Preview: " + title;
                        detailsSpan.textContent = "Uploaded by " + uploader + " • " + size;
                        
                        modal.style.display = "flex";
                        loader.style.display = "block";
                        content.style.display = "none";

                        setTimeout(() => {
                            loader.style.display = "none";
                            content.style.display = "block";
                        }, 1000);
                    }
                };

                window.closePreviewModal = function() {
                    const modal = document.getElementById("materialPreviewModal");
                    if (modal) {
                        modal.style.display = "none";
                    }
                };

                window.downloadMaterial = function(title) {
                    alert("Initiated download for syllabus slide deck: " + title + ".pdf");
                };

                window.downloadPreviewDocument = function() {
                    const match = studyMaterials.find(item => item.id === activePreviewId);
                    if (match) {
                        downloadMaterial(match.title);
                    }
                };

                // Initial load
                filterMaterials();
            });
        `
    },
    {
        id: "quiz",
        dir: "student/classroom/quiz",
        title: "Quizzes",
        icon: "fa-lightbulb",
        category: "Classroom",
        htmlContent: `
            <div class="quizzes-container">
                <!-- Warning Notice Banner -->
                <div class="glassmorphism" style="padding:20px; border-radius:10px; margin-bottom:25px; border-left:4px solid var(--accent); background:rgba(236,72,153,0.05);">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <i class="fa-solid fa-shield-halved" style="color:var(--accent); font-size:24px;"></i>
                        <div>
                            <strong style="font-size:14px; color:var(--text-primary); display:block; margin-bottom:4px;">Official Proctoring & Browser Lockdown Rules</strong>
                            <p style="margin:0; font-size:12px; color:var(--text-secondary); line-height:1.4;">Webcam access is strictly audit-monitored. Switching tabs or minimizing browser windows will result in auto-submission and flag academic integrity warnings.</p>
                        </div>
                    </div>
                </div>

                <!-- Main Quiz Board -->
                <div class="quiz-card glassmorphism">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-list-check"></i> Active & Past Quizzes</h3>
                        <span style="font-size:11px; color:var(--text-secondary);">2 Available Sessions</span>
                    </div>

                    <div id="quizListContainer">
                        <!-- Dynamic quizzes loaded here -->
                    </div>
                </div>

                <!-- Proctoring Exam Overlay Screen -->
                <div id="proctoredQuizModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:var(--bg-primary); z-index:1000; padding:40px; box-sizing:border-box;">
                    <div class="proctor-grid">
                        
                        <!-- Left Panel: Question Feed -->
                        <div class="glassmorphism proctor-left">
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:25px;">
                                    <span style="font-size:12px; color:var(--text-secondary);" id="questionProgressText">Question 1 of 5</span>
                                    <span style="font-size:12px; background:rgba(239,68,68,0.15); color:#ef4444; padding:3px 10px; border-radius:20px; font-weight:700;"><i class="fa-solid fa-clock"></i> Time Left: <span id="timerText">05:00</span></span>
                                </div>

                                <div id="questionContainer">
                                    <h4 style="font-size:16px; font-weight:700; color:var(--text-primary); margin-bottom:20px; line-height:1.4;" id="quizQuestionText">What is the derivative of the ReLU activation function for x > 0?</h4>
                                    <div style="display:flex; flex-direction:column; gap:12px;" id="quizOptionsContainer">
                                        <!-- Options load dynamically -->
                                    </div>
                                </div>
                            </div>

                            <div style="display:flex; justify-content:space-between; border-top:1px solid var(--border-color); padding-top:20px; margin-top:20px;">
                                <span style="font-size:11px; color:var(--text-secondary);"><i class="fa-solid fa-circle-info"></i> Answers are locked upon clicking 'Next Question'.</span>
                                <button class="btn btn-primary btn-sm" id="nextQuestionBtn" onclick="submitAnswerAndNext()">Next Question</button>
                            </div>
                        </div>

                        <!-- Right Panel: Proctoring Webcam Monitor -->
                        <div class="glassmorphism proctor-right">
                            <div>
                                <h4 style="margin:0 0 15px 0; font-size:13px; font-weight:700; color:#ef4444; display:flex; align-items:center; gap:8px;"><span class="proctor-blink"></span> LIVE PROCTORING MONITOR</h4>
                                
                                <!-- Webcam Mock view -->
                                <div class="webcam-view">
                                    <!-- Scanning Box -->
                                    <div class="webcam-scan"></div>
                                    <i class="fa-solid fa-user-shield" style="font-size:64px; color:rgba(255,255,255,0.15);"></i>
                                    <span style="position:absolute; bottom:10px; left:10px; font-size:9px; background:rgba(0,0,0,0.6); color:#fff; padding:2px 6px; border-radius:4px; font-weight:600; text-transform:uppercase;">Eye tracking active</span>
                                </div>

                                <div style="margin-top:20px; font-size:11px; color:var(--text-secondary); line-height:1.6; display:flex; flex-direction:column; gap:8px;">
                                    <span style="color:#ef4444; font-weight:700;"><i class="fa-solid fa-video"></i> Web-Camera: CONNECTED</span>
                                    <span><i class="fa-solid fa-microphone"></i> Mic Input Level: Good</span>
                                    <span><i class="fa-solid fa-window-restore"></i> Window Focus: LOCKED</span>
                                </div>
                            </div>

                            <button class="btn btn-secondary btn-sm" onclick="abortQuizExam()" style="width:100%; color:#ef4444; border-color:#ef4444; margin-top:20px;"><i class="fa-solid fa-person-running"></i> Abort & Submit 0</button>
                        </div>

                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .quiz-card {
                padding: 30px;
            }
            .proctor-grid {
                display: grid;
                grid-template-columns: 1fr 340px;
                gap: 30px;
                height: 100%;
            }
            @media (max-width: 992px) {
                .proctor-grid {
                    grid-template-columns: 1fr;
                }
            }
            .proctor-left, .proctor-right {
                padding: 30px;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
                box-sizing: border-box;
                border: 1px solid var(--border-color);
            }
            .proctor-blink {
                width: 8px;
                height: 8px;
                background: #ef4444;
                border-radius: 50%;
                display: inline-block;
                animation: blinker 1s linear infinite;
            }
            @keyframes blinker {
                50% { opacity: 0; }
            }
            .webcam-view {
                width: 100%;
                height: 180px;
                background: #0d0e12;
                border-radius: 8px;
                overflow: hidden;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid var(--border-color);
            }
            .webcam-scan {
                position: absolute;
                width: 120px;
                height: 120px;
                border: 2px solid #ef4444;
                border-radius: 10px;
                animation: scanner 3s ease-in-out infinite alternate;
            }
            @keyframes scanner {
                0% { transform: translateY(-10px); }
                100% { transform: translateY(10px); }
            }
            .quiz-option-label {
                transition: background 0.2s, border-color 0.2s;
            }
            .quiz-option-label:hover {
                background: rgba(255,255,255,0.03) !important;
                border-color: var(--primary) !important;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const quizSessions = [
                    {
                        id: "quiz_act_functions",
                        title: "Short Quiz 2: Activation Functions & Gradients",
                        subject: "Neural Networks & Deep Learning",
                        duration: "5 Mins",
                        questionsCount: 3,
                        warnings: "Webcam required. 1 attempt allowed.",
                        status: "pending",
                        score: null
                    },
                    {
                        id: "quiz_intro_neurons",
                        title: "Short Quiz 1: Introduction to Neurons & Logical Gates",
                        subject: "Neural Networks & Deep Learning",
                        duration: "10 Mins",
                        questionsCount: 10,
                        warnings: "Completed Session",
                        status: "completed",
                        score: "9 / 10"
                    }
                ];

                const quizQuestions = [
                    {
                        q: "What is the derivative of the ReLU activation function for x > 0?",
                        options: ["f'(x) = 0", "f'(x) = 1", "f'(x) = x", "f'(x) = -1"],
                        correct: 1
                    },
                    {
                        q: "Which activation function outputs values strictly in the range [0, 1]?",
                        options: ["tanh", "ReLU", "Sigmoid", "LeakyReLU"],
                        correct: 2
                    },
                    {
                        q: "What issue is Leaky ReLU specifically designed to prevent?",
                        options: ["Overfitting", "Vanishing Gradient", "Dying ReLU Problem", "Exploding Gradient"],
                        correct: 2
                    }
                ];

                let currentQuestionIndex = 0;
                let userAnswers = [];
                let examTimer = null;
                let secondsLeft = 300;

                function getQuizzes() {
                    const saved = localStorage.getItem("classroom_quizzes");
                    if (saved) return JSON.parse(saved);
                    return quizSessions;
                }

                function saveQuizzes(list) {
                    localStorage.setItem("classroom_quizzes", JSON.stringify(list));
                }

                window.renderQuizzesList = function() {
                    const container = document.getElementById("quizListContainer");
                    if (!container) return;

                    const list = getQuizzes();
                    container.innerHTML = list.map(item => \`
                        <div class="quiz-row-item" style="display:flex; justify-content:space-between; align-items:center; padding:20px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); margin-bottom:15px;">
                            <div class="details">
                                <strong style="font-size:14px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:4px;">\${item.title}</strong>
                                <p style="font-size:12px; color:var(--text-secondary); margin:0 0 6px 0;">Subject: \${item.subject} • Duration: \${item.duration} • Questions: \${item.questionsCount}</p>
                                <span class="warning-text" style="font-size:11px; font-weight:600; color:\${item.status === 'pending' ? 'var(--accent)' : '#10b981'};">
                                    \${item.status === 'pending' ? '<i class="fa-solid fa-triangle-exclamation"></i> ' + item.warnings : '<i class="fa-solid fa-circle-check"></i> Grade: <strong>' + item.score + '</strong>'}
                                </span>
                            </div>
                            <div>
                                \${item.status === 'pending' ? 
                                    \`<button class="btn btn-primary btn-sm" onclick="startQuizExam('\${item.id}')" style="height:32px; font-size:11px;">Start Quiz</button>\` : 
                                    \`<span style="color:#10b981; font-weight:700; font-size:12px;"><i class="fa-solid fa-circle-check"></i> Completed</span>\`
                                }
                            </div>
                        </div>
                    \`).join("");
                };

                window.startQuizExam = function(id) {
                    const modal = document.getElementById("proctoredQuizModal");
                    if (!modal) return;

                    currentQuestionIndex = 0;
                    userAnswers = [];
                    secondsLeft = 300;
                    modal.style.display = "block";

                    loadQuestion();
                    startExamTimer();
                };

                function loadQuestion() {
                    const currentQ = quizQuestions[currentQuestionIndex];
                    const progressText = document.getElementById("questionProgressText");
                    const questionText = document.getElementById("quizQuestionText");
                    const optionsContainer = document.getElementById("quizOptionsContainer");
                    const nextBtn = document.getElementById("nextQuestionBtn");

                    if (progressText) progressText.textContent = "Question " + (currentQuestionIndex + 1) + " of " + quizQuestions.length;
                    if (questionText) questionText.textContent = currentQ.q;
                    
                    if (nextBtn) {
                        nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Submit Quiz Exam" : "Next Question";
                    }

                    if (optionsContainer) {
                        optionsContainer.innerHTML = currentQ.options.map((opt, i) => \`
                            <label style="display:flex; align-items:center; gap:10px; padding:15px; border:1px solid var(--border-color); border-radius:8px; cursor:pointer; font-size:13px; background:rgba(255,255,255,0.01);" class="quiz-option-label">
                                <input type="radio" name="quiz_opt" value="\${i}" style="margin:0;">
                                <span>\${opt}</span>
                            </label>
                        \`).join("");
                    }
                }

                window.submitAnswerAndNext = function() {
                    const checked = document.querySelector('input[name="quiz_opt"]:checked');
                    if (!checked) {
                        alert("Please select an answer option to proceed!");
                        return;
                    }

                    userAnswers.push(parseInt(checked.value));

                    if (currentQuestionIndex < quizQuestions.length - 1) {
                        currentQuestionIndex++;
                        loadQuestion();
                    } else {
                        finishQuizExam();
                    }
                };

                function startExamTimer() {
                    if (examTimer) clearInterval(examTimer);
                    
                    const timerText = document.getElementById("timerText");
                    examTimer = setInterval(() => {
                        secondsLeft--;
                        let mins = Math.floor(secondsLeft / 60);
                        let secs = secondsLeft % 60;
                        if (timerText) timerText.textContent = mins.toString().padStart(2, '0') + ":" + secs.toString().padStart(2, '0');

                        if (secondsLeft <= 0) {
                            clearInterval(examTimer);
                            alert("Time is up! Your quiz has been auto-submitted.");
                            finishQuizExam();
                        }
                    }, 1000);
                }

                function finishQuizExam() {
                    clearInterval(examTimer);
                    const modal = document.getElementById("proctoredQuizModal");
                    if (modal) modal.style.display = "none";

                    let correctCount = 0;
                    userAnswers.forEach((ans, i) => {
                        if (ans === quizQuestions[i].correct) correctCount++;
                    });

                    const list = getQuizzes();
                    const match = list.find(item => item.id === "quiz_act_functions");
                    if (match) {
                        match.status = "completed";
                        match.score = correctCount + " / " + quizQuestions.length;
                        saveQuizzes(list);
                    }

                    renderQuizzesList();
                    alert("Quiz submitted successfully! Your score: " + correctCount + " / " + quizQuestions.length);
                }

                window.abortQuizExam = function() {
                    if (confirm("Are you sure you want to abort the exam? You will receive a score of 0.")) {
                        clearInterval(examTimer);
                        const modal = document.getElementById("proctoredQuizModal");
                        if (modal) modal.style.display = "none";

                        const list = getQuizzes();
                        const match = list.find(item => item.id === "quiz_act_functions");
                        if (match) {
                            match.status = "completed";
                            match.score = "0 / " + quizQuestions.length;
                            saveQuizzes(list);
                        }

                        renderQuizzesList();
                        alert("Exam aborted. Score recorded: 0");
                    }
                };

                // Initial load
                renderQuizzesList();
            });
        `
    },
    {
        id: "discussion",
        dir: "student/classroom/discussion",
        title: "Discussions",
        icon: "fa-comments",
        category: "Classroom",
        htmlContent: `
            <div class="forum-container">
                <!-- Main Header Controls -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:15px;">
                    <div>
                        <h2 style="margin:0; font-size:18px; font-weight:800; color:var(--text-primary);"><i class="fa-solid fa-comments"></i> Classroom Discussion Forum</h2>
                        <p style="margin:5px 0 0 0; font-size:12px; color:var(--text-secondary);">Ask questions, share resources, and discuss topics with classmates.</p>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="openNewThreadModal()" style="gap:6px; height:36px;"><i class="fa-solid fa-plus"></i> Start New Topic</button>
                </div>

                <!-- Forum Layout Grid -->
                <div class="forum-grid">
                    <!-- Sidebar -->
                    <div style="display:flex; flex-direction:column; gap:20px;">
                        <div class="forum-card glassmorphism">
                            <h4 style="margin:0 0 10px 0; font-size:12px; color:var(--accent); font-weight:700; text-transform:uppercase;">Discussion Channels</h4>
                            <div style="display:flex; flex-direction:column; gap:8px;">
                                <button class="chan-btn active" onclick="filterForum('all')"># all_topics</button>
                                <button class="chan-btn" onclick="filterForum('assignments')"># assignments</button>
                                <button class="chan-btn" onclick="filterForum('projects')"># capstone_projects</button>
                                <button class="chan-btn" onclick="filterForum('general')"># general_qa</button>
                            </div>
                        </div>

                        <div class="forum-card glassmorphism" style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                            <strong>Forum Guidelines:</strong>
                            <p style="margin:5px 0 0 0;">Please keep discussions academic, respectful, and related to syllabus topics. Do not share direct exam answers.</p>
                        </div>
                    </div>

                    <!-- Threads Feed -->
                    <div id="forumThreadsContainer" style="display:flex; flex-direction:column; gap:16px;">
                        <!-- Dynamic forum posts loaded here -->
                    </div>
                </div>

                <!-- New Thread Modal -->
                <div id="newThreadModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:520px; padding:30px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                            <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);">Create New Topic Thread</h3>
                            <button onclick="closeNewThreadModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:20px;">
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Topic Title:</label>
                                <input type="text" id="newThreadTitle" class="form-input" placeholder="e.g. Backpropagation calculus doubt" style="width:100%; padding:10px; border-radius:6px; font-size:13px;">
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Channel:</label>
                                <select id="newThreadChannel" class="form-input" style="width:100%; padding:10px; border-radius:6px; font-size:13px; background:var(--bg-secondary);">
                                    <option value="assignments">assignments</option>
                                    <option value="projects">capstone_projects</option>
                                    <option value="general">general_qa</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Topic Body / Query:</label>
                                <textarea id="newThreadBody" class="form-input" rows="4" placeholder="Explain your question or post references..." style="width:100%; padding:10px; border-radius:6px; font-size:12px; resize:none;"></textarea>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; justify-content:flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="closeNewThreadModal()">Cancel</button>
                            <button class="btn btn-primary btn-sm" onclick="postNewThread()">Post Topic</button>
                        </div>
                    </div>
                </div>

                <!-- Read Thread & Replies Modal -->
                <div id="threadRepliesModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:680px; height:85vh; padding:30px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary); display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                                <span style="font-size:11px; background:rgba(99,102,241,0.12); color:var(--primary); padding:2px 8px; border-radius:10px; font-weight:700;" id="replyModalChannel"># assignments</span>
                                <button onclick="closeRepliesModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                            <h3 style="margin:0 0 10px 0; font-size:16px; font-weight:800; color:var(--text-primary);" id="replyModalTitle">Topic Title</h3>
                            <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:15px; border-radius:8px; margin-bottom:20px;" id="replyModalBody">Topic Body Text</p>
                        </div>

                        <!-- Replies scroll area -->
                        <div style="flex:1; overflow-y:auto; padding-right:10px; display:flex; flex-direction:column; gap:15px; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:15px;" id="repliesFeedContainer">
                            <!-- Dynamic replies -->
                        </div>

                        <!-- Write reply block -->
                        <div style="display:flex; gap:12px; align-items:start;">
                            <textarea id="newReplyText" class="form-input" rows="2" placeholder="Write a public reply..." style="flex:1; padding:10px; border-radius:8px; font-size:13px; resize:none;"></textarea>
                            <button class="btn btn-primary btn-sm" onclick="postNewReply()" style="height:42px;">Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .forum-grid {
                display: grid;
                grid-template-columns: 240px 1fr;
                gap: 25px;
                align-items: start;
            }
            @media (max-width: 768px) {
                .forum-grid {
                    grid-template-columns: 1fr;
                }
            }
            .forum-card {
                padding: 15px;
                border-radius: 8px;
            }
            .chan-btn {
                background: transparent;
                border: none;
                color: var(--text-secondary);
                text-align: left;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s, color 0.2s;
                outline: none;
            }
            .chan-btn:hover {
                background: rgba(255,255,255,0.02);
                color: var(--primary);
            }
            .chan-btn.active {
                background: rgba(99,102,241,0.1);
                color: var(--primary);
            }
            .forum-thread {
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .forum-thread:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultThreads = [
                    {
                        id: "th_pytorch_vs_tf",
                        title: "PyTorch vs TensorFlow for Neural Nets Project",
                        channel: "assignments",
                        author: "Tanya Verma",
                        time: "Posted 4 hours ago",
                        body: "Hey guys, are we allowed to use TensorFlow Keras models for Assignment 4, or is PyTorch mandatory? The HOD's lecture slides only showed PyTorch implementations.",
                        replies: [
                            { author: "Prof. S. Sharma", avatar: "S", role: "Instructor", content: "PyTorch is highly recommended as the grading scripts are configured to test PyTorch tensor outputs. If you use TensorFlow, you will need to map weights manually." },
                            { author: "Rohan Das", avatar: "R", role: "Student", content: "I have already built the backprop code in PyTorch. Let me know if you need helper templates, Tanya!" }
                        ]
                    },
                    {
                        id: "th_cmos_inverter",
                        title: "CMOS Inverter propagation delay simulation details",
                        channel: "projects",
                        author: "Aman Gupta",
                        time: "Posted Yesterday",
                        body: "In VLSI simulation 2, are we using 180nm or 45nm technology nodes for PMOS/NMOS sizing? The lab document doesn't state it explicitly.",
                        replies: [
                            { author: "Dr. A. Verma", avatar: "V", role: "Instructor", content: "Use 180nm node parameters for the CMOS Inverter sizing calculations. The model files are in the laboratory shared folder." }
                        ]
                    }
                ];

                let activeFilter = "all";
                let currentThreadId = null;

                function getThreads() {
                    const saved = localStorage.getItem("forum_threads");
                    if (saved) return JSON.parse(saved);
                    return defaultThreads;
                }

                function saveThreads(list) {
                    localStorage.setItem("forum_threads", JSON.stringify(list));
                }

                window.filterForum = function(chan) {
                    activeFilter = chan;
                    const buttons = document.querySelectorAll(".chan-btn");
                    buttons.forEach(btn => {
                        const text = btn.textContent;
                        if (text.includes(chan)) {
                            btn.classList.add("active");
                        } else {
                            btn.classList.remove("active");
                        }
                    });
                    renderThreads();
                };

                window.renderThreads = function() {
                    const container = document.getElementById("forumThreadsContainer");
                    if (!container) return;

                    const list = getThreads();
                    const filtered = list.filter(t => activeFilter === "all" || t.channel === activeFilter);

                    if (filtered.length === 0) {
                        container.innerHTML = \`<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-folder-open" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No topic threads found in this channel.</div>\`;
                        return;
                    }

                    container.innerHTML = filtered.map(t => \`
                        <div class="forum-thread glassmorphism" style="padding:20px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:15px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="font-size:9px; background:rgba(99,102,241,0.12); color:var(--primary); padding:2px 8px; border-radius:10px; font-weight:700;"># \${t.channel}</span>
                                    <span style="font-size:11px; color:var(--text-secondary); font-weight:500;">by \${t.author} • \${t.time}</span>
                                </div>
                                <span style="font-size:11px; color:var(--text-tertiary); font-weight:600;"><i class="fa-regular fa-comment"></i> \${t.replies.length} replies</span>
                            </div>
                            <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:var(--text-primary);">\${t.title}</h4>
                            <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin-bottom:15px;">\${t.body}</p>
                            <div style="display:flex; gap:10px;">
                                <button class="btn btn-secondary btn-sm" onclick="openRepliesModal('\${t.id}')">Read & Discuss</button>
                            </div>
                        </div>
                    \`).join("");
                };

                window.openNewThreadModal = function() {
                    const modal = document.getElementById("newThreadModal");
                    if (modal) modal.style.display = "flex";
                };

                window.closeNewThreadModal = function() {
                    const modal = document.getElementById("newThreadModal");
                    if (modal) modal.style.display = "none";
                    document.getElementById("newThreadTitle").value = "";
                    document.getElementById("newThreadBody").value = "";
                };

                window.postNewThread = function() {
                    const titleVal = document.getElementById("newThreadTitle").value.trim();
                    const chanVal = document.getElementById("newThreadChannel").value;
                    const bodyVal = document.getElementById("newThreadBody").value.trim();

                    if (!titleVal || !bodyVal) {
                        alert("Please fill out all fields before posting!");
                        return;
                    }

                    const list = getThreads();
                    list.unshift({
                        id: "th_" + Date.now(),
                        title: titleVal,
                        channel: chanVal,
                        author: "Student (You)",
                        time: "Just now",
                        body: bodyVal,
                        replies: []
                    });

                    saveThreads(list);
                    closeNewThreadModal();
                    renderThreads();
                    alert("Discussion topic posted successfully!");
                };

                window.openRepliesModal = function(id) {
                    currentThreadId = id;
                    const list = getThreads();
                    const match = list.find(t => t.id === id);
                    if (!match) return;

                    const modal = document.getElementById("threadRepliesModal");
                    const chanSpan = document.getElementById("replyModalChannel");
                    const titleText = document.getElementById("replyModalTitle");
                    const bodyText = document.getElementById("replyModalBody");

                    if (modal && chanSpan && titleText && bodyText) {
                        chanSpan.textContent = "# " + match.channel;
                        titleText.textContent = match.title;
                        bodyText.textContent = match.body;
                        modal.style.display = "flex";
                        renderRepliesList(match);
                    }
                };

                function renderRepliesList(thread) {
                    const container = document.getElementById("repliesFeedContainer");
                    if (!container) return;

                    if (thread.replies.length === 0) {
                        container.innerHTML = \`<div style="padding:20px; text-align:center; color:var(--text-secondary); font-size:12px;">No replies yet. Be the first to start the discussion!</div>\`;
                        return;
                    }

                    container.innerHTML = thread.replies.map(r => \`
                        <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:12px; border-radius:6px; margin-bottom:12px;">
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                <div style="width:24px; height:24px; border-radius:50%; background:\${r.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:11px;">\${r.avatar}</div>
                                <strong style="font-size:12px; color:var(--text-primary);">\${r.author}</strong>
                                <span style="font-size:8px; background:\${r.role === 'Instructor' ? 'rgba(236,72,153,0.15)' : 'rgba(99,102,241,0.15)'}; color:\${r.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; padding:1px 6px; border-radius:8px; font-weight:700;">\${r.role}</span>
                            </div>
                            <p style="margin:0; font-size:12px; color:var(--text-secondary); line-height:1.4;">\${r.content}</p>
                        </div>
                    \`).join("");
                }

                window.closeRepliesModal = function() {
                    const modal = document.getElementById("threadRepliesModal");
                    if (modal) modal.style.display = "none";
                    document.getElementById("newReplyText").value = "";
                };

                window.postNewReply = function() {
                    const val = document.getElementById("newReplyText").value.trim();
                    if (!val) {
                        alert("Please type a reply message!");
                        return;
                    }

                    const list = getThreads();
                    const match = list.find(t => t.id === currentThreadId);
                    if (match) {
                        match.replies.push({
                            author: "Student (You)",
                            avatar: "Y",
                            role: "Student",
                            content: val
                        });
                        saveThreads(list);
                        renderRepliesList(match);
                        renderThreads();
                        document.getElementById("newReplyText").value = "";
                    }
                };

                // Initial render
                renderThreads();
            });
        `
    },
    {
        id: "grades",
        dir: "student/classroom/grades",
        title: "Classroom Grades",
        icon: "fa-percent",
        category: "Classroom",
        htmlContent: `
            <div class="grades-container">
                <!-- Header Stats Cards -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:20px; margin-bottom:25px;">
                    <div class="glassmorphism" style="padding:20px; border-radius:10px; border-left:4px solid var(--accent);">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Overall Internal Percentage</span>
                        <h3 style="margin:8px 0 0 0; font-size:24px; font-weight:800; color:var(--text-primary);" id="internalPercentText">92.4%</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:#10b981;"><i class="fa-solid fa-circle-up"></i> Top 5% of Classroom Batch</p>
                    </div>

                    <div class="glassmorphism" style="padding:20px; border-radius:10px; border-left:4px solid var(--primary);">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">CIE Points Accumulated</span>
                        <h3 style="margin:8px 0 0 0; font-size:24px; font-weight:800; color:var(--text-primary);" id="internalPointsText">231 / 250</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Weightage accounted: 60%</p>
                    </div>

                    <div class="glassmorphism" style="padding:20px; border-radius:10px; border-left:4px solid #10b981;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Class Grade Projection</span>
                        <h3 style="margin:8px 0 0 0; font-size:24px; font-weight:800; color:var(--text-primary);">A+ Outstanding</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Continuous Evaluation</p>
                    </div>
                </div>

                <!-- Main Evaluation Board -->
                <div class="grades-card glassmorphism">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px; flex-wrap:wrap; gap:15px;">
                        <div>
                            <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-graduation-cap"></i> Continuous Internal Evaluation (CIE) Breakdown</h3>
                            <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Showing teacher-released evaluation marks for the semester.</p>
                        </div>
                        
                        <div style="display:flex; gap:10px; align-items:center;">
                            <select id="courseGradesFilter" class="form-input" onchange="filterGradesByCourse()" style="height:36px; padding:0 12px; font-size:12px; border-radius:6px; background:var(--bg-secondary); cursor:pointer;">
                                <option value="nn">Neural Networks & Deep Learning</option>
                                <option value="vlsi">Embedded VLSI Design</option>
                            </select>
                            <button class="btn btn-secondary btn-sm" onclick="downloadGradesReport()" style="height:36px; gap:6px;"><i class="fa-solid fa-file-pdf"></i> Download Report</button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="custom-table" style="width:100%;">
                            <thead>
                                <tr>
                                    <th>Evaluation Item</th>
                                    <th>Score Obtained</th>
                                    <th>Max Points</th>
                                    <th>Weightage Factor</th>
                                    <th>Status / Remarks</th>
                                </tr>
                            </thead>
                            <tbody id="gradesTableBody">
                                <!-- Dynamic grades list loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Dynamic Grade Simulator -->
                <div class="glassmorphism" style="padding:25px; border-radius:10px; margin-top:25px;">
                    <h4 style="margin:0 0 10px 0; font-size:14px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-sliders"></i> Dynamic Final Internal Simulator</h4>
                    <p style="margin:0 0 20px 0; font-size:12px; color:var(--text-secondary);">Estimate your target internal score for upcoming evaluation tasks (e.g. End-Sem Internals).</p>
                    
                    <div class="simulator-layout">
                        <div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                                <span style="font-size:12px; color:var(--text-primary); font-weight:600;">Expected Score in upcoming Internal Assessment (Max 50):</span>
                                <strong style="font-size:14px; color:var(--primary);" id="simulatorScoreLabel">45 / 50</strong>
                            </div>
                            <input type="range" min="0" max="50" value="45" id="simulatorRangeInput" oninput="updateGradesSimulation(this.value)" style="width:100%; cursor:pointer;">
                        </div>
                        <div style="text-align:center; padding:15px; border-radius:8px; background:rgba(255,255,255,0.01); border:1px solid var(--border-color); margin-top: 15px;">
                            <span style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Simulated Total</span>
                            <h4 style="font-size:24px; font-weight:800; color:var(--primary); margin:5px 0 0 0;" id="simulatedPercentLabel">93.2%</h4>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .grades-card {
                padding: 30px;
            }
            .simulator-layout {
                display: grid;
                grid-template-columns: 1fr 180px;
                gap: 40px;
                align-items: center;
            }
            @media (max-width: 768px) {
                .simulator-layout {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const gradesData = {
                    nn: [
                        { name: "Assignment 1: Gradient Descent Derivations", score: 48, max: 50, weight: "10%", remarks: "Excellent" },
                        { name: "Assignment 2: Perceptron Networks from Scratch", score: 44, max: 50, weight: "10%", remarks: "Very Good" },
                        { name: "Assignment 3: Convolutional Neural Nets (LeNet)", score: 49, max: 50, weight: "10%", remarks: "Outstanding" },
                        { name: "Internal Theory Examination I (T1)", score: 90, max: 100, weight: "30%", remarks: "A++ Grade" }
                    ],
                    vlsi: [
                        { name: "Assignment 1: Sizing PMOS & NMOS Inverters", score: 42, max: 50, weight: "10%", remarks: "Very Good" },
                        { name: "Assignment 2: CMOS Layout & Sizing Delays", score: 45, max: 50, weight: "10%", remarks: "Excellent" },
                        { name: "Practical Review: Cadence Virtuoso Simulator", score: 47, max: 50, weight: "10%", remarks: "Outstanding" },
                        { name: "Internal Theory Examination I (T1)", score: 86, max: 100, weight: "30%", remarks: "A Grade" }
                    ]
                };

                window.filterGradesByCourse = function() {
                    const select = document.getElementById("courseGradesFilter");
                    const tbody = document.getElementById("gradesTableBody");
                    const percentText = document.getElementById("internalPercentText");
                    const pointsText = document.getElementById("internalPointsText");
                    
                    if (!select || !tbody) return;

                    const course = select.value;
                    const items = gradesData[course];

                    let obtainedTotal = 0;
                    let maxTotal = 0;

                    tbody.innerHTML = items.map(item => {
                        obtainedTotal += item.score;
                        maxTotal += item.max;

                        return \`
                            <tr>
                                <td style="font-weight:600; color:var(--text-primary); font-size:13px; padding:15px 10px;">\${item.name}</td>
                                <td style="font-weight:700; color:var(--text-primary); font-size:13px; padding:15px 10px;">\${item.score}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${item.max}</td>
                                <td style="font-size:12px; color:var(--text-secondary); font-weight:600; padding:15px 10px;">\${item.weight}</td>
                                <td style="padding:15px 10px;">
                                    <span style="font-size:11px; font-weight:700; color:#10b981;">\${item.remarks}</span>
                                </td>
                            </tr>
                        \`;
                    }).join("");

                    const percentage = ((obtainedTotal / maxTotal) * 100).toFixed(1);
                    if (percentText) percentText.textContent = percentage + "%";
                    if (pointsText) pointsText.textContent = obtainedTotal + " / " + maxTotal;

                    const rangeInput = document.getElementById("simulatorRangeInput");
                    if (rangeInput) {
                        rangeInput.value = 45;
                        updateGradesSimulation(45);
                    }
                };

                window.updateGradesSimulation = function(val) {
                    const label = document.getElementById("simulatorScoreLabel");
                    const percentLabel = document.getElementById("simulatedPercentLabel");
                    const select = document.getElementById("courseGradesFilter");
                    
                    if (label) label.textContent = val + " / 50";

                    if (select) {
                        const course = select.value;
                        const items = gradesData[course];

                        let obtainedTotal = parseInt(val);
                        let maxTotal = 50;

                        items.forEach(i => {
                            obtainedTotal += i.score;
                            maxTotal += i.max;
                        });

                        const projectedPercentage = ((obtainedTotal / maxTotal) * 100).toFixed(1);
                        if (percentLabel) percentLabel.textContent = projectedPercentage + "%";
                    }
                };

                window.downloadGradesReport = function() {
                    alert("Generating signed Continuous Internal Evaluation gradecard report...");
                    setTimeout(() => {
                        alert("Continuous Internal Evaluation Report PDF downloaded successfully!");
                    }, 1200);
                };

                // Initial Load
                filterGradesByCourse();
            });
        `
    },
    {
        id: "members",
        dir: "student/classroom/members",
        title: "Class Members",
        icon: "fa-users-line",
        category: "Classroom",
        htmlContent: `
            <div class="members-container">
                <!-- Search & Filters -->
                <div class="glassmorphism" style="padding: 20px; border-radius:10px; margin-bottom: 25px; display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap;">
                    <div style="display:flex; gap:10px; align-items:center; flex:1; min-width:280px; position:relative;">
                        <i class="fa-solid fa-magnifying-glass" style="color:var(--text-secondary); margin-left: 10px; position:absolute; left: 5px;"></i>
                        <input type="text" id="membersSearch" placeholder="Search classmates or teachers by name or ID..." oninput="filterMembers()" style="padding-left:35px; width:100%; height:38px; border-radius:8px; font-size:13px;" class="form-input">
                    </div>
                    
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <button class="filter-btn active" onclick="setRoleFilter('all')" style="height:36px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--primary); color:#fff; border:none; outline:none;">All Members</button>
                        <button class="filter-btn" onclick="setRoleFilter('faculty')" style="height:36px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Faculty</button>
                        <button class="filter-btn" onclick="setRoleFilter('student')" style="height:36px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Classmates</button>
                    </div>
                </div>

                <!-- Members Card -->
                <div class="members-card glassmorphism">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-users-line"></i> Classroom Cohort Directory</h3>
                        <span style="font-size:11px; color:var(--text-secondary);">Section: CS-AI-1 • Cohort batch 2026</span>
                    </div>

                    <div id="membersGridContainer" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                        <!-- Dynamic member items load here -->
                    </div>
                </div>

                <!-- Member Detail Modal -->
                <div id="memberDetailModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:400px; padding:25px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary); text-align:center;">
                        <div style="display:flex; justify-content:flex-end;">
                            <button onclick="closeMemberModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>

                        <!-- Info details -->
                        <div style="width:70px; height:70px; border-radius:50%; background:var(--primary); margin:0 auto 15px auto; display:flex; align-items:center; justify-content:center; color:#fff; font-size:28px; font-weight:700;" id="modalAvatar">
                            A
                        </div>

                        <h3 style="margin:0 0 5px 0; font-size:16px; font-weight:800; color:var(--text-primary);" id="modalName">Name</h3>
                        <p style="margin:0 0 15px 0; font-size:12px; color:var(--accent);" id="modalSub">Role / Title</p>

                        <div style="border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color); padding:15px 0; margin-bottom:20px; text-align:left; display:flex; flex-direction:column; gap:10px; font-size:12px;">
                            <div>
                                <strong style="color:var(--text-secondary);">Email:</strong>
                                <span id="modalEmail" style="color:var(--text-primary); float:right;">email@unifyed.edu</span>
                            </div>
                            <div>
                                <strong style="color:var(--text-secondary);">ID Number:</strong>
                                <span id="modalID" style="color:var(--text-primary); float:right;">ID-12345</span>
                            </div>
                            <div>
                                <strong style="color:var(--text-secondary);">Office / Room:</strong>
                                <span id="modalOffice" style="color:var(--text-primary); float:right;">Room 402</span>
                            </div>
                        </div>

                        <div style="display:flex; gap:10px;">
                            <button class="btn btn-secondary btn-sm" onclick="closeMemberModal()" style="flex:1;">Close</button>
                            <button class="btn btn-primary btn-sm" onclick="initiateCohortChat()" style="flex:1;"><i class="fa-solid fa-envelope"></i> Send Email</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .members-card {
                padding: 30px;
            }
            .filter-btn {
                transition: all 0.3s;
            }
            .member-item {
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .member-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(0,0,0,0.1);
                border-color: var(--primary) !important;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const cohortMembers = [
                    { id: "mem_sharma", name: "Prof. S. Sharma", role: "faculty", sub: "HOD Computer Science Dept", email: "s.sharma@unifyed.edu", idNum: "FAC-9011", office: "CS Block, Room 204", avatar: "S" },
                    { id: "mem_verma_dr", name: "Dr. A. Verma", role: "faculty", sub: "Associate Professor - VLSI", email: "a.verma@unifyed.edu", idNum: "FAC-9082", office: "ECE Block, Room 102", avatar: "V" },
                    { id: "mem_anjali", name: "Anjali Kumawat", role: "student", sub: "Classmate", email: "anjali.uemj26@gmail.com", idNum: "UNIFY-2026-1025", office: "Hostel Block B", avatar: "A" },
                    { id: "mem_aditya", name: "Aditya Sharma", role: "student", sub: "Classmate", email: "aditya.sharma@unifyed.edu", idNum: "UNIFY-2026-1033", office: "Hostel Block A", avatar: "A" },
                    { id: "mem_rahul", name: "Rahul Sharma", role: "student", sub: "Classmate", email: "rahul.sharma@unifyed.edu", idNum: "UNIFY-2026-1090", office: "Day Scholar", avatar: "R" }
                ];

                let currentRole = "all";
                let activeMember = null;

                window.setRoleFilter = function(role) {
                    currentRole = role;
                    const buttons = document.querySelectorAll(".filter-btn");
                    buttons.forEach(btn => {
                        const onclickStr = btn.getAttribute("onclick");
                        if (onclickStr && onclickStr.includes("'" + role + "'")) {
                            btn.style.background = "var(--primary)";
                            btn.style.color = "#fff";
                            btn.style.borderColor = "var(--primary)";
                        } else {
                            btn.style.background = "var(--bg-tertiary)";
                            btn.style.color = "var(--text-secondary)";
                            btn.style.borderColor = "var(--border-color)";
                        }
                    });
                    filterMembers();
                };

                window.filterMembers = function() {
                    const searchVal = document.getElementById("membersSearch").value.toLowerCase();
                    const container = document.getElementById("membersGridContainer");
                    if (!container) return;

                    const filtered = cohortMembers.filter(item => {
                        const matchesRole = (currentRole === "all" || item.role === currentRole);
                        const matchesSearch = item.name.toLowerCase().includes(searchVal) || item.idNum.toLowerCase().includes(searchVal);
                        return matchesRole && matchesSearch;
                    });

                    if (filtered.length === 0) {
                        container.innerHTML = \`<div style="grid-column:1/-1; padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-users" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No classroom cohort members matched your query.</div>\`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => \`
                        <div class="member-item" onclick="openMemberModal('\${item.id}')" style="display:flex; align-items:center; gap:15px; padding:16px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                            <div style="width:40px; height:40px; border-radius:50%; background:\${item.role === 'faculty' ? 'var(--accent)' : 'var(--primary)'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;">\${item.avatar}</div>
                            <div style="flex-grow:1;">
                                <strong style="display:block; font-size:14px; color:var(--text-primary); margin-bottom:2px;">\${item.name}</strong>
                                <span style="font-size:11px; color:var(--text-secondary);">\${item.sub} • \${item.idNum}</span>
                            </div>
                            <i class="fa-solid fa-chevron-right" style="font-size:12px; color:var(--text-tertiary);"></i>
                        </div>
                    \`).join("");
                };

                window.openMemberModal = function(id) {
                    const match = cohortMembers.find(m => m.id === id);
                    if (!match) return;

                    activeMember = match;
                    const modal = document.getElementById("memberDetailModal");
                    const avatar = document.getElementById("modalAvatar");
                    const name = document.getElementById("modalName");
                    const sub = document.getElementById("modalSub");
                    const email = document.getElementById("modalEmail");
                    const idNum = document.getElementById("modalID");
                    const office = document.getElementById("modalOffice");

                    if (modal && name) {
                        name.textContent = match.name;
                        sub.textContent = match.role.toUpperCase() + " • " + match.sub;
                        email.textContent = match.email;
                        idNum.textContent = match.idNum;
                        office.textContent = match.office;
                        avatar.textContent = match.avatar;
                        avatar.style.background = match.role === "faculty" ? "var(--accent)" : "var(--primary)";
                        
                        modal.style.display = "flex";
                    }
                };

                window.closeMemberModal = function() {
                    const modal = document.getElementById("memberDetailModal");
                    if (modal) modal.style.display = "none";
                };

                window.initiateCohortChat = function() {
                    if (activeMember) {
                        window.open("mailto:" + activeMember.email);
                    }
                };

                // Initial load
                filterMembers();
            });
        `
    },
    {
        id: "live-classes",
        dir: "student/live-classes",
        title: "Live Lectures",
        icon: "fa-video",
        category: "Learning",
        htmlContent: `
            <div class="live-container">
                <!-- Session status tabs -->
                <div style="display:flex; gap:10px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
                    <button class="filter-btn active" onclick="setLiveTab('live')" style="height:34px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--primary); color:#fff; border:none; outline:none;">Active & Scheduled Lectures</button>
                    <button class="filter-btn" onclick="setLiveTab('recorded')" style="height:34px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Recorded Playbacks</button>
                </div>

                <!-- Active Lectures Card -->
                <div class="live-card glassmorphism" id="activeSection">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);"><i class="fa-solid fa-circle fa-beat" style="color:#ef4444; font-size:10px; margin-right:5px;"></i> Ongoing Classroom Streams</h3>
                        <span style="font-size:11px; color:var(--text-secondary);">Direct links to join virtual meeting rooms.</span>
                    </div>
                    <div id="liveListContainer" style="display:flex; flex-direction:column; gap:15px;">
                        <!-- Dynamic active rows -->
                    </div>
                </div>

                <!-- Virtual Lecture Room Modal -->
                <div id="virtualRoomModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:var(--bg-primary); z-index:1000; padding:30px; box-sizing:border-box;">
                    <div class="virtual-grid">
                        
                        <!-- Left Panel: Video stream canvas -->
                        <div class="glassmorphism stream-panel">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:15px;">
                                <strong style="font-size:14px; color:var(--text-primary);" id="streamSubjectTitle">CSE-602: Robotics Simulation Lab</strong>
                                <span style="font-size:11px; color:#ef4444; font-weight:700;"><i class="fa-solid fa-record-vinyl fa-beat"></i> RECORDING ACTIVE</span>
                            </div>
                            
                            <!-- Video Screen -->
                            <div class="stream-screen">
                                <div id="screenSlideMock">
                                    <i class="fa-solid fa-microchip" style="font-size:48px; color:var(--accent); margin-bottom:15px; display:block;"></i>
                                    <h4 style="font-size:16px; margin:0 0 8px 0; color:#fff;">Robotics Simulation Core Concepts</h4>
                                    <p style="font-size:12px; color:var(--text-secondary); margin:0;">Slide 14 of 32: Forward Kinematics Joint Matrices</p>
                                </div>
                                <span style="position:absolute; bottom:15px; left:15px; font-size:10px; background:rgba(0,0,0,0.6); color:#fff; padding:4px 10px; border-radius:4px;"><i class="fa-solid fa-chalkboard-user"></i> Lecturer: Dr. A. Verma</span>
                            </div>

                            <!-- Screen Control Panel -->
                            <div class="stream-controls">
                                <button class="ctrl-btn" onclick="toggleMute()" id="muteBtn"><i class="fa-solid fa-microphone"></i> Mute</button>
                                <button class="ctrl-btn" onclick="toggleCamera()" id="camBtn"><i class="fa-solid fa-video"></i> Stop Video</button>
                                <button class="ctrl-btn" onclick="raiseHand()" id="handBtn" style="color:var(--text-secondary);"><i class="fa-solid fa-hand"></i> Raise Hand</button>
                                <button class="ctrl-btn abort-btn" onclick="leaveLecture()"><i class="fa-solid fa-phone-slash"></i> Leave Lecture</button>
                            </div>
                        </div>

                        <!-- Right Panel: Classroom Live Chat -->
                        <div class="glassmorphism chat-panel">
                            <div>
                                <h4 style="margin:0 0 15px 0; font-size:13px; font-weight:700; color:var(--accent); border-bottom:1px solid var(--border-color); padding-bottom:10px;"><i class="fa-regular fa-comments"></i> LIVE CLASS CHAT</h4>
                                <div class="chat-feed" id="streamChatFeed">
                                    <!-- Dynamic chat messages -->
                                </div>
                            </div>
                            <div style="display:flex; gap:8px; align-items:center;">
                                <input type="text" id="streamChatMessage" class="form-input" placeholder="Type a message to HOD / classmates..." style="flex:1; height:38px; font-size:12px; border-radius:6px;" onkeydown="if(event.key === 'Enter') sendStreamMessage()">
                                <button class="btn btn-primary btn-sm" onclick="sendStreamMessage()" style="height:38px;"><i class="fa-solid fa-paper-plane"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .live-card {
                padding: 30px;
            }
            .filter-btn {
                transition: all 0.3s;
            }
            .live-row-item {
                transition: transform 0.2s;
            }
            .live-row-item:hover {
                transform: translateY(-1px);
            }
            .live-badge {
                color: #ffffff;
                padding: 6px 12px;
                border-radius: 50px;
                font-size: 10px;
                font-weight: 700;
                display: inline-block;
            }
            .virtual-grid {
                display: grid;
                grid-template-columns: 1fr 340px;
                gap: 25px;
                height: 100%;
            }
            @media (max-width: 992px) {
                .virtual-grid {
                    grid-template-columns: 1fr;
                }
            }
            .stream-panel, .chat-panel {
                padding: 25px;
                border-radius: 12px;
                border: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
                height: 100%;
            }
            .stream-screen {
                width: 100%;
                height: 380px;
                background: #0d0e12;
                border-radius: 8px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                border: 1px solid var(--border-color);
                margin-bottom: 20px;
            }
            .stream-controls {
                display: flex;
                gap: 12px;
                justify-content: center;
                flex-wrap: wrap;
            }
            .ctrl-btn {
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: background 0.2s;
            }
            .ctrl-btn:hover {
                background: rgba(255,255,255,0.03);
            }
            .ctrl-btn.abort-btn {
                background: rgba(239,68,68,0.1);
                color: #ef4444;
                border-color: rgba(239,68,68,0.2);
            }
            .ctrl-btn.abort-btn:hover {
                background: rgba(239,68,68,0.2);
            }
            .chat-feed {
                height: 360px;
                overflow-y: auto;
                padding-right: 10px;
                margin-bottom: 20px;
            }
            .chat-msg {
                font-size: 12px;
                color: var(--text-secondary);
                margin-bottom: 12px;
                line-height: 1.4;
                padding: 8px;
                background: rgba(255,255,255,0.01);
                border-radius: 6px;
                border: 1px solid var(--border-color);
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const liveClassesData = [
                    { id: "stream_robotics", type: "live", code: "CSE-602", title: "Robotics Simulation Lab", host: "Dr. A. Verma", details: "Joined: 42 participants", status: "LIVE NOW", isLive: true },
                    { id: "stream_dl", type: "live", code: "CSE-604", title: "Deep Learning Networks", host: "Prof. S. Sharma", details: "Starts in 2 hours", status: "SCHEDULED", isLive: false },
                    { id: "stream_vlsi_rec", type: "recorded", code: "VLSI-501", title: "CMOS Sizing & Propagation Delays", host: "Dr. A. Verma", details: "Duration: 52 Mins • Recorded Yesterday", status: "PLAYBACK", isLive: false },
                    { id: "stream_db_rec", type: "recorded", code: "DBMS-403", title: "Indexing, B-Trees & Performance Tuning", host: "Dr. K. Sen", details: "Duration: 45 Mins • Recorded 2 days ago", status: "PLAYBACK", isLive: false }
                ];

                let currentTab = "live";
                let isMuted = false;
                let isCamOff = false;

                window.setLiveTab = function(tab) {
                    currentTab = tab;
                    const buttons = document.querySelectorAll(".filter-btn");
                    buttons.forEach(btn => {
                        const clickStr = btn.getAttribute("onclick");
                        if (clickStr && clickStr.includes("'" + tab + "'")) {
                            btn.style.background = "var(--primary)";
                            btn.style.color = "#fff";
                            btn.style.borderColor = "var(--primary)";
                        } else {
                            btn.style.background = "var(--bg-tertiary)";
                            btn.style.color = "var(--text-secondary)";
                            btn.style.borderColor = "var(--border-color)";
                        }
                    });
                    renderLiveList();
                };

                window.renderLiveList = function() {
                    const container = document.getElementById("liveListContainer");
                    if (!container) return;

                    const filtered = liveClassesData.filter(item => item.type === currentTab);

                    if (filtered.length === 0) {
                        container.innerHTML = \`<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-video-slash" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No class recordings or streams available.</div>\`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => \`
                        <div class="live-row-item" style="display:flex; align-items:center; padding:20px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); gap:20px; margin-bottom: 12px;">
                            <div class="status">
                                <span class="live-badge" style="background-color:\${item.isLive ? '#ef4444' : (item.status === 'SCHEDULED' ? 'var(--primary)' : 'var(--text-secondary)')};">
                                    \${item.isLive ? '<i class="fa-solid fa-circle fa-beat"></i> ' + item.status : item.status}
                                </span>
                            </div>
                            <div class="details" style="flex-grow:1;">
                                <strong style="display:block; font-size:15px; color:var(--text-primary); margin-bottom:2px;">\${item.code}: \${item.title}</strong>
                                <span style="font-size:12px; color:var(--text-secondary);">Host: \${item.host} • \${item.details}</span>
                            </div>
                            <div>
                                \${item.isLive ? 
                                    \`<button class="btn btn-primary btn-sm" onclick="joinLectureRoom('\${item.id}', '\${item.code}: \${item.title}', '\${item.host}')" style="height:34px; font-size:11px;">Join Lecture</button>\` :
                                    (item.status === 'PLAYBACK' ?
                                        \`<button class="btn btn-secondary btn-sm" onclick="playRecording('\${item.title.replace(/'/g, "\\\\'")}')" style="height:34px; font-size:11px; gap:5px;"><i class="fa-solid fa-circle-play"></i> Play</button>\` :
                                        \`<button class="btn btn-secondary btn-sm" disabled style="height:34px; font-size:11px; opacity:0.6;">Waiting...</button>\`
                                    )
                                }
                            </div>
                        </div>
                    \`).join("");
                };

                window.joinLectureRoom = function(id, title, host) {
                    const modal = document.getElementById("virtualRoomModal");
                    const subjTitle = document.getElementById("streamSubjectTitle");
                    const chatFeed = document.getElementById("streamChatFeed");

                    if (modal && subjTitle && chatFeed) {
                        subjTitle.textContent = title;
                        modal.style.display = "block";
                        
                        chatFeed.innerHTML = \`
                            <div class="chat-msg"><strong>Dr. A. Verma:</strong> Welcome classmates, let me share joint kinematics coordinate matrices.</div>
                            <div class="chat-msg"><strong>Aditya Sharma:</strong> Yes sir, page 12 calculations were outstanding.</div>
                        \`;
                    }
                };

                window.leaveLecture = function() {
                    const modal = document.getElementById("virtualRoomModal");
                    if (modal) modal.style.display = "none";
                };

                window.sendStreamMessage = function() {
                    const input = document.getElementById("streamChatMessage");
                    const feed = document.getElementById("streamChatFeed");

                    if (input && feed && input.value.trim()) {
                        feed.innerHTML += \`
                            <div class="chat-msg"><strong>You (Student):</strong> \${input.value.trim()}</div>
                        \`;
                        feed.scrollTop = feed.scrollHeight;
                        input.value = "";
                    }
                };

                window.toggleMute = function() {
                    isMuted = !isMuted;
                    const btn = document.getElementById("muteBtn");
                    if (btn) {
                        btn.innerHTML = isMuted ? '<i class="fa-solid fa-microphone-slash"></i> Unmute' : '<i class="fa-solid fa-microphone"></i> Mute';
                        btn.style.color = isMuted ? '#ef4444' : 'var(--text-primary)';
                    }
                };

                window.toggleCamera = function() {
                    isCamOff = !isCamOff;
                    const btn = document.getElementById("camBtn");
                    if (btn) {
                        btn.innerHTML = isCamOff ? '<i class="fa-solid fa-video-slash"></i> Start Video' : '<i class="fa-solid fa-video"></i> Stop Video';
                        btn.style.color = isCamOff ? '#ef4444' : 'var(--text-primary)';
                    }
                };

                window.raiseHand = function() {
                    const btn = document.getElementById("handBtn");
                    if (btn) {
                        btn.style.color = "var(--accent)";
                        alert("Hand raised. The lecturer will attend to your query shortly.");
                    }
                };

                window.playRecording = function(title) {
                    alert("Streaming recorded classroom lecture: " + title);
                };

                // Initial render
                renderLiveList();
            });
        `
    },
    {
        id: "projects",
        dir: "student/projects",
        title: "My Projects",
        icon: "fa-diagram-project",
        category: "Learning",
        htmlContent: `
            <div class="projects-container">
                <!-- Main Header Controls -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; flex-wrap:wrap; gap:15px;">
                    <div>
                        <h2 style="margin:0; font-size:18px; font-weight:800; color:var(--text-primary);"><i class="fa-solid fa-diagram-project"></i> Capstone Projects & Thesis Submissions</h2>
                        <p style="margin:5px 0 0 0; font-size:12px; color:var(--text-secondary);">Manage semester projects, upload synopsis reports, and track guide evaluations.</p>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="openNewProjectModal()" style="gap:6px; height:36px;"><i class="fa-solid fa-plus"></i> Submit New Project</button>
                </div>

                <!-- Projects Grid -->
                <div id="projectsGridContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                    <!-- Dynamic project cards load here -->
                </div>

                <!-- New Project Modal -->
                <div id="newProjectModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:520px; padding:30px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                            <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);">Submit Project Proposal</h3>
                            <button onclick="closeNewProjectModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:20px;">
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Project Title:</label>
                                <input type="text" id="projTitleInput" class="form-input" placeholder="e.g. Autonomous Corridor SLAM Quadruped" style="width:100%; padding:10px; border-radius:6px; font-size:13px;">
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Faculty Guide / Mentor:</label>
                                <select id="projGuideSelect" class="form-input" style="width:100%; padding:10px; border-radius:6px; font-size:13px; background:var(--bg-secondary);">
                                    <option value="Dr. A. Verma">Dr. A. Verma (Robotics & VLSI)</option>
                                    <option value="Prof. S. Sharma">Prof. S. Sharma (Deep Learning)</option>
                                    <option value="Dr. K. Sen">Dr. K. Sen (Database Systems)</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Synopsis / Abstract:</label>
                                <textarea id="projDescInput" class="form-input" rows="4" placeholder="Briefly summarize your project goals, hardware models, and simulation datasets..." style="width:100%; padding:10px; border-radius:6px; font-size:12px; resize:none;"></textarea>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; justify-content:flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="closeNewProjectModal()">Cancel</button>
                            <button class="btn btn-primary btn-sm" id="postProjBtn" onclick="postProjectProposal()">Submit Proposal</button>
                        </div>
                    </div>
                </div>

                <!-- Project Evaluation Modal -->
                <div id="projectEvalModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:480px; padding:25px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                            <h3 style="margin:0; font-size:15px; font-weight:700; color:var(--accent);">Evaluation Details</h3>
                            <button onclick="closeEvalModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <h4 style="font-size:14px; font-weight:700; color:var(--text-primary); margin:0 0 10px 0;" id="evalProjTitle">Project Title</h4>
                        <div style="display:flex; flex-direction:column; gap:12px; font-size:12px; margin-bottom:20px;">
                            <div>
                                <strong style="color:var(--text-secondary);">Guide Mentor:</strong>
                                <span id="evalProjGuide" style="color:var(--text-primary); float:right;">Dr. A. Verma</span>
                            </div>
                            <div>
                                <strong style="color:var(--text-secondary);">Approval Status:</strong>
                                <span id="evalProjStatus" style="float:right;" class="badge">Approved</span>
                            </div>
                            <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:12px; border-radius:6px; margin-top:5px;">
                                <strong style="color:var(--text-secondary); display:block; margin-bottom:5px;">Guide Review Feedback:</strong>
                                <p style="margin:0; line-height:1.4; color:var(--text-primary);" id="evalProjFeedback">Feedback text</p>
                            </div>
                            <div>
                                <strong style="color:var(--text-secondary);">Continuous Grade:</strong>
                                <span id="evalProjGrade" style="color:var(--primary); font-weight:700; float:right;">9.5 / 10</span>
                            </div>
                        </div>
                        <button class="btn btn-secondary btn-sm" onclick="closeEvalModal()" style="width:100%;">Close</button>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .proj-card-item {
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .proj-card-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(0,0,0,0.1);
                border-color: var(--primary) !important;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultProjects = [
                    {
                        id: "proj_quadruped",
                        title: "Autonomous Quadruped Navigation System",
                        desc: "Development of a quadruped robotic simulation navigating structured corridors using LiDAR SLAM and A* mapping pathfinders.",
                        status: "Approved",
                        guide: "Dr. A. Verma",
                        feedback: "Excellent work on LiDAR. Sizing parameters have been validated. Update the hardware specifications in chapter 3 prior to End-Sem reviews.",
                        grade: "9.5 / 10"
                    },
                    {
                        id: "proj_deep_retina",
                        title: "Deep Retina: Diabetic Retinopathy Diagnostic Engine",
                        desc: "Multi-layered CNN architecture trained on retinal imaging data to perform automated early-stage micro-aneurysm classifications.",
                        status: "Under Review",
                        guide: "Prof. S. Sharma",
                        feedback: "Synopsis received. Waiting for model training validation files and ROC performance charts.",
                        grade: "Awaiting Evaluation"
                    }
                ];

                function getProjects() {
                    const saved = localStorage.getItem("capstone_projects");
                    if (saved) return JSON.parse(saved);
                    return defaultProjects;
                }

                function saveProjects(list) {
                    localStorage.setItem("capstone_projects", JSON.stringify(list));
                }

                window.renderProjects = function() {
                    const container = document.getElementById("projectsGridContainer");
                    if (!container) return;

                    const list = getProjects();
                    container.innerHTML = list.map(item => \`
                        <div class="proj-card-item glassmorphism" onclick="openEvalModal('\${item.id}')" style="padding:22px; border-radius:var(--border-radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                            <strong style="font-size:15px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:8px;">\${item.title}</strong>
                            <p style="font-size:12px; color:var(--text-secondary); line-height:1.5; margin:0 0 15px 0; height:54px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">\${item.desc}</p>
                            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:12px;">
                                <span class="badge \${item.status === 'Approved' ? 'badge-success' : 'badge-warning'}">\${item.status}</span>
                                <span style="font-size:11px; color:var(--text-secondary); font-weight:500;">Guide: \${item.guide}</span>
                            </div>
                        </div>
                    \`).join("");
                };

                window.openNewProjectModal = function() {
                    const modal = document.getElementById("newProjectModal");
                    if (modal) modal.style.display = "flex";
                };

                window.closeNewProjectModal = function() {
                    const modal = document.getElementById("newProjectModal");
                    if (modal) modal.style.display = "none";
                    document.getElementById("projTitleInput").value = "";
                    document.getElementById("projDescInput").value = "";
                };

                window.postProjectProposal = function() {
                    const titleVal = document.getElementById("projTitleInput").value.trim();
                    const guideVal = document.getElementById("projGuideSelect").value;
                    const descVal = document.getElementById("projDescInput").value.trim();

                    if (!titleVal || !descVal) {
                        alert("Please fill out all project details!");
                        return;
                    }

                    const postBtn = document.getElementById("postProjBtn");
                    if (postBtn) {
                        postBtn.disabled = true;
                        postBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
                    }

                    setTimeout(() => {
                        const list = getProjects();
                        list.unshift({
                            id: "proj_" + Date.now(),
                            title: titleVal,
                            desc: descVal,
                            status: "Under Review",
                            guide: guideVal,
                            feedback: "Proposal submitted. Waiting for guide to review raw abstract specifications.",
                            grade: "Awaiting Evaluation"
                        });
                        saveProjects(list);

                        if (postBtn) {
                            postBtn.disabled = false;
                            postBtn.textContent = "Submit Proposal";
                        }

                        closeNewProjectModal();
                        renderProjects();
                        alert("Project proposal submitted successfully!");
                    }, 1200);
                };

                window.openEvalModal = function(id) {
                    const list = getProjects();
                    const match = list.find(p => p.id === id);
                    if (!match) return;

                    const modal = document.getElementById("projectEvalModal");
                    const title = document.getElementById("evalProjTitle");
                    const guide = document.getElementById("evalProjGuide");
                    const status = document.getElementById("evalProjStatus");
                    const feedback = document.getElementById("evalProjFeedback");
                    const grade = document.getElementById("evalProjGrade");

                    if (modal && title && feedback) {
                        title.textContent = match.title;
                        guide.textContent = match.guide;
                        status.textContent = match.status;
                        status.className = "badge " + (match.status === "Approved" ? "badge-success" : "badge-warning");
                        feedback.textContent = match.feedback;
                        grade.textContent = match.grade;
                        
                        modal.style.display = "flex";
                    }
                };

                window.closeEvalModal = function() {
                    const modal = document.getElementById("projectEvalModal");
                    if (modal) modal.style.display = "none";
                };

                // Initial render
                renderProjects();
            });
        `
    },
    {
        id: "mentor",
        dir: "student/mentor",
        title: "My Mentor",
        icon: "fa-chalkboard-user",
        category: "Support",
        htmlContent: `
            <div class="mentor-container-grid">
                
                <!-- Left Column: Profile Card -->
                <div class="mentor-profile glassmorphism">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); margin-bottom: 20px;">
                        <i class="fa-solid fa-chalkboard-user" style="font-size: 36px; color: var(--primary);"></i>
                    </div>
                    <h2 style="margin:0 0 4px 0; font-size:18px; font-weight:800; color:var(--text-primary);">Dr. A. Verma</h2>
                    <span style="font-size:12px; color:var(--accent); font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Assigned Faculty Mentor</span>
                    <p style="margin:15px 0 20px 0; font-size:12px; color:var(--text-secondary); text-align:center; line-height:1.5;">Associate Professor (CSE Department) • Lead Guide for Capstone Projects (CS-AI-1 Batch). Office: CS block room 204.</p>
                    
                    <div style="display:flex; flex-direction:column; gap:10px; width:100%; border-top:1px solid var(--border-color); padding-top:20px;">
                        <button class="btn btn-primary btn-sm" onclick="openBookSlotModal()" style="width:100%; gap:8px; height:38px;"><i class="fa-solid fa-calendar-check"></i> Book Meeting Slot</button>
                        <button class="btn btn-secondary btn-sm" onclick="window.open('mailto:a.verma@unifyed.edu')" style="width:100%; gap:8px; height:38px;"><i class="fa-solid fa-envelope"></i> Send Email Office</button>
                    </div>

                    <!-- Booked Slot List -->
                    <div style="width:100%; margin-top:25px; text-align:left;" id="bookedSlotListCard">
                        <strong style="font-size:11px; text-transform:uppercase; color:var(--text-secondary); letter-spacing:0.5px; display:block; margin-bottom:10px;">Booked Appointments</strong>
                        <div id="bookedSlotsContainer" style="display:flex; flex-direction:column; gap:8px;">
                            <!-- Dynamic slots -->
                        </div>
                    </div>
                </div>

                <!-- Right Column: Mentorship Communications Feed -->
                <div class="mentor-feed-card glassmorphism">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:15px; font-weight:800; color:var(--text-primary);"><i class="fa-solid fa-comments"></i> Mentor Consultation Feed</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Direct private communication thread with your assigned advisor.</p>
                    </div>

                    <!-- Feed message box -->
                    <div id="mentorMessagesFeed" style="height:320px; overflow-y:auto; padding-right:10px; display:flex; flex-direction:column; gap:15px; margin-bottom:20px;">
                        <!-- Dynamic consultation notes -->
                    </div>

                    <!-- Private note composer -->
                    <div style="display:flex; gap:12px; align-items:start; border-top:1px solid var(--border-color); padding-top:15px;">
                        <textarea id="mentorQueryText" class="form-input" rows="2" placeholder="Send private message or document query to Dr. A. Verma..." style="flex:1; padding:10px; border-radius:8px; font-size:13px; resize:none;" onkeydown="if(event.key === 'Enter') sendMentorQuery()"></textarea>
                        <button class="btn btn-primary btn-sm" onclick="sendMentorQuery()" style="height:42px;"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>

                <!-- Book Slot Modal -->
                <div id="bookSlotModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:440px; padding:25px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                            <h3 style="margin:0; font-size:15px; font-weight:700; color:var(--accent);">Schedule Consultation Slot</h3>
                            <button onclick="closeBookSlotModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:20px;">
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Select Date:</label>
                                <input type="date" id="slotDateInput" class="form-input" style="width:100%; padding:10px; border-radius:6px; font-size:13px;">
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Select Time Slot:</label>
                                <select id="slotTimeSelect" class="form-input" style="width:100%; padding:10px; border-radius:6px; font-size:13px; background:var(--bg-secondary);">
                                    <option value="11:30 AM">11:30 AM - 12:00 PM</option>
                                    <option value="02:30 PM">02:30 PM - 03:00 PM</option>
                                    <option value="04:00 PM">04:00 PM - 04:30 PM</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Discussion Agenda:</label>
                                <textarea id="slotAgendaInput" class="form-input" rows="3" placeholder="Thesis Synopsis, Attendance warning validation, Scholarship verification details..." style="width:100%; padding:10px; border-radius:6px; font-size:12px; resize:none;"></textarea>
                            </div>
                        </div>
                        <div style="display:flex; gap:12px; justify-content:flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="closeBookSlotModal()">Cancel</button>
                            <button class="btn btn-primary btn-sm" onclick="confirmMeetingSlot()">Book Slot</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .mentor-container-grid {
                display: grid;
                grid-template-columns: 320px 1fr;
                gap: 25px;
                align-items: start;
            }
            @media (max-width: 992px) {
                .mentor-container-grid {
                    grid-template-columns: 1fr;
                }
            }
            .mentor-profile {
                padding: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 12px;
                border: 1px solid var(--border-color);
            }
            .mentor-feed-card {
                padding: 30px;
                border-radius: 12px;
                border: 1px solid var(--border-color);
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultMessages = [
                    { sender: "mentor", text: "Welcome student. I have reviewed your Robotics SLAM project synopsis proposal. Sizing details are approved. Make sure to attach LiDAR datasheets in chapter 3.", time: "2 days ago" },
                    { sender: "student", text: "Thank you, Dr. Verma. I will update the references and report back on Monday.", time: "1 day ago" }
                ];

                const defaultBookings = [
                    { date: "2026-08-10", time: "02:30 PM", agenda: "Syllabus Project Sizing Synopsis Review", status: "Confirmed" }
                ];

                function getMessages() {
                    const saved = localStorage.getItem("mentor_messages");
                    if (saved) return JSON.parse(saved);
                    return defaultMessages;
                }

                function saveMessages(list) {
                    localStorage.setItem("mentor_messages", JSON.stringify(list));
                }

                function getBookings() {
                    const saved = localStorage.getItem("mentor_bookings");
                    if (saved) return JSON.parse(saved);
                    return defaultBookings;
                }

                function saveBookings(list) {
                    localStorage.setItem("mentor_bookings", JSON.stringify(list));
                }

                window.renderMentorFeed = function() {
                    const feed = document.getElementById("mentorMessagesFeed");
                    if (!feed) return;

                    const list = getMessages();
                    feed.innerHTML = list.map(m => \`
                        <div style="padding:12px; border-radius:8px; border:1px solid var(--border-color); background:\${m.sender === 'mentor' ? 'rgba(236,72,153,0.03)' : 'rgba(99,102,241,0.03)'}; align-self:\${m.sender === 'mentor' ? 'flex-start' : 'flex-end'}; width:85%; margin-bottom: 12px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                <strong style="font-size:12px; color:\${m.sender === 'mentor' ? 'var(--accent)' : 'var(--primary)'};">\${m.sender === 'mentor' ? 'Dr. A. Verma (Mentor)' : 'You (Student)'}</strong>
                                <span style="font-size:10px; color:var(--text-secondary);">\${m.time}</span>
                            </div>
                            <p style="margin:0; font-size:12px; color:var(--text-primary); line-height:1.4;">\${m.text}</p>
                        </div>
                    \`).join("");
                    feed.scrollTop = feed.scrollHeight;
                };

                window.sendMentorQuery = function() {
                    const input = document.getElementById("mentorQueryText");
                    if (!input || !input.value.trim()) return;

                    const list = getMessages();
                    list.push({
                        sender: "student",
                        text: input.value.trim(),
                        time: "Just now"
                    });
                    saveMessages(list);
                    input.value = "";
                    renderMentorFeed();
                };

                window.renderBookings = function() {
                    const container = document.getElementById("bookedSlotsContainer");
                    if (!container) return;

                    const list = getBookings();
                    if (list.length === 0) {
                        container.innerHTML = \`<span style="font-size:11px; color:var(--text-secondary);">No slots booked yet.</span>\`;
                        return;
                    }

                    container.innerHTML = list.map(b => \`
                        <div style="padding:10px; border-radius:6px; background:var(--bg-tertiary); border:1px solid var(--border-color); font-size:11px; margin-bottom: 8px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-weight:700;">
                                <span style="color:var(--text-primary);">\${b.date} • \${b.time}</span>
                                <span style="color:#10b981;">\${b.status}</span>
                            </div>
                            <p style="margin:0; color:var(--text-secondary); font-size:10px;">Agenda: \${b.agenda}</p>
                        </div>
                    \`).join("");
                };

                window.openBookSlotModal = function() {
                    const modal = document.getElementById("bookSlotModal");
                    if (modal) modal.style.display = "flex";
                };

                window.closeBookSlotModal = function() {
                    const modal = document.getElementById("bookSlotModal");
                    if (modal) modal.style.display = "none";
                    document.getElementById("slotDateInput").value = "";
                    document.getElementById("slotAgendaInput").value = "";
                };

                window.confirmMeetingSlot = function() {
                    const dateVal = document.getElementById("slotDateInput").value;
                    const timeVal = document.getElementById("slotTimeSelect").value;
                    const agendaVal = document.getElementById("slotAgendaInput").value.trim();

                    if (!dateVal || !agendaVal) {
                        alert("Please fill out slot date and agenda details!");
                        return;
                    }

                    const list = getBookings();
                    list.push({
                        date: dateVal,
                        time: timeVal,
                        agenda: agendaVal,
                        status: "Confirmed"
                    });
                    saveBookings(list);
                    closeBookSlotModal();
                    renderBookings();
                    alert("Appointment slot scheduled and confirmed successfully!");
                };

                // Initial render
                renderMentorFeed();
                renderBookings();
            });
        `
    },
    {
        id: "fees",
        dir: "student/services/fees",
        title: "Fee Details",
        icon: "fa-wallet",
        category: "Services",
        htmlContent: `
            <div class="fees-container">
                <!-- Main Header Statistics -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-bottom:25px;">
                    <div class="fees-summary glassmorphism" style="border-left:4px solid #10b981; padding:20px; text-align:left;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Outstanding Balance</span>
                        <h2 style="margin:8px 0; font-size:26px; font-weight:800; color:var(--text-primary);" id="outstandingDueLabel">₹ 0.00</h2>
                        <span id="clearedStatusBadge" style="font-size:11px; font-weight:700; color:#10b981;"><i class="fa-solid fa-circle-check"></i> ALL SEMESTER FEES CLEARED</span>
                    </div>

                    <div class="glassmorphism" style="border-left:4px solid var(--primary); padding:20px; text-align:left; display:flex; flex-direction:column; justify-content:center;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Scholarship Rebate Status</span>
                        <h3 style="margin:8px 0 0 0; font-size:16px; font-weight:800; color:var(--text-primary);">Merit-Based (20% Waiver)</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Applied directly to tuition fee registers.</p>
                    </div>
                </div>

                <!-- Toggle Navigation -->
                <div style="display:flex; gap:10px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
                    <button class="filter-btn active" onclick="setFeeTab('transactions')" id="tabTxnBtn" style="height:34px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--primary); color:#fff; border:none; outline:none;">Payment History Transactions</button>
                    <button class="filter-btn" onclick="setFeeTab('demands')" id="tabDmdBtn" style="height:34px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Upcoming Demands & Challans</button>
                </div>

                <!-- Ledger Table Card -->
                <div class="fees-history glassmorphism" style="padding:30px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:15px;">
                        <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--accent);" id="feeCardTitle"><i class="fa-solid fa-list-check"></i> Semester Fee Payments History</h3>
                        <span style="font-size:11px; color:var(--text-secondary);">Financial Year 2026-2027</span>
                    </div>

                    <div class="table-responsive">
                        <table class="custom-table" style="width:100%;">
                            <thead id="feeTableHeader">
                                <!-- Dynamic header -->
                            </thead>
                            <tbody id="feeTableBody">
                                <!-- Dynamic rows -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Payment Wizard Modal -->
                <div id="paymentWizardModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:480px; padding:30px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                            <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);">Secure Payment Gateway</h3>
                            <button onclick="closePaymentWizard()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        
                        <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:20px;">
                            <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:15px; border-radius:6px;">
                                <span style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:4px;">Payable Challan Item:</span>
                                <strong style="font-size:14px; color:var(--text-primary);" id="payModalItemTitle">Tuition Fee</strong>
                                <span style="font-size:16px; font-weight:800; color:var(--primary); display:block; margin-top:8px;" id="payModalItemAmount">₹ 75,000</span>
                            </div>

                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Select Payment Gateway Method:</label>
                                <select id="paymentMethod" class="form-input" style="width:100%; padding:10px; border-radius:6px; font-size:13px; background:var(--bg-secondary);">
                                    <option value="upi">UPI (GPay, PhonePe, Paytm)</option>
                                    <option value="net">Net Banking (HDFC, ICICI, SBI)</option>
                                    <option value="card">Credit / Debit Card Secure Gateway</option>
                                </select>
                            </div>

                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">Enter UPI ID / Card Credentials:</label>
                                <input type="text" id="paymentDetailsInput" class="form-input" placeholder="e.g. username@okaxis or Card Number" style="width:100%; padding:10px; border-radius:6px; font-size:13px;">
                            </div>
                        </div>

                        <div style="display:flex; gap:12px; justify-content:flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="closePaymentWizard()">Cancel</button>
                            <button class="btn btn-primary btn-sm" id="confirmPayBtn" onclick="confirmFeePayment()">Confirm Secure Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .fees-summary {
                background-image: linear-gradient(135deg, rgba(16,185,129,0.04), rgba(99,102,241,0.02));
            }
            .filter-btn {
                transition: all 0.3s;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultReceipts = [
                    { receiptNo: "RCPT-2026-9045", sem: "6th Semester", desc: "Tuition Fee Payments (CSE)", date: "July 04, 2026", amount: "₹ 75,000" },
                    { receiptNo: "RCPT-2026-1023", sem: "5th Semester", desc: "Tuition Fee Payments (CSE)", date: "Jan 10, 2026", amount: "₹ 75,000" }
                ];

                const defaultDemands = [
                    { id: "dem_tuition_7", sem: "7th Semester", desc: "Tuition Fee Demand (Fall 2026)", amountVal: 75000, amount: "₹ 75,000", dueDate: "Sep 10, 2026" },
                    { id: "dem_hostel_7", sem: "7th Semester", desc: "Hostel & Mess Charges (Fall 2026)", amountVal: 45000, amount: "₹ 45,000", dueDate: "Sep 15, 2026" }
                ];

                let activeTab = "transactions";
                let activePayId = null;

                function getReceipts() {
                    const saved = localStorage.getItem("fee_receipts");
                    if (saved) return JSON.parse(saved);
                    return defaultReceipts;
                }

                function saveReceipts(list) {
                    localStorage.setItem("fee_receipts", JSON.stringify(list));
                }

                function getDemands() {
                    const saved = localStorage.getItem("fee_demands");
                    if (saved) return JSON.parse(saved);
                    return defaultDemands;
                }

                function saveDemands(list) {
                    localStorage.setItem("fee_demands", JSON.stringify(list));
                }

                window.setFeeTab = function(tab) {
                    activeTab = tab;
                    
                    const txnBtn = document.getElementById("tabTxnBtn");
                    const dmdBtn = document.getElementById("tabDmdBtn");

                    if (txnBtn && dmdBtn) {
                        if (tab === "transactions") {
                            txnBtn.style.background = "var(--primary)";
                            txnBtn.style.color = "#fff";
                            txnBtn.style.borderColor = "var(--primary)";
                            dmdBtn.style.background = "var(--bg-tertiary)";
                            dmdBtn.style.color = "var(--text-secondary)";
                            dmdBtn.style.borderColor = "var(--border-color)";
                        } else {
                            dmdBtn.style.background = "var(--primary)";
                            dmdBtn.style.color = "#fff";
                            dmdBtn.style.borderColor = "var(--primary)";
                            txnBtn.style.background = "var(--bg-tertiary)";
                            txnBtn.style.color = "var(--text-secondary)";
                            txnBtn.style.borderColor = "var(--border-color)";
                        }
                    }
                    renderFeeBoard();
                };

                window.renderFeeBoard = function() {
                    const header = document.getElementById("feeTableHeader");
                    const tbody = document.getElementById("feeTableBody");
                    const cardTitle = document.getElementById("feeCardTitle");
                    const outstandingLabel = document.getElementById("outstandingDueLabel");
                    const statusBadge = document.getElementById("clearedStatusBadge");

                    if (!header || !tbody) return;

                    const demandsList = getDemands();
                    const receiptsList = getReceipts();

                    const totalOutstanding = demandsList.reduce((acc, curr) => acc + curr.amountVal, 0);
                    if (outstandingLabel) outstandingLabel.textContent = "₹ " + totalOutstanding.toLocaleString();

                    if (statusBadge) {
                        if (totalOutstanding === 0) {
                            statusBadge.style.color = "#10b981";
                            statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> ALL SEMESTER FEES CLEARED';
                        } else {
                            statusBadge.style.color = "#ef4444";
                            statusBadge.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> OUTSTANDING CHALLANS NEED ACTION';
                        }
                    }

                    if (activeTab === "transactions") {
                        if (cardTitle) cardTitle.innerHTML = '<i class="fa-solid fa-list-check"></i> Semester Fee Payments History';
                        header.innerHTML = \`
                            <tr>
                                <th style="padding:15px 10px;">Receipt No</th>
                                <th style="padding:15px 10px;">Semester</th>
                                <th style="padding:15px 10px;">Description</th>
                                <th style="padding:15px 10px;">Date Paid</th>
                                <th style="padding:15px 10px;">Amount</th>
                                <th style="padding:15px 10px;">Action</th>
                            </tr>
                        \`;

                        tbody.innerHTML = receiptsList.map(r => \`
                            <tr>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">\${r.receiptNo}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${r.sem}</td>
                                <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">\${r.desc}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${r.date}</td>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">\${r.amount}</td>
                                <td style="padding:15px 10px;"><button class="btn btn-secondary btn-sm" onclick="downloadReceiptPdf('\${r.receiptNo}')" style="height:28px; font-size:11px; gap:4px;"><i class="fa-solid fa-download"></i> Receipt</button></td>
                            </tr>
                        \`).join("");
                    } else {
                        if (cardTitle) cardTitle.innerHTML = '<i class="fa-solid fa-file-invoice-dollar"></i> Outstanding Demands & Fee Challans';
                        header.innerHTML = \`
                            <tr>
                                <th style="padding:15px 10px;">Challan ID</th>
                                <th style="padding:15px 10px;">Semester</th>
                                <th style="padding:15px 10px;">Description</th>
                                <th style="padding:15px 10px;">Due Date</th>
                                <th style="padding:15px 10px;">Amount Due</th>
                                <th style="padding:15px 10px;">Action</th>
                            </tr>
                        \`;

                        if (demandsList.length === 0) {
                            tbody.innerHTML = \`<tr><td colspan="6" style="padding:40px; text-align:center; color:var(--text-secondary); font-size:12px;"><i class="fa-solid fa-circle-check" style="font-size:24px; color:#10b981; margin-bottom:10px; display:block;"></i> All upcoming semester demands cleared. No pending challans.</td></tr>\`;
                            return;
                        }

                        tbody.innerHTML = demandsList.map(d => \`
                            <tr>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">CHLN-\${d.id.toUpperCase()}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${d.sem}</td>
                                <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">\${d.desc}</td>
                                <td style="font-size:12px; color:#ef4444; font-weight:600; padding:15px 10px;">\${d.dueDate}</td>
                                <td style="font-weight:700; color:var(--accent); padding:15px 10px;">\${d.amount}</td>
                                <td style="padding:15px 10px;"><button class="btn btn-primary btn-sm" onclick="openPaymentWizard('\${d.id}', '\${d.desc.replace(/'/g, "\\\\'")}', '\${d.amount}')" style="height:28px; font-size:11px;">Pay Challan</button></td>
                            </tr>
                        \`).join("");
                    }
                };

                window.downloadReceiptPdf = function(rcpt) {
                    alert("Downloading secure e-Receipt voucher details for " + rcpt + "...");
                };

                window.openPaymentWizard = function(id, title, amt) {
                    activePayId = id;
                    const modal = document.getElementById("paymentWizardModal");
                    const modalTitle = document.getElementById("payModalItemTitle");
                    const modalAmt = document.getElementById("payModalItemAmount");
                    const detailsInput = document.getElementById("paymentDetailsInput");

                    if (modal && modalTitle && modalAmt) {
                        modalTitle.textContent = title;
                        modalAmt.textContent = amt;
                        if (detailsInput) detailsInput.value = "";
                        modal.style.display = "flex";
                    }
                };

                window.closePaymentWizard = function() {
                    const modal = document.getElementById("paymentWizardModal");
                    if (modal) modal.style.display = "none";
                };

                window.confirmFeePayment = function() {
                    const details = document.getElementById("paymentDetailsInput").value.trim();
                    if (!details) {
                        alert("Please enter UPI ID or Card details to authenticate secure transaction!");
                        return;
                    }

                    const payBtn = document.getElementById("confirmPayBtn");
                    if (payBtn) {
                        payBtn.disabled = true;
                        payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating secure payment...';
                    }

                    setTimeout(() => {
                        const demandsList = getDemands();
                        const receiptsList = getReceipts();

                        const matchIndex = demandsList.findIndex(d => d.id === activePayId);
                        if (matchIndex !== -1) {
                            const matched = demandsList[matchIndex];
                            
                            // Remove from demands
                            demandsList.splice(matchIndex, 1);
                            saveDemands(demandsList);

                            // Add to receipts
                            receiptsList.unshift({
                                receiptNo: "RCPT-2026-" + Math.floor(Math.random() * 9000 + 1000),
                                sem: matched.sem,
                                desc: matched.desc,
                                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                amount: matched.amount
                            });
                            saveReceipts(receiptsList);
                        }

                        if (payBtn) {
                            payBtn.disabled = false;
                            payBtn.textContent = "Confirm Secure Payment";
                        }

                        closePaymentWizard();
                        renderFeeBoard();
                        alert("Secure payment successfully processed! Transaction record receipt issued.");
                    }, 1800);
                };

                // Initial render
                renderFeeBoard();
            });
        `
    },
    {
        id: "applications",
        dir: "student/services/applications",
        title: "Applications",
        icon: "fa-file-invoice",
        category: "Services",
        htmlContent: `
            <div class="applications-card glassmorphism">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:25px; flex-wrap:wrap; gap:15px;">
                    <div>
                        <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-file-invoice"></i> ERP Request Applications</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Select a template, customize request details, and submit for advisor approval.</p>
                    </div>

                    <!-- Dropdown for template types -->
                    <div style="display:flex; gap:10px; align-items:center;">
                        <select id="applicationTemplateSelect" class="form-input" style="width:220px; height:36px; padding:0 10px; border-radius:6px; font-size:12px; background:var(--bg-secondary); cursor:pointer;">
                            <option value="" disabled selected>-- Select Request Template --</option>
                            <option value="half_day">Half Day Leave</option>
                            <option value="full_day">Full Day Leave</option>
                            <option value="without_uniform">Without Uniform Entry</option>
                            <option value="lunch_permission">Lunch Time Exit Permission</option>
                            <option value="hostel_gatepass">Hostel Gatepass / Late entry</option>
                            <option value="semester_break">Semester Break Leave</option>
                        </select>
                        <button class="btn btn-primary btn-sm" onclick="draftSelectedApplication()" style="height:36px; gap:5px;"><i class="fa-solid fa-pen-to-square"></i> Draft Request</button>
                    </div>
                </div>

                <!-- Active Request Ledger Table -->
                <div class="table-responsive">
                    <table class="custom-table" style="width:100%;">
                        <thead>
                            <tr>
                                <th style="padding:15px 10px;">Ref ID</th>
                                <th style="padding:15px 10px;">Application Type / Subject</th>
                                <th style="padding:15px 10px;">Date Requested</th>
                                <th style="padding:15px 10px;">Status</th>
                                <th style="padding:15px 10px;">Approver</th>
                            </tr>
                        </thead>
                        <tbody id="applicationsTableBody">
                            <!-- Dynamic rows loaded here -->
                        </tbody>
                    </table>
                </div>

                <!-- Custom Application Drafter Modal -->
                <div id="applicationDraftModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px); z-index:1000; justify-content:center; align-items:center; transition: all 0.3s ease;">
                    <div class="glassmorphism" style="width:620px; padding:35px; border-radius:16px; border:1px solid rgba(255,255,255,0.08); background:var(--bg-primary); box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; border-bottom:1px solid var(--border-color); padding-bottom:15px;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="width:36px; height:36px; border-radius:50%; background:rgba(236,72,153,0.1); display:flex; align-items:center; justify-content:center;">
                                    <i class="fa-solid fa-file-pen" style="color:var(--accent); font-size:16px;"></i>
                                </div>
                                <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--text-primary);" id="draftModalHeaderTitle">Draft ERP Application</h3>
                            </div>
                            <button onclick="closeDraftModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:22px; cursor:pointer; transition:color 0.2s;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='var(--text-secondary)'"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        
                        <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:25px;">
                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                                <div>
                                    <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:8px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Submit To Authority</label>
                                    <select id="appRecipientSelect" class="form-input" onchange="updateDraftRecipientSalutation()" style="width:100%; padding:12px 15px; border-radius:8px; font-size:13px; border:1px solid var(--border-color); background:var(--bg-tertiary); color:var(--text-primary); font-weight:600; cursor:pointer;">
                                        <option value="Mentor (Dr. A. Verma)">Mentor (Dr. A. Verma)</option>
                                        <option value="HOD (Dr. S. K. Gupta)">HOD (Dr. S. K. Gupta)</option>
                                        <option value="Professor (Prof. S. Sharma)">Professor (Prof. S. Sharma)</option>
                                        <option value="Registrar (Prof. D. Sen)">Registrar (Prof. D. Sen)</option>
                                        <option value="Admin Department">Admin Department</option>
                                        <option value="Vice Chancellor (Dr. R. Mishra)">Vice Chancellor (Dr. R. Mishra)</option>
                                        <option value="Fees Manager (Mr. P. Joshi)">Fees Manager (Mr. P. Joshi)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:8px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Application Subject</label>
                                    <input type="text" id="appSubjectInput" class="form-input" style="width:100%; padding:12px 15px; border-radius:8px; font-size:13px; border:1px solid var(--border-color); background:rgba(0,0,0,0.1); color:var(--text-primary); font-weight:600; transition: border-color 0.2s, box-shadow 0.2s;" onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.15)'" onblur="this.style.borderColor='var(--border-color)'; this.style.boxShadow='none'">
                                </div>
                            </div>
                            <div>
                                <label style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:8px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Modify Letter Body Content</label>
                                <textarea id="appBodyTextarea" class="form-input" rows="14" style="width:100%; height:280px; padding:15px; border-radius:8px; font-size:13px; line-height:1.6; border:1px solid var(--border-color); background:rgba(0,0,0,0.15); color:var(--text-primary); resize:none; font-family:'Courier New', Courier, monospace; transition: border-color 0.2s, box-shadow 0.2s;" onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.15)'" onblur="this.style.borderColor='var(--border-color)'; this.style.boxShadow='none'"></textarea>
                            </div>
                        </div>

                        <div style="display:flex; gap:12px; justify-content:flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="closeDraftModal()" style="height:38px; padding:0 20px; font-weight:600;">Cancel</button>
                            <button class="btn btn-primary btn-sm" id="submitAppBtn" onclick="submitCustomApplication()" style="height:38px; padding:0 20px; font-weight:600; gap:8px;"><i class="fa-solid fa-paper-plane"></i> Submit ERP Application</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .applications-card {
                padding: 30px;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultApps = [
                    { refId: "REQ-8022", type: "Leave application for technical Hackathon", date: "Aug 22, 2026", status: "Approved", approver: "Dr. A. Verma" }
                ];

                const templates = {
                    half_day: {
                        subject: "Application for Half-Day Leave - CSE Department",
                        body: "To,\\nThe Head of Department,\\nComputer Science & Engineering,\\nUnifyEd.\\n\\nRespected Sir,\\n\\nI am writing to request permission for half-day leave on 2026-08-06. I need to leave from 01:00 PM onwards due to a family medical emergency.\\n\\nKindly approve my request.\\n\\nSincerely,\\nStudent (Section AI-1)"
                    },
                    full_day: {
                        subject: "Application for Full-Day Leave Permission",
                        body: "To,\\nThe Head of Department,\\nComputer Science & Engineering,\\nUnifyEd.\\n\\nRespected Sir,\\n\\nI am writing to request full-day leave on 2026-08-07 due to severe viral fever. I have been advised bed rest by my physician.\\n\\nKindly grant leave for the requested duration.\\n\\nSincerely,\\nStudent (Section AI-1)"
                    },
                    without_uniform: {
                        subject: "Request for Without-Uniform Entry Permission",
                        body: "To,\\nThe Discipline Committee,\\nUnifyEd.\\n\\nRespected Sir,\\n\\nI request permission to enter the campus without the official uniform on 2026-08-06 as my uniform got soiled and is currently sent for laundry.\\n\\nKindly allow entry for today.\\n\\nSincerely,\\nStudent (Section AI-1)"
                    },
                    lunch_permission: {
                        subject: "Request for Lunch Time Campus Exit Outpass",
                        body: "To,\\nThe Warden / Registrar,\\nUnifyEd.\\n\\nRespected Sir,\\n\\nI request permission to leave the college campus during lunch break (01:00 PM - 02:00 PM) on 2026-08-06 in order to visit the nearby bank branch for scholarship verification work.\\n\\nKindly issue a gatepass.\\n\\nSincerely,\\nStudent (Section AI-1)"
                    },
                    hostel_gatepass: {
                        subject: "Application for Late Entry Hostel Gatepass Approval",
                        body: "To,\\nThe Chief Warden,\\nUnifyEd Hostels.\\n\\nRespected Sir,\\n\\nI request permission for late entry into the hostel campus on 2026-08-08 (up to 09:30 PM) as I am attending my capstone lab simulation tests at the main block.\\n\\nKindly approve.\\n\\nSincerely,\\nStudent (Hostel Block A)"
                    },
                    semester_break: {
                        subject: "Application for Outstation Travel during Semester Break",
                        body: "To,\\nThe Head of Department,\\nComputer Science & Engineering,\\nUnifyEd.\\n\\nRespected Sir,\\n\\nI am applying for a semester break outstation leave from 2026-08-15 to 2026-08-20 to visit my hometown. I will resume regular lab activities immediately on the 21st.\\n\\nKindly register my outstation duration.\\n\\nSincerely,\\nStudent (Section AI-1)"
                    }
                };

                let selectedTemplateCode = null;

                function getApps() {
                    const saved = localStorage.getItem("erp_applications");
                    if (saved) return JSON.parse(saved);
                    return defaultApps;
                }

                function saveApps(list) {
                    localStorage.setItem("erp_applications", JSON.stringify(list));
                }

                window.renderApps = function() {
                    const tbody = document.getElementById("applicationsTableBody");
                    if (!tbody) return;

                    const list = getApps();
                    tbody.innerHTML = list.map(item => \`
                        <tr>
                            <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">\${item.refId}</td>
                            <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">\${item.type}</td>
                            <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${item.date}</td>
                            <td style="padding:15px 10px;"><span class="badge \${item.status === 'Approved' ? 'badge-success' : 'badge-warning'}">\${item.status}</span></td>
                            <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${item.approver}</td>
                        </tr>
                    \`).join("");
                };

                window.updateDraftRecipientSalutation = function() {
                    const recipientSelect = document.getElementById("appRecipientSelect");
                    const bodyArea = document.getElementById("appBodyTextarea");
                    if (!recipientSelect || !bodyArea) return;

                    const recipient = recipientSelect.value;
                    const body = bodyArea.value.replace(/\\r\\n/g, "\\n");

                    let salutationAuthority = "The Head of Department,\\nComputer Science & Engineering";
                    if (recipient.includes("Mentor")) {
                        salutationAuthority = "The Mentor (Dr. A. Verma)";
                    } else if (recipient.includes("HOD")) {
                        salutationAuthority = "The Head of Department,\\nComputer Science & Engineering";
                    } else if (recipient.includes("Professor")) {
                        salutationAuthority = "Prof. S. Sharma,\\nComputer Science & Engineering";
                    } else if (recipient.includes("Registrar")) {
                        salutationAuthority = "The Registrar";
                    } else if (recipient.includes("Admin")) {
                        salutationAuthority = "The Administration Office";
                    } else if (recipient.includes("Vice Chancellor")) {
                        salutationAuthority = "The Vice Chancellor";
                    } else if (recipient.includes("Fees Manager")) {
                        salutationAuthority = "The Finance & Fees Accounts Manager";
                    }

                    const standardSalutationPrefix = "To,\\n" + salutationAuthority + ",\\nUnifyEd.\\n\\nRespected Sir/Madam,\\n\\n";
                    
                    let mainMessage = body;
                    const markerIndices = [
                        body.indexOf("Respected Sir/Madam,\\n\\n"),
                        body.indexOf("Respected Sir,\\n\\n"),
                        body.indexOf("Respected Madam,\\n\\n"),
                    ];
                    
                    let foundIndex = -1;
                    let markerLength = 0;
                    for (let idx of markerIndices) {
                        if (idx !== -1) {
                            foundIndex = idx;
                            markerLength = 22;
                            break;
                        }
                    }

                    if (foundIndex === -1) {
                        const altIdx = body.indexOf("Respected Sir,\\n\\n");
                        if (altIdx !== -1) {
                            foundIndex = altIdx;
                            markerLength = 17;
                        }
                    }

                    if (foundIndex !== -1) {
                        mainMessage = body.substring(foundIndex + markerLength);
                    } else {
                        const lines = body.split("\\n");
                        if (lines.length > 5 && lines[0].startsWith("To,")) {
                            mainMessage = lines.slice(6).join("\\n");
                        }
                    }

                    bodyArea.value = standardSalutationPrefix + mainMessage;
                };

                window.draftSelectedApplication = function() {
                    const select = document.getElementById("applicationTemplateSelect");
                    if (!select || !select.value) {
                        alert("Please select an application template from the dropdown list first!");
                        return;
                    }

                    selectedTemplateCode = select.value;
                    const template = templates[selectedTemplateCode];

                    const modal = document.getElementById("applicationDraftModal");
                    const header = document.getElementById("draftModalHeaderTitle");
                    const subjectInput = document.getElementById("appSubjectInput");
                    const bodyArea = document.getElementById("appBodyTextarea");

                    if (modal && template && subjectInput && bodyArea) {
                        header.textContent = "Draft: " + select.options[select.selectedIndex].text;
                        subjectInput.value = template.subject;
                        bodyArea.value = template.body;
                        
                        // Set recipient dropdown to HOD by default for leaves, or VC etc if appropriate
                        const recipientSelect = document.getElementById("appRecipientSelect");
                        if (recipientSelect) {
                            if (selectedTemplateCode === "half_day" || selectedTemplateCode === "full_day") {
                                recipientSelect.value = "HOD (Dr. S. K. Gupta)";
                            } else if (selectedTemplateCode === "without_uniform") {
                                recipientSelect.value = "Admin Department";
                            } else if (selectedTemplateCode === "lunch_permission") {
                                recipientSelect.value = "Registrar (Prof. D. Sen)";
                            } else {
                                recipientSelect.value = "Mentor (Dr. A. Verma)";
                            }
                        }
                        
                        updateDraftRecipientSalutation();
                        modal.style.display = "flex";
                    }
                };

                window.closeDraftModal = function() {
                    const modal = document.getElementById("applicationDraftModal");
                    if (modal) modal.style.display = "none";
                    selectedTemplateCode = null;
                };

                window.submitCustomApplication = function() {
                    const recipientVal = document.getElementById("appRecipientSelect").value;
                    const subjectVal = document.getElementById("appSubjectInput").value.trim();
                    const bodyVal = document.getElementById("appBodyTextarea").value.trim();

                    if (!subjectVal || !bodyVal) {
                        alert("Application subject and body contents cannot be empty!");
                        return;
                    }

                    const submitBtn = document.getElementById("submitAppBtn");
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
                    }

                    setTimeout(() => {
                        const list = getApps();
                        list.unshift({
                            refId: "REQ-" + Math.floor(Math.random() * 9000 + 1000),
                            type: subjectVal,
                            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            status: "Pending",
                            approver: recipientVal
                        });
                        saveApps(list);

                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = "Submit ERP Application";
                        }

                        closeDraftModal();
                        renderApps();
                        
                        document.getElementById("applicationTemplateSelect").selectedIndex = 0;
                        alert("ERP application submitted successfully for review!");
                    }, 1200);
                };

                // Initial render
                renderApps();
            });
        `
    },
    {
        id: "certificates",
        dir: "student/services/certificates",
        title: "Certificates",
        icon: "fa-certificate",
        category: "Services",
        htmlContent: `
            <div class="certificates-container">
                <!-- Page Header -->
                <div style="border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:25px;">
                    <h2 style="margin:0; font-size:18px; font-weight:800; color:var(--text-primary);"><i class="fa-solid fa-certificate"></i> Official Certificates & Credentials Registry</h2>
                    <p style="margin:5px 0 0 0; font-size:12px; color:var(--text-secondary);">Request, generate, and retrieve official university-signed credentials instantly.</p>
                </div>

                <!-- Certificates Grid -->
                <div class="cert-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
                    
                    <!-- Card 1: Bonafide -->
                    <div class="cert-item glassmorphism" style="padding:25px; border-radius:12px; border:1px solid var(--border-color); display:flex; flex-direction:column; justify-content:space-between; height:180px;">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                                <i class="fa-solid fa-file-contract" style="font-size:24px; color:var(--primary);"></i>
                                <span class="badge badge-success" style="font-size:9px;">Instant Generate</span>
                            </div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block; margin-bottom:5px;">Bonafide Student Certificate</strong>
                            <p style="font-size:12px; color:var(--text-secondary); line-height:1.4; margin:0;">Validates active enrollment, enrollment number, and course duration details at UnifyEd.</p>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="triggerCertGeneration('Bonafide Student Certificate', 'enrollment')" style="width:100%; height:34px; font-size:11px;">Generate & Download</button>
                    </div>

                    <!-- Card 2: NOC -->
                    <div class="cert-item glassmorphism" style="padding:25px; border-radius:12px; border:1px solid var(--border-color); display:flex; flex-direction:column; justify-content:space-between; height:180px;">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                                <i class="fa-solid fa-building-shield" style="font-size:24px; color:var(--accent);"></i>
                                <span class="badge badge-success" style="font-size:9px;">Instant Generate</span>
                            </div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block; margin-bottom:5px;">No Objection Certificate (NOC)</strong>
                            <p style="font-size:12px; color:var(--text-secondary); line-height:1.4; margin:0;">Required for enrolling in external off-campus technical training, internships, or industrial vivas.</p>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="triggerCertGeneration('No Objection Certificate (NOC)', 'internship')" style="width:100%; height:34px; font-size:11px;">Generate & Download</button>
                    </div>

                    <!-- Card 3: Fee Structure -->
                    <div class="cert-item glassmorphism" style="padding:25px; border-radius:12px; border:1px solid var(--border-color); display:flex; flex-direction:column; justify-content:space-between; height:180px;">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                                <i class="fa-solid fa-file-invoice-dollar" style="font-size:24px; color:#10b981;"></i>
                                <span class="badge badge-success" style="font-size:9px;">Instant Generate</span>
                            </div>
                            <strong style="font-size:15px; color:var(--text-primary); display:block; margin-bottom:5px;">Fee Structure Estimation</strong>
                            <p style="font-size:12px; color:var(--text-secondary); line-height:1.4; margin:0;">Official cost breakdown statement of tuition and hostel fees for educational loan disbursement processing.</p>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="triggerCertGeneration('Fee Structure Estimation', 'fees')" style="width:100%; height:34px; font-size:11px;">Generate & Download</button>
                    </div>

                </div>

                <!-- Certificate Generation Loader Modal -->
                <div id="certGenModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:520px; padding:35px; border-radius:16px; border:1px solid var(--border-color); background:var(--bg-primary); text-align:center;">
                        <!-- Close Button -->
                        <div style="display:flex; justify-content:flex-end; margin-bottom:10px;">
                            <button onclick="closeCertModal()" id="certCloseBtn" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer; display:none;"><i class="fa-solid fa-xmark"></i></button>
                        </div>

                        <!-- Spinner Section -->
                        <div id="certGenSpinner">
                            <i class="fa-solid fa-spinner fa-spin-pulse" style="font-size:42px; color:var(--primary); margin-bottom:20px;"></i>
                            <h3 style="margin:0 0 10px 0; font-size:16px; font-weight:800; color:var(--text-primary);" id="certStatusHeader">Initializing Document Compilation...</h3>
                            <div style="width:100%; height:4px; background:var(--bg-tertiary); border-radius:10px; overflow:hidden; margin:20px 0;">
                                <div id="certProgressBar" style="width:0%; height:100%; background:var(--primary); transition: width 0.3s;"></div>
                            </div>
                            <span style="font-size:11px; color:var(--text-secondary);" id="certStepLabel">Contacting credentials authority...</span>
                        </div>

                        <!-- Preview Section -->
                        <div id="certGenPreview" style="display:none; text-align:left;">
                            <div style="width:36px; height:36px; border-radius:50%; background:rgba(16,185,129,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:15px;">
                                <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:18px;"></i>
                            </div>
                            <h3 style="margin:0 0 5px 0; font-size:16px; font-weight:800; color:var(--text-primary);">Credential Compiled Successfully</h3>
                            <span style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:20px;">Your secure digital document is ready for retrieval.</span>

                            <!-- Mock Document Canvas Card -->
                            <div style="background:rgba(255,255,255,0.01); border:1px dashed var(--border-color); padding:20px; border-radius:8px; margin-bottom:25px; font-family:monospace; font-size:11px; line-height:1.6; color:var(--text-secondary);">
                                <div style="text-align:center; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:12px;">
                                    <strong style="color:var(--text-primary); font-size:12px;">UNIVERSITY OF ENGINEERING & MANAGEMENT</strong>
                                    <span style="display:block; font-size:10px;">Jaipur Campus Credentials Registry</span>
                                </div>
                                <span style="display:block;"><strong style="color:var(--text-primary);">Document:</strong> <span id="previewCertTitle">Bonafide Student Certificate</span></span>
                                <span style="display:block;"><strong style="color:var(--text-primary);">Date Issued:</strong> <span id="previewCertDate">Just Now</span></span>
                                <span style="display:block;"><strong style="color:var(--text-primary);">Signature Hash:</strong> SHA256-D7A49B...F2B4</span>
                                <span style="display:block; margin-top:8px; color:var(--text-primary); font-weight:700;">Status: SIGNED & SECURED</span>
                            </div>

                            <button class="btn btn-primary btn-sm" onclick="downloadCompiledCertFile()" style="width:100%; height:40px; font-weight:700; gap:8px;"><i class="fa-solid fa-file-pdf"></i> Download Secure e-Document</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .cert-item {
                transition: transform 0.2s, border-color 0.2s;
            }
            .cert-item:hover {
                transform: translateY(-2px);
                border-color: var(--primary) !important;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                let currentCertTitle = "";
                let genSteps = [
                    { pct: 25, label: "Validating student registration parameters..." },
                    { pct: 55, label: "Checking outstanding clearance registers..." },
                    { pct: 85, label: "Signing digital credentials with UnifyEd Registrar credentials..." },
                    { pct: 100, label: "Compiling e-Certificate secure PDF..." }
                ];

                window.triggerCertGeneration = function(title, code) {
                    currentCertTitle = title;

                    const modal = document.getElementById("certGenModal");
                    const spinner = document.getElementById("certGenSpinner");
                    const preview = document.getElementById("certGenPreview");
                    const closeBtn = document.getElementById("certCloseBtn");
                    const progressBar = document.getElementById("certProgressBar");
                    const statusHeader = document.getElementById("certStatusHeader");
                    const stepLabel = document.getElementById("certStepLabel");

                    if (!modal) return;

                    modal.style.display = "flex";
                    if (spinner) spinner.style.display = "block";
                    if (preview) preview.style.display = "none";
                    if (closeBtn) closeBtn.style.display = "none";
                    if (progressBar) progressBar.style.width = "0%";

                    let stepIndex = 0;
                    function runGenStep() {
                        if (stepIndex < genSteps.length) {
                            const step = genSteps[stepIndex];
                            if (progressBar) progressBar.style.width = step.pct + "%";
                            if (statusHeader) statusHeader.textContent = step.label;
                            if (stepLabel) stepLabel.textContent = "Step " + (stepIndex + 1) + " of " + genSteps.length;
                            stepIndex++;
                            setTimeout(runGenStep, 600);
                        } else {
                            if (spinner) spinner.style.display = "none";
                            if (preview) {
                                preview.style.display = "block";
                                document.getElementById("previewCertTitle").textContent = currentCertTitle;
                                document.getElementById("previewCertDate").textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                            }
                            if (closeBtn) closeBtn.style.display = "block";
                        }
                    }

                    setTimeout(runGenStep, 400);
                };

                window.closeCertModal = function() {
                    const modal = document.getElementById("certGenModal");
                    if (modal) modal.style.display = "none";
                };

                window.downloadCompiledCertFile = function() {
                    alert("Downloading compiled credentials vault PDF: " + currentCertTitle + "...");
                    closeCertModal();
                };
            });
        `
    },
    {
        id: "transport",
        dir: "student/services/transport",
        title: "Transport",
        icon: "fa-bus",
        category: "Services",
        htmlContent: `
            <div class="transport-card glassmorphism">
                <h3>Bus Transport Routes & Details</h3>
                <div class="details-box" style="margin-top: 20px; padding: 20px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
                    <strong>Bus Card Status: <span class="text-danger">Not Subscribed</span></strong>
                    <p style="margin-top: 10px; font-size:13px; color: var(--text-secondary);">Apply for a monthly/yearly college transport card to access standard bus routes sweeping Jaipur and Sikar routes.</p>
                    <button class="btn btn-primary btn-sm" style="margin-top: 15px;" onclick="alert('Subscription forms loading...')">Apply for Bus Route Pass</button>
                </div>
            </div>
        `,
        cssContent: `
            .transport-card {
                padding: 30px;
            }
            .transport-card h3 {
                font-size: 18px;
                color: var(--accent);
            }
        `,
        jsContent: `
            console.log("Transport Module Loaded");
        `
    },
    {
        id: "library",
        dir: "student/services/library",
        title: "Library Portal",
        icon: "fa-book",
        category: "Services",
        htmlContent: `
            <div class="library-container">
                <!-- Main Header Statistics -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-bottom:25px;">
                    <div class="glassmorphism" style="border-left:4px solid var(--primary); padding:20px; text-align:left;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Borrowed Volumes</span>
                        <h2 style="margin:8px 0; font-size:26px; font-weight:800; color:var(--text-primary);" id="borrowedCountLabel">1</h2>
                        <span style="font-size:11px; color:var(--text-secondary);"><i class="fa-solid fa-circle-exclamation" style="color:var(--accent);"></i> Limit: Maximum 3 simultaneous issues.</span>
                    </div>

                    <div class="glassmorphism" style="border-left:4px solid #ef4444; padding:20px; text-align:left; display:flex; flex-direction:column; justify-content:center;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Outstanding Fine</span>
                        <h2 style="margin:8px 0; font-size:26px; font-weight:800; color:#ef4444;">₹ 0.00</h2>
                        <span style="font-size:11px; color:#10b981; font-weight:700;"><i class="fa-solid fa-circle-check"></i> NO PAST OVERDUE FINES</span>
                    </div>
                </div>

                <!-- Tab Navigation Switcher -->
                <div style="display:flex; gap:10px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
                    <button class="filter-btn active" onclick="setLibraryTab('borrowed')" id="tabBorrowedBtn" style="height:34px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--primary); color:#fff; border:none; outline:none;">My Borrowed Books</button>
                    <button class="filter-btn" onclick="setLibraryTab('catalog')" id="tabCatalogBtn" style="height:34px; padding:0 15px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none;">Search University Catalog</button>
                </div>

                <!-- Borrowed Panel -->
                <div class="library-card glassmorphism" id="borrowedSection" style="padding:30px;">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-book-open"></i> Checked-Out Volumes & Renewals</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Manage physical books checked out from the central campus block.</p>
                    </div>

                    <div class="table-responsive">
                        <table class="custom-table" style="width:100%;">
                            <thead>
                                <tr>
                                    <th style="padding:15px 10px;">Accession No</th>
                                    <th style="padding:15px 10px;">Book Title</th>
                                    <th style="padding:15px 10px;">Issue Date</th>
                                    <th style="padding:15px 10px;">Due Date</th>
                                    <th style="padding:15px 10px;">Status / Action</th>
                                </tr>
                            </thead>
                            <tbody id="borrowedBooksTableBody">
                                <!-- Dynamic checkouts -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Search Catalog Panel -->
                <div class="library-card glassmorphism" id="catalogSection" style="display:none; padding:30px;">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-magnifying-glass"></i> Central Library Catalog Finder</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Check real-time shelf availability and pre-reserve reference materials.</p>
                    </div>

                    <!-- Search controls -->
                    <div style="display:flex; gap:10px; align-items:center; margin-bottom:25px;">
                        <input type="text" id="catalogSearchQuery" class="form-input" placeholder="Search by Book Title, Subject Area, or Author..." style="flex:1; height:38px; font-size:12px; border-radius:6px;" onkeydown="if(event.key === 'Enter') executeCatalogSearch()">
                        <button class="btn btn-primary btn-sm" onclick="executeCatalogSearch()" style="height:38px; gap:6px;"><i class="fa-solid fa-magnifying-glass"></i> Find Books</button>
                    </div>

                    <!-- Catalog Results -->
                    <div id="catalogSearchResults" style="display:flex; flex-direction:column; gap:12px;">
                        <!-- Dynamic matches -->
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .library-card {
                padding: 30px;
            }
            .filter-btn {
                transition: all 0.3s;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultBorrowed = [
                    { accNo: "LIB-7890", title: "Introduction to Artificial Neural Networks", issueDate: "2026-08-01", dueDate: "2026-08-15", status: "Active", renewed: false }
                ];

                const libraryCatalog = [
                    { id: "cat_vlsi", title: "CMOS VLSI Design: A Circuits and Systems Perspective", author: "Neil Weste", subject: "VLSI", shelf: "Rack A-14", copies: 4, reserved: false },
                    { id: "cat_robotics", title: "Robot Modeling and Control", author: "Mark W. Spong", subject: "Robotics", shelf: "Rack B-03", copies: 1, reserved: false },
                    { id: "cat_db", title: "Database System Concepts", author: "Silberschatz", subject: "Database", shelf: "Rack C-09", copies: 8, reserved: false },
                    { id: "cat_nn", title: "Neural Networks and Learning Machines", author: "Simon Haykin", subject: "Neural Networks", shelf: "Rack D-11", copies: 0, reserved: false }
                ];

                let currentTab = "borrowed";

                function getBorrowed() {
                    const saved = localStorage.getItem("lib_borrowed");
                    if (saved) return JSON.parse(saved);
                    return defaultBorrowed;
                }

                function saveBorrowed(list) {
                    localStorage.setItem("lib_borrowed", JSON.stringify(list));
                }

                function getCatalog() {
                    const saved = localStorage.getItem("lib_catalog");
                    if (saved) return JSON.parse(saved);
                    return libraryCatalog;
                }

                function saveCatalog(list) {
                    localStorage.setItem("lib_catalog", JSON.stringify(list));
                }

                window.setLibraryTab = function(tab) {
                    currentTab = tab;
                    const borrowedBtn = document.getElementById("tabBorrowedBtn");
                    const catalogBtn = document.getElementById("tabCatalogBtn");
                    const borrowedSec = document.getElementById("borrowedSection");
                    const catalogSec = document.getElementById("catalogSection");

                    if (borrowedBtn && catalogBtn && borrowedSec && catalogSec) {
                        if (tab === "borrowed") {
                            borrowedBtn.style.background = "var(--primary)";
                            borrowedBtn.style.color = "#fff";
                            borrowedBtn.style.borderColor = "var(--primary)";
                            catalogBtn.style.background = "var(--bg-tertiary)";
                            catalogBtn.style.color = "var(--text-secondary)";
                            catalogBtn.style.borderColor = "var(--border-color)";
                            borrowedSec.style.display = "block";
                            catalogSec.style.display = "none";
                        } else {
                            catalogBtn.style.background = "var(--primary)";
                            catalogBtn.style.color = "#fff";
                            catalogBtn.style.borderColor = "var(--primary)";
                            borrowedBtn.style.background = "var(--bg-tertiary)";
                            borrowedBtn.style.color = "var(--text-secondary)";
                            borrowedBtn.style.borderColor = "var(--border-color)";
                            catalogSec.style.display = "block";
                            borrowedSec.style.display = "none";
                            executeCatalogSearch();
                        }
                    }
                    renderLibraryData();
                };

                window.renderLibraryData = function() {
                    const borrowedTbody = document.getElementById("borrowedBooksTableBody");
                    const countLabel = document.getElementById("borrowedCountLabel");

                    if (!borrowedTbody) return;

                    const borrowedList = getBorrowed();
                    if (countLabel) countLabel.textContent = borrowedList.length;

                    if (borrowedList.length === 0) {
                        borrowedTbody.innerHTML = \`<tr><td colspan="5" style="padding:40px; text-align:center; color:var(--text-secondary); font-size:12px;"><i class="fa-solid fa-book-open" style="font-size:24px; color:var(--text-tertiary); margin-bottom:10px; display:block;"></i> No books currently borrowed from the central blocks.</td></tr>\`;
                    } else {
                        borrowedTbody.innerHTML = borrowedList.map(item => \`
                            <tr>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">\${item.accNo}</td>
                                <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">\${item.title}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${item.issueDate}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">\${item.dueDate}</td>
                                <td style="padding:15px 10px; display:flex; gap:8px; align-items:center;">
                                    <span class="badge badge-success" style="font-size:10px;">Active</span>
                                    \${!item.renewed ? 
                                        \`<button class="btn btn-secondary btn-sm" id="renewBtn_\${item.accNo}" onclick="renewBorrowedBook('\${item.accNo}')" style="height:26px; padding:0 12px; font-size:10px;">Renew</button>\` :
                                        \`<span style="font-size:10px; color:var(--text-tertiary);"><i class="fa-solid fa-check"></i> Renewed</span>\`
                                    }
                                </td>
                            </tr>
                        \`).join("");
                    }
                };

                window.renewBorrowedBook = function(accNo) {
                    const btn = document.getElementById("renewBtn_" + accNo);
                    if (btn) {
                        btn.disabled = true;
                        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                    }

                    setTimeout(() => {
                        const borrowedList = getBorrowed();
                        const match = borrowedList.find(b => b.accNo === accNo);
                        if (match) {
                            match.renewed = true;
                            const oldDue = new Date(match.dueDate);
                            oldDue.setDate(oldDue.getDate() + 14);
                            match.dueDate = oldDue.toISOString().split("T")[0];
                        }
                        saveBorrowed(borrowedList);
                        renderLibraryData();
                        alert("Book registration successfully renewed for 14 additional days!");
                    }, 1200);
                };

                window.executeCatalogSearch = function() {
                    const input = document.getElementById("catalogSearchQuery");
                    const results = document.getElementById("catalogSearchResults");
                    if (!results) return;

                    const query = input ? input.value.trim().toLowerCase() : "";
                    const list = getCatalog();
                    const filtered = list.filter(item => item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query) || item.subject.toLowerCase().includes(query));

                    if (filtered.length === 0) {
                        results.innerHTML = \`<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:12px;"><i class="fa-solid fa-circle-question" style="font-size:24px; color:var(--text-tertiary); margin-bottom:10px; display:block;"></i> No matching books found in central shelves. Try checking spelling parameters.</div>\`;
                        return;
                    }

                    results.innerHTML = filtered.map(item => \`
                        <div style="padding:15px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; margin-bottom: 8px;">
                            <div>
                                <strong style="font-size:13px; color:var(--text-primary); display:block; margin-bottom:2px;">\${item.title}</strong>
                                <span style="font-size:11px; color:var(--text-secondary);">Author: \${item.author} • Subject: \${item.subject} • Location: \${item.shelf}</span>
                            </div>
                            <div>
                                \${item.reserved ? 
                                    \`<span class="badge badge-success" style="font-size:10px;"><i class="fa-solid fa-circle-check"></i> Pre-Reserved</span>\` :
                                    (item.copies > 0 ? 
                                        \`<button class="btn btn-primary btn-sm" onclick="reserveCatalogBook('\${item.id}')" style="height:32px; font-size:10px;">Reserve Copy</button>\` :
                                        \`<button class="btn btn-secondary btn-sm" disabled style="height:32px; font-size:10px; opacity:0.5;">Out of Stock</button>\`
                                    )
                                }
                            </div>
                        </div>
                    \`).join("");
                };

                window.reserveCatalogBook = function(id) {
                    const list = getCatalog();
                    const match = list.find(b => b.id === id);
                    if (match && match.copies > 0) {
                        match.reserved = true;
                        match.copies--;
                    }
                    saveCatalog(list);
                    executeCatalogSearch();
                    alert("Book copy successfully reserved! Please collect from central library block within 24 hours.");
                };

                // Initial render
                renderLibraryData();
            });
        `
    },
    {
        id: "career",
        dir: "student/career",
        title: "Career & Placement",
        icon: "fa-briefcase",
        category: "Services",
        htmlContent: `
            <div class="career-container">
                <!-- Page Statistics -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-bottom:25px;">
                    <div class="glassmorphism" style="border-left:4px solid #10b981; padding:20px; text-align:left;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Placement Status</span>
                        <h2 style="margin:8px 0; font-size:20px; font-weight:800; color:#10b981;"><i class="fa-solid fa-circle-check"></i> ELIGIBLE FOR DRIVES</h2>
                        <span style="font-size:11px; color:var(--text-secondary);">Criteria: No active backlogs & CGPA > 6.00</span>
                    </div>

                    <div class="glassmorphism" style="border-left:4px solid var(--primary); padding:20px; text-align:left; display:flex; flex-direction:column; justify-content:center;">
                        <span style="font-size:11px; color:var(--text-secondary); text-transform:uppercase; font-weight:700;">Registered Drives</span>
                        <h2 style="margin:8px 0; font-size:26px; font-weight:800; color:var(--text-primary);" id="registeredDrivesCount">0</h2>
                        <span style="font-size:11px; color:var(--text-secondary);">Applications sent for review.</span>
                    </div>
                </div>

                <!-- Job Openings Grid -->
                <div class="career-card glassmorphism">
                    <div style="border-bottom:1px solid var(--border-color); padding-bottom:15px; margin-bottom:20px;">
                        <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-briefcase"></i> Active Placement Drives</h3>
                        <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-secondary);">Register and apply for active campus drives approved by UnifyEd T&P Cell.</p>
                    </div>

                    <div class="job-list" id="jobOpeningsContainer" style="display: flex; flex-direction: column; gap: 15px;">
                        <!-- Dynamic job rows -->
                    </div>
                </div>

                <!-- Registration Modal -->
                <div id="driveRegisterModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:1000; justify-content:center; align-items:center;">
                    <div class="glassmorphism" style="width:480px; padding:30px; border-radius:12px; border:1px solid var(--border-color); background:var(--bg-primary);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                            <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--accent);">Placement Eligibility Check</h3>
                            <button onclick="closeRegisterModal()" style="background:transparent; border:none; color:var(--text-secondary); font-size:20px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        
                        <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:20px; font-size:12px;">
                            <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:15px; border-radius:6px;">
                                <span style="font-size:10px; color:var(--text-secondary); display:block; margin-bottom:4px;">Drive Title:</span>
                                <strong style="font-size:13px; color:var(--text-primary);" id="modalDriveTitle">TCS Ninja</strong>
                                <span style="font-size:12px; color:var(--primary); display:block; margin-top:5px;" id="modalDrivePackage">Package: 3.6 LPA</span>
                            </div>

                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                                <div>
                                    <strong style="color:var(--text-secondary);">Student CGPA:</strong>
                                    <span style="display:block; font-size:14px; font-weight:700; color:var(--text-primary);">9.42 / 10.00</span>
                                </div>
                                <div>
                                    <strong style="color:var(--text-secondary);">Active Backlogs:</strong>
                                    <span style="display:block; font-size:14px; font-weight:700; color:#10b981;">0 (No Backlogs)</span>
                                </div>
                            </div>

                            <div style="border-top:1px solid var(--border-color); padding-top:15px; display:flex; flex-direction:column; gap:8px;">
                                <div style="display:flex; justify-content:space-between;">
                                    <span>Academic Eligibility Status:</span>
                                    <span style="color:#10b981; font-weight:700;">Verified Class A</span>
                                </div>
                                <div style="display:flex; justify-content:space-between;">
                                    <span>T&P Clearance Check:</span>
                                    <span style="color:#10b981; font-weight:700;">Cleared (No Dues)</span>
                                </div>
                            </div>
                        </div>

                        <div style="display:flex; gap:12px; justify-content:flex-end;">
                            <button class="btn btn-secondary btn-sm" onclick="closeRegisterModal()">Cancel</button>
                            <button class="btn btn-primary btn-sm" id="confirmRegBtn" onclick="confirmDriveRegistration()">Confirm Registration</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        cssContent: `
            .career-card {
                padding: 30px;
            }
            .job-item {
                transition: transform 0.2s, border-color 0.2s;
            }
            .job-item:hover {
                transform: translateY(-2px);
                border-color: var(--primary) !important;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const defaultDrives = [
                    { id: "drv_tcs", title: "TCS - Ninja Hiring Drive (2026 Batch)", pos: "Associate Software Engineer", pkg: "3.6 LPA", reqCgpa: 6.0, reserved: false },
                    { id: "drv_cognizant", title: "Cognizant - GenC Elevate", pos: "Graduate Engineer Trainee", pkg: "4.2 LPA", reqCgpa: 6.5, reserved: false },
                    { id: "drv_wipro", title: "Wipro - Elite NLTH National Hunt", pos: "Project Engineer", pkg: "3.5 LPA", reqCgpa: 6.0, reserved: false },
                    { id: "drv_google", title: "Google - Software Engineering Intern (Summer 2027)", pos: "SWE Intern", pkg: "1.2 Lakhs / Month", reqCgpa: 8.0, reserved: false }
                ];

                let activeDriveId = null;

                function getDrives() {
                    const saved = localStorage.getItem("placement_drives");
                    if (saved) return JSON.parse(saved);
                    return defaultDrives;
                }

                function saveDrives(list) {
                    localStorage.setItem("placement_drives", JSON.stringify(list));
                }

                window.renderDrives = function() {
                    const container = document.getElementById("jobOpeningsContainer");
                    const countLabel = document.getElementById("registeredDrivesCount");
                    if (!container) return;

                    const list = getDrives();
                    const registeredCount = list.filter(d => d.reserved).length;
                    if (countLabel) countLabel.textContent = registeredCount;

                    container.innerHTML = list.map(item => \`
                        <div class="job-item" style="padding: 20px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; transition: transform 0.2s, border-color 0.2s;">
                            <div>
                                <strong style="font-size:14px; color:var(--text-primary); display:block; margin-bottom:4px;">\${item.title}</strong>
                                <span style="font-size:12px; color:var(--text-secondary); font-weight:500;">Position: \${item.pos} • Package: \${item.pkg} • Min CGPA: \${item.reqCgpa}</span>
                            </div>
                            <div>
                                \${item.reserved ? 
                                    \`<span class="badge badge-success" style="font-size:11px; padding:6px 12px; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Applied / Registered</span>\` :
                                    \`<button class="btn btn-primary btn-sm" onclick="openRegisterModal('\${item.id}', '\${item.title.replace(/'/g, "\\\\'")}', '\${item.pkg}')" style="height:32px; font-size:11px;">Register Drive</button>\`
                                }
                            </div>
                        </div>
                    \`).join("");
                };

                window.openRegisterModal = function(id, title, pkg) {
                    activeDriveId = id;
                    const modal = document.getElementById("driveRegisterModal");
                    const mTitle = document.getElementById("modalDriveTitle");
                    const mPkg = document.getElementById("modalDrivePackage");

                    if (modal && mTitle && mPkg) {
                        mTitle.textContent = title;
                        mPkg.textContent = "Package Offer: " + pkg;
                        modal.style.display = "flex";
                    }
                };

                window.closeRegisterModal = function() {
                    const modal = document.getElementById("driveRegisterModal");
                    if (modal) modal.style.display = "none";
                    activeDriveId = null;
                };

                window.confirmDriveRegistration = function() {
                    const regBtn = document.getElementById("confirmRegBtn");
                    if (regBtn) {
                        regBtn.disabled = true;
                        regBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking eligibility...';
                    }

                    setTimeout(() => {
                        const list = getDrives();
                        const match = list.find(d => d.id === activeDriveId);
                        if (match) {
                            match.reserved = true;
                        }
                        saveDrives(list);

                        if (regBtn) {
                            regBtn.disabled = false;
                            regBtn.textContent = "Confirm Registration";
                        }

                        closeRegisterModal();
                        renderDrives();
                        alert("Placement drive registration confirmed! Applied application sent to T&P registers.");
                    }, 1500);
                };

                // Initial render
                renderDrives();
            });
        `
    },
    {
        id: "communication",
        dir: "student/communication",
        title: "ERP Messenger",
        icon: "fa-message",
        category: "Communication",
        htmlContent: `
            <div class="comm-grid glassmorphism" style="height: 600px; border-radius: 12px; border: 1px solid var(--border-color); overflow:hidden;">
                <div class="chat-sidebar">
                    <div class="search-box">
                        <input type="text" id="contactSearchInput" placeholder="Search contacts..." class="form-input" style="height: 38px; font-size:12px;" oninput="filterChatContacts()">
                    </div>
                    <div class="chat-list" id="chatContactsContainer">
                        <!-- Dynamic contacts -->
                    </div>
                </div>
                <div class="chat-window">
                    <div class="chat-header" style="display:flex; align-items:center; gap:12px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-glow); display:flex; align-items:center; justify-content:center; position:relative;">
                            <i class="fa-solid fa-chalkboard-user" style="color:var(--primary); font-size:16px;"></i>
                            <div style="position:absolute; bottom:0; right:0; width:10px; height:10px; border-radius:50%; background:#10b981; border:2px solid var(--bg-primary);" id="activeContactIndicator"></div>
                        </div>
                        <div>
                            <strong id="activeContactName" style="font-size:14px; color:var(--text-primary);">Dr. A. Verma</strong>
                            <span id="activeContactStatus" style="font-size:10px; color:#10b981; display:block;">Online</span>
                        </div>
                    </div>
                    <div class="chat-messages" id="chatMessages" style="background:rgba(0,0,0,0.15);">
                        <!-- Dynamic Messages -->
                    </div>
                    <form class="chat-input-bar" onsubmit="sendChatMessage(event)" style="display:flex; padding:12px; gap:8px;">
                        <input type="text" id="chatInput" placeholder="Type a message..." class="form-input" style="height:38px; border-radius:6px; font-size:12px;" required autocomplete="off">
                        <button type="submit" class="btn btn-primary btn-sm" style="height:38px; width:44px; display:flex; align-items:center; justify-content:center; border-radius:6px; flex-shrink:0;"><i class="fa-solid fa-paper-plane" style="font-size:13px;"></i></button>
                    </form>
                </div>
            </div>
        `,
        cssContent: `
            .comm-grid {
                display: grid;
                grid-template-columns: 0.8fr 1.2fr;
            }
            @media (max-width: 768px) {
                .comm-grid {
                    grid-template-columns: 1fr;
                }
                .chat-sidebar { display: none; }
            }
            .chat-sidebar {
                border-right: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                background: rgba(0,0,0,0.1);
            }
            .search-box {
                padding: 15px;
                border-bottom: 1px solid var(--border-color);
            }
            .chat-list {
                flex-grow: 1;
                overflow-y: auto;
            }
            .chat-list-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 15px;
                cursor: pointer;
                border-bottom: 1px solid var(--border-color);
                transition: background 0.2s;
            }
            .chat-list-item:hover, .chat-list-item.active {
                background-color: var(--bg-tertiary);
            }
            .chat-list-item i {
                font-size: 16px;
                color: var(--primary);
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: var(--primary-glow);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .chat-list-item strong {
                display: block;
                font-size: 13px;
                color: var(--text-primary);
            }
            .chat-list-item span {
                font-size: 11px;
                color: var(--text-secondary);
            }
            .chat-window {
                display: flex;
                flex-direction: column;
                background-color: rgba(15, 23, 42, 0.05);
            }
            .chat-header {
                padding: 15px 20px;
                border-bottom: 1px solid var(--border-color);
                background-color: var(--bg-tertiary);
            }
            .chat-messages {
                flex-grow: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 15px;
                height: 440px;
            }
            .msg {
                max-width: 70%;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 13px;
                line-height: 1.4;
                position: relative;
            }
            .msg.received {
                background-color: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                align-self: flex-start;
                border-bottom-left-radius: 2px;
                color: var(--text-primary);
            }
            .msg.sent {
                background-color: var(--primary);
                color: #ffffff;
                align-self: flex-end;
                border-bottom-right-radius: 2px;
            }
            .msg .time {
                display: block;
                font-size: 9px;
                margin-top: 5px;
                text-align: right;
                opacity: 0.7;
            }
            .chat-input-bar {
                border-top: 1px solid var(--border-color);
                background-color: var(--bg-tertiary);
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const contactsList = [
                    { id: "verma", name: "Dr. A. Verma", role: "Guide Assigned", online: true, icon: "fa-chalkboard-user" },
                    { id: "sharma", name: "Prof. S. Sharma", role: "Neural Networks Prof", online: false, icon: "fa-user-tie" },
                    { id: "sen", name: "Prof. D. Sen", role: "Registrar Authority", online: true, icon: "fa-user-shield" },
                    { id: "joshi", name: "Mr. P. Joshi", role: "Fees Accounts Manager", online: true, icon: "fa-file-invoice-dollar" }
                ];

                const initialConversations = {
                    verma: [
                        { text: "Hi, did you upload the Robotics SLAM project archive on the portal yet?", type: "received", time: "10:04 AM" }
                    ],
                    sharma: [
                        { text: "Hello Vikram, please submit the backpropagation review report by tonight.", type: "received", time: "Yesterday" }
                    ],
                    sen: [
                        { text: "Your hostel outstation gatepass request has been marked to the HOD for verification.", type: "received", time: "2 Days ago" }
                    ],
                    joshi: [
                        { text: "Please pay the outstanding semester tuition challan balance to register for mid-terms.", type: "received", time: "3 Days ago" }
                    ]
                };

                let activeContactId = "verma";

                function getConversations(id) {
                    const saved = localStorage.getItem("erp_conv_" + id);
                    if (saved) return JSON.parse(saved);
                    return initialConversations[id] || [];
                }

                function saveConversations(id, list) {
                    localStorage.setItem("erp_conv_" + id, JSON.stringify(list));
                }

                window.renderChatContacts = function() {
                    const container = document.getElementById("chatContactsContainer");
                    if (!container) return;

                    const searchInput = document.getElementById("contactSearchInput");
                    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

                    const filtered = contactsList.filter(c => c.name.toLowerCase().includes(query) || c.role.toLowerCase().includes(query));

                    container.innerHTML = filtered.map(item => \`
                        <div class="chat-list-item \${item.id === activeContactId ? 'active' : ''}" onclick="switchActiveChat('\${item.id}')">
                            <i class="fa-solid \${item.icon}"></i>
                            <div style="flex-grow:1;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong>\${item.name}</strong>
                                    <div style="width:8px; height:8px; border-radius:50%; background:\${item.online ? '#10b981' : 'rgba(255,255,255,0.1)'};"></div>
                                </div>
                                <span>\${item.role}</span>
                            </div>
                        </div>
                    \`).join("");
                };

                window.switchActiveChat = function(id) {
                    activeContactId = id;
                    renderChatContacts();

                    const contact = contactsList.find(c => c.id === id);
                    if (!contact) return;

                    document.getElementById("activeContactName").textContent = contact.name;
                    document.getElementById("activeContactStatus").textContent = contact.online ? "Online" : "Offline";
                    document.getElementById("activeContactIndicator").style.background = contact.online ? "#10b981" : "rgba(255,255,255,0.3)";

                    renderChatMessages();
                };

                window.renderChatMessages = function() {
                    const box = document.getElementById("chatMessages");
                    if (!box) return;

                    const list = getConversations(activeContactId);
                    box.innerHTML = list.map(msg => \`
                        <div class="msg \${msg.type}">
                            <p style="margin:0;">\${msg.text}</p>
                            <span class="time">\${msg.time}</span>
                        </div>
                    \`).join("");

                    box.scrollTop = box.scrollHeight;
                };

                window.sendChatMessage = function(event) {
                    event.preventDefault();
                    const input = document.getElementById("chatInput");
                    if (!input || !input.value.trim()) return;

                    const textVal = input.value.trim();
                    const list = getConversations(activeContactId);

                    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    list.push({ text: textVal, type: "sent", time: timeStr });
                    saveConversations(activeContactId, list);
                    input.value = "";
                    renderChatMessages();

                    // Auto Reply simulation
                    setTimeout(() => {
                        const replies = {
                            verma: "Understood. Please upload the updated slide decks and we will review them in our next slot.",
                            sharma: "Acknowledged. Ensure the code files are zipped properly before upload.",
                            sen: "Please monitor the Applications tab. Decisions are synced on the fly.",
                            joshi: "Verify your bank transaction references. If verified, the payment registry clears in 24 hours."
                        };

                        const responseText = replies[activeContactId] || "Received your response. Our academic team is reviewing the status.";
                        const updatedList = getConversations(activeContactId);
                        updatedList.push({ text: responseText, type: "received", time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
                        saveConversations(activeContactId, updatedList);
                        renderChatMessages();
                    }, 1500);
                };

                window.filterChatContacts = function() {
                    renderChatContacts();
                };

                // Initial load
                renderChatContacts();
                switchActiveChat("verma");
            });
        `
    },
    {
        id: "ai-assistant",
        dir: "student/ai-assistant",
        title: "AI Help Assistant",
        icon: "fa-robot",
        category: "Overview",
        htmlContent: `
            <div class="ai-chat glassmorphism" style="max-width: 760px; margin: 0 auto; border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden; display: flex; flex-direction: column; height: 560px;">
                <div class="ai-header" style="display:flex; align-items:center; justify-content:space-between; padding: 20px; border-bottom: 1px solid var(--border-color); background-color: var(--bg-tertiary);">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-glow); display:flex; align-items:center; justify-content:center;">
                            <i class="fa-solid fa-robot" style="color:var(--primary); font-size:18px;"></i>
                        </div>
                        <div>
                            <strong style="font-size:14px; color:var(--text-primary); display:block;">Gemini AI Help Assistant</strong>
                            <span style="font-size:10px; color:var(--text-secondary);">Powered by Antigravity IDE • Online</span>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="width:8px; height:8px; border-radius:50%; background:#10b981; display:inline-block; box-shadow:0 0 8px #10b981;"></span>
                        <span style="font-size:10px; color:var(--text-secondary);">AI Core Active</span>
                    </div>
                </div>

                <!-- Chat history messages -->
                <div class="ai-messages" id="aiMsgBox" style="flex-grow: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; background: rgba(0,0,0,0.15);">
                    <div class="msg received" style="max-width:80%; padding:12px 16px; border-radius:8px; border-bottom-left-radius:2px; font-size:13px; line-height:1.5; background:var(--bg-tertiary); border:1px solid var(--border-color); color:var(--text-primary);">
                        <p style="margin:0;">Hello Vikram! I am Gemini, your UnifyEd student portal assistant. Ask me questions about your academics, exams, fee ledgers, or attendance status instantly.</p>
                    </div>
                </div>

                <!-- Quick Query Chips -->
                <div style="padding: 12px 20px; border-top:1px solid var(--border-color); display:flex; gap:8px; flex-wrap:wrap; background:rgba(0,0,0,0.05);">
                    <button class="chip-btn" onclick="sendQuickPrompt('Show my CGPA')" style="background:var(--bg-tertiary); border:1px solid var(--border-color); color:var(--text-primary); border-radius:15px; padding:6px 12px; font-size:11px; cursor:pointer; font-weight:600; transition:all 0.2s;">Show my CGPA</button>
                    <button class="chip-btn" onclick="sendQuickPrompt('When is my next exam?')" style="background:var(--bg-tertiary); border:1px solid var(--border-color); color:var(--text-primary); border-radius:15px; padding:6px 12px; font-size:11px; cursor:pointer; font-weight:600; transition:all 0.2s;">When is my next exam?</button>
                    <button class="chip-btn" onclick="sendQuickPrompt('What is my attendance status?')" style="background:var(--bg-tertiary); border:1px solid var(--border-color); color:var(--text-primary); border-radius:15px; padding:6px 12px; font-size:11px; cursor:pointer; font-weight:600; transition:all 0.2s;">What is my attendance status?</button>
                    <button class="chip-btn" onclick="sendQuickPrompt('How to pay my fees?')" style="background:var(--bg-tertiary); border:1px solid var(--border-color); color:var(--text-primary); border-radius:15px; padding:6px 12px; font-size:11px; cursor:pointer; font-weight:600; transition:all 0.2s;">How to pay my fees?</button>
                </div>

                <!-- Query Form -->
                <form class="ai-input-form" onsubmit="sendAiQuery(event)" style="display: flex; padding: 15px; border-top: 1px solid var(--border-color); background-color: var(--bg-tertiary); gap: 10px; align-items:center;">
                    <input type="text" id="aiInput" placeholder="Ask Gemini something..." class="form-input" style="flex:1; height:38px; border-radius:6px; font-size:12px;" required autocomplete="off">
                    <button type="submit" class="btn btn-primary btn-sm" style="height:38px; padding:0 20px; font-weight:700; border-radius:6px;">Ask Bot</button>
                </form>
            </div>
        `,
        cssContent: `
            .chip-btn:hover {
                border-color: var(--primary) !important;
                background: var(--primary-glow) !important;
            }
            .msg {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 13px;
                line-height: 1.4;
            }
            .msg.received {
                background-color: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                align-self: flex-start;
                border-bottom-left-radius: 2px;
                color: var(--text-primary);
            }
            .msg.sent {
                background-color: var(--primary);
                color: #ffffff;
                align-self: flex-end;
                border-bottom-right-radius: 2px;
            }
            .dot-flashing {
                position: relative;
                width: 6px;
                height: 6px;
                border-radius: 5px;
                background-color: var(--text-secondary);
                color: var(--text-secondary);
                animation: dot-flashing 1s infinite linear alternate;
                animation-delay: .5s;
                display: inline-block;
                margin-left: 15px;
            }
            .dot-flashing::before, .dot-flashing::after {
                content: '';
                display: inline-block;
                position: absolute;
                top: 0;
            }
            .dot-flashing::before {
                left: -12px;
                width: 6px;
                height: 6px;
                border-radius: 5px;
                background-color: var(--text-secondary);
                color: var(--text-secondary);
                animation: dot-flashing 1s infinite alternate;
                animation-delay: 0s;
            }
            .dot-flashing::after {
                left: 12px;
                width: 6px;
                height: 6px;
                border-radius: 5px;
                background-color: var(--text-secondary);
                color: var(--text-secondary);
                animation: dot-flashing 1s infinite alternate;
                animation-delay: 1s;
            }
            @keyframes dot-flashing {
                0% { background-color: var(--text-secondary); }
                50%, 100% { background-color: rgba(255,255,255,0.1); }
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                window.sendQuickPrompt = function(promptText) {
                    const input = document.getElementById("aiInput");
                    if (input) {
                        input.value = promptText;
                        sendAiQuery(new Event('submit'));
                    }
                };

                window.sendAiQuery = function(event) {
                    if (event) event.preventDefault();
                    const input = document.getElementById("aiInput");
                    const box = document.getElementById("aiMsgBox");
                    if (!input || !box) return;

                    const query = input.value.trim();
                    if (!query) return;

                    // Append user message
                    const userMsg = document.createElement("div");
                    userMsg.className = "msg sent";
                    userMsg.innerHTML = '<p style="margin:0;">' + query + '</p>';
                    box.appendChild(userMsg);
                    input.value = "";
                    box.scrollTop = box.scrollHeight;

                    // Append thinking placeholder
                    const thinkingBubble = document.createElement("div");
                    thinkingBubble.className = "msg received";
                    thinkingBubble.id = "aiThinkingBubble";
                    thinkingBubble.style.display = "flex";
                    thinkingBubble.style.alignItems = "center";
                    thinkingBubble.style.gap = "8px";
                    thinkingBubble.style.padding = "10px 15px";
                    thinkingBubble.innerHTML = '<span style="font-size:11px; color:var(--text-secondary);">Gemini is writing</span> <div class="dot-flashing"></div>';
                    box.appendChild(thinkingBubble);
                    box.scrollTop = box.scrollHeight;

                    // Compute response
                    setTimeout(() => {
                        const bubble = document.getElementById("aiThinkingBubble");
                        if (bubble) bubble.remove();

                        const reply = document.createElement("div");
                        reply.className = "msg received";
                        let text = "I am processing your query. Could you please specify which semester records you would like to view?";
                        
                        const normQuery = query.toLowerCase();
                        if (normQuery.includes("gpa") || normQuery.includes("cgpa") || normQuery.includes("grade")) {
                            text = "Your cumulative GPA (CGPA) is 9.42, placing you at A++ outstanding grade category.";
                        } else if (normQuery.includes("exam") || normQuery.includes("test") || normQuery.includes("schedule")) {
                            text = "Your next scheduled examination is 'Neural Networks & Deep Learning' on October 12, 2026 at 09:30 AM in Main Block Hall 4.";
                        } else if (normQuery.includes("attendance") || normQuery.includes("present")) {
                            text = "Your overall attendance is 89.5% (Safe Zone). You have cleared all minimum registration requirements.";
                        } else if (normQuery.includes("fee") || normQuery.includes("challan") || normQuery.includes("pay")) {
                            text = "You have ₹ 0.00 outstanding dues. All tuition challans for the Fall Semester have been paid successfully.";
                        }

                        reply.innerHTML = '<p style="margin:0;">' + text + '</p>';
                        box.appendChild(reply);
                        box.scrollTop = box.scrollHeight;
                    }, 1200);
                };
            });
        `
    },
    {
        id: "profile",
        dir: "student/profile",
        title: "My Profile",
        icon: "fa-id-card",
        category: "Overview",
        htmlContent: `
            <div class="profile-container" style="display:grid; grid-template-columns: 1.1fr 0.9fr; gap:30px; align-items:flex-start;">
                
                <!-- Profile details card -->
                <div class="profile-card glassmorphism" style="padding:30px; border-radius:12px; border:1px solid var(--border-color);">
                    <!-- Header -->
                    <div style="display:flex; align-items:center; gap:20px; border-bottom:1px solid var(--border-color); padding-bottom:20px; margin-bottom:25px;">
                        <div style="width:60px; height:60px; border-radius:50%; background:var(--primary-glow); display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; cursor:pointer;" onclick="triggerPhotoUpload()">
                            <img id="profileAvatarImg" src="" style="width:100%; height:100%; object-fit:cover; display:none;">
                            <i id="profileAvatarIcon" class="fa-solid fa-user-tie" style="font-size:28px; color:var(--primary);"></i>
                            <div style="position:absolute; bottom:0; left:0; width:100%; background:rgba(0,0,0,0.6); color:#fff; font-size:7px; text-align:center; padding:2px 0; font-weight:700;">EDIT</div>
                        </div>
                        <div>
                            <h2 style="margin:0; font-size:18px; font-weight:800; color:var(--text-primary);" id="profileStudentName">Vikram Kumawat</h2>
                            <span style="font-size:12px; color:var(--text-secondary);" id="profileStudentEnrollment">Enrollment: STU202600145 • Section AI-1</span>
                        </div>
                    </div>
                    <!-- Hidden File Input -->
                    <input type="file" id="profilePhotoFileInput" style="display:none;" accept="image/*" onchange="handlePhotoSelected(event)">

                    <!-- Tabs switcher -->
                    <div style="display:flex; gap:10px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                        <button class="filter-btn active" id="tabPersonalBtn" onclick="switchProfileTab('personal')" style="height:30px; padding:0 12px; font-size:11px; font-weight:600; cursor:pointer; background:var(--primary); color:#fff; border:none; outline:none; border-radius:4px;">Personal Info</button>
                        <button class="filter-btn" id="tabAcademicBtn" onclick="switchProfileTab('academic')" style="height:30px; padding:0 12px; font-size:11px; font-weight:600; cursor:pointer; background:var(--bg-tertiary); color:var(--text-secondary); border:1px solid var(--border-color); outline:none; border-radius:4px;">Academic Registry</button>
                    </div>

                    <!-- Personal details list -->
                    <div id="personalSection" style="display:flex; flex-direction:column; gap:12px;">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Full Name</label>
                                <input type="text" id="profileNameInput" class="form-input" style="height:36px; font-size:12px;" value="Vikram Kumawat">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Contact Mobile</label>
                                <input type="text" id="profilePhoneInput" class="form-input" style="height:36px; font-size:12px;" value="**********">
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Date of Birth</label>
                                <input type="text" id="profileDobInput" class="form-input" style="height:36px; font-size:12px;" value="15-08-2004">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Blood Group</label>
                                <select id="profileBloodSelect" class="form-input" style="height:36px; font-size:12px;">
                                    <option value="A+">A+</option>
                                    <option value="B+">B+</option>
                                    <option value="O+" selected>O+</option>
                                    <option value="AB+">AB+</option>
                                    <option value="A-">A-</option>
                                    <option value="B-">B-</option>
                                </select>
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Father's Name</label>
                                <input type="text" id="profileFatherInput" class="form-input" style="height:36px; font-size:12px;" value="Shri R. K. Kumawat">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Mother's Name</label>
                                <input type="text" id="profileMotherInput" class="form-input" style="height:36px; font-size:12px;" value="Smt. Kamala Devi">
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Emergency Contact No</label>
                                <input type="text" id="profileGuardianInput" class="form-input" style="height:36px; font-size:12px;" value="+91 94140 XXXXX">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Student Address</label>
                                <input type="text" id="profileAddressInput" class="form-input" style="height:36px; font-size:12px;" value="104, Mansarovar, Jaipur 302020">
                            </div>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="saveProfileChanges()" style="height:38px; margin-top:5px; font-weight:700; gap:8px;"><i class="fa-solid fa-floppy-disk"></i> Save Profile Parameters</button>
                    </div>

                    <!-- Academic parameters list -->
                    <div id="academicSection" style="display:none; flex-direction:column; gap:12px;">
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Student ID</label>
                                <input type="text" id="profileEnrollInput" class="form-input" style="height:36px; font-size:12px;" value="ST20260001">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Roll Number</label>
                                <input type="text" id="profileRollInput" class="form-input" style="height:36px; font-size:12px;" value="BCA23015">
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Course Name</label>
                                <input type="text" id="profileCourseInput" class="form-input" style="height:36px; font-size:12px;" value="BCA">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Current Semester</label>
                                <input type="text" id="profileSemInput" class="form-input" style="height:36px; font-size:12px;" value="3">
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Department</label>
                                <input type="text" id="profileDeptInput" class="form-input" style="height:36px; font-size:12px;" value="Computer Application">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Academic Year</label>
                                <input type="text" id="profileYearInput" class="form-input" style="height:36px; font-size:12px;" value="2026-27">
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Bus Route</label>
                                <input type="text" id="profileBusInput" class="form-input" style="height:36px; font-size:12px;" value="Route No. 12 (Mansarovar)">
                            </div>
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Hostel</label>
                                <select id="profileHostelSelect" class="form-input" style="height:36px; font-size:12px;">
                                    <option value="YES">YES</option>
                                    <option value="NO" selected>NO</option>
                                </select>
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div class="profile-form-group">
                                <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Allergy Info</label>
                                <input type="text" id="profileAllergyInput" class="form-input" style="height:36px; font-size:12px;" value="None">
                            </div>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="saveProfileChanges()" style="height:38px; margin-top:5px; font-weight:700; gap:8px;"><i class="fa-solid fa-floppy-disk"></i> Save Registry Parameters</button>
                    </div>
                </div>

                <!-- Digital ID card panel -->
                <div style="display:flex; flex-direction:column; align-items:center; gap:20px;">
                    
                    <!-- ID flip wrapper -->
                    <div class="id-card-wrapper" onclick="flipIdentityCard()" style="width:320px; height:500px; perspective:1000px; cursor:pointer;">
                        <div class="id-card-inner" id="idCardInner" style="position:relative; width:100%; height:100%; transition: transform 0.6s; transform-style:preserve-3d;">
                            
                            <!-- Front face -->
                            <div class="id-card-front glassmorphism" style="position:absolute; width:100%; height:100%; backface-visibility:hidden; padding:20px; border-radius:16px; border:1px solid var(--border-color); background:linear-gradient(135deg, rgba(30,41,59,0.85), rgba(15,23,42,0.95)); box-shadow:0 15px 35px rgba(0,0,0,0.3); display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; box-sizing:border-box;">
                                <div style="text-align:center; border-bottom:2px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:10px;">
                                    <div style="display:flex; align-items:center; justify-content:center; gap:6px; margin-bottom:3px;">
                                        <i class="fa-solid fa-graduation-cap" style="font-size:16px; color:var(--primary);"></i>
                                        <strong style="font-size:10px; color:#fff; letter-spacing:0.5px; text-transform:uppercase;">UnifyEd</strong>
                                    </div>
                                    <div style="font-size:11px; font-weight:700; color:var(--primary); letter-spacing:2px; text-transform:uppercase; margin:0;">STUDENT ID CARD</div>
                                </div>
                                
                                <div style="width:100px; height:110px; border-radius:8px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); margin:0 auto 10px auto; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                                    <img id="idCardAvatarImg" src="" style="width:100%; height:100%; object-fit:cover; display:none;">
                                    <i id="idCardAvatarIcon" class="fa-solid fa-user" style="font-size:36px; color:var(--primary);"></i>
                                </div>

                                <div style="display:grid; grid-template-columns:125px 10px 1fr; row-gap:5px; font-size:10.5px; color:var(--text-secondary); text-align:left;">
                                    <label style="font-weight:600;">Name</label><span>:</span><strong style="color:#fff;" id="idCardName">Vikram Kumawat</strong>
                                    <label style="font-weight:600;">Student ID</label><span>:</span><span id="idCardEnroll">ST20260001</span>
                                    <label style="font-weight:600;">Roll Number</label><span>:</span><span id="idCardRoll">BCA23015</span>
                                    <label style="font-weight:600;">Course</label><span>:</span><span id="idCardCourse">BCA</span>
                                    <label style="font-weight:600;">DOB</label><span>:</span><span id="idCardDob">15-08-2004</span>
                                    <label style="font-weight:600;">Mobile</label><span>:</span><span id="idCardPhone">**********</span>
                                    
                                    <div style="grid-column: span 3; border-top: 1px dashed rgba(255, 255, 255, 0.08); margin: 3px 0;"></div>
                                    
                                    <label style="font-weight:600;">Department</label><span>:</span><span id="idCardDept">Computer Application</span>
                                    <label style="font-weight:600;">Academic Year</label><span>:</span><span id="idCardYear">2026-27</span>
                                </div>

                                <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:10px; display:flex; justify-content:space-between; align-items:center;">
                                    <div style="width:36px; height:36px; background:#fff; padding:2px; border-radius:4px; display:flex; align-items:center; justify-content:center; flex-shrink:0; cursor:pointer;" onclick="event.stopPropagation(); showQrModal();" title="Click to enlarge QR Code">
                                        <canvas id="idCardQrCanvas" style="width:100%; height:100%; object-fit:contain;"></canvas>
                                    </div>
                                    <div style="text-align:center; font-size:8px; color:var(--text-secondary); display:flex; flex-direction:column; align-items:center; gap:2px;">
                                        <span style="font-family:'Georgia', serif; font-style:italic; color:#cbd5e1; font-size:11px;" id="idCardSigName">Vikram</span>
                                        <div style="width:60px; border-top:1px solid rgba(255,255,255,0.3); margin-bottom:1px;"></div>
                                        <span>Student Signature</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Back face -->
                            <div class="id-card-back glassmorphism" style="position:absolute; width:100%; height:100%; backface-visibility:hidden; padding:20px; border-radius:16px; border:1px solid var(--border-color); background:linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9)); box-shadow:0 15px 35px rgba(0,0,0,0.3); transform: rotateY(180deg); display:flex; flex-direction:column; justify-content:flex-start; gap:12px; overflow:hidden; box-sizing:border-box; font-size:9.5px; color:var(--text-secondary);">
                                <div style="text-align:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; margin-bottom:0; width:100%;">
                                    <div style="font-size:11px; font-weight:700; color:var(--primary); letter-spacing:1px; text-transform:uppercase; margin:0;">STUDENT ID CARD (BACK)</div>
                                </div>

                                <!-- Emergency Details -->
                                <div style="width:100%; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:6px; text-align:left;">
                                    <h4 style="color:#fff; margin:0 0 3px 0; font-size:10px; text-transform:uppercase; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-heart-pulse" style="color:var(--primary); font-size:8px;"></i> Emergency Contact</h4>
                                    <div style="display:grid; grid-template-columns:120px 1fr; row-gap:2px;">
                                        <label style="font-weight:600;">Father Name</label><span id="idCardFather">: Shri R. K. Kumawat</span>
                                        <label style="font-weight:600;">Mother Name</label><span id="idCardMother">: Smt. Kamala Devi</span>
                                        <label style="font-weight:600;">Emergency No</label><span id="idCardEmergencyNo">: +91 94140 XXXXX</span>
                                    </div>
                                </div>

                                <!-- Address -->
                                <div style="width:100%; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:6px; text-align:left;">
                                    <h4 style="color:#fff; margin:0 0 3px 0; font-size:10px; text-transform:uppercase; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-house-user" style="color:var(--primary); font-size:8px;"></i> Address</h4>
                                    <p id="idCardStudentAddress" style="padding-left:12px; margin:0; line-height:1.3;">104, Mansarovar, Jaipur 302020</p>
                                </div>

                                <!-- Institution Coordinates -->
                                <div style="width:100%; text-align:left;">
                                    <h4 style="color:#fff; margin:0 0 3px 0; font-size:10px; text-transform:uppercase; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-envelope-open-text" style="color:var(--primary); font-size:8px;"></i> College Contact</h4>
                                    <div style="display:grid; grid-template-columns:80px 1fr; row-gap:2px;">
                                        <label style="font-weight:600;">Website</label><span>: www.unifyed.edu</span>
                                        <label style="font-weight:600;">Email</label><span>: admissions@unifyed.edu</span>
                                        <label style="font-weight:600;">Phone</label><span>: +91 141 2345678</span>
                                    </div>
                                </div>

                                <!-- Registrar Signature -->
                                <div style="display:flex; justify-content:flex-end; width:100%; padding-right:10px; margin-top:auto;">
                                    <div class="signature-area">
                                        <span class="signature-font" style="color:var(--primary); font-size:12px; font-weight:bold;">UnifyEd Registrar</span>
                                        <div class="signature-line" style="width:60px;"></div>
                                        <span>Authorized Signature</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <span style="font-size:11px; color:var(--text-secondary);"><i class="fa-solid fa-rotate"></i> Click ID Card above to Flip</span>
                    <button class="btn btn-primary btn-sm" onclick="downloadStudentIdCard()" style="margin-top:5px; font-weight:700; gap:8px; height:34px; padding:0 15px; font-size:11px;"><i class="fa-solid fa-download"></i> Download ID Card (A4 Image)</button>
                </div>
                
                <!-- QR Code Enlarge Modal -->
                <div id="qrCodeModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:2000; align-items:center; justify-content:center; animation: fadeIn 0.3s ease;">
                    <div style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:30px; border-radius:12px; max-width:320px; text-align:center; position:relative; box-shadow: var(--glass-shadow);">
                        <button onclick="hideQrModal()" style="position:absolute; top:12px; right:12px; background:none; border:none; color:var(--text-secondary); font-size:16px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        <h4 style="margin:0 0 15px 0; font-size:15px; color:var(--text-primary); font-weight:700;">UnifyEd Student Identity Verification</h4>
                        <div style="background:#fff; padding:15px; border-radius:8px; display:inline-block; margin-bottom:15px; box-shadow:0 8px 16px rgba(0,0,0,0.2);">
                            <canvas id="modalQrCanvas" style="width:180px; height:180px; display:block; margin:0 auto;"></canvas>
                        </div>
                        <p style="font-size:11px; color:var(--text-secondary); margin:0; line-height:1.4;">Scan using any QR reader to verify official student enrollment credentials.</p>
                    </div>
                </div>
                <!-- Load qrious QR generator library client side -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>
            </div>
        `,
        cssContent: `
            .profile-form-group {
                display: flex;
                flex-direction: column;
                gap: 6px;
                text-align: left;
            }
            .filter-btn {
                border: 1px solid var(--border-color);
                background: var(--bg-tertiary);
                color: var(--text-secondary);
                transition: all 0.3s ease;
            }
            .filter-btn.active {
                background: var(--primary) !important;
                color: #fff !important;
                border-color: var(--primary) !important;
            }
            .id-card-front label, .id-card-back label {
                color: #fcd34d !important;
                font-weight: 600;
            }
            .id-card-front span, .id-card-back span {
                color: #ffffff !important;
            }
            .id-card-back p {
                color: #ffffff !important;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                // Fallback default configurations
                const defaultPhone = "**********";
                const defaultGuardian = "+91 94140 XXXXX";
                const defaultAddress = "104, Mansarovar, Jaipur 302020";
                
                // Set headers
                function updateHeaders() {
                    const loggedInName = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const loggedInId = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    
                    const nameHeader = document.getElementById("profileStudentName");
                    const enrollHeader = document.getElementById("profileStudentEnrollment");
                    const cardName = document.getElementById("idCardName");
                    const cardEnroll = document.getElementById("idCardEnroll");

                    if (nameHeader) nameHeader.textContent = loggedInName;
                    if (enrollHeader) enrollHeader.textContent = "Enrollment: " + loggedInId + " • Section AI-1";
                    if (cardName) cardName.textContent = loggedInName;
                    if (cardEnroll) cardEnroll.textContent = loggedInId;
                }

                // Load editable parameters
                function loadParams() {
                    updateHeaders();

                    // Personal details
                    const name = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const phone = localStorage.getItem("prof_phone") || defaultPhone;
                    const dob = localStorage.getItem("prof_dob") || "15-08-2004";
                    const blood = localStorage.getItem("prof_blood") || "O+";
                    const father = localStorage.getItem("prof_father") || "Shri R. K. Kumawat";
                    const mother = localStorage.getItem("prof_mother") || "Smt. Kamala Devi";
                    const guardian = localStorage.getItem("prof_guardian") || defaultGuardian;
                    const address = localStorage.getItem("prof_address") || defaultAddress;

                    // Academic details
                    const enroll = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    const roll = localStorage.getItem("prof_roll") || "BCA23015";
                    const course = localStorage.getItem("prof_course") || "BCA";
                    const sem = localStorage.getItem("prof_sem") || "3";
                    const dept = localStorage.getItem("prof_dept") || "Computer Application";
                    const year = localStorage.getItem("prof_year") || "2026-27";
                    const busRoute = localStorage.getItem("prof_bus") || "Route No. 12 (Mansarovar)";
                    const hostel = localStorage.getItem("hostelAllotted") || "NO";
                    const allergy = localStorage.getItem("prof_allergy") || "None";

                    // Bind inputs
                    const nameInput = document.getElementById("profileNameInput");
                    const phoneInput = document.getElementById("profilePhoneInput");
                    const dobInput = document.getElementById("profileDobInput");
                    const bloodSelect = document.getElementById("profileBloodSelect");
                    const fatherInput = document.getElementById("profileFatherInput");
                    const motherInput = document.getElementById("profileMotherInput");
                    const guardianInput = document.getElementById("profileGuardianInput");
                    const addressInput = document.getElementById("profileAddressInput");

                    const enrollInput = document.getElementById("profileEnrollInput");
                    const rollInput = document.getElementById("profileRollInput");
                    const courseInput = document.getElementById("profileCourseInput");
                    const semInput = document.getElementById("profileSemInput");
                    const deptInput = document.getElementById("profileDeptInput");
                    const yearInput = document.getElementById("profileYearInput");
                    const busInput = document.getElementById("profileBusInput");
                    const hostelSelect = document.getElementById("profileHostelSelect");
                    const allergyInput = document.getElementById("profileAllergyInput");

                    if (nameInput) nameInput.value = name;
                    if (phoneInput) phoneInput.value = phone;
                    if (dobInput) dobInput.value = dob;
                    if (bloodSelect) bloodSelect.value = blood;
                    if (fatherInput) fatherInput.value = father;
                    if (motherInput) motherInput.value = mother;
                    if (guardianInput) guardianInput.value = guardian;
                    if (addressInput) addressInput.value = address;

                    if (enrollInput) enrollInput.value = enroll;
                    if (rollInput) rollInput.value = roll;
                    if (courseInput) courseInput.value = course;
                    if (semInput) semInput.value = sem;
                    if (deptInput) deptInput.value = dept;
                    if (yearInput) yearInput.value = year;
                    if (busInput) busInput.value = busRoute;
                    if (hostelSelect) hostelSelect.value = hostel;
                    if (allergyInput) allergyInput.value = allergy;

                    // Bind Card Front Spans
                    const cardName = document.getElementById("idCardName");
                    const cardEnroll = document.getElementById("idCardEnroll");
                    const cardRoll = document.getElementById("idCardRoll");
                    const cardCourse = document.getElementById("idCardCourse");
                    const cardSem = document.getElementById("idCardSem");
                    const cardBlood = document.getElementById("idCardBlood");
                    const cardDob = document.getElementById("idCardDob");
                    const cardPhone = document.getElementById("idCardPhone");
                    const cardDept = document.getElementById("idCardDept");
                    const cardYear = document.getElementById("idCardYear");
                    const cardSigName = document.getElementById("idCardSigName");

                    if (cardName) cardName.textContent = name;
                    if (cardEnroll) cardEnroll.textContent = enroll;
                    if (cardRoll) cardRoll.textContent = roll;
                    if (cardCourse) cardCourse.textContent = course;
                    if (cardDob) cardDob.textContent = dob;
                    if (cardPhone) cardPhone.textContent = phone;
                    if (cardDept) cardDept.textContent = dept;
                    if (cardYear) cardYear.textContent = year;
                    
                    const firstWord = name.split(' ')[0];
                    if (cardSigName) cardSigName.textContent = firstWord;

                    // Bind Card Back Spans
                    const cardFather = document.getElementById("idCardFather");
                    const cardMother = document.getElementById("idCardMother");
                    const cardEmergencyNo = document.getElementById("idCardEmergencyNo");
                    const cardAddress = document.getElementById("idCardStudentAddress");
                    const cardBus = document.getElementById("idCardBus");
                    const cardHostel = document.getElementById("idCardHostel");
                    const cardMedical = document.getElementById("idCardMedical");

                    if (cardFather) cardFather.textContent = ": " + father;
                    if (cardMother) cardMother.textContent = ": " + mother;
                    if (cardEmergencyNo) cardEmergencyNo.textContent = ": " + guardian;
                    if (cardAddress) cardAddress.textContent = address;
                    if (cardBus) cardBus.textContent = ": " + busRoute;
                    if (cardHostel) cardHostel.textContent = ": " + hostel;
                    if (cardMedical) cardMedical.textContent = \`: Allergy: \${allergy}\`;

                    // Update QR verification code dynamically
                    updateIdCardQrCode();
                    loadStudentPhoto();
                }

                function updateIdCardQrCode() {
                    const name = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const enroll = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    const roll = localStorage.getItem("prof_roll") || "BCA23015";
                    const course = localStorage.getItem("prof_course") || "BCA";
                    const sem = localStorage.getItem("prof_sem") || "3";
                    const blood = localStorage.getItem("prof_blood") || "O+";
                    const dob = localStorage.getItem("prof_dob") || "15-08-2004";
                    const phone = localStorage.getItem("prof_phone") || "**********";
                    const dept = localStorage.getItem("prof_dept") || "Computer Application";
                    const year = localStorage.getItem("prof_year") || "2026-27";
                    
                    const father = localStorage.getItem("prof_father") || "Shri R. K. Kumawat";
                    const mother = localStorage.getItem("prof_mother") || "Smt. Kamala Devi";
                    const emergencyNo = localStorage.getItem("prof_guardian") || "+91 94140 XXXXX";
                    const address = localStorage.getItem("prof_address") || "104, Mansarovar, Jaipur 302020";
                    const busRoute = localStorage.getItem("prof_bus") || "Route No. 12 (Mansarovar)";
                    const hostel = localStorage.getItem("hostelAllotted") || "NO";
                    const allergy = localStorage.getItem("prof_allergy") || "None";
                    
                    let verifyUrl = 'http://localhost:5500/student/profile/verify-card.html';
                    if (window.location.protocol.startsWith('http')) {
                        const pathParts = window.location.pathname.split('/');
                        pathParts[pathParts.length - 1] = 'verify-card.html';
                        verifyUrl = window.location.origin + pathParts.join('/');
                    }
                    verifyUrl += '?name=' + encodeURIComponent(name) +
                                 '&id=' + encodeURIComponent(enroll) +
                                 '&roll=' + encodeURIComponent(roll) +
                                 '&course=' + encodeURIComponent(course) +
                                 '&semester=' + encodeURIComponent(sem) +
                                 '&blood=' + encodeURIComponent(blood) +
                                 '&dob=' + encodeURIComponent(dob) +
                                 '&phone=' + encodeURIComponent(phone) +
                                 '&dept=' + encodeURIComponent(dept) +
                                 '&year=' + encodeURIComponent(year) +
                                 '&father=' + encodeURIComponent(father) +
                                 '&mother=' + encodeURIComponent(mother) +
                                 '&emergNo=' + encodeURIComponent(emergencyNo) +
                                 '&address=' + encodeURIComponent(address) +
                                 '&busRoute=' + encodeURIComponent(busRoute) +
                                 '&hostel=' + encodeURIComponent(hostel) +
                                 '&allergy=' + encodeURIComponent(allergy);

                    if (typeof QRious !== 'undefined') {
                        new QRious({
                            element: document.getElementById('idCardQrCanvas'),
                            value: verifyUrl,
                            size: 150
                        });
                        new QRious({
                            element: document.getElementById('modalQrCanvas'),
                            value: verifyUrl,
                            size: 300
                        });
                    }
                }

                window.showQrModal = function() {
                    const modal = document.getElementById("qrCodeModal");
                    if (modal) modal.style.display = "flex";
                };

                window.hideQrModal = function() {
                    const modal = document.getElementById("qrCodeModal");
                    if (modal) modal.style.display = "none";
                };

                loadParams();

                window.switchProfileTab = function(tab) {
                    const personalBtn = document.getElementById("tabPersonalBtn");
                    const academicBtn = document.getElementById("tabAcademicBtn");
                    const personalSec = document.getElementById("personalSection");
                    const academicSec = document.getElementById("academicSection");

                    if (tab === "personal") {
                        if (personalBtn) personalBtn.classList.add("active");
                        if (academicBtn) academicBtn.classList.remove("active");
                        if (personalSec) personalSec.style.display = "flex";
                        if (academicSec) academicSec.style.display = "none";
                    } else {
                        if (academicBtn) academicBtn.classList.add("active");
                        if (personalBtn) personalBtn.classList.remove("active");
                        if (academicSec) academicSec.style.display = "flex";
                        if (personalSec) personalSec.style.display = "none";
                    }
                };

                // Flip handler
                let isFlipped = false;
                window.flipIdentityCard = function() {
                    const inner = document.getElementById("idCardInner");
                    if (!inner) return;
                    isFlipped = !isFlipped;
                    inner.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
                };

                window.downloadStudentIdCard = function() {
                    const name = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const enroll = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    const roll = localStorage.getItem("prof_roll") || "BCA23015";
                    const course = localStorage.getItem("prof_course") || "BCA";
                    const dob = localStorage.getItem("prof_dob") || "15-08-2004";
                    const phone = localStorage.getItem("prof_phone") || "**********";
                    const dept = localStorage.getItem("prof_dept") || "Computer Application";
                    const year = localStorage.getItem("prof_year") || "2026-27";
                    
                    const father = localStorage.getItem("prof_father") || "Shri R. K. Kumawat";
                    const mother = localStorage.getItem("prof_mother") || "Smt. Kamala Devi";
                    const emergencyNo = localStorage.getItem("prof_guardian") || "+91 94140 XXXXX";
                    const address = localStorage.getItem("prof_address") || "104, Mansarovar, Jaipur 302020";

                    const canvas = document.createElement('canvas');
                    canvas.width = 1240;
                    canvas.height = 1754;
                    const ctx = canvas.getContext('2d');

                    // Draw clean white background
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw elegant blue border around A4
                    ctx.strokeStyle = '#1e3a8a';
                    ctx.lineWidth = 15;
                    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

                    // Header Banner
                    ctx.fillStyle = '#1e293b';
                    ctx.fillRect(40, 40, canvas.width - 80, 100);

                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 28px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('UNIVERSITY OF ENGINEERING & MANAGEMENT, JAIPUR', canvas.width / 2, 95);
                    ctx.font = '16px sans-serif';
                    ctx.fillStyle = '#fcd34d';
                    ctx.fillText('OFFICIAL STUDENT RECORD • VERIFIED ID CARD PRINT PORTAL', canvas.width / 2, 125);

                    // Draw Front Label
                    ctx.fillStyle = '#0f172a';
                    ctx.font = 'bold 20px sans-serif';
                    ctx.fillText('[ CARD FRONT SIDE ]', canvas.width / 2, 190);

                    // Function to draw card face
                    function drawCardFace(x, y, w, h, isBack) {
                        const grad = ctx.createLinearGradient(x, y, x + w, y + h);
                        if (isBack) {
                            grad.addColorStop(0, '#0f172a');
                            grad.addColorStop(1, '#1e3a8a');
                        } else {
                            grad.addColorStop(0, '#1e3a8a');
                            grad.addColorStop(1, '#0f172a');
                        }
                        ctx.fillStyle = grad;
                        ctx.beginPath();
                        ctx.roundRect(x, y, w, h, 20);
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                        ctx.lineWidth = 2;
                        ctx.stroke();

                        if (!isBack) {
                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 16px sans-serif';
                            ctx.fillText('UNIVERSITY OF ENGINEERING & MANAGEMENT', x + w / 2, y + 45);
                            ctx.fillStyle = '#10b981';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('STUDENT ID CARD', x + w / 2, y + 65);

                            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(x + 20, y + 80);
                            ctx.lineTo(x + w - 20, y + 80);
                            ctx.stroke();

                            const photoX = x + w / 2 - 60;
                            const photoY = y + 100;
                            const photoW = 120;
                            const photoH = 130;
                            ctx.fillStyle = 'rgba(255,255,255,0.05)';
                            ctx.fillRect(photoX, photoY, photoW, photoH);
                            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                            ctx.strokeRect(photoX, photoY, photoW, photoH);

                            const photo = localStorage.getItem("studentPhoto");
                            if (photo) {
                                const img = new Image();
                                img.src = photo;
                                try {
                                    ctx.drawImage(img, photoX + 2, photoY + 2, photoW - 4, photoH - 4);
                                } catch (e) {
                                    drawUserIcon(ctx, photoX + photoW / 2, photoY + photoH / 2);
                                }
                            } else {
                                drawUserIcon(ctx, photoX + photoW / 2, photoY + photoH / 2);
                            }

                            ctx.textAlign = 'left';
                            let gridY = y + 270;
                            const rowGap = 30;

                            const frontFields = [
                                { label: 'Name', val: name },
                                { label: 'Student ID', val: enroll },
                                { label: 'Roll Number', val: roll },
                                { label: 'Course', val: course },
                                { label: 'DOB', val: dob },
                                { label: 'Mobile', val: phone },
                                { label: 'Department', val: dept },
                                { label: 'Academic Year', val: year }
                            ];

                            frontFields.forEach(f => {
                                ctx.fillStyle = '#fcd34d';
                                ctx.font = 'bold 14px sans-serif';
                                ctx.fillText(f.label, x + 30, gridY);
                                ctx.fillStyle = '#ffffff';
                                ctx.fillText(':', x + 160, gridY);
                                ctx.fillText(f.val, x + 185, gridY);
                                gridY += rowGap;
                            });

                            const qrCanvas = document.getElementById('idCardQrCanvas');
                            if (qrCanvas) {
                                ctx.drawImage(qrCanvas, x + 30, y + h - 100, 75, 75);
                            }

                            const firstWord = name.split(' ')[0];
                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'italic 18px Georgia';
                            ctx.fillText(firstWord, x + w - 150, y + h - 55);
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.beginPath();
                            ctx.moveTo(x + w - 180, y + h - 45);
                            ctx.lineTo(x + w - 30, y + h - 45);
                            ctx.stroke();
                            ctx.font = '10px sans-serif';
                            ctx.fillStyle = '#94a3b8';
                            ctx.fillText('Student Signature', x + w - 145, y + h - 30);

                        } else {
                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 14px sans-serif';
                            ctx.fillText('STUDENT ID CARD (BACK)', x + w / 2, y + 35);
                            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                            ctx.beginPath();
                            ctx.moveTo(x + 20, y + 45);
                            ctx.lineTo(x + w - 20, y + 45);
                            ctx.stroke();

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('Emergency Contact', x + 30, y + 75);
                            let subY = y + 105;
                            const backFields1 = [
                                { label: 'Father Name', val: father },
                                { label: 'Mother Name', val: mother },
                                { label: 'Emergency No', val: emergencyNo }
                            ];
                            backFields1.forEach(f => {
                                ctx.fillStyle = '#fcd34d';
                                ctx.font = 'bold 11px sans-serif';
                                ctx.fillText(f.label, x + 40, subY);
                                ctx.fillStyle = '#ffffff';
                                ctx.fillText(': ' + f.val, x + 160, subY);
                                subY += 22;
                            });

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('Address', x + 30, y + 200);
                            ctx.font = '11px sans-serif';
                            ctx.fillText(address, x + 40, y + 225);

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('College Contact', x + 30, y + 275);
                            ctx.font = '11px sans-serif';
                            ctx.fillStyle = '#ffffff';
                            ctx.fillText('Website : www.unifyed.edu', x + 40, y + 300);
                            ctx.fillText('Email : admissions@unifyed.edu', x + 40, y + 320);
                            ctx.fillText('Phone : +91 141 2345678', x + 40, y + 340);

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'italic 16px Georgia';
                            ctx.fillText('UnifyEd Registrar', x + w - 160, y + h - 65);
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.beginPath();
                            ctx.moveTo(x + w - 180, y + h - 55);
                            ctx.lineTo(x + w - 30, y + h - 55);
                            ctx.stroke();
                            ctx.font = '10px sans-serif';
                            ctx.fillStyle = '#94a3b8';
                            ctx.fillText('Authorized Signature', x + w - 150, y + h - 40);
                        }
                    }

                    function drawUserIcon(c, cx, cy) {
                        c.fillStyle = '#6366f1';
                        c.beginPath();
                        c.arc(cx, cy - 15, 25, 0, Math.PI * 2);
                        c.fill();
                        c.beginPath();
                        c.arc(cx, cy + 40, 45, Math.PI, 0);
                        c.fill();
                    }

                    drawCardFace(370, 220, 500, 750, false);
                    ctx.fillStyle = '#0f172a';
                    ctx.font = 'bold 20px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('[ CARD BACK SIDE ]', canvas.width / 2, 1020);
                    drawCardFace(370, 1050, 500, 630, true);

                    setTimeout(() => {
                        const link = document.createElement('a');
                        link.download = \`Student_ID_\${enroll}.png\`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                    }, 150);
                };

                window.saveProfileChanges = function() {
                    // Extract fields
                    const name = document.getElementById("profileNameInput").value.trim();
                    const phone = document.getElementById("profilePhoneInput").value.trim();
                    const dob = document.getElementById("profileDobInput").value.trim();
                    const blood = document.getElementById("profileBloodSelect").value;
                    const father = document.getElementById("profileFatherInput").value.trim();
                    const mother = document.getElementById("profileMotherInput").value.trim();
                    const guardian = document.getElementById("profileGuardianInput").value.trim();
                    const address = document.getElementById("profileAddressInput").value.trim();

                    const enroll = document.getElementById("profileEnrollInput").value.trim();
                    const roll = document.getElementById("profileRollInput").value.trim();
                    const course = document.getElementById("profileCourseInput").value.trim();
                    const sem = document.getElementById("profileSemInput").value.trim();
                    const dept = document.getElementById("profileDeptInput").value.trim();
                    const year = document.getElementById("profileYearInput").value.trim();
                    const busRoute = document.getElementById("profileBusInput").value.trim();
                    const hostel = document.getElementById("profileHostelSelect").value;
                    const allergy = document.getElementById("profileAllergyInput").value.trim();

                    if (!name || !phone || !address || !enroll || !roll) {
                        alert("Error: Name, Student ID, Roll Number, Phone, and Address are required!");
                        return;
                    }

                    // Save Personal
                    localStorage.setItem("loggedInUser", name);
                    localStorage.setItem("prof_phone", phone);
                    localStorage.setItem("prof_dob", dob);
                    localStorage.setItem("prof_blood", blood);
                    localStorage.setItem("prof_father", father);
                    localStorage.setItem("prof_mother", mother);
                    localStorage.setItem("prof_guardian", guardian);
                    localStorage.setItem("prof_address", address);

                    // Save Academic
                    localStorage.setItem("loggedInStudentId", enroll);
                    localStorage.setItem("prof_roll", roll);
                    localStorage.setItem("prof_course", course);
                    localStorage.setItem("prof_sem", sem);
                    localStorage.setItem("prof_dept", dept);
                    localStorage.setItem("prof_year", year);
                    localStorage.setItem("prof_bus", busRoute);
                    localStorage.setItem("hostelAllotted", hostel);
                    localStorage.setItem("prof_allergy", allergy);

                    loadParams();

                    // Sync header display elements immediately
                    const headerStrong = document.querySelector(".user-profile-widget .details strong");
                    if (headerStrong) headerStrong.textContent = name;

                    alert("All profile details & card registry updated successfully!");
                };

                // Photo upload handlers
                window.triggerPhotoUpload = function() {
                    const input = document.getElementById("profilePhotoFileInput");
                    if (input) input.click();
                };

                window.handlePhotoSelected = function(e) {
                    const file = e.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        const base64 = evt.target.result;
                        localStorage.setItem("studentPhoto", base64);
                        loadStudentPhoto();
                        alert("Profile photo successfully updated!");
                    };
                    reader.readAsDataURL(file);
                };

                function loadStudentPhoto() {
                    const photo = localStorage.getItem("studentPhoto");
                    const profImg = document.getElementById("profileAvatarImg");
                    const profIcon = document.getElementById("profileAvatarIcon");
                    const idImg = document.getElementById("idCardAvatarImg");
                    const idIcon = document.getElementById("idCardAvatarIcon");

                    if (photo) {
                        if (profImg) { profImg.src = photo; profImg.style.display = "block"; }
                        if (profIcon) { profIcon.style.display = "none"; }
                        if (idImg) { idImg.src = photo; idImg.style.display = "block"; }
                        if (idIcon) { idIcon.style.display = "none"; }
                    } else {
                        if (profImg) { profImg.style.display = "none"; }
                        if (profIcon) { profIcon.style.display = "block"; }
                        if (idImg) { idImg.style.display = "none"; }
                        if (idIcon) { idIcon.style.display = "block"; }
                    }
                }
            });
        `
    },
    {
        id: "settings",
        dir: "student/settings",
        title: "Settings",
        icon: "fa-sliders",
        category: "Overview",
        htmlContent: `
            <div class="settings-container" style="display:flex; flex-direction:column; gap:25px;">
                <!-- System Configuration -->
                <div class="settings-card glassmorphism" style="padding:30px; border-radius:12px; border:1px solid var(--border-color);">
                    <h3 style="margin:0 0 5px 0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-sliders"></i> Portal Preference Configurations</h3>
                    <p style="margin:0 0 20px 0; font-size:11px; color:var(--text-secondary);">Toggle feature visibility and toggle theme settings.</p>

                    <div style="display:flex; flex-direction:column; gap:15px;">
                        <!-- Toggle 1: Transport -->
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px;">
                            <div>
                                <strong style="font-size:13px; color:var(--text-primary); display:block; margin-bottom:2px;">Bus Transport Subscription Link</strong>
                                <p style="font-size:11px; color:var(--text-secondary); margin:0;">Enabling this adds the Transport routes and tracking widget to your navigation menu.</p>
                            </div>
                            <input type="checkbox" id="settingsTransportToggle" style="width:20px; height:20px; cursor:pointer;">
                        </div>

                        <!-- Toggle 2: Two Factor -->
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:15px;">
                            <div>
                                <strong style="font-size:13px; color:var(--text-primary); display:block; margin-bottom:2px;">Login Verification Alerts</strong>
                                <p style="font-size:11px; color:var(--text-secondary); margin:0;">Send instant email notifications to student account on every login session launch.</p>
                            </div>
                            <input type="checkbox" checked style="width:20px; height:20px; cursor:pointer;">
                        </div>

                        <!-- Toggle 3: Sound alerts -->
                        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:5px;">
                            <div>
                                <strong style="font-size:13px; color:var(--text-primary); display:block; margin-bottom:2px;">Audible Notification Alerts</strong>
                                <p style="font-size:11px; color:var(--text-secondary); margin:0;">Play soft notification bells on receiving messages inside ERP Messenger.</p>
                            </div>
                            <input type="checkbox" style="width:20px; height:20px; cursor:pointer;">
                        </div>
                    </div>
                </div>

                <!-- Password Update Card -->
                <div class="settings-card glassmorphism" style="padding:30px; border-radius:12px; border:1px solid var(--border-color);">
                    <h3 style="margin:0 0 5px 0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-lock"></i> Update Account Password</h3>
                    <p style="margin:0 0 20px 0; font-size:11px; color:var(--text-secondary);">Keep your ERP secure by regular security updates.</p>

                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:15px; margin-bottom:20px;">
                        <div>
                            <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Current Password</label>
                            <input type="password" id="oldPasswordInput" class="form-input" style="height:38px; font-size:12px;">
                        </div>
                        <div>
                            <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">New Password</label>
                            <input type="password" id="newPasswordInput" class="form-input" style="height:38px; font-size:12px;">
                        </div>
                        <div>
                            <label style="font-size:10px; color:var(--text-secondary); text-transform:uppercase; font-weight:700; display:block; margin-bottom:5px;">Confirm New Password</label>
                            <input type="password" id="confirmNewPasswordInput" class="form-input" style="height:38px; font-size:12px;">
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm" id="updatePasswordBtn" onclick="submitPasswordChange()" style="height:38px; font-weight:700; gap:8px;"><i class="fa-solid fa-key"></i> Update Security Credentials</button>
                </div>

                <!-- Local Storage & Performance Cache -->
                <div class="settings-card glassmorphism" style="padding:30px; border-radius:12px; border:1px solid var(--border-color);">
                    <h3 style="margin:0 0 5px 0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-database"></i> Database Cache & Portal Storage</h3>
                    <p style="margin:0 0 20px 0; font-size:11px; color:var(--text-secondary);">Manage local browser cache stored on this device by the ERP system.</p>
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; background:rgba(255,255,255,0.02); padding:15px; border-radius:8px; border:1px solid var(--border-color);">
                        <div style="font-size:12px; color:var(--text-primary);">
                            <span>Stored Size: <strong id="cacheSizeDisplay">0.00 KB</strong></span> • 
                            <span>Registered Items: <strong id="cacheItemsCount">0</strong></span>
                        </div>
                        <button class="btn btn-secondary btn-sm" onclick="clearLocalStorageCache()" style="background:#ef4444; border-color:#ef4444; color:#fff; height:32px; font-size:11px;"><i class="fa-solid fa-trash-can"></i> Reset & Clear Local Storage Cache</button>
                    </div>
                </div>

                <!-- Active Login Sessions -->
                <div class="settings-card glassmorphism" style="padding:30px; border-radius:12px; border:1px solid var(--border-color);">
                    <h3 style="margin:0 0 5px 0; font-size:16px; font-weight:800; color:var(--accent);"><i class="fa-solid fa-shield-halved"></i> Active Authorized Sessions</h3>
                    <p style="margin:0 0 20px 0; font-size:11px; color:var(--text-secondary);">Manage active devices currently signed into this ERP account.</p>
                    <div class="table-responsive">
                        <table class="custom-table" style="font-size:12px; width: 100%;">
                            <thead>
                                <tr>
                                    <th>Device / Browser</th>
                                    <th>IP Address</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="sessionLogsBody">
                                <tr>
                                    <td><strong>Windows Desktop • Google Chrome</strong></td>
                                    <td><code>192.168.1.45</code></td>
                                    <td>Jaipur, India</td>
                                    <td><span class="badge badge-success">Active Now</span></td>
                                    <td><button class="btn btn-secondary btn-sm" disabled style="height:26px; font-size:10px; padding:0 8px;">Current Device</button></td>
                                </tr>
                                <tr>
                                    <td><strong>Samsung Galaxy S24 • Edge Mobile</strong></td>
                                    <td><code>103.24.120.12</code></td>
                                    <td>Delhi, India</td>
                                    <td><span class="badge badge-secondary">2 hours ago</span></td>
                                    <td><button class="btn btn-secondary btn-sm" onclick="revokeSession(this)" style="height:26px; font-size:10px; padding:0 8px; color:#ef4444; border-color:rgba(239, 68, 68, 0.2); background:none;">Revoke Session</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Diagnostic System metadata info -->
                <div class="settings-card glassmorphism" style="padding:20px; border-radius:12px; border:1px dashed var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px;">
                    <div style="font-size:11px; color:var(--text-secondary);">
                        <span>UnifyEd ERP System Version: <strong>v4.8.2-stable</strong></span> • 
                        <span>Integrity Hash: <strong>SHA-E8B8F9A4</strong></span> • 
                        <span>Server Connection: <strong>Secure Websockets (SSL)</strong></span>
                    </div>
                    <span class="badge badge-success" style="font-size:9px;">All Systems Operational</span>
                </div>
            </div>
        `,
        cssContent: `
            .settings-card {
                padding: 30px;
            }
        `,
        jsContent: `
            document.addEventListener("DOMContentLoaded", () => {
                const transportToggle = document.getElementById("settingsTransportToggle");
                if (transportToggle) {
                    const usesTransport = localStorage.getItem("usesTransport") === "true";
                    transportToggle.checked = usesTransport;
                    
                    transportToggle.addEventListener("change", () => {
                        localStorage.setItem("usesTransport", transportToggle.checked ? "true" : "false");
                        if (transportToggle.checked) {
                            localStorage.setItem("busId", "BUS-05");
                            localStorage.setItem("routeId", "ROUTE-03");
                            localStorage.setItem("busNumber", "RJ14 AB 1234");
                        } else {
                            localStorage.setItem("busId", "");
                            localStorage.setItem("routeId", "");
                            localStorage.setItem("busNumber", "");
                        }
                        
                        const sidebarLinks = document.querySelectorAll(".sidebar-item");
                        sidebarLinks.forEach(linkItem => {
                            const textSpan = linkItem.querySelector("span");
                            if (textSpan && textSpan.textContent.trim().toLowerCase() === "transport") {
                                linkItem.style.display = transportToggle.checked ? "flex" : "none";
                            }
                        });
                    });
                }

                // Calculate local cache size in settings
                function calculateCacheSize() {
                    let total = 0;
                    for (let x in localStorage) {
                        if (localStorage.hasOwnProperty(x)) {
                            total += ((localStorage[x].length + x.length) * 2);
                        }
                    }
                    const sizeKB = (total / 1024).toFixed(2);
                    const count = Object.keys(localStorage).length;
                    const sizeNode = document.getElementById("cacheSizeDisplay");
                    const countNode = document.getElementById("cacheItemsCount");
                    if (sizeNode) sizeNode.textContent = sizeKB + " KB";
                    if (countNode) countNode.textContent = count;
                }
                calculateCacheSize();

                // Reset and clear cache
                window.clearLocalStorageCache = function() {
                    if (confirm("Are you sure you want to clear your local database cache? This will reset all checklist tasks, attendance logs, custom profiles, and notifications.")) {
                        localStorage.clear();
                        alert("ERP system database cache cleared and settings reset successfully. Reloading page...");
                        window.location.reload();
                    }
                };

                // Revoke session handler
                window.revokeSession = function(btn) {
                    if (confirm("Are you sure you want to log out and revoke authorization for this device?")) {
                        const tr = btn.closest("tr");
                        if (tr) {
                            tr.style.opacity = "0.5";
                            btn.disabled = true;
                            btn.textContent = "Revoked";
                            alert("Authorization token revoked successfully!");
                        }
                    }
                };

                window.submitPasswordChange = function() {
                    const oldPass = document.getElementById("oldPasswordInput").value.trim();
                    const newPass = document.getElementById("newPasswordInput").value.trim();
                    const confPass = document.getElementById("confirmNewPasswordInput").value.trim();

                    if (!oldPass || !newPass || !confPass) {
                        alert("Error: All password fields must be filled!");
                        return;
                    }

                    if (newPass !== confPass) {
                        alert("Error: New Password and Confirm Password do not match!");
                        return;
                    }

                    const updateBtn = document.getElementById("updatePasswordBtn");
                    if (updateBtn) {
                        updateBtn.disabled = true;
                        updateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating passwords...';
                    }

                    setTimeout(() => {
                        localStorage.setItem("userPassword", newPass);

                        if (updateBtn) {
                            updateBtn.disabled = false;
                            updateBtn.innerHTML = '<i class="fa-solid fa-key"></i> Update Security Credentials';
                        }

                        document.getElementById("oldPasswordInput").value = "";
                        document.getElementById("newPasswordInput").value = "";
                        document.getElementById("confirmNewPasswordInput").value = "";

                        alert("Security credentials updated successfully! Your new password has been verified.");
                    }, 1200);
                };
            });
        `
    }
];

// Fallback template for any page not uniquely customized above
function createGenericPageData(id, title, icon, category) {
    return {
        id: id,
        title: title,
        icon: icon,
        category: category,
        htmlContent: `
            <div class="generic-feature-card glassmorphism">
                <i class="fa-solid \${icon} generic-icon"></i>
                <h2>\${title}</h2>
                <p>Welcome to the UnifyEd ERP Student Portal. This section manages your \${title.toLowerCase()} configurations and services.</p>
                <div class="status-box">
                    <span>Feature Status</span>
                    <strong>Active / Synchronized</strong>
                </div>
            </div>
        `,
        cssContent: `
            .generic-feature-card {
                padding: 40px;
                text-align: center;
                max-width: 600px;
                margin: 40px auto 0 auto;
            }
            .generic-icon {
                font-size: 48px;
                color: var(--primary);
                margin-bottom: 20px;
            }
            .generic-feature-card h2 {
                font-size: 22px;
                font-weight: 700;
                margin-bottom: 12px;
            }
            .generic-feature-card p {
                font-size: 14px;
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .status-box {
                display: flex;
                justify-content: space-between;
                padding: 12px 20px;
                background-color: var(--bg-tertiary);
                border-radius: var(--border-radius-sm);
                border: 1px solid var(--border-color);
            }
            .status-box span {
                font-size: 13px;
                color: var(--text-secondary);
            }
        `,
        jsContent: `
            console.log("\${title} Module Initialized");
        `
    };
}

// Full List of 26 Pages
const allPageKeys = [
    { id: "dashboard", dir: "student/dashboard", title: "Student Dashboard", icon: "fa-chart-pie", category: "Overview" },
    { id: "timetable", dir: "student/academics/timetable", title: "Class Timetable", icon: "fa-calendar-week", category: "Academics" },
    { id: "attendance", dir: "student/academics/attendance", title: "Class Attendance", icon: "fa-clock-rotate-left", category: "Academics" },
    { id: "results", dir: "student/academics/results", title: "Semester Results", icon: "fa-award", category: "Academics" },
    { id: "exams", dir: "student/academics/exams", title: "Examinations", icon: "fa-file-signature", category: "Academics" },
    { id: "progress", dir: "student/academics/progress", title: "Academic Progress", icon: "fa-chart-line", category: "Academics" },
    { id: "stream", dir: "student/classroom/stream", title: "Classroom Stream", icon: "fa-bullhorn", category: "Classroom" },
    { id: "assignments", dir: "student/classroom/assignments", title: "Assignments", icon: "fa-file-lines", category: "Classroom" },
    { id: "study-materials", dir: "student/classroom/study-materials", title: "Study Materials", icon: "fa-book-open-reader", category: "Classroom" },
    { id: "quiz", dir: "student/classroom/quiz", title: "Quizzes", icon: "fa-lightbulb", category: "Classroom" },
    { id: "discussion", dir: "student/classroom/discussion", title: "Discussions", icon: "fa-comments", category: "Classroom" },
    { id: "grades", dir: "student/classroom/grades", title: "Classroom Grades", icon: "fa-percent", category: "Classroom" },
    { id: "members", dir: "student/classroom/members", title: "Class Members", icon: "fa-users-line", category: "Classroom" },
    { id: "live-classes", dir: "student/live-classes", title: "Live Lectures", icon: "fa-video", category: "Learning" },
    { id: "projects", dir: "student/projects", title: "My Projects", icon: "fa-diagram-project", category: "Learning" },
    { id: "mentor", dir: "student/mentor", title: "My Mentor", icon: "fa-chalkboard-user", category: "Support" },
    { id: "fees", dir: "student/services/fees", title: "Fee Details", icon: "fa-wallet", category: "Services" },
    { id: "applications", dir: "student/services/applications", title: "Applications", icon: "fa-file-invoice", category: "Services" },
    { id: "certificates", dir: "student/services/certificates", title: "Certificates", icon: "fa-certificate", category: "Services" },
    { id: "transport", dir: "student/services/transport", title: "Transport", icon: "fa-bus", category: "Services" },
    { id: "library", dir: "student/services/library", title: "Library Portal", icon: "fa-book", category: "Services" },
    { id: "career", dir: "student/career", title: "Career & Placement", icon: "fa-briefcase", category: "Services" },
    { id: "communication", dir: "student/communication", title: "ERP Messenger", icon: "fa-message", category: "Communication" },
    { id: "ai-assistant", dir: "student/ai-assistant", title: "AI Help Assistant", icon: "fa-robot", category: "Overview" },
    { id: "profile", dir: "student/profile", title: "My Profile", icon: "fa-id-card", category: "Overview" },
    { id: "settings", dir: "student/settings", title: "Settings", icon: "fa-sliders", category: "Overview" }
];

// Helper to make directory recursive
function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// Generate files
allPageKeys.forEach(pKey => {
    // Find customized page or create generic
    let pInfo = pages.find(pg => pg.id === pKey.id);
    if (!pInfo) {
        pInfo = createGenericPageData(pKey.id, pKey.title, pKey.icon, pKey.category);
    }

    const htmlPath = path.join(__dirname, '..', pKey.dir, `${pKey.id}.html`);
    const cssPath = path.join(__dirname, '..', pKey.dir, `${pKey.id}.css`);
    const jsPath = path.join(__dirname, '..', pKey.dir, `${pKey.id}.js`);

    // Determine path depth (to set correct relative imports: ../../student-shared.css etc)
    const folderDepth = pKey.dir.split('/').length - 1; // 1 for student/dashboard, 2 for student/academics/timetable
    const relPrefix = '../'.repeat(folderDepth);

    // Sidebar rendering
    const sidebarHtml = allPageKeys.map(sidebarKey => {
        const activeClass = sidebarKey.id === pKey.id ? 'active' : '';
        const itemDepth = sidebarKey.dir.split('/').length - 1;

        // Link calculation: relative to current page location using path.relative
        let relPath = path.relative(pKey.dir, sidebarKey.dir).replace(/\\/g, '/');
        const link = relPath ? `${relPath}/${sidebarKey.id}.html` : `${sidebarKey.id}.html`;

        return `
                <a href="${link}" class="sidebar-item ${activeClass}">
                    <i class="fa-solid ${sidebarKey.icon}"></i>
                    <span>${sidebarKey.title}</span>
                </a>
        `;
    }).join('\n');

    // Create Page Template
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
    <title>UnifyEd Student Portal - ${pKey.title}</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Shared Style System -->
    <link rel="stylesheet" href="${relPrefix}student-shared.css">
    <!-- Page Specific Stylesheet -->
    <link rel="stylesheet" href="${pKey.id}.css">
</head>
<body class="student-portal-body">

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
                        <input type="text" id="portalSearchInput" placeholder="Search pages, tools, assignments..." autocomplete="off">
                        <div id="portalSearchResults" class="search-results-dropdown glassmorphism"></div>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="theme-toggle-btn" id="headerThemeToggle" title="Toggle Theme">
                        <i class="fa-solid fa-sun icon-sun"></i>
                        <i class="fa-solid fa-moon icon-moon"></i>
                    </button>
                    <div class="notification-trigger" id="portalNotificationTrigger">
                        <i class="fa-solid fa-bell"></i>
                        <span class="badge badge-error" id="portalNotificationBadge">2</span>
                        <div id="portalNotificationsDropdown" class="notifications-dropdown glassmorphism">
                            <div class="dropdown-header">
                                <h3>Notifications</h3>
                                <button id="markAllReadBtn">Clear All</button>
                            </div>
                            <div class="dropdown-body" id="notificationsDropdownBody">
                                <!-- Dynamic notifications loaded via JS -->
                            </div>
                        </div>
                    </div>
                    <div class="user-profile-widget" id="portalProfileTrigger" style="position: relative; cursor: pointer;">
                        <div class="details">
                            <strong>Aditya Sharma</strong>
                            <span>UNIFY-2026-1024</span>
                        </div>
                        <i class="fa-solid fa-circle-user profile-avatar"></i>
                        <div id="portalProfileDropdown" class="profile-dropdown glassmorphism">
                            <a href="${relPrefix}profile/profile.html" class="profile-dropdown-item"><i class="fa-solid fa-user"></i> View Profile</a>
                            <a href="${relPrefix}settings/settings.html" class="profile-dropdown-item"><i class="fa-solid fa-gears"></i> Settings</a>
                            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 6px 0;">
                            <a href="${relPrefix}../auth/login.html" class="profile-dropdown-item logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Content Area -->
            <main class="portal-content">
                <div class="page-header">
                    <h1>${pKey.title}</h1>
                    <span class="breadcrumbs">UnifyEd • Student Portal • ${pKey.category} • ${pKey.title}</span>
                </div>

                <!-- Custom Content Block -->
                ${pInfo.htmlContent}
            </main>
        </div>
    </div>

    <!-- Shared Portal Script -->
    <script src="${relPrefix}student-shared.js"></script>
    <!-- Page Specific Script -->
    <script src="${pKey.id}.js"></script>
</body>
</html>
`;

    // Create directories and write files
    ensureDirectoryExistence(htmlPath);
    fs.writeFileSync(htmlPath, fullHtml, 'utf8');
    fs.writeFileSync(cssPath, pInfo.cssContent, 'utf8');
    fs.writeFileSync(jsPath, pInfo.jsContent, 'utf8');
    console.log(`Generated: ${pKey.dir}/${pKey.id}.html, .css, .js`);
});
