// ==========================================================================
// UNIFYED SYSTEM ALERTS - INTERACTIVE APPLICATION LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const searchAlertsInput = document.getElementById("searchAlertsInput");
    const chipBtns = document.querySelectorAll(".alert-chip-btn");
    const alertsFeedContainer = document.getElementById("alertsFeedContainer");
    const markAllReadBtn = document.getElementById("markAllReadBtn");
    const clearAllAlertsBtn = document.getElementById("clearAllAlertsBtn");
    const alertSettingsBtn = document.getElementById("alertSettingsBtn");
    const alertSettingsModal = document.getElementById("alertSettingsModal");
    const closeSettingsModalBtn = document.getElementById("closeSettingsModalBtn");
    const saveAlertSettingsBtn = document.getElementById("saveAlertSettingsBtn");

    const totalAlertsCount = document.getElementById("totalAlertsCount");
    const unreadAlertsCount = document.getElementById("unreadAlertsCount");

    // Update Counts & Sync Header Badge
    function updateCounts() {
        const allCards = alertsFeedContainer.querySelectorAll(".alert-item-card");
        const unreadCards = alertsFeedContainer.querySelectorAll(".alert-item-card.unread");

        const total = allCards.length;
        const unread = unreadCards.length;

        if (totalAlertsCount) totalAlertsCount.textContent = total;
        if (unreadAlertsCount) unreadAlertsCount.textContent = unread;

        localStorage.setItem("portal_unread_count", unread.toString());
        if (unread === 0) {
            localStorage.setItem("portal_notifications_read", "true");
        } else {
            localStorage.setItem("portal_notifications_read", "false");
        }

        if (typeof window.updateGlobalHeaderNotificationBadge === "function") {
            window.updateGlobalHeaderNotificationBadge();
        }
    }

    // 1. Filter Chips
    chipBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            chipBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            filterAlerts();
        });
    });

    // 2. Search Input
    if (searchAlertsInput) {
        searchAlertsInput.addEventListener("input", filterAlerts);
    }

    function filterAlerts() {
        const query = searchAlertsInput ? searchAlertsInput.value.toLowerCase().trim() : "";
        const activeChip = document.querySelector(".alert-chip-btn.active");
        const filterCategory = activeChip ? activeChip.getAttribute("data-filter") : "all";

        const alertCards = alertsFeedContainer.querySelectorAll(".alert-item-card");
        alertCards.forEach(card => {
            const category = card.getAttribute("data-category");
            const isUnread = card.classList.contains("unread");
            const title = card.querySelector(".alert-title").textContent.toLowerCase();
            const desc = card.querySelector(".alert-description").textContent.toLowerCase();

            let matchesCategory = (filterCategory === "all");
            if (filterCategory === "unread") matchesCategory = isUnread;
            else if (filterCategory === "academic") matchesCategory = (category === "academic");
            else if (filterCategory === "security") matchesCategory = (category === "security");
            else if (filterCategory === "system") matchesCategory = (category === "system");

            const matchesQuery = !query || (title.includes(query) || desc.includes(query));

            if (matchesCategory && matchesQuery) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // 3. Mark Single Alert as Read on Click / Dismiss
    alertsFeedContainer.addEventListener("click", (e) => {
        const dismissBtn = e.target.closest(".alert-dismiss-btn");
        if (dismissBtn) {
            const card = dismissBtn.closest(".alert-item-card");
            if (card) {
                card.style.opacity = "0";
                card.style.transform = "translateX(20px)";
                setTimeout(() => {
                    card.remove();
                    updateCounts();
                }, 250);
            }
            return;
        }

        const card = e.target.closest(".alert-item-card.unread");
        if (card && !e.target.closest("a")) {
            card.classList.remove("unread");
            const dot = card.querySelector(".unread-dot");
            if (dot) dot.remove();
            updateCounts();
        }
    });

    // 4. Mark All as Read
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener("click", () => {
            const unreadCards = alertsFeedContainer.querySelectorAll(".alert-item-card.unread");
            unreadCards.forEach(card => {
                card.classList.remove("unread");
                const dot = card.querySelector(".unread-dot");
                if (dot) dot.remove();
            });
            localStorage.setItem("portal_notifications_read", "true");
            localStorage.setItem("portal_unread_count", "0");
            updateCounts();
            alert("✓ All system alerts marked as read!");
        });
    }

    // 5. Clear All Alerts
    if (clearAllAlertsBtn) {
        clearAllAlertsBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all system alerts?")) {
                alertsFeedContainer.innerHTML = `
                    <div class="glassmorphism" style="padding: 40px; text-align: center; border: 1px solid var(--border-color);">
                        <i class="fa-solid fa-bell-slash" style="font-size: 36px; color: var(--text-tertiary); margin-bottom: 12px; display: block;"></i>
                        <h4 style="color: var(--text-primary); font-size: 16px; margin-bottom: 4px;">No System Alerts</h4>
                        <p style="color: var(--text-secondary); font-size: 13px;">Your notification feed is completely clear!</p>
                    </div>
                `;
                localStorage.setItem("portal_notifications_read", "true");
                localStorage.setItem("portal_notifications_cleared", "true");
                localStorage.setItem("portal_unread_count", "0");
                updateCounts();
            }
        });
    }

    // 6. Preferences Modal
    if (alertSettingsBtn && alertSettingsModal) {
        alertSettingsBtn.addEventListener("click", () => {
            alertSettingsModal.style.display = "flex";
        });

        if (closeSettingsModalBtn) {
            closeSettingsModalBtn.addEventListener("click", () => {
                alertSettingsModal.style.display = "none";
            });
        }

        if (saveAlertSettingsBtn) {
            saveAlertSettingsBtn.addEventListener("click", () => {
                alertSettingsModal.style.display = "none";
                alert("⚙️ Notification preferences updated successfully!");
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === alertSettingsModal) {
                alertSettingsModal.style.display = "none";
            }
        });
    }
});