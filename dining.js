// dining.js

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Date Picker Validation (No past dates)
       ========================================================================== */
    const dateInput = document.getElementById('dining-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    /* ==========================================================================
       Dining Reservation Form Submission
       ========================================================================== */
    const diningForm = document.getElementById('dining-form');
    
    if (diningForm) {
        diningForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = diningForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking Availability...';
            submitBtn.style.opacity = '0.8';
            
            // Simulate API request delay
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Reservation Confirmed';
                submitBtn.style.backgroundColor = '#27ae60'; // Success green
                submitBtn.style.color = '#fff';
                submitBtn.style.opacity = '1';
                
                // Reset form
                diningForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = 'var(--gold)';
                }, 3000);
                
            }, 1500);
        });
    }

});