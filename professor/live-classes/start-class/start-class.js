
            // Timer state
            let elapsedSec = 0;
            let timerInterval = null;

            function startTimer() {
                const timerSpan = document.getElementById("classTimer");
                timerInterval = setInterval(() => {
                    elapsedSec++;
                    const hrs = String(Math.floor(elapsedSec / 3600)).padStart(2, '0');
                    const mins = String(Math.floor((elapsedSec % 3600) / 60)).padStart(2, '0');
                    const secs = String(elapsedSec % 60).padStart(2, '0');
                    timerSpan.textContent = hrs + ":" + mins + ":" + secs;
                }, 1000);
            }

            // Audio mute toggle
            window.toggleAudio = function() {
                const audioBtn = document.getElementById("audioBtn");
                audioBtn.classList.toggle("muted");
                const icon = audioBtn.querySelector("i");
                if (audioBtn.classList.contains("muted")) {
                    icon.className = "fa-solid fa-microphone-slash";
                    showToast("Microphone muted");
                } else {
                    icon.className = "fa-solid fa-microphone";
                    showToast("Microphone unmuted");
                }
            };

            // Video camera toggle
            window.toggleVideo = function() {
                const videoBtn = document.getElementById("videoBtn");
                videoBtn.classList.toggle("muted");
                const icon = videoBtn.querySelector("i");
                const webcam = document.getElementById("webcamOverlay");
                
                if (videoBtn.classList.contains("muted")) {
                    icon.className = "fa-solid fa-video-slash";
                    webcam.style.opacity = "0.2";
                    showToast("Video camera stopped");
                } else {
                    icon.className = "fa-solid fa-video";
                    webcam.style.opacity = "1";
                    showToast("Video camera active");
                }
            };

            // Desktop screen share toggle
            window.toggleShare = function() {
                const shareBtn = document.getElementById("shareBtn");
                const webcam = document.getElementById("webcamOverlay");
                const screenShare = document.getElementById("screenShareOverlay");
                
                shareBtn.classList.toggle("active");
                if (shareBtn.classList.contains("active")) {
                    webcam.style.display = "none";
                    screenShare.style.display = "flex";
                    showToast("Sharing your screen...");
                } else {
                    webcam.style.display = "block";
                    screenShare.style.display = "none";
                    showToast("Stopped screen sharing.");
                }
            };

            // Pause/Resume recording toggle
            window.toggleRecording = function() {
                const recBtn = document.getElementById("recBtn");
                const recBadge = document.getElementById("recordingBadge");
                recBtn.classList.toggle("muted");
                
                if (recBtn.classList.contains("muted")) {
                    recBadge.style.display = "none";
                    showToast("Lecture recording paused.");
                } else {
                    recBadge.style.display = "flex";
                    showToast("Lecture recording resumed.");
                }
            };

            // Send dynamic chat message
            window.sendChatMessage = function() {
                const chatInput = document.getElementById("chatInput");
                const text = chatInput.value.trim();
                if (!text) return;

                const chatList = document.getElementById("liveChatMessages");
                const newMsg = document.createElement("div");
                newMsg.style.fontSize = "11px";
                newMsg.innerHTML = '<strong style="color:var(--primary);">You:</strong> <span style="color:var(--text-primary);">' + text + '</span>';
                chatList.appendChild(newMsg);
                chatList.scrollTop = chatList.scrollHeight;
                
                chatInput.value = "";
                showToast("Message broadcasted to room");
            };

            // Moderator Tools
            window.triggerQuickPoll = function() {
                const question = prompt("Enter quick poll question:", "Are Normal forms clear so far?");
                if (question) {
                    showToast("Poll launched: " + question);
                }
            };

            window.triggerWhiteboard = function() {
                showToast("Opening collaborative whiteboard layer...");
            };

            window.muteAllStudents = function() {
                showToast("All student microphones muted by host.");
            };

            window.endClass = function() {
                if (confirm("Are you sure you want to end this live class? This will close the room for all students.")) {
                    clearInterval(timerInterval);
                    window.location.href = "../schedule/schedule.html";
                }
            };

            function initLiveRoom() {
                startTimer();
                
                // Allow chat send on enter key
                document.getElementById("chatInput").addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                        sendChatMessage();
                    }
                });
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initLiveRoom);
            } else {
                initLiveRoom();
            }
        