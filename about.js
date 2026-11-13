// about.js - Premium interactions specific to the About Page

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Hero Section Parallax Text Effect
       ========================================================================== */
    // Creates a smooth fading and moving effect for the hero text as you scroll down
    const heroContent = document.querySelector('.about-hero-content');
    const heroSection = document.querySelector('.about-hero');

    if (heroContent && heroSection) {
        window.addEventListener('scroll', () => {
            // Get current scroll position
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;

            // Only animate if the hero section is in view
            if (scrollY <= heroHeight) {
                // Calculate opacity and translation
                const opacity = 1 - (scrollY / (heroHeight * 0.7));
                const translateY = scrollY * 0.4; // Moves down at 40% of scroll speed

                // Apply styles
                heroContent.style.opacity = Math.max(opacity, 0);
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        });
    }

    /* ==========================================================================
       Subtle 3D Tilt Effect on Vision Image & Quote
       ========================================================================== */
    // Adds a premium, modern glassmorphism interaction on desktop screens
    const visionVisuals = document.querySelector('.vision-visuals');
    const floatingQuote = document.querySelector('.floating-quote');
    const mainImg = document.querySelector('.main-img');

    if (visionVisuals && floatingQuote && mainImg && window.innerWidth > 992) {
        visionVisuals.addEventListener('mousemove', (e) => {
            const rect = visionVisuals.getBoundingClientRect();
            
            // Calculate mouse position relative to the element center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Calculate rotation amount (max 5 degrees)
            const rotateX = -(y / rect.height) * 10;
            const rotateY = (x / rect.width) * 10;

            // Apply 3D transform to image and slight reverse to the quote for depth
            mainImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            floatingQuote.style.transform = `perspective(1000px) translateZ(30px) rotateX(${rotateX * 1.5}deg) rotateY(${rotateY * 1.5}deg)`;
            
            // Smooth out transition during fast mouse movements
            mainImg.style.transition = 'transform 0.1s ease-out';
            floatingQuote.style.transition = 'transform 0.1s ease-out';
        });

        // Reset positions when mouse leaves the element
        visionVisuals.addEventListener('mouseleave', () => {
            mainImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            floatingQuote.style.transform = 'perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg)';
            
            // Add smoother transition for the snap-back effect
            mainImg.style.transition = 'transform 0.5s ease-out';
            floatingQuote.style.transition = 'transform 0.5s ease-out';
        });
    }

    /* ==========================================================================
       Smooth Anchor Scrolling for Internal Links
       ========================================================================== */
    // If you click the "Read Our Green Pledge" button, for instance, and link it to an ID later
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only act on pure ID links, ignore if it's just "#"
            if (targetId !== '#' && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    // Account for the fixed sticky header (approx 80px)
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});