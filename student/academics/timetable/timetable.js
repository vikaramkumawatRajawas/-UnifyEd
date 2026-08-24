
            document.addEventListener("DOMContentLoaded", () => {
                const timetableData = {
                    Monday: [
                        { time: "09:00 - 10:30 AM", type: "class", subject: "Neural Networks (CS-501)", detail: "Room 403 • Prof. S. Sharma" },
                        { time: "11:00 - 12:30 PM", type: "lab", subject: "Embedded VLSI (CS-502)", detail: "Lab 3B • Dr. A. Verma" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Lunch Interval", detail: "Cafeteria / Recreation Center" },
                        { time: "03:15 - 04:45 PM", type: "lab", subject: "Robotics Lab (CS-505)", detail: "Lab 1A • Prof. M. Seth" }
                    ],
                    Tuesday: [
                        { time: "09:00 - 10:30 AM", type: "class", subject: "AI Specializations (CS-507)", detail: "Seminar Hall • Dr. K. Roy" },
                        { time: "11:00 - 12:30 PM", type: "free", subject: "Self Study Session", detail: "Central Library Study Room" },
                        { time: "01:30 - 03:00 PM", type: "class", subject: "Database Systems (CS-503)", detail: "Room 402 • Prof. V. Gupta" },
                        { time: "03:15 - 04:45 PM", type: "class", subject: "Humanities & Comm (HU-501)", detail: "Room 405 • Ms. R. Joshi" }
                    ],
                    Wednesday: [
                        { time: "09:00 - 10:30 AM", type: "class", subject: "Neural Networks (CS-501)", detail: "Room 403 • Prof. S. Sharma" },
                        { time: "11:00 - 12:30 PM", type: "class", subject: "Database Systems (CS-503)", detail: "Room 402 • Prof. V. Gupta" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Lunch Interval", detail: "Cafeteria" },
                        { time: "03:15 - 04:45 PM", type: "class", subject: "VLSI Systems (CS-510)", detail: "Room 410 • Dr. A. Verma" }
                    ],
                    Thursday: [
                        { time: "09:00 - 10:30 AM", type: "lab", subject: "Embedded VLSI (CS-502)", detail: "Lab 3B • Dr. A. Verma" },
                        { time: "11:00 - 12:30 PM", type: "class", subject: "AI Specializations (CS-507)", detail: "Seminar Hall • Dr. K. Roy" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Self Study Session", detail: "Central Library" },
                        { time: "03:15 - 04:45 PM", type: "class", subject: "Database Systems (CS-503)", detail: "Room 402 • Prof. V. Gupta" }
                    ],
                    Friday: [
                        { time: "09:00 - 10:30 AM", type: "lab", subject: "Robotics Lab (CS-505)", detail: "Lab 1A • Prof. M. Seth" },
                        { time: "11:00 - 12:30 PM", type: "class", subject: "Humanities & Comm (HU-501)", detail: "Room 405 • Ms. R. Joshi" },
                        { time: "01:30 - 03:00 PM", type: "free", subject: "Lunch Interval", detail: "Cafeteria" },
                        { time: "03:15 - 04:45 PM", type: "free", subject: "Weekly Mentor Review", detail: "Seminar Hall" }
                    ]
                };

                window.switchTimetableTab = function(tabName) {
                    const dayContainer = document.getElementById("dayTimetableContainer");
                    const weekContainer = document.getElementById("weekTimetableContainer");
                    const buttons = document.querySelectorAll(".tab-btn");

                    buttons.forEach(btn => btn.classList.remove("active"));

                    if (tabName === "day") {
                        if (dayContainer) dayContainer.style.display = "block";
                        if (weekContainer) weekContainer.style.display = "none";
                        buttons[0].classList.add("active");
                    } else {
                        if (dayContainer) dayContainer.style.display = "none";
                        if (weekContainer) weekContainer.style.display = "block";
                        buttons[1].classList.add("active");
                    }
                };

                window.showDaySchedule = function(dayName) {
                    const pills = document.querySelectorAll(".day-pill");
                    pills.forEach(p => {
                        p.classList.remove("active");
                        if (p.textContent.trim().toLowerCase() === dayName.substring(0,3).toLowerCase()) {
                            p.classList.add("active");
                        }
                    });

                    const timeline = document.getElementById("dailyTimeline");
                    if (!timeline) return;

                    const daySlots = timetableData[dayName] || [];
                    timeline.innerHTML = daySlots.map(slot => {
                        let badgeClass = "badge-free";
                        let badgeLabel = "Free Slot";
                        let glowColor = "rgba(255,255,255,0.02)";
                        
                        if (slot.type === "class") {
                            badgeClass = "badge-class";
                            badgeLabel = "Lecture";
                            glowColor = "rgba(99, 102, 241, 0.03)";
                        } else if (slot.type === "lab") {
                            badgeClass = "badge-lab";
                            badgeLabel = "Lab session";
                            glowColor = "rgba(236, 72, 153, 0.03)";
                        }

                        return "<div class='timeline-card glassmorphism' style='background:" + glowColor + ";'>" +
                            "<div class='timeline-time'><i class='fa-solid fa-clock' style='margin-right:6px;'></i>" + slot.time + "</div>" +
                            "<div class='timeline-content'>" +
                                "<strong style='font-size:14px; color:var(--text-primary);'>" + slot.subject + "</strong>" +
                                "<span class='timeline-badge " + badgeClass + "'>" + badgeLabel + "</span>" +
                                "<p style='font-size:12px; color:var(--text-secondary); margin-top:5px; margin-bottom:0;'><i class='fa-solid fa-location-dot' style='margin-right:6px;'></i>" + slot.detail + "</p>" +
                            "</div>" +
                        "</div>";
                    }).join("");
                };

                // Set Initial Day View
                showDaySchedule("Monday");

                // Mock Download PDF loader
                const dlBtn = document.getElementById("downloadPdfBtn");
                if (dlBtn) {
                    dlBtn.addEventListener("click", () => {
                        dlBtn.disabled = true;
                        dlBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating PDF...';
                        setTimeout(() => {
                            alert("PDF Download Triggered! Class_Timetable_BTech_Section_A.pdf has been downloaded successfully.");
                            dlBtn.disabled = false;
                            dlBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download PDF';
                        }, 1500);
                    });
                }
            });
        