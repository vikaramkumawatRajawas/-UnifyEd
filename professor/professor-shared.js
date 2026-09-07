document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggler
    const menuToggleBtn = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    if (menuToggleBtn && sidebar) {
        menuToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("active");
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener("click", (e) => {
            if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== menuToggleBtn) {
                sidebar.classList.remove("active");
            }
        });
    }

    // 1.5 Desktop Menu Toggler
    const desktopToggleBtn = document.getElementById("desktopSidebarToggle");
    const portalLayout = document.querySelector(".portal-layout");
    if (desktopToggleBtn && portalLayout) {
        desktopToggleBtn.addEventListener("click", () => {
            portalLayout.classList.toggle("sidebar-collapsed");
        });
    }

    // 2. Global Theme Syncing logic
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);

    function toggleTheme() {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn, #themeToggleBtn, #headerThemeToggle, #themeToggleBtnDesktop");
    themeToggleBtns.forEach(btn => {
        btn.addEventListener("click", toggleTheme);
    });

    // 2.5 Portal Mode (Basic vs Advance) Logic for Professor
    const currentMode = localStorage.getItem("portalMode") || "advance";
    document.documentElement.setAttribute("data-portal-mode", currentMode);

    window.setPortalMode = function(mode) {
        const currentActiveMode = localStorage.getItem("portalMode") || "advance";
        const targetMode = (mode === "basic") ? "basic" : "advance";

        // Alert confirmation when switching from Basic to Advance mode
        if (targetMode === "advance" && currentActiveMode === "basic") {
            const confirmed = confirm("🚀 Switch to Advance Mode?\n\nThis will unlock research metrics, advanced grade reports, mentor meeting tools, and full faculty suite. Click OK to proceed.");
            if (!confirmed) return;
        }

        document.documentElement.setAttribute("data-portal-mode", targetMode);
        localStorage.setItem("portalMode", targetMode);

        const btnBasic = document.getElementById("modeBtnBasic");
        const btnAdvance = document.getElementById("modeBtnAdvance");
        if (btnBasic && btnAdvance) {
            if (targetMode === "basic") {
                btnBasic.classList.add("active");
                btnAdvance.classList.remove("active");
            } else {
                btnAdvance.classList.add("active");
                btnBasic.classList.remove("active");
            }
        }
        applyProfModeToSidebar();
    };

    function applyProfModeToSidebar() {
        const activeMode = localStorage.getItem("portalMode") || "advance";
        const sidebarItems = document.querySelectorAll(".sidebar-menu .sidebar-item");
        
        sidebarItems.forEach(item => {
            const href = (item.getAttribute("href") || "").toLowerCase();
            const text = (item.textContent || "").toLowerCase();

            // Professor Essential items in Basic Mode:
            // Dashboard, Students Registry, Attendance Reports, Marks Reports, Assignment Reports, Profile, Settings
            const isEssential = href.includes("dashboard.html") || 
                                href.includes("students.html") || 
                                href.includes("attendance-report.html") || 
                                href.includes("marks-report.html") || 
                                href.includes("assignment-report.html") || 
                                href.includes("profile.html") ||
                                href.includes("settings.html") ||
                                text.includes("dashboard") ||
                                text.includes("student") ||
                                text.includes("attendance report") ||
                                text.includes("marks report") ||
                                text.includes("assignment report") ||
                                text.includes("profile") ||
                                text.includes("settings");
                                
            if (!isEssential) {
                item.classList.add("mode-advance-only");
            } else {
                item.classList.remove("mode-advance-only");
            }
        });
    }

    function initProfHeaderModeSwitcher() {
        const headerActions = document.querySelector(".header-actions") || document.querySelector(".main-portal-header");
        if (!headerActions || document.getElementById("portalModeSwitcher")) return;

        const switcher = document.createElement("div");
        switcher.className = "portal-mode-switcher";
        switcher.id = "portalModeSwitcher";
        
        const activeMode = localStorage.getItem("portalMode") || "advance";

        switcher.innerHTML = `
            <button type="button" class="portal-mode-btn ${activeMode === 'basic' ? 'active' : ''}" id="modeBtnBasic" title="Switch to Basic Minimal Mode">
                <i class="fa-solid fa-bolt"></i> Basic
            </button>
            <button type="button" class="portal-mode-btn ${activeMode === 'advance' ? 'active' : ''}" id="modeBtnAdvance" title="Switch to Full Advance Mode">
                <i class="fa-solid fa-rocket"></i> Advance
            </button>
        `;

        if (headerActions.classList.contains("header-actions")) {
            headerActions.insertBefore(switcher, headerActions.firstChild);
        } else {
            headerActions.appendChild(switcher);
        }

        document.getElementById("modeBtnBasic").addEventListener("click", () => window.setPortalMode("basic"));
        document.getElementById("modeBtnAdvance").addEventListener("click", () => window.setPortalMode("advance"));
    }

    initProfHeaderModeSwitcher();
    applyProfModeToSidebar();

    // 3. Dynamic Profile & Name Syncing from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser") || "Dr. Rajesh Kumar";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId") || "CSE-EMP-204";

    let displayName = loggedInUser;
    const regFirst = localStorage.getItem("registeredFirstName");
    const regLast = localStorage.getItem("registeredLastName");
    const regUser = localStorage.getItem("registeredUsername");

    if (regFirst && (loggedInUser === regUser || loggedInUser === localStorage.getItem("registeredEmail") || loggedInUser === localStorage.getItem("regEmail"))) {
        displayName = `${regFirst} ${regLast}`;
    } else if (loggedInUser.includes("@")) {
        displayName = loggedInUser.split("@")[0].split(/[._-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    } else if (loggedInUser !== "Dr. Rajesh Kumar") {
        displayName = loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1);
    }

    // Update Header profile widget
    const headerStrong = document.querySelector(".user-profile-widget .details strong");
    const headerSpan = document.querySelector(".user-profile-widget .details span");
    if (headerStrong) headerStrong.textContent = displayName;
    if (headerSpan) headerSpan.textContent = loggedInStudentId;

    // Update Profile page if active
    const profileHeaderSpan = document.querySelector(".profile-header span");
    if (profileHeaderSpan) {
        const professorDept = localStorage.getItem("professorDept") || "BCA";
        const professorSem = localStorage.getItem("professorSem") || "3";
        profileHeaderSpan.textContent = `Enrollment: ${loggedInStudentId} • ${professorDept} • Sem ${professorSem}`;
    }

    const detailBlocks = document.querySelectorAll(".detail-block");
    detailBlocks.forEach(block => {
        const titleStrong = block.querySelector("strong");
        if (titleStrong && titleStrong.textContent.includes("Personal Details")) {
            const pTags = block.querySelectorAll("p");
            pTags.forEach(p => {
                const labelText = p.querySelector("span") ? p.querySelector("span").textContent.toLowerCase() : "";
                if (labelText.includes("full name")) {
                    p.innerHTML = `<span>Full Name:</span> ${displayName}`;
                } else if (labelText.includes("email address")) {
                    const emailVal = localStorage.getItem("regEmail") || (loggedInUser.includes("@") ? loggedInUser : `${loggedInUser.toLowerCase()}@unifyed.edu`);
                    p.innerHTML = `<span>Email Address:</span> ${emailVal}`;
                }
            });
        } else if (titleStrong && titleStrong.textContent.includes("Academic Information")) {
            const pTags = block.querySelectorAll("p");
            pTags.forEach(p => {
                const labelText = p.querySelector("span") ? p.querySelector("span").textContent.toLowerCase() : "";
                if (labelText.includes("department")) {
                    const deptVal = localStorage.getItem("professorDept") || "BCA";
                    p.innerHTML = `<span>Department:</span> ${deptVal}`;
                } else if (labelText.includes("semester")) {
                    const semVal = localStorage.getItem("professorSem") || "3";
                    p.innerHTML = `<span>Semester:</span> ${semVal}`;
                }
            });
        }
    });

    const profileGrid = document.querySelector(".profile-details-grid");
    if (profileGrid && !document.getElementById("facilitiesStatusBlock")) {
        const hostelOpted = localStorage.getItem("hostelEnabled") === "true" ? "✅ Yes" : "❌ No";
        const scholarshipOpted = localStorage.getItem("scholarshipEnabled") === "true" ? "✅ Yes" : "❌ No";
        const transportOpted = localStorage.getItem("usesTransport") === "true" ? "✅ Yes" : "❌ No";
        const busRoute = localStorage.getItem("routeId") || "N/A";
        const busNo = localStorage.getItem("busNumber") || "N/A";

        const facilityBlock = document.createElement("div");
        facilityBlock.className = "detail-block glassmorphism";
        facilityBlock.id = "facilitiesStatusBlock";
        facilityBlock.style.padding = "20px";
        facilityBlock.style.borderRadius = "var(--border-radius-sm)";
        facilityBlock.style.border = "1px solid var(--border-color)";
        facilityBlock.innerHTML = `
            <strong style="display:block; font-size:16px; margin-bottom:15px; text-transform:uppercase; letter-spacing:1px; color:var(--accent);">Facility & Feature Flags Status</strong>
            <p style="font-size:14px; margin-bottom:12px; color:var(--text-primary);">
                <span style="color:var(--text-secondary); display:inline-block; width:180px;">Transport Opted:</span> ${transportOpted}
            </p>
            ${localStorage.getItem("usesTransport") === "true" ? `
            <p style="font-size:14px; margin-bottom:12px; color:var(--text-primary);">
                <span style="color:var(--text-secondary); display:inline-block; width:180px;">Bus Route:</span> ${busRoute}
            </p>
            <p style="font-size:14px; margin-bottom:12px; color:var(--text-primary);">
                <span style="color:var(--text-secondary); display:inline-block; width:180px;">Bus Number:</span> ${busNo}
            </p>
            ` : ''}
            <p style="font-size:14px; margin-bottom:12px; color:var(--text-primary);">
                <span style="color:var(--text-secondary); display:inline-block; width:180px;">Hostel Opted:</span> ${hostelOpted}
            </p>
            <p style="font-size:14px; margin-bottom:12px; color:var(--text-primary);">
                <span style="color:var(--text-secondary); display:inline-block; width:180px;">Scholarship Opted:</span> ${scholarshipOpted}
            </p>
        `;
        profileGrid.appendChild(facilityBlock);
    }

    // 4. Update Welcome Card (if present)
    const welcomeName = document.getElementById("welcomeStudentName") || document.getElementById("welcomeProfName");
    if (welcomeName) {
        welcomeName.textContent = displayName; // Full display name
    }

    const welcomeDate = document.getElementById("welcomeDateDisplay");
    if (welcomeDate) {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        welcomeDate.textContent = new Date().toLocaleDateString("en-US", dateOptions);
    }

    // 5. Hide/Show Transport Sidebar Menu Item based on subscription status
    if (localStorage.getItem("usesTransport") === null) {
        localStorage.setItem("usesTransport", "false"); // Default to hidden
    }

    const usesTransport = localStorage.getItem("usesTransport") === "true";
    const sidebarLinks = document.querySelectorAll(".sidebar-item");
    sidebarLinks.forEach(linkItem => {
        const textSpan = linkItem.querySelector("span");
        if (textSpan && textSpan.textContent.trim().toLowerCase() === "transport") {
            if (!usesTransport) {
                linkItem.style.display = "none";
            } else {
                linkItem.style.display = "flex";
            }
        }
    });

    // 6. Persist Sidebar Scroll Position across page reloads
    const sidebarMenu = document.querySelector(".sidebar-menu");
    if (sidebarMenu) {
        const savedScroll = localStorage.getItem("sidebar_scroll_position");
        if (savedScroll) {
            sidebarMenu.scrollTop = parseInt(savedScroll, 10);
        }

        const items = sidebarMenu.querySelectorAll(".sidebar-item");
        items.forEach(link => {
            link.addEventListener("click", () => {
                localStorage.setItem("sidebar_scroll_position", sidebarMenu.scrollTop);
            });
        });

        window.addEventListener("beforeunload", () => {
            localStorage.setItem("sidebar_scroll_position", sidebarMenu.scrollTop);
        });
    }

    // 7. Smart Search Bar System
    const searchInput = document.getElementById("portalSearchInput");
    const searchResults = document.getElementById("portalSearchResults");

    if (searchInput && searchResults) {
        // Search Database
        const searchDatabase = [
            // Navigation Pages
            { title: "Student Dashboard", category: "Pages", url: "dashboard/dashboard.html", icon: "fa-chart-pie", badge: "Overview" },
            { title: "Class Timetable", category: "Pages", url: "academics/timetable/timetable.html", icon: "fa-calendar-days", badge: "Academics" },
            { title: "Class Attendance", category: "Pages", url: "academics/attendance/attendance.html", icon: "fa-clock-rotate-left", badge: "Academics" },
            { title: "Semester Results", category: "Pages", url: "academics/results/results.html", icon: "fa-square-poll-vertical", badge: "Academics" },
            { title: "Examinations", category: "Pages", url: "academics/exams/exams.html", icon: "fa-file-invoice", badge: "Academics" },
            { title: "Academic Progress Tracker", category: "Pages", url: "academics/progress/progress.html", icon: "fa-chart-line", badge: "Academics" },
            
            { title: "Google Classroom Stream", category: "Pages", url: "classroom/stream/stream.html", icon: "fa-graduation-cap", badge: "Classroom" },
            { title: "Assignments & Submissions", category: "Pages", url: "classroom/assignments/assignments.html", icon: "fa-file-circle-check", badge: "Classroom" },
            { title: "Study Materials & Notes", category: "Pages", url: "classroom/study-materials/study-materials.html", icon: "fa-folder-open", badge: "Classroom" },
            { title: "Active Quizzes & Tests", category: "Pages", url: "classroom/quiz/quiz.html", icon: "fa-list-check", badge: "Classroom" },
            { title: "Group Discussions", category: "Pages", url: "classroom/discussion/discussion.html", icon: "fa-comments", badge: "Classroom" },
            { title: "Classroom Grades", category: "Pages", url: "classroom/grades/grades.html", icon: "fa-award", badge: "Classroom" },
            { title: "Class Members & Teachers", category: "Pages", url: "classroom/members/members.html", icon: "fa-users", badge: "Classroom" },
            
            { title: "Students Registry", category: "Student Management", url: "student-management/students/students.html", icon: "fa-address-book", badge: "Students" },
            { title: "Student Projects Hub", category: "Student Management", url: "student-management/projects/projects.html", icon: "fa-diagram-project", badge: "Projects" },
            { title: "Mentor Meetings & Schedule", category: "Student Management", url: "student-management/mentor-meeting/mentor-meeting.html", icon: "fa-handshake", badge: "Mentor" },
            { title: "Leave & Document Applications", category: "Student Management", url: "student-management/applications/applications.html", icon: "fa-file-invoice", badge: "Applications" },
            { title: "Student Certificates & Credentials", category: "Student Management", url: "student-management/certificates/certificates.html", icon: "fa-certificate", badge: "Certificates" },
            { title: "College Transport (Bus Route)", category: "Pages", url: "services/transport/transport.html", icon: "fa-bus", badge: "Services" },
            { title: "Digital Library Search", category: "Pages", url: "services/library/library.html", icon: "fa-book", badge: "Services" },
            { title: "Placement & Career Guidance", category: "Pages", url: "career/career.html", icon: "fa-briefcase", badge: "Career" },
            { title: "Mailbox & Chat Communication", category: "Pages", url: "communication/communication.html", icon: "fa-envelope", badge: "Communication" },
            { title: "AI Assistant (UnifyEd Bot)", category: "Pages", url: "ai-assistant/ai-assistant.html", icon: "fa-robot", badge: "AI Support" },
            { title: "My Profile ID Card", category: "Pages", url: "profile/profile.html", icon: "fa-id-card", badge: "Profile" },
            { title: "ERP Settings & Security", category: "Pages", url: "settings/settings.html", icon: "fa-gears", badge: "Settings" },

            // Actions & Short Tools
            { title: "Change Theme (Light/Dark)", category: "Quick Actions", action: "toggleTheme", icon: "fa-circle-half-stroke", badge: "Action" },
            { title: "Clear Sidebar Scroll", category: "Quick Actions", action: "clearScroll", icon: "fa-arrow-rotate-left", badge: "Action" },
            { title: "Log Out of Portal", category: "Quick Actions", action: "logout", icon: "fa-right-from-bracket", badge: "Action" }
        ];

        let selectedIndex = -1;

        // Calculate relative prefix to get back to professor/ root
        const pathSegments = window.location.pathname.split('/');
        const professorIdx = pathSegments.indexOf("professor");
        let relativeRoot = "";
        if (professorIdx !== -1) {
            const depth = pathSegments.length - professorIdx - 2;
            for (let i = 0; i < depth; i++) {
                relativeRoot += "../";
            }
        }

        function renderResults(filtered) {
            searchResults.innerHTML = "";
            if (filtered.length === 0) {
                searchResults.innerHTML = `<div style="padding: 12px; font-size:12px; color:var(--text-tertiary); text-align:center;">No results found. Try "Timetable" or "Fees"</div>`;
                return;
            }

            let currentCategory = "";
            filtered.forEach((item, index) => {
                if (item.category !== currentCategory) {
                    currentCategory = item.category;
                    const catTitle = document.createElement("div");
                    catTitle.className = "search-category-title";
                    catTitle.innerText = currentCategory;
                    searchResults.appendChild(catTitle);
                }

                const resultItem = document.createElement("a");
                resultItem.className = `search-result-item ${index === selectedIndex ? 'selected' : ''}`;
                resultItem.href = item.url ? relativeRoot + item.url : "#";
                resultItem.innerHTML = `
                    <i class="fa-solid ${item.icon}"></i>
                    <span>${item.title}</span>
                    <span class="badge badge-success" style="font-size: 8px; background:var(--primary-glow);">${item.badge}</span>
                `;

                resultItem.addEventListener("click", (e) => {
                    if (item.action) {
                        e.preventDefault();
                        triggerSearchAction(item.action);
                    }
                });

                searchResults.appendChild(resultItem);
            });
        }

        function triggerSearchAction(action) {
            if (action === "toggleTheme") {
                toggleTheme();
            } else if (action === "clearScroll") {
                localStorage.removeItem("sidebar_scroll_position");
                alert("Sidebar scroll memory reset!");
            } else if (action === "logout") {
                window.location.href = relativeRoot + "../auth/login.html";
            }
            searchResults.classList.remove("active");
            searchInput.value = "";
        }

        searchInput.addEventListener("input", () => {
            const val = searchInput.value.toLowerCase().trim();
            if (val.length === 0) {
                searchResults.classList.remove("active");
                return;
            }

            const filtered = searchDatabase.filter(item => 
                item.title.toLowerCase().includes(val) || 
                item.category.toLowerCase().includes(val) ||
                item.badge.toLowerCase().includes(val)
            );

            selectedIndex = -1;
            searchResults.classList.add("active");
            renderResults(filtered);
        });

        searchInput.addEventListener("keydown", (e) => {
            const items = searchResults.querySelectorAll(".search-result-item");
            if (items.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % items.length;
                updateSelection(items);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                updateSelection(items);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    items[selectedIndex].click();
                }
            } else if (e.key === "Escape") {
                searchResults.classList.remove("active");
                searchInput.blur();
            }
        });

        function updateSelection(items) {
            items.forEach((item, index) => {
                if (index === selectedIndex) {
                    item.classList.add("selected");
                    item.scrollIntoView({ block: "nearest" });
                } else {
                    item.classList.remove("selected");
                }
            });
        }

        // Close search list on clicking outside
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove("active");
            }
        });
    }

    // 8. Notifications System
    const notifTrigger = document.getElementById("portalNotificationTrigger") || document.getElementById("notificationBtn") || document.querySelector(".notification-wrapper button");
    let notifDropdown = document.getElementById("portalNotificationsDropdown");
    let notifBadge = document.getElementById("portalNotificationBadge") || (notifTrigger ? notifTrigger.querySelector(".notification-dot") : null);

    if (notifTrigger) {
        // Auto inject notification dropdown if not present in markup
        if (!notifDropdown) {
            notifDropdown = document.createElement("div");
            notifDropdown.className = "notifications-dropdown glassmorphism";
            notifDropdown.id = "portalNotificationsDropdown";
            notifDropdown.innerHTML = `
                <div class="dropdown-header">
                    <h3>Notifications</h3>
                    <button id="markAllReadBtn">Clear All</button>
                </div>
                <div class="dropdown-body" id="notificationsDropdownBody"></div>
            `;
            const wrapper = notifTrigger.parentElement;
            if (wrapper) {
                wrapper.style.position = "relative";
                wrapper.appendChild(notifDropdown);
            }
        }

        const notifBody = notifDropdown.querySelector("#notificationsDropdownBody") || document.getElementById("notificationsDropdownBody");
        const markAllReadBtn = notifDropdown.querySelector("#markAllReadBtn") || document.getElementById("markAllReadBtn");

        let notifications = JSON.parse(localStorage.getItem("portal_notifications")) || [
            { id: 1, title: "Mid-Term Registration", message: "Elective specializations deadline is this Friday.", time: "3 hours ago", unread: true, icon: "fa-calendar-check" },
            { id: 2, title: "TCS Ninja Drive", message: "Registrations are open for the 2026 Batch.", time: "1 day ago", unread: true, icon: "fa-briefcase" },
            { id: 3, title: "Grades Updated", message: "Advanced Database tuning quiz grades declared.", time: "2 days ago", unread: false, icon: "fa-award" }
        ];

        function saveNotifications() {
            localStorage.setItem("portal_notifications", JSON.stringify(notifications));
        }

        function updateNotificationBadge() {
            if (!notifBadge) return;
            const unreadCount = notifications.filter(n => n.unread).length;
            if (unreadCount > 0) {
                notifBadge.textContent = unreadCount;
                notifBadge.style.display = "flex";
            } else {
                notifBadge.style.display = "none";
            }
        }

        function renderNotifications() {
            if (!notifBody) return;
            notifBody.innerHTML = "";
            if (notifications.length === 0) {
                notifBody.innerHTML = `<div style="padding: 20px; font-size: 12px; color: var(--text-tertiary); text-align: center;">No new notifications</div>`;
                return;
            }

            notifications.forEach(item => {
                const notifItem = document.createElement("div");
                notifItem.className = `notification-item ${item.unread ? 'unread' : ''}`;
                notifItem.innerHTML = `
                    <i class="fa-solid ${item.icon}"></i>
                    <div class="content">
                        <strong>${item.title}</strong>
                        <p>${item.message}</p>
                        <span class="time">${item.time}</span>
                    </div>
                `;

                // Mark as read on click
                notifItem.addEventListener("click", () => {
                    if (item.unread) {
                        item.unread = false;
                        saveNotifications();
                        updateNotificationBadge();
                        renderNotifications();
                    }
                });

                notifBody.appendChild(notifItem);
            });
        }

        // Toggle dropdown open/close
        notifTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle("active");
            if (searchResults) searchResults.classList.remove("active");
        });

        // Close on clicking outside
        document.addEventListener("click", (e) => {
            if (!notifTrigger.contains(e.target) && !notifDropdown.contains(e.target)) {
                notifDropdown.classList.remove("active");
            }
        });

        // Clear all / Mark all read
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                notifications = [];
                saveNotifications();
                updateNotificationBadge();
                renderNotifications();
            });
        }

        // Initial Load
        updateNotificationBadge();
        renderNotifications();
    }

    // 9. Profile Dropdown System
    const profileTrigger = document.getElementById("portalProfileTrigger");
    let profileDropdown = document.getElementById("portalProfileDropdown");

    if (profileTrigger) {
        if (!profileDropdown) {
            profileDropdown = document.createElement("div");
            profileDropdown.id = "portalProfileDropdown";
            profileDropdown.className = "profile-dropdown-popover glassmorphism";
            profileDropdown.style.position = "absolute";
            profileDropdown.style.top = "calc(100% + 12px)";
            profileDropdown.style.right = "0";
            profileDropdown.style.width = "220px";
            profileDropdown.style.padding = "12px 0";
            profileDropdown.style.zIndex = "1000";
            profileDropdown.style.display = "none";
            profileDropdown.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
            
            let profUrl = "../profile/profile.html";
            let setUrl = "../settings/settings.html";
            const path = window.location.pathname.replace(/\\/g, '/');
            if (path.includes('/student-management/') || path.includes('/reports/') || path.includes('/live-classes/') || path.includes('/classroom/') || path.includes('/academics/')) {
                profUrl = '../../profile/profile.html';
                setUrl = '../../settings/settings.html';
            } else if (path.includes('/profile/')) {
                profUrl = 'profile.html';
                setUrl = '../settings/settings.html';
            } else if (path.includes('/settings/')) {
                profUrl = '../profile/profile.html';
                setUrl = 'settings.html';
            }
            
            profileDropdown.innerHTML = `
                <div style="padding: 10px 16px; border-bottom: 1px solid var(--border-color); margin-bottom: 6px;">
                    <div style="font-weight: 700; font-size: 14px; color: var(--text-primary);">${displayName}</div>
                    <div style="font-size: 11px; color: var(--text-secondary);">${loggedInStudentId}</div>
                </div>
                <a href="${profUrl}" style="display: flex; align-items: center; gap: 10px; padding: 10px 16px; color: var(--text-primary); text-decoration: none; font-size: 13px; transition: background 0.2s;">
                    <i class="fa-solid fa-user" style="color: var(--primary); width: 16px;"></i> View Profile
                </a>
                <a href="${setUrl}" style="display: flex; align-items: center; gap: 10px; padding: 10px 16px; color: var(--text-primary); text-decoration: none; font-size: 13px; transition: background 0.2s;">
                    <i class="fa-solid fa-gear" style="color: var(--secondary); width: 16px;"></i> Settings
                </a>
                <div style="border-top: 1px solid var(--border-color); margin-top: 6px; padding-top: 6px;">
                    <a href="#" id="profileHeaderLogout" style="display: flex; align-items: center; gap: 10px; padding: 10px 16px; color: #ef4444; text-decoration: none; font-size: 13px; transition: background 0.2s;">
                        <i class="fa-solid fa-right-from-bracket" style="width: 16px;"></i> Logout
                    </a>
                </div>
            `;
            profileTrigger.style.position = "relative";
            profileTrigger.appendChild(profileDropdown);

            const logoutBtn = profileDropdown.querySelector("#profileHeaderLogout");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    let relativeRoot = "";
                    const pathSegments = window.location.pathname.split('/');
                    const professorIdx = pathSegments.indexOf("professor");
                    if (professorIdx !== -1) {
                        const depth = pathSegments.length - professorIdx - 2;
                        for (let i = 0; i < depth; i++) {
                            relativeRoot += "../";
                        }
                    }
                    window.location.href = relativeRoot + "../auth/login.html";
                });
            }
        }

        profileTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isVisible = profileDropdown.style.display === "block" || profileDropdown.classList.contains("active");
            if (isVisible) {
                profileDropdown.style.display = "none";
                profileDropdown.classList.remove("active");
            } else {
                profileDropdown.style.display = "block";
                profileDropdown.classList.add("active");
            }
            if (searchResults) searchResults.classList.remove("active");
        });

        document.addEventListener("click", (e) => {
            if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.style.display = "none";
                profileDropdown.classList.remove("active");
            }
        });
    }

    // 10. Global Name Replacement (Dr. Rajesh Kumar -> displayName)
    function replaceProfNameInNode(node) {
        if (!node) return;
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.includes("Dr. Rajesh Kumar")) {
                node.nodeValue = node.nodeValue.replace(/Dr\. Rajesh Kumar/g, displayName);
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

    // Helper to get relative notifications page URL based on depth
    function getRelativeNotificationsUrl() {
        const path = window.location.pathname.replace(/\\/g, '/');
        if (path.includes('/student-management/') || path.includes('/reports/') || path.includes('/live-classes/') || path.includes('/classroom/') || path.includes('/academics/')) {
            return '../../communication/notifications/notifications.html';
        } else if (path.includes('/communication/')) {
            return 'notifications.html';
        } else {
            return '../communication/notifications/notifications.html';
        }
    }

    // 11. Global Notification Sync & Header Dropdown System
    window.updateGlobalHeaderNotificationBadge = function() {
        const isRead = localStorage.getItem("portal_notifications_read") === "true";
        const isCleared = localStorage.getItem("portal_notifications_cleared") === "true";
        const savedUnread = localStorage.getItem("portal_unread_count");
        let unreadCount = (savedUnread !== null) ? parseInt(savedUnread, 10) : 3;

        if (isRead || isCleared) {
            unreadCount = 0;
        }

        const badges = document.querySelectorAll(".notification-badge, #portalNotificationBadge, .notification-dot");
        badges.forEach(badge => {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = "flex";
            } else {
                badge.style.display = "none";
            }
        });

        const popoverBadge = document.getElementById("popoverBadgeCount");
        if (popoverBadge) {
            if (unreadCount > 0) {
                popoverBadge.textContent = `${unreadCount} New`;
                popoverBadge.className = "badge badge-success";
            } else {
                popoverBadge.textContent = "0 New";
                popoverBadge.className = "badge badge-secondary";
            }
        }

        const popoverBody = document.getElementById("popoverBodyContent");
        if (popoverBody && isCleared) {
            popoverBody.innerHTML = `
                <div style="padding: 24px; text-align: center; color: var(--text-tertiary); font-size: 12px;">
                    <i class="fa-solid fa-bell-slash" style="font-size: 24px; margin-bottom: 8px; display: block; color: var(--text-tertiary);"></i>
                    No new notifications
                </div>
            `;
        }
    };

    const headerActions = document.querySelector(".header-actions");
    if (headerActions && !document.querySelector("#notifDropdownBtn, .notification-wrapper")) {
        const notifWrap = document.createElement("div");
        notifWrap.className = "notification-wrapper";
        notifWrap.style.position = "relative";
        notifWrap.innerHTML = `
            <button class="header-icon-btn" id="notifDropdownBtn" title="System Alerts & Notifications">
                <i class="fa-solid fa-bell"></i>
                <span class="notification-badge">3</span>
            </button>
        `;
        const profileWidget = headerActions.querySelector(".user-profile-widget");
        if (profileWidget) {
            headerActions.insertBefore(notifWrap, profileWidget);
        } else {
            headerActions.appendChild(notifWrap);
        }
    }

    const notifButtons = document.querySelectorAll("#notifDropdownBtn, .notification-wrapper, .notification-trigger");
    notifButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            let popover = document.getElementById("globalNotifPopover");
            if (popover) {
                popover.classList.toggle("active");
                return;
            }

            const notifUrl = getRelativeNotificationsUrl();
            const isCleared = localStorage.getItem("portal_notifications_cleared") === "true";

            popover = document.createElement("div");
            popover.id = "globalNotifPopover";
            popover.className = "notif-popover-dropdown glassmorphism";
            popover.innerHTML = `
                <div class="notif-popover-header" style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid var(--border-color);">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <strong><i class="fa-solid fa-bell" style="color:var(--primary);"></i> System Notifications</strong>
                        <span class="badge badge-success" id="popoverBadgeCount">3 New</span>
                    </div>
                    <button id="clearHeaderNotifBtn" title="Clear All Notifications" style="background:none; border:none; color:var(--text-tertiary); cursor:pointer; font-size:14px; padding:4px; border-radius:4px; transition:color 0.2s;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div class="notif-popover-body" id="popoverBodyContent">
                    ${isCleared ? `
                        <div style="padding: 24px; text-align: center; color: var(--text-tertiary); font-size: 12px;">
                            <i class="fa-solid fa-bell-slash" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                            No new notifications
                        </div>
                    ` : `
                        <div class="notif-item" onclick="window.location.href='${notifUrl}'" style="cursor:pointer;">
                            <i class="fa-solid fa-calendar-check" style="color:#10b981;"></i>
                            <div>
                                <strong>SIH Hackathon 2026 Registration</strong>
                                <p>320 Students registered for the internal qualifier round.</p>
                                <span class="time">10 mins ago</span>
                            </div>
                        </div>
                        <div class="notif-item" onclick="window.location.href='${notifUrl}'" style="cursor:pointer;">
                            <i class="fa-solid fa-file-arrow-up" style="color:var(--primary);"></i>
                            <div>
                                <strong>Project Submissions Uploaded</strong>
                                <p>BCA-3A Web Dev team uploaded 14 project reports.</p>
                                <span class="time">1 hour ago</span>
                            </div>
                        </div>
                        <div class="notif-item" onclick="window.location.href='${notifUrl}'" style="cursor:pointer;">
                            <i class="fa-solid fa-award" style="color:#f59e0b;"></i>
                            <div>
                                <strong>Certificate Verification</strong>
                                <p>5 Student certificate requests pending approval.</p>
                                <span class="time">3 hours ago</span>
                            </div>
                        </div>
                    `}
                </div>
                <div class="notif-popover-footer">
                    <a href="${notifUrl}">View All System Alerts <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;

            const wrapper = btn.closest(".notification-wrapper") || btn.closest(".header-actions") || btn.parentElement;
            if (wrapper) {
                wrapper.style.position = "relative";
                wrapper.appendChild(popover);
                setTimeout(() => popover.classList.add("active"), 10);

                // Clear button listener in header popover
                const clearBtn = popover.querySelector("#clearHeaderNotifBtn");
                if (clearBtn) {
                    clearBtn.addEventListener("click", (evt) => {
                        evt.stopPropagation();
                        localStorage.setItem("portal_notifications_read", "true");
                        localStorage.setItem("portal_notifications_cleared", "true");
                        localStorage.setItem("portal_unread_count", "0");
                        window.updateGlobalHeaderNotificationBadge();
                    });
                }
            }
        });
    });

    document.addEventListener("click", () => {
        const popover = document.getElementById("globalNotifPopover");
        if (popover) popover.classList.remove("active");
    });

    // Listen to localStorage changes across tabs/pages
    window.addEventListener("storage", () => {
        window.updateGlobalHeaderNotificationBadge();
    });

    // Initial badge sync on page load
    window.updateGlobalHeaderNotificationBadge();
});
