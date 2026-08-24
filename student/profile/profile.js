
            document.addEventListener("DOMContentLoaded", () => {
                // Fallback default configurations
                const defaultPhone = "**********";
                const defaultGuardian = "+91 94140 XXXXX";
                const defaultAddress = "104, Mansarovar, Jaipur 302020";
                
                // Set headers
                function updateHeaders() {
                    const loggedInName = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const loggedInId = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    
                    const nameHeader = document.getElementById("profileStudentName");
                    const enrollHeader = document.getElementById("profileStudentEnrollment");
                    const cardName = document.getElementById("idCardName");
                    const cardEnroll = document.getElementById("idCardEnroll");

                    if (nameHeader) nameHeader.textContent = loggedInName;
                    if (enrollHeader) enrollHeader.textContent = "Enrollment: " + loggedInId + " • Section AI-1";
                    if (cardName) cardName.textContent = loggedInName;
                    if (cardEnroll) cardEnroll.textContent = loggedInId;
                }

                // Load editable parameters
                function loadParams() {
                    updateHeaders();

                    // Personal details
                    const name = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const phone = localStorage.getItem("prof_phone") || defaultPhone;
                    const dob = localStorage.getItem("prof_dob") || "15-08-2004";
                    const blood = localStorage.getItem("prof_blood") || "O+";
                    const father = localStorage.getItem("prof_father") || "Shri R. K. Kumawat";
                    const mother = localStorage.getItem("prof_mother") || "Smt. Kamala Devi";
                    const guardian = localStorage.getItem("prof_guardian") || defaultGuardian;
                    const address = localStorage.getItem("prof_address") || defaultAddress;

                    // Academic details
                    const enroll = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    const roll = localStorage.getItem("prof_roll") || "BCA23015";
                    const course = localStorage.getItem("prof_course") || "BCA";
                    const sem = localStorage.getItem("prof_sem") || "3";
                    const dept = localStorage.getItem("prof_dept") || "Computer Application";
                    const year = localStorage.getItem("prof_year") || "2026-27";
                    const busRoute = localStorage.getItem("prof_bus") || "Route No. 12 (Mansarovar)";
                    const hostel = localStorage.getItem("hostelAllotted") || "NO";
                    const allergy = localStorage.getItem("prof_allergy") || "None";

                    // Bind inputs
                    const nameInput = document.getElementById("profileNameInput");
                    const phoneInput = document.getElementById("profilePhoneInput");
                    const dobInput = document.getElementById("profileDobInput");
                    const bloodSelect = document.getElementById("profileBloodSelect");
                    const fatherInput = document.getElementById("profileFatherInput");
                    const motherInput = document.getElementById("profileMotherInput");
                    const guardianInput = document.getElementById("profileGuardianInput");
                    const addressInput = document.getElementById("profileAddressInput");

                    const enrollInput = document.getElementById("profileEnrollInput");
                    const rollInput = document.getElementById("profileRollInput");
                    const courseInput = document.getElementById("profileCourseInput");
                    const semInput = document.getElementById("profileSemInput");
                    const deptInput = document.getElementById("profileDeptInput");
                    const yearInput = document.getElementById("profileYearInput");
                    const busInput = document.getElementById("profileBusInput");
                    const hostelSelect = document.getElementById("profileHostelSelect");
                    const allergyInput = document.getElementById("profileAllergyInput");

                    if (nameInput) nameInput.value = name;
                    if (phoneInput) phoneInput.value = phone;
                    if (dobInput) dobInput.value = dob;
                    if (bloodSelect) bloodSelect.value = blood;
                    if (fatherInput) fatherInput.value = father;
                    if (motherInput) motherInput.value = mother;
                    if (guardianInput) guardianInput.value = guardian;
                    if (addressInput) addressInput.value = address;

                    if (enrollInput) enrollInput.value = enroll;
                    if (rollInput) rollInput.value = roll;
                    if (courseInput) courseInput.value = course;
                    if (semInput) semInput.value = sem;
                    if (deptInput) deptInput.value = dept;
                    if (yearInput) yearInput.value = year;
                    if (busInput) busInput.value = busRoute;
                    if (hostelSelect) hostelSelect.value = hostel;
                    if (allergyInput) allergyInput.value = allergy;

                    // Bind Card Front Spans
                    const cardName = document.getElementById("idCardName");
                    const cardEnroll = document.getElementById("idCardEnroll");
                    const cardRoll = document.getElementById("idCardRoll");
                    const cardCourse = document.getElementById("idCardCourse");
                    const cardSem = document.getElementById("idCardSem");
                    const cardBlood = document.getElementById("idCardBlood");
                    const cardDob = document.getElementById("idCardDob");
                    const cardPhone = document.getElementById("idCardPhone");
                    const cardDept = document.getElementById("idCardDept");
                    const cardYear = document.getElementById("idCardYear");
                    const cardSigName = document.getElementById("idCardSigName");

                    if (cardName) cardName.textContent = name;
                    if (cardEnroll) cardEnroll.textContent = enroll;
                    if (cardRoll) cardRoll.textContent = roll;
                    if (cardCourse) cardCourse.textContent = course;
                    if (cardDob) cardDob.textContent = dob;
                    if (cardPhone) cardPhone.textContent = phone;
                    if (cardDept) cardDept.textContent = dept;
                    if (cardYear) cardYear.textContent = year;
                    
                    const firstWord = name.split(' ')[0];
                    if (cardSigName) cardSigName.textContent = firstWord;

                    // Bind Card Back Spans
                    const cardFather = document.getElementById("idCardFather");
                    const cardMother = document.getElementById("idCardMother");
                    const cardEmergencyNo = document.getElementById("idCardEmergencyNo");
                    const cardAddress = document.getElementById("idCardStudentAddress");
                    const cardBus = document.getElementById("idCardBus");
                    const cardHostel = document.getElementById("idCardHostel");
                    const cardMedical = document.getElementById("idCardMedical");

                    if (cardFather) cardFather.textContent = ": " + father;
                    if (cardMother) cardMother.textContent = ": " + mother;
                    if (cardEmergencyNo) cardEmergencyNo.textContent = ": " + guardian;
                    if (cardAddress) cardAddress.textContent = address;
                    if (cardBus) cardBus.textContent = ": " + busRoute;
                    if (cardHostel) cardHostel.textContent = ": " + hostel;
                    if (cardMedical) cardMedical.textContent = `: Allergy: ${allergy}`;

                    // Update QR verification code dynamically
                    updateIdCardQrCode();
                    loadStudentPhoto();
                }

                function updateIdCardQrCode() {
                    const name = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const enroll = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    const roll = localStorage.getItem("prof_roll") || "BCA23015";
                    const course = localStorage.getItem("prof_course") || "BCA";
                    const sem = localStorage.getItem("prof_sem") || "3";
                    const blood = localStorage.getItem("prof_blood") || "O+";
                    const dob = localStorage.getItem("prof_dob") || "15-08-2004";
                    const phone = localStorage.getItem("prof_phone") || "**********";
                    const dept = localStorage.getItem("prof_dept") || "Computer Application";
                    const year = localStorage.getItem("prof_year") || "2026-27";
                    
                    const father = localStorage.getItem("prof_father") || "Shri R. K. Kumawat";
                    const mother = localStorage.getItem("prof_mother") || "Smt. Kamala Devi";
                    const emergencyNo = localStorage.getItem("prof_guardian") || "+91 94140 XXXXX";
                    const address = localStorage.getItem("prof_address") || "104, Mansarovar, Jaipur 302020";
                    const busRoute = localStorage.getItem("prof_bus") || "Route No. 12 (Mansarovar)";
                    const hostel = localStorage.getItem("hostelAllotted") || "NO";
                    const allergy = localStorage.getItem("prof_allergy") || "None";
                    
                    let verifyUrl = 'http://localhost:5500/student/profile/verify-card.html';
                    if (window.location.protocol.startsWith('http')) {
                        const pathParts = window.location.pathname.split('/');
                        pathParts[pathParts.length - 1] = 'verify-card.html';
                        verifyUrl = window.location.origin + pathParts.join('/');
                    }
                    verifyUrl += '?name=' + encodeURIComponent(name) +
                                 '&id=' + encodeURIComponent(enroll) +
                                 '&roll=' + encodeURIComponent(roll) +
                                 '&course=' + encodeURIComponent(course) +
                                 '&semester=' + encodeURIComponent(sem) +
                                 '&blood=' + encodeURIComponent(blood) +
                                 '&dob=' + encodeURIComponent(dob) +
                                 '&phone=' + encodeURIComponent(phone) +
                                 '&dept=' + encodeURIComponent(dept) +
                                 '&year=' + encodeURIComponent(year) +
                                 '&father=' + encodeURIComponent(father) +
                                 '&mother=' + encodeURIComponent(mother) +
                                 '&emergNo=' + encodeURIComponent(emergencyNo) +
                                 '&address=' + encodeURIComponent(address) +
                                 '&busRoute=' + encodeURIComponent(busRoute) +
                                 '&hostel=' + encodeURIComponent(hostel) +
                                 '&allergy=' + encodeURIComponent(allergy);

                    if (typeof QRious !== 'undefined') {
                        new QRious({
                            element: document.getElementById('idCardQrCanvas'),
                            value: verifyUrl,
                            size: 150
                        });
                        new QRious({
                            element: document.getElementById('modalQrCanvas'),
                            value: verifyUrl,
                            size: 300
                        });
                    }
                }

                window.showQrModal = function() {
                    const modal = document.getElementById("qrCodeModal");
                    if (modal) modal.style.display = "flex";
                };

                window.hideQrModal = function() {
                    const modal = document.getElementById("qrCodeModal");
                    if (modal) modal.style.display = "none";
                };

                loadParams();

                window.switchProfileTab = function(tab) {
                    const personalBtn = document.getElementById("tabPersonalBtn");
                    const academicBtn = document.getElementById("tabAcademicBtn");
                    const personalSec = document.getElementById("personalSection");
                    const academicSec = document.getElementById("academicSection");

                    if (tab === "personal") {
                        if (personalBtn) personalBtn.classList.add("active");
                        if (academicBtn) academicBtn.classList.remove("active");
                        if (personalSec) personalSec.style.display = "flex";
                        if (academicSec) academicSec.style.display = "none";
                    } else {
                        if (academicBtn) academicBtn.classList.add("active");
                        if (personalBtn) personalBtn.classList.remove("active");
                        if (academicSec) academicSec.style.display = "flex";
                        if (personalSec) personalSec.style.display = "none";
                    }
                };

                // Flip handler
                let isFlipped = false;
                window.flipIdentityCard = function() {
                    const inner = document.getElementById("idCardInner");
                    if (!inner) return;
                    isFlipped = !isFlipped;
                    inner.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
                };

                window.downloadStudentIdCard = function() {
                    const name = localStorage.getItem("loggedInUser") || "Vikram Kumawat";
                    const enroll = localStorage.getItem("loggedInStudentId") || "ST20260001";
                    const roll = localStorage.getItem("prof_roll") || "BCA23015";
                    const course = localStorage.getItem("prof_course") || "BCA";
                    const dob = localStorage.getItem("prof_dob") || "15-08-2004";
                    const phone = localStorage.getItem("prof_phone") || "**********";
                    const dept = localStorage.getItem("prof_dept") || "Computer Application";
                    const year = localStorage.getItem("prof_year") || "2026-27";
                    
                    const father = localStorage.getItem("prof_father") || "Shri R. K. Kumawat";
                    const mother = localStorage.getItem("prof_mother") || "Smt. Kamala Devi";
                    const emergencyNo = localStorage.getItem("prof_guardian") || "+91 94140 XXXXX";
                    const address = localStorage.getItem("prof_address") || "104, Mansarovar, Jaipur 302020";

                    const canvas = document.createElement('canvas');
                    canvas.width = 1240;
                    canvas.height = 1754;
                    const ctx = canvas.getContext('2d');

                    // Draw clean white background
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw elegant blue border around A4
                    ctx.strokeStyle = '#1e3a8a';
                    ctx.lineWidth = 15;
                    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

                    // Header Banner
                    ctx.fillStyle = '#1e293b';
                    ctx.fillRect(40, 40, canvas.width - 80, 100);

                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 28px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('UNIVERSITY OF ENGINEERING & MANAGEMENT, JAIPUR', canvas.width / 2, 95);
                    ctx.font = '16px sans-serif';
                    ctx.fillStyle = '#fcd34d';
                    ctx.fillText('OFFICIAL STUDENT RECORD • VERIFIED ID CARD PRINT PORTAL', canvas.width / 2, 125);

                    // Draw Front Label
                    ctx.fillStyle = '#0f172a';
                    ctx.font = 'bold 20px sans-serif';
                    ctx.fillText('[ CARD FRONT SIDE ]', canvas.width / 2, 190);

                    // Function to draw card face
                    function drawCardFace(x, y, w, h, isBack) {
                        const grad = ctx.createLinearGradient(x, y, x + w, y + h);
                        if (isBack) {
                            grad.addColorStop(0, '#0f172a');
                            grad.addColorStop(1, '#1e3a8a');
                        } else {
                            grad.addColorStop(0, '#1e3a8a');
                            grad.addColorStop(1, '#0f172a');
                        }
                        ctx.fillStyle = grad;
                        ctx.beginPath();
                        ctx.roundRect(x, y, w, h, 20);
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                        ctx.lineWidth = 2;
                        ctx.stroke();

                        if (!isBack) {
                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 16px sans-serif';
                            ctx.fillText('UNIVERSITY OF ENGINEERING & MANAGEMENT', x + w / 2, y + 45);
                            ctx.fillStyle = '#10b981';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('STUDENT ID CARD', x + w / 2, y + 65);

                            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(x + 20, y + 80);
                            ctx.lineTo(x + w - 20, y + 80);
                            ctx.stroke();

                            const photoX = x + w / 2 - 60;
                            const photoY = y + 100;
                            const photoW = 120;
                            const photoH = 130;
                            ctx.fillStyle = 'rgba(255,255,255,0.05)';
                            ctx.fillRect(photoX, photoY, photoW, photoH);
                            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                            ctx.strokeRect(photoX, photoY, photoW, photoH);

                            const photo = localStorage.getItem("studentPhoto");
                            if (photo) {
                                const img = new Image();
                                img.src = photo;
                                try {
                                    ctx.drawImage(img, photoX + 2, photoY + 2, photoW - 4, photoH - 4);
                                } catch (e) {
                                    drawUserIcon(ctx, photoX + photoW / 2, photoY + photoH / 2);
                                }
                            } else {
                                drawUserIcon(ctx, photoX + photoW / 2, photoY + photoH / 2);
                            }

                            ctx.textAlign = 'left';
                            let gridY = y + 270;
                            const rowGap = 30;

                            const frontFields = [
                                { label: 'Name', val: name },
                                { label: 'Student ID', val: enroll },
                                { label: 'Roll Number', val: roll },
                                { label: 'Course', val: course },
                                { label: 'DOB', val: dob },
                                { label: 'Mobile', val: phone },
                                { label: 'Department', val: dept },
                                { label: 'Academic Year', val: year }
                            ];

                            frontFields.forEach(f => {
                                ctx.fillStyle = '#fcd34d';
                                ctx.font = 'bold 14px sans-serif';
                                ctx.fillText(f.label, x + 30, gridY);
                                ctx.fillStyle = '#ffffff';
                                ctx.fillText(':', x + 160, gridY);
                                ctx.fillText(f.val, x + 185, gridY);
                                gridY += rowGap;
                            });

                            const qrCanvas = document.getElementById('idCardQrCanvas');
                            if (qrCanvas) {
                                ctx.drawImage(qrCanvas, x + 30, y + h - 100, 75, 75);
                            }

                            const firstWord = name.split(' ')[0];
                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'italic 18px Georgia';
                            ctx.fillText(firstWord, x + w - 150, y + h - 55);
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.beginPath();
                            ctx.moveTo(x + w - 180, y + h - 45);
                            ctx.lineTo(x + w - 30, y + h - 45);
                            ctx.stroke();
                            ctx.font = '10px sans-serif';
                            ctx.fillStyle = '#94a3b8';
                            ctx.fillText('Student Signature', x + w - 145, y + h - 30);

                        } else {
                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 14px sans-serif';
                            ctx.fillText('STUDENT ID CARD (BACK)', x + w / 2, y + 35);
                            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                            ctx.beginPath();
                            ctx.moveTo(x + 20, y + 45);
                            ctx.lineTo(x + w - 20, y + 45);
                            ctx.stroke();

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('Emergency Contact', x + 30, y + 75);
                            let subY = y + 105;
                            const backFields1 = [
                                { label: 'Father Name', val: father },
                                { label: 'Mother Name', val: mother },
                                { label: 'Emergency No', val: emergencyNo }
                            ];
                            backFields1.forEach(f => {
                                ctx.fillStyle = '#fcd34d';
                                ctx.font = 'bold 11px sans-serif';
                                ctx.fillText(f.label, x + 40, subY);
                                ctx.fillStyle = '#ffffff';
                                ctx.fillText(': ' + f.val, x + 160, subY);
                                subY += 22;
                            });

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('Address', x + 30, y + 200);
                            ctx.font = '11px sans-serif';
                            ctx.fillText(address, x + 40, y + 225);

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'bold 12px sans-serif';
                            ctx.fillText('College Contact', x + 30, y + 275);
                            ctx.font = '11px sans-serif';
                            ctx.fillStyle = '#ffffff';
                            ctx.fillText('Website : www.unifyed.edu', x + 40, y + 300);
                            ctx.fillText('Email : admissions@unifyed.edu', x + 40, y + 320);
                            ctx.fillText('Phone : +91 141 2345678', x + 40, y + 340);

                            ctx.fillStyle = '#ffffff';
                            ctx.font = 'italic 16px Georgia';
                            ctx.fillText('UnifyEd Registrar', x + w - 160, y + h - 65);
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.beginPath();
                            ctx.moveTo(x + w - 180, y + h - 55);
                            ctx.lineTo(x + w - 30, y + h - 55);
                            ctx.stroke();
                            ctx.font = '10px sans-serif';
                            ctx.fillStyle = '#94a3b8';
                            ctx.fillText('Authorized Signature', x + w - 150, y + h - 40);
                        }
                    }

                    function drawUserIcon(c, cx, cy) {
                        c.fillStyle = '#6366f1';
                        c.beginPath();
                        c.arc(cx, cy - 15, 25, 0, Math.PI * 2);
                        c.fill();
                        c.beginPath();
                        c.arc(cx, cy + 40, 45, Math.PI, 0);
                        c.fill();
                    }

                    drawCardFace(370, 220, 500, 750, false);
                    ctx.fillStyle = '#0f172a';
                    ctx.font = 'bold 20px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('[ CARD BACK SIDE ]', canvas.width / 2, 1020);
                    drawCardFace(370, 1050, 500, 630, true);

                    setTimeout(() => {
                        const link = document.createElement('a');
                        link.download = `Student_ID_${enroll}.png`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                    }, 150);
                };

                window.saveProfileChanges = function() {
                    // Extract fields
                    const name = document.getElementById("profileNameInput").value.trim();
                    const phone = document.getElementById("profilePhoneInput").value.trim();
                    const dob = document.getElementById("profileDobInput").value.trim();
                    const blood = document.getElementById("profileBloodSelect").value;
                    const father = document.getElementById("profileFatherInput").value.trim();
                    const mother = document.getElementById("profileMotherInput").value.trim();
                    const guardian = document.getElementById("profileGuardianInput").value.trim();
                    const address = document.getElementById("profileAddressInput").value.trim();

                    const enroll = document.getElementById("profileEnrollInput").value.trim();
                    const roll = document.getElementById("profileRollInput").value.trim();
                    const course = document.getElementById("profileCourseInput").value.trim();
                    const sem = document.getElementById("profileSemInput").value.trim();
                    const dept = document.getElementById("profileDeptInput").value.trim();
                    const year = document.getElementById("profileYearInput").value.trim();
                    const busRoute = document.getElementById("profileBusInput").value.trim();
                    const hostel = document.getElementById("profileHostelSelect").value;
                    const allergy = document.getElementById("profileAllergyInput").value.trim();

                    if (!name || !phone || !address || !enroll || !roll) {
                        alert("Error: Name, Student ID, Roll Number, Phone, and Address are required!");
                        return;
                    }

                    // Save Personal
                    localStorage.setItem("loggedInUser", name);
                    localStorage.setItem("prof_phone", phone);
                    localStorage.setItem("prof_dob", dob);
                    localStorage.setItem("prof_blood", blood);
                    localStorage.setItem("prof_father", father);
                    localStorage.setItem("prof_mother", mother);
                    localStorage.setItem("prof_guardian", guardian);
                    localStorage.setItem("prof_address", address);

                    // Save Academic
                    localStorage.setItem("loggedInStudentId", enroll);
                    localStorage.setItem("prof_roll", roll);
                    localStorage.setItem("prof_course", course);
                    localStorage.setItem("prof_sem", sem);
                    localStorage.setItem("prof_dept", dept);
                    localStorage.setItem("prof_year", year);
                    localStorage.setItem("prof_bus", busRoute);
                    localStorage.setItem("hostelAllotted", hostel);
                    localStorage.setItem("prof_allergy", allergy);

                    loadParams();

                    // Sync header display elements immediately
                    const headerStrong = document.querySelector(".user-profile-widget .details strong");
                    if (headerStrong) headerStrong.textContent = name;

                    alert("All profile details & card registry updated successfully!");
                };

                // Photo upload handlers
                window.triggerPhotoUpload = function() {
                    const input = document.getElementById("profilePhotoFileInput");
                    if (input) input.click();
                };

                window.handlePhotoSelected = function(e) {
                    const file = e.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        const base64 = evt.target.result;
                        localStorage.setItem("studentPhoto", base64);
                        loadStudentPhoto();
                        alert("Profile photo successfully updated!");
                    };
                    reader.readAsDataURL(file);
                };

                function loadStudentPhoto() {
                    const photo = localStorage.getItem("studentPhoto");
                    const profImg = document.getElementById("profileAvatarImg");
                    const profIcon = document.getElementById("profileAvatarIcon");
                    const idImg = document.getElementById("idCardAvatarImg");
                    const idIcon = document.getElementById("idCardAvatarIcon");

                    if (photo) {
                        if (profImg) { profImg.src = photo; profImg.style.display = "block"; }
                        if (profIcon) { profIcon.style.display = "none"; }
                        if (idImg) { idImg.src = photo; idImg.style.display = "block"; }
                        if (idIcon) { idIcon.style.display = "none"; }
                    } else {
                        if (profImg) { profImg.style.display = "none"; }
                        if (profIcon) { profIcon.style.display = "block"; }
                        if (idImg) { idImg.style.display = "none"; }
                        if (idIcon) { idIcon.style.display = "block"; }
                    }
                }
            });
        