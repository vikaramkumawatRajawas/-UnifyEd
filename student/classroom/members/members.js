
            document.addEventListener("DOMContentLoaded", () => {
                const cohortMembers = [
                    { id: "mem_sharma", name: "Prof. S. Sharma", role: "faculty", sub: "HOD Computer Science Dept", email: "s.sharma@unifyed.edu", idNum: "FAC-9011", office: "CS Block, Room 204", avatar: "S" },
                    { id: "mem_verma_dr", name: "Dr. A. Verma", role: "faculty", sub: "Associate Professor - VLSI", email: "a.verma@unifyed.edu", idNum: "FAC-9082", office: "ECE Block, Room 102", avatar: "V" },
                    { id: "mem_anjali", name: "Anjali Kumawat", role: "student", sub: "Classmate", email: "anjali.uemj26@gmail.com", idNum: "UNIFY-2026-1025", office: "Hostel Block B", avatar: "A" },
                    { id: "mem_aditya", name: "Aditya Sharma", role: "student", sub: "Classmate", email: "aditya.sharma@unifyed.edu", idNum: "UNIFY-2026-1033", office: "Hostel Block A", avatar: "A" },
                    { id: "mem_rahul", name: "Rahul Sharma", role: "student", sub: "Classmate", email: "rahul.sharma@unifyed.edu", idNum: "UNIFY-2026-1090", office: "Day Scholar", avatar: "R" }
                ];

                let currentRole = "all";
                let activeMember = null;

                window.setRoleFilter = function(role) {
                    currentRole = role;
                    const buttons = document.querySelectorAll(".filter-btn");
                    buttons.forEach(btn => {
                        const onclickStr = btn.getAttribute("onclick");
                        if (onclickStr && onclickStr.includes("'" + role + "'")) {
                            btn.style.background = "var(--primary)";
                            btn.style.color = "#fff";
                            btn.style.borderColor = "var(--primary)";
                        } else {
                            btn.style.background = "var(--bg-tertiary)";
                            btn.style.color = "var(--text-secondary)";
                            btn.style.borderColor = "var(--border-color)";
                        }
                    });
                    filterMembers();
                };

                window.filterMembers = function() {
                    const searchVal = document.getElementById("membersSearch").value.toLowerCase();
                    const container = document.getElementById("membersGridContainer");
                    if (!container) return;

                    const filtered = cohortMembers.filter(item => {
                        const matchesRole = (currentRole === "all" || item.role === currentRole);
                        const matchesSearch = item.name.toLowerCase().includes(searchVal) || item.idNum.toLowerCase().includes(searchVal);
                        return matchesRole && matchesSearch;
                    });

                    if (filtered.length === 0) {
                        container.innerHTML = `<div style="grid-column:1/-1; padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-users" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No classroom cohort members matched your query.</div>`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => `
                        <div class="member-item" onclick="openMemberModal('${item.id}')" style="display:flex; align-items:center; gap:15px; padding:16px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                            <div style="width:40px; height:40px; border-radius:50%; background:${item.role === 'faculty' ? 'var(--accent)' : 'var(--primary)'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px;">${item.avatar}</div>
                            <div style="flex-grow:1;">
                                <strong style="display:block; font-size:14px; color:var(--text-primary); margin-bottom:2px;">${item.name}</strong>
                                <span style="font-size:11px; color:var(--text-secondary);">${item.sub} • ${item.idNum}</span>
                            </div>
                            <i class="fa-solid fa-chevron-right" style="font-size:12px; color:var(--text-tertiary);"></i>
                        </div>
                    `).join("");
                };

                window.openMemberModal = function(id) {
                    const match = cohortMembers.find(m => m.id === id);
                    if (!match) return;

                    activeMember = match;
                    const modal = document.getElementById("memberDetailModal");
                    const avatar = document.getElementById("modalAvatar");
                    const name = document.getElementById("modalName");
                    const sub = document.getElementById("modalSub");
                    const email = document.getElementById("modalEmail");
                    const idNum = document.getElementById("modalID");
                    const office = document.getElementById("modalOffice");

                    if (modal && name) {
                        name.textContent = match.name;
                        sub.textContent = match.role.toUpperCase() + " • " + match.sub;
                        email.textContent = match.email;
                        idNum.textContent = match.idNum;
                        office.textContent = match.office;
                        avatar.textContent = match.avatar;
                        avatar.style.background = match.role === "faculty" ? "var(--accent)" : "var(--primary)";
                        
                        modal.style.display = "flex";
                    }
                };

                window.closeMemberModal = function() {
                    const modal = document.getElementById("memberDetailModal");
                    if (modal) modal.style.display = "none";
                };

                window.initiateCohortChat = function() {
                    if (activeMember) {
                        window.open("mailto:" + activeMember.email);
                    }
                };

                // Initial load
                filterMembers();
            });
        