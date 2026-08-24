
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

            function initStream() {
                const roomCode = document.getElementById("streamRoomCode");
                const announceInput = document.getElementById("streamAnnounceInput");
                const expandedArea = document.getElementById("announceExpandedArea");
                const announceText = document.getElementById("streamAnnounceText");
                const cancelBtn = document.getElementById("streamCancelBtn");
                const postBtn = document.getElementById("streamPostBtn");
                const feedStream = document.getElementById("classroomFeedStream");

                // Default mock feed announcements
                const defaultFeed = [
                    {
                        id: 1,
                        author: "Dr. Rajesh Kumar",
                        role: "Faculty Coordinator",
                        time: "Posted 3 hours ago",
                        content: "Dear students, I have uploaded the lecture slides and reference notes for normal forms (1NF, 2NF, 3NF, BCNF) in the classroom study materials tab. Please review them before the upcoming test.",
                        comments: [
                            { author: "Vikram Kumawat", content: "Got it, thank you sir." },
                            { author: "Priya Sharma", content: "Sir, will the quiz contain BCNF questions too?" },
                            { author: "Dr. Rajesh Kumar", content: "Yes Priya, BCNF will be included in Wednesday's quiz." }
                        ]
                    },
                    {
                        id: 2,
                        author: "Dr. Rajesh Kumar",
                        role: "Faculty Coordinator",
                        time: "Posted 1 day ago",
                        content: "Notice: The deadline for submitting Assignment 3 (Database Schema Designs) has been extended to Monday midnight. No further extensions will be granted.",
                        comments: []
                    }
                ];

                // Load custom announcements from localStorage
                function loadFeed() {
                    const localAnnouncements = JSON.parse(localStorage.getItem("streamAnnouncements")) || [];
                    const fullFeed = [...localAnnouncements, ...defaultFeed];

                    feedStream.innerHTML = fullFeed.map(post => {
                        const commentsHtml = post.comments.map(c => 
                            '<div class="comment-item">' +
                                '<i class="fa-solid fa-circle-user" style="font-size:24px; color:var(--text-tertiary);"></i>' +
                                '<div style="background:rgba(255,255,255,0.02); padding:8px 12px; border-radius:6px; flex:1;">' +
                                    '<strong style="font-size:11px; color:var(--text-primary);">' + c.author + '</strong>' +
                                    '<p style="margin:2px 0 0 0; font-size:11px; color:var(--text-secondary);">' + c.content + '</p>' +
                                '</div>' +
                            '</div>'
                        ).join("");

                        return '<div class="feed-card glassmorphism" data-id="' + post.id + '">' +
                            '<div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">' +
                                '<i class="fa-solid fa-circle-user" style="font-size:36px; color:var(--primary);"></i>' +
                                '<div>' +
                                    '<strong style="font-size:13px; color:var(--text-primary);">' + post.author + '</strong>' +
                                    '<span style="font-size:9px; background:rgba(99,102,241,0.15); color:var(--primary); padding:2px 6px; border-radius:4px; margin-left:8px; font-weight:600;">' + post.role + '</span>' +
                                    '<p style="margin:2px 0 0 0; font-size:10px; color:var(--text-tertiary);">' + post.time + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<p style="font-size:12px; color:var(--text-secondary); line-height:1.5; margin:0 0 15px 0;">' + post.content + '</p>' +
                            
                            '<div class="comment-box">' +
                                '<div id="commentsList_' + post.id + '" style="margin-bottom:12px; display:flex; flex-direction:column; gap:8px;">' + commentsHtml + '</div>' +
                                '<div style="display:flex; gap:10px; align-items:center; margin-top:10px;">' +
                                    '<input type="text" id="commentInput_' + post.id + '" class="form-input" style="height:32px; font-size:11px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-secondary); padding:0 10px; flex:1;" placeholder="Add a class comment...">' +
                                    '<button type="button" onclick="sendClassComment(' + post.id + ')" class="btn btn-primary" style="background-image:linear-gradient(135deg, var(--primary), var(--accent)); padding:6px 12px; font-size:11px; border-radius:4px;"><i class="fa-solid fa-paper-plane"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Expand share box on focus
                announceInput.addEventListener("focus", () => {
                    announceInput.style.display = "none";
                    expandedArea.style.display = "flex";
                    announceText.focus();
                });

                cancelBtn.addEventListener("click", () => {
                    expandedArea.style.display = "none";
                    announceInput.style.display = "block";
                    announceInput.value = "";
                    announceText.value = "";
                });

                // Post announcement
                postBtn.addEventListener("click", () => {
                    const text = announceText.value.trim();
                    if (!text) {
                        alert("Announcement content cannot be empty.");
                        return;
                    }

                    const localAnnouncements = JSON.parse(localStorage.getItem("streamAnnouncements")) || [];
                    const newPost = {
                        id: Date.now(),
                        author: "Dr. Rajesh Kumar",
                        role: "Faculty Coordinator",
                        time: "Posted Just now",
                        content: text,
                        comments: []
                    };

                    localAnnouncements.unshift(newPost);
                    localStorage.setItem("streamAnnouncements", JSON.stringify(localAnnouncements));

                    expandedArea.style.display = "none";
                    announceInput.style.display = "block";
                    announceInput.value = "";
                    announceText.value = "";

                    loadFeed();
                    showToast("Success: Notice published to classroom stream!");
                });

                // Copy Room code link
                roomCode.addEventListener("click", () => {
                    navigator.clipboard.writeText("http://localhost:8080/student/classroom/join.html?code=dbms-bca-2026");
                    showToast("Invite link copied to clipboard!");
                });

                // Bind send comment globally
                window.sendClassComment = function(postId) {
                    const commentInput = document.getElementById("commentInput_" + postId);
                    const commentText = commentInput.value.trim();
                    if (!commentText) return;

                    const localAnnouncements = JSON.parse(localStorage.getItem("streamAnnouncements")) || [];
                    const post = localAnnouncements.find(p => p.id === postId);

                    if (post) {
                        post.comments.push({ author: "Dr. Rajesh Kumar", content: commentText });
                        localStorage.setItem("streamAnnouncements", JSON.stringify(localAnnouncements));
                    } else {
                        // Default mock posts comments addition saved in temp session
                        const defaultPost = defaultFeed.find(p => p.id === postId);
                        if (defaultPost) {
                            defaultPost.comments.push({ author: "Dr. Rajesh Kumar", content: commentText });
                        }
                    }

                    commentInput.value = "";
                    loadFeed();
                    showToast("Comment added!");
                };

                loadFeed();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initStream);
            } else {
                initStream();
            }
        