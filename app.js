document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Header Scroll Event --- */
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    function updateHeaderState() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderState);
    updateHeaderState(); // Run initially on load

    /* --- 2. Mobile Menu Toggle --- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            
            // Toggle body scrolling when menu is open on mobile
            if (navMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* --- 3. Scroll Spy (Active Section Tracker) --- */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 120; // Offset for sticky navbar
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (correspondingLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);
    scrollSpy();

    /* --- 4. Ambient Cursor Spotlight Follower --- */
    const cursorSpotlight = document.getElementById('cursor-spotlight');
    const heroSection = document.getElementById('home');
    
    if (cursorSpotlight && heroSection) {
        // Spotlight follows mouse within the Hero section
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set fixed coordinates relative to screen, as cursorSpotlight is fixed position
            cursorSpotlight.style.left = `${e.clientX}px`;
            cursorSpotlight.style.top = `${e.clientY}px`;
        });
        
        heroSection.addEventListener('mouseenter', () => {
            cursorSpotlight.style.opacity = '1';
        });
        
        heroSection.addEventListener('mouseleave', () => {
            cursorSpotlight.style.opacity = '0';
        });
    }

    /* --- 5. Scroll Reveal Intersection Observer --- */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once shown
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset bottom threshold
    });
    
    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    /* --- 6. Skills Animation Observer & Counter --- */
    const skillsSection = document.getElementById('skills-section');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillPercents = document.querySelectorAll('.skill-percent');
    let skillsAnimated = false;
    
    function animateSkills() {
        skillBars.forEach((bar, index) => {
            const percentLabel = skillPercents[index];
            const targetVal = parseInt(percentLabel.getAttribute('data-target'), 10);
            
            // Animate filled bar width
            bar.style.width = `${targetVal}%`;
            
            // Animate number count from 0 to target
            let currentVal = 0;
            const duration = 1500; // Match CSS transition duration
            const increment = targetVal / (duration / 16); // ~60fps
            
            const timer = setInterval(() => {
                currentVal += increment;
                if (currentVal >= targetVal) {
                    percentLabel.textContent = `${targetVal}%`;
                    clearInterval(timer);
                } else {
                    percentLabel.textContent = `${Math.floor(currentVal)}%`;
                }
            }, 16);
        });
    }
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkills();
                    skillsAnimated = true; // Run only once
                }
            });
        }, {
            threshold: 0.2
        });
        
        skillsObserver.observe(skillsSection);
    }

    /* --- 7. Project Sorting (Filters) --- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active style from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Remove show-reveal states for animate re-trigger
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        // Small layout sync delay for entry animation transition
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hide');
                    }
                }, 300); // Wait for fade-out time
            });
        });
    });

    /* --- 8. Contact Form Validations & Handling --- */
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('success-overlay');
    const successClose = document.getElementById('success-close');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;
    const formSpinner = document.getElementById('form-spinner');
    const formIcon = document.getElementById('form-icon');
    
    // Form Inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Form Errors
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function showInputError(input, errorElement, message) {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }

    function clearInputError(input, errorElement) {
        input.classList.remove('invalid');
        errorElement.classList.remove('visible');
    }

    // Input listeners for live validation clearing
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim() !== '') {
                clearInputError(nameInput, nameError);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (validateEmail(emailInput.value.trim())) {
                clearInputError(emailInput, emailError);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('input', () => {
            if (messageInput.value.trim() !== '') {
                clearInputError(messageInput, messageError);
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const messageVal = messageInput.value.trim();

            // Validate Name
            if (nameVal === '') {
                showInputError(nameInput, nameError, 'Please enter your name');
                isValid = false;
            } else {
                clearInputError(nameInput, nameError);
            }

            // Validate Email
            if (emailVal === '') {
                showInputError(emailInput, emailError, 'Please enter your email address');
                isValid = false;
            } else if (!validateEmail(emailVal)) {
                showInputError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearInputError(emailInput, emailError);
            }

            // Validate Message
            if (messageVal === '') {
                showInputError(messageInput, messageError, 'Please enter your message');
                isValid = false;
            } else {
                clearInputError(messageInput, messageError);
            }

            if (!isValid) return;

            // Form is valid - Enter Submit Loading State
            submitBtn.style.pointerEvents = 'none';
            formIcon.style.display = 'none';
            formSpinner.style.display = 'inline-block';
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';

            // Send form data to FormSubmit API
            fetch("https://formsubmit.co/ajax/roshan047007@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    message: messageVal
                })
            })
            .then(response => response.json())
            .then(data => {
                // Exit submit loading state
                submitBtn.style.pointerEvents = '';
                formSpinner.style.display = 'none';
                formIcon.style.display = 'inline-block';
                submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                
                // Show Success Popup Overlay
                if (successOverlay) {
                    successOverlay.classList.add('active');
                }
                
                // Reset Form Fields
                contactForm.reset();
            })
            .catch(error => {
                console.error(error);
                // Exit submit loading state with error text
                submitBtn.style.pointerEvents = '';
                formSpinner.style.display = 'none';
                formIcon.style.display = 'inline-block';
                submitBtn.querySelector('.btn-text').textContent = 'Failed to Send';
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                }, 3000);
            });
        });
    }

    // Close success overlay dialog
    if (successClose && successOverlay) {
        successClose.addEventListener('click', () => {
            successOverlay.classList.remove('active');
        });
        
        // Close on clicking outside the modal box
        successOverlay.addEventListener('click', (e) => {
            if (e.target === successOverlay) {
                successOverlay.classList.remove('active');
            }
        });
    }
});
