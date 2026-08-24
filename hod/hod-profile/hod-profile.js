/**
 * UNIFYED HOD PORTAL - HOD PROFILE CONTROLLER
 */
(function () {
    const defaultProfile = {
        name: "Dr. Rajesh Kumar",
        title: "Head of Department - Computer Science & Engineering",
        dept: "Computer Science & Engineering",
        exp: "18 Years in Academia",
        email: "rajesh.kumar@unifyed.edu",
        phone: "+91 98765 43210",
        office: "Block A - Room 201 (HOD Office)",
        hours: "Mon - Fri: 10:00 AM - 05:00 PM"
    };

    function getHodProfileState() {
        let profile = { ...defaultProfile };

        // 1. Load saved state from localStorage if available
        const savedState = localStorage.getItem("hod_dashboard_state");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.profile) {
                    profile = { ...profile, ...parsed.profile };
                }
            } catch (e) {}
        }

        // 2. Read live logged-in user credentials from auth login session
        const loggedInUser = localStorage.getItem("loggedInUser");
        const regFirst = localStorage.getItem("registeredFirstName");
        const regLast = localStorage.getItem("registeredLastName");
        const regEmail = localStorage.getItem("registeredEmail") || localStorage.getItem("regEmail");
        const regPhone = localStorage.getItem("registeredPhone");

        if (regFirst) {
            profile.name = regLast ? `${regFirst} ${regLast}`.trim() : regFirst.trim();
        } else if (loggedInUser && loggedInUser.trim()) {
            if (loggedInUser.includes("@")) {
                profile.name = loggedInUser.split("@")[0].split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            } else {
                profile.name = loggedInUser.trim();
            }
        }

        if (regEmail && regEmail.trim()) {
            profile.email = regEmail.trim();
        } else if (loggedInUser && loggedInUser.includes("@")) {
            profile.email = loggedInUser;
        }

        if (regPhone && regPhone.trim()) {
            profile.phone = regPhone.trim();
        }

        // 3. Read currentUser JSON object if stored
        const currentUserStr = localStorage.getItem("currentUser");
        if (currentUserStr) {
            try {
                const userObj = JSON.parse(currentUserStr);
                if (userObj.name) profile.name = userObj.name;
                if (userObj.email) profile.email = userObj.email;
                if (userObj.phone) profile.phone = userObj.phone;
                if (userObj.office) profile.office = userObj.office;
            } catch (e) {}
        }

        return profile;
    }

    function saveHodProfileState(profileObj) {
        const savedState = localStorage.getItem("hod_dashboard_state");
        let stateObj = {};
        if (savedState) {
            try { stateObj = JSON.parse(savedState); } catch(e) {}
        }
        stateObj.profile = profileObj;
        localStorage.setItem("hod_dashboard_state", JSON.stringify(stateObj));

        // Sync with global auth session keys
        localStorage.setItem("loggedInUser", profileObj.name);
        if (profileObj.email) localStorage.setItem("registeredEmail", profileObj.email);
        if (profileObj.phone) localStorage.setItem("registeredPhone", profileObj.phone);
    }

    let currentProfile = getHodProfileState();

    function showToast(message, type = "success") {
        const container = document.getElementById("toastContainer");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = `toast-alert ${type}`;
        let iconClass = "fa-circle-check";
        if (type === "warning") iconClass = "fa-triangle-exclamation";
        if (type === "info") iconClass = "fa-circle-info";

        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(50px)";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("active");
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("active");
    }

    function renderProfile() {
        const nameElem = document.getElementById("profHodName");
        const titleElem = document.getElementById("profHodTitle");
        const deptElem = document.getElementById("profDeptName");
        const expElem = document.getElementById("profHodExp");
        const hoursElem = document.getElementById("profHodHours");
        const emailElem = document.getElementById("profHodEmail");
        const phoneElem = document.getElementById("profHodPhone");
        const officeElem = document.getElementById("profHodOffice");
        const hdrNameElem = document.getElementById("hdrHodName");
        const hdrCodeElem = document.getElementById("hdrHodCode");

        const loggedInId = localStorage.getItem("loggedInStudentId") || "CSE-EMP-204";

        if (nameElem) nameElem.textContent = currentProfile.name;
        if (titleElem) titleElem.textContent = currentProfile.title;
        if (deptElem) deptElem.textContent = currentProfile.dept;
        if (expElem) expElem.textContent = currentProfile.exp;
        if (hoursElem) hoursElem.textContent = currentProfile.hours;
        if (emailElem) emailElem.textContent = currentProfile.email;
        if (phoneElem) phoneElem.textContent = currentProfile.phone;
        if (officeElem) officeElem.textContent = currentProfile.office;
        if (hdrNameElem) hdrNameElem.textContent = currentProfile.name;
        if (hdrCodeElem) hdrCodeElem.textContent = loggedInId;

        // Restore Avatar Image
        const savedAvatar = localStorage.getItem("hod_avatar_image");
        const avatarImg = document.getElementById("profHodAvatarImg");
        if (savedAvatar && avatarImg) {
            avatarImg.src = savedAvatar;
        }

        // Restore Cover Photo Banner
        const savedCover = localStorage.getItem("hod_cover_image");
        const coverBanner = document.getElementById("profCoverBanner");
        if (savedCover && coverBanner) {
            coverBanner.style.backgroundImage = `linear-gradient(135deg, rgba(99, 102, 241, 0.45), rgba(168, 85, 247, 0.45)), url('${savedCover}')`;
        }
    }

    function initPage() {
        renderProfile();

        // 1. Profile Avatar Photo Upload Handler
        const btnUploadAvatar = document.getElementById("btnUploadAvatar");
        const avatarFileInput = document.getElementById("avatarFileInput");
        const profHodAvatarImg = document.getElementById("profHodAvatarImg");

        if (btnUploadAvatar && avatarFileInput) {
            btnUploadAvatar.addEventListener("click", () => avatarFileInput.click());

            avatarFileInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        const dataUrl = evt.target.result;
                        if (profHodAvatarImg) profHodAvatarImg.src = dataUrl;
                        localStorage.setItem("hod_avatar_image", dataUrl);
                        showToast("Updated profile photo successfully!", "success");
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // 2. Cover Photo Banner Upload Handler
        const btnUploadCover = document.getElementById("btnUploadCover");
        const coverFileInput = document.getElementById("coverFileInput");
        const profCoverBanner = document.getElementById("profCoverBanner");

        if (btnUploadCover && coverFileInput) {
            btnUploadCover.addEventListener("click", () => coverFileInput.click());

            coverFileInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        const dataUrl = evt.target.result;
                        if (profCoverBanner) {
                            profCoverBanner.style.backgroundImage = `linear-gradient(135deg, rgba(99, 102, 241, 0.45), rgba(168, 85, 247, 0.45)), url('${dataUrl}')`;
                        }
                        localStorage.setItem("hod_cover_image", dataUrl);
                        showToast("Updated cover banner photo successfully!", "success");
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // 3. Edit Profile Modal Trigger
        const btnEditProfile = document.getElementById("btnEditProfile");
        if (btnEditProfile) {
            btnEditProfile.addEventListener("click", () => {
                document.getElementById("inputHodName").value = currentProfile.name;
                document.getElementById("inputHodTitle").value = currentProfile.title;
                document.getElementById("inputHodDept").value = currentProfile.dept;
                document.getElementById("inputHodExp").value = currentProfile.exp;
                document.getElementById("inputHodEmail").value = currentProfile.email;
                document.getElementById("inputHodPhone").value = currentProfile.phone;
                document.getElementById("inputHodOffice").value = currentProfile.office;
                document.getElementById("inputHodHours").value = currentProfile.hours;
                openModal("editProfileModal");
            });
        }

        // Save Profile Form Submission
        const editProfileForm = document.getElementById("editProfileForm");
        if (editProfileForm) {
            editProfileForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("inputHodName").value.trim();
                const title = document.getElementById("inputHodTitle").value.trim();
                const dept = document.getElementById("inputHodDept").value.trim();
                const exp = document.getElementById("inputHodExp").value.trim();
                const email = document.getElementById("inputHodEmail").value.trim();
                const phone = document.getElementById("inputHodPhone").value.trim();
                const office = document.getElementById("inputHodOffice").value.trim();
                const hours = document.getElementById("inputHodHours").value.trim();

                if (!name || !email) return;

                currentProfile.name = name;
                currentProfile.title = title;
                currentProfile.dept = dept;
                currentProfile.exp = exp;
                currentProfile.email = email;
                currentProfile.phone = phone;
                currentProfile.office = office;
                currentProfile.hours = hours;

                saveHodProfileState(currentProfile);
                renderProfile();
                closeModal("editProfileModal");
                showToast("Updated HOD executive profile details successfully!", "success");
            });
        }

        // Change Password Modal Trigger
        const btnChangePassword = document.getElementById("btnChangePassword");
        if (btnChangePassword) {
            btnChangePassword.addEventListener("click", () => openModal("changePasswordModal"));
        }

        // Change Password Form Submission
        const changePasswordForm = document.getElementById("changePasswordForm");
        if (changePasswordForm) {
            changePasswordForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const currentP = document.getElementById("inputCurrentPass").value;
                const newP = document.getElementById("inputNewPass").value;
                const confirmP = document.getElementById("inputConfirmPass").value;

                if (newP !== confirmP) {
                    showToast("New passwords do not match!", "warning");
                    return;
                }

                closeModal("changePasswordModal");
                changePasswordForm.reset();
                showToast("Successfully updated account password!", "success");
            });
        }

        // Theme Toggle
        const themeBtn = document.getElementById("themeToggleBtn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                const activeTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", activeTheme);
                localStorage.setItem("theme", activeTheme);
                showToast(`Switched to ${activeTheme} mode`, "info");
            });
        }

        // Sidebar Navigation Toggles
        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");
        if (menuToggle && sidebar) {
            menuToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                sidebar.classList.toggle("active");
            });
        }

        const desktopSidebarToggle = document.getElementById("desktopSidebarToggle");
        const portalLayout = document.querySelector(".portal-layout");
        if (desktopSidebarToggle && portalLayout) {
            desktopSidebarToggle.addEventListener("click", () => {
                portalLayout.classList.toggle("sidebar-collapsed");
            });
        }

        // Profile Menu Dropdown
        const profileTrigger = document.getElementById("portalProfileTrigger");
        const profileMenu = document.getElementById("profileMenu");
        if (profileTrigger && profileMenu) {
            profileTrigger.addEventListener("click", (e) => {
                e.stopPropagation();
                profileMenu.classList.toggle("open");
            });
            document.addEventListener("click", (e) => {
                if (!profileMenu.contains(e.target) && e.target !== profileTrigger) {
                    profileMenu.classList.remove("open");
                }
            });
        }

        // Modal Close Triggers
        document.querySelectorAll("[data-close-modal]").forEach(btn => {
            btn.addEventListener("click", function () {
                const targetId = this.getAttribute("data-close-modal");
                closeModal(targetId);
            });
        });

        // Logout
        document.querySelectorAll("[data-logout]").forEach(btn => {
            btn.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedInStudentId");
                window.location.href = "../../auth/login.html";
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPage);
    } else {
        initPage();
    }
})();
