// ==========================================================================
// UNIFYED FACULTY PROFILE - INTERACTIVE APPLICATION LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Helper to get current profile state from localStorage
    function getProfileData() {
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

        const emailVal = localStorage.getItem("regEmail") || (loggedInUser.includes("@") ? loggedInUser : `${loggedInUser.toLowerCase()}@unifyed.edu`);
        const phoneVal = localStorage.getItem("professorPhone") || "+91 98765 43210";
        const officeVal = localStorage.getItem("professorOffice") || "Room 402, Academic Block B";

        const deptVal = localStorage.getItem("professorDept") || "Computer Science & Engineering";
        const qualVal = localStorage.getItem("professorQual") || "Ph.D. in Computer Science (IIT Delhi)";
        const specVal = localStorage.getItem("professorSpec") || "Artificial Intelligence & Full Stack Web";
        const semVal = localStorage.getItem("professorSem") || "BCA 3rd Sem / B.Tech 5th Sem";

        return {
            displayName,
            loggedInStudentId,
            emailVal,
            phoneVal,
            officeVal,
            deptVal,
            qualVal,
            specVal,
            semVal
        };
    }

    // Populate all fields across cards & hero section
    function renderProfile() {
        const data = getProfileData();

        const profileFullName = document.getElementById("profileFullName");
        const profileEmpId = document.getElementById("profileEmpId");
        const profileHeroDept = document.getElementById("profileHeroDept");

        const profileDetailFullName = document.getElementById("profileDetailFullName");
        const profileDetailEmpId = document.getElementById("profileDetailEmpId");
        const profileDetailEmail = document.getElementById("profileDetailEmail");
        const profileDetailPhone = document.getElementById("profileDetailPhone");
        const profileDetailOffice = document.getElementById("profileDetailOffice");

        const profileDetailDept = document.getElementById("profileDetailDept");
        const profileDetailQual = document.getElementById("profileDetailQual");
        const profileDetailSpec = document.getElementById("profileDetailSpec");
        const profileDetailSem = document.getElementById("profileDetailSem");

        // Hero Card
        if (profileFullName) profileFullName.textContent = data.displayName;
        if (profileEmpId) profileEmpId.textContent = data.loggedInStudentId;
        if (profileHeroDept) profileHeroDept.textContent = data.deptVal.includes("Department") ? data.deptVal : `Department of ${data.deptVal}`;

        // Personal Details Card
        if (profileDetailFullName) profileDetailFullName.textContent = data.displayName;
        if (profileDetailEmpId) profileDetailEmpId.textContent = data.loggedInStudentId;
        if (profileDetailEmail) profileDetailEmail.textContent = data.emailVal;
        if (profileDetailPhone) profileDetailPhone.textContent = data.phoneVal;
        if (profileDetailOffice) profileDetailOffice.textContent = data.officeVal;

        // Academic Details Card
        if (profileDetailDept) profileDetailDept.textContent = data.deptVal;
        if (profileDetailQual) profileDetailQual.textContent = data.qualVal;
        if (profileDetailSpec) profileDetailSpec.textContent = data.specVal;
        if (profileDetailSem) profileDetailSem.textContent = data.semVal;

        // Campus Services Status
        const profileDetailTransport = document.getElementById("profileDetailTransport");
        const profileDetailHostel = document.getElementById("profileDetailHostel");

        if (profileDetailTransport) {
            const usesTransport = localStorage.getItem("usesTransport") === "true";
            profileDetailTransport.textContent = usesTransport ? "✅ Opted (Route #4)" : "❌ Not Opted";
        }

        if (profileDetailHostel) {
            const hostelOpted = localStorage.getItem("hostelEnabled") === "true";
            profileDetailHostel.textContent = hostelOpted ? "✅ Opted (Quarters B-2)" : "❌ Not Opted";
        }
    }

    renderProfile();

    // 1. EDIT PERSONAL & CONTACT DETAILS MODAL
    const openEditPersonalBtn = document.getElementById("openEditPersonalModalBtn") || document.getElementById("openEditProfileModalBtn");
    const editPersonalModal = document.getElementById("editPersonalModal");
    const closeEditPersonalBtn = document.getElementById("closeEditPersonalModalBtn");
    const cancelEditPersonalBtn = document.getElementById("cancelEditPersonalBtn");
    const editPersonalForm = document.getElementById("editPersonalForm");

    const editPersonalName = document.getElementById("editPersonalName");
    const editPersonalEmpId = document.getElementById("editPersonalEmpId");
    const editPersonalEmail = document.getElementById("editPersonalEmail");
    const editPersonalPhone = document.getElementById("editPersonalPhone");
    const editPersonalOffice = document.getElementById("editPersonalOffice");

    if (openEditPersonalBtn && editPersonalModal) {
        openEditPersonalBtn.addEventListener("click", () => {
            const data = getProfileData();
            if (editPersonalName) editPersonalName.value = data.displayName;
            if (editPersonalEmpId) editPersonalEmpId.value = data.loggedInStudentId;
            if (editPersonalEmail) editPersonalEmail.value = data.emailVal;
            if (editPersonalPhone) editPersonalPhone.value = data.phoneVal;
            if (editPersonalOffice) editPersonalOffice.value = data.officeVal;

            editPersonalModal.style.display = "flex";
        });

        if (closeEditPersonalBtn) closeEditPersonalBtn.addEventListener("click", () => editPersonalModal.style.display = "none");
        if (cancelEditPersonalBtn) cancelEditPersonalBtn.addEventListener("click", () => editPersonalModal.style.display = "none");

        if (editPersonalForm) {
            editPersonalForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const newName = editPersonalName.value.trim();
                const newEmpId = editPersonalEmpId.value.trim();
                const newEmail = editPersonalEmail.value.trim();
                const newPhone = editPersonalPhone.value.trim();
                const newOffice = editPersonalOffice.value.trim();

                localStorage.setItem("loggedInUser", newName);
                localStorage.setItem("loggedInStudentId", newEmpId);
                localStorage.setItem("regEmail", newEmail);
                localStorage.setItem("professorPhone", newPhone);
                localStorage.setItem("professorOffice", newOffice);

                const nameParts = newName.split(" ");
                if (nameParts.length > 1) {
                    localStorage.setItem("registeredFirstName", nameParts[0]);
                    localStorage.setItem("registeredLastName", nameParts.slice(1).join(" "));
                } else {
                    localStorage.setItem("registeredFirstName", newName);
                }

                renderProfile();
                editPersonalModal.style.display = "none";
                alert("✓ Personal & Contact details updated successfully!");
            });
        }
    }

    // 2. EDIT ACADEMIC & DEPARTMENT INFO MODAL
    const openEditAcademicBtn = document.getElementById("openEditAcademicModalBtn");
    const editAcademicModal = document.getElementById("editAcademicModal");
    const closeEditAcademicBtn = document.getElementById("closeEditAcademicModalBtn");
    const cancelEditAcademicBtn = document.getElementById("cancelEditAcademicBtn");
    const editAcademicForm = document.getElementById("editAcademicForm");

    const editAcademicDept = document.getElementById("editAcademicDept");
    const editAcademicQual = document.getElementById("editAcademicQual");
    const editAcademicSpec = document.getElementById("editAcademicSpec");
    const editAcademicSem = document.getElementById("editAcademicSem");

    if (openEditAcademicBtn && editAcademicModal) {
        openEditAcademicBtn.addEventListener("click", () => {
            const data = getProfileData();
            if (editAcademicDept) editAcademicDept.value = data.deptVal;
            if (editAcademicQual) editAcademicQual.value = data.qualVal;
            if (editAcademicSpec) editAcademicSpec.value = data.specVal;
            if (editAcademicSem) editAcademicSem.value = data.semVal;

            editAcademicModal.style.display = "flex";
        });

        if (closeEditAcademicBtn) closeEditAcademicBtn.addEventListener("click", () => editAcademicModal.style.display = "none");
        if (cancelEditAcademicBtn) cancelEditAcademicBtn.addEventListener("click", () => editAcademicModal.style.display = "none");

        if (editAcademicForm) {
            editAcademicForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const newDept = editAcademicDept.value.trim();
                const newQual = editAcademicQual.value.trim();
                const newSpec = editAcademicSpec.value.trim();
                const newSem = editAcademicSem.value.trim();

                localStorage.setItem("professorDept", newDept);
                localStorage.setItem("professorQual", newQual);
                localStorage.setItem("professorSpec", newSpec);
                localStorage.setItem("professorSem", newSem);

                renderProfile();
                editAcademicModal.style.display = "none";
                alert("✓ Academic & Departmental information updated successfully!");
            });
        }
    }

    // 3. IMAGE UPLOADS: PROFILE AVATAR PHOTO & COVER BACKGROUND IMAGE
    const changeAvatarBtn = document.getElementById("changeAvatarBtn");
    const avatarFileInput = document.getElementById("avatarFileInput");
    const profileAvatarPic = document.getElementById("profileAvatarPic");

    const changeCoverBtn = document.getElementById("changeCoverBtn");
    const coverFileInput = document.getElementById("coverFileInput");
    const profileCoverBanner = document.getElementById("profileCoverBanner");

    // Restore saved images from localStorage
    const savedAvatar = localStorage.getItem("faculty_avatar_image");
    if (savedAvatar && profileAvatarPic) {
        profileAvatarPic.src = savedAvatar;
    }

    const savedCover = localStorage.getItem("faculty_cover_image");
    if (savedCover && profileCoverBanner) {
        profileCoverBanner.style.backgroundImage = `linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(168, 85, 247, 0.45) 50%, rgba(16, 185, 129, 0.35) 100%), url('${savedCover}')`;
    }

    // Avatar Upload Handler
    if (changeAvatarBtn && avatarFileInput) {
        changeAvatarBtn.addEventListener("click", () => avatarFileInput.click());

        avatarFileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const dataUrl = evt.target.result;
                    if (profileAvatarPic) profileAvatarPic.src = dataUrl;
                    localStorage.setItem("faculty_avatar_image", dataUrl);

                    // Also update header profile avatar if present
                    const headerAvatars = document.querySelectorAll(".profile-avatar");
                    headerAvatars.forEach(img => {
                        if (img.tagName === 'IMG') img.src = dataUrl;
                    });

                    alert("📸 Profile photo updated successfully!");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Cover Upload Handler
    if (changeCoverBtn && coverFileInput) {
        changeCoverBtn.addEventListener("click", () => coverFileInput.click());

        coverFileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const dataUrl = evt.target.result;
                    if (profileCoverBanner) {
                        profileCoverBanner.style.backgroundImage = `linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(168, 85, 247, 0.45) 50%, rgba(16, 185, 129, 0.35) 100%), url('${dataUrl}')`;
                    }
                    localStorage.setItem("faculty_cover_image", dataUrl);
                    alert("🖼️ Cover background image updated successfully!");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Modal overlay click close
    window.addEventListener("click", (e) => {
        if (editPersonalModal && e.target === editPersonalModal) editPersonalModal.style.display = "none";
        if (editAcademicModal && e.target === editAcademicModal) editAcademicModal.style.display = "none";
    });
});