/**
 * UNIFYED FEES MANAGER PORTAL - MESSAGES & CHAT CONTROLLER
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
        const loggedInUser = localStorage.getItem("loggedInUser") || "Finance Manager";
        const loggedInId = localStorage.getItem("loggedInStudentId") || "FIN-EMP-108";
        const hdrNameElem = document.getElementById("hdrFeesManagerName");
        const hdrCodeElem = document.getElementById("hdrFeesCode");
        if (hdrNameElem) hdrNameElem.textContent = loggedInUser;
        if (hdrCodeElem) hdrCodeElem.textContent = loggedInId;

        // Sidebar Toggle
        const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
        const sidebar = document.getElementById("sidebar");
        const mainPortal = document.querySelector(".portal-main");
        if (sidebarToggleBtn && sidebar) {
            sidebarToggleBtn.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle("active");
                } else {
                    sidebar.classList.toggle("collapsed");
                    if (mainPortal) mainPortal.classList.toggle("expanded");
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

        // Modal triggers
        document.querySelectorAll(".closeModalBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                const modalBackdrop = this.closest(".modal-backdrop");
                if (modalBackdrop) modalBackdrop.classList.remove("active");
            });
        });

        // New Chat Button Handler
        const btnNewChat = document.getElementById("btnNewChat");
        if (btnNewChat) {
            btnNewChat.addEventListener("click", () => {
                const initialMsgElem = document.getElementById("newChatInitialMsg");
                if (initialMsgElem) initialMsgElem.value = "";
                openModal("newChatModal");
            });
        }

        // New Chat Form Submission
        const newChatForm = document.getElementById("newChatForm");
        if (newChatForm) {
            newChatForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const select = document.getElementById("newChatRecipientSelect");
                const initialMsg = document.getElementById("newChatInitialMsg").value.trim();

                const name = select.value;
                const option = select.options[select.selectedIndex];
                const role = option.getAttribute("data-role") || "Student";
                const initials = name.split(" ").map(n => n[0]).join("");

                closeModal("newChatModal");
                newChatForm.reset();

                // Update active chat window
                const activeName = document.getElementById("activeChatName");
                const activeRole = document.getElementById("activeChatRole");
                const activeAvatar = document.getElementById("activeChatAvatar");
                const chatInput = document.getElementById("chatInput");
                const chatStream = document.getElementById("chatStream");

                if (activeName) activeName.textContent = name;
                if (activeRole) activeRole.textContent = role;
                if (activeAvatar) activeAvatar.textContent = initials;
                if (chatInput) chatInput.placeholder = `Type your message to ${name}...`;

                if (chatStream) {
                    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    chatStream.innerHTML = `
                        <div class="msg-row sent">
                            <div class="msg-bubble">${initialMsg}</div>
                            <span class="msg-meta">${timeStr} <i class="fa-solid fa-check-double" style="color:var(--info);"></i></span>
                        </div>
                    `;
                }

                showToast(`Started conversation thread with ${name}`, "success");
            });
        }

        // Switching Active Contact
        const contacts = document.querySelectorAll(".contact-item");
        const activeName = document.getElementById("activeChatName");
        const activeRole = document.getElementById("activeChatRole");
        const activeAvatar = document.getElementById("activeChatAvatar");
        const chatInput = document.getElementById("chatInput");

        contacts.forEach(contact => {
            contact.addEventListener("click", function() {
                contacts.forEach(c => c.classList.remove("active"));
                this.classList.add("active");

                const name = this.getAttribute("data-contact");
                const role = this.getAttribute("data-role");
                const avatarText = name.split(" ").map(n => n[0]).join("");

                if (activeName) activeName.textContent = name;
                if (activeRole) activeRole.textContent = role;
                if (activeAvatar) activeAvatar.textContent = avatarText;
                if (chatInput) chatInput.placeholder = `Type your message to ${name}...`;

                const badge = this.querySelector(".unread-badge");
                if (badge) badge.remove();
            });
        });

        // Sending Messages
        const chatForm = document.getElementById("chatForm");
        const chatStream = document.getElementById("chatStream");

        if (chatForm && chatStream) {
            chatForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const text = chatInput.value.trim();
                if (!text) return;

                const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                // Append Sent Message
                const msgRow = document.createElement("div");
                msgRow.className = "msg-row sent";
                msgRow.innerHTML = `
                    <div class="msg-bubble">${text}</div>
                    <span class="msg-meta">${timeStr} <i class="fa-solid fa-check-double" style="color:var(--info);"></i></span>
                `;
                chatStream.appendChild(msgRow);
                chatInput.value = "";
                chatStream.scrollTop = chatStream.scrollHeight;

                // Simulate reply after 1.5s
                setTimeout(() => {
                    const replyRow = document.createElement("div");
                    replyRow.className = "msg-row received";
                    replyRow.innerHTML = `
                        <div class="msg-bubble">Thank you Treasury Support! I have received the updated fee acknowledgement.</div>
                        <span class="msg-meta">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    `;
                    chatStream.appendChild(replyRow);
                    chatStream.scrollTop = chatStream.scrollHeight;
                }, 1500);
            });
        }

        // Contact Search Filter
        const chatSearch = document.getElementById("chatSearchInput");
        if (chatSearch) {
            chatSearch.addEventListener("input", function() {
                const q = this.value.toLowerCase().trim();
                contacts.forEach(contact => {
                    const text = contact.textContent.toLowerCase();
                    contact.style.display = !q || text.includes(q) ? "flex" : "none";
                });
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
