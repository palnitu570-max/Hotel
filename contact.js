// contact.js - Interactive elements specific to the Contact page

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Premium Contact Form Submission Simulation
       ========================================================================== */
    const contactForm = document.getElementById('premium-contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            // Store original state
            const originalText = btnText.innerText;
            const originalIcon = btnIcon.className;
            
            // 1. Loading State
            submitBtn.style.pointerEvents = 'none'; // Prevent double click
            btnText.innerText = 'Sending Message...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            
            // 2. Simulate Network Request (1.5 seconds)
            setTimeout(() => {
                // Success State
                submitBtn.style.backgroundColor = '#27ae60'; // Success green
                submitBtn.style.color = '#fff';
                btnText.innerText = 'Message Sent Successfully';
                btnIcon.className = 'fas fa-check-circle';
                
                // Reset Form Fields
                contactForm.reset();
                
                // 3. Revert button back to normal after 3.5 seconds
                setTimeout(() => {
                    submitBtn.style.backgroundColor = ''; // Reverts to CSS default (gold)
                    submitBtn.style.pointerEvents = 'auto';
                    btnText.innerText = originalText;
                    btnIcon.className = originalIcon;
                }, 3500);
                
            }, 1500);
        });
    }

    /* ==========================================================================
       Select Input Color Fix
       ========================================================================== */
    // Makes the <select> dropdown text gray until a user actually selects an option,
    // making it match the visual style of the text input placeholders.
    const departmentSelect = document.getElementById('department');
    
    if(departmentSelect) {
        departmentSelect.style.color = 'var(--text-light)'; // Placeholder color
        
        departmentSelect.addEventListener('change', function() {
            if(this.value !== "") {
                this.style.color = 'var(--text-main)'; // Active text color
            }
        });
    }

});