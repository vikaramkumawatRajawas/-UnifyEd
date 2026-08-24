/**
 * ==========================================================================
 * UNIFYED PROFESSOR PORTAL - STUDENT CERTIFICATES LOGIC
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // PDF to Canvas DataURL converter (Runs inline without CORS web worker issues)
    async function renderPdfToDataUrl(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            if (typeof pdfjsLib !== 'undefined') {
                pdfjsLib.GlobalWorkerOptions.workerSrc = '';
            }
            const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), disableWorker: true });
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;
            return canvas.toDataURL('image/png');
        } catch (err) {
            console.warn("PDF.js render failed, trying FileReader fallback:", err);
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        }
    }

    // Local Storage Persistence Key
    const STORAGE_KEY = "UNIFYED_CERT_DATA_V3";

    // Load initial or persisted state
    function loadStateFromStorage() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.certificates) certificateData = parsed.certificates;
                if (parsed.templates) {
                    templateData = parsed.templates.map(tmpl => {
                        if (tmpl.customImage) {
                            tmpl.hiddenElements = {
                                logo: !(tmpl.hiddenElements && tmpl.hiddenElements.logo === false),
                                institution: !(tmpl.hiddenElements && tmpl.hiddenElements.institution === false),
                                subheading: !(tmpl.hiddenElements && tmpl.hiddenElements.subheading === false),
                                presents: !(tmpl.hiddenElements && tmpl.hiddenElements.presents === false),
                                student: tmpl.hiddenElements ? !!tmpl.hiddenElements.student : false,
                                title: !(tmpl.hiddenElements && tmpl.hiddenElements.title === false),
                                citation: !(tmpl.hiddenElements && tmpl.hiddenElements.citation === false),
                                signature: !(tmpl.hiddenElements && tmpl.hiddenElements.signature === false),
                                seal: !(tmpl.hiddenElements && tmpl.hiddenElements.seal === false),
                                qr: tmpl.hiddenElements ? !!tmpl.hiddenElements.qr : false
                            };
                            tmpl.isCustomHiddenInitialized = true;
                        }
                        return tmpl;
                    });
                }
                saveStateToStorage();
            } catch (e) {
                console.error("Error reading certificate storage:", e);
            }
        }
    }

    function saveStateToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            certificates: certificateData,
            templates: templateData
        }));
    }

    // Initial Certificate Requests & Issued Dataset
    let certificateData = [
        {
            id: "CERT-REQ-101",
            uuid: "UNIFY-CERT-884920",
            studentName: "Alex Morgan",
            rollNo: "CS-2024-001",
            batch: "CS-4A",
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120",
            title: "Advanced Machine Learning Specialization",
            category: "academic",
            categoryLabel: "Academic Excellence",
            grade: "Grade A+ (Distinction)",
            citation: "For outstanding academic performance and top score in Neural Networks & Deep Learning.",
            requestDate: "18 Aug 2026",
            status: "pending",
            event: "convocation-2026",
            tmplId: "TMPL-GOLD-101"
        },
        {
            id: "CERT-REQ-102",
            uuid: "UNIFY-CERT-884921",
            studentName: "Rohan Verma",
            rollNo: "CS-2024-002",
            batch: "CS-4A",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
            title: "Autonomous Robotics Capstone Project",
            category: "project",
            categoryLabel: "Project Completion",
            grade: "Grade A",
            citation: "In recognition of building a ROS2 based autonomous navigation system for campus logistics.",
            requestDate: "16 Aug 2026",
            status: "pending",
            event: "tech-fest-2026",
            tmplId: "TMPL-HACK-102"
        },
        {
            id: "CERT-REQ-103",
            uuid: "UNIFY-CERT-884922",
            studentName: "Sophia Chen",
            rollNo: "CS-2024-003",
            batch: "CS-6B",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
            title: "Distributed Systems & Cloud Architecture",
            category: "course",
            categoryLabel: "Course Mastery",
            grade: "Grade A+",
            citation: "Mastery in microservices, Kubernetes orchestration, and serverless architectures.",
            requestDate: "15 Aug 2026",
            status: "issued",
            event: "ml-workshop-2026",
            tmplId: "TMPL-AI-103"
        },
        {
            id: "CERT-REQ-104",
            uuid: "UNIFY-CERT-884923",
            studentName: "Marcus Vance",
            rollNo: "AI-2024-004",
            batch: "AI-Lab",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
            title: "Research Assistant Internship Recommendation",
            category: "internship",
            categoryLabel: "Internship Recommendation",
            grade: "Excellent Conduct",
            citation: "Recommended for research fellowship based on contributions to LLM fine-tuning benchmarks.",
            requestDate: "14 Aug 2026",
            status: "pending",
            event: "internship-drive",
            tmplId: "TMPL-INTERN-106"
        },
        {
            id: "CERT-REQ-105",
            uuid: "UNIFY-CERT-884924",
            studentName: "Priya Sharma",
            rollNo: "CS-2024-005",
            batch: "CS-4A",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
            title: "Character & Bonafide Conduct Certificate",
            category: "bonafide",
            categoryLabel: "Conduct & Bonafide",
            grade: "Satisfactory",
            citation: "Verified regular student in Computer Science Dept with exemplary disciplinary record.",
            requestDate: "12 Aug 2026",
            status: "issued",
            event: "convocation-2026",
            tmplId: "TMPL-GOLD-101"
        }
    ];

    // Master Certificate Templates Dataset (Unique designs for each template name)
    let templateData = [
        {
            id: "TMPL-GOLD-101",
            name: "Academic Excellence & Gold Honors",
            event: "convocation-2026",
            eventName: "🎓 Academic Convocation 2026",
            category: "academic",
            badge: "Official Gold",
            borderTheme: "gold",
            fontStyle: "cinzel-script",
            fontSize: "normal",
            logoIcon: "fa-graduation-cap",
            customLogoImg: null,
            institutionName: "UNIFYED INSTITUTE OF TECHNOLOGY",
            subHeading: "OFFICIAL ACADEMIC CREDENTIAL & CERTIFICATION",
            presentationText: "This certificate is proudly awarded to",
            sampleRecipient: "Alex Morgan",
            title: "ADVANCED MACHINE LEARNING SPECIALIZATION",
            citation: "In recognition of outstanding academic performance, top rank in Deep Learning, and exemplary capstone research project.",
            signatoryName: "Dr. Sarah Jenkins",
            signatoryRole: "Professor & Dept HOD",
            signatory2Name: "Dr. Robert Vance",
            signatory2Role: "Dean of Academics",
            sealType: "gold-medal",
            desc: "Designed for top rankers, GPA > 3.8 achievers, and department gold medalists.",
            customImage: null
        },
        {
            id: "TMPL-HACK-102",
            name: "Hackathon Winner & Tech Innovation",
            event: "tech-fest-2026",
            eventName: "💻 Tech Fest & Hackathon 2026",
            category: "project",
            badge: "Winner Edition",
            borderTheme: "blue",
            fontStyle: "outfit-inter",
            fontSize: "large",
            logoIcon: "fa-laptop-code",
            customLogoImg: null,
            institutionName: "UNIFYED INSTITUTE OF TECHNOLOGY",
            subHeading: "NATIONAL ANNUAL TECH FEST & HACKATHON 2026",
            presentationText: "This Certificate of Victory is awarded to",
            sampleRecipient: "Rohan Verma",
            title: "1ST PLACE - AUTONOMOUS AI BOT HACKATHON",
            citation: "In recognition of exceptional coding skill, innovative system architecture, and securing 1st rank in the 36-hour Hackathon.",
            signatoryName: "Prof. Alan Turing",
            signatoryRole: "Convener, Tech Fest 2026",
            signatory2Name: "Dr. Sarah Jenkins",
            signatory2Role: "Head of CS Department",
            sealType: "blue-badge",
            desc: "Ideal for hackathon winners, code sprint champions, and technical innovation awards.",
            customImage: null
        },
        {
            id: "TMPL-AI-103",
            name: "AI & ML Hands-on Workshop Mastery",
            event: "ml-workshop-2026",
            eventName: "🤖 AI & ML Specialization Workshop",
            category: "workshop",
            badge: "Specialization",
            borderTheme: "purple",
            fontStyle: "playfair-script",
            fontSize: "normal",
            logoIcon: "fa-microchip",
            customLogoImg: null,
            institutionName: "UNIFYED INSTITUTE OF TECHNOLOGY",
            subHeading: "DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE",
            presentationText: "This Certificate of Mastery is awarded to",
            sampleRecipient: "Sophia Chen",
            title: "DEEP LEARNING & NEURAL NETWORKS WORKSHOP",
            citation: "For successfully completing 40 hours of intensive training on PyTorch, Computer Vision, and Generative AI Model Architecture.",
            signatoryName: "Dr. Sarah Jenkins",
            signatoryRole: "Lead AI Researcher",
            sealType: "purple-stamp",
            desc: "Issued to students completing technical bootcamps, AI labs, and specialized workshops.",
            customImage: null
        },
        {
            id: "TMPL-SPORTS-104",
            name: "Annual Sports & Athletics Winner",
            event: "annual-sports-2026",
            eventName: "🏆 Annual Sports Championship 2026",
            category: "sports",
            badge: "Champion",
            borderTheme: "emerald",
            fontStyle: "cinzel-script",
            fontSize: "large",
            logoIcon: "fa-trophy",
            customLogoImg: null,
            institutionName: "UNIFYED INSTITUTE OF TECHNOLOGY",
            subHeading: "ANNUAL ATHLETIC MEET & SPORTS CHAMPIONSHIP",
            presentationText: "This Certificate of Achievement is presented to",
            sampleRecipient: "Marcus Vance",
            title: "INTER-COLLEGE ATHLETICS GOLD MEDAL",
            citation: "In recognition of outstanding athletic endurance, sportsmanship, and winning 1st place in the Track & Field Championship.",
            signatoryName: "Coach David Miller",
            signatoryRole: "Director of Physical Education",
            sealType: "star-shield",
            desc: "Perfect for sports captains, athletic tournament winners, and inter-college medals.",
            customImage: null
        },
        {
            id: "TMPL-RES-105",
            name: "Research Symposium Paper Presentation",
            event: "research-symposium",
            eventName: "🔬 National Research Symposium 2026",
            category: "academic",
            badge: "Published",
            borderTheme: "crimson",
            fontStyle: "georgia-script",
            fontSize: "normal",
            logoIcon: "fa-book-bookmark",
            customLogoImg: null,
            institutionName: "UNIFYED INSTITUTE OF TECHNOLOGY",
            subHeading: "NATIONAL SYMPOSIUM ON EMERGING TECHNOLOGIES",
            presentationText: "This Certificate of Publication is presented to",
            sampleRecipient: "Priya Sharma",
            title: "BEST RESEARCH PAPER AWARD 2026",
            citation: "For presenting groundbreaking research on 'Quantum Encryption in Cloud Storage' at the IEEE Student Conference.",
            signatoryName: "Dr. Robert Vance",
            signatoryRole: "Dean of Research & Publications",
            sealType: "gold-medal",
            desc: "Used for paper publications, poster sessions, and research symposium awards.",
            customImage: null
        },
        {
            id: "TMPL-INTERN-106",
            name: "Industry Internship & Placement Recommendation",
            event: "internship-drive",
            eventName: "💼 Placement & Internship Drive",
            category: "internship",
            badge: "Corporate",
            borderTheme: "blue",
            fontStyle: "outfit-inter",
            fontSize: "normal",
            logoIcon: "fa-briefcase",
            customLogoImg: null,
            institutionName: "UNIFYED INSTITUTE OF TECHNOLOGY",
            subHeading: "CAREER DEVELOPMENT & PLACEMENT CELL",
            presentationText: "This Letter of Recommendation & Credential is given to",
            sampleRecipient: "Liam Johnson",
            title: "FULL STACK SOFTWARE ENGINEERING INTERNSHIP",
            citation: "Demonstrating high professional competence, software architecture proficiency, and completing a 6-month industry internship.",
            signatoryName: "Dr. Sarah Jenkins",
            signatoryRole: "Head of Placement Cell",
            sealType: "blue-badge",
            desc: "Issued for industry internship completion, corporate training, and faculty recommendations.",
            customImage: null
        }
    ];

    // State Variables
    let currentTab = "pending";
    let currentEventFilter = "all";
    let activePreviewItem = null;
    let uploadedFileDataUrl = null;
    let editorUploadedLogoUrl = null;
    let editorCustomBgUrl = null;

    // Interactive Drag & Drop State for Canvas Elements
    let isDragModeEnabled = false;
    let activeDraggingElem = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialElemX = 0;
    let initialElemY = 0;

    // DOM Elements
    const certTableBody = document.getElementById("certTableBody");
    const certTableView = document.getElementById("certTableView");
    const certTemplatesView = document.getElementById("certTemplatesView");
    const templateCardsContainer = document.getElementById("templateCardsContainer");
    const tabButtons = document.querySelectorAll(".cert-tab-btn");
    
    // Filter Controls
    const certSearchInput = document.getElementById("certSearchInput");
    const certEventFilter = document.getElementById("certEventFilter");
    const templateEventFilter = document.getElementById("templateEventFilter");
    const certTypeFilter = document.getElementById("certTypeFilter");
    const certBatchFilter = document.getElementById("certBatchFilter");
    const btnResetFilters = document.getElementById("btnResetFilters");

    // Action Buttons
    const btnUploadTemplateHeader = document.getElementById("btnUploadTemplateHeader");
    const btnUploadTemplateGrid = document.getElementById("btnUploadTemplateGrid");
    const btnIssueCert = document.getElementById("btnIssueCert");
    const btnTemplates = document.getElementById("btnTemplates");

    // Stats
    const statPendingCount = document.getElementById("statPendingCount");
    const statIssuedCount = document.getElementById("statIssuedCount");
    const tabPendingBadge = document.getElementById("tabPendingBadge");
    const tabIssuedBadge = document.getElementById("tabIssuedBadge");
    const visibleCount = document.getElementById("visibleCount");

    // Modals
    const issueModal = document.getElementById("issueModal");
    const closeIssueModal = document.getElementById("closeIssueModal");
    const cancelIssueModal = document.getElementById("cancelIssueModal");
    const issueCertForm = document.getElementById("issueCertForm");

    const previewModal = document.getElementById("previewModal");
    const closePreviewModal = document.getElementById("closePreviewModal");
    const closePreviewFooter = document.getElementById("closePreviewFooter");
    const previewCertLogo = document.getElementById("previewCertLogo");
    const previewInstitutionName = document.getElementById("previewInstitutionName");
    const previewSubheading = document.getElementById("previewSubheading");
    const previewPresentsText = document.getElementById("previewPresentsText");
    const previewStudentName = document.getElementById("previewStudentName");
    const previewStudentRoll = document.getElementById("previewStudentRoll");
    const previewCertTitle = document.getElementById("previewCertTitle");
    const previewCitation = document.getElementById("previewCitation");
    const previewSignHandwriting = document.getElementById("previewSignHandwriting");
    const previewSignName = document.getElementById("previewSignName");
    const previewSignRole = document.getElementById("previewSignRole");
    const previewSignBlock2 = document.getElementById("previewSignBlock2");
    const previewSign2Handwriting = document.getElementById("previewSign2Handwriting");
    const previewSign2Name = document.getElementById("previewSign2Name");
    const previewSign2Role = document.getElementById("previewSign2Role");
    const previewSealRing = document.getElementById("previewSealRing");
    const previewCertUUID = document.getElementById("previewCertUUID");
    const previewBorderOuter = document.getElementById("previewBorderOuter");
    const previewBorderInner = document.getElementById("previewBorderInner");
    const certPrintArea = document.getElementById("certPrintArea");
    const previewCertBgImg = document.getElementById("previewCertBgImg");

    const btnConfirmApproveModal = document.getElementById("btnConfirmApproveModal");
    const btnPrintCert = document.getElementById("btnPrintCert");

    // Live Template Editor Controls
    const templateEditorModal = document.getElementById("templateEditorModal");
    const closeEditorModal = document.getElementById("closeEditorModal");
    const cancelEditorModal = document.getElementById("cancelEditorModal");
    const btnSaveEditorTemplate = document.getElementById("btnSaveEditorTemplate");
    const btnSaveEditorFooter = document.getElementById("btnSaveEditorFooter");

    const editTemplateId = document.getElementById("editTemplateId");
    const editTemplateName = document.getElementById("editTemplateName");
    const editTemplateEvent = document.getElementById("editTemplateEvent");
    const editTemplateCategory = document.getElementById("editTemplateCategory");
    const editInstitutionName = document.getElementById("editInstitutionName");
    const editSubHeading = document.getElementById("editSubHeading");
    const editPresentationText = document.getElementById("editPresentationText");
    const editSampleRecipient = document.getElementById("editSampleRecipient");
    const editCourseTitle = document.getElementById("editCourseTitle");
    const editCitationText = document.getElementById("editCitationText");
    const editSignatoryName = document.getElementById("editSignatoryName");
    const editSignatoryRole = document.getElementById("editSignatoryRole");
    const editSignatory2Name = document.getElementById("editSignatory2Name");
    const editSignatory2Role = document.getElementById("editSignatory2Role");
    const editThemeColor = document.getElementById("editThemeColor");
    const editSealType = document.getElementById("editSealType");
    const editFontStyle = document.getElementById("editFontStyle");
    const editFontSize = document.getElementById("editFontSize");
    const editLogoIcon = document.getElementById("editLogoIcon");
    const logoFileInput = document.getElementById("logoFileInput");
    const editorBgFileInput = document.getElementById("editorBgFileInput");

    // Advanced Colors & Toggles
    const editPrimaryTextColor = document.getElementById("editPrimaryTextColor");
    const editTitleTextColor = document.getElementById("editTitleTextColor");
    const toggleShowLogo = document.getElementById("toggleShowLogo");
    const toggleShowInstitution = document.getElementById("toggleShowInstitution");
    const toggleShowSubheading = document.getElementById("toggleShowSubheading");
    const toggleShowPresents = document.getElementById("toggleShowPresents");
    const toggleShowStudent = document.getElementById("toggleShowStudent");
    const toggleShowTitle = document.getElementById("toggleShowTitle");
    const toggleShowCitation = document.getElementById("toggleShowCitation");
    const toggleShowSignature = document.getElementById("toggleShowSignature");
    const toggleShowSeal = document.getElementById("toggleShowSeal");
    const toggleShowQR = document.getElementById("toggleShowQR");

    const editEnableDragMode = document.getElementById("editEnableDragMode");
    const btnResetElementPositions = document.getElementById("btnResetElementPositions");

    // Editor Preview DOM Nodes
    const editorCertPaper = document.getElementById("editorCertPaper");
    const editorCertBgImg = document.getElementById("editorCertBgImg");
    const editorBorderOuter = document.getElementById("editorBorderOuter");
    const editorBorderInner = document.getElementById("editorBorderInner");
    const editorCertLogo = document.getElementById("editorCertLogo");
    const editorPreviewInst = document.getElementById("editorPreviewInst");
    const editorPreviewSub = document.getElementById("editorPreviewSub");
    const editorPreviewPresents = document.getElementById("editorPreviewPresents");
    const editorPreviewStudent = document.getElementById("editorPreviewStudent");
    const editorPreviewTitle = document.getElementById("editorPreviewTitle");
    const editorPreviewCitation = document.getElementById("editorPreviewCitation");
    const editorPreviewHandSign = document.getElementById("editorPreviewHandSign");
    const editorPreviewSignName = document.getElementById("editorPreviewSignName");
    const editorPreviewSignRole = document.getElementById("editorPreviewSignRole");
    const elemCertSign2 = document.getElementById("elemCertSign2");
    const editorPreviewSign2Hand = document.getElementById("editorPreviewSign2Hand");
    const editorPreviewSign2Name = document.getElementById("editorPreviewSign2Name");
    const editorPreviewSign2Role = document.getElementById("editorPreviewSign2Role");

    // Upload Template Modal
    const uploadTemplateModal = document.getElementById("uploadTemplateModal");
    const closeUploadModal = document.getElementById("closeUploadModal");
    const cancelUploadModal = document.getElementById("cancelUploadModal");
    const uploadTemplateForm = document.getElementById("uploadTemplateForm");
    const uploadDropzone = document.getElementById("uploadDropzone");
    const templateFileInput = document.getElementById("templateFileInput");
    const btnBrowseTemplate = document.getElementById("btnBrowseTemplate");
    const uploadFilePreviewBox = document.getElementById("uploadFilePreviewBox");
    const uploadedImageDisplay = document.getElementById("uploadedImageDisplay");
    const uploadedFileName = document.getElementById("uploadedFileName");
    const uploadedFileSize = document.getElementById("uploadedFileSize");
    const btnRemoveUploadedFile = document.getElementById("btnRemoveUploadedFile");

    // Canvas Drag & Drop System
    function setupCanvasDragAndDrop() {
        const canvasElems = document.querySelectorAll("#editorCertPaper .canvas-element");
        
        canvasElems.forEach(elem => {
            elem.addEventListener("mousedown", (e) => {
                if (!isDragModeEnabled) return;
                e.preventDefault();

                activeDraggingElem = elem;
                elem.classList.add("is-dragging");

                dragStartX = e.clientX;
                dragStartY = e.clientY;

                // Read current transform offset
                const transform = elem.style.transform;
                let currentX = 0;
                let currentY = 0;
                if (transform && transform.includes("translate")) {
                    const matches = transform.match(/translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/);
                    if (matches) {
                        currentX = parseFloat(matches[1]);
                        currentY = parseFloat(matches[2]);
                    }
                }

                initialElemX = currentX;
                initialElemY = currentY;
            });
        });

        window.addEventListener("mousemove", (e) => {
            if (!activeDraggingElem || !isDragModeEnabled) return;

            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;

            const newX = Math.round(initialElemX + deltaX);
            const newY = Math.round(initialElemY + deltaY);

            activeDraggingElem.style.transform = `translate(${newX}px, ${newY}px)`;

            // Save in template data model
            const currentTmplId = editTemplateId.value;
            const tmpl = templateData.find(t => t.id === currentTmplId);
            if (tmpl) {
                if (!tmpl.elementPositions) tmpl.elementPositions = {};
                tmpl.elementPositions[activeDraggingElem.id] = { x: newX, y: newY };
            }
        });

        window.addEventListener("mouseup", () => {
            if (activeDraggingElem) {
                activeDraggingElem.classList.remove("is-dragging");
                activeDraggingElem = null;
            }
        });
    }

    // Initialize Page
    function init() {
        loadStateFromStorage();
        updateStats();
        renderTable();
        renderTemplates();
        attachEventListeners();
        setupCanvasDragAndDrop();

        const today = new Date().toISOString().split('T')[0];
        const modalIssueDate = document.getElementById("modalIssueDate");
        if (modalIssueDate) modalIssueDate.value = today;
    }

    // Update KPIs
    function updateStats() {
        const pendingItems = certificateData.filter(item => item.status === "pending");
        const issuedItems = certificateData.filter(item => item.status === "issued");

        if (statPendingCount) statPendingCount.innerText = pendingItems.length;
        if (statIssuedCount) statIssuedCount.innerText = issuedItems.length;
        if (tabPendingBadge) tabPendingBadge.innerText = pendingItems.length;
        if (tabIssuedBadge) tabIssuedBadge.innerText = issuedItems.length;
    }

    // Render Table View (Tab 1 & Tab 2)
    function renderTable() {
        const certControlsCard = document.getElementById("certControlsCard");
        if (currentTab === "templates") {
            if (certControlsCard) certControlsCard.classList.add("hidden");
            certTableView.classList.add("hidden");
            certTemplatesView.classList.remove("hidden");
            renderTemplates();
            return;
        }

        if (certControlsCard) certControlsCard.classList.remove("hidden");
        certTemplatesView.classList.add("hidden");
        certTableView.classList.remove("hidden");

        const searchQuery = certSearchInput ? certSearchInput.value.toLowerCase().trim() : "";
        const eventValue = certEventFilter ? certEventFilter.value : "all";
        const typeValue = certTypeFilter ? certTypeFilter.value : "all";
        const batchValue = certBatchFilter ? certBatchFilter.value : "all";

        const filtered = certificateData.filter(item => {
            if (currentTab === "pending" && item.status !== "pending") return false;
            if (currentTab === "issued" && item.status !== "issued") return false;
            if (eventValue !== "all" && item.event !== eventValue) return false;
            if (typeValue !== "all" && item.category !== typeValue) return false;
            if (batchValue !== "all" && item.batch !== batchValue) return false;

            if (searchQuery) {
                const matchName = item.studentName.toLowerCase().includes(searchQuery);
                const matchRoll = item.rollNo.toLowerCase().includes(searchQuery);
                const matchTitle = item.title.toLowerCase().includes(searchQuery);
                const matchUUID = item.uuid.toLowerCase().includes(searchQuery);
                if (!matchName && !matchRoll && !matchTitle && !matchUUID) return false;
            }
            return true;
        });

        if (visibleCount) visibleCount.innerText = filtered.length;

        if (filtered.length === 0) {
            certTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px 20px; color: var(--text-tertiary);">
                        <i class="fa-solid fa-folder-open" style="font-size: 32px; margin-bottom: 10px; display: block;"></i>
                        No certificate requests found matching your selected tab and event filters.
                    </td>
                </tr>
            `;
            return;
        }

        certTableBody.innerHTML = filtered.map(item => `
            <tr>
                <td>
                    <div class="student-info-cell">
                        <img src="${item.avatar}" alt="${item.studentName}" class="student-avatar">
                        <div class="student-details">
                            <span class="student-name">${item.studentName}</span>
                            <span class="student-meta">${item.rollNo} • ${item.batch}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="cert-title-cell">
                        <span>${item.title}</span>
                        <span class="cert-subtitle">${item.grade || 'Standard Approval'}</span>
                    </div>
                </td>
                <td>
                    <span class="badge-category badge-${item.category}">${item.categoryLabel}</span>
                </td>
                <td>
                    <span style="font-weight: 500;">${item.requestDate}</span>
                </td>
                <td>
                    <span class="status-pill status-${item.status}">
                        <i class="fa-solid ${item.status === 'issued' ? 'fa-check' : item.status === 'pending' ? 'fa-clock' : 'fa-xmark'}"></i>
                        ${item.status.toUpperCase()}
                    </span>
                </td>
                <td class="text-right">
                    <div class="action-btn-group">
                        ${item.status === 'pending' ? `
                            <button class="table-action-btn btn-approve approve-action-btn" data-id="${item.id}" title="Approve & Issue Certificate">
                                <i class="fa-solid fa-check"></i> Approve
                            </button>
                            <button class="table-action-btn btn-reject reject-action-btn" data-id="${item.id}" title="Reject Request">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        ` : ''}
                        <button class="table-action-btn btn-view-cert preview-action-btn" data-id="${item.id}" title="Preview Verified Certificate">
                            <i class="fa-solid fa-eye"></i> View Cert
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");

        attachDynamicTableEvents();
    }

    // Attach row events
    function attachDynamicTableEvents() {
        document.querySelectorAll(".approve-action-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                approveCertificate(id);
            });
        });

        document.querySelectorAll(".reject-action-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                rejectCertificate(id);
            });
        });

        document.querySelectorAll(".preview-action-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                openPreviewModal(id);
            });
        });
    }

    // Render Certificate Templates Library Grid (Tab 3) with UNIQUE representative image thumbnails matching each template's name & theme
    function renderTemplates() {
        if (!templateCardsContainer) return;

        const eventVal = templateEventFilter ? templateEventFilter.value : currentEventFilter;

        const filteredTemplates = templateData.filter(tmpl => {
            if (eventVal !== "all" && tmpl.event !== eventVal) return false;
            return true;
        });

        if (filteredTemplates.length === 0) {
            templateCardsContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--bg-surface); border-radius: 16px; border: 1px dashed var(--border-color);">
                    <i class="fa-solid fa-layer-group" style="font-size: 38px; color: var(--text-tertiary); margin-bottom: 12px;"></i>
                    <h3 style="color: var(--text-primary); margin: 0 0 6px 0;">No Certificate Templates Found</h3>
                    <p style="color: var(--text-tertiary); font-size: 13px; margin: 0 0 16px 0;">There are no templates registered for the selected event yet.</p>
                    <button class="btn btn-primary" id="btnUploadEmptyTemplate">
                        <i class="fa-solid fa-cloud-arrow-up"></i> Upload Template for this Event
                    </button>
                </div>
            `;
            const btnUploadEmpty = document.getElementById("btnUploadEmptyTemplate");
            if (btnUploadEmpty) {
                btnUploadEmpty.addEventListener("click", () => {
                    uploadTemplateModal.classList.remove("hidden");
                });
            }
            return;
        }

        templateCardsContainer.innerHTML = filteredTemplates.map(tmpl => {
            let previewGraphicHtml = "";

            if (tmpl.customImage) {
                previewGraphicHtml = `<img src="${tmpl.customImage}" alt="${tmpl.name}" class="custom-template-img">`;
            } else {
                const borderClass = `mini-cert-border-${tmpl.borderTheme || 'gold'}`;
                const fontClass = `font-${tmpl.fontStyle || 'cinzel-script'}`;
                
                let logoNode = `<i class="fa-solid ${tmpl.logoIcon || 'fa-graduation-cap'}"></i>`;
                if (tmpl.customLogoImg) {
                    logoNode = `<img src="${tmpl.customLogoImg}" alt="Logo" style="height: 14px; object-fit: contain;">`;
                }

                previewGraphicHtml = `
                    <div class="mini-cert-paper ${borderClass} ${fontClass}">
                        <div class="mini-cert-header">
                            <div style="font-size: 12px; margin-bottom: 2px;">${logoNode}</div>
                            <h5>${tmpl.institutionName}</h5>
                            <p>${tmpl.subHeading}</p>
                        </div>
                        <div class="mini-cert-body">
                            <span class="mini-cert-presents">${tmpl.presentationText}</span>
                            <div class="mini-cert-name">${tmpl.sampleRecipient}</div>
                            <div class="mini-cert-title">${tmpl.title}</div>
                        </div>
                        <div class="mini-cert-footer">
                            <div class="mini-cert-sign">${tmpl.signatoryName}</div>
                            <div class="mini-cert-seal">
                                <i class="fa-solid fa-award"></i>
                            </div>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="template-card-item" data-tmpl-id="${tmpl.id}">
                    <div class="template-event-tag">
                        <i class="fa-solid fa-calendar-check"></i> ${tmpl.eventName.replace(/^[^\s]+\s*/, '')}
                    </div>
                    <div class="template-preview-badge">${tmpl.badge || 'Official'}</div>
                    
                    <div class="template-thumb-preview">
                        ${previewGraphicHtml}
                    </div>
                    
                    <div class="template-info">
                        <h3 class="template-info-title">${tmpl.name}</h3>
                        <p class="template-info-desc">${tmpl.desc || tmpl.citation}</p>
                        
                        <div class="template-action-row">
                            <button class="btn btn-edit-template btn-sm edit-tmpl-btn" data-tmpl-id="${tmpl.id}" title="Edit Template Layout">
                                <i class="fa-solid fa-pen"></i> Edit
                            </button>
                            <button class="btn btn-outline btn-sm preview-tmpl-btn" data-tmpl-id="${tmpl.id}" title="Preview Full Layout">
                                <i class="fa-solid fa-eye"></i> Preview
                            </button>
                            <button class="btn btn-primary btn-sm use-tmpl-btn" data-tmpl-id="${tmpl.id}" title="Use this template to issue certificate">
                                <i class="fa-solid fa-file-circle-check"></i> Issue
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        attachDynamicTemplateEvents();
    }

    // Attach clicks for template cards
    function attachDynamicTemplateEvents() {
        document.querySelectorAll(".edit-tmpl-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const tmplId = e.currentTarget.dataset.tmplId;
                openTemplateEditor(tmplId);
            });
        });

        document.querySelectorAll(".preview-tmpl-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const tmplId = e.currentTarget.dataset.tmplId;
                const tmpl = templateData.find(t => t.id === tmplId);
                if (tmpl) {
                    openPreviewModal("CERT-REQ-101", tmpl);
                }
            });
        });

        document.querySelectorAll(".use-tmpl-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const tmplId = e.currentTarget.dataset.tmplId;
                const tmpl = templateData.find(t => t.id === tmplId);
                if (tmpl) {
                    const modalCertTitle = document.getElementById("modalCertTitle");
                    const modalCertType = document.getElementById("modalCertType");
                    const modalCitation = document.getElementById("modalCitation");
                    if (modalCertTitle) modalCertTitle.value = tmpl.title;
                    if (modalCertType) modalCertType.value = tmpl.category;
                    if (modalCitation) modalCitation.value = tmpl.citation;

                    issueModal.classList.remove("hidden");
                }
            });
        });
    }

    // Open Live Template Editor Modal
    function openTemplateEditor(tmplId) {
        const tmpl = templateData.find(t => t.id === tmplId);
        if (!tmpl) return;

        editTemplateId.value = tmpl.id;
        editTemplateName.value = tmpl.name;
        editTemplateEvent.value = tmpl.event;
        editTemplateCategory.value = tmpl.category;
        editInstitutionName.value = tmpl.institutionName;
        editSubHeading.value = tmpl.subHeading;
        editPresentationText.value = tmpl.presentationText;
        editSampleRecipient.value = tmpl.sampleRecipient;
        editCourseTitle.value = tmpl.title;
        editCitationText.value = tmpl.citation;
        editSignatoryName.value = tmpl.signatoryName;
        editSignatoryRole.value = tmpl.signatoryRole;
        if (editSignatory2Name) editSignatory2Name.value = tmpl.signatory2Name || "";
        if (editSignatory2Role) editSignatory2Role.value = tmpl.signatory2Role || "";
        editThemeColor.value = tmpl.borderTheme || "gold";
        editSealType.value = tmpl.sealType || "gold-medal";
        if (editFontStyle) editFontStyle.value = tmpl.fontStyle || "cinzel-script";
        if (editFontSize) editFontSize.value = tmpl.fontSize || "normal";
        if (editLogoIcon) editLogoIcon.value = tmpl.logoIcon || "fa-graduation-cap";

        if (editPrimaryTextColor) editPrimaryTextColor.value = (tmpl.customColors && tmpl.customColors.primary) || "#0f172a";
        if (editTitleTextColor) editTitleTextColor.value = (tmpl.customColors && tmpl.customColors.title) || "#b45309";

        const isCustomBg = !!tmpl.customImage;
        const hidden = isCustomBg ? {
            logo: !(tmpl.hiddenElements && tmpl.hiddenElements.logo === false),
            institution: !(tmpl.hiddenElements && tmpl.hiddenElements.institution === false),
            subheading: !(tmpl.hiddenElements && tmpl.hiddenElements.subheading === false),
            presents: !(tmpl.hiddenElements && tmpl.hiddenElements.presents === false),
            student: tmpl.hiddenElements ? !!tmpl.hiddenElements.student : false,
            title: !(tmpl.hiddenElements && tmpl.hiddenElements.title === false),
            citation: !(tmpl.hiddenElements && tmpl.hiddenElements.citation === false),
            signature: !(tmpl.hiddenElements && tmpl.hiddenElements.signature === false),
            seal: !(tmpl.hiddenElements && tmpl.hiddenElements.seal === false),
            qr: tmpl.hiddenElements ? !!tmpl.hiddenElements.qr : false
        } : (tmpl.hiddenElements || {});
        if (toggleShowLogo) toggleShowLogo.checked = !hidden.logo;
        if (toggleShowInstitution) toggleShowInstitution.checked = !hidden.institution;
        if (toggleShowSubheading) toggleShowSubheading.checked = !hidden.subheading;
        if (toggleShowPresents) toggleShowPresents.checked = !hidden.presents;
        if (toggleShowStudent) toggleShowStudent.checked = !hidden.student;
        if (toggleShowTitle) toggleShowTitle.checked = !hidden.title;
        if (toggleShowCitation) toggleShowCitation.checked = !hidden.citation;
        if (toggleShowSignature) toggleShowSignature.checked = !hidden.signature;
        if (toggleShowSeal) toggleShowSeal.checked = !hidden.seal;
        if (toggleShowQR) toggleShowQR.checked = !hidden.qr;

        if (editEnableDragMode) editEnableDragMode.checked = false;
        isDragModeEnabled = false;

        editorUploadedLogoUrl = tmpl.customLogoImg || null;
        editorCustomBgUrl = tmpl.customImage || null;

        updateLiveEditorPreview();
        templateEditorModal.classList.remove("hidden");
    }

    // Update Live Editor Preview Paper real-time as user changes inputs
    function updateLiveEditorPreview() {
        const currentTmplId = editTemplateId.value;
        const tmpl = templateData.find(t => t.id === currentTmplId);

        if (editorPreviewInst) editorPreviewInst.innerText = editInstitutionName.value || "INSTITUTION NAME";
        if (editorPreviewSub) editorPreviewSub.innerText = editSubHeading.value || "OFFICIAL CREDENTIAL";
        if (editorPreviewPresents) editorPreviewPresents.innerText = editPresentationText.value || "This certificate is awarded to";
        if (editorPreviewStudent) editorPreviewStudent.innerText = editSampleRecipient.value || "Student Name";
        if (editorPreviewTitle) editorPreviewTitle.innerText = editCourseTitle.value || "CERTIFICATE TITLE";
        if (editorPreviewCitation) editorPreviewCitation.innerText = editCitationText.value || "Citation details...";
        if (editorPreviewHandSign) editorPreviewHandSign.innerText = editSignatoryName.value || "Signatory";
        if (editorPreviewSignName) editorPreviewSignName.innerText = editSignatoryName.value || "Signatory Name";
        if (editorPreviewSignRole) editorPreviewSignRole.innerText = editSignatoryRole.value || "Role";

        // Signatory 2 update
        const sig2NameVal = editSignatory2Name ? editSignatory2Name.value : "";
        const sig2RoleVal = editSignatory2Role ? editSignatory2Role.value : "";
        if (elemCertSign2) {
            if (sig2NameVal && sig2NameVal.trim() !== "") {
                elemCertSign2.style.display = "";
                if (editorPreviewSign2Hand) editorPreviewSign2Hand.innerText = sig2NameVal;
                if (editorPreviewSign2Name) editorPreviewSign2Name.innerText = sig2NameVal;
                if (editorPreviewSign2Role) editorPreviewSign2Role.innerText = sig2RoleVal || "Co-Signatory";
            } else {
                elemCertSign2.style.display = "none";
            }
        }

        // Logo Icon or Custom Image Logo update
        if (editorCertLogo) {
            if (editorUploadedLogoUrl) {
                editorCertLogo.innerHTML = `<img src="${editorUploadedLogoUrl}" class="cert-custom-logo-img" alt="Logo">`;
            } else {
                const iconClass = editLogoIcon ? editLogoIcon.value : "fa-graduation-cap";
                editorCertLogo.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
            }
        }

        // Custom Background Image / Converted PDF Layer
        if (editorCustomBgUrl) {
            if (editorCertBgImg) {
                editorCertBgImg.src = editorCustomBgUrl;
                editorCertBgImg.style.display = "block";
            }
            editorCertPaper.classList.add("has-custom-bg");
        } else {
            if (editorCertBgImg) {
                editorCertBgImg.src = "";
                editorCertBgImg.style.display = "none";
            }
            editorCertPaper.classList.remove("has-custom-bg");
        }

        // Custom Text & Title Colors
        const primaryColor = editPrimaryTextColor ? editPrimaryTextColor.value : "#0f172a";
        const titleColor = editTitleTextColor ? editTitleTextColor.value : "#b45309";

        if (editorPreviewInst) editorPreviewInst.style.color = primaryColor;
        if (editorPreviewStudent) editorPreviewStudent.style.color = primaryColor;
        if (editorPreviewCitation) editorPreviewCitation.style.color = primaryColor;
        if (editorPreviewTitle) editorPreviewTitle.style.color = titleColor;
        if (editorPreviewSub) editorPreviewSub.style.color = titleColor;

        // Visibility Toggles
        const setElemVisible = (node, isVisible) => {
            if (node) node.style.display = isVisible ? "" : "none";
        };

        const elemDivider = document.getElementById("editorPreviewDivider");
        const elemPresents = document.getElementById("editorPreviewPresents");
        const elemStudent = document.getElementById("editorPreviewStudent");
        const elemTitle = document.getElementById("editorPreviewTitle");
        const elemCitation = document.getElementById("editorPreviewCitation");
        const elemSign = document.getElementById("elemCertSign");
        const elemSeal = document.getElementById("elemCertSeal");
        const elemQR = document.getElementById("elemCertQR");

        if (editorCertLogo) setElemVisible(editorCertLogo, toggleShowLogo ? toggleShowLogo.checked : true);
        if (editorPreviewInst) setElemVisible(editorPreviewInst, toggleShowInstitution ? toggleShowInstitution.checked : true);
        if (editorPreviewSub) setElemVisible(editorPreviewSub, toggleShowSubheading ? toggleShowSubheading.checked : true);
        if (elemDivider) setElemVisible(elemDivider, toggleShowSubheading ? toggleShowSubheading.checked : true);
        if (elemPresents) setElemVisible(elemPresents, toggleShowPresents ? toggleShowPresents.checked : true);
        if (elemStudent) setElemVisible(elemStudent, toggleShowStudent ? toggleShowStudent.checked : true);
        if (elemTitle) setElemVisible(elemTitle, toggleShowTitle ? toggleShowTitle.checked : true);
        if (elemCitation) setElemVisible(elemCitation, toggleShowCitation ? toggleShowCitation.checked : true);
        if (elemSign) setElemVisible(elemSign, toggleShowSignature ? toggleShowSignature.checked : true);
        if (elemSeal) setElemVisible(elemSeal, toggleShowSeal ? toggleShowSeal.checked : true);
        if (elemQR) setElemVisible(elemQR, toggleShowQR ? toggleShowQR.checked : true);

        // Position Offsets
        const positions = (tmpl && tmpl.elementPositions) || {};
        Object.keys(positions).forEach(elemId => {
            const node = document.getElementById(elemId);
            if (node && positions[elemId]) {
                node.style.transform = `translate(${positions[elemId].x || 0}px, ${positions[elemId].y || 0}px)`;
            }
        });

        // Drag Mode Class
        if (editEnableDragMode && editEnableDragMode.checked) {
            isDragModeEnabled = true;
            editorCertPaper.classList.add("canvas-drag-active");
            const dragTag = document.getElementById("dragStatusTag");
            if (dragTag) dragTag.innerHTML = `<i class="fa-solid fa-hand-pointer"></i> Drag Mode Active`;
        } else {
            isDragModeEnabled = false;
            editorCertPaper.classList.remove("canvas-drag-active");
            const dragTag = document.getElementById("dragStatusTag");
            if (dragTag) dragTag.innerText = `Live Dynamic Render`;
        }

        // Font Style Class update
        const fontClass = editFontStyle ? `font-${editFontStyle.value}` : 'font-cinzel-script';
        if (editorBorderInner) {
            editorBorderInner.className = `cert-border-inner ${fontClass}`;
        }

        // Font Size Scale update
        const sizeClass = editFontSize ? `font-size-${editFontSize.value}` : 'font-size-normal';
        if (editorCertPaper) {
            editorCertPaper.className = `certificate-paper-container ${sizeClass} ${editorCustomBgUrl ? 'has-custom-bg' : ''} ${isDragModeEnabled ? 'canvas-drag-active' : ''}`;
        }

        // Theme Colors & Borders update
        const selectedTheme = editThemeColor.value;
        const colorMap = {
            gold: { border: "#b45309", title: "#b45309", bg: "radial-gradient(circle at center, #ffffff 60%, #fffbeb 100%)" },
            blue: { border: "#1d4ed8", title: "#1d4ed8", bg: "radial-gradient(circle at center, #ffffff 60%, #eff6ff 100%)" },
            purple: { border: "#6b21a8", title: "#6b21a8", bg: "radial-gradient(circle at center, #ffffff 60%, #faf5ff 100%)" },
            emerald: { border: "#047857", title: "#047857", bg: "radial-gradient(circle at center, #ffffff 60%, #ecfdf5 100%)" },
            crimson: { border: "#991b1b", title: "#991b1b", bg: "radial-gradient(circle at center, #ffffff 60%, #fef2f2 100%)" }
        };

        if (editorCustomBgUrl) {
            if (editorCertBgImg) {
                editorCertBgImg.src = editorCustomBgUrl;
                editorCertBgImg.style.display = "block";
            }
        } else {
            if (editorCertBgImg) {
                editorCertBgImg.src = "";
                editorCertBgImg.style.display = "none";
            }
        }

        const theme = colorMap[selectedTheme] || colorMap.gold;
        if (editorBorderOuter) editorBorderOuter.style.borderColor = editorCustomBgUrl ? "transparent" : theme.border;
        if (editorBorderInner) {
            editorBorderInner.style.borderColor = editorCustomBgUrl ? "transparent" : theme.border;
            editorBorderInner.style.background = editorCustomBgUrl ? "transparent" : theme.bg;
        }
    }

    // Save edited template
    function saveTemplateChanges() {
        const id = editTemplateId.value;
        const tmpl = templateData.find(t => t.id === id);
        if (!tmpl) return;

        const eventSelectNode = editTemplateEvent;
        const eventNameText = eventSelectNode.options[eventSelectNode.selectedIndex].text;

        tmpl.name = editTemplateName.value;
        tmpl.event = editTemplateEvent.value;
        tmpl.eventName = eventNameText;
        tmpl.category = editTemplateCategory.value;
        tmpl.institutionName = editInstitutionName.value;
        tmpl.subHeading = editSubHeading.value;
        tmpl.presentationText = editPresentationText.value;
        tmpl.sampleRecipient = editSampleRecipient.value;
        tmpl.title = editCourseTitle.value;
        tmpl.citation = editCitationText.value;
        tmpl.signatoryName = editSignatoryName.value;
        tmpl.signatoryRole = editSignatoryRole.value;
        tmpl.signatory2Name = editSignatory2Name ? editSignatory2Name.value : "";
        tmpl.signatory2Role = editSignatory2Role ? editSignatory2Role.value : "";
        tmpl.borderTheme = editThemeColor.value;
        tmpl.sealType = editSealType.value;
        tmpl.fontStyle = editFontStyle ? editFontStyle.value : "cinzel-script";
        tmpl.fontSize = editFontSize ? editFontSize.value : "normal";
        tmpl.logoIcon = editLogoIcon ? editLogoIcon.value : "fa-graduation-cap";
        tmpl.customLogoImg = editorUploadedLogoUrl || tmpl.customLogoImg;
        tmpl.customImage = editorCustomBgUrl || tmpl.customImage;

        tmpl.customColors = {
            primary: editPrimaryTextColor ? editPrimaryTextColor.value : "#0f172a",
            title: editTitleTextColor ? editTitleTextColor.value : "#b45309"
        };

        tmpl.hiddenElements = {
            logo: toggleShowLogo ? !toggleShowLogo.checked : false,
            institution: toggleShowInstitution ? !toggleShowInstitution.checked : false,
            subheading: toggleShowSubheading ? !toggleShowSubheading.checked : false,
            presents: toggleShowPresents ? !toggleShowPresents.checked : false,
            student: toggleShowStudent ? !toggleShowStudent.checked : false,
            title: toggleShowTitle ? !toggleShowTitle.checked : false,
            citation: toggleShowCitation ? !toggleShowCitation.checked : false,
            signature: toggleShowSignature ? !toggleShowSignature.checked : false,
            seal: toggleShowSeal ? !toggleShowSeal.checked : false,
            qr: toggleShowQR ? !toggleShowQR.checked : false
        };
        tmpl.isCustomHiddenInitialized = true;

        saveStateToStorage();
        templateEditorModal.classList.add("hidden");
        renderTemplates();
        showToast(`Template "${tmpl.name}" successfully updated!`, "success");
    }

    // Approve certificate
    function approveCertificate(id) {
        const item = certificateData.find(c => c.id === id);
        if (item) {
            item.status = "issued";
            saveStateToStorage();
            updateStats();
            renderTable();
            showToast(`Approved & issued certificate for ${item.studentName}!`, "success");
        }
    }

    // Reject certificate
    function rejectCertificate(id) {
        const item = certificateData.find(c => c.id === id);
        if (item) {
            item.status = "rejected";
            saveStateToStorage();
            updateStats();
            renderTable();
            showToast(`Rejected request for ${item.studentName}.`, "error");
        }
    }

    // Open Digital Certificate Preview Modal with FULL dynamic rendering
    function openPreviewModal(id, overrideTmpl = null) {
        let tmpl = overrideTmpl;

        if (!tmpl) {
            const item = certificateData.find(c => c.id === id);
            if (!item) return;

            activePreviewItem = item;
            tmpl = templateData.find(t => t.id === item.tmplId) || templateData[0];

            previewStudentName.innerText = item.studentName;
            previewStudentRoll.innerText = `Roll No: ${item.rollNo} | Dept of Computer Science`;
            previewCertTitle.innerText = item.title;
            previewCitation.innerText = item.citation || `Demonstrating exceptional diligence, performance, and successful completion of ${item.title}.`;
            previewCertUUID.innerText = `ID: ${item.uuid}`;

            if (item.status === "issued") {
                btnConfirmApproveModal.style.display = "none";
            } else {
                btnConfirmApproveModal.style.display = "inline-flex";
            }
        } else {
            previewStudentName.innerText = tmpl.sampleRecipient;
            previewStudentRoll.innerText = `Roll No: CS-2024-001 | Dept of Computer Science`;
            previewCertTitle.innerText = tmpl.title;
            previewCitation.innerText = tmpl.citation;
            previewCertUUID.innerText = `ID: UNIFY-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
            btnConfirmApproveModal.style.display = "none";
        }

        // Apply template customization attributes to Preview Modal canvas
        if (previewInstitutionName) previewInstitutionName.innerText = tmpl.institutionName;
        if (previewSubheading) previewSubheading.innerText = tmpl.subHeading;
        if (previewPresentsText) previewPresentsText.innerText = tmpl.presentationText;
        if (previewSignHandwriting) previewSignHandwriting.innerText = tmpl.signatoryName;
        if (previewSignName) previewSignName.innerText = tmpl.signatoryName;
        if (previewSignRole) previewSignRole.innerText = tmpl.signatoryRole;

        // Signatory 2
        if (previewSignBlock2) {
            if (tmpl.signatory2Name && tmpl.signatory2Name.trim() !== "") {
                previewSignBlock2.style.display = "";
                if (previewSign2Handwriting) previewSign2Handwriting.innerText = tmpl.signatory2Name;
                if (previewSign2Name) previewSign2Name.innerText = tmpl.signatory2Name;
                if (previewSign2Role) previewSign2Role.innerText = tmpl.signatory2Role || "Co-Signatory";
            } else {
                previewSignBlock2.style.display = "none";
            }
        }

        // Logo
        if (previewCertLogo) {
            if (tmpl.customLogoImg) {
                previewCertLogo.innerHTML = `<img src="${tmpl.customLogoImg}" class="cert-custom-logo-img" alt="Logo">`;
            } else {
                previewCertLogo.innerHTML = `<i class="fa-solid ${tmpl.logoIcon || 'fa-graduation-cap'}"></i>`;
            }
        }

        // Custom Background Image / PDF Overlay Layer in Preview Modal
        if (tmpl.customImage) {
            if (previewCertBgImg) {
                previewCertBgImg.src = tmpl.customImage;
                previewCertBgImg.style.display = "block";
            }
            certPrintArea.classList.add("has-custom-bg");
        } else {
            if (previewCertBgImg) {
                previewCertBgImg.src = "";
                previewCertBgImg.style.display = "none";
            }
            certPrintArea.classList.remove("has-custom-bg");
        }

        // Theme & Custom Colors
        const selectedTheme = tmpl.borderTheme || 'gold';
        const colorMap = {
            gold: { border: "#b45309", title: "#b45309", bg: "radial-gradient(circle at center, #ffffff 60%, #fffbeb 100%)" },
            blue: { border: "#1d4ed8", title: "#1d4ed8", bg: "radial-gradient(circle at center, #ffffff 60%, #eff6ff 100%)" },
            purple: { border: "#6b21a8", title: "#6b21a8", bg: "radial-gradient(circle at center, #ffffff 60%, #faf5ff 100%)" },
            emerald: { border: "#047857", title: "#047857", bg: "radial-gradient(circle at center, #ffffff 60%, #ecfdf5 100%)" },
            crimson: { border: "#991b1b", title: "#991b1b", bg: "radial-gradient(circle at center, #ffffff 60%, #fef2f2 100%)" }
        };

        const theme = colorMap[selectedTheme] || colorMap.gold;
        const primaryColor = (tmpl.customColors && tmpl.customColors.primary) || "#0f172a";
        const titleColor = (tmpl.customColors && tmpl.customColors.title) || (theme ? theme.title : "#b45309");

        if (previewInstitutionName) previewInstitutionName.style.color = primaryColor;
        if (previewStudentName) previewStudentName.style.color = primaryColor;
        if (previewCitation) previewCitation.style.color = primaryColor;
        if (previewCertTitle) previewCertTitle.style.color = titleColor;
        if (previewSubheading) previewSubheading.style.color = titleColor;

        if (previewBorderOuter) previewBorderOuter.style.borderColor = tmpl.customImage ? "transparent" : theme.border;
        if (previewBorderInner) {
            previewBorderInner.style.borderColor = tmpl.customImage ? "transparent" : theme.border;
            previewBorderInner.style.background = tmpl.customImage ? "transparent" : theme.bg;
            previewBorderInner.className = `cert-border-inner font-${tmpl.fontStyle || 'cinzel-script'}`;
        }

        // Apply Hidden Elements
        const isCustomBg = !!tmpl.customImage;
        const hidden = isCustomBg ? {
            logo: !(tmpl.hiddenElements && tmpl.hiddenElements.logo === false),
            institution: !(tmpl.hiddenElements && tmpl.hiddenElements.institution === false),
            subheading: !(tmpl.hiddenElements && tmpl.hiddenElements.subheading === false),
            presents: !(tmpl.hiddenElements && tmpl.hiddenElements.presents === false),
            student: tmpl.hiddenElements ? !!tmpl.hiddenElements.student : false,
            title: !(tmpl.hiddenElements && tmpl.hiddenElements.title === false),
            citation: !(tmpl.hiddenElements && tmpl.hiddenElements.citation === false),
            signature: !(tmpl.hiddenElements && tmpl.hiddenElements.signature === false),
            seal: !(tmpl.hiddenElements && tmpl.hiddenElements.seal === false),
            qr: tmpl.hiddenElements ? !!tmpl.hiddenElements.qr : false
        } : (tmpl.hiddenElements || {});
        const setElemVisible = (node, isVisible) => {
            if (node) node.style.display = isVisible ? "" : "none";
        };

        const previewAchievementText = document.getElementById("previewAchievementText");
        const previewDividerLine = document.getElementById("previewDividerLine");
        const previewSignBlock1 = document.getElementById("previewSignBlock1");
        const previewQRNode = document.getElementById("previewQRBlock");

        if (previewCertLogo) setElemVisible(previewCertLogo, !hidden.logo);
        if (previewInstitutionName) setElemVisible(previewInstitutionName, !hidden.institution);
        if (previewSubheading) setElemVisible(previewSubheading, !hidden.subheading);
        if (previewDividerLine) setElemVisible(previewDividerLine, !hidden.subheading);
        if (previewPresentsText) setElemVisible(previewPresentsText, !hidden.presents);
        if (previewAchievementText) setElemVisible(previewAchievementText, !hidden.presents && !hidden.title);
        if (previewStudentName) setElemVisible(previewStudentName, !hidden.student);
        if (previewCertTitle) setElemVisible(previewCertTitle, !hidden.title);
        if (previewCitation) setElemVisible(previewCitation, !hidden.citation);
        if (previewSignBlock1) setElemVisible(previewSignBlock1, !hidden.signature);
        if (previewSealRing) setElemVisible(previewSealRing, !hidden.seal);
        if (previewQRNode) setElemVisible(previewQRNode, !hidden.qr);

        // Position Offsets
        const positions = tmpl.elementPositions || {};
        Object.keys(positions).forEach(elemId => {
            const previewNode = document.querySelector(`#certPrintArea #${elemId}`);
            if (previewNode && positions[elemId]) {
                previewNode.style.transform = `translate(${positions[elemId].x || 0}px, ${positions[elemId].y || 0}px)`;
            }
        });

        if (certPrintArea) {
            certPrintArea.className = `certificate-paper-container font-size-${tmpl.fontSize || 'normal'} ${tmpl.customImage ? 'has-custom-bg' : ''}`;
        }

        previewModal.classList.remove("hidden");
    }

    // Event Listeners
    function attachEventListeners() {
        // Tab switching
        tabButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                tabButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentTab = btn.dataset.tab;
                renderTable();
            });
        });

        // Filter events
        if (certSearchInput) certSearchInput.addEventListener("input", renderTable);
        if (certTypeFilter) certTypeFilter.addEventListener("change", renderTable);
        if (certBatchFilter) certBatchFilter.addEventListener("change", renderTable);

        // Event Dropdown Filter Sync
        if (certEventFilter) {
            certEventFilter.addEventListener("change", (e) => {
                currentEventFilter = e.target.value;
                if (templateEventFilter) templateEventFilter.value = currentEventFilter;
                renderTable();
            });
        }

        if (templateEventFilter) {
            templateEventFilter.addEventListener("change", (e) => {
                currentEventFilter = e.target.value;
                if (certEventFilter) certEventFilter.value = currentEventFilter;
                renderTemplates();
            });
        }

        if (btnResetFilters) {
            btnResetFilters.addEventListener("click", () => {
                if (certSearchInput) certSearchInput.value = "";
                if (certEventFilter) certEventFilter.value = "all";
                if (templateEventFilter) templateEventFilter.value = "all";
                if (certTypeFilter) certTypeFilter.value = "all";
                if (certBatchFilter) certBatchFilter.value = "all";
                currentEventFilter = "all";
                renderTable();
                renderTemplates();
            });
        }

        // Modals triggers
        if (btnIssueCert) {
            btnIssueCert.addEventListener("click", () => {
                issueModal.classList.remove("hidden");
            });
        }

        if (btnTemplates) {
            btnTemplates.addEventListener("click", () => {
                tabButtons.forEach(b => b.classList.remove("active"));
                const templateTab = Array.from(tabButtons).find(b => b.dataset.tab === "templates");
                if (templateTab) templateTab.classList.add("active");
                currentTab = "templates";
                renderTable();
                if (certTemplatesView) {
                    certTemplatesView.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }

        // Upload Template Modal Triggers
        const openUploadModal = () => {
            uploadTemplateModal.classList.remove("hidden");
        };

        if (btnUploadTemplateHeader) btnUploadTemplateHeader.addEventListener("click", openUploadModal);
        if (btnUploadTemplateGrid) btnUploadTemplateGrid.addEventListener("click", openUploadModal);

        if (closeIssueModal) closeIssueModal.addEventListener("click", () => issueModal.classList.add("hidden"));
        if (cancelIssueModal) cancelIssueModal.addEventListener("click", () => issueModal.classList.add("hidden"));
        const btnDownloadCertImage = document.getElementById("btnDownloadCertImage");
        if (btnDownloadCertImage) {
            btnDownloadCertImage.addEventListener("click", async () => {
                const certPaper = document.getElementById("certPrintArea");
                if (!certPaper) return;

                showToast("Generating high-resolution certificate image...", "info");

                try {
                    if (typeof html2canvas !== "undefined") {
                        const canvas = await html2canvas(certPaper, {
                            scale: 2.5,
                            useCORS: true,
                            allowTaint: true,
                            backgroundColor: null,
                            logging: false
                        });

                        const imageUrl = canvas.toDataURL("image/png");
                        const link = document.createElement("a");
                        const recipient = previewStudentName ? previewStudentName.innerText.replace(/\s+/g, "_") : "Student";
                        link.download = `Certificate_${recipient}.png`;
                        link.href = imageUrl;
                        link.click();
                        showToast("Certificate image downloaded successfully!", "success");
                    } else {
                        window.print();
                    }
                } catch (err) {
                    console.error("Error generating certificate image:", err);
                    showToast("Could not generate image. Triggering print fallback...", "error");
                    window.print();
                }
            });
        }

        if (btnPrintCert) {
            btnPrintCert.addEventListener("click", () => {
                const bgImg = document.getElementById("previewCertBgImg");
                if (bgImg && bgImg.getAttribute("src")) {
                    bgImg.style.display = "block";
                    bgImg.style.visibility = "visible";
                }
                showToast("Opening full-color print / PDF dialog...", "info");
                setTimeout(() => {
                    window.print();
                }, 150);
            });
        }

        if (closePreviewModal) closePreviewModal.addEventListener("click", () => previewModal.classList.add("hidden"));
        if (closePreviewFooter) closePreviewFooter.addEventListener("click", () => previewModal.classList.add("hidden"));

        if (closeEditorModal) closeEditorModal.addEventListener("click", () => templateEditorModal.classList.add("hidden"));
        if (cancelEditorModal) cancelEditorModal.addEventListener("click", () => templateEditorModal.classList.add("hidden"));
        if (btnSaveEditorTemplate) btnSaveEditorTemplate.addEventListener("click", saveTemplateChanges);
        if (btnSaveEditorFooter) btnSaveEditorFooter.addEventListener("click", saveTemplateChanges);

        if (closeUploadModal) closeUploadModal.addEventListener("click", () => uploadTemplateModal.classList.add("hidden"));
        if (cancelUploadModal) cancelUploadModal.addEventListener("click", () => uploadTemplateModal.classList.add("hidden"));

        // Live Editor Inputs Event Binding
        const editorInputs = [
            editTemplateName, editInstitutionName, editSubHeading, editPresentationText,
            editSampleRecipient, editCourseTitle, editCitationText, editSignatoryName,
            editSignatoryRole, editSignatory2Name, editSignatory2Role, editThemeColor, editSealType,
            editFontStyle, editFontSize, editLogoIcon, editPrimaryTextColor, editTitleTextColor, editEnableDragMode,
            toggleShowLogo, toggleShowInstitution, toggleShowSubheading, toggleShowPresents,
            toggleShowStudent, toggleShowTitle, toggleShowCitation, toggleShowSignature,
            toggleShowSeal, toggleShowQR
        ];

        editorInputs.forEach(input => {
            if (input) {
                input.addEventListener("input", updateLiveEditorPreview);
                input.addEventListener("change", updateLiveEditorPreview);
            }
        });

        // Background Upload inside Live Editor
        if (editorBgFileInput) {
            editorBgFileInput.addEventListener("change", async (e) => {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");
                    try {
                        if (isPdf) {
                            showToast("Converting PDF page 1 for canvas background...", "info");
                            editorCustomBgUrl = await renderPdfToDataUrl(file);
                        } else {
                            editorCustomBgUrl = await new Promise((res, rej) => {
                                const r = new FileReader();
                                r.onload = ev => res(ev.target.result);
                                r.onerror = rej;
                                r.readAsDataURL(file);
                            });
                        }
                        updateLiveEditorPreview();
                        showToast("Template background updated!", "success");
                    } catch(err) {
                        console.error(err);
                        showToast("Failed to load background file.", "error");
                    }
                }
            });
        }

        // Reset Element Positions Button
        if (btnResetElementPositions) {
            btnResetElementPositions.addEventListener("click", () => {
                const currentTmplId = editTemplateId.value;
                const tmpl = templateData.find(t => t.id === currentTmplId);
                if (tmpl) {
                    tmpl.elementPositions = {};
                    const canvasElems = document.querySelectorAll("#editorCertPaper .canvas-element");
                    canvasElems.forEach(el => el.style.transform = "none");
                    showToast("Canvas element positions reset to default.", "info");
                }
            });
        }

        // Custom Logo File Reader in Editor
        if (logoFileInput) {
            logoFileInput.addEventListener("change", (e) => {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        editorUploadedLogoUrl = evt.target.result;
                        updateLiveEditorPreview();
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
        }

        // File Drag & Drop + Browse logic for Upload Template Modal
        if (uploadDropzone) {
            uploadDropzone.addEventListener("click", () => templateFileInput.click());
            uploadDropzone.addEventListener("dragover", (e) => {
                e.preventDefault();
                uploadDropzone.style.borderColor = "#818cf8";
            });
            uploadDropzone.addEventListener("dragleave", () => {
                uploadDropzone.style.borderColor = "var(--primary-accent)";
            });
            uploadDropzone.addEventListener("drop", (e) => {
                e.preventDefault();
                uploadDropzone.style.borderColor = "var(--primary-accent)";
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleUploadedFile(e.dataTransfer.files[0]);
                }
            });
        }

        if (btnBrowseTemplate) {
            btnBrowseTemplate.addEventListener("click", (e) => {
                e.stopPropagation();
                templateFileInput.click();
            });
        }

        if (templateFileInput) {
            templateFileInput.addEventListener("change", (e) => {
                if (e.target.files && e.target.files[0]) {
                    handleUploadedFile(e.target.files[0]);
                }
            });
        }

        if (btnRemoveUploadedFile) {
            btnRemoveUploadedFile.addEventListener("click", () => {
                uploadedFileDataUrl = null;
                uploadFilePreviewBox.classList.add("hidden");
                uploadDropzone.classList.remove("hidden");
                templateFileInput.value = "";
            });
        }

        // Process uploaded template file (Image, SVG, or PDF)
        async function handleUploadedFile(file) {
            const isImage = file.type.startsWith("image/") || file.name.endsWith(".svg");
            const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");

            if (!isImage && !isPdf) {
                showToast("Please upload an image, SVG, or PDF template file.", "error");
                return;
            }

            try {
                if (isPdf) {
                    showToast("Converting PDF page 1 into background template...", "info");
                    uploadedFileDataUrl = await renderPdfToDataUrl(file);
                } else {
                    uploadedFileDataUrl = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                }

                uploadedImageDisplay.src = uploadedFileDataUrl;
                uploadedFileName.innerText = file.name;
                uploadedFileSize.innerText = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

                uploadDropzone.classList.add("hidden");
                uploadFilePreviewBox.classList.remove("hidden");

                const nameInput = document.getElementById("uploadTemplateName");
                if (nameInput && !nameInput.value) {
                    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                    nameInput.value = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
                }
            } catch (err) {
                console.error("Failed to process uploaded file:", err);
                showToast("Could not render uploaded PDF/Image file. Please try another.", "error");
            }
        }

        // Submit Upload Template Form
        if (uploadTemplateForm) {
            uploadTemplateForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const name = document.getElementById("uploadTemplateName").value;
                const eventVal = document.getElementById("uploadEventSelect").value;
                const eventSelectNode = document.getElementById("uploadEventSelect");
                const eventNameText = eventSelectNode.options[eventSelectNode.selectedIndex].text;
                const category = document.getElementById("uploadCategorySelect").value;
                const badge = document.getElementById("uploadBadgeText").value || "Custom Uploaded";
                const desc = document.getElementById("uploadDescription").value;

                const newTmpl = {
                    id: `TMPL-CUSTOM-${Date.now().toString().slice(-4)}`,
                    name: name,
                    event: eventVal,
                    eventName: eventNameText,
                    category: category,
                    badge: badge,
                    borderTheme: "gold",
                    fontStyle: "cinzel-script",
                    fontSize: "normal",
                    logoIcon: "fa-award",
                    customLogoImg: null,
                    institutionName: "UNIFYED INSTITUTE OF TECHNOLOGY",
                    subHeading: "OFFICIAL CREDENTIAL",
                    presentationText: "This certificate is awarded to",
                    sampleRecipient: "Student Recipient",
                    title: name.toUpperCase(),
                    citation: desc || `Custom uploaded template for ${eventNameText}.`,
                    signatoryName: "Dr. Sarah Jenkins",
                    signatoryRole: "Faculty Convener",
                    signatory2Name: "",
                    signatory2Role: "",
                    sealType: "gold-medal",
                    desc: desc || `Uploaded custom template background for ${eventNameText}.`,
                    customImage: uploadedFileDataUrl,
                    customColors: { primary: "#0f172a", title: "#1e1b4b" },
                    hiddenElements: {
                        logo: true,
                        institution: true,
                        subheading: true,
                        presents: true,
                        student: false,
                        title: true,
                        citation: true,
                        signature: true,
                        seal: true,
                        qr: false
                    }
                };

                templateData.unshift(newTmpl);
                saveStateToStorage();

                uploadTemplateForm.reset();
                uploadedFileDataUrl = null;
                uploadFilePreviewBox.classList.add("hidden");
                uploadDropzone.classList.remove("hidden");
                uploadTemplateModal.classList.add("hidden");

                currentTab = "templates";
                tabButtons.forEach(b => b.classList.remove("active"));
                const templateTab = Array.from(tabButtons).find(b => b.dataset.tab === "templates");
                if (templateTab) templateTab.classList.add("active");

                renderTable();
                renderTemplates();

                showToast(`Custom Template "${name}" added to library successfully!`, "success");
            });
        }

        // Confirm Approve from Modal
        if (btnConfirmApproveModal) {
            btnConfirmApproveModal.addEventListener("click", () => {
                if (activePreviewItem) {
                    approveCertificate(activePreviewItem.id);
                    previewModal.classList.add("hidden");
                }
            });
        }

        // Print / Download Certificate
        if (btnPrintCert) {
            btnPrintCert.addEventListener("click", () => {
                window.print();
            });
        }

        // Issue Certificate Form Submit
        if (issueCertForm) {
            issueCertForm.addEventListener("submit", (e) => {
                e.preventDefault();
                
                const studentVal = document.getElementById("modalStudentSelect").value;
                const certType = document.getElementById("modalCertType").value;
                const certTitle = document.getElementById("modalCertTitle").value;
                const grade = document.getElementById("modalGrade").value;
                const citation = document.getElementById("modalCitation").value;
                const issueDate = document.getElementById("modalIssueDate").value;

                if (!studentVal || !certTitle) {
                    showToast("Please fill in required fields.", "error");
                    return;
                }

                const [rollNo, name, batch] = studentVal.split("|");
                const newId = `CERT-REQ-${Date.now().toString().slice(-4)}`;
                const newUUID = `UNIFY-CERT-${Math.floor(100000 + Math.random() * 900000)}`;

                const typeLabels = {
                    academic: "Academic Excellence",
                    project: "Project Completion",
                    course: "Course Mastery",
                    workshop: "Workshop Mastery",
                    sports: "Sports & Co-curricular",
                    internship: "Internship Recommendation",
                    bonafide: "Conduct & Bonafide"
                };

                const newCert = {
                    id: newId,
                    uuid: newUUID,
                    studentName: name || "Student",
                    rollNo: rollNo || "CS-2024-099",
                    batch: batch || "CS-4A",
                    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
                    title: certTitle,
                    category: certType,
                    categoryLabel: typeLabels[certType] || "General Certificate",
                    grade: grade || "Standard Distinction",
                    citation: citation || `Issued for exemplary effort in ${certTitle}.`,
                    requestDate: issueDate || "Today",
                    status: "issued",
                    event: "convocation-2026",
                    tmplId: "TMPL-GOLD-101"
                };

                certificateData.unshift(newCert);
                saveStateToStorage();
                updateStats();
                
                currentTab = "issued";
                tabButtons.forEach(b => b.classList.remove("active"));
                const issuedTabBtn = Array.from(tabButtons).find(b => b.dataset.tab === "issued");
                if (issuedTabBtn) issuedTabBtn.classList.add("active");

                renderTable();
                issueModal.classList.add("hidden");
                issueCertForm.reset();

                showToast(`Successfully issued digital certificate for ${name}!`, "success");
            });
        }
    }

    // Helper Toast System
    function showToast(message, type = "info") {
        const toastContainer = document.getElementById("toastContainer");
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast-item toast-${type}`;
        toast.style.cssText = `
            background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
            color: #ffffff;
            padding: 12px 18px;
            border-radius: 10px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            margin-top: 10px;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: fadeIn 0.3s ease;
        `;
        toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-info-circle'}"></i> ${message}`;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Execute init
    init();
});
