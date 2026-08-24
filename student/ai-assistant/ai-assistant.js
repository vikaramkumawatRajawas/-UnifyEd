
            document.addEventListener("DOMContentLoaded", () => {
                window.sendQuickPrompt = function(promptText) {
                    const input = document.getElementById("aiInput");
                    if (input) {
                        input.value = promptText;
                        sendAiQuery(new Event('submit'));
                    }
                };

                window.sendAiQuery = function(event) {
                    if (event) event.preventDefault();
                    const input = document.getElementById("aiInput");
                    const box = document.getElementById("aiMsgBox");
                    if (!input || !box) return;

                    const query = input.value.trim();
                    if (!query) return;

                    // Append user message
                    const userMsg = document.createElement("div");
                    userMsg.className = "msg sent";
                    userMsg.innerHTML = '<p style="margin:0;">' + query + '</p>';
                    box.appendChild(userMsg);
                    input.value = "";
                    box.scrollTop = box.scrollHeight;

                    // Append thinking placeholder
                    const thinkingBubble = document.createElement("div");
                    thinkingBubble.className = "msg received";
                    thinkingBubble.id = "aiThinkingBubble";
                    thinkingBubble.style.display = "flex";
                    thinkingBubble.style.alignItems = "center";
                    thinkingBubble.style.gap = "8px";
                    thinkingBubble.style.padding = "10px 15px";
                    thinkingBubble.innerHTML = '<span style="font-size:11px; color:var(--text-secondary);">Gemini is writing</span> <div class="dot-flashing"></div>';
                    box.appendChild(thinkingBubble);
                    box.scrollTop = box.scrollHeight;

                    // Compute response
                    setTimeout(() => {
                        const bubble = document.getElementById("aiThinkingBubble");
                        if (bubble) bubble.remove();

                        const reply = document.createElement("div");
                        reply.className = "msg received";
                        let text = "I am processing your query. Could you please specify which semester records you would like to view?";
                        
                        const normQuery = query.toLowerCase();
                        if (normQuery.includes("gpa") || normQuery.includes("cgpa") || normQuery.includes("grade")) {
                            text = "Your cumulative GPA (CGPA) is 9.42, placing you at A++ outstanding grade category.";
                        } else if (normQuery.includes("exam") || normQuery.includes("test") || normQuery.includes("schedule")) {
                            text = "Your next scheduled examination is 'Neural Networks & Deep Learning' on October 12, 2026 at 09:30 AM in Main Block Hall 4.";
                        } else if (normQuery.includes("attendance") || normQuery.includes("present")) {
                            text = "Your overall attendance is 89.5% (Safe Zone). You have cleared all minimum registration requirements.";
                        } else if (normQuery.includes("fee") || normQuery.includes("challan") || normQuery.includes("pay")) {
                            text = "You have ₹ 0.00 outstanding dues. All tuition challans for the Fall Semester have been paid successfully.";
                        }

                        reply.innerHTML = '<p style="margin:0;">' + text + '</p>';
                        box.appendChild(reply);
                        box.scrollTop = box.scrollHeight;
                    }, 1200);
                };
            });
        