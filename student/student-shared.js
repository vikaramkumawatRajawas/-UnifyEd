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

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const headerThemeToggle = document.getElementById("headerThemeToggle");

    function toggleTheme() {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }
    if (headerThemeToggle) {
        headerThemeToggle.addEventListener("click", toggleTheme);
    }

    // 3. Dynamic Profile & Name Syncing from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId") || "STU202600145";

    let displayName = loggedInUser;
    const regFirst = localStorage.getItem("registeredFirstName");
    const regLast = localStorage.getItem("registeredLastName");
    const regUser = localStorage.getItem("registeredUsername");

    if (regFirst && (loggedInUser === regUser || loggedInUser === localStorage.getItem("registeredEmail") || loggedInUser === localStorage.getItem("regEmail"))) {
        displayName = `${regFirst} ${regLast}`;
    } else if (loggedInUser.includes("@")) {
        displayName = loggedInUser.split("@")[0].split(/[._-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    } else if (loggedInUser !== "Aditya Sharma") {
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
        const studentDept = localStorage.getItem("studentDept") || "BCA";
        const studentSem = localStorage.getItem("studentSem") || "3";
        profileHeaderSpan.textContent = `Enrollment: ${loggedInStudentId} • ${studentDept} • Sem ${studentSem}`;
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
                    const deptVal = localStorage.getItem("studentDept") || "BCA";
                    p.innerHTML = `<span>Department:</span> ${deptVal}`;
                } else if (labelText.includes("semester")) {
                    const semVal = localStorage.getItem("studentSem") || "3";
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
    const welcomeName = document.getElementById("welcomeStudentName");
    if (welcomeName) {
        welcomeName.textContent = displayName.split(" ")[0]; // First name only
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
            
            { title: "Live Classes Scheduler", category: "Pages", url: "live-classes/live-classes.html", icon: "fa-video", badge: "Live" },
            { title: "Student Projects Hub", category: "Pages", url: "projects/projects.html", icon: "fa-laptop-code", badge: "Projects" },
            { title: "My Mentor & Grievances", category: "Pages", url: "mentor/mentor.html", icon: "fa-user-tie", badge: "Mentor" },
            { title: "ERP Fee Payment Details", category: "Pages", url: "services/fees/fees.html", icon: "fa-credit-card", badge: "Services" },
            { title: "Leave & Document Applications", category: "Pages", url: "services/applications/applications.html", icon: "fa-file-signature", badge: "Services" },
            { title: "Request Certificates", category: "Pages", url: "services/certificates/certificates.html", icon: "fa-certificate", badge: "Services" },
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

        // Calculate relative prefix to get back to student/ root
        const pathSegments = window.location.pathname.split('/');
        const studentIdx = pathSegments.indexOf("student");
        let relativeRoot = "";
        if (studentIdx !== -1) {
            const depth = pathSegments.length - studentIdx - 2;
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
    const notifTrigger = document.getElementById("portalNotificationTrigger");
    const notifDropdown = document.getElementById("portalNotificationsDropdown");
    const notifBadge = document.getElementById("portalNotificationBadge");
    const notifBody = document.getElementById("notificationsDropdownBody");
    const markAllReadBtn = document.getElementById("markAllReadBtn");

    if (notifTrigger && notifDropdown && notifBody) {
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
            // Toggle dropdown
            notifDropdown.classList.toggle("active");
            // If search is active, hide it
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
    const profileDropdown = document.getElementById("portalProfileDropdown");

    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
            // Close other dropdowns
            if (notifDropdown) notifDropdown.classList.remove("active");
            if (searchResults) searchResults.classList.remove("active");
        });

        // Close on clicking outside
        document.addEventListener("click", (e) => {
            if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove("active");
            }
        });
    }
});
