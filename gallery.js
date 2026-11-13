// gallery.js - Logic for filters and dynamic lightbox

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Gallery Category Filtering
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card');
    
    // Array to hold currently visible items for lightbox navigation
    let currentFilteredItems = Array.from(galleryItems);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // 1. Update Active Class on Buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Filter the Grid
            const filterValue = btn.getAttribute('data-filter');
            currentFilteredItems = []; // Reset array

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    currentFilteredItems.push(item);
                    
                    // Small delay for smooth fade in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // Wait for CSS transition
                }
            });
        });
    });

    /* ==========================================================================
       Advanced Lightbox with Description Sync
       ========================================================================== */
    const lightbox = document.getElementById('gallery-lightbox');
    const lbClose = document.querySelector('.lightbox-close');
    const lbImg = document.getElementById('lightbox-main-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbDesc = document.getElementById('lightbox-desc');
    const btnNext = document.querySelector('.lightbox-nav.next');
    const btnPrev = document.querySelector('.lightbox-nav.prev');
    
    let currentLightboxIndex = 0;

    // Open Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Find index of clicked item within the CURRENTLY FILTERED array
            currentLightboxIndex = currentFilteredItems.indexOf(item);
            
            // If item is found in current view, open lightbox
            if(currentLightboxIndex !== -1) {
                updateLightboxContent();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    // Function to extract data from HTML and put it in Lightbox
    function updateLightboxContent() {
        const activeItem = currentFilteredItems[currentLightboxIndex];
        
        // Extract Image Src
        const imgSrc = activeItem.querySelector('img').src;
        // Extract Text
        const titleText = activeItem.querySelector('h3').innerText;
        const descText = activeItem.querySelector('p').innerText;

        // Apply to Lightbox with a quick fade effect for smooth transition
        lbImg.style.opacity = '0';
        
        setTimeout(() => {
            lbImg.src = imgSrc;
            lbTitle.innerText = titleText;
            lbDesc.innerText = descText;
            lbImg.style.opacity = '1';
        }, 150);
    }

    // Navigation: Next
    btnNext.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredItems.length;
        updateLightboxContent();
    });

    // Navigation: Prev
    btnPrev.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
        updateLightboxContent();
    });

    // Close Lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    lbClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });
    
    // Keyboard Navigation support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') btnNext.click();
        if (e.key === 'ArrowLeft') btnPrev.click();
    });

});