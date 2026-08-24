
            document.addEventListener("DOMContentLoaded", () => {
                const defaultPosts = [
                    {
                        author: "Prof. S. Sharma (HOD CSE)",
                        role: "Instructor",
                        avatar: "S",
                        time: "Posted 2 hours ago",
                        content: "Hello Section A. I have posted the lecture slides for Week 5 (Convolutional Neural Networks architectures) in the Study Materials tab. Please review them before tomorrow's lab session, as we will be building a basic LeNet-5 architecture in PyTorch."
                    },
                    {
                        author: "Tanya Verma",
                        role: "Class Representative",
                        avatar: "T",
                        time: "Posted Yesterday",
                        content: "Reminder: The guest lecture on AI Ethics is scheduled for Friday at 2:00 PM in Seminar Hall Beta. Attendance is mandatory for all final year students."
                    }
                ];

                function getPosts() {
                    const saved = localStorage.getItem("class_stream_posts");
                    if (saved) return JSON.parse(saved);
                    return defaultPosts;
                }

                function savePosts(posts) {
                    localStorage.setItem("class_stream_posts", JSON.stringify(posts));
                }

                window.renderFeed = function() {
                    const container = document.getElementById("postsFeedContainer");
                    if (!container) return;

                    const posts = getPosts();
                    container.innerHTML = posts.map((post, index) => `
                        <div class="stream-post glassmorphism">
                            <div class="post-header" style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                                <div style="width:36px; height:36px; border-radius:50%; background:${post.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:14px;">${post.avatar}</div>
                                <div>
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <strong style="font-size:13px; color:var(--text-primary);">${post.author}</strong>
                                        <span style="font-size:9px; background:${post.role === 'Instructor' ? 'rgba(236,72,153,0.15)' : 'rgba(99,102,241,0.15)'}; color:${post.role === 'Instructor' ? 'var(--accent)' : 'var(--primary)'}; padding:2px 8px; border-radius:10px; font-weight:700;">${post.role}</span>
                                    </div>
                                    <span class="date" style="font-size:10px; color:var(--text-tertiary); font-weight: 500;">${post.time}</span>
                                </div>
                            </div>
                            <div class="post-content" style="font-size:13px; color:var(--text-secondary); line-height:1.5;">
                                <p style="margin:0;">${post.content}</p>
                            </div>
                        </div>
                    `).join("");
                };

                window.addNewPost = function() {
                    const textarea = document.getElementById("composerText");
                    if (!textarea) return;

                    const val = textarea.value.trim();
                    if (!val) {
                        alert("Please type something before posting!");
                        return;
                    }

                    const posts = getPosts();
                    posts.unshift({
                        author: "Student (You)",
                        role: "Student",
                        avatar: "Y",
                        time: "Just now",
                        content: val
                    });

                    savePosts(posts);
                    textarea.value = "";
                    renderFeed();
                };

                // Initial render
                renderFeed();
            });
        