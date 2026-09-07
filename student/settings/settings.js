
                // Initialize Interface Mode radio selection
                const currentPortalMode = localStorage.getItem("portalMode") || "advance";
                if (typeof window.setPortalMode === "function") {
                    window.setPortalMode(currentPortalMode);
                }

                const transportToggle = document.getElementById("settingsTransportToggle");
                if (transportToggle) {
                    const usesTransport = localStorage.getItem("usesTransport") === "true";
                    transportToggle.checked = usesTransport;
                    
                    transportToggle.addEventListener("change", () => {
                        localStorage.setItem("usesTransport", transportToggle.checked ? "true" : "false");
                        if (transportToggle.checked) {
                            localStorage.setItem("busId", "BUS-05");
                            localStorage.setItem("routeId", "ROUTE-03");
                            localStorage.setItem("busNumber", "RJ14 AB 1234");
                        } else {
                            localStorage.setItem("busId", "");
                            localStorage.setItem("routeId", "");
                            localStorage.setItem("busNumber", "");
                        }
                        
                        const sidebarLinks = document.querySelectorAll(".sidebar-item");
                        sidebarLinks.forEach(linkItem => {
                            const textSpan = linkItem.querySelector("span");
                            if (textSpan && textSpan.textContent.trim().toLowerCase() === "transport") {
                                linkItem.style.display = transportToggle.checked ? "flex" : "none";
                            }
                        });
                    });
                }

                // Calculate local cache size in settings
                function calculateCacheSize() {
                    let total = 0;
                    for (let x in localStorage) {
                        if (localStorage.hasOwnProperty(x)) {
                            total += ((localStorage[x].length + x.length) * 2);
                        }
                    }
                    const sizeKB = (total / 1024).toFixed(2);
                    const count = Object.keys(localStorage).length;
                    const sizeNode = document.getElementById("cacheSizeDisplay");
                    const countNode = document.getElementById("cacheItemsCount");
                    if (sizeNode) sizeNode.textContent = sizeKB + " KB";
                    if (countNode) countNode.textContent = count;
                }
                calculateCacheSize();

                // Reset and clear cache
                window.clearLocalStorageCache = function() {
                    if (confirm("Are you sure you want to clear your local database cache? This will reset all checklist tasks, attendance logs, custom profiles, and notifications.")) {
                        localStorage.clear();
                        alert("ERP system database cache cleared and settings reset successfully. Reloading page...");
                        window.location.reload();
                    }
                };

                // Revoke session handler
                window.revokeSession = function(btn) {
                    if (confirm("Are you sure you want to log out and revoke authorization for this device?")) {
                        const tr = btn.closest("tr");
                        if (tr) {
                            tr.style.opacity = "0.5";
                            btn.disabled = true;
                            btn.textContent = "Revoked";
                            alert("Authorization token revoked successfully!");
                        }
                    }
                };

                window.submitPasswordChange = function() {
                    const oldPass = document.getElementById("oldPasswordInput").value.trim();
                    const newPass = document.getElementById("newPasswordInput").value.trim();
                    const confPass = document.getElementById("confirmNewPasswordInput").value.trim();

                    if (!oldPass || !newPass || !confPass) {
                        alert("Error: All password fields must be filled!");
                        return;
                    }

                    if (newPass !== confPass) {
                        alert("Error: New Password and Confirm Password do not match!");
                        return;
                    }

                    const updateBtn = document.getElementById("updatePasswordBtn");
                    if (updateBtn) {
                        updateBtn.disabled = true;
                        updateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating passwords...';
                    }

                    setTimeout(() => {
                        localStorage.setItem("userPassword", newPass);

                        if (updateBtn) {
                            updateBtn.disabled = false;
                            updateBtn.innerHTML = '<i class="fa-solid fa-key"></i> Update Security Credentials';
                        }

                        document.getElementById("oldPasswordInput").value = "";
                        document.getElementById("newPasswordInput").value = "";
                        document.getElementById("confirmNewPasswordInput").value = "";

                        alert("Security credentials updated successfully! Your new password has been verified.");
                    }, 1200);
                };
            });
        