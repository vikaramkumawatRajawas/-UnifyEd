
            document.addEventListener("DOMContentLoaded", () => {
                const defaultReceipts = [
                    { receiptNo: "RCPT-2026-9045", sem: "6th Semester", desc: "Tuition Fee Payments (CSE)", date: "July 04, 2026", amount: "₹ 75,000" },
                    { receiptNo: "RCPT-2026-1023", sem: "5th Semester", desc: "Tuition Fee Payments (CSE)", date: "Jan 10, 2026", amount: "₹ 75,000" }
                ];

                const defaultDemands = [
                    { id: "dem_tuition_7", sem: "7th Semester", desc: "Tuition Fee Demand (Fall 2026)", amountVal: 75000, amount: "₹ 75,000", dueDate: "Sep 10, 2026" },
                    { id: "dem_hostel_7", sem: "7th Semester", desc: "Hostel & Mess Charges (Fall 2026)", amountVal: 45000, amount: "₹ 45,000", dueDate: "Sep 15, 2026" }
                ];

                let activeTab = "transactions";
                let activePayId = null;

                function getReceipts() {
                    const saved = localStorage.getItem("fee_receipts");
                    if (saved) return JSON.parse(saved);
                    return defaultReceipts;
                }

                function saveReceipts(list) {
                    localStorage.setItem("fee_receipts", JSON.stringify(list));
                }

                function getDemands() {
                    const saved = localStorage.getItem("fee_demands");
                    if (saved) return JSON.parse(saved);
                    return defaultDemands;
                }

                function saveDemands(list) {
                    localStorage.setItem("fee_demands", JSON.stringify(list));
                }

                window.setFeeTab = function(tab) {
                    activeTab = tab;
                    
                    const txnBtn = document.getElementById("tabTxnBtn");
                    const dmdBtn = document.getElementById("tabDmdBtn");

                    if (txnBtn && dmdBtn) {
                        if (tab === "transactions") {
                            txnBtn.style.background = "var(--primary)";
                            txnBtn.style.color = "#fff";
                            txnBtn.style.borderColor = "var(--primary)";
                            dmdBtn.style.background = "var(--bg-tertiary)";
                            dmdBtn.style.color = "var(--text-secondary)";
                            dmdBtn.style.borderColor = "var(--border-color)";
                        } else {
                            dmdBtn.style.background = "var(--primary)";
                            dmdBtn.style.color = "#fff";
                            dmdBtn.style.borderColor = "var(--primary)";
                            txnBtn.style.background = "var(--bg-tertiary)";
                            txnBtn.style.color = "var(--text-secondary)";
                            txnBtn.style.borderColor = "var(--border-color)";
                        }
                    }
                    renderFeeBoard();
                };

                window.renderFeeBoard = function() {
                    const header = document.getElementById("feeTableHeader");
                    const tbody = document.getElementById("feeTableBody");
                    const cardTitle = document.getElementById("feeCardTitle");
                    const outstandingLabel = document.getElementById("outstandingDueLabel");
                    const statusBadge = document.getElementById("clearedStatusBadge");

                    if (!header || !tbody) return;

                    const demandsList = getDemands();
                    const receiptsList = getReceipts();

                    const totalOutstanding = demandsList.reduce((acc, curr) => acc + curr.amountVal, 0);
                    if (outstandingLabel) outstandingLabel.textContent = "₹ " + totalOutstanding.toLocaleString();

                    if (statusBadge) {
                        if (totalOutstanding === 0) {
                            statusBadge.style.color = "#10b981";
                            statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> ALL SEMESTER FEES CLEARED';
                        } else {
                            statusBadge.style.color = "#ef4444";
                            statusBadge.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> OUTSTANDING CHALLANS NEED ACTION';
                        }
                    }

                    if (activeTab === "transactions") {
                        if (cardTitle) cardTitle.innerHTML = '<i class="fa-solid fa-list-check"></i> Semester Fee Payments History';
                        header.innerHTML = `
                            <tr>
                                <th style="padding:15px 10px;">Receipt No</th>
                                <th style="padding:15px 10px;">Semester</th>
                                <th style="padding:15px 10px;">Description</th>
                                <th style="padding:15px 10px;">Date Paid</th>
                                <th style="padding:15px 10px;">Amount</th>
                                <th style="padding:15px 10px;">Action</th>
                            </tr>
                        `;

                        tbody.innerHTML = receiptsList.map(r => `
                            <tr>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">${r.receiptNo}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${r.sem}</td>
                                <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">${r.desc}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${r.date}</td>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">${r.amount}</td>
                                <td style="padding:15px 10px;"><button class="btn btn-secondary btn-sm" onclick="downloadReceiptPdf('${r.receiptNo}')" style="height:28px; font-size:11px; gap:4px;"><i class="fa-solid fa-download"></i> Receipt</button></td>
                            </tr>
                        `).join("");
                    } else {
                        if (cardTitle) cardTitle.innerHTML = '<i class="fa-solid fa-file-invoice-dollar"></i> Outstanding Demands & Fee Challans';
                        header.innerHTML = `
                            <tr>
                                <th style="padding:15px 10px;">Challan ID</th>
                                <th style="padding:15px 10px;">Semester</th>
                                <th style="padding:15px 10px;">Description</th>
                                <th style="padding:15px 10px;">Due Date</th>
                                <th style="padding:15px 10px;">Amount Due</th>
                                <th style="padding:15px 10px;">Action</th>
                            </tr>
                        `;

                        if (demandsList.length === 0) {
                            tbody.innerHTML = `<tr><td colspan="6" style="padding:40px; text-align:center; color:var(--text-secondary); font-size:12px;"><i class="fa-solid fa-circle-check" style="font-size:24px; color:#10b981; margin-bottom:10px; display:block;"></i> All upcoming semester demands cleared. No pending challans.</td></tr>`;
                            return;
                        }

                        tbody.innerHTML = demandsList.map(d => `
                            <tr>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">CHLN-${d.id.toUpperCase()}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${d.sem}</td>
                                <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">${d.desc}</td>
                                <td style="font-size:12px; color:#ef4444; font-weight:600; padding:15px 10px;">${d.dueDate}</td>
                                <td style="font-weight:700; color:var(--accent); padding:15px 10px;">${d.amount}</td>
                                <td style="padding:15px 10px;"><button class="btn btn-primary btn-sm" onclick="openPaymentWizard('${d.id}', '${d.desc.replace(/'/g, "\\'")}', '${d.amount}')" style="height:28px; font-size:11px;">Pay Challan</button></td>
                            </tr>
                        `).join("");
                    }
                };

                window.downloadReceiptPdf = function(rcpt) {
                    alert("Downloading secure e-Receipt voucher details for " + rcpt + "...");
                };

                window.openPaymentWizard = function(id, title, amt) {
                    activePayId = id;
                    const modal = document.getElementById("paymentWizardModal");
                    const modalTitle = document.getElementById("payModalItemTitle");
                    const modalAmt = document.getElementById("payModalItemAmount");
                    const detailsInput = document.getElementById("paymentDetailsInput");

                    if (modal && modalTitle && modalAmt) {
                        modalTitle.textContent = title;
                        modalAmt.textContent = amt;
                        if (detailsInput) detailsInput.value = "";
                        modal.style.display = "flex";
                    }
                };

                window.closePaymentWizard = function() {
                    const modal = document.getElementById("paymentWizardModal");
                    if (modal) modal.style.display = "none";
                };

                window.confirmFeePayment = function() {
                    const details = document.getElementById("paymentDetailsInput").value.trim();
                    if (!details) {
                        alert("Please enter UPI ID or Card details to authenticate secure transaction!");
                        return;
                    }

                    const payBtn = document.getElementById("confirmPayBtn");
                    if (payBtn) {
                        payBtn.disabled = true;
                        payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating secure payment...';
                    }

                    setTimeout(() => {
                        const demandsList = getDemands();
                        const receiptsList = getReceipts();

                        const matchIndex = demandsList.findIndex(d => d.id === activePayId);
                        if (matchIndex !== -1) {
                            const matched = demandsList[matchIndex];
                            
                            // Remove from demands
                            demandsList.splice(matchIndex, 1);
                            saveDemands(demandsList);

                            // Add to receipts
                            receiptsList.unshift({
                                receiptNo: "RCPT-2026-" + Math.floor(Math.random() * 9000 + 1000),
                                sem: matched.sem,
                                desc: matched.desc,
                                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                amount: matched.amount
                            });
                            saveReceipts(receiptsList);
                        }

                        if (payBtn) {
                            payBtn.disabled = false;
                            payBtn.textContent = "Confirm Secure Payment";
                        }

                        closePaymentWizard();
                        renderFeeBoard();
                        alert("Secure payment successfully processed! Transaction record receipt issued.");
                    }, 1800);
                };

                // Initial render
                renderFeeBoard();
            });
        