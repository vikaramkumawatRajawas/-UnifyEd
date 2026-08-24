
            document.addEventListener("DOMContentLoaded", () => {
                const defaultAssignments = [
                    {
                        id: "nn_backprop",
                        title: "Assignment 4: Backpropagation Algorithm Implementation",
                        subject: "Neural Networks & Deep Learning",
                        points: 50,
                        dueDate: "Oct 10, 2026 (11:59 PM)",
                        isOverdue: true,
                        status: "pending"
                    },
                    {
                        id: "vlsi_cmos",
                        title: "VLSI Simulation Lab 2: CMOS Inverter Design",
                        subject: "Embedded VLSI Design",
                        points: 20,
                        dueDate: "Oct 15, 2026 (04:00 PM)",
                        isOverdue: false,
                        status: "pending"
                    },
                    {
                        id: "db_tuning",
                        title: "Assignment 3: Indexing and SQL Performance Tuning",
                        subject: "Database Systems & Tuning",
                        points: 30,
                        dueDate: "Sep 28, 2026 (11:59 PM)",
                        isOverdue: false,
                        status: "completed",
                        grade: "28 / 30"
                    },
                    {
                        id: "nn_mlp",
                        title: "Assignment 2: Multi-Layer Perceptron from Scratch",
                        subject: "Neural Networks & Deep Learning",
                        points: 40,
                        dueDate: "Sep 15, 2026 (11:59 PM)",
                        isOverdue: false,
                        status: "completed",
                        grade: "38 / 40"
                    }
                ];

                let activeTab = "pending";
                let currentSubmitId = null;
                let selectedFile = null;

                function getAssignments() {
                    const saved = localStorage.getItem("classroom_assignments");
                    if (saved) return JSON.parse(saved);
                    return defaultAssignments;
                }

                function saveAssignments(list) {
                    localStorage.setItem("classroom_assignments", JSON.stringify(list));
                }

                window.switchAssignTab = function(tab) {
                    activeTab = tab;
                    
                    const tabPendingBtn = document.getElementById("tabPendingBtn");
                    const tabCompletedBtn = document.getElementById("tabCompletedBtn");

                    if (tabPendingBtn && tabCompletedBtn) {
                        if (tab === "pending") {
                            tabPendingBtn.style.color = "var(--accent)";
                            tabPendingBtn.style.borderBottom = "2px solid var(--accent)";
                            tabCompletedBtn.style.color = "var(--text-secondary)";
                            tabCompletedBtn.style.borderBottom = "none";
                        } else {
                            tabCompletedBtn.style.color = "var(--accent)";
                            tabCompletedBtn.style.borderBottom = "2px solid var(--accent)";
                            tabPendingBtn.style.color = "var(--text-secondary)";
                            tabPendingBtn.style.borderBottom = "none";
                        }
                    }
                    renderList();
                };

                window.renderList = function() {
                    const container = document.getElementById("assignmentsListContainer");
                    const pendingCountText = document.getElementById("pendingCountText");
                    const completedCountText = document.getElementById("completedCountText");
                    if (!container) return;

                    const list = getAssignments();
                    const filtered = list.filter(item => item.status === activeTab);

                    const pendCount = list.filter(i => i.status === "pending").length;
                    const compCount = list.filter(i => i.status === "completed").length;
                    if (pendingCountText) pendingCountText.textContent = pendCount;
                    if (completedCountText) completedCountText.textContent = compCount;

                    if (filtered.length === 0) {
                        container.innerHTML = `<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-folder-open" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No assignments found in this tab.</div>`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => `
                        <div class="assign-card-item" style="display:flex; justify-content:space-between; align-items:center; padding: 20px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); margin-bottom:15px;">
                            <div class="details">
                                <strong style="font-size:14px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:4px;">${item.title}</strong>
                                <p style="font-size:12px; color:var(--text-secondary); margin:0 0 6px 0;">Subject: ${item.subject} • Max Points: ${item.points}</p>
                                <span class="due ${item.isOverdue && item.status === 'pending' ? 'text-danger' : ''}" style="font-size:11px; font-weight:600;">
                                    ${item.status === 'pending' ? 'Due Date: ' + item.dueDate : 'Graded: <strong style="color:var(--accent);">' + (item.grade || 'Submitted (Awaiting evaluation)') + '</strong>'}
                                </span>
                            </div>
                            <div>
                                ${item.status === 'pending' ? 
                                    `<button class="btn btn-primary btn-sm" onclick="openSubmitModal('${item.id}', '${item.title.replace(/'/g, "\\'")}')" style="height:32px; font-size:11px; gap:5px;"><i class="fa-solid fa-cloud-arrow-up"></i> Submit Task</button>` : 
                                    `<span style="color:#10b981; font-weight:700; font-size:12px; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-circle-check"></i> Handed In</span>`
                                }
                            </div>
                        </div>
                    `).join("");
                };

                window.openSubmitModal = function(id, title) {
                    currentSubmitId = id;
                    const modal = document.getElementById("submitTaskModal");
                    const titleText = document.getElementById("modalTaskTitle");
                    
                    if (modal && titleText) {
                        titleText.textContent = "Submit: " + title;
                        modal.style.display = "flex";
                    }
                };

                window.closeSubmitModal = function() {
                    const modal = document.getElementById("submitTaskModal");
                    if (modal) {
                        modal.style.display = "none";
                    }
                    clearSelectedFile();
                    const commentsText = document.getElementById("modalComments");
                    if (commentsText) commentsText.value = "";
                };

                window.triggerFileInput = function() {
                    const fileInput = document.getElementById("modalFileInput");
                    if (fileInput) fileInput.click();
                };

                window.handleFileSelect = function(e) {
                    const files = e.target.files;
                    if (files.length > 0) {
                        selectedFile = files[0];
                        const row = document.getElementById("selectedFileRow");
                        const nameSpan = document.getElementById("selectedFileName");
                        const dropzone = document.getElementById("dropzone");

                        if (row && nameSpan && dropzone) {
                            nameSpan.textContent = selectedFile.name + " (" + (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB)";
                            row.style.display = "flex";
                            dropzone.style.borderColor = "var(--primary)";
                        }
                    }
                };

                window.clearSelectedFile = function() {
                    selectedFile = null;
                    const row = document.getElementById("selectedFileRow");
                    const fileInput = document.getElementById("modalFileInput");
                    const dropzone = document.getElementById("dropzone");

                    if (row && fileInput && dropzone) {
                        row.style.display = "none";
                        fileInput.value = "";
                        dropzone.style.borderColor = "var(--border-color)";
                    }
                };

                window.confirmSubmitTask = function() {
                    if (!selectedFile) {
                        alert("Please select a file to submit!");
                        return;
                    }

                    const confirmBtn = document.getElementById("confirmSubmitBtn");
                    if (confirmBtn) {
                        confirmBtn.disabled = true;
                        confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';
                    }

                    setTimeout(() => {
                        const list = getAssignments();
                        const match = list.find(item => item.id === currentSubmitId);
                        if (match) {
                            match.status = "completed";
                            match.grade = "Awaiting Evaluation";
                            saveAssignments(list);
                        }

                        if (confirmBtn) {
                            confirmBtn.disabled = false;
                            confirmBtn.innerHTML = "Hand In Task";
                        }

                        closeSubmitModal();
                        renderList();
                        alert("Assignment submitted successfully!");
                    }, 1500);
                };

                // Initial render
                renderList();
            });
        