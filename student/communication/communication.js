
            document.addEventListener("DOMContentLoaded", () => {
                const contactsList = [
                    { id: "verma", name: "Dr. A. Verma", role: "Guide Assigned", online: true, icon: "fa-chalkboard-user" },
                    { id: "sharma", name: "Prof. S. Sharma", role: "Neural Networks Prof", online: false, icon: "fa-user-tie" },
                    { id: "sen", name: "Prof. D. Sen", role: "Registrar Authority", online: true, icon: "fa-user-shield" },
                    { id: "joshi", name: "Mr. P. Joshi", role: "Fees Accounts Manager", online: true, icon: "fa-file-invoice-dollar" }
                ];

                const initialConversations = {
                    verma: [
                        { text: "Hi, did you upload the Robotics SLAM project archive on the portal yet?", type: "received", time: "10:04 AM" }
                    ],
                    sharma: [
                        { text: "Hello Vikram, please submit the backpropagation review report by tonight.", type: "received", time: "Yesterday" }
                    ],
                    sen: [
                        { text: "Your hostel outstation gatepass request has been marked to the HOD for verification.", type: "received", time: "2 Days ago" }
                    ],
                    joshi: [
                        { text: "Please pay the outstanding semester tuition challan balance to register for mid-terms.", type: "received", time: "3 Days ago" }
                    ]
                };

                let activeContactId = "verma";

                function getConversations(id) {
                    const saved = localStorage.getItem("erp_conv_" + id);
                    if (saved) return JSON.parse(saved);
                    return initialConversations[id] || [];
                }

                function saveConversations(id, list) {
                    localStorage.setItem("erp_conv_" + id, JSON.stringify(list));
                }

                window.renderChatContacts = function() {
                    const container = document.getElementById("chatContactsContainer");
                    if (!container) return;

                    const searchInput = document.getElementById("contactSearchInput");
                    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

                    const filtered = contactsList.filter(c => c.name.toLowerCase().includes(query) || c.role.toLowerCase().includes(query));

                    container.innerHTML = filtered.map(item => `
                        <div class="chat-list-item ${item.id === activeContactId ? 'active' : ''}" onclick="switchActiveChat('${item.id}')">
                            <i class="fa-solid ${item.icon}"></i>
                            <div style="flex-grow:1;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong>${item.name}</strong>
                                    <div style="width:8px; height:8px; border-radius:50%; background:${item.online ? '#10b981' : 'rgba(255,255,255,0.1)'};"></div>
                                </div>
                                <span>${item.role}</span>
                            </div>
                        </div>
                    `).join("");
                };

                window.switchActiveChat = function(id) {
                    activeContactId = id;
                    renderChatContacts();

                    const contact = contactsList.find(c => c.id === id);
                    if (!contact) return;

                    document.getElementById("activeContactName").textContent = contact.name;
                    document.getElementById("activeContactStatus").textContent = contact.online ? "Online" : "Offline";
                    document.getElementById("activeContactIndicator").style.background = contact.online ? "#10b981" : "rgba(255,255,255,0.3)";

                    renderChatMessages();
                };

                window.renderChatMessages = function() {
                    const box = document.getElementById("chatMessages");
                    if (!box) return;

                    const list = getConversations(activeContactId);
                    box.innerHTML = list.map(msg => `
                        <div class="msg ${msg.type}">
                            <p style="margin:0;">${msg.text}</p>
                            <span class="time">${msg.time}</span>
                        </div>
                    `).join("");

                    box.scrollTop = box.scrollHeight;
                };

                window.sendChatMessage = function(event) {
                    event.preventDefault();
                    const input = document.getElementById("chatInput");
                    if (!input || !input.value.trim()) return;

                    const textVal = input.value.trim();
                    const list = getConversations(activeContactId);

                    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    list.push({ text: textVal, type: "sent", time: timeStr });
                    saveConversations(activeContactId, list);
                    input.value = "";
                    renderChatMessages();

                    // Auto Reply simulation
                    setTimeout(() => {
                        const replies = {
                            verma: "Understood. Please upload the updated slide decks and we will review them in our next slot.",
                            sharma: "Acknowledged. Ensure the code files are zipped properly before upload.",
                            sen: "Please monitor the Applications tab. Decisions are synced on the fly.",
                            joshi: "Verify your bank transaction references. If verified, the payment registry clears in 24 hours."
                        };

                        const responseText = replies[activeContactId] || "Received your response. Our academic team is reviewing the status.";
                        const updatedList = getConversations(activeContactId);
                        updatedList.push({ text: responseText, type: "received", time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
                        saveConversations(activeContactId, updatedList);
                        renderChatMessages();
                    }, 1500);
                };

                window.filterChatContacts = function() {
                    renderChatContacts();
                };

                // Initial load
                renderChatContacts();
                switchActiveChat("verma");
            });
        