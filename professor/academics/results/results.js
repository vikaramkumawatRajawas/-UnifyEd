
            // Log local storage errors for debugging in pair programming
            window.addEventListener("error", (e) => {
                localStorage.setItem("jsError", e.message + " at " + e.filename + ":" + e.lineno);
            });

            // Robust dynamic toast creator
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

            function initResults() {
                const resYearSelect = document.getElementById("resYearSelect");
                const resSemSelect = document.getElementById("resSemSelect");
                const resSubjectSelect = document.getElementById("resSubjectSelect");
                const resSubjectCodeDisplay = document.getElementById("resSubjectCodeDisplay");
                const resultsGridBody = document.getElementById("resultsGridBody");

                const resClassAverage = document.getElementById("resClassAverage");
                const resPassRate = document.getElementById("resPassRate");
                const resTotalStudents = document.getElementById("resTotalStudents");
                const resClassCredits = document.getElementById("resClassCredits");

                // Mapping of semester options based on Year selection
                const semestersByYear = {
                    "1": [ { val: "1", text: "Semester 1" }, { val: "2", text: "Semester 2" } ],
                    "2": [ { val: "3", text: "Semester 3" }, { val: "4", text: "Semester 4" } ],
                    "3": [ { val: "5", text: "Semester 5" }, { val: "6", text: "Semester 6" } ],
                    "4": [ { val: "7", text: "Semester 7" }, { val: "8", text: "Semester 8" } ]
                };

                // Assigned subjects mapped by Year-Semester keys
                const subjectsBySem = {
                    "1-1": [ { code: "CS-101", name: "Computer Programming", credits: 3 } ],
                    "1-2": [ { code: "EC-102", name: "Digital Electronics", credits: 4 } ],
                    "2-3": [ { code: "DBMS-301", name: "Database Management Systems", credits: 4 } ],
                    "2-4": [ { code: "CS-302", name: "Data Structures & Algorithms", credits: 4 } ],
                    "3-5": [ { code: "WT-591", name: "Web Technology Lab", credits: 3 } ],
                    "3-6": [ { code: "CS-502", name: "Operating Systems", credits: 4 } ],
                    "4-7": [ { code: "NN-702", name: "Neural Networks & Deep Learning", credits: 4 } ],
                    "4-8": [ { code: "EC-791", name: "VLSI Design Lab", credits: 3 } ]
                };

                // Students mapping by Subject Taught
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

                // Default mock marks to fall back on if no draft exists
                const mockScores = {
                    "BCA23015": { mt1: 18, mt2: 17, att: 9, prac: 45, ext: 88, cr: 4 },
                    "CSE23099": { mt1: 15, mt2: 16, att: 8, prac: 42, ext: 78, cr: 4 },
                    "CSE23115": { mt1: 14, mt2: 15, att: 7, prac: 40, ext: 81, cr: 4 },
                    "BCA23088": { mt1: 17, mt2: 19, att: 10, prac: 46, ext: 92, cr: 4 },
                    "CSE23045": { mt1: 12, mt2: 14, att: 6, prac: 38, ext: 65, cr: 4 }
                };

                function updateSemesters() {
                    const year = resYearSelect.value;
                    const semesters = semestersByYear[year] || [];
                    resSemSelect.innerHTML = semesters.map(sem =>
                        '<option value="' + sem.val + '">' + sem.text + '</option>'
                    ).join("");
                    
                    updateSubjects();
                }

                function updateSubjects() {
                    const year = resYearSelect.value;
                    const sem = resSemSelect.value;
                    const key = year + "-" + sem;
                    
                    const subjects = subjectsBySem[key] || [];
                    resSubjectSelect.innerHTML = subjects.map(sub =>
                        '<option value="' + sub.code + '" data-credits="' + sub.credits + '">' + sub.name + ' (' + sub.code + ')</option>'
                    ).join("");

                    if (subjects.length > 0) {
                        resSubjectCodeDisplay.value = subjects[0].code;
                        resClassCredits.textContent = parseFloat(subjects[0].credits).toFixed(1);
                    } else {
                        resSubjectCodeDisplay.value = "N/A";
                        resClassCredits.textContent = "0.0";
                    }

                    renderResultsGrid();
                }

                function renderResultsGrid() {
                    const subjectCode = resSubjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];

                    if (students.length === 0) {
                        resultsGridBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--text-tertiary);">No result records found for this cohort.</td></tr>';
                        resClassAverage.textContent = "—";
                        resPassRate.textContent = "—";
                        resTotalStudents.textContent = "0 Students";
                        return;
                    }

                    // Check for draftMarks stored in localStorage
                    const draftKey = "draftMarks_" + subjectCode;
                    const draftData = JSON.parse(localStorage.getItem(draftKey)) || null;

                    let totalCTSum = 0;
                    let passCount = 0;

                    resultsGridBody.innerHTML = students.map(stu => {
                        let score = (draftData && draftData[stu.id]) ? draftData[stu.id] : (mockScores[stu.id] || { mt1: 15, mt2: 14, att: 8, prac: 38, ext: 72, cr: 4 });
                        
                        // Map internal MT1, MT2 and scale practical to 20 for CT3
                        const ct1 = score.mt1;
                        const ct2 = score.mt2;
                        const ct3 = Math.min(20, Math.round(score.prac / 2.5));
                        const totalCT = ct1 + ct2 + ct3;
                        totalCTSum += totalCT;

                        const passStatus = totalCT >= 30 ? "Pass" : "Fail"; // Pass marks 30 out of 60
                        if (totalCT >= 25) passCount++; // 25 out of 60 passing CT threshold

                        return '<tr>' +
                            '<td style="border-right:1px solid var(--border-color);"><strong>' + stu.name + '</strong></td>' +
                            '<td style="border-right:1px solid var(--border-color); font-family:monospace; font-weight:600;">' + stu.id + '</td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + ct1 + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + ct2 + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="border-right:1px solid var(--border-color); text-align:center; font-family:monospace;">' + ct3 + ' <span style="font-size:10px; color:var(--text-tertiary);">/20</span></td>' +
                            '<td style="text-align:center; font-family:monospace; font-weight:700; color:var(--primary);">' + totalCT + ' <span style="font-size:10px; color:var(--text-tertiary);">/60</span></td>' +
                            '</tr>';
                    }).join("");

                    // Render statistical summaries
                    const classAvg = ((totalCTSum / (students.length * 60)) * 100).toFixed(1);
                    resClassAverage.textContent = classAvg + "%";
                    
                    const passPercent = Math.round((passCount / students.length) * 100);
                    resPassRate.textContent = passPercent + "%";
                    
                    resTotalStudents.textContent = students.length + " Students";
                }

                // Bind event listeners
                resYearSelect.addEventListener("change", updateSemesters);
                resSemSelect.addEventListener("change", updateSubjects);
                resSubjectSelect.addEventListener("change", () => {
                    const selected = resSubjectSelect.options[resSubjectSelect.selectedIndex];
                    if (selected) {
                        resSubjectCodeDisplay.value = resSubjectSelect.value;
                        resClassCredits.textContent = parseFloat(selected.getAttribute("data-credits")).toFixed(1);
                    }
                    renderResultsGrid();
                });

                document.getElementById("exportGradeSheetBtn").addEventListener("click", () => {
                    if (!confirm("Are you sure you want to download the class test results CSV report?")) return;
                    
                    const subjectCode = resSubjectSelect.value;
                    const students = studentsBySubject[subjectCode] || [];
                    
                    let csvContent = "Student Name,Roll Number / Enrollment ID,Class Test 1 (20),Class Test 2 (20),Class Test 3 (20),Total CT Score (60)\n";
                    
                    const draftKey = "draftMarks_" + subjectCode;
                    const draftData = JSON.parse(localStorage.getItem(draftKey)) || null;

                    students.forEach(s => {
                        let score = (draftData && draftData[s.id]) ? draftData[s.id] : (mockScores[s.id] || { mt1: 15, mt2: 14, att: 8, prac: 38, ext: 72, cr: 4 });
                        const ct1 = score.mt1;
                        const ct2 = score.mt2;
                        const ct3 = Math.min(20, Math.round(score.prac / 2.5));
                        const totalCT = ct1 + ct2 + ct3;

                        csvContent += s.name + "," + s.id + "," + ct1 + "," + ct2 + "," + ct3 + "," + totalCT + "\n";
                    });

                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute("download", "class_test_results_" + subjectCode + ".csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToast("Success: Class Test results report downloaded!");
                });

                // Run initial load
                updateSemesters();
            }

            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", initResults);
            } else {
                initResults();
            }
        