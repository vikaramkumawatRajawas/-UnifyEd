/**
 * UNIFYED HOD PORTAL - MESSAGES & CHAT CONTROLLER
 */
(function () {
    const defaultContacts = [
        {
            id: "dr_robert",
            name: "Dr. Robert Hayes",
            initials: "DR",
            gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            status: "Online",
            unread: 1,
            lastTime: "Just now",
            lastText: "Regarding the syllabus review...",
            thread: [
                { sender: "received", text: "Hi, I wanted to discuss the upcoming syllabus review for the next semester.", time: "10:14 AM" },
                { sender: "received", text: "We need to ensure alignment with AICTE guidelines and focus on emerging technologies.", time: "10:15 AM" },
                { sender: "sent", text: "Absolutely, I agree. I've started reviewing the current curriculum against the latest industry standards.", time: "10:18 AM" },
                { sender: "sent", text: "I'll prepare a detailed analysis and present it at the next faculty meeting.", time: "10:20 AM" },
                { sender: "received", text: "Perfect! When can we schedule a meeting to discuss this in detail?", time: "10:22 AM" }
            ]
        },
        {
            id: "principal_office",
            name: "Principal's Office",
            initials: "PR",
            gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            status: "Active 2h ago",
            unread: 2,
            lastTime: "2h ago",
            lastText: "Agenda for next faculty meeting",
            thread: [
                { sender: "received", text: "Dr. Rajesh, please confirm the department budget proposal for Q2.", time: "08:30 AM" },
                { sender: "sent", text: "Good morning! The budget proposal has been finalized and uploaded.", time: "08:45 AM" },
                { sender: "received", text: "Thank you. Agenda for next faculty meeting is attached for review.", time: "09:00 AM" }
            ]
        },
        {
            id: "admin_committee",
            name: "Admin Committee",
            initials: "AC",
            gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
            status: "Online",
            unread: 0,
            lastTime: "5h ago",
            lastText: "Budget allocation for Q2...",
            thread: [
                { sender: "received", text: "Quarterly equipment request forms have been approved for Block C Labs.", time: "06:10 AM" },
                { sender: "sent", text: "Excellent news. Our lab technicians will start receiving hardware components tomorrow.", time: "06:25 AM" }
            ]
        },
        {
            id: "hr_staff",
            name: "HR & Staff Governance",
            initials: "HS",
            gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
            status: "Offline",
            unread: 0,
            lastTime: "1 day ago",
            lastText: "New faculty orientation schedule",
            thread: [
                { sender: "received", text: "Please review the orientation schedule for newly onboarded assistant professors.", time: "Yesterday" },
                { sender: "sent", text: "Schedule approved. I will conduct the welcome keynote address on Monday.", time: "Yesterday" }
            ]
        }
    ];

    function getChatState() {
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.chatContacts && Array.isArray(parsed.chatContacts) && parsed.chatContacts.length > 0) {
                    return parsed.chatContacts;
                }
            } catch (e) {}
        }
        return defaultContacts;
    }

    function saveChatState(contacts) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.chatContacts = contacts;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));
    }

    let contacts = getChatState();
    let activeContactId = contacts[0].id;

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

    function renderContactsList() {
        const listContainer = document.getElementById("contactsListContainer");
        if (!listContainer) return;

        listContainer.innerHTML = contacts.map(c => `
            <div class="chat-contact-item ${c.id === activeContactId ? 'active' : ''}" data-id="${c.id}">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:4px;">
                    <div style="width:38px; height:38px; border-radius:50%; background:${c.gradient}; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:13px; flex-shrink:0;">${c.initials}</div>
                    <div style="flex:1; min-width:0;">
                        <div style="color:var(--text-primary); font-weight:700; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.name}</div>
                        <div style="color:var(--text-tertiary); font-size:11px;">${c.lastTime}</div>
                    </div>
                    ${c.unread > 0 ? `<div style="background:var(--primary); color:white; width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800;">${c.unread}</div>` : ''}
                </div>
                <div style="color:var(--text-secondary); font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.lastText}</div>
            </div>
        `).join("");

        // Attach Contact Click Handlers
        document.querySelectorAll(".chat-contact-item").forEach(item => {
            item.addEventListener("click", function () {
                const id = this.getAttribute("data-id");
                switchContact(id);
            });
        });
    }

    function switchContact(id) {
        activeContactId = id;
        const contact = contacts.find(c => c.id === id);
        if (contact) {
            contact.unread = 0;
            saveChatState(contacts);
        }
        renderContactsList();
        renderActiveThread();
    }

    function renderActiveThread() {
        const contact = contacts.find(c => c.id === activeContactId) || contacts[0];
        const nameElem = document.getElementById("activeContactName");
        const statusElem = document.getElementById("activeContactStatus");
        const avatarElem = document.getElementById("activeAvatar");
        const threadContainer = document.getElementById("chatThreadContainer");

        if (nameElem) nameElem.textContent = contact.name;
        if (statusElem) statusElem.innerHTML = `<i class="fa-solid fa-circle" style="font-size:8px;"></i> ${contact.status}`;
        if (avatarElem) {
            avatarElem.textContent = contact.initials;
            avatarElem.style.background = contact.gradient;
        }

        if (!threadContainer) return;

        threadContainer.innerHTML = contact.thread.map(msg => `
            <div class="chat-bubble-row ${msg.sender === 'sent' ? 'sent' : ''}">
                ${msg.sender === 'received' ? `<div style="width:32px; height:32px; border-radius:50%; background:${contact.gradient}; display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:11px; flex-shrink:0;">${contact.initials}</div>` : ''}
                <div class="chat-bubble ${msg.sender}">
                    <div>${msg.text}</div>
                    <div class="chat-bubble-time">${msg.time}</div>
                </div>
                ${msg.sender === 'sent' ? `<div style="width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#8b5cf6,#d946ef); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:11px; flex-shrink:0;">RK</div>` : ''}
            </div>
        `).join("");

        threadContainer.scrollTop = threadContainer.scrollHeight;
    }

    function sendMessage() {
        const input = document.getElementById("chatInputMessage");
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        const contact = contacts.find(c => c.id === activeContactId);
        if (contact) {
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            contact.thread.push({ sender: "sent", text: text, time: timeStr });
            contact.lastText = text;
            contact.lastTime = "Just now";

            saveChatState(contacts);
            input.value = "";
            renderContactsList();
            renderActiveThread();
        }
    }

    function initPage() {
        renderContactsList();
        renderActiveThread();

        // Send Message Handlers
        const btnSend = document.getElementById("btnSendMessage");
        const chatInput = document.getElementById("chatInputMessage");

        if (btnSend) {
            btnSend.addEventListener("click", sendMessage);
        }

        if (chatInput) {
            chatInput.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        // New Message Trigger
        const btnNewMessage = document.getElementById("btnNewMessage");
        if (btnNewMessage) {
            btnNewMessage.addEventListener("click", () => openModal("newChatModal"));
        }

        // New Message Form Submit
        const newChatForm = document.getElementById("newChatForm");
        if (newChatForm) {
            newChatForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("inputContactName").value.trim();
                const text = document.getElementById("inputInitialMessage").value.trim();

                if (!name || !text) return;

                const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
                const newId = `contact_${Date.now()}`;
                const newContact = {
                    id: newId,
                    name: name,
                    initials: initials || "EX",
                    gradient: "linear-gradient(135deg, #10b981, #34d399)",
                    status: "Online",
                    unread: 0,
                    lastTime: "Just now",
                    lastText: text,
                    thread: [
                        { sender: "sent", text: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                    ]
                };

                contacts.unshift(newContact);
                saveChatState(contacts);
                closeModal("newChatModal");
                newChatForm.reset();
                switchContact(newId);
                showToast(`Opened direct chat thread with ${name}!`, "success");
            });
        }

        // Contact Search Filter
        const contactSearchInput = document.getElementById("contactSearchInput");
        if (contactSearchInput) {
            contactSearchInput.addEventListener("input", function () {
                const query = this.value.trim().toLowerCase();
                document.querySelectorAll(".chat-contact-item").forEach(item => {
                    item.style.display = query && !item.textContent.toLowerCase().includes(query) ? "none" : "";
                });
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
                document.querySelectorAll(".chat-contact-item").forEach(item => {
                    item.style.display = query && !item.textContent.toLowerCase().includes(query) ? "none" : "";
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
