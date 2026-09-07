
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

            function initClassResources() {
                const nameInput = document.getElementById("resourceName");
                const typeSelect = document.getElementById("resourceType");
                const linkInput = document.getElementById("resourceLink");
                const sectionSelect = document.getElementById("resourceSection");
                const addBtn = document.getElementById("addResourceBtn");
                const listContainer = document.getElementById("resourcesList");
                const tabs = document.querySelectorAll("#resourceFilterTabs .filter-tab");
                const countLabel = document.getElementById("resourceCountLabel");

                let activeFilter = "all";

                // Default starting resources
                const defaultResources = [
                    { id: 101, name: "BCA Sem 3 Syllabus & Syllabus Sync Log", type: "syllabus", url: "https://drive.google.com/syllabus_bca3", section: "ALL", date: "Aug 10, 2026" },
                    { id: 102, name: "Experiment 1-8: DBMS SQL Lab Manual Pack", type: "manual", url: "https://drive.google.com/dbms_manual", section: "BCA-A", date: "Aug 11, 2026" },
                    { id: 103, name: "Database System Concepts - 7th Edition Reference", type: "textbook", url: "https://drive.google.com/dbms_concepts_ref", section: "ALL", date: "Aug 08, 2026" },
                    { id: 104, name: "incubation Capstone Project proposal PPT template", type: "template", url: "https://drive.google.com/proposal_template", section: "BCA-B", date: "Aug 13, 2026" }
                ];

                const typeIcons = {
                    "syllabus": { icon: "fa-scroll", color: "#10b981" },
                    "manual": { icon: "fa-flask-vial", color: "#6366f1" },
                    "textbook": { icon: "fa-book", color: "#f59e0b" },
                    "template": { icon: "fa-file-powerpoint", color: "#a855f7" }
                };

                function loadResources() {
                    const localRes = JSON.parse(localStorage.getItem("classResources")) || [];
                    const allResources = [...localRes, ...defaultResources];
                    const filtered = allResources.filter(r => activeFilter === "all" || r.type === activeFilter);

                    countLabel.textContent = "Showing " + filtered.length + " shared files";

                    if (filtered.length === 0) {
                        listContainer.innerHTML = '<div style="text-align:center; color:var(--text-tertiary); padding:40px 0;">No shared resources found under this category.</div>';
                        return;
                    }

                    listContainer.innerHTML = filtered.map(r => {
                        const styleInfo = typeIcons[r.type] || { icon: "fa-file", color: "#94a3b8" };
                        return '<div class="resource-item-row">' +
                            '<div style="display:flex; align-items:center; gap:16px; flex:1;">' +
                                '<div style="background:var(--bg-secondary); border:1px solid var(--border-color); width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center;">' +
                                    '<i class="fa-solid ' + styleInfo.icon + '" style="font-size:18px; color:' + styleInfo.color + ';"></i>' +
                                '</div>' +
                                '<div>' +
                                    '<h4 style="margin:0; font-size:13px; font-weight:700; color:var(--text-primary);">' + r.name + '</h4>' +
                                    '<p style="margin:4px 0 0 0; font-size:10px; color:var(--text-tertiary);">' +
                                        '<span style="text-transform:uppercase; font-weight:600; color:' + styleInfo.color + ';">' + r.type + '</span> • ' +
                                        'Class: <strong>' + r.section + '</strong> • Shared: ' + r.date +
                                    '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; align-items:center; gap:12px;">' +
                                '<a href="' + r.url + '" target="_blank" class="btn btn-secondary btn-sm" style="font-size:11px; padding:6px 12px; gap:6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Resource</a>' +
                                '<button onclick="deleteResource(' + r.id + ')" class="resource-delete-btn" title="Delete Resource"><i class="fa-solid fa-trash-can"></i></button>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                tabs.forEach(tab => {
                    tab.addEventListener("click", () => {
                        tabs.forEach(t => t.classList.remove("active"));
                        tab.classList.add("active");
                        activeFilter = tab.getAttribute("data-filter");
                        loadResources();
                    });
                });

                addBtn.addEventListener("click", () => {
                    const name = nameInput.value.trim();
                    const type = typeSelect.value;
                    const url = linkInput.value.trim();
                    const section = sectionSelect.value;

                    if (!name || !url) {
                        alert("Please enter a resource name and a valid destination link.");
                        return;
                    }

                    const localRes = JSON.parse(localStorage.getItem("classResources")) || [];
                    const newResource = {
                        id: Date.now(),
                        name: name,
                        type: type,
                        url: url,
                        section: section,
                        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                    };

                    localRes.unshift(newResource);
                    localStorage.setItem("classResources", JSON.stringify(localRes));

                    nameInput.value = "";
                    linkInput.value = "";

                    loadResources();
                    showToast("Resource shared successfully!");
                });

                window.deleteResource = function(id) {
                    if (!confirm("Are you sure you want to remove this resource?")) return;

                    const localRes = JSON.parse(localStorage.getItem("classResources")) || [];
                    const idx = localRes.findIndex(r => r.id === id);

                    if (idx !== -1) {
                        localRes.splice(idx, 1);
                        localStorage.setItem("classResources", JSON.stringify(localRes));
                        loadResources();
                        showToast("Resource deleted.");
                    } else {
                        alert("Core preloaded resource templates cannot be deleted.");
                    }
                };

                loadResources();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initClassResources);
            } else {
                initClassResources();
            }
        