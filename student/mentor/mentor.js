
            document.addEventListener("DOMContentLoaded", () => {
                const defaultMessages = [
                    { sender: "mentor", text: "Welcome student. I have reviewed your Robotics SLAM project synopsis proposal. Sizing details are approved. Make sure to attach LiDAR datasheets in chapter 3.", time: "2 days ago" },
                    { sender: "student", text: "Thank you, Dr. Verma. I will update the references and report back on Monday.", time: "1 day ago" }
                ];

                const defaultBookings = [
                    { date: "2026-08-10", time: "02:30 PM", agenda: "Syllabus Project Sizing Synopsis Review", status: "Confirmed" }
                ];

                function getMessages() {
                    const saved = localStorage.getItem("mentor_messages");
                    if (saved) return JSON.parse(saved);
                    return defaultMessages;
                }

                function saveMessages(list) {
                    localStorage.setItem("mentor_messages", JSON.stringify(list));
                }

                function getBookings() {
                    const saved = localStorage.getItem("mentor_bookings");
                    if (saved) return JSON.parse(saved);
                    return defaultBookings;
                }

                function saveBookings(list) {
                    localStorage.setItem("mentor_bookings", JSON.stringify(list));
                }

                window.renderMentorFeed = function() {
                    const feed = document.getElementById("mentorMessagesFeed");
                    if (!feed) return;

                    const list = getMessages();
                    feed.innerHTML = list.map(m => `
                        <div style="padding:12px; border-radius:8px; border:1px solid var(--border-color); background:${m.sender === 'mentor' ? 'rgba(236,72,153,0.03)' : 'rgba(99,102,241,0.03)'}; align-self:${m.sender === 'mentor' ? 'flex-start' : 'flex-end'}; width:85%; margin-bottom: 12px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                <strong style="font-size:12px; color:${m.sender === 'mentor' ? 'var(--accent)' : 'var(--primary)'};">${m.sender === 'mentor' ? 'Dr. A. Verma (Mentor)' : 'You (Student)'}</strong>
                                <span style="font-size:10px; color:var(--text-secondary);">${m.time}</span>
                            </div>
                            <p style="margin:0; font-size:12px; color:var(--text-primary); line-height:1.4;">${m.text}</p>
                        </div>
                    `).join("");
                    feed.scrollTop = feed.scrollHeight;
                };

                window.sendMentorQuery = function() {
                    const input = document.getElementById("mentorQueryText");
                    if (!input || !input.value.trim()) return;

                    const list = getMessages();
                    list.push({
                        sender: "student",
                        text: input.value.trim(),
                        time: "Just now"
                    });
                    saveMessages(list);
                    input.value = "";
                    renderMentorFeed();
                };

                window.renderBookings = function() {
                    const container = document.getElementById("bookedSlotsContainer");
                    if (!container) return;

                    const list = getBookings();
                    if (list.length === 0) {
                        container.innerHTML = `<span style="font-size:11px; color:var(--text-secondary);">No slots booked yet.</span>`;
                        return;
                    }

                    container.innerHTML = list.map(b => `
                        <div style="padding:10px; border-radius:6px; background:var(--bg-tertiary); border:1px solid var(--border-color); font-size:11px; margin-bottom: 8px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-weight:700;">
                                <span style="color:var(--text-primary);">${b.date} • ${b.time}</span>
                                <span style="color:#10b981;">${b.status}</span>
                            </div>
                            <p style="margin:0; color:var(--text-secondary); font-size:10px;">Agenda: ${b.agenda}</p>
                        </div>
                    `).join("");
                };

                window.openBookSlotModal = function() {
                    const modal = document.getElementById("bookSlotModal");
                    if (modal) modal.style.display = "flex";
                };

                window.closeBookSlotModal = function() {
                    const modal = document.getElementById("bookSlotModal");
                    if (modal) modal.style.display = "none";
                    document.getElementById("slotDateInput").value = "";
                    document.getElementById("slotAgendaInput").value = "";
                };

                window.confirmMeetingSlot = function() {
                    const dateVal = document.getElementById("slotDateInput").value;
                    const timeVal = document.getElementById("slotTimeSelect").value;
                    const agendaVal = document.getElementById("slotAgendaInput").value.trim();

                    if (!dateVal || !agendaVal) {
                        alert("Please fill out slot date and agenda details!");
                        return;
                    }

                    const list = getBookings();
                    list.push({
                        date: dateVal,
                        time: timeVal,
                        agenda: agendaVal,
                        status: "Confirmed"
                    });
                    saveBookings(list);
                    closeBookSlotModal();
                    renderBookings();
                    alert("Appointment slot scheduled and confirmed successfully!");
                };

                // Initial render
                renderMentorFeed();
                renderBookings();
            });
        