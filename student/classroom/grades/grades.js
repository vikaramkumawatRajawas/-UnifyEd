
            document.addEventListener("DOMContentLoaded", () => {
                const gradesData = {
                    nn: [
                        { name: "Assignment 1: Gradient Descent Derivations", score: 48, max: 50, weight: "10%", remarks: "Excellent" },
                        { name: "Assignment 2: Perceptron Networks from Scratch", score: 44, max: 50, weight: "10%", remarks: "Very Good" },
                        { name: "Assignment 3: Convolutional Neural Nets (LeNet)", score: 49, max: 50, weight: "10%", remarks: "Outstanding" },
                        { name: "Internal Theory Examination I (T1)", score: 90, max: 100, weight: "30%", remarks: "A++ Grade" }
                    ],
                    vlsi: [
                        { name: "Assignment 1: Sizing PMOS & NMOS Inverters", score: 42, max: 50, weight: "10%", remarks: "Very Good" },
                        { name: "Assignment 2: CMOS Layout & Sizing Delays", score: 45, max: 50, weight: "10%", remarks: "Excellent" },
                        { name: "Practical Review: Cadence Virtuoso Simulator", score: 47, max: 50, weight: "10%", remarks: "Outstanding" },
                        { name: "Internal Theory Examination I (T1)", score: 86, max: 100, weight: "30%", remarks: "A Grade" }
                    ]
                };

                window.filterGradesByCourse = function() {
                    const select = document.getElementById("courseGradesFilter");
                    const tbody = document.getElementById("gradesTableBody");
                    const percentText = document.getElementById("internalPercentText");
                    const pointsText = document.getElementById("internalPointsText");
                    
                    if (!select || !tbody) return;

                    const course = select.value;
                    const items = gradesData[course];

                    let obtainedTotal = 0;
                    let maxTotal = 0;

                    tbody.innerHTML = items.map(item => {
                        obtainedTotal += item.score;
                        maxTotal += item.max;

                        return `
                            <tr>
                                <td style="font-weight:600; color:var(--text-primary); font-size:13px; padding:15px 10px;">${item.name}</td>
                                <td style="font-weight:700; color:var(--text-primary); font-size:13px; padding:15px 10px;">${item.score}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${item.max}</td>
                                <td style="font-size:12px; color:var(--text-secondary); font-weight:600; padding:15px 10px;">${item.weight}</td>
                                <td style="padding:15px 10px;">
                                    <span style="font-size:11px; font-weight:700; color:#10b981;">${item.remarks}</span>
                                </td>
                            </tr>
                        `;
                    }).join("");

                    const percentage = ((obtainedTotal / maxTotal) * 100).toFixed(1);
                    if (percentText) percentText.textContent = percentage + "%";
                    if (pointsText) pointsText.textContent = obtainedTotal + " / " + maxTotal;

                    const rangeInput = document.getElementById("simulatorRangeInput");
                    if (rangeInput) {
                        rangeInput.value = 45;
                        updateGradesSimulation(45);
                    }
                };

                window.updateGradesSimulation = function(val) {
                    const label = document.getElementById("simulatorScoreLabel");
                    const percentLabel = document.getElementById("simulatedPercentLabel");
                    const select = document.getElementById("courseGradesFilter");
                    
                    if (label) label.textContent = val + " / 50";

                    if (select) {
                        const course = select.value;
                        const items = gradesData[course];

                        let obtainedTotal = parseInt(val);
                        let maxTotal = 50;

                        items.forEach(i => {
                            obtainedTotal += i.score;
                            maxTotal += i.max;
                        });

                        const projectedPercentage = ((obtainedTotal / maxTotal) * 100).toFixed(1);
                        if (percentLabel) percentLabel.textContent = projectedPercentage + "%";
                    }
                };

                window.downloadGradesReport = function() {
                    alert("Generating signed Continuous Internal Evaluation gradecard report...");
                    setTimeout(() => {
                        alert("Continuous Internal Evaluation Report PDF downloaded successfully!");
                    }, 1200);
                };

                // Initial Load
                filterGradesByCourse();
            });
        