/**
 * UnifyEd Faculty Portal - Research & Patents Interactivity Engine
 */

let researchBank = [
    {
        id: 1,
        title: "Deep Quantum Neural Networks for Real-Time Edge Processing in 6G Networks",
        category: "journal",
        typeLabel: "IEEE Transactions Q1",
        venue: "IEEE Transactions on Neural Networks and Learning Systems",
        year: "2026",
        doiAppNo: "DOI: 10.1109/TNNLS.2026.3104821",
        citations: 94,
        status: "Published & Indexed",
        authors: "Dr. Rajesh Kumar, Prof. Alan Turing, Dr. Sarah Jenkins",
        description: "Novel hybrid quantum-classical neural network architecture operating at sub-millisecond latency for next-gen edge IoT nodes."
    },
    {
        id: 2,
        title: "System and Method for Autonomous Quantum Cryptographic Key Distribution in Decentralized Mesh Grids",
        category: "patent",
        typeLabel: "Govt Patent Filed",
        venue: "Indian Patent Office (IPO New Delhi)",
        year: "2026",
        doiAppNo: "Patent App: IN-202611094812",
        citations: 0,
        status: "Published & Under FERC Exam",
        authors: "Dr. Rajesh Kumar, Dept of CSE",
        description: "Tamper-evident quantum key exchange protocol using entangling photon emitters for power-grid infrastructure protection."
    },
    {
        id: 3,
        title: "Large Language Model Micro-Architectures for Privacy-Preserving Clinical EHR Synthesis",
        category: "journal",
        typeLabel: "Nature AI / Scopus",
        venue: "Nature Machine Intelligence & Health AI",
        year: "2025",
        doiAppNo: "DOI: 10.1038/s42256-025-00812-z",
        citations: 142,
        status: "Published & High Impact",
        authors: "Dr. Rajesh Kumar, Dr. Estelle Darcy",
        description: "Zero-knowledge differential privacy layer for transformer LLMs generating synthetic medical records for research labs."
    },
    {
        id: 4,
        title: "AI-Powered Smart Micro-Grid Load Balancing System Using Decentralized Reinforcement Learning",
        category: "grant",
        typeLabel: "DST-SERB Grant",
        venue: "Department of Science & Technology (Govt of India)",
        year: "2025-2028",
        doiAppNo: "Grant Sanction: DST/SERB/CRG/2025/00142",
        citations: 18,
        status: "₹25.0 Lakhs Approved",
        authors: "Principal Investigator: Dr. Rajesh Kumar",
        description: "Multi-agent Q-learning framework deployed on 50+ solar micro-grids across rural Rajasthan for peak load optimization."
    },
    {
        id: 5,
        title: "Self-Healing Smart Sensor Nodes for Disaster Response & Seismic Monitoring",
        category: "patent",
        typeLabel: "Govt Patent Granted",
        venue: "Controller General of Patents & IP India",
        year: "2024",
        doiAppNo: "Patent No: IN-481920",
        citations: 34,
        status: "Granted & Commercialized",
        authors: "Dr. Rajesh Kumar, Robotics Cell",
        description: "Ruggedized wireless sensor node mesh capable of self-rerouting mesh topologies during landslide and flood events."
    }
];

const RESEARCH_STORAGE_KEY = "unifyed_faculty_research";

function loadStateFromStorage() {
    const stored = localStorage.getItem(RESEARCH_STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                researchBank = parsed;
            }
        } catch (e) {
            console.error("Failed to parse stored research", e);
        }
    }
}

function saveStateToStorage() {
    localStorage.setItem(RESEARCH_STORAGE_KEY, JSON.stringify(researchBank));
}

let activeResearchFilter = "all";
let researchSearchQuery = "";
let currentResearchViewMode = "grid";

document.addEventListener('DOMContentLoaded', () => {
    loadStateFromStorage();
    renderResearchShowcase();
    setupResearchEventListeners();
});

function setupResearchEventListeners() {
    const searchInput = document.getElementById('researchSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            researchSearchQuery = e.target.value.toLowerCase().trim();
            renderResearchShowcase();
        });
    }

    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeResearchFilter = chip.getAttribute('data-filter');
            renderResearchShowcase();
        });
    });

    document.addEventListener('click', (e) => {
        const pubModal = document.getElementById('pubModal');
        if (pubModal && pubModal.classList.contains('active') && e.target === pubModal) {
            closeSubmitPubModal();
        }

        const patentModal = document.getElementById('patentModal');
        if (patentModal && patentModal.classList.contains('active') && e.target === patentModal) {
            closeFilePatentModal();
        }
    });
}

function switchResearchView(mode) {
    currentResearchViewMode = mode;
    const btnGrid = document.getElementById('resViewGridBtn');
    const btnTable = document.getElementById('resViewTableBtn');

    if (mode === 'grid') {
        if (btnGrid) btnGrid.classList.add('active');
        if (btnTable) btnTable.classList.remove('active');
        document.getElementById('researchGridView').style.display = 'grid';
        document.getElementById('researchTableView').style.display = 'none';
    } else {
        if (btnTable) btnTable.classList.add('active');
        if (btnGrid) btnGrid.classList.remove('active');
        document.getElementById('researchGridView').style.display = 'none';
        document.getElementById('researchTableView').style.display = 'block';
    }

    renderResearchShowcase();
}

function renderResearchShowcase() {
    const gridContainer = document.getElementById('researchGridView');
    const tbody = document.getElementById('researchTableBody');
    if (!gridContainer || !tbody) return;

    let filtered = researchBank.filter(s => {
        let matchFilter = true;
        if (activeResearchFilter === 'journal') matchFilter = s.category === 'journal';
        if (activeResearchFilter === 'patent') matchFilter = s.category === 'patent';
        if (activeResearchFilter === 'grant') matchFilter = s.category === 'grant';

        const matchSearch = researchSearchQuery === '' || 
                            s.title.toLowerCase().includes(researchSearchQuery) ||
                            s.venue.toLowerCase().includes(researchSearchQuery) ||
                            s.doiAppNo.toLowerCase().includes(researchSearchQuery) ||
                            s.authors.toLowerCase().includes(researchSearchQuery);

        return matchFilter && matchSearch;
    });

    updateResearchKpis(filtered);

    if (filtered.length === 0) {
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-tertiary);">
                <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:8px; display:block;"></i>
                No publications or patent records match your search.
            </div>
        `;
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:40px; color:var(--text-tertiary);">
                    No publications or patent records match your search.
                </td>
            </tr>
        `;
        return;
    }

    // Render Grid Cards View (Equal Height Cards)
    gridContainer.innerHTML = filtered.map(s => {
        return `
            <div class="research-item-card">
                <div class="research-item-top">
                    <div class="research-badge-header">
                        <span class="res-type-badge ${s.category}">${s.typeLabel}</span>
                        <span style="font-size:11px; font-weight:700; color:var(--text-tertiary);">${s.year}</span>
                    </div>

                    <h4 class="research-item-title">${s.title}</h4>

                    <div class="research-item-meta">
                        <span><i class="fa-solid fa-building-columns" style="color:var(--primary); margin-right:4px;"></i> ${s.venue}</span>
                        <span><i class="fa-solid fa-barcode" style="color:#f59e0b; margin-right:4px;"></i> ${s.doiAppNo}</span>
                        <span><i class="fa-solid fa-user-pen" style="color:#10b981; margin-right:4px;"></i> ${s.authors}</span>
                    </div>

                    <p class="research-item-desc">${s.description}</p>
                </div>

                <div class="research-item-footer">
                    <span style="font-size:11.5px; font-weight:700; color:var(--primary); display:flex; align-items:center; gap:4px;">
                        <i class="fa-solid fa-quote-right" style="color:#f59e0b;"></i> ${s.citations} Citations
                    </span>
                    <button onclick="downloadPaperPdf('${s.title}')" class="btn btn-secondary btn-sm" style="font-size:11px; padding:0 12px; height:30px;">
                        <i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> View Paper
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Render Table View
    tbody.innerHTML = filtered.map(s => {
        return `
            <tr>
                <td>
                    <strong style="font-size:13.5px; color:var(--text-primary); display:block;">${s.title}</strong>
                    <span class="res-type-badge ${s.category}" style="font-size:9px; padding:2px 8px; margin-top:4px; display:inline-block;">${s.typeLabel}</span>
                </td>
                <td>
                    <span style="font-size:12px; color:var(--text-secondary);">${s.venue}</span>
                </td>
                <td>
                    <span style="font-size:12px; color:var(--text-secondary); display:block;">${s.year}</span>
                    <span style="font-size:10.5px; color:var(--text-tertiary);">${s.doiAppNo}</span>
                </td>
                <td>
                    <strong style="font-size:12px; color:var(--primary); display:block;">${s.status}</strong>
                    <span style="font-size:11px; color:#f59e0b;">${s.citations} Citations</span>
                </td>
                <td>
                    <button onclick="downloadPaperPdf('${s.title}')" class="btn btn-secondary btn-sm" style="font-size:11px; padding:0 10px; height:28px;">
                        <i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> PDF
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateResearchKpis(list) {
    const kpiPub = document.getElementById('kpiPubCount');
    const kpiPatent = document.getElementById('kpiPatentCount');
    const kpiCit = document.getElementById('kpiCitationCount');

    if (kpiPub) {
        const pubs = researchBank.filter(x => x.category === 'journal').length;
        kpiPub.innerText = pubs;
    }
    if (kpiPatent) {
        const patents = researchBank.filter(x => x.category === 'patent').length;
        kpiPatent.innerText = patents;
    }
    if (kpiCit) {
        const totalCit = researchBank.reduce((acc, curr) => acc + (curr.citations || 0), 0);
        kpiCit.innerText = totalCit.toLocaleString();
    }
}

// Modal Handlers
function openSubmitPubModal() {
    const modal = document.getElementById('pubModal');
    if (modal) modal.classList.add('active');
}

function closeSubmitPubModal() {
    const modal = document.getElementById('pubModal');
    if (modal) modal.classList.remove('active');
}

function submitNewPublication(e) {
    e.preventDefault();
    const title = document.getElementById('newPubTitle').value;
    const journal = document.getElementById('newPubJournal').value;
    const category = document.getElementById('newPubCategory').value;
    const year = document.getElementById('newPubYear').value;
    const doi = document.getElementById('newPubDoi').value;
    const abstractText = document.getElementById('newPubAbstract').value;

    const newObj = {
        id: researchBank.length + 1,
        title: title,
        category: category,
        typeLabel: category === 'journal' ? 'IEEE / Scopus Q1' : (category === 'conference' ? 'IEEE Conference' : 'Book Chapter'),
        venue: journal,
        year: year,
        doiAppNo: `DOI: ${doi}`,
        citations: 0,
        status: "Published & Indexed",
        authors: "Dr. Rajesh Kumar (Faculty Author)",
        description: abstractText
    };

    researchBank.unshift(newObj);
    saveStateToStorage();
    renderResearchShowcase();
    closeSubmitPubModal();
    showToast(`📄 New Publication Record added: ${title}!`);
}

function openFilePatentModal() {
    const modal = document.getElementById('patentModal');
    if (modal) modal.classList.add('active');
}

function closeFilePatentModal() {
    const modal = document.getElementById('patentModal');
    if (modal) modal.classList.remove('active');
}

function submitNewPatent(e) {
    e.preventDefault();
    const title = document.getElementById('newPatentTitle').value;
    const appNo = document.getElementById('newPatentAppNo').value;
    const status = document.getElementById('newPatentStatus').value;
    const desc = document.getElementById('newPatentDesc').value;

    const newObj = {
        id: researchBank.length + 1,
        title: title,
        category: "patent",
        typeLabel: `Govt Patent ${status}`,
        venue: "Controller General of Patents (IP India)",
        year: "2026",
        doiAppNo: `App No: ${appNo}`,
        citations: 0,
        status: status,
        authors: "Dr. Rajesh Kumar (Inventor)",
        description: desc
    };

    researchBank.unshift(newObj);
    saveStateToStorage();
    renderResearchShowcase();
    closeFilePatentModal();
    showToast(`💡 Patent Application Record saved: ${title}!`);
}

function downloadPaperPdf(title) {
    showToast(`📄 Downloading Research PDF for: ${title}`);
}

function exportResearchPortfolioPdf() {
    showToast("📄 Exporting Complete Research & Patent Portfolio PDF...");
}

// Exports for HTML inline handlers
window.switchResearchView = switchResearchView;
window.openSubmitPubModal = openSubmitPubModal;
window.closeSubmitPubModal = closeSubmitPubModal;
window.submitNewPublication = submitNewPublication;
window.openFilePatentModal = openFilePatentModal;
window.closeFilePatentModal = closeFilePatentModal;
window.submitNewPatent = submitNewPatent;
window.downloadPaperPdf = downloadPaperPdf;
window.exportResearchPortfolioPdf = exportResearchPortfolioPdf;

// Toast Helper
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