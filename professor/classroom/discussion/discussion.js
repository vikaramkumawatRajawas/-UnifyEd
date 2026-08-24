
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
        