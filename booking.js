// booking.js - Dynamic Booking Engine Logic

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Date Picker Setup & Validation
       ========================================================================== */
    const checkinInput = document.getElementById('book-checkin');
    const checkoutInput = document.getElementById('book-checkout');
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);
    checkoutInput.setAttribute('min', today);

    // Auto-fill dates with today and tomorrow for user convenience
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    checkinInput.value = today;
    checkoutInput.value = tomorrow.toISOString().split('T')[0];

    // Ensure checkout is always after checkin
    checkinInput.addEventListener('change', function() {
        checkoutInput.setAttribute('min', this.value);
        if(checkoutInput.value <= this.value) {
            let nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.value = nextDay.toISOString().split('T')[0];
        }
        updateSummary();
    });

    checkoutInput.addEventListener('change', updateSummary);
    document.getElementById('book-guests').addEventListener('change', updateSummary);
    document.getElementById('update-search-btn').addEventListener('click', updateSummary);

    /* ==========================================================================
       Booking State Variables
       ========================================================================== */
    let selectedRoomPrice = 0;
    let selectedRoomName = "None Selected";
    let numberOfNights = 1;
    let taxRate = 0.15; // 15%

    /* ==========================================================================
       Room Selection Logic
       ========================================================================== */
    const roomCards = document.querySelectorAll('.room-listing-card');
    const selectButtons = document.querySelectorAll('.select-room-btn');
    
    const checkoutForm = document.getElementById('checkout-form');
    const selectPrompt = document.getElementById('select-prompt');

    selectButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.room-listing-card');
            
            // 1. Reset all cards
            roomCards.forEach(c => {
                c.classList.remove('selected');
                c.querySelector('.select-room-btn').innerText = 'Select Room';
                c.querySelector('.select-room-btn').classList.remove('btn-gold');
                c.querySelector('.select-room-btn').classList.add('btn-outline-gold');
            });

            // 2. Set active state on chosen card
            card.classList.add('selected');
            this.innerText = 'Selected';
            this.classList.remove('btn-outline-gold');
            this.classList.add('btn-gold');

            // 3. Update Variables
            selectedRoomPrice = parseFloat(card.getAttribute('data-price'));
            selectedRoomName = card.getAttribute('data-name');

            // 4. Update UI & Show Form
            checkoutForm.style.display = 'block';
            selectPrompt.style.display = 'none';
            
            // Scroll slightly to summary if on mobile
            if(window.innerWidth < 992) {
                document.querySelector('.booking-summary-wrapper').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            updateSummary();
        });
    });

    /* ==========================================================================
       Update Summary Sidebar Calculation
       ========================================================================== */
    function updateSummary() {
        // 1. Format Dates for Display (e.g., Oct 24, 2026)
        const inDate = new Date(checkinInput.value);
        const outDate = new Date(checkoutInput.value);
        
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        document.getElementById('summary-checkin').innerText = isNaN(inDate) ? "Select Date" : inDate.toLocaleDateString('en-US', options);
        document.getElementById('summary-checkout').innerText = isNaN(outDate) ? "Select Date" : outDate.toLocaleDateString('en-US', options);

        // 2. Calculate Nights
        if(!isNaN(inDate) && !isNaN(outDate)) {
            const timeDifference = outDate.getTime() - inDate.getTime();
            numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
            if(numberOfNights < 1) numberOfNights = 1;
        }
        
        document.getElementById('summary-nights').innerText = `${numberOfNights} Night${numberOfNights > 1 ? 's' : ''}`;
        
        // 3. Update Guests
        const guestsText = document.getElementById('book-guests').options[document.getElementById('book-guests').selectedIndex].text;
        document.getElementById('summary-guests').innerText = guestsText;

        // 4. Update Room Name
        document.getElementById('summary-room').innerText = selectedRoomName;

        // 5. Calculate Financials
        const roomTotal = selectedRoomPrice * numberOfNights;
        const taxTotal = roomTotal * taxRate;
        const grandTotal = roomTotal + taxTotal;

        // 6. Output Financials to DOM
        document.getElementById('summary-rate').innerText = `$${roomTotal.toFixed(2)}`;
        document.getElementById('summary-tax').innerText = `$${taxTotal.toFixed(2)}`;
        document.getElementById('summary-total').innerText = `$${grandTotal.toFixed(2)}`;
    }
    
    // Initial calculate on page load
    updateSummary();

    /* ==========================================================================
       Confirm Reservation Simulation
       ========================================================================== */
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const confirmBtn = document.getElementById('confirm-booking-btn');
            const originalText = confirmBtn.innerHTML;
            
            // Loading
            confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
            confirmBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                // Success
                confirmBtn.innerHTML = '<i class="fas fa-check-circle"></i> Booking Confirmed!';
                confirmBtn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    alert(`Thank you! Your ${selectedRoomName} has been booked for ${numberOfNights} nights. A confirmation email has been sent.`);
                    // Reset page
                    location.reload();
                }, 1500);
                
            }, 2000);
        });
    }

});