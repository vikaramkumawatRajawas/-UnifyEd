
            document.addEventListener("DOMContentLoaded", () => {
                const baselineGpas = [9.20, 9.50, 9.08];

                window.calculateProjectedCgpa = function() {
                    const sem4Val = document.getElementById("sem4Val");
                    const sem5Val = document.getElementById("sem5Val");
                    const sem6Val = document.getElementById("sem6Val");
                    const projectedCgpaText = document.getElementById("projectedCgpaText");

                    const sem4 = parseFloat(document.getElementById("sem4Range").value) || 8.5;
                    const sem5 = parseFloat(document.getElementById("sem5Range").value) || 8.5;
                    const sem6 = parseFloat(document.getElementById("sem6Range").value) || 8.5;

                    if (sem4Val) sem4Val.textContent = sem4.toFixed(2);
                    if (sem5Val) sem5Val.textContent = sem5.toFixed(2);
                    if (sem6Val) sem6Val.textContent = sem6.toFixed(2);

                    const allGpas = [...baselineGpas, sem4, sem5, sem6];
                    const sum = allGpas.reduce((a, b) => a + b, 0);
                    const avgCgpa = sum / allGpas.length;

                    if (projectedCgpaText) projectedCgpaText.textContent = avgCgpa.toFixed(2);
                };

                // Trigger initial calculation
                calculateProjectedCgpa();
            });
        