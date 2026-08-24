
            // Log local storage errors
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

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

            function initMaterials() {
                const titleInput = document.getElementById("materialTitle");
                const catSelect = document.getElementById("materialCategory");
                const linkInput = document.getElementById("materialLink");
                const dropzone = document.getElementById("materialDropzone");
                const dropzoneStatus = document.getElementById("dropzoneStatus");
                const addBtn = document.getElementById("addMaterialBtn");
                const grid = document.getElementById("materialsGrid");
                const tabs = document.querySelectorAll("#materialFilterTabs .filter-tab");
                const countLabel = document.getElementById("materialCountLabel");

                let uploadedFileMock = null;
                let activeFilter = "all";

                // Default library resources
                const defaultMaterials = [
                    { id: 1, title: "DBMS Lecture 1: Relational Model", category: "slides", destination: "dbms_lec1.pptx", size: "4.2 MB", time: "2 days ago" },
                    { id: 2, title: "Database Normal Forms cheat sheet", category: "pdf", destination: "normalization_sheet.pdf", size: "1.1 MB", time: "3 days ago" },
                    { id: 3, title: "SQL Window Functions Video Tutorial", category: "video", destination: "https://youtube.com/dbms-window-funcs", size: "12 min video", time: "5 days ago" },
                    { id: 4, title: "Relational Algebra interactive solver", category: "link", destination: "https://dbis-uibk.github.io/rdb-solver/", size: "External Link", time: "1 week ago" }
                ];

                // Category Icons mapper
                const catIcons = {
                    "slides": { icon: "fa-file-powerpoint", color: "#e05b35" },
                    "pdf": { icon: "fa-file-pdf", color: "#ef4444" },
                    "video": { icon: "fa-file-video", color: "#10b981" },
                    "link": { icon: "fa-link", color: "#a855f7" }
                };

                // Populate grid
                function loadLibrary() {
                    const localMaterials = JSON.parse(localStorage.getItem("studyMaterials")) || [];
                    const fullLibrary = [...localMaterials, ...defaultMaterials];
                    
                    const filtered = fullLibrary.filter(m => activeFilter === "all" || m.category === activeFilter);
                    
                    countLabel.textContent = "Showing " + filtered.length + " resources";

                    if (filtered.length === 0) {
                        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:var(--text-tertiary); padding:40px 0;">No resources found under this filter category.</div>';
                        return;
                    }

                    grid.innerHTML = filtered.map(m => {
                        const styleInfo = catIcons[m.category] || { icon: "fa-file", color: "#6366f1" };
                        return '<div class="material-card glassmorphism">' +
                            '<button type="button" class="material-delete-btn" onclick="deleteMaterial(' + m.id + ')" title="Delete Resource"><i class="fa-solid fa-trash-can"></i></button>' +
                            '<div style="display:flex; gap:12px; align-items:start;">' +
                                '<i class="fa-solid ' + styleInfo.icon + '" style="font-size:28px; color:' + styleInfo.color + '; margin-top:2px;"></i>' +
                                '<div style="flex:1; padding-right:15px;">' +
                                    '<h4 style="margin:0; font-size:12px; font-weight:700; color:var(--text-primary); line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + m.title + '</h4>' +
                                    '<span style="font-size:9px; color:var(--text-tertiary); text-transform:uppercase; font-weight:600; margin-top:4px; display:inline-block;">' + m.category + '</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:10px; margin-top:10px;">' +
                                '<span style="font-size:10px; color:var(--text-tertiary);">' + m.size + '</span>' +
                                '<a href="' + m.destination + '" target="_blank" class="btn" style="background:rgba(99, 102, 241, 0.1); color:var(--primary); font-size:10px; padding:4px 10px; border-radius:4px; font-weight:600; border:none; gap:4px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open</a>' +
                            '</div>' +
                        '</div>';
                    }).join("");
                }

                // Attach filter tab clicks
                tabs.forEach(tab => {
                    tab.addEventListener("click", () => {
                        tabs.forEach(t => t.classList.remove("active"));
                        tab.classList.add("active");
                        activeFilter = tab.getAttribute("data-filter");
                        loadLibrary();
                    });
                });

                // Real File upload trigger
                const realFileInput = document.getElementById("realFileInput");

                dropzone.addEventListener("click", () => {
                    realFileInput.click();
                });

                realFileInput.addEventListener("change", (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        uploadedFileMock = file.name;
                        const fileSizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
                        dropzoneStatus.textContent = "Selected: " + file.name + " (" + fileSizeStr + ")";
                        dropzoneStatus.style.color = "#10b981";
                        if (!titleInput.value) {
                            // Strip file extension for the title input helper
                            titleInput.value = file.name.split('.').slice(0, -1).join('.') || file.name;
                        }
                        showToast("File selected: " + file.name);
                    }
                });

                // Add material click
                addBtn.addEventListener("click", () => {
                    const title = titleInput.value.trim();
                    const category = catSelect.value;
                    let destination = linkInput.value.trim();

                    if (!title) {
                        alert("Please provide a resource title.");
                        return;
                    }

                    if (!destination && uploadedFileMock) {
                        destination = uploadedFileMock;
                    }

                    if (!destination) {
                        alert("Please upload a file or specify a destination URL.");
                        return;
                    }

                    const localMaterials = JSON.parse(localStorage.getItem("studyMaterials")) || [];
                    const newResource = {
                        id: Date.now(),
                        title: title,
                        category: category,
                        destination: destination,
                        size: uploadedFileMock ? "2.4 MB" : "External Link",
                        time: "Just now"
                    };

                    localMaterials.unshift(newResource);
                    localStorage.setItem("studyMaterials", JSON.stringify(localMaterials));

                    // Reset form
                    titleInput.value = "";
                    linkInput.value = "";
                    uploadedFileMock = null;
                    dropzoneStatus.textContent = "Max file size: 50MB";
                    dropzoneStatus.style.color = "var(--text-tertiary)";

                    loadLibrary();
                    showToast("Success: Resource published to classroom library!");
                });

                // Delete resource helper bind to window
                window.deleteMaterial = function(id) {
                    if (!confirm("Are you sure you want to remove this resource from the classroom?")) return;
                    
                    const localMaterials = JSON.parse(localStorage.getItem("studyMaterials")) || [];
                    const idx = localMaterials.findIndex(m => m.id === id);

                    if (idx !== -1) {
                        localMaterials.splice(idx, 1);
                        localStorage.setItem("studyMaterials", JSON.stringify(localMaterials));
                        loadLibrary();
                        showToast("Resource removed from library.");
                    } else {
                        alert("Warning: Core preloaded resources cannot be deleted.");
                    }
                };

                loadLibrary();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initMaterials);
            } else {
                initMaterials();
            }
        