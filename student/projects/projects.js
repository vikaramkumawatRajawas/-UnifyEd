
            document.addEventListener("DOMContentLoaded", () => {
                const defaultProjects = [
                    {
                        id: "proj_quadruped",
                        title: "Autonomous Quadruped Navigation System",
                        desc: "Development of a quadruped robotic simulation navigating structured corridors using LiDAR SLAM and A* mapping pathfinders.",
                        status: "Approved",
                        guide: "Dr. A. Verma",
                        feedback: "Excellent work on LiDAR. Sizing parameters have been validated. Update the hardware specifications in chapter 3 prior to End-Sem reviews.",
                        grade: "9.5 / 10"
                    },
                    {
                        id: "proj_deep_retina",
                        title: "Deep Retina: Diabetic Retinopathy Diagnostic Engine",
                        desc: "Multi-layered CNN architecture trained on retinal imaging data to perform automated early-stage micro-aneurysm classifications.",
                        status: "Under Review",
                        guide: "Prof. S. Sharma",
                        feedback: "Synopsis received. Waiting for model training validation files and ROC performance charts.",
                        grade: "Awaiting Evaluation"
                    }
                ];

                function getProjects() {
                    const saved = localStorage.getItem("capstone_projects");
                    if (saved) return JSON.parse(saved);
                    return defaultProjects;
                }

                function saveProjects(list) {
                    localStorage.setItem("capstone_projects", JSON.stringify(list));
                }

                window.renderProjects = function() {
                    const container = document.getElementById("projectsGridContainer");
                    if (!container) return;

                    const list = getProjects();
                    container.innerHTML = list.map(item => `
                        <div class="proj-card-item glassmorphism" onclick="openEvalModal('${item.id}')" style="padding:22px; border-radius:var(--border-radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                            <strong style="font-size:15px; font-weight:700; color:var(--text-primary); display:block; margin-bottom:8px;">${item.title}</strong>
                            <p style="font-size:12px; color:var(--text-secondary); line-height:1.5; margin:0 0 15px 0; height:54px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">${item.desc}</p>
                            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:12px;">
                                <span class="badge ${item.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${item.status}</span>
                                <span style="font-size:11px; color:var(--text-secondary); font-weight:500;">Guide: ${item.guide}</span>
                            </div>
                        </div>
                    `).join("");
                };

                window.openNewProjectModal = function() {
                    const modal = document.getElementById("newProjectModal");
                    if (modal) modal.style.display = "flex";
                };

                window.closeNewProjectModal = function() {
                    const modal = document.getElementById("newProjectModal");
                    if (modal) modal.style.display = "none";
                    document.getElementById("projTitleInput").value = "";
                    document.getElementById("projDescInput").value = "";
                };

                window.postProjectProposal = function() {
                    const titleVal = document.getElementById("projTitleInput").value.trim();
                    const guideVal = document.getElementById("projGuideSelect").value;
                    const descVal = document.getElementById("projDescInput").value.trim();

                    if (!titleVal || !descVal) {
                        alert("Please fill out all project details!");
                        return;
                    }

                    const postBtn = document.getElementById("postProjBtn");
                    if (postBtn) {
                        postBtn.disabled = true;
                        postBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
                    }

                    setTimeout(() => {
                        const list = getProjects();
                        list.unshift({
                            id: "proj_" + Date.now(),
                            title: titleVal,
                            desc: descVal,
                            status: "Under Review",
                            guide: guideVal,
                            feedback: "Proposal submitted. Waiting for guide to review raw abstract specifications.",
                            grade: "Awaiting Evaluation"
                        });
                        saveProjects(list);

                        if (postBtn) {
                            postBtn.disabled = false;
                            postBtn.textContent = "Submit Proposal";
                        }

                        closeNewProjectModal();
                        renderProjects();
                        alert("Project proposal submitted successfully!");
                    }, 1200);
                };

                window.openEvalModal = function(id) {
                    const list = getProjects();
                    const match = list.find(p => p.id === id);
                    if (!match) return;

                    const modal = document.getElementById("projectEvalModal");
                    const title = document.getElementById("evalProjTitle");
                    const guide = document.getElementById("evalProjGuide");
                    const status = document.getElementById("evalProjStatus");
                    const feedback = document.getElementById("evalProjFeedback");
                    const grade = document.getElementById("evalProjGrade");

                    if (modal && title && feedback) {
                        title.textContent = match.title;
                        guide.textContent = match.guide;
                        status.textContent = match.status;
                        status.className = "badge " + (match.status === "Approved" ? "badge-success" : "badge-warning");
                        feedback.textContent = match.feedback;
                        grade.textContent = match.grade;
                        
                        modal.style.display = "flex";
                    }
                };

                window.closeEvalModal = function() {
                    const modal = document.getElementById("projectEvalModal");
                    if (modal) modal.style.display = "none";
                };

                // Initial render
                renderProjects();
            });
        