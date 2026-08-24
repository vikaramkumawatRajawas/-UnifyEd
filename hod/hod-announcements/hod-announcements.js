/**
 * UNIFYED HOD PORTAL - OFFICIAL BULLETINS & BROADCAST CONTROLLER
 */
(function () {
    const defaultBulletins = [
        {
            id: 1,
            title: "URGENT: Semester Exam Schedule Released",
            author: "Dr. Robert Hayes (HOD)",
            date: "Jan 1, 2026 at 10:30 AM",
            category: "urgent",
            catLabel: "URGENT ALERT",
            pinned: true,
            message: "Final semester examinations will commence from Jan 15, 2026. All students must check their examination schedule on the portal. Practical exams will be held from Jan 10-14, 2026. Attendance is mandatory.",
            audience: "All Students & Faculty",
            views: 1245,
            shares: 342
        },
        {
            id: 2,
            title: "Department Seminar: AI & Machine Learning Applications",
            author: "Prof. Emma Davis",
            date: "Dec 28, 2025 at 02:00 PM",
            category: "event",
            catLabel: "EVENT / SEMINAR",
            pinned: true,
            message: "Special guest lecture by Prof. Kevin Anderson from IIT Delhi on the latest trends in Artificial Intelligence and Machine Learning. Venue: Main Auditorium | Date: Jan 8, 2026 at 2:00 PM.",
            audience: "CSE & ECE Students",
            views: 856,
            shares: 198
        },
        {
            id: 3,
            title: "Lab Maintenance Schedule - Block C",
            author: "Dr. Kevin Anderson",
            date: "Dec 27, 2025 at 11:00 AM",
            category: "academic",
            catLabel: "ACADEMIC NOTICE",
            pinned: false,
            message: "Laboratory maintenance will be conducted on Jan 3-4, 2026. All CSE and ECE labs will be closed during this period. Please plan your practicals accordingly.",
            audience: "CSE & ECE Students",
            views: 432,
            shares: 45
        },
        {
            id: 4,
            title: "Internship Opportunity - Summer 2026 Recruitment",
            author: "Placement Cell",
            date: "Dec 25, 2025 at 03:30 PM",
            category: "opportunity",
            catLabel: "OPPORTUNITY",
            pinned: false,
            message: "Leading tech companies are recruiting interns for Summer 2026. Interested students from 3rd and 4th semesters can register on the placement portal. Last date: Jan 10, 2026.",
            audience: "All Engineering Students",
            views: 2156,
            shares: 567
        }
    ];

    function getBulletinsState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.bulletins && Array.isArray(parsed.bulletins) && parsed.bulletins.length > 0) {
                    return parsed.bulletins;
                }
            } catch (e) {}
        }
        return defaultBulletins;
    }

    function saveBulletinsState(list) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.bulletins = list;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let bulletinList = getBulletinsState();
    let currentCategory = "all";
    let pinnedOnly = false;

    function showToast(message, type = "success") {
        const container = document.getElementById("toastContainer");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = `toast-alert ${type}`;
        let iconClass = "fa-circle-check";
        if (type === "warning") iconClass = "fa-triangle-exclamation";
        if (type === "info") iconClass = "fa-circle-info";

        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(50px)";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("active");
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("active");
    }

    function renderBulletinsFeed() {
        const feedContainer = document.getElementById("bulletinFeedContainer");
        const countElem = document.getElementById("kpiPublishedCount");
        const pinnedElem = document.getElementById("kpiPinnedCount");

        if (countElem) countElem.textContent = bulletinList.length;
        if (pinnedElem) pinnedElem.textContent = bulletinList.filter(b => b.pinned).length;

        let items = bulletinList;
        if (pinnedOnly) {
            items = items.filter(b => b.pinned);
        } else if (currentCategory !== "all") {
            items = items.filter(b => b.category === currentCategory);
        }

        if (!feedContainer) return;

        if (items.length === 0) {
            feedContainer.innerHTML = `
                <div style="text-align:center; padding:40px; color:var(--text-tertiary);">
                    <i class="fa-solid fa-bullhorn" style="font-size:36px; margin-bottom:12px;"></i>
                    <p>No official bulletins found in this category.</p>
                </div>
            `;
            return;
        }

        feedContainer.innerHTML = items.map(b => `
            <div class="bulletin-card ${b.category}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
                    <div>
                        <h3 style="margin:0; color:var(--text-primary); font-size:16px; font-weight:800;">
                            ${b.pinned ? '<i class="fa-solid fa-thumbtack" style="color:var(--warning); margin-right:8px;"></i>' : ''}
                            ${b.title}
                        </h3>
                        <div style="color:var(--text-tertiary); font-size:12px; margin-top:4px;">
                            <i class="fa-solid fa-user-circle"></i> ${b.author}
                            <span style="margin:0 8px;">•</span>
                            <i class="fa-solid fa-clock"></i> ${b.date}
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="badge ${b.category === 'urgent' ? 'badge-danger' : b.category === 'event' ? 'badge-warning' : 'badge-primary'}">${b.catLabel || b.category.toUpperCase()}</span>
                        <button type="button" class="btn-toggle-pin" data-id="${b.id}" style="background:transparent; border:none; color:var(--text-tertiary); cursor:pointer; font-size:14px;" title="Toggle Pin"><i class="fa-solid fa-thumbtack ${b.pinned ? 'style="color:var(--warning);"' : ''}"></i></button>
                    </div>
                </div>
                <p style="color:var(--text-secondary); font-size:13px; margin:12px 0; line-height:1.6;">${b.message}</p>
                <div style="color:var(--text-tertiary); font-size:12px; display:flex; gap:16px; align-items:center; flex-wrap:wrap; border-top:1px solid var(--border-color); padding-top:10px; margin-top:12px;">
                    <span><i class="fa-solid fa-users"></i> ${b.audience}</span>
                    <span><i class="fa-solid fa-eye"></i> ${b.views} Views</span>
                    <span><i class="fa-solid fa-share-nodes"></i> ${b.shares} Shares</span>
                </div>
            </div>
        `).join("");

        // Attach Pin Toggle Listeners
        document.querySelectorAll(".btn-toggle-pin").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                const item = bulletinList.find(b => b.id === id);
                if (item) {
                    item.pinned = !item.pinned;
                    saveBulletinsState(bulletinList);
                    renderBulletinsFeed();
                    showToast(item.pinned ? "Pinned announcement to top!" : "Unpinned announcement", "info");
                }
            });
        });
    }

    function initPage() {
        renderBulletinsFeed();

        // Create Announcement Trigger
        const btnCreateAnnouncement = document.getElementById("btnCreateAnnouncement");
        if (btnCreateAnnouncement) {
            btnCreateAnnouncement.addEventListener("click", () => openModal("createAnnouncementModal"));
        }

        // Filter Pinned Only Trigger
        const btnFilterPinned = document.getElementById("btnFilterPinned");
        if (btnFilterPinned) {
            btnFilterPinned.addEventListener("click", () => {
                pinnedOnly = !pinnedOnly;
                btnFilterPinned.classList.toggle("btn-primary", pinnedOnly);
                btnFilterPinned.classList.toggle("btn-secondary", !pinnedOnly);
                renderBulletinsFeed();
                showToast(pinnedOnly ? "Showing pinned announcements only" : "Showing all broadcasts", "info");
            });
        }

        // Export Bulletins CSV Trigger
        const btnExportBulletins = document.getElementById("btnExportBulletins");
        if (btnExportBulletins) {
            btnExportBulletins.addEventListener("click", () => {
                let csvContent = "Title,Author,Date,Category,Audience,Views,Shares\n";
                bulletinList.forEach(b => {
                    csvContent += `"${b.title}","${b.author}","${b.date}","${b.category}","${b.audience}","${b.views}","${b.shares}"\n`;
                });
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", "Department_Official_Bulletins.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToast("Downloaded Department Bulletins Log CSV!", "success");
            });
        }

        // Category Tab Buttons Handler
        document.querySelectorAll(".bulletin-tab-btn").forEach(tab => {
            tab.addEventListener("click", function () {
                document.querySelectorAll(".bulletin-tab-btn").forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                currentCategory = this.getAttribute("data-category");
                pinnedOnly = false;
                renderBulletinsFeed();
            });
        });

        // Add Announcement Form Submission
        const createAnnouncementForm = document.getElementById("createAnnouncementForm");
        if (createAnnouncementForm) {
            createAnnouncementForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const title = document.getElementById("inputBulletinTitle").value.trim();
                const category = document.getElementById("inputBulletinCategory").value;
                const audience = document.getElementById("inputBulletinAudience").value;
                const message = document.getElementById("inputBulletinContent").value.trim();

                if (!title || !message) return;

                const catLabels = {
                    urgent: "URGENT ALERT",
                    academic: "ACADEMIC NOTICE",
                    event: "EVENT / SEMINAR",
                    opportunity: "OPPORTUNITY",
                    notice: "GENERAL NOTICE"
                };

                const newBulletin = {
                    id: Date.now(),
                    title: title,
                    author: "Dr. Rajesh Kumar (HOD)",
                    date: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
                    category: category,
                    catLabel: catLabels[category] || "NOTICE",
                    pinned: category === "urgent",
                    message: message,
                    audience: audience,
                    views: 0,
                    shares: 0
                };

                bulletinList.unshift(newBulletin);
                saveBulletinsState(bulletinList);
                renderBulletinsFeed();
                closeModal("createAnnouncementModal");
                createAnnouncementForm.reset();
                showToast(`Published official broadcast "${title}"!`, "success");
            });
        }

        // Theme Toggle
        const themeBtn = document.getElementById("themeToggleBtn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                const activeTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", activeTheme);
                localStorage.setItem("theme", activeTheme);
                showToast(`Switched to ${activeTheme} mode`, "info");
            });
        }

        // Sidebar Navigation Toggles
        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");
        if (menuToggle && sidebar) {
            menuToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                sidebar.classList.toggle("active");
            });
        }

        const desktopSidebarToggle = document.getElementById("desktopSidebarToggle");
        const portalLayout = document.querySelector(".portal-layout");
        if (desktopSidebarToggle && portalLayout) {
            desktopSidebarToggle.addEventListener("click", () => {
                portalLayout.classList.toggle("sidebar-collapsed");
            });
        }

        // Profile Menu Dropdown
        const profileTrigger = document.getElementById("portalProfileTrigger");
        const profileMenu = document.getElementById("profileMenu");
        if (profileTrigger && profileMenu) {
            profileTrigger.addEventListener("click", (e) => {
                e.stopPropagation();
                profileMenu.classList.toggle("open");
            });
            document.addEventListener("click", (e) => {
                if (!profileMenu.contains(e.target) && e.target !== profileTrigger) {
                    profileMenu.classList.remove("open");
                }
            });
        }

        // Modal Close Triggers
        document.querySelectorAll("[data-close-modal]").forEach(btn => {
            btn.addEventListener("click", function () {
                const targetId = this.getAttribute("data-close-modal");
                closeModal(targetId);
            });
        });

        // Search Filter
        const searchInput = document.getElementById("portalSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll(".bulletin-card").forEach(card => {
                    card.style.display = query && !card.textContent.toLowerCase().includes(query) ? "none" : "";
                });
            });
        }

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = "../../auth/login.html";
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPage);
    } else {
        initPage();
    }
})();
