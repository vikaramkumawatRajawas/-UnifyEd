
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

            function initRecordings() {
                const grid = document.getElementById("recordingsGrid");
                const filters = document.querySelectorAll("#recordingsFilters .filter-tab");
                const search = document.getElementById("recSearch");
                const totalLabel = document.getElementById("statsTotal");

                let activeFilter = "all";

                // Mock list of lectures
                const defaultRecordings = [
                    { id: 301, topic: "DBMS Lecture 4: Relational Algebra Operators", batch: "BCA-A", date: "Aug 12, 2026", duration: "01:22:45", views: 42, size: "385 MB" },
                    { id: 302, topic: "OOP with Java: Multithreading & Sync", batch: "BCA-B", date: "Aug 13, 2026", duration: "01:15:20", views: 38, size: "340 MB" },
                    { id: 303, topic: "Artificial Intelligence: State Space Search Models", batch: "CSE-5", date: "Aug 10, 2026", duration: "01:28:10", views: 56, size: "410 MB" },
                    { id: 304, topic: "DBMS Lecture 5: 1NF, 2NF and 3NF Normalization", batch: "BCA-A", date: "Aug 14, 2026", duration: "01:30:15", views: 49, size: "405 MB" }
                ];

                function renderRecordings() {
                    const localRecs = JSON.parse(localStorage.getItem("lectureRecordings")) || [];
                    const allRecs = [...localRecs, ...defaultRecordings];
                    
                    const query = search.value.trim().toLowerCase();
                    const filtered = allRecs.filter(r => {
                        const matchFilter = activeFilter === "all" || r.batch === activeFilter;
                        const matchQuery = r.topic.toLowerCase().includes(query);
                        return matchFilter && matchQuery;
                    });

                    totalLabel.textContent = allRecs.length + " Lectures";

                    if (filtered.length === 0) {
                        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:var(--text-tertiary); padding:40px 0;">No lecture recordings found.</div>';
                        return;
                    }

                    grid.innerHTML = filtered.map(r => {
                        let batchText = "BCA Sem 3 (Sec A)";
                        if (r.batch === "BCA-B") batchText = "BCA Sem 3 (Sec B)";
                        if (r.batch === "CSE-5") batchText = "B.Tech CSE Sem 5";

                        return '<div class="recording-video-card">' +
                            '<div class="video-thumbnail-mock">' +
                                '<div class="play-overlay-icon" onclick="playMockRecording(\'' + r.topic + '\')"><i class="fa-solid fa-play"></i></div>' +
                                '<span class="rec-time-badge">' + r.duration + '</span>' +
                            '</div>' +
                            '<div style="padding:15px; display:flex; flex-direction:column; justify-content:space-between; flex:1;">' +
                                '<div>' +
                                    '<h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text-primary); line-height:1.4;">' + r.topic + '</h4>' +
                                    '<p style="margin:6px 0 0 0; font-size:10px; color:var(--text-secondary); font-weight:600;">' + batchText + '</p>' +
                                '</div>' +
                                '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px; margin-top:12px; font-size:10px; color:var(--text-tertiary);">' +
                                    '<span><i class="fa-regular fa-calendar" style="margin-right:3px;"></i> ' + r.date + '</span>' +
                                    '<span><i class="fa-regular fa-eye" style="margin-right:3px;"></i> ' + r.views + ' views</span>' +
                                '</div>' +
                                '<div style="display:flex; gap:8px; margin-top:12px;">' +
                                    '<button onclick="playMockRecording(\'' + r.topic + '\')" class="btn btn-secondary btn-sm" style="flex:1; font-size:10px; padding:5px; justify-content:center;"><i class="fa-solid fa-video"></i> Playback</button>' +
                                    '<button onclick="deleteRecording(' + r.id + ')" class="btn btn-sm" style="background:rgba(239, 68, 68, 0.08); border:1px solid rgba(239, 68, 68, 0.2); color:#ef4444; font-size:10px; padding:5px 8px;" title="Delete Recording"><i class="fa-solid fa-trash-can"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Filter tabs event
                filters.forEach(f => {
                    f.addEventListener("click", () => {
                        filters.forEach(t => t.classList.remove("active"));
                        f.classList.add("active");
                        activeFilter = f.getAttribute("data-filter");
                        renderRecordings();
                    });
                });

                // Search event
                search.addEventListener("input", renderRecordings);

                window.playMockRecording = function(topic) {
                    showToast("Loading Player: " + topic);
                    alert("Simulated Video Player: Playback launched for lecture '" + topic + "'.");
                };

                window.deleteRecording = function(id) {
                    if (!confirm("Are you sure you want to delete this class recording from cloud storage? This action cannot be undone.")) return;

                    const localRecs = JSON.parse(localStorage.getItem("lectureRecordings")) || [];
                    const idx = localRecs.findIndex(r => r.id === id);

                    if (idx !== -1) {
                        localRecs.splice(idx, 1);
                        localStorage.setItem("lectureRecordings", JSON.stringify(localRecs));
                        renderRecordings();
                        showToast("Recording permanently removed from database.");
                    } else {
                        alert("Core preloaded recordings cannot be removed from cloud repository.");
                    }
                };

                renderRecordings();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initRecordings);
            } else {
                initRecordings();
            }
        