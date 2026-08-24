
            console.log("Faculty Dashboard Initialized.");
            
            // Show Schedule Day
            window.showScheduleDay = function(day, btn) {
                // Hide all schedule content views
                const contents = document.querySelectorAll(".schedule-day-content");
                contents.forEach(c => c.style.display = "none");
                
                // Show requested day
                const target = document.getElementById("schedule-" + day);
                if (target) target.style.display = "flex";
                
                // Toggle active tabs
                const tabs = document.querySelectorAll(".day-tab-btn");
                tabs.forEach(t => t.classList.remove("active"));
                btn.classList.add("active");
            };
            
            // Resolve requests
            window.resolveReq = function(id, status) {
                const row = document.getElementById("reqRow" + id);
                if (row) {
                    row.style.transition = "all 0.3s ease";
                    row.style.opacity = "0.3";
                    row.style.transform = "translateX(50px)";
                    setTimeout(() => {
                        row.remove();
                        // Update actions count
                        const cnt = document.getElementById("pendingApprovalsCount");
                        if (cnt) {
                            let curr = parseInt(cnt.textContent) || 0;
                            if (curr > 0) cnt.textContent = curr - 1;
                        }
                    }, 300);
                    alert("Application " + status + " successfully!");
                }
            };

            // Post Announcements
            document.addEventListener("DOMContentLoaded", () => {
                const postBtn = document.getElementById("postAnnouncementBtn");
                const announceText = document.getElementById("announcementText");
                const announceTarget = document.getElementById("announcementTarget");

                if (postBtn && announceText) {
                    postBtn.addEventListener("click", () => {
                        const txt = announceText.value.trim();
                        if (!txt) {
                            alert("Announcement message cannot be empty!");
                            return;
                        }
                        const targetText = announceTarget.options[announceTarget.selectedIndex].text;
                        alert("Successfully published announcement to: " + targetText + "\nMessage: \"" + txt + "\"");
                        announceText.value = "";
                    });
                }
            });
        