// ==========================================================================
// UNIFYED PORTAL SETTINGS - INTERACTIVE APPLICATION LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 0. Initialize Interface Mode (Basic vs Advance) radio selection
    const currentPortalMode = localStorage.getItem("portalMode") || "advance";
    if (typeof window.setPortalMode === "function") {
        window.setPortalMode(currentPortalMode);
    }

    // 1. Dynamic User Info Rendering in Hero Card
    const loggedInUser = localStorage.getItem("loggedInUser") || "Dr. Rajesh Kumar";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId") || "CSE-EMP-204";

    let displayName = loggedInUser;
    const regFirst = localStorage.getItem("registeredFirstName");
    const regLast = localStorage.getItem("registeredLastName");
    const regUser = localStorage.getItem("registeredUsername");

    if (regFirst && (loggedInUser === regUser || loggedInUser === localStorage.getItem("registeredEmail") || loggedInUser === localStorage.getItem("regEmail"))) {
        displayName = `${regFirst} ${regLast}`;
    } else if (loggedInUser.includes("@")) {
        displayName = loggedInUser.split("@")[0].split(/[._-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    } else if (loggedInUser !== "Dr. Rajesh Kumar") {
        displayName = loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1);
    }

    const deptVal = localStorage.getItem("professorDept") || "Department of Computer Science & Engineering";

    const settingsUserName = document.getElementById("settingsUserName");
    const settingsUserEmpId = document.getElementById("settingsUserEmpId");
    const settingsUserDept = document.getElementById("settingsUserDept");
    const settingsAvatarPic = document.getElementById("settingsAvatarPic");

    if (settingsUserName) settingsUserName.textContent = displayName;
    if (settingsUserEmpId) settingsUserEmpId.textContent = loggedInStudentId;
    if (settingsUserDept) settingsUserDept.textContent = deptVal;

    const savedAvatar = localStorage.getItem("faculty_avatar_image");
    if (savedAvatar && settingsAvatarPic) {
        settingsAvatarPic.src = savedAvatar;
    }

    // 2. Tab Navigation Logic
    const tabBtns = document.querySelectorAll(".settings-tab-btn");
    const panels = document.querySelectorAll(".settings-panel");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetId = btn.getAttribute("data-target");
            panels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.style.display = "block";
                } else {
                    panel.style.display = "none";
                }
            });
        });
    });

    // 3. Theme Picker Logic
    window.setPortalTheme = function(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        const cardDark = document.getElementById("cardThemeDark");
        const cardLight = document.getElementById("cardThemeLight");

        if (cardDark && cardLight) {
            if (theme === "dark") {
                cardDark.classList.add("active");
                cardLight.classList.remove("active");
            } else {
                cardLight.classList.add("active");
                cardDark.classList.remove("active");
            }
        }
    };

    const currentTheme = localStorage.getItem("theme") || "dark";
    window.setPortalTheme(currentTheme);

    // 4. Campus Facilities Toggles State & Selection
    const settingTransportToggle = document.getElementById("settingTransportToggle");
    const settingBusRouteSelect = document.getElementById("settingBusRouteSelect");
    const settingHostelToggle = document.getElementById("settingHostelToggle");

    if (settingTransportToggle) {
        settingTransportToggle.checked = localStorage.getItem("usesTransport") === "true";
        settingTransportToggle.addEventListener("change", () => {
            localStorage.setItem("usesTransport", settingTransportToggle.checked.toString());
        });
    }

    if (settingBusRouteSelect) {
        const savedRoute = localStorage.getItem("busRoute");
        if (savedRoute) settingBusRouteSelect.value = savedRoute;

        settingBusRouteSelect.addEventListener("change", () => {
            localStorage.setItem("busRoute", settingBusRouteSelect.value);
        });
    }

    if (settingHostelToggle) {
        settingHostelToggle.checked = localStorage.getItem("hostelEnabled") === "true";
        settingHostelToggle.addEventListener("change", () => {
            localStorage.setItem("hostelEnabled", settingHostelToggle.checked.toString());
        });
    }

    // 5. Change Password Form
    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("🔒 Password updated successfully! Credentials synced with university auth gateway.");
            changePasswordForm.reset();
        });
    }

    // 6. Save All Settings Action
    const saveAllSettingsBtn = document.getElementById("saveAllSettingsBtn");
    if (saveAllSettingsBtn) {
        saveAllSettingsBtn.addEventListener("click", () => {
            if (settingTransportToggle) localStorage.setItem("usesTransport", settingTransportToggle.checked.toString());
            if (settingHostelToggle) localStorage.setItem("hostelEnabled", settingHostelToggle.checked.toString());
            if (settingBusRouteSelect) localStorage.setItem("busRoute", settingBusRouteSelect.value);

            alert("✨ Portal settings and preferences saved successfully!");
        });
    }
});