/**
 * UnifyEd Faculty Portal - College Events Interactivity Engine
 */

// Initial Campus Events Dataset
let eventsBank = [
    {
        id: 1,
        title: "Smart India Hackathon (SIH) 2026 - Internal Round",
        category: "hackathon",
        categoryLabel: "Flagship Hackathon",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
        dateTime: "Aug 24-25, 2026 • 09:00 AM",
        venue: "Main Innovation Lab & Auditorium A",
        capacity: "350 Students",
        registeredCount: 320,
        isRegistered: true,
        organizer: "Dr. Rajesh Kumar (CSE)",
        description: "National 36-hour non-stop hackathon selection round. Prize pool ₹1,50,000 & direct nomination for Grand Finale at IIT Delhi."
    },
    {
        id: 2,
        title: "Generative AI & LLM Architecture Bootcamp",
        category: "workshop",
        categoryLabel: "Faculty & Student Workshop",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
        dateTime: "Aug 28, 2026 • 10:30 AM",
        venue: "Seminar Hall 2, Tech Block",
        capacity: "150 Seats",
        registeredCount: 142,
        isRegistered: false,
        organizer: "AI & Data Science Cell",
        description: "Hands-on masterclass building custom RAG pipelines, fine-tuning open-weight models, and deploying AI agents."
    },
    {
        id: 3,
        title: "UnifyFest 2026 - Annual Cultural & Music Gala",
        category: "cultural",
        categoryLabel: "Cultural & Music Fest",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
        dateTime: "Sep 05, 2026 • 05:00 PM",
        venue: "Open Air Stadium Campus Grounds",
        capacity: "2,500 Attendees",
        registeredCount: 1980,
        isRegistered: true,
        organizer: "Student Cultural Council",
        description: "The biggest annual campus fest featuring celebrity live music concerts, battle of bands, dance faceoffs & food stalls."
    },
    {
        id: 4,
        title: "National Autonomous Robotics Championship",
        category: "hackathon",
        categoryLabel: "Robotics Competition",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
        dateTime: "Sep 12, 2026 • 09:30 AM",
        venue: "Indoor Sports Complex & Arena",
        capacity: "200 Teams",
        registeredCount: 165,
        isRegistered: false,
        organizer: "Robotics & Automation Society",
        description: "Autonomous maze solver bots, drone obstacle races, and RoboWars combat challenge with live broadcasting."
    },
    {
        id: 5,
        title: "Cyber Security & Ethical Hacking Symposium",
        category: "workshop",
        categoryLabel: "Academic Symposium",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
        dateTime: "Sep 18, 2026 • 11:00 AM",
        venue: "Auditorium B, CS Block",
        capacity: "300 Seats",
        registeredCount: 210,
        isRegistered: false,
        organizer: "Cyber Defence Forum",
        description: "Live capture-the-flag (CTF) security contest, penetration testing drills, & industry expert sessions from CERT-In."
    }
];

const EVENTS_STORAGE_KEY = "unifyed_campus_events";

function loadStateFromStorage() {
    const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                eventsBank = parsed;
            }
        } catch (e) {
            console.error("Failed to parse stored events", e);
        }
    }
}

function saveStateToStorage() {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(eventsBank));
}

let activeEventsFilter = "all";
let eventsSearchQuery = "";
let currentEventsViewMode = "grid"; // 'grid' or 'table'

document.addEventListener('DOMContentLoaded', () => {
    loadStateFromStorage();
    renderEventsShowcase();
    setupEventsEventListeners();
});

function setupEventsEventListeners() {
    // Search Input Filter
    const searchInput = document.getElementById('eventsSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            eventsSearchQuery = e.target.value.toLowerCase().trim();
            renderEventsShowcase();
        });
    }

    // Status Filter Chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeEventsFilter = chip.getAttribute('data-filter');
            renderEventsShowcase();
        });
    });

    // Global Backdrop Click Dismissal
    document.addEventListener('click', (e) => {
        const createModal = document.getElementById('createEventModal');
        if (createModal && createModal.classList.contains('active') && e.target === createModal) {
            closeCreateEventModal();
        }

        const detailsModal = document.getElementById('eventDetailsModal');
        if (detailsModal && detailsModal.classList.contains('active') && e.target === detailsModal) {
            closeEventDetailsModal();
        }
    });
}

function switchEventsRosterView(mode) {
    currentEventsViewMode = mode;
    const btnGrid = document.getElementById('eventsViewGridBtn');
    const btnTable = document.getElementById('eventsViewTableBtn');

    if (mode === 'grid') {
        if (btnGrid) btnGrid.classList.add('active');
        if (btnTable) btnTable.classList.remove('active');
        document.getElementById('eventsGridView').style.display = 'grid';
        document.getElementById('eventsTableView').style.display = 'none';
    } else {
        if (btnTable) btnTable.classList.add('active');
        if (btnGrid) btnGrid.classList.remove('active');
        document.getElementById('eventsGridView').style.display = 'none';
        document.getElementById('eventsTableView').style.display = 'block';
    }

    renderEventsShowcase();
}

// Render Master Events Cards Grid & Table View
function renderEventsShowcase() {
    const gridContainer = document.getElementById('eventsGridView');
    const tbody = document.getElementById('eventsReportTableBody');
    if (!gridContainer || !tbody) return;

    let filtered = eventsBank.filter(s => {
        let matchFilter = true;
        if (activeEventsFilter === 'hackathon') matchFilter = s.category === 'hackathon';
        if (activeEventsFilter === 'workshop') matchFilter = s.category === 'workshop';
        if (activeEventsFilter === 'cultural') matchFilter = s.category === 'cultural';
        if (activeEventsFilter === 'my_rsvp') matchFilter = s.isRegistered === true;

        const matchSearch = eventsSearchQuery === '' || 
                            s.title.toLowerCase().includes(eventsSearchQuery) ||
                            s.venue.toLowerCase().includes(eventsSearchQuery) ||
                            s.categoryLabel.toLowerCase().includes(eventsSearchQuery) ||
                            s.organizer.toLowerCase().includes(eventsSearchQuery);

        return matchFilter && matchSearch;
    });

    updateEventsKpis(filtered);

    if (filtered.length === 0) {
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">
                <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:8px; display:block;"></i>
                No campus events match your query.
            </div>
        `;
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px; color:var(--text-tertiary);">
                    No campus events match your query.
                </td>
            </tr>
        `;
        return;
    }

    // Render Cards Grid View
    gridContainer.innerHTML = filtered.map(s => {
        const capacityNum = parseInt(s.capacity) || 100;
        const fillPercent = Math.min(100, Math.round((s.registeredCount / capacityNum) * 100));
        return `
            <div class="event-card">
                <div class="event-card-top-content">
                    <div class="event-card-img-wrapper">
                        <img src="${s.image}" class="event-card-img" alt="${s.title}">
                        <span class="event-category-badge">${s.categoryLabel}</span>
                    </div>

                    <div class="event-card-body">
                        <h4 class="event-card-title">${s.title}</h4>
                        <div class="event-card-meta">
                            <span class="event-meta-item">
                                <i class="fa-solid fa-calendar-day" style="color:var(--primary);"></i> ${s.dateTime}
                            </span>
                            <span class="event-meta-item">
                                <i class="fa-solid fa-location-dot" style="color:#ef4444;"></i> ${s.venue}
                            </span>
                            <span class="event-meta-item">
                                <i class="fa-solid fa-user-check" style="color:#10b981;"></i> ${s.registeredCount} / ${s.capacity} RSVPs
                            </span>
                        </div>

                        <div class="event-progress-wrapper">
                            <div class="event-progress-bar">
                                <div class="event-progress-fill" style="width: ${fillPercent}%;"></div>
                            </div>
                            <span class="event-progress-text">${fillPercent}% Seats Filled</span>
                        </div>

                        <p class="event-card-desc">
                            ${s.description}
                        </p>
                    </div>
                </div>

                <div class="event-card-footer">
                    <button onclick="viewEventDetails(${s.id})" class="btn btn-secondary btn-sm">
                        <i class="fa-solid fa-circle-info"></i> Details
                    </button>
                    <button onclick="registerForEvent(${s.id})" class="btn btn-primary btn-sm" style="${s.isRegistered ? 'background:#10b981; color:#fff;' : ''}">
                        <i class="fa-solid ${s.isRegistered ? 'fa-circle-check' : 'fa-ticket'}"></i> ${s.isRegistered ? 'RSVP Confirmed ✓' : 'RSVP Spot'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Render Table Calendar View
    tbody.innerHTML = filtered.map(s => {
        return `
            <tr>
                <td>
                    <strong style="font-size:14px; color:var(--text-primary); display:block;">${s.title}</strong>
                    <span style="font-size:11px; color:var(--text-tertiary);">${s.categoryLabel} • ${s.organizer}</span>
                </td>
                <td>
                    <span style="font-size:12px; color:var(--text-secondary);">${s.dateTime}</span>
                </td>
                <td>
                    <span style="font-size:12px; color:var(--text-secondary);"><i class="fa-solid fa-location-dot" style="color:#ef4444; margin-right:4px;"></i> ${s.venue}</span>
                </td>
                <td>
                    <strong style="font-size:12px; color:var(--primary);">${s.registeredCount} / ${s.capacity}</strong>
                </td>
                <td>
                    <div class="table-action-btns">
                        <button onclick="viewEventDetails(${s.id})" class="btn btn-secondary btn-sm">
                            <i class="fa-solid fa-circle-info"></i> Details
                        </button>
                        <button onclick="registerForEvent(${s.id})" class="btn btn-primary btn-sm" style="${s.isRegistered ? 'background:#10b981; color:#fff;' : ''}">
                            <i class="fa-solid ${s.isRegistered ? 'fa-circle-check' : 'fa-ticket'}"></i> ${s.isRegistered ? 'RSVP Done' : 'RSVP'}
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateEventsKpis(list) {
    const kpiCount = document.getElementById('kpiUpcomingCount');
    const kpiRsvp = document.getElementById('kpiRsvpCount');

    if (kpiCount) kpiCount.innerText = list.length;
    if (kpiRsvp && list.length > 0) {
        const sum = list.reduce((acc, curr) => acc + curr.registeredCount, 0);
        kpiRsvp.innerText = sum.toLocaleString();
    }
}

// RSVP Spot Toggle
function registerForEvent(id) {
    const s = eventsBank.find(item => item.id === id);
    if (!s) return;

    s.isRegistered = !s.isRegistered;
    if (s.isRegistered) {
        s.registeredCount += 1;
        showToast(`🎉 RSVP Confirmed! Entry Pass issued for ${s.title}`);
    } else {
        s.registeredCount = Math.max(0, s.registeredCount - 1);
        showToast(`RSVP cancelled for ${s.title}`);
    }

    saveStateToStorage();

    // Update Spotlight button if SIH 2026 (id=1)
    const spotBtn = document.getElementById('spotlightRsvpBtn');
    if (spotBtn) {
        const sihEvent = eventsBank.find(item => item.id === 1);
        if (sihEvent) {
            spotBtn.style.background = sihEvent.isRegistered ? '#10b981' : 'var(--primary)';
            spotBtn.innerHTML = `<i class="fa-solid ${sihEvent.isRegistered ? 'fa-circle-check' : 'fa-ticket'}"></i> ${sihEvent.isRegistered ? 'RSVP Confirmed ✅' : 'RSVP / Register Now'}`;
        }
    }

    renderEventsShowcase();
}

function toggleModalRsvp() {
    if (currentModalEventId) {
        registerForEvent(currentModalEventId);
        viewEventDetails(currentModalEventId);
    }
}

function filterMyRegisteredEvents() {
    activeEventsFilter = "my_rsvp";
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(c => c.classList.remove('active'));
    renderEventsShowcase();
    showToast("Displaying events you have RSVP registered for.");
}

function downloadEventSchedulePdf() {
    showToast("📄 Exporting Complete Campus Event Schedule PDF...");
}

// Create Event Modal Handlers
function openCreateEventModal() {
    const modal = document.getElementById('createEventModal');
    if (modal) modal.classList.add('active');
}

function closeCreateEventModal() {
    const modal = document.getElementById('createEventModal');
    if (modal) modal.classList.remove('active');
}

function submitNewEvent(e) {
    e.preventDefault();
    const title = document.getElementById('newEventTitle').value;
    const category = document.getElementById('newEventCategory').value;
    const dateTime = document.getElementById('newEventDateTime').value;
    const venue = document.getElementById('newEventVenue').value;
    const capacity = document.getElementById('newEventCapacity').value;
    const description = document.getElementById('newEventDescription').value;

    const newObj = {
        id: eventsBank.length + 1,
        title: title,
        category: category,
        categoryLabel: category === 'hackathon' ? 'Flagship Hackathon' : (category === 'workshop' ? 'Workshop' : 'Cultural Event'),
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
        dateTime: dateTime,
        venue: venue,
        capacity: `${capacity} Seats`,
        registeredCount: 1,
        isRegistered: true,
        organizer: "Dr. Rajesh Kumar (Faculty Host)",
        description: description
    };

    eventsBank.unshift(newObj);
    saveStateToStorage();
    renderEventsShowcase();
    closeCreateEventModal();
    showToast(`🎉 New Campus Event published: ${title}!`);
}

// Event Details Inspector Modal Handlers
let currentModalEventId = null;

function viewEventDetails(id) {
    const s = eventsBank.find(item => item.id === id);
    if (!s) return;

    currentModalEventId = id;
    const titleEl = document.getElementById('modalEventTitle');
    const catVenEl = document.getElementById('modalEventCategoryVenue');
    const dateEl = document.getElementById('modalEventDateTime');
    const rsvpEl = document.getElementById('modalEventRsvpStatus');
    const descEl = document.getElementById('modalEventDesc');
    const toggleBtn = document.getElementById('modalToggleRsvpBtn');

    if (titleEl) titleEl.innerText = s.title;
    if (catVenEl) catVenEl.innerText = `${s.categoryLabel} • ${s.venue}`;
    if (dateEl) dateEl.innerText = s.dateTime;
    if (rsvpEl) rsvpEl.innerText = s.isRegistered ? "RSVP Confirmed ✅" : "Not Registered";
    if (descEl) descEl.innerText = s.description;

    if (toggleBtn) {
        toggleBtn.style.background = s.isRegistered ? '#10b981' : 'var(--primary)';
        toggleBtn.innerHTML = `<i class="fa-solid ${s.isRegistered ? 'fa-circle-check' : 'fa-ticket'}"></i> ${s.isRegistered ? 'RSVP Confirmed ✓' : 'Register / RSVP Spot'}`;
    }

    const modal = document.getElementById('eventDetailsModal');
    if (modal) modal.classList.add('active');
}

function closeEventDetailsModal() {
    const modal = document.getElementById('eventDetailsModal');
    if (modal) modal.classList.remove('active');
}

function downloadEntryPass() {
    if (currentModalEventId) {
        const s = eventsBank.find(item => item.id === currentModalEventId);
        showToast(`📄 Downloading Official Entry Pass PDF for ${s ? s.title : 'Event'}...`);
    }
}

// Window scope exports for reliable HTML inline handlers
window.switchEventsRosterView = switchEventsRosterView;
window.registerForEvent = registerForEvent;
window.toggleModalRsvp = toggleModalRsvp;
window.filterMyRegisteredEvents = filterMyRegisteredEvents;
window.downloadEventSchedulePdf = downloadEventSchedulePdf;
window.openCreateEventModal = openCreateEventModal;
window.closeCreateEventModal = closeCreateEventModal;
window.submitNewEvent = submitNewEvent;
window.viewEventDetails = viewEventDetails;
window.closeEventDetailsModal = closeEventDetailsModal;
window.downloadEntryPass = downloadEntryPass;

// Toast Notification Helper
function showToast(message) {
    let toast = document.getElementById('liveToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'liveToast';
        toast.className = 'custom-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
