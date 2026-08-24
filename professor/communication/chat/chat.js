// ==========================================================================
// UNIFYED MESSENGER CHAT - FULLY INTERACTIVE APPLICATION LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Data Store
    const chatsData = {
        rahul_sharma: {
            name: "Rahul Sharma",
            role: "Student Rep • BCA 3rd Sem",
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
            status: "online",
            email: "rahul.s@unifyed.edu",
            dept: "Computer Applications",
            phone: "+91 98765 43210",
            roll: "2024-BCA-08",
            messages: [
                { sender: "incoming", name: "Rahul Sharma", text: "Good morning Dr. Rajesh Sir! Hope you are doing well.", time: "10:30 AM" },
                { sender: "outgoing", name: "Me", text: "Good morning Rahul! How is the web development project progress coming along with your team?", time: "10:35 AM" },
                { 
                    sender: "incoming", 
                    name: "Rahul Sharma", 
                    text: "We have finalized the front-end UI components and updated all project documentation. Here is the draft PDF report for your review:", 
                    time: "10:40 AM",
                    file: { name: "BCA_WebDev_Project_Report_v2.pdf", size: "2.4 MB", type: "PDF Document", icon: "fa-file-pdf" }
                },
                { sender: "outgoing", name: "Me", text: "Great work Rahul! I'll review it and get back to you shortly during office hours.", time: "10:42 AM" }
            ],
            replies: [
                "Thank you Professor! I will share the feedback with the entire team.",
                "Understood Sir! We will prepare the slides for tomorrow's lab presentation.",
                "Sure Dr. Rajesh, I have updated the project repository link as requested."
            ]
        },
        bca_3a_group: {
            name: "BCA 3A Official Group",
            role: "Class Channel • 42 Members",
            avatarIcon: "fa-users",
            status: "online",
            email: "bca3a-group@unifyed.edu",
            dept: "Faculty & Students Channel",
            phone: "Channel Admin: Dr. Rajesh",
            roll: "42 Members Enrolled",
            messages: [
                { sender: "incoming", name: "Prof. Vikram Mehta", text: "Notice: Mid-term examination schedule for BCA 3rd Sem has been uploaded to the portal.", time: "09:00 AM" },
                { sender: "incoming", name: "Priya Verma", text: "Thank you sir! Is the syllabus covering Module 1 to 4?", time: "09:10 AM" },
                { sender: "outgoing", name: "Me", text: "Yes Priya, Modules 1 through 4 are included. Focus on Database design and Web APIs.", time: "09:15 AM" }
            ],
            replies: [
                "Got it Sir! Thanks for clarifying.",
                "Thank you Dr. Rajesh!",
                "Will review the topic notes today."
            ]
        },
        ananya_sen: {
            name: "Dr. Ananya Sen (HOD)",
            role: "HOD • Department of CSE",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
            status: "offline",
            email: "ananya.sen@unifyed.edu",
            dept: "Computer Science & Engg",
            phone: "+91 91234 56789",
            roll: "EMP-101 (HOD)",
            messages: [
                { sender: "incoming", name: "Dr. Ananya Sen", text: "Hello Rajesh, please review the NAAC accreditation audit documents submitted yesterday.", time: "Yesterday" },
                { sender: "outgoing", name: "Me", text: "Good evening Ma'am. I have inspected all research publication logs and verified them.", time: "Yesterday" },
                { sender: "incoming", name: "Dr. Ananya Sen", text: "Excellent. Let's discuss the final department report during tomorrow's 11 AM meeting.", time: "Yesterday" }
            ],
            replies: [
                "Thank you Rajesh. See you at the meeting.",
                "Please keep the printed copies handy.",
                "Confirmed."
            ]
        },
        vikram_mehta: {
            name: "Prof. Vikram Mehta",
            role: "Assistant Professor • Physics",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
            status: "away",
            email: "vikram.mehta@unifyed.edu",
            dept: "Applied Sciences",
            phone: "+91 99887 76655",
            roll: "EMP-308",
            messages: [
                { sender: "incoming", name: "Prof. Vikram Mehta", text: "Hi Rajesh, do you have the latest lab experiment manuals for Physics Lab II?", time: "Aug 17" },
                { sender: "outgoing", name: "Me", text: "Yes Vikram, I sent them to your official email last Friday.", time: "Aug 17" }
            ],
            replies: [
                "Found it in my inbox! Thanks a lot.",
                "Appreciate the prompt reply, Rajesh."
            ]
        },
        priya_verma: {
            name: "Priya Verma",
            role: "Student • Roll #42",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
            status: "offline",
            email: "priya.v@unifyed.edu",
            dept: "Computer Applications",
            phone: "+91 98112 23344",
            roll: "2024-BCA-42",
            messages: [
                { sender: "incoming", name: "Priya Verma", text: "Respected Sir, I have submitted my leave application for the upcoming tech fest.", time: "Aug 16" },
                { sender: "outgoing", name: "Me", text: "Your leave application has been approved on the portal.", time: "Aug 16" },
                { sender: "incoming", name: "Priya Verma", text: "Thank you sir for approving my leave application!", time: "Aug 16" }
            ],
            replies: [
                "Thank you so much Sir!",
                "Have a great day ahead!"
            ]
        }
    };

    let activeChatKey = "rahul_sharma";

    // Elements
    const chatItems = document.querySelectorAll(".chat-item");
    const chatMessagesList = document.getElementById("chatMessagesList");
    const chatInputField = document.getElementById("chatInputField");
    const sendMessageBtn = document.getElementById("sendMessageBtn");
    const activeChatName = document.getElementById("activeChatName");
    const activeChatRole = document.getElementById("activeChatRole");
    const activeChatAvatar = document.getElementById("activeChatAvatar");
    const activeChatStatusDot = document.getElementById("activeChatStatusDot");
    
    const drawerAvatar = document.getElementById("drawerAvatar");
    const drawerName = document.getElementById("drawerName");
    const drawerSub = document.getElementById("drawerSub");
    const toggleDrawerBtn = document.getElementById("toggleDrawerBtn");
    const chatDetailsDrawer = document.getElementById("chatDetailsDrawer");
    const searchChatContacts = document.getElementById("searchChatContacts");
    const filterTabs = document.querySelectorAll(".chat-filter-tab");
    const typingIndicator = document.getElementById("typingIndicator");

    // New Interactive Elements
    const attachFileBtn = document.getElementById("attachFileBtn");
    const attachImageBtn = document.getElementById("attachImageBtn");
    const fileAttachmentInput = document.getElementById("fileAttachmentInput");
    const imageAttachmentInput = document.getElementById("imageAttachmentInput");
    const emojiPickerBtn = document.getElementById("emojiPickerBtn");
    const emojiPickerPopover = document.getElementById("emojiPickerPopover");

    const searchInChatBtn = document.getElementById("searchInChatBtn");
    const inChatSearchBar = document.getElementById("inChatSearchBar");
    const inChatSearchInput = document.getElementById("inChatSearchInput");
    const closeInChatSearchBtn = document.getElementById("closeInChatSearchBtn");

    const voiceCallBtn = document.getElementById("voiceCallBtn");
    const videoCallBtn = document.getElementById("videoCallBtn");
    const audioCallModal = document.getElementById("audioCallModal");
    const videoCallModal = document.getElementById("videoCallModal");
    const endAudioCallBtn = document.getElementById("endAudioCallBtn");
    const endVideoCallBtn = document.getElementById("endVideoCallBtn");
    const audioCallName = document.getElementById("audioCallName");
    const audioCallAvatar = document.getElementById("audioCallAvatar");
    const videoCallRecipientName = document.getElementById("videoCallRecipientName");
    const videoCallMainStream = document.getElementById("videoCallMainStream");
    const audioCallTimer = document.getElementById("audioCallTimer");

    let audioTimerInterval = null;
    let callSeconds = 0;

    // Render Active Chat Conversation
    function renderChat(chatKey) {
        activeChatKey = chatKey;
        const data = chatsData[chatKey];
        if (!data) return;

        activeChatName.textContent = data.name;
        activeChatRole.innerHTML = `<i class="fa-solid fa-graduation-cap" style="color:var(--primary);"></i> ${data.role}`;
        
        if (data.avatar) {
            activeChatAvatar.src = data.avatar;
            activeChatAvatar.style.display = "block";
        } else {
            activeChatAvatar.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150";
        }

        activeChatStatusDot.className = `status-dot ${data.status}`;

        if (drawerName) drawerName.textContent = data.name;
        if (drawerSub) drawerSub.textContent = data.role;
        if (drawerAvatar && data.avatar) drawerAvatar.src = data.avatar;

        chatMessagesList.innerHTML = `
            <div class="date-divider">
                <span>Today, August 19</span>
            </div>
        `;

        data.messages.forEach(msg => {
            const row = document.createElement("div");
            row.className = `message-row ${msg.sender}`;

            let fileMarkup = "";
            if (msg.file) {
                fileMarkup = `
                    <div class="message-file-attachment">
                        <i class="fa-solid ${msg.file.icon}"></i>
                        <div class="file-attachment-info">
                            <strong>${msg.file.name}</strong>
                            <span>${msg.file.size} • ${msg.file.type}</span>
                        </div>
                    </div>
                `;
            } else if (msg.imageSrc) {
                fileMarkup = `
                    <div style="margin-top:8px; border-radius:12px; overflow:hidden; max-width:260px; border:1px solid rgba(255,255,255,0.15);">
                        <img src="${msg.imageSrc}" style="width:100%; display:block; object-fit:cover;">
                    </div>
                `;
            }

            const senderMarkup = msg.sender === "incoming" ? `<span class="message-sender-name">${msg.name}</span>` : "";
            const avatarMarkup = msg.sender === "incoming" ? `<img src="${data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}" class="message-avatar">` : "";
            const checkmark = msg.sender === "outgoing" ? `<i class="fa-solid fa-check-double" style="color:#60a5fa;"></i>` : "";

            row.innerHTML = `
                ${avatarMarkup}
                <div class="message-bubble">
                    ${senderMarkup}
                    ${msg.text}
                    ${fileMarkup}
                    <div class="message-meta">${msg.time} ${checkmark}</div>
                </div>
            `;
            chatMessagesList.appendChild(row);
        });

        chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
    }

    // Switch Active Contact
    chatItems.forEach(item => {
        item.addEventListener("click", () => {
            chatItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            const chatId = item.getAttribute("data-chat-id");
            
            const badge = item.querySelector(".unread-badge");
            if (badge) badge.style.display = "none";

            renderChat(chatId);
        });
    });

    // Send Message + Trigger Smart Reply
    function handleSendMessage(customMsgObj = null) {
        const currentChat = chatsData[activeChatKey];
        if (!currentChat) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (customMsgObj) {
            currentChat.messages.push(customMsgObj);
        } else {
            const text = chatInputField.value.trim();
            if (!text) return;
            currentChat.messages.push({
                sender: "outgoing",
                name: "Me",
                text: text,
                time: timeStr
            });
            chatInputField.value = "";
        }

        renderChat(activeChatKey);

        // Update preview in sidebar
        const activeItem = document.querySelector(`.chat-item[data-chat-id="${activeChatKey}"]`);
        if (activeItem) {
            const prev = activeItem.querySelector(".chat-item-preview");
            const lastMsg = currentChat.messages[currentChat.messages.length - 1];
            if (prev && lastMsg) {
                prev.textContent = lastMsg.text || "Shared an attachment";
            }
        }

        // Trigger Smart Reply
        if (typingIndicator) {
            typingIndicator.style.display = "flex";
            document.getElementById("typingUserName").textContent = `${currentChat.name} is typing...`;
        }

        setTimeout(() => {
            if (typingIndicator) typingIndicator.style.display = "none";

            let replyText = "Thank you Dr. Rajesh Sir! Noted with thanks.";
            const lastUserMsg = currentChat.messages[currentChat.messages.length - 1].text.toLowerCase();

            if (lastUserMsg.includes("report") || lastUserMsg.includes("pdf") || lastUserMsg.includes("file")) {
                replyText = "Thank you Professor! I have downloaded the document and reviewed the details.";
            } else if (lastUserMsg.includes("hello") || lastUserMsg.includes("hi") || lastUserMsg.includes("good morning")) {
                replyText = `Good day Dr. Rajesh! Hope your schedule is going smoothly today.`;
            } else if (lastUserMsg.includes("mark") || lastUserMsg.includes("grade") || lastUserMsg.includes("exam")) {
                replyText = "Thank you for the update Sir. The students will check the results section.";
            } else if (lastUserMsg.includes("call") || lastUserMsg.includes("meet")) {
                replyText = "Sure Sir, I am available for a quick discussion right now.";
            } else if (currentChat.replies && currentChat.replies.length > 0) {
                replyText = currentChat.replies[Math.floor(Math.random() * currentChat.replies.length)];
            }

            currentChat.messages.push({
                sender: "incoming",
                name: currentChat.name,
                text: replyText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            renderChat(activeChatKey);

            // Update preview
            if (activeItem) {
                const prev = activeItem.querySelector(".chat-item-preview");
                if (prev) prev.textContent = replyText;
            }
        }, 1500);
    }

    if (sendMessageBtn) sendMessageBtn.addEventListener("click", () => handleSendMessage());
    if (chatInputField) {
        chatInputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }

    // Attach File Trigger & Upload Handling
    if (attachFileBtn && fileAttachmentInput) {
        attachFileBtn.addEventListener("click", () => {
            fileAttachmentInput.click();
        });

        fileAttachmentInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let icon = "fa-file-lines";
            if (file.name.endsWith(".pdf")) icon = "fa-file-pdf";
            else if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) icon = "fa-file-word";
            else if (file.name.endsWith(".zip")) icon = "fa-file-zipper";

            const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";

            handleSendMessage({
                sender: "outgoing",
                name: "Me",
                text: `Attached file: ${file.name}`,
                file: { name: file.name, size: sizeMb, type: "Attachment File", icon: icon },
                time: timeStr
            });

            fileAttachmentInput.value = "";
        });
    }

    // Attach Image Trigger & Upload Handling
    if (attachImageBtn && imageAttachmentInput) {
        attachImageBtn.addEventListener("click", () => {
            imageAttachmentInput.click();
        });

        imageAttachmentInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                handleSendMessage({
                    sender: "outgoing",
                    name: "Me",
                    text: `Shared an image photo:`,
                    imageSrc: event.target.result,
                    time: timeStr
                });
            };
            reader.readAsDataURL(file);

            imageAttachmentInput.value = "";
        });
    }

    // Emoji Picker Popover Toggle & Select
    if (emojiPickerBtn && emojiPickerPopover) {
        emojiPickerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (emojiPickerPopover.style.display === "grid") {
                emojiPickerPopover.style.display = "none";
            } else {
                emojiPickerPopover.style.display = "grid";
            }
        });

        const emojiItems = emojiPickerPopover.querySelectorAll(".emoji-item");
        emojiItems.forEach(emoji => {
            emoji.addEventListener("click", () => {
                chatInputField.value += emoji.textContent;
                emojiPickerPopover.style.display = "none";
                chatInputField.focus();
            });
        });

        document.addEventListener("click", (e) => {
            if (!emojiPickerBtn.contains(e.target) && !emojiPickerPopover.contains(e.target)) {
                emojiPickerPopover.style.display = "none";
            }
        });
    }

    // In-Chat Search Bar Functionality
    if (searchInChatBtn && inChatSearchBar) {
        searchInChatBtn.addEventListener("click", () => {
            if (inChatSearchBar.style.display === "flex") {
                inChatSearchBar.style.display = "none";
            } else {
                inChatSearchBar.style.display = "flex";
                inChatSearchInput.focus();
            }
        });

        if (closeInChatSearchBtn) {
            closeInChatSearchBtn.addEventListener("click", () => {
                inChatSearchBar.style.display = "none";
                inChatSearchInput.value = "";
                renderChat(activeChatKey);
            });
        }

        if (inChatSearchInput) {
            inChatSearchInput.addEventListener("input", () => {
                const query = inChatSearchInput.value.toLowerCase().trim();
                const msgBubbles = chatMessagesList.querySelectorAll(".message-bubble");
                msgBubbles.forEach(bubble => {
                    const text = bubble.textContent.toLowerCase();
                    if (query && text.includes(query)) {
                        bubble.style.border = "2px solid var(--accent)";
                        bubble.style.boxShadow = "0 0 12px rgba(245, 158, 11, 0.4)";
                    } else {
                        bubble.style.border = "";
                        bubble.style.boxShadow = "";
                    }
                });
            });
        }
    }

    // Voice Call Overlay
    if (voiceCallBtn && audioCallModal) {
        voiceCallBtn.addEventListener("click", () => {
            const data = chatsData[activeChatKey];
            audioCallName.textContent = data.name;
            audioCallAvatar.src = data.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150";
            
            callSeconds = 0;
            audioCallTimer.textContent = "00:00";
            audioCallModal.style.display = "flex";

            if (audioTimerInterval) clearInterval(audioTimerInterval);
            audioTimerInterval = setInterval(() => {
                callSeconds++;
                const mins = String(Math.floor(callSeconds / 60)).padStart(2, '0');
                const secs = String(callSeconds % 60).padStart(2, '0');
                audioCallTimer.textContent = `${mins}:${secs}`;
            }, 1000);
        });

        if (endAudioCallBtn) {
            endAudioCallBtn.addEventListener("click", () => {
                audioCallModal.style.display = "none";
                if (audioTimerInterval) clearInterval(audioTimerInterval);
            });
        }
    }

    // Video Call Overlay
    if (videoCallBtn && videoCallModal) {
        videoCallBtn.addEventListener("click", () => {
            const data = chatsData[activeChatKey];
            videoCallRecipientName.textContent = data.name;
            if (data.avatar) {
                videoCallMainStream.src = data.avatar;
            }
            videoCallModal.style.display = "flex";
        });

        if (endVideoCallBtn) {
            endVideoCallBtn.addEventListener("click", () => {
                videoCallModal.style.display = "none";
            });
        }
    }

    // Sidebar Contacts Search
    if (searchChatContacts) {
        searchChatContacts.addEventListener("input", () => {
            const query = searchChatContacts.value.toLowerCase().trim();
            chatItems.forEach(item => {
                const name = item.querySelector(".chat-item-name").textContent.toLowerCase();
                const preview = item.querySelector(".chat-item-preview").textContent.toLowerCase();
                if (name.includes(query) || preview.includes(query)) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    // Filter Tabs
    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");
            chatItems.forEach(item => {
                const category = item.getAttribute("data-category");
                const hasUnread = item.querySelector(".unread-badge") !== null && item.querySelector(".unread-badge").style.display !== "none";

                if (filter === "all") {
                    item.style.display = "flex";
                } else if (filter === "unread") {
                    item.style.display = hasUnread ? "flex" : "none";
                } else {
                    item.style.display = category === filter ? "flex" : "none";
                }
            });
        });
    });

    // Drawer Toggle
    if (toggleDrawerBtn && chatDetailsDrawer) {
        toggleDrawerBtn.addEventListener("click", () => {
            if (chatDetailsDrawer.style.display === "none") {
                chatDetailsDrawer.style.display = "flex";
            } else {
                chatDetailsDrawer.style.display = "none";
            }
        });
    }
});