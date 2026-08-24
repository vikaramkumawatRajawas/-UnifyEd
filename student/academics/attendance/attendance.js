
            document.addEventListener("DOMContentLoaded", () => {
                // Read local storage checkins
                const checkins = JSON.parse(localStorage.getItem("attendanceCheckins")) || [];
                
                // Track dynamic changes to sum up overall totals
                let totalDelivered = 0;
                let totalAttended = 0;

                // Process table rows
                const rows = document.querySelectorAll(".custom-table tbody tr");
                rows.forEach(row => {
                    const subjectCell = row.querySelector("td:first-child strong");
                    if (!subjectCell) return;
                    const subjectName = subjectCell.textContent.trim();
                    
                    let delivered = parseInt(row.querySelector("td:nth-child(2)").textContent) || 0;
                    let attended = parseInt(row.querySelector("td:nth-child(3)").textContent) || 0;
                    
                    // Filter checkins for this subject
                    const subjectCheckins = checkins.filter(c => c.subjectName.toLowerCase() === subjectName.toLowerCase());
                    const addedCount = subjectCheckins.length;
                    
                    delivered += addedCount;
                    attended += addedCount; // Assumes registered attendance counts as attended
                    
                    row.querySelector("td:nth-child(2)").textContent = delivered;
                    row.querySelector("td:nth-child(3)").textContent = attended;
                    
                    // Recalculate percentage
                    const percentage = delivered > 0 ? ((attended / delivered) * 100).toFixed(1) : "0.0";
                    const statusColor = percentage >= 75 ? "#10b981" : "#f59e0b";
                    const statusText = percentage >= 75 ? "Safe" : "Caution";
                    const statusBadgeClass = percentage >= 75 ? "badge-success" : "badge-warning";
                    
                    // Update progress bar cell (4th column)
                    row.querySelector("td:nth-child(4)").innerHTML = `
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-weight:700; color:${statusColor}; min-width:35px;">${percentage}%</span>
                            <div style="flex-grow:1; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
                                <div style="width:${percentage}%; height:100%; background:${statusColor}; border-radius:3px;"></div>
                            </div>
                        </div>
                    `;
                    
                    // Update badge cell (5th column)
                    row.querySelector("td:nth-child(5)").innerHTML = `<span class="badge ${statusBadgeClass}">${statusText}</span>`;
                    
                    totalDelivered += delivered;
                    totalAttended += attended;
                });

                // Update Circular Meter & Overall Summary Card if values changed
                if (totalDelivered > 0) {
                    const overallPercentage = ((totalAttended / totalDelivered) * 100).toFixed(1);
                    
                    // Let's target the exact nodes by matching HTML hierarchy inside Circular Meter Card
                    const statValues = document.querySelectorAll(".overall-progress + div strong");
                    if (statValues.length >= 3) {
                        statValues[0].textContent = totalDelivered;
                        statValues[1].textContent = totalAttended;
                        statValues[2].textContent = totalDelivered - totalAttended;
                    }
                    
                    // Update overall percent text
                    const pctTextNode = document.querySelector(".overall-progress strong");
                    if (pctTextNode) pctTextNode.textContent = overallPercentage + "%";
                    
                    // Update SVG stroke-dashoffset
                    // Max dasharray is 282.6.
                    const circleNode = document.querySelector(".overall-progress circle[stroke='#10b981']");
                    if (circleNode) {
                        const dashoffset = 282.6 - (282.6 * overallPercentage / 100);
                        circleNode.setAttribute("stroke-dashoffset", dashoffset.toFixed(1));
                    }
                }

                // Simulate attendance functionality
                window.simulateAttendance = function(type) {
                    const resultBlock = document.getElementById("simResultBlock");
                    let inputVal = 0;
                    
                    if (type === 'attend') {
                        const val = document.getElementById("attendSimInput").value;
                        inputVal = parseInt(val) || 0;
                        if (inputVal <= 0) return;
                        
                        const newTotal = totalDelivered + inputVal;
                        const newAttended = totalAttended + inputVal;
                        const percentage = ((newAttended / newTotal) * 100).toFixed(1);
                        
                        resultBlock.style.display = "block";
                        resultBlock.style.background = "rgba(16, 185, 129, 0.08)";
                        resultBlock.style.border = "1px solid #10b981";
                        resultBlock.style.color = "#10b981";
                        resultBlock.innerHTML = "<strong>✅ Projection:</strong> If you attend next " + inputVal + " classes, your attendance rises to <strong>" + percentage + "%</strong>.";
                    } else {
                        const val = document.getElementById("missSimInput").value;
                        inputVal = parseInt(val) || 0;
                        if (inputVal <= 0) return;
                        
                        const newTotal = totalDelivered + inputVal;
                        const percentage = ((totalAttended / newTotal) * 100).toFixed(1);
                        
                        resultBlock.style.display = "block";
                        if (percentage >= 75) {
                            resultBlock.style.background = "rgba(245, 158, 11, 0.08)";
                            resultBlock.style.border = "1px solid #f59e0b";
                            resultBlock.style.color = "#f59e0b";
                            resultBlock.innerHTML = "<strong>⚠️ Warning:</strong> If you miss next " + inputVal + " classes, your attendance drops to <strong>" + percentage + "%</strong>.";
                        } else {
                            resultBlock.style.background = "rgba(239, 68, 68, 0.08)";
                            resultBlock.style.border = "1px solid #ef4444";
                            resultBlock.style.color = "#ef4444";
                            resultBlock.innerHTML = "<strong>❌ Critical Danger:</strong> If you miss next " + inputVal + " classes, your attendance drops to <strong>" + percentage + "%</strong>. You will be detained from exams (<75%).";
                        }
                    }
                };
            });
        