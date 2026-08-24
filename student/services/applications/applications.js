
            document.addEventListener("DOMContentLoaded", () => {
                const defaultApps = [
                    { refId: "REQ-8022", type: "Leave application for technical Hackathon", date: "Aug 22, 2026", status: "Approved", approver: "Dr. A. Verma" }
                ];

                const templates = {
                    half_day: {
                        subject: "Application for Half-Day Leave - CSE Department",
                        body: "To,\nThe Head of Department,\nComputer Science & Engineering,\nUnifyEd.\n\nRespected Sir,\n\nI am writing to request permission for half-day leave on 2026-08-06. I need to leave from 01:00 PM onwards due to a family medical emergency.\n\nKindly approve my request.\n\nSincerely,\nStudent (Section AI-1)"
                    },
                    full_day: {
                        subject: "Application for Full-Day Leave Permission",
                        body: "To,\nThe Head of Department,\nComputer Science & Engineering,\nUnifyEd.\n\nRespected Sir,\n\nI am writing to request full-day leave on 2026-08-07 due to severe viral fever. I have been advised bed rest by my physician.\n\nKindly grant leave for the requested duration.\n\nSincerely,\nStudent (Section AI-1)"
                    },
                    without_uniform: {
                        subject: "Request for Without-Uniform Entry Permission",
                        body: "To,\nThe Discipline Committee,\nUnifyEd.\n\nRespected Sir,\n\nI request permission to enter the campus without the official uniform on 2026-08-06 as my uniform got soiled and is currently sent for laundry.\n\nKindly allow entry for today.\n\nSincerely,\nStudent (Section AI-1)"
                    },
                    lunch_permission: {
                        subject: "Request for Lunch Time Campus Exit Outpass",
                        body: "To,\nThe Warden / Registrar,\nUnifyEd.\n\nRespected Sir,\n\nI request permission to leave the college campus during lunch break (01:00 PM - 02:00 PM) on 2026-08-06 in order to visit the nearby bank branch for scholarship verification work.\n\nKindly issue a gatepass.\n\nSincerely,\nStudent (Section AI-1)"
                    },
                    hostel_gatepass: {
                        subject: "Application for Late Entry Hostel Gatepass Approval",
                        body: "To,\nThe Chief Warden,\nUnifyEd Hostels.\n\nRespected Sir,\n\nI request permission for late entry into the hostel campus on 2026-08-08 (up to 09:30 PM) as I am attending my capstone lab simulation tests at the main block.\n\nKindly approve.\n\nSincerely,\nStudent (Hostel Block A)"
                    },
                    semester_break: {
                        subject: "Application for Outstation Travel during Semester Break",
                        body: "To,\nThe Head of Department,\nComputer Science & Engineering,\nUnifyEd.\n\nRespected Sir,\n\nI am applying for a semester break outstation leave from 2026-08-15 to 2026-08-20 to visit my hometown. I will resume regular lab activities immediately on the 21st.\n\nKindly register my outstation duration.\n\nSincerely,\nStudent (Section AI-1)"
                    }
                };

                let selectedTemplateCode = null;

                function getApps() {
                    const saved = localStorage.getItem("erp_applications");
                    if (saved) return JSON.parse(saved);
                    return defaultApps;
                }

                function saveApps(list) {
                    localStorage.setItem("erp_applications", JSON.stringify(list));
                }

                window.renderApps = function() {
                    const tbody = document.getElementById("applicationsTableBody");
                    if (!tbody) return;

                    const list = getApps();
                    tbody.innerHTML = list.map(item => `
                        <tr>
                            <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">${item.refId}</td>
                            <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">${item.type}</td>
                            <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${item.date}</td>
                            <td style="padding:15px 10px;"><span class="badge ${item.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${item.status}</span></td>
                            <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${item.approver}</td>
                        </tr>
                    `).join("");
                };

                window.updateDraftRecipientSalutation = function() {
                    const recipientSelect = document.getElementById("appRecipientSelect");
                    const bodyArea = document.getElementById("appBodyTextarea");
                    if (!recipientSelect || !bodyArea) return;

                    const recipient = recipientSelect.value;
                    const body = bodyArea.value.replace(/\r\n/g, "\n");

                    let salutationAuthority = "The Head of Department,\nComputer Science & Engineering";
                    if (recipient.includes("Mentor")) {
                        salutationAuthority = "The Mentor (Dr. A. Verma)";
                    } else if (recipient.includes("HOD")) {
                        salutationAuthority = "The Head of Department,\nComputer Science & Engineering";
                    } else if (recipient.includes("Professor")) {
                        salutationAuthority = "Prof. S. Sharma,\nComputer Science & Engineering";
                    } else if (recipient.includes("Registrar")) {
                        salutationAuthority = "The Registrar";
                    } else if (recipient.includes("Admin")) {
                        salutationAuthority = "The Administration Office";
                    } else if (recipient.includes("Vice Chancellor")) {
                        salutationAuthority = "The Vice Chancellor";
                    } else if (recipient.includes("Fees Manager")) {
                        salutationAuthority = "The Finance & Fees Accounts Manager";
                    }

                    const standardSalutationPrefix = "To,\n" + salutationAuthority + ",\nUnifyEd.\n\nRespected Sir/Madam,\n\n";
                    
                    let mainMessage = body;
                    const markerIndices = [
                        body.indexOf("Respected Sir/Madam,\n\n"),
                        body.indexOf("Respected Sir,\n\n"),
                        body.indexOf("Respected Madam,\n\n"),
                    ];
                    
                    let foundIndex = -1;
                    let markerLength = 0;
                    for (let idx of markerIndices) {
                        if (idx !== -1) {
                            foundIndex = idx;
                            markerLength = 22;
                            break;
                        }
                    }

                    if (foundIndex === -1) {
                        const altIdx = body.indexOf("Respected Sir,\n\n");
                        if (altIdx !== -1) {
                            foundIndex = altIdx;
                            markerLength = 17;
                        }
                    }

                    if (foundIndex !== -1) {
                        mainMessage = body.substring(foundIndex + markerLength);
                    } else {
                        const lines = body.split("\n");
                        if (lines.length > 5 && lines[0].startsWith("To,")) {
                            mainMessage = lines.slice(6).join("\n");
                        }
                    }

                    bodyArea.value = standardSalutationPrefix + mainMessage;
                };

                window.draftSelectedApplication = function() {
                    const select = document.getElementById("applicationTemplateSelect");
                    if (!select || !select.value) {
                        alert("Please select an application template from the dropdown list first!");
                        return;
                    }

                    selectedTemplateCode = select.value;
                    const template = templates[selectedTemplateCode];

                    const modal = document.getElementById("applicationDraftModal");
                    const header = document.getElementById("draftModalHeaderTitle");
                    const subjectInput = document.getElementById("appSubjectInput");
                    const bodyArea = document.getElementById("appBodyTextarea");

                    if (modal && template && subjectInput && bodyArea) {
                        header.textContent = "Draft: " + select.options[select.selectedIndex].text;
                        subjectInput.value = template.subject;
                        bodyArea.value = template.body;
                        
                        // Set recipient dropdown to HOD by default for leaves, or VC etc if appropriate
                        const recipientSelect = document.getElementById("appRecipientSelect");
                        if (recipientSelect) {
                            if (selectedTemplateCode === "half_day" || selectedTemplateCode === "full_day") {
                                recipientSelect.value = "HOD (Dr. S. K. Gupta)";
                            } else if (selectedTemplateCode === "without_uniform") {
                                recipientSelect.value = "Admin Department";
                            } else if (selectedTemplateCode === "lunch_permission") {
                                recipientSelect.value = "Registrar (Prof. D. Sen)";
                            } else {
                                recipientSelect.value = "Mentor (Dr. A. Verma)";
                            }
                        }
                        
                        updateDraftRecipientSalutation();
                        modal.style.display = "flex";
                    }
                };

                window.closeDraftModal = function() {
                    const modal = document.getElementById("applicationDraftModal");
                    if (modal) modal.style.display = "none";
                    selectedTemplateCode = null;
                };

                window.submitCustomApplication = function() {
                    const recipientVal = document.getElementById("appRecipientSelect").value;
                    const subjectVal = document.getElementById("appSubjectInput").value.trim();
                    const bodyVal = document.getElementById("appBodyTextarea").value.trim();

                    if (!subjectVal || !bodyVal) {
                        alert("Application subject and body contents cannot be empty!");
                        return;
                    }

                    const submitBtn = document.getElementById("submitAppBtn");
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
                    }

                    setTimeout(() => {
                        const list = getApps();
                        list.unshift({
                            refId: "REQ-" + Math.floor(Math.random() * 9000 + 1000),
                            type: subjectVal,
                            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            status: "Pending",
                            approver: recipientVal
                        });
                        saveApps(list);

                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = "Submit ERP Application";
                        }

                        closeDraftModal();
                        renderApps();
                        
                        document.getElementById("applicationTemplateSelect").selectedIndex = 0;
                        alert("ERP application submitted successfully for review!");
                    }, 1200);
                };

                // Initial render
                renderApps();
            });
        