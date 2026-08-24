
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
                        container.innerHTML = `<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-folder-open" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No topic threads found in this channel.</div>`;
                        return;
                    }

                    container.innerHTML = filtered.map(t => `
                        <div class="forum-thread glassmorphism" style="padding:20px; border-radius:8px; border:1px solid var(--border-color); margin-bottom:15px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="font-size:9px; background:rgba(99,102,241,0.12); color:var(--primary); padding:2px 8px; border-radius:10px; font-weight:700;"># ${t.channel}</span>
                                    <span style="font-size:11px; color:var(--text-secondary); font-weight:500;">by ${t.author} • ${t.time}</span>
                                </div>
                                <span style="font-size:11px; color:var(--text-tertiary); font-weight:600;"><i class="fa-regular fa-comment"></i> ${t.replies.length} replies</span>
                            </div>
                            <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:var(--text-primary);">${t.title}</h4>
                            <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin-bottom:15px;">${t.body}</p>
                            <div style="display:flex; gap:10px;">
                                <button class="btn btn-secondary btn-sm" onclick="openRepliesModal('${t.id}')">Read & Discuss</button>
                            </div>
                        </div>
                    `).join("");
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
                        container.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-secondary); font-size:12px;">No replies yet. Be the first to start the discussion!</div>`;
                        return;
                    }

                    container.innerHTML = thread.replies.map(r => `
                        <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-color); padding:12px; border-radius:6px; margin-bottom:12px;">
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                <div style="width:24px; height:24px; border-radius:50%; background:${r.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:11px;">${r.avatar}</div>
                                <strong style="font-size:12px; color:var(--text-primary);">${r.author}</strong>
                                <span style="font-size:8px; background:${r.role === 'Instructor' ? 'rgba(236,72,153,0.15)' : 'rgba(99,102,241,0.15)'}; color:${r.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; padding:1px 6px; border-radius:8px; font-weight:700;">${r.role}</span>
                            </div>
                            <p style="margin:0; font-size:12px; color:var(--text-secondary); line-height:1.4;">${r.content}</p>
                        </div>
                    `).join("");
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
        