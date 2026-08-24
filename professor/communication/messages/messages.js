// ==========================================================================
// UNIFYED OFFICIAL NOTICES - INTERACTIVE APPLICATION LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Notice dataset details
    const noticeDetailsData = {
        exam_notice_1: {
            title: "Revised Autumn Semester Mid-Term Examination Schedule & Guidelines",
            ref: "REF: UEM/EXAM/2026/042",
            tag: "Examination",
            tagClass: "tag-exam",
            author: "Dean of Academics",
            date: "Aug 18, 2026",
            body: `All faculty members and students are hereby informed that the Autumn Semester mid-term examinations for academic session 2026-2027 will strictly commence from September 01, 2026.
            <br><br>
            <strong>Important Directives:</strong>
            <ul>
                <li>All examination sessions will be conducted in two slots: Morning (10:00 AM - 1:00 PM) and Afternoon (2:00 PM - 5:00 PM).</li>
                <li>Hall tickets will be verified electronically via student smart RFID cards at entry doors.</li>
                <li>No electronic gadgets or programmable calculators will be permitted inside examination centers.</li>
            </ul>
            Faculty invigilation rosters and room allocation diagrams have been uploaded to the faculty portal dashboard.`
        },
        urgent_notice_2: {
            title: "Mandatory Student ID Card Verification & Smart Campus Access",
            ref: "REF: UEM/REG/2026/108",
            tag: "Urgent Alert",
            tagClass: "tag-urgent",
            author: "Registrar Office",
            date: "Aug 17, 2026",
            body: `Effective August 25, 2026, automated turnstile biometric and RFID smart cards will be strictly enforced across all campus gates, research laboratories, and central library counters.
            <br><br>
            Students who have not yet updated their physical RFID smart cards are instructed to visit the Administrative Block (Counter 4) immediately between 9:00 AM and 4:00 PM.`
        },
        event_notice_3: {
            title: "Annual National Hackathon 2026 - Registration Open",
            ref: "REF: UEM/EVE/2026/019",
            tag: "College Event",
            tagClass: "tag-event",
            author: "Innovation Cell",
            date: "Aug 15, 2026",
            body: `UnifyEd Innovation Cell is thrilled to announce the internal qualifier round for the Annual Smart India Hackathon 2026.
            <br><br>
            <strong>Problem Statements Tracks:</strong>
            <ul>
                <li>AI & Generative LLMs in Healthcare</li>
                <li>Smart City IoT Automation</li>
                <li>Blockchain Secure Document Management</li>
            </ul>
            Winning teams receive seed grant funding up to ₹2.5 Lakhs and automatic entry into the National Finals.`
        },
        academic_notice_4: {
            title: "Submission of Elective Specialization Preference Forms for Sem 5",
            ref: "REF: UEM/ACAD/2026/077",
            tag: "Academic",
            tagClass: "tag-academic",
            author: "HOD Computer Applications",
            date: "Aug 14, 2026",
            body: `Students of BCA 3rd Semester are required to select their elective specialization track for the upcoming 5th semester. Options include:
            <br>1. Cloud Infrastructure & DevOps
            <br>2. Cyber Security & Ethical Hacking
            <br>3. Machine Learning & Data Science
            <br><br>
            Please submit the preference form via student ERP portal before August 30, 2026.`
        }
    };

    // Elements
    const searchInput = document.getElementById("searchNoticeInput");
    const chipBtns = document.querySelectorAll(".chip-btn");
    const noticesContainer = document.getElementById("noticesContainer");

    const viewNoticeModal = document.getElementById("viewNoticeModal");
    const closeViewModalBtn = document.getElementById("closeViewModalBtn");
    const modalTag = document.getElementById("modalTag");
    const modalRef = document.getElementById("modalRef");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");
    const modalDate = document.getElementById("modalDate");
    const modalBodyText = document.getElementById("modalBodyText");

    const publishNoticeBtn = document.getElementById("publishNoticeBtn");
    const publishNoticeModal = document.getElementById("publishNoticeModal");
    const closePublishModalBtn = document.getElementById("closePublishModalBtn");
    const cancelPublishBtn = document.getElementById("cancelPublishBtn");
    const publishNoticeForm = document.getElementById("publishNoticeForm");

    // 1. Chip Filter
    chipBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            chipBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            filterNotices();
        });
    });

    // 2. Search Input Filter
    if (searchInput) {
        searchInput.addEventListener("input", filterNotices);
    }

    function filterNotices() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const activeChip = document.querySelector(".chip-btn.active");
        const filterCategory = activeChip ? activeChip.getAttribute("data-filter") : "all";

        const noticeCards = noticesContainer.querySelectorAll(".notice-card");
        noticeCards.forEach(card => {
            const category = card.getAttribute("data-category");
            const title = card.querySelector(".notice-title").textContent.toLowerCase();
            const excerpt = card.querySelector(".notice-excerpt").textContent.toLowerCase();
            const ref = card.querySelector(".notice-ref") ? card.querySelector(".notice-ref").textContent.toLowerCase() : "";

            const matchesCategory = (filterCategory === "all" || category === filterCategory);
            const matchesQuery = !query || (title.includes(query) || excerpt.includes(query) || ref.includes(query));

            if (matchesCategory && matchesQuery) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // 3. Open View Notice Detail Modal
    window.openNoticeDetail = function(noticeId) {
        const data = noticeDetailsData[noticeId];
        if (!data) return;

        modalTag.textContent = data.tag;
        modalTag.className = `notice-tag ${data.tagClass}`;
        modalRef.textContent = data.ref;
        modalTitle.textContent = data.title;
        modalAuthor.textContent = data.author;
        modalDate.textContent = data.date;
        modalBodyText.innerHTML = data.body;

        viewNoticeModal.style.display = "flex";
    };

    if (closeViewModalBtn) {
        closeViewModalBtn.addEventListener("click", () => {
            viewNoticeModal.style.display = "none";
        });
    }

    // 4. Publish Notice Modal
    if (publishNoticeBtn && publishNoticeModal) {
        publishNoticeBtn.addEventListener("click", () => {
            publishNoticeModal.style.display = "flex";
        });

        if (closePublishModalBtn) {
            closePublishModalBtn.addEventListener("click", () => {
                publishNoticeModal.style.display = "none";
            });
        }

        if (cancelPublishBtn) {
            cancelPublishBtn.addEventListener("click", () => {
                publishNoticeModal.style.display = "none";
            });
        }

        if (publishNoticeForm) {
            publishNoticeForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const title = document.getElementById("newNoticeTitle").value.trim();
                const category = document.getElementById("newNoticeCategory").value;
                const body = document.getElementById("newNoticeBody").value.trim();

                let tagClass = "tag-academic";
                let tagText = "Academic";
                if (category === "urgent") { tagClass = "tag-urgent"; tagText = "Urgent Alert"; }
                else if (category === "exam") { tagClass = "tag-exam"; tagText = "Examination"; }
                else if (category === "event") { tagClass = "tag-event"; tagText = "College Event"; }

                const refNum = `REF: UEM/PUB/2026/${Math.floor(100 + Math.random() * 900)}`;

                const newCard = document.createElement("div");
                newCard.className = "notice-card glassmorphism";
                newCard.setAttribute("data-category", category);
                newCard.innerHTML = `
                    <div>
                        <div class="notice-card-header">
                            <span class="notice-tag ${tagClass}">${tagText}</span>
                            <span class="notice-ref">${refNum}</span>
                        </div>
                        <h3 class="notice-title">${title}</h3>
                        <p class="notice-excerpt">${body.substring(0, 160)}...</p>
                    </div>
                    <div class="notice-card-footer">
                        <div class="notice-author-info">
                            <i class="fa-solid fa-circle-user"></i>
                            <span>Dr. Rajesh Kumar • Just now</span>
                        </div>
                        <button class="btn-read-more">View Circular</button>
                    </div>
                `;

                // Add click listener
                const detailKey = "custom_" + Date.now();
                noticeDetailsData[detailKey] = {
                    title: title,
                    ref: refNum,
                    tag: tagText,
                    tagClass: tagClass,
                    author: "Dr. Rajesh Kumar",
                    date: "Just now",
                    body: body
                };

                newCard.querySelector(".btn-read-more").addEventListener("click", () => {
                    openNoticeDetail(detailKey);
                });

                noticesContainer.prepend(newCard);
                publishNoticeForm.reset();
                publishNoticeModal.style.display = "none";

                alert("🎉 Official Notice Broadcasted & Dispatched to Target Audience!");
            });
        }
    }

    // Close Modals on Overlay Click
    window.addEventListener("click", (e) => {
        if (e.target === viewNoticeModal) viewNoticeModal.style.display = "none";
        if (e.target === publishNoticeModal) publishNoticeModal.style.display = "none";
    });
});