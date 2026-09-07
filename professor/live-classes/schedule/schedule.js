
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

            function initScheduleLectures() {
                const topicInput = document.getElementById("lectureTopic");
                const batchSelect = document.getElementById("lectureBatch");
                const dateInput = document.getElementById("lectureDate");
                const timeInput = document.getElementById("lectureTime");
                const durationSelect = document.getElementById("lectureDuration");
                const platformSelect = document.getElementById("lecturePlatform");
                const scheduleBtn = document.getElementById("scheduleBtn");
                const listContainer = document.getElementById("lecturesList");
                const countLabel = document.getElementById("lectureCountLabel");

                // Set default date as today
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
                timeInput.value = "10:30";

                // Default starting scheduled classes
                const defaultLectures = [
                    { id: 201, topic: "DBMS Lecture: Normalization & Keys", batch: "BCA Sem 3 (Sec A)", datetime: today + " • 10:30 AM", duration: "1.5 Hours", platform: "UnifyEd Live", link: "../../live-classes/start-class/start-class.html" },
                    { id: 202, topic: "Web Technology Lab: CSS Grid Layouts", batch: "BCA Sem 3 (Sec B)", datetime: today + " • 01:00 PM", duration: "1.5 Hours", platform: "UnifyEd Live", link: "../../live-classes/start-class/start-class.html" },
                    { id: 203, topic: "Neural Networks: Backpropagation Alg.", batch: "B.Tech CSE Sem 5", datetime: "Tomorrow • 09:30 AM", duration: "1 Hour", platform: "Google Meet", link: "https://meet.google.com/abc-defg-hij" }
                ];

                function loadSchedule() {
                    const localSched = JSON.parse(localStorage.getItem("lectureSchedules")) || [];
                    const allSched = [...localSched, ...defaultLectures];
                    
                    countLabel.textContent = allSched.length + " lectures scheduled";

                    if (allSched.length === 0) {
                        listContainer.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:40px 0;">No lectures scheduled. Create one above!</div>';
                        return;
                    }

                    listContainer.innerHTML = allSched.map(l => {
                        const platColor = l.platform.includes("UnifyEd") ? "rgba(99,102,241,0.15)" : "rgba(168,85,247,0.15)";
                        const platText = l.platform.includes("UnifyEd") ? "var(--primary)" : "var(--accent)";
                        
                        let actionBtn = "";
                        if (l.platform === "UnifyEd Live") {
                            actionBtn = '<a href="' + l.link + '" class="btn btn-primary btn-sm" style="font-size:11px; padding:6px 12px; gap:6px;"><i class="fa-solid fa-circle-play"></i> Start Lecture</a>';
                        } else {
                            actionBtn = '<a href="' + l.link + '" target="_blank" class="btn btn-secondary btn-sm" style="font-size:11px; padding:6px 12px; gap:6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Join link</a>';
                        }

                        return '<div class="lecture-item-row">' +
                            '<div style="display:flex; align-items:center; gap:16px; flex:1; min-width: 250px;">' +
                                '<div style="background:var(--bg-secondary); border:1px solid var(--border-color); width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center;">' +
                                    '<i class="fa-solid fa-headset" style="font-size:18px; color:var(--primary);"></i>' +
                                '</div>' +
                                '<div>' +
                                    '<h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text-primary);">' + l.topic + '</h4>' +
                                    '<p style="margin:4px 0 0 0; font-size:10px; color:var(--text-tertiary);">' +
                                        'Batch: <strong>' + l.batch + '</strong> • Length: ' + l.duration +
                                    '</p>' +
                                    '<p style="margin:3px 0 0 0; font-size:10px; color:#10b981; font-weight:600;"><i class="fa-solid fa-calendar-check" style="margin-right:4px;"></i>' + l.datetime + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; align-items:center; gap:12px;">' +
                                '<span class="lecture-badge" style="background:' + platColor + '; color:' + platText + '; border-color:' + platColor + ';">' + l.platform + '</span>' +
                                actionBtn +
                                '<button onclick="deleteLecture(' + l.id + ')" class="lecture-delete-btn" title="Cancel Lecture"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                scheduleBtn.addEventListener("click", () => {
                    const topic = topicInput.value.trim();
                    const batchVal = batchSelect.value;
                    const dateVal = dateInput.value;
                    const timeVal = timeInput.value;
                    const durationVal = durationSelect.value;
                    const platformVal = platformSelect.value;

                    if (!topic || !dateVal || !timeVal) {
                        alert("Please fill in the lecture topic, date, and start time.");
                        return;
                    }

                    // Format batch readable
                    let batchLabel = "";
                    if (batchVal === "BCA-A") batchLabel = "BCA Sem 3 (Sec A)";
                    if (batchVal === "BCA-B") batchLabel = "BCA Sem 3 (Sec B)";
                    if (batchVal === "CSE-5") batchLabel = "B.Tech CSE Sem 5";

                    // Format date readable
                    const dateParts = dateVal.split("-");
                    const dateFormatted = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

                    const localSched = JSON.parse(localStorage.getItem("lectureSchedules")) || [];
                    const newLecture = {
                        id: Date.now(),
                        topic: topic,
                        batch: batchLabel,
                        datetime: dateFormatted + " • " + timeVal,
                        duration: durationVal,
                        platform: platformVal,
                        link: platformVal === "UnifyEd Live" ? "../../live-classes/start-class/start-class.html" : "https://meet.google.com/new-live"
                    };

                    localSched.unshift(newLecture);
                    localStorage.setItem("lectureSchedules", JSON.stringify(localSched));

                    topicInput.value = "";
                    loadSchedule();
                    showToast("Lecture scheduled successfully & invitations sent!");
                });

                window.deleteLecture = function(id) {
                    if (!confirm("Are you sure you want to cancel this scheduled lecture?")) return;

                    const localSched = JSON.parse(localStorage.getItem("lectureSchedules")) || [];
                    const idx = localSched.findIndex(l => l.id === id);

                    if (idx !== -1) {
                        localSched.splice(idx, 1);
                        localStorage.setItem("lectureSchedules", JSON.stringify(localSched));
                        loadSchedule();
                        showToast("Lecture cancelled.");
                    } else {
                        alert("Core preloaded lectures cannot be removed.");
                    }
                };

                loadSchedule();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initScheduleLectures);
            } else {
                initScheduleLectures();
            }
        