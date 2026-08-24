
            document.addEventListener("DOMContentLoaded", () => {
                const studyMaterials = [
                    {
                        id: "mat_cnn",
                        title: "Week 5: Convolutional Networks Architectures (LeNet-5, ResNet)",
                        subject: "nn",
                        subjectName: "Neural Networks",
                        uploader: "Prof. S. Sharma",
                        time: "2 days ago",
                        size: "4.2 MB",
                        format: "PDF Format"
                    },
                    {
                        id: "mat_fabrication",
                        title: "CMOS Fabrication Processes Handout",
                        subject: "vlsi",
                        subjectName: "Embedded VLSI Design",
                        uploader: "Dr. A. Verma",
                        time: "5 days ago",
                        size: "2.8 MB",
                        format: "PDF Format"
                    },
                    {
                        id: "mat_backprop",
                        title: "Multi-Layer Backpropagation Mathematical Derivations",
                        subject: "nn",
                        subjectName: "Neural Networks",
                        uploader: "Prof. S. Sharma",
                        time: "1 week ago",
                        size: "1.5 MB",
                        format: "PDF Format"
                    },
                    {
                        id: "mat_indexing",
                        title: "B-Tree & Hash Indexing Performance Guidelines",
                        subject: "db",
                        subjectName: "Database Systems",
                        uploader: "Dr. K. Sen",
                        time: "2 weeks ago",
                        size: "3.4 MB",
                        format: "PDF Format"
                    }
                ];

                let currentSubject = "all";
                let activePreviewId = null;

                window.setSubjectFilter = function(subj) {
                    currentSubject = subj;
                    const buttons = document.querySelectorAll(".filter-btn");
                    buttons.forEach(btn => {
                        const onclickStr = btn.getAttribute("onclick");
                        if (onclickStr && onclickStr.includes("'" + subj + "'")) {
                            btn.style.background = "var(--primary)";
                            btn.style.color = "#fff";
                            btn.style.borderColor = "var(--primary)";
                        } else {
                            btn.style.background = "var(--bg-tertiary)";
                            btn.style.color = "var(--text-secondary)";
                            btn.style.borderColor = "var(--border-color)";
                        }
                    });
                    filterMaterials();
                };

                window.filterMaterials = function() {
                    const searchVal = document.getElementById("materialsSearch").value.toLowerCase();
                    const container = document.getElementById("materialsListContainer");
                    if (!container) return;

                    const filtered = studyMaterials.filter(item => {
                        const matchesSubject = (currentSubject === "all" || item.subject === currentSubject);
                        const matchesSearch = item.title.toLowerCase().includes(searchVal) || item.uploader.toLowerCase().includes(searchVal);
                        return matchesSubject && matchesSearch;
                    });

                    if (filtered.length === 0) {
                        container.innerHTML = `<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:13px;"><i class="fa-solid fa-folder-open" style="font-size:24px; margin-bottom:10px; display:block; color:var(--text-tertiary);"></i> No study materials matched your filters.</div>`;
                        return;
                    }

                    container.innerHTML = filtered.map(item => `
                        <div class="material-row-item" style="display:flex; align-items:center; padding:16px; background-color:var(--bg-tertiary); border-radius:var(--border-radius-sm); border:1px solid var(--border-color); gap:20px; margin-bottom:12px;">
                            <i class="fa-solid fa-file-pdf" style="color:#ef4444; font-size:28px;"></i>
                            <div class="details" style="flex-grow:1;">
                                <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
                                    <strong style="font-size:14px; color:var(--text-primary); margin:0;">${item.title}</strong>
                                    <span style="font-size:9px; background:rgba(99,102,241,0.12); color:var(--primary); padding:2px 8px; border-radius:10px; font-weight:700;">${item.subjectName}</span>
                                </div>
                                <span style="font-size:11px; color:var(--text-secondary);">Uploaded by ${item.uploader} • ${item.time} • ${item.size} • ${item.format}</span>
                            </div>
                            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                <button class="btn btn-secondary btn-sm" onclick="openPreviewModal('${item.id}', '${item.title.replace(/'/g, "\\'")}', '${item.uploader}', '${item.size}')" style="height:32px; font-size:11px; gap:5px;"><i class="fa-solid fa-eye"></i> Preview</button>
                                <button class="btn btn-primary btn-sm" onclick="downloadMaterial('${item.title.replace(/'/g, "\\'")}')" style="height:32px; font-size:11px; gap:5px;"><i class="fa-solid fa-download"></i> Download</button>
                            </div>
                        </div>
                    `).join("");
                };

                window.openPreviewModal = function(id, title, uploader, size) {
                    activePreviewId = id;
                    const modal = document.getElementById("materialPreviewModal");
                    const titleText = document.getElementById("previewModalTitle");
                    const detailsSpan = document.getElementById("previewModalDetails");
                    
                    const loader = document.getElementById("canvasLoader");
                    const content = document.getElementById("canvasContent");

                    if (modal && titleText && detailsSpan && loader && content) {
                        titleText.textContent = "Preview: " + title;
                        detailsSpan.textContent = "Uploaded by " + uploader + " • " + size;
                        
                        modal.style.display = "flex";
                        loader.style.display = "block";
                        content.style.display = "none";

                        setTimeout(() => {
                            loader.style.display = "none";
                            content.style.display = "block";
                        }, 1000);
                    }
                };

                window.closePreviewModal = function() {
                    const modal = document.getElementById("materialPreviewModal");
                    if (modal) {
                        modal.style.display = "none";
                    }
                };

                window.downloadMaterial = function(title) {
                    alert("Initiated download for syllabus slide deck: " + title + ".pdf");
                };

                window.downloadPreviewDocument = function() {
                    const match = studyMaterials.find(item => item.id === activePreviewId);
                    if (match) {
                        downloadMaterial(match.title);
                    }
                };

                // Initial load
                filterMaterials();
            });
        