// facilities.js - Interactive elements specific to the Facilities page

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Interactive Tabs for Event Spaces
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                
                // 1. Remove active state from all buttons
                tabButtons.forEach(b => b.classList.remove('active'));
                
                // 2. Add active state to clicked button
                btn.classList.add('active');

                // 3. Get the target ID
                const targetId = btn.getAttribute('data-target');

                // 4. Update the content panes
                tabPanes.forEach(pane => {
                    // Remove active class from all panes
                    pane.classList.remove('active');
                    
                    // Add active class to the target pane
                    if (pane.id === targetId) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }

    /* ==========================================================================
       Parallax Background Effect for Hero (Optional visual flair)
       ========================================================================== */
    const heroSection = document.querySelector('.facilities-hero');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            // Move the background image slightly as the user scrolls
            if (scrollPos < heroSection.offsetHeight) {
                heroSection.style.backgroundPositionY = `${scrollPos * 0.4}px`;
            }
        });
    }
});