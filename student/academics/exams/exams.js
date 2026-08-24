
            document.addEventListener("DOMContentLoaded", () => {
                const examSchedules = {
                    mid_term_1: {
                        name: "Mid-Term I Examination Schedule",
                        ticketName: "Mid-Term I",
                        seatInfo: "Hall 4, Row B, Seat 14",
                        rows: [
                            { date: "Aug 18, 2026 (Tue)", time: "09:30 AM - 11:00 AM", code: "CS-501", subject: "Neural Networks & Deep Learning", room: "Block A - Room 202" },
                            { date: "Aug 19, 2026 (Wed)", time: "09:30 AM - 11:00 AM", code: "CS-502", subject: "Embedded VLSI Design", room: "Block A - Room 203" },
                            { date: "Aug 20, 2026 (Thu)", time: "01:00 PM - 02:30 PM", code: "CS-503", subject: "Database Systems & Tuning", room: "Block B - Room 105" }
                        ]
                    },
                    mid_term_2: {
                        name: "Mid-Term II Examination Schedule",
                        ticketName: "Mid-Term II",
                        seatInfo: "Hall 4, Row F, Seat 12",
                        rows: [
                            { date: "Oct 12, 2026 (Mon)", time: "09:30 AM - 11:00 AM", code: "CS-501", subject: "Neural Networks & Deep Learning", room: "Main Block - Hall 4" },
                            { date: "Oct 14, 2026 (Wed)", time: "09:30 AM - 11:00 AM", code: "CS-502", subject: "Embedded VLSI Design", room: "Main Block - Hall 3" },
                            { date: "Oct 15, 2026 (Thu)", time: "01:00 PM - 02:30 PM", code: "CS-503", subject: "Database Systems & Tuning", room: "Annex Block - Lab A" }
                        ]
                    },
                    semester_exam: {
                        name: "Semester Examination Schedule (End-Sem)",
                        ticketName: "End-Semester",
                        seatInfo: "Hall Alpha, Row A, Seat 45",
                        rows: [
                            { date: "Dec 04, 2026 (Fri)", time: "10:00 AM - 01:00 PM", code: "CS-501", subject: "Neural Networks & Deep Learning", room: "Exams Hall Alpha" },
                            { date: "Dec 07, 2026 (Mon)", time: "10:00 AM - 01:00 PM", code: "CS-502", subject: "Embedded VLSI Design", room: "Exams Hall Beta" },
                            { date: "Dec 10, 2026 (Thu)", time: "10:00 AM - 01:00 PM", code: "CS-503", subject: "Database Systems & Tuning", room: "Exams Hall Alpha" },
                            { date: "Dec 12, 2026 (Sat)", time: "10:00 AM - 01:00 PM", code: "HU-501", subject: "Humanities & Comm Skills", room: "Exams Hall Gamma" }
                        ]
                    },
                    practical_exam: {
                        name: "Practical Examination Schedule",
                        ticketName: "Practicals",
                        seatInfo: "Lab 302, PC-22",
                        rows: [
                            { date: "Nov 23, 2026 (Mon)", time: "09:00 AM - 12:00 PM", code: "CS-551", subject: "Deep Learning Lab Practicals", room: "Lab Block - Room 302" },
                            { date: "Nov 25, 2026 (Wed)", time: "09:00 AM - 12:00 PM", code: "CS-552", subject: "Robotics Hardware Lab Evaluation", room: "Lab Block - Room 104" },
                            { date: "Nov 26, 2026 (Thu)", time: "01:30 PM - 04:30 PM", code: "CS-553", subject: "Database Systems Performance Lab", room: "Lab Block - Room 311" }
                        ]
                    },
                    project_viva: {
                        name: "Project Review & Viva Schedule",
                        ticketName: "Project Viva",
                        seatInfo: "Team 14 - Presentation Slot 2",
                        rows: [
                            { date: "Nov 30, 2026 (Mon)", time: "10:00 AM - 01:00 PM", code: "CS-591", subject: "Major Project Mid-term Evaluation", room: "Seminar Hall Main" },
                            { date: "Dec 15, 2026 (Tue)", time: "10:00 AM - 01:00 PM", code: "CS-592", subject: "Robotics Design Capstone Review", room: "Directorate Boardroom" }
                        ]
                    }
                };

                window.renderExams = function(type) {
                    const data = examSchedules[type];
                    if (!data) return;

                    const titleHeader = document.getElementById("examTitleHeader");
                    const tableBody = document.getElementById("examScheduleBody");
                    const downloadBtn = document.getElementById("downloadHallTicketBtn");

                    if (titleHeader) titleHeader.innerHTML = '<i class="fa-solid fa-calendar-days"></i> ' + data.name;
                    if (downloadBtn) downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download Hall Ticket (' + data.ticketName + ')';
                    
                    if (tableBody) {
                        tableBody.innerHTML = data.rows.map(row => {
                            return "<tr>" +
                                "<td>" + row.date + "</td>" +
                                "<td>" + row.time + "</td>" +
                                "<td><strong>" + row.code + "</strong></td>" +
                                "<td>" + row.subject + "</td>" +
                                "<td>" + row.room + "</td>" +
                                "</tr>";
                        }).join("");
                    }
                };

                window.showAllottedSeat = function() {
                    const selectEl = document.getElementById("examTypeSelect");
                    const type = selectEl ? selectEl.value : 'mid_term_2';
                    const data = examSchedules[type];
                    if (data) {
                        alert("📍 Allotted Seating Allocation:\n\nSession: " + data.name + "\nLocation/Seat: " + data.seatInfo);
                    }
                };

                window.downloadHallTicket = function() {
                    const selectEl = document.getElementById("examTypeSelect");
                    const downloadBtn = document.getElementById("downloadHallTicketBtn");
                    const type = selectEl ? selectEl.value : 'mid_term_2';
                    const data = examSchedules[type];
                    
                    if (downloadBtn && data) {
                        downloadBtn.disabled = true;
                        downloadBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating PDF...';
                        setTimeout(() => {
                            alert("Hall Ticket PDF generated successfully! Hall_Ticket_2026_" + data.ticketName.replace(" ", "_") + ".pdf is saved to downloads.");
                            downloadBtn.disabled = false;
                            downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download Hall Ticket (' + data.ticketName + ')';
                        }, 1200);
                    }
                };

                // Initial load
                renderExams("mid_term_2");
            });
        