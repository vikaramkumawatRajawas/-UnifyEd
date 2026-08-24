
            document.addEventListener("DOMContentLoaded", () => {
                const defaultDrives = [
                    { id: "drv_tcs", title: "TCS - Ninja Hiring Drive (2026 Batch)", pos: "Associate Software Engineer", pkg: "3.6 LPA", reqCgpa: 6.0, reserved: false },
                    { id: "drv_cognizant", title: "Cognizant - GenC Elevate", pos: "Graduate Engineer Trainee", pkg: "4.2 LPA", reqCgpa: 6.5, reserved: false },
                    { id: "drv_wipro", title: "Wipro - Elite NLTH National Hunt", pos: "Project Engineer", pkg: "3.5 LPA", reqCgpa: 6.0, reserved: false },
                    { id: "drv_google", title: "Google - Software Engineering Intern (Summer 2027)", pos: "SWE Intern", pkg: "1.2 Lakhs / Month", reqCgpa: 8.0, reserved: false }
                ];

                let activeDriveId = null;

                function getDrives() {
                    const saved = localStorage.getItem("placement_drives");
                    if (saved) return JSON.parse(saved);
                    return defaultDrives;
                }

                function saveDrives(list) {
                    localStorage.setItem("placement_drives", JSON.stringify(list));
                }

                window.renderDrives = function() {
                    const container = document.getElementById("jobOpeningsContainer");
                    const countLabel = document.getElementById("registeredDrivesCount");
                    if (!container) return;

                    const list = getDrives();
                    const registeredCount = list.filter(d => d.reserved).length;
                    if (countLabel) countLabel.textContent = registeredCount;

                    container.innerHTML = list.map(item => `
                        <div class="job-item" style="padding: 20px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; transition: transform 0.2s, border-color 0.2s;">
                            <div>
                                <strong style="font-size:14px; color:var(--text-primary); display:block; margin-bottom:4px;">${item.title}</strong>
                                <span style="font-size:12px; color:var(--text-secondary); font-weight:500;">Position: ${item.pos} • Package: ${item.pkg} • Min CGPA: ${item.reqCgpa}</span>
                            </div>
                            <div>
                                ${item.reserved ? 
                                    `<span class="badge badge-success" style="font-size:11px; padding:6px 12px; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Applied / Registered</span>` :
                                    `<button class="btn btn-primary btn-sm" onclick="openRegisterModal('${item.id}', '${item.title.replace(/'/g, "\\'")}', '${item.pkg}')" style="height:32px; font-size:11px;">Register Drive</button>`
                                }
                            </div>
                        </div>
                    `).join("");
                };

                window.openRegisterModal = function(id, title, pkg) {
                    activeDriveId = id;
                    const modal = document.getElementById("driveRegisterModal");
                    const mTitle = document.getElementById("modalDriveTitle");
                    const mPkg = document.getElementById("modalDrivePackage");

                    if (modal && mTitle && mPkg) {
                        mTitle.textContent = title;
                        mPkg.textContent = "Package Offer: " + pkg;
                        modal.style.display = "flex";
                    }
                };

                window.closeRegisterModal = function() {
                    const modal = document.getElementById("driveRegisterModal");
                    if (modal) modal.style.display = "none";
                    activeDriveId = null;
                };

                window.confirmDriveRegistration = function() {
                    const regBtn = document.getElementById("confirmRegBtn");
                    if (regBtn) {
                        regBtn.disabled = true;
                        regBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking eligibility...';
                    }

                    setTimeout(() => {
                        const list = getDrives();
                        const match = list.find(d => d.id === activeDriveId);
                        if (match) {
                            match.reserved = true;
                        }
                        saveDrives(list);

                        if (regBtn) {
                            regBtn.disabled = false;
                            regBtn.textContent = "Confirm Registration";
                        }

                        closeRegisterModal();
                        renderDrives();
                        alert("Placement drive registration confirmed! Applied application sent to T&P registers.");
                    }, 1500);
                };

                // Initial render
                renderDrives();
            });
        