
            document.addEventListener("DOMContentLoaded", () => {
                const defaultBorrowed = [
                    { accNo: "LIB-7890", title: "Introduction to Artificial Neural Networks", issueDate: "2026-08-01", dueDate: "2026-08-15", status: "Active", renewed: false }
                ];

                const libraryCatalog = [
                    { id: "cat_vlsi", title: "CMOS VLSI Design: A Circuits and Systems Perspective", author: "Neil Weste", subject: "VLSI", shelf: "Rack A-14", copies: 4, reserved: false },
                    { id: "cat_robotics", title: "Robot Modeling and Control", author: "Mark W. Spong", subject: "Robotics", shelf: "Rack B-03", copies: 1, reserved: false },
                    { id: "cat_db", title: "Database System Concepts", author: "Silberschatz", subject: "Database", shelf: "Rack C-09", copies: 8, reserved: false },
                    { id: "cat_nn", title: "Neural Networks and Learning Machines", author: "Simon Haykin", subject: "Neural Networks", shelf: "Rack D-11", copies: 0, reserved: false }
                ];

                let currentTab = "borrowed";

                function getBorrowed() {
                    const saved = localStorage.getItem("lib_borrowed");
                    if (saved) return JSON.parse(saved);
                    return defaultBorrowed;
                }

                function saveBorrowed(list) {
                    localStorage.setItem("lib_borrowed", JSON.stringify(list));
                }

                function getCatalog() {
                    const saved = localStorage.getItem("lib_catalog");
                    if (saved) return JSON.parse(saved);
                    return libraryCatalog;
                }

                function saveCatalog(list) {
                    localStorage.setItem("lib_catalog", JSON.stringify(list));
                }

                window.setLibraryTab = function(tab) {
                    currentTab = tab;
                    const borrowedBtn = document.getElementById("tabBorrowedBtn");
                    const catalogBtn = document.getElementById("tabCatalogBtn");
                    const borrowedSec = document.getElementById("borrowedSection");
                    const catalogSec = document.getElementById("catalogSection");

                    if (borrowedBtn && catalogBtn && borrowedSec && catalogSec) {
                        if (tab === "borrowed") {
                            borrowedBtn.style.background = "var(--primary)";
                            borrowedBtn.style.color = "#fff";
                            borrowedBtn.style.borderColor = "var(--primary)";
                            catalogBtn.style.background = "var(--bg-tertiary)";
                            catalogBtn.style.color = "var(--text-secondary)";
                            catalogBtn.style.borderColor = "var(--border-color)";
                            borrowedSec.style.display = "block";
                            catalogSec.style.display = "none";
                        } else {
                            catalogBtn.style.background = "var(--primary)";
                            catalogBtn.style.color = "#fff";
                            catalogBtn.style.borderColor = "var(--primary)";
                            borrowedBtn.style.background = "var(--bg-tertiary)";
                            borrowedBtn.style.color = "var(--text-secondary)";
                            borrowedBtn.style.borderColor = "var(--border-color)";
                            catalogSec.style.display = "block";
                            borrowedSec.style.display = "none";
                            executeCatalogSearch();
                        }
                    }
                    renderLibraryData();
                };

                window.renderLibraryData = function() {
                    const borrowedTbody = document.getElementById("borrowedBooksTableBody");
                    const countLabel = document.getElementById("borrowedCountLabel");

                    if (!borrowedTbody) return;

                    const borrowedList = getBorrowed();
                    if (countLabel) countLabel.textContent = borrowedList.length;

                    if (borrowedList.length === 0) {
                        borrowedTbody.innerHTML = `<tr><td colspan="5" style="padding:40px; text-align:center; color:var(--text-secondary); font-size:12px;"><i class="fa-solid fa-book-open" style="font-size:24px; color:var(--text-tertiary); margin-bottom:10px; display:block;"></i> No books currently borrowed from the central blocks.</td></tr>`;
                    } else {
                        borrowedTbody.innerHTML = borrowedList.map(item => `
                            <tr>
                                <td style="font-weight:700; color:var(--text-primary); padding:15px 10px;">${item.accNo}</td>
                                <td style="font-size:12px; color:var(--text-primary); font-weight:600; padding:15px 10px;">${item.title}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${item.issueDate}</td>
                                <td style="font-size:12px; color:var(--text-secondary); padding:15px 10px;">${item.dueDate}</td>
                                <td style="padding:15px 10px; display:flex; gap:8px; align-items:center;">
                                    <span class="badge badge-success" style="font-size:10px;">Active</span>
                                    ${!item.renewed ? 
                                        `<button class="btn btn-secondary btn-sm" id="renewBtn_${item.accNo}" onclick="renewBorrowedBook('${item.accNo}')" style="height:26px; padding:0 12px; font-size:10px;">Renew</button>` :
                                        `<span style="font-size:10px; color:var(--text-tertiary);"><i class="fa-solid fa-check"></i> Renewed</span>`
                                    }
                                </td>
                            </tr>
                        `).join("");
                    }
                };

                window.renewBorrowedBook = function(accNo) {
                    const btn = document.getElementById("renewBtn_" + accNo);
                    if (btn) {
                        btn.disabled = true;
                        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                    }

                    setTimeout(() => {
                        const borrowedList = getBorrowed();
                        const match = borrowedList.find(b => b.accNo === accNo);
                        if (match) {
                            match.renewed = true;
                            const oldDue = new Date(match.dueDate);
                            oldDue.setDate(oldDue.getDate() + 14);
                            match.dueDate = oldDue.toISOString().split("T")[0];
                        }
                        saveBorrowed(borrowedList);
                        renderLibraryData();
                        alert("Book registration successfully renewed for 14 additional days!");
                    }, 1200);
                };

                window.executeCatalogSearch = function() {
                    const input = document.getElementById("catalogSearchQuery");
                    const results = document.getElementById("catalogSearchResults");
                    if (!results) return;

                    const query = input ? input.value.trim().toLowerCase() : "";
                    const list = getCatalog();
                    const filtered = list.filter(item => item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query) || item.subject.toLowerCase().includes(query));

                    if (filtered.length === 0) {
                        results.innerHTML = `<div style="padding:40px; text-align:center; color:var(--text-secondary); font-size:12px;"><i class="fa-solid fa-circle-question" style="font-size:24px; color:var(--text-tertiary); margin-bottom:10px; display:block;"></i> No matching books found in central shelves. Try checking spelling parameters.</div>`;
                        return;
                    }

                    results.innerHTML = filtered.map(item => `
                        <div style="padding:15px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-tertiary); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; margin-bottom: 8px;">
                            <div>
                                <strong style="font-size:13px; color:var(--text-primary); display:block; margin-bottom:2px;">${item.title}</strong>
                                <span style="font-size:11px; color:var(--text-secondary);">Author: ${item.author} • Subject: ${item.subject} • Location: ${item.shelf}</span>
                            </div>
                            <div>
                                ${item.reserved ? 
                                    `<span class="badge badge-success" style="font-size:10px;"><i class="fa-solid fa-circle-check"></i> Pre-Reserved</span>` :
                                    (item.copies > 0 ? 
                                        `<button class="btn btn-primary btn-sm" onclick="reserveCatalogBook('${item.id}')" style="height:32px; font-size:10px;">Reserve Copy</button>` :
                                        `<button class="btn btn-secondary btn-sm" disabled style="height:32px; font-size:10px; opacity:0.5;">Out of Stock</button>`
                                    )
                                }
                            </div>
                        </div>
                    `).join("");
                };

                window.reserveCatalogBook = function(id) {
                    const list = getCatalog();
                    const match = list.find(b => b.id === id);
                    if (match && match.copies > 0) {
                        match.reserved = true;
                        match.copies--;
                    }
                    saveCatalog(list);
                    executeCatalogSearch();
                    alert("Book copy successfully reserved! Please collect from central library block within 24 hours.");
                };

                // Initial render
                renderLibraryData();
            });
        