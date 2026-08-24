
            // Global toast helper
            window.showToast = function(msg) {
                const toast = document.getElementById("toastNotification");
                const toastMsg = document.getElementById("toastMessage");
                if (toast && toastMsg) {
                    toastMsg.textContent = msg;
                    toast.style.display = "flex";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 4000);
                }
            };

            document.addEventListener("DOMContentLoaded", () => {
                const yearSelect = document.getElementById("yearSelect");
                const subjectSelect = document.getElementById("subjectSelect");
                const erpSubjectCredits = document.getElementById("erpSubjectCredits");
                const marksGridBody = document.getElementById("marksGridBody");
                
                // Subjects taught by professor sorted by Year
                const subjectsByYear = {
                    "1": [
                        { code: "CS-101", name: "Computer Programming", credits: 3 },
                        { code: "EC-102", name: "Digital Electronics", credits: 4 }
                    ],
                    "2": [
                        { code: "DBMS-301", name: "Database Management Systems", credits: 4 },
                        { code: "CS-302", name: "Data Structures & Algorithms", credits: 4 }
                    ],
                    "3": [
                        { code: "WT-591", name: "Web Technology Lab", credits: 3 },
                        { code: "CS-502", name: "Operating Systems", credits: 4 }
                    ],
                    "4": [
                        { code: "NN-702", name: "Neural Networks & Deep Learning", credits: 4 },
                        { code: "EC-791", name: "VLSI Design Lab", credits: 3 }
                    ]
                };

                // Students Lists categorized by Subject Taught (Class)
                const studentsBySubject = {
                    "CS-101": [
                        { name: "Rahul Verma", id: "CSE25001" },
                        { name: "Sneha Nair", id: "CSE25042" },
                        { name: "Kunal Sen", id: "BCA25011" },
                        { name: "Aman Gupta", id: "CSE25099" }
                    ],
                    "EC-102": [
                        { name: "Sneha Nair", id: "CSE25042" },
                        { name: "Kunal Sen", id: "BCA25011" },
                        { name: "Aarti Mehta", id: "ECE25088" },
                        { name: "Vicky Singh", id: "ECE25102" }
                    ],
                    "DBMS-301": [
                        { name: "Vikram Kumawat", id: "BCA23015" },
                        { name: "Priya Sharma", id: "CSE23099" },
                        { name: "Aditya Bose", id: "CSE23115" },
                        { name: "Neha Sen", id: "BCA23088" },
                        { name: "Amit Roy", id: "CSE23045" }
                    ],
                    "CS-302": [
                        { name: "Rohan Das", id: "CSE23002" },
                        { name: "Meera Patel", id: "CSE23055" },
                        { name: "Vikram Kumawat", id: "BCA23015" },
                        { name: "Priya Sharma", id: "CSE23099" }
                    ],
                    "WT-591": [
                        { name: "Deepak Joshi", id: "CSE22019" },
                        { name: "Riya Kapoor", id: "BCA22035" },
                        { name: "Tanmay Shah", id: "CSE22071" }
                    ],
                    "CS-502": [
                        { name: "Deepak Joshi", id: "CSE22019" },
                        { name: "Riya Kapoor", id: "BCA22035" },
                        { name: "Kabir Khan", id: "CSE22055" },
                        { name: "Pooja Rao", id: "CSE22102" }
                    ],
                    "NN-702": [
                        { name: "Harsh Vardhan", id: "CSE21004" },
                        { name: "Ananya Iyer", id: "CSE21088" },
                        { name: "Sameer Sen", id: "CSE21101" }
                    ],
                    "EC-791": [
                        { name: "Harsh Vardhan", id: "CSE21004" },
                        { name: "Ananya Iyer", id: "CSE21088" },
                        { name: "Divya Teja", id: "ECE21088" }
                    ]
                };

                // Update subject options when Year selection changes
                function updateSubjects() {
                    const year = yearSelect.value;
                    const subjects = subjectsByYear[year] || [];
                    subjectSelect.innerHTML = subjects.map(sub => 
                        '<option value="' + sub.code + '" data-credits="' + sub.credits + '">' + sub.name + ' (' + sub.code + ')</option>'
                    ).join("");
                    
                    updateCredits();
                    renderStudentsGrid();
                }

                function updateCredits() {
                    const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
                    if (selectedOption) {
                        const credits = selectedOption.getAttribute("data-credits");
                        erpSubjectCredits.textContent = credits + " Credits";
                        
                        const codeDisplay = document.getElementById("subjectCodeDisplay");
                        if (codeDisplay) {
                            codeDisplay.value = subjectSelect.value;
                        }
                    }
                }

                // Render student marks edit spreadsheet
                function renderStudentsGrid() {
                    const subjectCode = subjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];
                    
                    if (students.length === 0) {
                        marksGridBody.innerHTML = '<tr><td colspan="9" style="text-align:center; color:var(--text-tertiary);">No student records found.</td></tr>';
                        return;
                    }

                    // Check for saved draft data in localStorage first
                    const draftKey = "draftMarks_" + subjectSelect.value;
                    const draftData = JSON.parse(localStorage.getItem(draftKey)) || null;

                    // Predefined mock marks to avoid empty cells on initial load
                    const mockScores = {
                        "BCA23015": { mt1: 18, mt2: 17, att: 9, prac: 45, ext: 88, cr: 4 },
                        "CSE23099": { mt1: 15, mt2: 16, att: 8, prac: 42, ext: 78, cr: 4 },
                        "CSE23115": { mt1: 14, mt2: 15, att: 7, prac: 40, ext: 81, cr: 4 },
                        "BCA23088": { mt1: 17, mt2: 19, att: 10, prac: 46, ext: 92, cr: 4 },
                        "CSE23045": { mt1: 12, mt2: 14, att: 6, prac: 38, ext: 65, cr: 4 }
                    };

                    marksGridBody.innerHTML = students.map((stu, index) => {
                        // Use draft score if available, else legacy scores
                        let score = (draftData && draftData[stu.id]) ? draftData[stu.id] : (mockScores[stu.id] || { mt1: 15, mt2: 15, att: 8, prac: 40, ext: 75, cr: 4 });
                        
                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + stu.name + '</strong><br><span style="font-size:9px; color:var(--text-tertiary);">' + stu.id + '</span></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-mt1" value="' + score.mt1 + '" min="0" max="20" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-mt2" value="' + score.mt2 + '" min="0" max="20" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-att" value="' + score.att + '" min="0" max="10" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-prac" value="' + score.prac + '" min="0" max="50" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color);"><input type="number" class="excel-input val-ext" value="' + score.ext + '" min="0" max="100" oninput="recalcRow(this)"></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace; font-weight:700;" class="val-total">0</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace; font-weight:700;" class="val-credits">0</td>' +
                            '<td style="text-align:center;"><span class="badge-grade val-grade">F</span></td>' +
                            '</tr>';
                    }).join("");

                    // Calculate initial totals for all loaded rows
                    const rows = marksGridBody.getElementsByTagName("tr");
                    Array.from(rows).forEach(row => {
                        const mt1Input = row.querySelector(".val-mt1");
                        if (mt1Input) recalcRow(mt1Input);
                    });
                }

                // Calculation logic inside spreadsheet cells
                window.recalcRow = function(inputEl) {
                    const row = inputEl.closest("tr");
                    if (!row) return;

                    const mt1 = Math.min(20, Math.max(0, parseInt(row.querySelector(".val-mt1").value) || 0));
                    const mt2 = Math.min(20, Math.max(0, parseInt(row.querySelector(".val-mt2").value) || 0));
                    const att = Math.min(10, Math.max(0, parseInt(row.querySelector(".val-att").value) || 0));
                    const prac = Math.min(50, Math.max(0, parseInt(row.querySelector(".val-prac").value) || 0));
                    const ext = Math.min(100, Math.max(0, parseInt(row.querySelector(".val-ext").value) || 0));

                    // Keep inputs bounded visually
                    row.querySelector(".val-mt1").value = mt1;
                    row.querySelector(".val-mt2").value = mt2;
                    row.querySelector(".val-att").value = att;
                    row.querySelector(".val-prac").value = prac;
                    row.querySelector(".val-ext").value = ext;

                    const total = mt1 + mt2 + att + prac + ext;
                    row.querySelector(".val-total").textContent = total;

                    // Calculate grade based on percentage (out of 200 max)
                    const percentage = (total / 200) * 100;
                    let grade = "F";
                    if (percentage >= 90) grade = "O";
                    else if (percentage >= 80) grade = "A";
                    else if (percentage >= 70) grade = "B";
                    else if (percentage >= 60) grade = "C";
                    else if (percentage >= 45) grade = "D";

                    const gradeBadge = row.querySelector(".val-grade");
                    gradeBadge.textContent = grade;
                    // Reset class colors
                    gradeBadge.className = "badge-grade val-grade grade-" + grade;

                    // Auto calculated credit points scale based on grade & subject base credits
                    const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
                    const subjectBaseCredits = selectedOption ? parseInt(selectedOption.getAttribute("data-credits")) : 4;
                    let earnedCredits = 0;
                    if (grade === "O") earnedCredits = subjectBaseCredits;
                    else if (grade === "A") earnedCredits = Math.round(subjectBaseCredits * 0.9 * 10) / 10;
                    else if (grade === "B") earnedCredits = Math.round(subjectBaseCredits * 0.8 * 10) / 10;
                    else if (grade === "C") earnedCredits = Math.round(subjectBaseCredits * 0.7 * 10) / 10;
                    else if (grade === "D") earnedCredits = Math.round(subjectBaseCredits * 0.6 * 10) / 10;
                    else earnedCredits = 0;

                    row.querySelector(".val-credits").textContent = earnedCredits;
                };

                // Drag & Drop event bindings
                const dropzone = document.getElementById("dropzone");
                if (dropzone) {
                    // Click drops simulation
                    dropzone.addEventListener("click", (e) => {
                        if (e.target.tagName !== "BUTTON") {
                            importMockSheet();
                        }
                    });

                    dropzone.addEventListener("dragover", (e) => {
                        e.preventDefault();
                        dropzone.style.background = "rgba(99, 102, 241, 0.08)";
                        dropzone.style.borderColor = "#10b981";
                    });

                    dropzone.addEventListener("dragleave", () => {
                        dropzone.style.background = "rgba(99, 102, 241, 0.02)";
                        dropzone.style.borderColor = "var(--primary)";
                    });

                    dropzone.addEventListener("drop", (e) => {
                        e.preventDefault();
                        dropzone.style.background = "rgba(99, 102, 241, 0.02)";
                        dropzone.style.borderColor = "var(--primary)";
                        
                        importMockSheet();
                    });
                }

                // File choose binding
                const excelFileInput = document.getElementById("excelFile");
                if (excelFileInput) {
                    excelFileInput.addEventListener("change", (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            if (!confirm("Are you sure you want to parse and import data from this CSV/Excel file?")) return;
                            
                            const reader = new FileReader();
                            reader.onload = function(evt) {
                                try {
                                    const text = evt.target.result;
                                    const lines = text.split(/\r?\n/);
                                    const importedData = {};
                                    
                                    lines.forEach((line, idx) => {
                                        if (idx === 0 || !line.trim()) return; // skip header
                                        const cols = line.split(",");
                                        if (cols.length >= 7) {
                                            const id = cols[1].trim();
                                            const mt1 = parseInt(cols[2]) || 0;
                                            const mt2 = parseInt(cols[3]) || 0;
                                            const att = parseInt(cols[4]) || 0;
                                            const prac = parseInt(cols[5]) || 0;
                                            const ext = parseInt(cols[6]) || 0;
                                            importedData[id] = { mt1, mt2, att, prac, ext };
                                        }
                                    });
                                    
                                    // Populate inputs in the current grid
                                    const rows = marksGridBody.getElementsByTagName("tr");
                                    let matchCount = 0;
                                    Array.from(rows).forEach(row => {
                                        const studentId = row.querySelector("td span").textContent.trim();
                                        if (importedData[studentId]) {
                                            const data = importedData[studentId];
                                            row.querySelector(".val-mt1").value = data.mt1;
                                            row.querySelector(".val-mt2").value = data.mt2;
                                            row.querySelector(".val-att").value = data.att;
                                            row.querySelector(".val-prac").value = data.prac;
                                            row.querySelector(".val-ext").value = data.ext;
                                            
                                            const inputVal = row.querySelector(".val-mt1");
                                            recalcRow(inputVal);
                                            matchCount++;
                                        }
                                    });
                                    showToast("Success: Imported " + matchCount + " student records from sheet!");
                                } catch (err) {
                                    showToast("Error parsing file format.");
                                }
                            };
                            reader.readAsText(file);
                        }
                    });
                }

                function importMockSheet() {
                    if (!confirm("Are you sure you want to import student marks from Google Excel Sheet?")) return;
                    showToast("Success: Imported student records from Google Sheets template!");
                    
                    // Populate with mock imported data
                    const rows = marksGridBody.getElementsByTagName("tr");
                    Array.from(rows).forEach(row => {
                        row.querySelector(".val-mt1").value = Math.floor(Math.random() * 5) + 15; // 15 to 20
                        row.querySelector(".val-mt2").value = Math.floor(Math.random() * 5) + 15; // 15 to 20
                        row.querySelector(".val-att").value = Math.floor(Math.random() * 3) + 8; // 8 to 10
                        row.querySelector(".val-prac").value = Math.floor(Math.random() * 10) + 40; // 40 to 50
                        row.querySelector(".val-ext").value = Math.floor(Math.random() * 20) + 75; // 75 to 95
                        
                        const inputVal = row.querySelector(".val-mt1");
                        recalcRow(inputVal);
                    });
                }

                // Button binds
                yearSelect.addEventListener("change", updateSubjects);
                subjectSelect.addEventListener("change", updateCredits);

                document.getElementById("exportExcelBtn").addEventListener("click", () => {
                    if (!confirm("Do you want to export the marks template CSV file for this cohort?")) return;

                    const subjectCode = subjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];
                    let csvContent = "Student Name,Enrollment ID,Mid-Term 1 (20),Mid-Term 2 (20),Attendance (10),Practical (50),External (100)\n";
                    students.forEach(s => {
                        csvContent += s.name + "," + s.id + ",,,,,\n";
                    });

                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute("download", "marks_template_" + subjectSelect.value + ".csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast("Success: Marks upload CSV template downloaded!");
                });

                document.getElementById("resetGridBtn").addEventListener("click", () => {
                    localStorage.removeItem("draftMarks_" + subjectSelect.value);
                    renderStudentsGrid();
                    showToast("Grid reset to default scores.");
                });

                document.getElementById("saveDraftBtn").addEventListener("click", () => {
                    const rows = marksGridBody.getElementsByTagName("tr");
                    const draftData = {};

                    Array.from(rows).forEach(row => {
                        const studentId = row.querySelector("td span").textContent.trim();
                        const mt1 = parseInt(row.querySelector(".val-mt1").value) || 0;
                        const mt2 = parseInt(row.querySelector(".val-mt2").value) || 0;
                        const att = parseInt(row.querySelector(".val-att").value) || 0;
                        const prac = parseInt(row.querySelector(".val-prac").value) || 0;
                        const ext = parseInt(row.querySelector(".val-ext").value) || 0;
                        const cr = parseFloat(row.querySelector(".val-credits").textContent) || 4;

                        draftData[studentId] = { mt1: mt1, mt2: mt2, att: att, prac: prac, ext: ext, cr: cr };
                    });

                    localStorage.setItem("draftMarks_" + subjectSelect.value, JSON.stringify(draftData));
                    showToast("Draft grades saved successfully to ERP local server.");
                });

                // ERP Confirmation Modal handling
                const erpConfirmModal = document.getElementById("erpConfirmModal");
                const submitErpBtn = document.getElementById("submitErpBtn");
                const cancelModalBtn = document.getElementById("cancelModalBtn");
                const confirmModalBtn = document.getElementById("confirmModalBtn");

                submitErpBtn.addEventListener("click", () => {
                    erpConfirmModal.style.display = "flex";
                });

                cancelModalBtn.addEventListener("click", () => {
                    erpConfirmModal.style.display = "none";
                });

                confirmModalBtn.addEventListener("click", () => {
                    erpConfirmModal.style.display = "none";
                    showToast("Success: Final grades submitted to ERP Controller database!");
                    
                    const statusBadge = document.getElementById("erpStatusBadge");
                    if (statusBadge) {
                        statusBadge.textContent = "Submitted to ERP";
                        statusBadge.style.color = "#10b981";
                    }
                    
                    // Disable all grid inputs
                    const inputs = marksGridBody.querySelectorAll("input");
                    inputs.forEach(input => {
                        input.disabled = true;
                    });
                    
                    // Disable actions
                    submitErpBtn.disabled = true;
                    submitErpBtn.style.opacity = "0.5";
                    submitErpBtn.style.cursor = "not-allowed";
                    document.getElementById("saveDraftBtn").disabled = true;
                    document.getElementById("saveDraftBtn").style.opacity = "0.5";
                    document.getElementById("saveDraftBtn").style.cursor = "not-allowed";
                    document.getElementById("resetGridBtn").disabled = true;
                    document.getElementById("resetGridBtn").style.opacity = "0.5";
                    document.getElementById("resetGridBtn").style.cursor = "not-allowed";
                    document.getElementById("dropzone").style.pointerEvents = "none";
                    document.getElementById("dropzone").style.opacity = "0.5";
                });

                // Run initial load
                updateSubjects();
            });
        