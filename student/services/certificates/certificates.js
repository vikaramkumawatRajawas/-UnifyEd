
            document.addEventListener("DOMContentLoaded", () => {
                let currentCertTitle = "";
                let genSteps = [
                    { pct: 25, label: "Validating student registration parameters..." },
                    { pct: 55, label: "Checking outstanding clearance registers..." },
                    { pct: 85, label: "Signing digital credentials with UnifyEd Registrar credentials..." },
                    { pct: 100, label: "Compiling e-Certificate secure PDF..." }
                ];

                window.triggerCertGeneration = function(title, code) {
                    currentCertTitle = title;

                    const modal = document.getElementById("certGenModal");
                    const spinner = document.getElementById("certGenSpinner");
                    const preview = document.getElementById("certGenPreview");
                    const closeBtn = document.getElementById("certCloseBtn");
                    const progressBar = document.getElementById("certProgressBar");
                    const statusHeader = document.getElementById("certStatusHeader");
                    const stepLabel = document.getElementById("certStepLabel");

                    if (!modal) return;

                    modal.style.display = "flex";
                    if (spinner) spinner.style.display = "block";
                    if (preview) preview.style.display = "none";
                    if (closeBtn) closeBtn.style.display = "none";
                    if (progressBar) progressBar.style.width = "0%";

                    let stepIndex = 0;
                    function runGenStep() {
                        if (stepIndex < genSteps.length) {
                            const step = genSteps[stepIndex];
                            if (progressBar) progressBar.style.width = step.pct + "%";
                            if (statusHeader) statusHeader.textContent = step.label;
                            if (stepLabel) stepLabel.textContent = "Step " + (stepIndex + 1) + " of " + genSteps.length;
                            stepIndex++;
                            setTimeout(runGenStep, 600);
                        } else {
                            if (spinner) spinner.style.display = "none";
                            if (preview) {
                                preview.style.display = "block";
                                document.getElementById("previewCertTitle").textContent = currentCertTitle;
                                document.getElementById("previewCertDate").textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                            }
                            if (closeBtn) closeBtn.style.display = "block";
                        }
                    }

                    setTimeout(runGenStep, 400);
                };

                window.closeCertModal = function() {
                    const modal = document.getElementById("certGenModal");
                    if (modal) modal.style.display = "none";
                };

                window.downloadCompiledCertFile = function() {
                    alert("Downloading compiled credentials vault PDF: " + currentCertTitle + "...");
                    closeCertModal();
                };
            });
        