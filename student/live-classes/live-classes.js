
            document.addEventListener("DOMContentLoaded", () => {
                const liveClassesData = [
                    { id: "stream_robotics", type: "live", code: "CSE-602", title: "Robotics Simulation Lab", host: "Dr. A. Verma", details: "Joined: 42 participants", status: "LIVE NOW", isLive: true },
                    { id: "stream_dl", type: "live", code: "CSE-604", title: "Deep Learning Networks", host: "Prof. S. Sharma", details: "Starts in 2 hours", status: "SCHEDULED", isLive: false },
                    { id: "stream_vlsi_rec", type: "recorded", code: "VLSI-501", title: "CMOS Sizing & Propagation Delays", host: "Dr. A. Verma", details: "Duration: 52 Mins • Recorded Yesterday", status: "PLAYBACK", isLive: false },
                    { id: "stream_db_rec", type: "recorded", code: "DBMS-403", title: "Indexing, B-Trees & Performance Tuning", host: "Dr. K. Sen", details: "Duration: 45 Mins • Recorded 2 days ago", status: "PLAYBACK", isLive: false }
                ];

                let currentTab = "live";
                let isMuted = false;
                let isCamOff = false;

                window.setLiveTab = function(tab) {
                    currentTab = tab;
                    const buttons = document.querySelectorAll(".filter-btn");
                    buttons.forEach(btn => {
                        const clickStr = btn.getAttribute("onclick");
                        if (clickStr && clickStr.includes("'" + tab + "'")) {
                            btn.style.background = "var(--primary)";
                            btn.style.color = "#fff";
                            btn.style.borderColor = "var(--primary)";
                        } else {
                            btn.style.background = "var(--bg-tertiary)";
                            btn.style.color = "var(--text-secondary)";
                            btn.style.borderColor = "var(--border-color)";
                        }
                    });
                    renderLiveList();
                };

                window.renderLiveList = function() {
                    const container = document.getElementById("liveListContainer");
                    if (!container) return;

                    const filtered = liveClassesData.filter(item => item.type === currentTab);

                    if (filtered.length === 0) {
                        container.innerHTML = `<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-video-slash" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No class recordings or streams available.</div>`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => `
                        <div class="live-row-item" style="display:flex; align-items:center; padding:20px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); gap:20px; margin-bottom: 12px;">
                            <div class="status">
                                <span class="live-badge" style="background-color:${item.isLive ? '#ef4444' : (item.status === 'SCHEDULED' ? 'var(--primary)' : 'var(--text-secondary)')};">
                                    ${item.isLive ? '<i class="fa-solid fa-circle fa-beat"></i> ' + item.status : item.status}
                                </span>
                            </div>
                            <div class="details" style="flex-grow:1;">
                                <strong style="display:block; font-size:15px; color:var(--text-primary); margin-bottom:2px;">${item.code}: ${item.title}</strong>
                                <span style="font-size:12px; color:var(--text-secondary);">Host: ${item.host} • ${item.details}</span>
                            </div>
                            <div>
                                ${item.isLive ? 
                                    `<button class="btn btn-primary btn-sm" onclick="joinLectureRoom('${item.id}', '${item.code}: ${item.title}', '${item.host}')" style="height:34px; font-size:11px;">Join Lecture</button>` :
                                    (item.status === 'PLAYBACK' ?
                                        `<button class="btn btn-secondary btn-sm" onclick="playRecording('${item.title.replace(/'/g, "\\'")}')" style="height:34px; font-size:11px; gap:5px;"><i class="fa-solid fa-circle-play"></i> Play</button>` :
                                        `<button class="btn btn-secondary btn-sm" disabled style="height:34px; font-size:11px; opacity:0.6;">Waiting...</button>`
                                    )
                                }
                            </div>
                        </div>
                    `).join("");
                };

                window.joinLectureRoom = function(id, title, host) {
                    const modal = document.getElementById("virtualRoomModal");
                    const subjTitle = document.getElementById("streamSubjectTitle");
                    const chatFeed = document.getElementById("streamChatFeed");

                    if (modal && subjTitle && chatFeed) {
                        subjTitle.textContent = title;
                        modal.style.display = "block";
                        
                        chatFeed.innerHTML = `
                            <div class="chat-msg"><strong>Dr. A. Verma:</strong> Welcome classmates, let me share joint kinematics coordinate matrices.</div>
                            <div class="chat-msg"><strong>Aditya Sharma:</strong> Yes sir, page 12 calculations were outstanding.</div>
                        `;
                    }
                };

                window.leaveLecture = function() {
                    const modal = document.getElementById("virtualRoomModal");
                    if (modal) modal.style.display = "none";
                };

                window.sendStreamMessage = function() {
                    const input = document.getElementById("streamChatMessage");
                    const feed = document.getElementById("streamChatFeed");

                    if (input && feed && input.value.trim()) {
                        feed.innerHTML += `
                            <div class="chat-msg"><strong>You (Student):</strong> ${input.value.trim()}</div>
                        `;
                        feed.scrollTop = feed.scrollHeight;
                        input.value = "";
                    }
                };

                window.toggleMute = function() {
                    isMuted = !isMuted;
                    const btn = document.getElementById("muteBtn");
                    if (btn) {
                        btn.innerHTML = isMuted ? '<i class="fa-solid fa-microphone-slash"></i> Unmute' : '<i class="fa-solid fa-microphone"></i> Mute';
                        btn.style.color = isMuted ? '#ef4444' : 'var(--text-primary)';
                    }
                };

                window.toggleCamera = function() {
                    isCamOff = !isCamOff;
                    const btn = document.getElementById("camBtn");
                    if (btn) {
                        btn.innerHTML = isCamOff ? '<i class="fa-solid fa-video-slash"></i> Start Video' : '<i class="fa-solid fa-video"></i> Stop Video';
                        btn.style.color = isCamOff ? '#ef4444' : 'var(--text-primary)';
                    }
                };

                window.raiseHand = function() {
                    const btn = document.getElementById("handBtn");
                    if (btn) {
                        btn.style.color = "var(--accent)";
                        alert("Hand raised. The lecturer will attend to your query shortly.");
                    }
                };

                window.playRecording = function(title) {
                    alert("Streaming recorded classroom lecture: " + title);
                };

                // Initial render
                renderLiveList();
            });
        