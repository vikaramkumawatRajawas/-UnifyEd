/**
 * UNIFYED SYSTEM ADMIN PORTAL - MESSAGES & CHAT CONTROLLER
 */
(function () {
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
    window.showToast = showToast;

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("active");
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    }

    function initPage() {
        const loggedInUser = localStorage.getItem("loggedInUser") || "System Admin";
        const hdrNameElem = document.getElementById("hdrAdminName");
        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;

        // Sidebar Toggle with memory
        const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
        const sidebar = document.getElementById("sidebar");
        const mainPortal = document.querySelector(".portal-main");

        if (localStorage.getItem("adminSidebarCollapsed") === "true") {
            if (sidebar) sidebar.classList.add("collapsed");
            if (mainPortal) mainPortal.classList.add("expanded");
        }

        if (sidebarToggleBtn && sidebar) {
            sidebarToggleBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle("active");
                } else {
                    const isCollapsed = sidebar.classList.toggle("collapsed");
                    if (mainPortal) mainPortal.classList.toggle("expanded", isCollapsed);
                    localStorage.setItem("adminSidebarCollapsed", isCollapsed ? "true" : "false");
                }
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

        // Search Contacts
        const chatSearchInput = document.getElementById("chatSearchInput");
        if (chatSearchInput) {
            chatSearchInput.addEventListener("input", function() {
                const q = this.value.toLowerCase().trim();
                document.querySelectorAll(".chat-item").forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = !q || text.includes(q) ? "flex" : "none";
                });
            });
        }

        // Switch Active Contact
        document.querySelectorAll(".chat-item").forEach(item => {
            item.addEventListener("click", function() {
                document.querySelectorAll(".chat-item").forEach(i => i.classList.remove("active"));
                this.classList.add("active");

                const name = this.getAttribute("data-name") || "Contact";
                const role = this.getAttribute("data-role") || "Campus User";

                const activeNameElem = document.getElementById("activeContactName");
                const activeRoleElem = document.getElementById("activeContactRole");
                const activeInitialsElem = document.getElementById("activeAvatarInitials");

                if (activeNameElem) activeNameElem.textContent = name;
                if (activeRoleElem) activeRoleElem.innerHTML = `<i class="fa-solid fa-circle" style="font-size:8px; color:#10b981;"></i> ${role} (Online)`;
                if (activeInitialsElem) {
                    const parts = name.split(" ");
                    activeInitialsElem.textContent = parts.length > 1 ? (parts[0][0] + parts[1][0]) : name.substring(0,2).toUpperCase();
                }

                showToast(`Opened chat thread with ${name}`, "info");
            });
        });

        // Chat Form Submit / Message Dispatch
        const chatForm = document.getElementById("chatForm");
        const chatInput = document.getElementById("chatInput");
        const chatStream = document.getElementById("chatStream");

        if (chatForm && chatInput && chatStream) {
            chatForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const msgText = chatInput.value.trim();
                if (!msgText) return;

                const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                // Append Sent Bubble
                const sentBubble = document.createElement("div");
                sentBubble.className = "msg-bubble sent";
                sentBubble.innerHTML = `
                    <div class="msg-content">${msgText}</div>
                    <div class="msg-meta"><span>${timeNow}</span> <i class="fa-solid fa-check-double msg-read"></i></div>
                `;
                chatStream.appendChild(sentBubble);
                chatInput.value = "";
                chatStream.scrollTop = chatStream.scrollHeight;

                // Simulate Automated Reply after 1.5s
                setTimeout(() => {
                    const replyBubble = document.createElement("div");
                    replyBubble.className = "msg-bubble received";
                    replyBubble.innerHTML = `
                        <div class="msg-content">Acknowledged! Received your message regarding: "${msgText.substring(0, 30)}..."</div>
                        <div class="msg-meta"><span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                    `;
                    chatStream.appendChild(replyBubble);
                    chatStream.scrollTop = chatStream.scrollHeight;
                }, 1400);
            });
        }

        // Modal triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        const btnNewBroadcast = document.getElementById("btnNewBroadcast");
        if (btnNewBroadcast) btnNewBroadcast.addEventListener("click", () => openModal("broadcastModal"));

        const btnNewDirectMsg = document.getElementById("btnNewDirectMsg");
        if (btnNewDirectMsg) {
            btnNewDirectMsg.addEventListener("click", () => {
                showToast("Opening new direct chat contact selector...", "info");
            });
        }

        const broadcastForm = document.getElementById("broadcastForm");
        if (broadcastForm) {
            broadcastForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const title = document.getElementById("broadcastTitle").value;
                closeModal("broadcastModal");
                showToast(`Broadcast "${title}" dispatched to all target users!`, "success");
                broadcastForm.reset();
            });
        }

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
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
