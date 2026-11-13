// script.js

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Loading Screen
       ========================================================================== */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto'; // allow scrolling
            }, 500);
        }, 1500); // Minimum 1.5s display for effect
    });

    // Disable scroll while loading
    document.body.style.overflow = 'hidden';

    /* ==========================================================================
       Scroll Progress Bar & Sticky Header & Back To Top
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';

        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Back to top visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       Mobile Menu Hamburger Toggle
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        // Simple hamburger animation could be added here by toggling classes on bars
    });

    // Close menu on link click
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });

    /* ==========================================================================
       Hero Carousel
       ========================================================================== */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function initCarousel() {
        showSlide(currentSlide);
        startSlideInterval();
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    initCarousel();

    /* ==========================================================================
       Intersection Observer for Scroll Animations
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            
            // If it's a counter, trigger counting
            if (entry.target.classList.contains('stat-item') || entry.target.querySelector('.counter')) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        updateCount(counter);
                        counter.classList.add('counted');
                    }
                });
            }
            
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================================================
   Animated Counters
   ========================================================================== */
const counters = document.querySelectorAll('.counter');

function updateCount(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = 200; // lower is faster
    const inc = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => updateCount(counter), 10);
    } else {
        counter.innerText = target;
    }
}

// This tells every counter on the page to start the function above
counters.forEach(counter => {
    updateCount(counter);
});

    /* ==========================================================================
       Gallery Filter & Lightbox
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to current
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lbPrev = document.querySelector('.lb-prev');
    const lbNext = document.querySelector('.lb-next');
    
    // Collect all gallery image sources
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentLightboxIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentLightboxIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.classList.add('active');
        updateLightboxImg();
        document.body.style.overflow = 'hidden';
    }

    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImg() {
        lightboxImg.src = galleryImages[currentLightboxIndex].src;
    }

    closeLightbox.addEventListener('click', closeLightboxFunc);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    lbNext.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
        updateLightboxImg();
    });

    lbPrev.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImg();
    });

    /* ==========================================================================
       Testimonials Slider
       ========================================================================== */
    const testiTrack = document.querySelector('.testi-track');
    const testiSlides = document.querySelectorAll('.testi-slide');
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = e.target.getAttribute('data-slide');
            
            // Remove active from all dots
            dots.forEach(d => d.classList.remove('active'));
            // Add active to clicked
            e.target.classList.add('active');
            
            // Move track
            testiTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
        });
    });

    /* ==========================================================================
       FAQ Accordion
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close other open items
            const activeHeader = document.querySelector('.accordion-header.active');
            if (activeHeader && activeHeader !== header) {
                activeHeader.classList.remove('active');
                activeHeader.nextElementSibling.style.maxHeight = null;
            }

            // Toggle current
            header.classList.toggle('active');
            const body = header.nextElementSibling;
            if (header.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    /* ==========================================================================
       Form Validation (Booking & Contact)
       ========================================================================== */
    const bookingForm = document.getElementById('main-booking-form');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            
            if(!checkIn || !checkOut) {
                alert('Please select valid Check-in and Check-out dates.');
                return;
            }
            if(new Date(checkIn) >= new Date(checkOut)) {
                alert('Check-out date must be after Check-in date.');
                return;
            }
            
            // Simulate processing
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            setTimeout(() => {
                btn.innerHTML = 'Booking Found! Redirecting...';
                btn.style.backgroundColor = '#27ae60';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    bookingForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                btn.innerHTML = 'Message Sent Successfully!';
                btn.style.backgroundColor = '#27ae60';
                btn.style.color = 'white';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    /* ==========================================================================
       Set Min Date for Date inputs
       ========================================================================== */
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });

});