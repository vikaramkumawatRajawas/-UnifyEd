// Department Data for dynamic modal injection
const departmentData = {
    cs: {
        title: "Computer Science & Engineering",
        icon: "fa-laptop-code",
        description: "The Department of Computer Science & Engineering (CSE) aims to produce global engineers with specialized expertise in advanced computing sciences. The curriculum is designed in alignment with standard technological recommendations.",
        details: [
            "<strong>Key Focus Areas:</strong> Artificial Intelligence, Machine Learning, Cybersecurity, Cloud Architecture, Full Stack Web Engineering.",
            "<strong>Intake Capacity:</strong> 180 Students per Year.",
            "<strong>Lab Infrastructure:</strong> AI Research Lab, High-Performance Computing Center, Cyber Security Simulation Lab.",
            "<strong>Prominent Recruiters:</strong> Google, Microsoft, Amazon, Meta, Accenture."
        ]
    },
    mech: {
        title: "Mechanical Engineering",
        icon: "fa-gears",
        description: "The Department of Mechanical Engineering combines traditional core engineering principles with advanced modern automation. Students engage in practical hands-on building projects.",
        details: [
            "<strong>Key Focus Areas:</strong> Robotics, CAD/CAM Design, Automobile Dynamics, Thermodynamics, Materials Engineering.",
            "<strong>Intake Capacity:</strong> 120 Students per Year.",
            "<strong>Lab Infrastructure:</strong> Automation and Robotics Lab, CNC Machining Lab, Fluid Mechanics Lab.",
            "<strong>Prominent Recruiters:</strong> Tata Motors, Tesla, General Electric, Larsen & Toubro."
        ]
    },
    civil: {
        title: "Civil Engineering",
        icon: "fa-trowel-bricks",
        description: "The Department of Civil Engineering nurtures future structural engineers capable of designing resilient infrastructures. We emphasize sustainable development and smart city initiatives.",
        details: [
            "<strong>Key Focus Areas:</strong> Structural Analysis, Geotechnical Engineering, Transportation Systems, Smart Cities, Surveying.",
            "<strong>Intake Capacity:</strong> 60 Students per Year.",
            "<strong>Lab Infrastructure:</strong> Concrete Testing Lab, Structural Dynamics Lab, GPS/GIS Surveying Laboratory.",
            "<strong>Prominent Recruiters:</strong> L&T Infra, DLF, Shapoorji Pallonji, Afcons."
        ]
    },
    electrical: {
        title: "Electrical & Electronics Engineering",
        icon: "fa-bolt-lightning",
        description: "The Department of EEE focuses on energy generation, storage, and circuit design. With state-of-the-art power grids, students learn green technology design.",
        details: [
            "<strong>Key Focus Areas:</strong> Smart Grids, Renewable Energy Systems, Control Systems, IoT Devices, Microprocessors.",
            "<strong>Intake Capacity:</strong> 90 Students per Year.",
            "<strong>Lab Infrastructure:</strong> Renewable Energy Lab, Power Electronics Lab, Microcontroller Simulation Lab.",
            "<strong>Prominent Recruiters:</strong> Siemens, Intel, ABB, Schneider Electric."
        ]
    },
    bba: {
        title: "Department of Business Administration (BBA)",
        icon: "fa-graduation-cap",
        description: "The BBA department is committed to creating next-generation business administrators, managers, and entrepreneurs. Our focus is on practical business management skills.",
        details: [
            "<strong>Key Focus Areas:</strong> Business Administration, Marketing, Finance & Accounts, Human Resource Management.",
            "<strong>Intake Capacity:</strong> 120 Students per Year.",
            "<strong>Lab Infrastructure:</strong> Management Case Analysis Lab, Corporate Communication Hub.",
            "<strong>Prominent Recruiters:</strong> Deloitte, Amazon, EY, KPMG, banks."
        ]
    },
    bpt: {
        title: "Department of Physiotherapy (BPT)",
        icon: "fa-kit-medical",
        description: "The BPT department focuses on clinical and practical knowledge of physical therapy, muscle rehabilitation, structure of human anatomy, and therapeutic treatment procedures.",
        details: [
            "<strong>Key Focus Areas:</strong> Anatomy & Physiology, Electrotherapy, Rehabilitation Sciences, Orthopedic & Sports Physiotherapy.",
            "<strong>Intake Capacity:</strong> 60 Students per Year.",
            "<strong>Lab Infrastructure:</strong> Anatomy Museum, Electrotherapy Lab, Kinesiotherapy Exercise Lab.",
            "<strong>Prominent Recruiters:</strong> Max Hospitals, Fortis Healthcare, Sports Rehabilitation Centers, Apollo."
        ]
    },
    management: {
        title: "Department of Management Studies",
        icon: "fa-briefcase",
        description: "Offering premium UG and PG courses, the Management Studies department builds leaders equipped with critical thinking and strategic foresight.",
        details: [
            "<strong>Key Focus Areas:</strong> Business Analytics, Digital Marketing, Human Resource Management, Operations Strategy.",
            "<strong>Intake Capacity:</strong> 120 Students per Year.",
            "<strong>Lab Infrastructure:</strong> Business Communication Lab, Analytics & Data Visualization Hub.",
            "<strong>Prominent Recruiters:</strong> McKinsey & Company, Boston Consulting Group, Unilever, Amazon."
        ]
    },
    ece: {
        title: "Department of Electronics & Communication",
        icon: "fa-microchip",
        description: "The ECE Department specializes in hardware systems, wireless connectivity, and semiconductor design. We prepare students for industry roles in network engineering, VLSI design, and telecommunication.",
        details: [
            "<strong>Key Focus Areas:</strong> VLSI Design, Digital Signal Processing, IoT Systems, Cellular Networks, Embedded Coding.",
            "<strong>Intake Capacity:</strong> 120 Students per Year.",
            "<strong>Lab Infrastructure:</strong> VLSI Testing Suite, Microprocessors & Microcontrollers Lab, Wireless Antenna Lab.",
            "<strong>Prominent Recruiters:</strong> Intel, Qualcomm, Texas Instruments, Samsung, Cisco."
        ]
    },
    basic_sciences: {
        title: "Department of Basic Sciences & Humanities",
        icon: "fa-flask",
        description: "The Basic Sciences Department serves as the academic foundation for all engineering streams, providing foundational courses in mathematics, physics, chemistry, and professional ethics.",
        details: [
            "<strong>Key Focus Areas:</strong> Applied Mathematical Modeling, Material Physics, Industrial Chemistry, Communication Skills.",
            "<strong>Intake Capacity:</strong> Foundation for all 1st Year Students.",
            "<strong>Lab Infrastructure:</strong> Physics Lab, Chemistry Lab, Digital Language Communication Suite.",
            "<strong>Prominent Recruiters:</strong> Research organizations, scientific journals, academic institutions."
        ]
    }
};

let lightboxZoomLevel = 1.0;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = mobileMenuBtn.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.className = "fa-solid fa-xmark";
        } else {
            icon.className = "fa-solid fa-bars";
        }
    });

    // Close menu when clicking nav link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            mobileMenuBtn.querySelector("i").className = "fa-solid fa-bars";
        });
    });

    // 2. Dark / Light Theme Toggle
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const currentTheme = localStorage.getItem("theme") || "dark";

    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggleBtn.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // 3. Stats Counter Animation on Viewport Enter
    const statsSection = document.getElementById("stats");
    const statNumbers = document.querySelectorAll(".stat-number");
    let animated = false;

    const startCounting = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"), 10);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easeProgress * target);
                
                if (target >= 1000) {
                    stat.textContent = currentValue.toLocaleString();
                } else {
                    stat.textContent = currentValue;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target >= 1000 ? target.toLocaleString() : target;
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    if ('IntersectionObserver' in window && statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    startCounting();
                    animated = true;
                    observer.unobserve(statsSection);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(statsSection);
    } else {
        // Fallback if IntersectionObserver is not supported
        startCounting();
    }

    // 4. Gallery Search & Category Filter
    const gallerySearchInput = document.getElementById("gallerySearchInput");
    const galleryFilters = document.querySelectorAll(".gallery-filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    const filterGallery = () => {
        const searchQuery = gallerySearchInput.value.toLowerCase().trim();
        const activeFilterBtn = document.querySelector(".gallery-filter-btn.active");
        const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";

        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            const itemTitle = item.getAttribute("data-title").toLowerCase();

            const matchesCategory = (selectedCategory === "all" || itemCategory === selectedCategory);
            const matchesSearch = itemTitle.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    };

    // Filter Buttons Click
    galleryFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            galleryFilters.forEach(f => f.classList.remove("active"));
            btn.classList.add("active");
            filterGallery();
        });
    });

    // Search Keyup
    if (gallerySearchInput) {
        gallerySearchInput.addEventListener("input", filterGallery);
    }

    // 5. Gallery Lightbox Launcher
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const title = item.querySelector("h4").textContent;
            const img = item.querySelector(".gallery-image-element");
            if (img) {
                openLightbox(title, null, null, img.getAttribute("src"));
            } else {
                const placeholder = item.querySelector(".gallery-img-placeholder");
                const placeholderClass = placeholder.className.split(" ").find(c => c.startsWith("g-bg-"));
                const iconClass = placeholder.querySelector("i").className;
                openLightbox(title, placeholderClass, iconClass, null);
            }
        });
    });

    // 6. Page routing based on hash navigation
    const sections = document.querySelectorAll("section");
    const routeMapping = {
        "#overview": ["hero", "stats", "facilities", "news-events", "testimonials", "faq"],
        "#about": ["about", "alumni", "research"],
        "#departments": ["departments"],
        "#courses": ["courses"],
        "#gallery": ["gallery", "tour"],
        "#placements": ["placements", "erp-features"],
        "#erp-features": ["placements", "erp-features"],
        "#contact": ["contact"]
    };

    const handleRouting = () => {
        const hash = window.location.hash || "#overview";
        
        // Find visible sections for the current hash
        const visibleSectionIds = routeMapping[hash] || routeMapping["#overview"];
        
        sections.forEach(section => {
            const id = section.getAttribute("id");
            if (visibleSectionIds.includes(id)) {
                section.style.display = "";
            } else {
                section.style.display = "none";
            }
        });

        // Update active class on nav links
        navLinks.forEach(link => {
            const linkHref = link.getAttribute("href");
            if (linkHref === hash || (hash === "#erp-features" && linkHref === "#placements")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    // Listen for hash changes
    window.addEventListener("hashchange", handleRouting);
    
    // Initial routing call
    handleRouting();

    // 12. 360 Degree Virtual Tour Panning Simulation
    const tourSimBox = document.querySelector(".tour-iframe-simulation");
    if (tourSimBox) {
        tourSimBox.style.cursor = "ew-resize";
        tourSimBox.addEventListener("mousemove", (e) => {
            const rect = tourSimBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentageX = (x / rect.width) * 100;
            // Shift background position horizontally
            tourSimBox.style.backgroundPosition = `${percentageX}% center`;
        });
        tourSimBox.addEventListener("mouseleave", () => {
            tourSimBox.style.transition = "background-position 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
            tourSimBox.style.backgroundPosition = "50% center";
        });
        tourSimBox.addEventListener("mouseenter", () => {
            tourSimBox.style.transition = "none";
        });
    }
});

/* ==========================================
   MODAL INTERACTION LOGIC
   ========================================== */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable background scrolling
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable background scrolling
    }
}

// 7. Department Details Modal Injection
function openDeptDetails(deptKey) {
    const dept = departmentData[deptKey];
    if (!dept) return;

    const modalContent = document.getElementById("deptModalContent");
    
    let detailsHTML = "<ul>";
    dept.details.forEach(detail => {
        detailsHTML += `<li>${detail}</li>`;
    });
    detailsHTML += "</ul>";

    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 24px;">
            <i class="fa-solid ${dept.icon}" style="font-size: 54px; color: var(--primary); margin-bottom: 16px;"></i>
            <h2 style="font-family: var(--font-heading); font-size: 28px;">${dept.title}</h2>
            <div style="width: 50px; height: 3px; background: var(--accent); margin: 12px auto 0;"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${dept.description}</p>
        <h4 style="font-family: var(--font-heading); margin-bottom: 12px;">Program Highlights:</h4>
        ${detailsHTML}
        <div style="margin-top: 30px; text-align: center;">
            <a href="#admission" onclick="closeModal('deptModal')" class="btn btn-primary">Apply to this Department</a>
        </div>
    `;

    openModal("deptModal");
}

// 8. Virtual Tour Trigger
function openTourModal() {
    openModal("tourModal");
}

// 9. Lightbox Modal Details
function openLightbox(title, bgClass, iconClass, imgSrc) {
    const titleElem = document.getElementById("lightboxTitle");
    const displayElem = document.getElementById("lightboxPlaceholder");
    
    titleElem.textContent = title;
    if (imgSrc) {
        displayElem.className = "lightbox-placeholder-display";
        displayElem.innerHTML = `<img src="${imgSrc}" style="width:100%; height:100%; object-fit:contain; display:block;">`;
    } else {
        displayElem.className = `lightbox-placeholder-display ${bgClass}`;
        displayElem.innerHTML = `<i class="${iconClass}"></i>`;
    }
    
    lightboxZoomLevel = 1.0;
    displayElem.style.transform = `scale(${lightboxZoomLevel})`;

    openModal("lightboxModal");
}

function zoomLightbox(factor) {
    const displayElem = document.getElementById("lightboxPlaceholder");
    lightboxZoomLevel = Math.max(0.5, Math.min(3.0, lightboxZoomLevel * factor));
    displayElem.style.transform = `scale(${lightboxZoomLevel})`;
}

// 10. FAQ Accordion Toggle
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Close all FAQs first
    document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".faq-content").style.maxHeight = null;
    });

    if (!isActive) {
        faqItem.classList.add("active");
        const content = faqItem.querySelector(".faq-content");
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

// 11. Contact Form Submit Handling
function handleFormSubmit(event) {
    event.preventDefault();
    const feedback = document.getElementById("formFeedback");
    const submitBtn = document.getElementById("contactSubmitBtn");
    
    const name = document.getElementById("formName").value;
    const email = document.getElementById("formEmail").value;
    const subject = document.getElementById("formSubject").value;
    const message = document.getElementById("formMessage").value;

    if (!name || !email || !subject || !message) {
        feedback.style.color = "#ef4444";
        feedback.textContent = "Please fill in all details.";
        return;
    }

    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    // Simulate Server Request delay
    setTimeout(() => {
        feedback.style.color = "#10b981";
        feedback.textContent = `Thank you, ${name}! Your query regarding "${subject}" has been successfully logged. We will get back to you shortly.`;
        document.getElementById("contactForm").reset();
        submitBtn.textContent = "Submit Query";
        submitBtn.disabled = false;
    }, 1500);
}

// DIAGNOSTIC SCRIPT TO APPEND
(function() {
  function checkOverflow() {
    const elements = document.querySelectorAll('*');
    const bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const results = [];
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > bodyWidth || rect.right > bodyWidth || rect.left < 0) {
        let path = [];
        let parent = el;
        while (parent && parent.nodeType === Node.ELEMENT_NODE) {
          let selector = parent.nodeName.toLowerCase();
          if (parent.id) {
            selector += '#' + parent.id;
            path.unshift(selector);
            break;
          } else {
            let sib = parent, nth = 1;
            while (sib = sib.previousElementSibling) {
              if (sib.nodeName.toLowerCase() == selector) nth++;
            }
            if (nth != 1) selector += ":nth-of-type(" + nth + ")";
          }
          path.unshift(selector);
          parent = parent.parentNode;
        }
        results.push({
          selector: path.join(' > '),
          width: rect.width,
          left: rect.left,
          right: rect.right
        });
      }
    });
    console.log('OVERFLOW_ELEMENTS_RESULT:' + JSON.stringify(results));
  }
  if (document.readyState === 'complete') {
    checkOverflow();
  } else {
    window.addEventListener('load', checkOverflow);
  }
})();
