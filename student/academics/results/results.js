
            document.addEventListener("DOMContentLoaded", () => {
                const semesterResults = {
                    1: {
                        title: "Semester 1 (Autumn 2024)",
                        sgpa: "9.20",
                        cgpa: "9.20",
                        subjects: [
                            { code: "CS-101", title: "Introduction to CS & Programming", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "MTH-101", title: "Calculus & Linear Algebra", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "EE-101", title: "Basic Electronics Systems", credits: 4, points: 10, grade: "O (Outstanding)" },
                            { code: "HU-101", title: "English & Comm Skills", credits: 3, points: 9, grade: "E (Excellent)" },
                            { code: "PHY-101", title: "Engineering Physics Lab", credits: 5, points: 9, grade: "E (Excellent)" }
                        ]
                    },
                    2: {
                        title: "Semester 2 (Spring 2025)",
                        sgpa: "9.50",
                        cgpa: "9.36",
                        subjects: [
                            { code: "CS-201", title: "Data Structures & Algorithms", credits: 4, points: 10, grade: "O (Outstanding)" },
                            { code: "MTH-201", title: "Discrete Mathematical Structures", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "EE-201", title: "Digital Circuits & VLSI Intro", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-250", title: "Object Oriented Java Lab", credits: 5, points: 10, grade: "O (Outstanding)" },
                            { code: "ME-201", title: "Engineering Workshop Practicals", credits: 5, points: 9, grade: "E (Excellent)" }
                        ]
                    },
                    3: {
                        title: "Semester 3 (Autumn 2025)",
                        sgpa: "9.08",
                        cgpa: "9.27",
                        subjects: [
                            { code: "CS-301", title: "Computer Organization & Architecture", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-302", title: "Operating Systems Principles", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-303", title: "Object Oriented Design C++", credits: 4, points: 9, grade: "E (Excellent)" },
                            { code: "CS-350", title: "Python Scripting & Data Tools", credits: 4, points: 10, grade: "O (Outstanding)" },
                            { code: "MTH-301", title: "Probability & Stats Computing", credits: 4, points: 8, grade: "A (Very Good)" }
                        ]
                    }
                };

                window.viewSemesterResult = function(semNum) {
                    if (semNum > 3) {
                        alert("🔒 Locked: Results for Semester " + semNum + " have not been declared yet. Future academic session.");
                        return;
                    }

                    const data = semesterResults[semNum];
                    if (!data) return;

                    document.getElementById("modalTitle").textContent = data.title + " Report Card";
                    document.getElementById("modalSgpa").innerHTML = "SGPA: <strong>" + data.sgpa + "</strong>";
                    document.getElementById("modalCgpa").innerHTML = "CGPA: <strong>" + data.cgpa + "</strong>";

                    const tbody = document.getElementById("modalGradesBody");
                    tbody.innerHTML = data.subjects.map(sub => {
                        return "<tr>" +
                            "<td>" + sub.code + "</td>" +
                            "<td><strong>" + sub.title + "</strong></td>" +
                            "<td>" + sub.credits + "</td>" +
                            "<td>" + sub.points + "</td>" +
                            "<td><span class='badge badge-success'>" + sub.grade + "</span></td>" +
                            "</tr>";
                    }).join("");

                    const modal = document.getElementById("gradesModal");
                    if (modal) modal.style.display = "flex";
                };

                window.closeGradesModal = function() {
                    const modal = document.getElementById("gradesModal");
                    if (modal) modal.style.display = "none";
                };

                // Close modal clicking outside
                window.onclick = function(event) {
                    const modal = document.getElementById("gradesModal");
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                };

                // Mock report card download
                const dlBtn = document.getElementById("downloadReportBtn");
                if (dlBtn) {
                    dlBtn.addEventListener("click", () => {
                        dlBtn.disabled = true;
                        dlBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating PDF...';
                        setTimeout(() => {
                            alert("Gradesheet PDF download triggered successfully!");
                            dlBtn.disabled = false;
                            dlBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Download Gradesheet';
                        }, 1200);
                    });
                }
            });
        