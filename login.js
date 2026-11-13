// login.js - Logic for Form Tabs, Password Toggle, and Submission

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Tab Switching Logic (Sign In vs Register)
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // 2. Add active class to clicked button
            btn.classList.add('active');

            // 3. Hide all forms
            authForms.forEach(form => form.classList.remove('active'));
            
            // 4. Show targeted form
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* ==========================================================================
       Toggle Password Visibility
       ========================================================================== */
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    togglePasswordBtns.forEach(icon => {
        icon.addEventListener('click', function() {
            // Get the input associated with this icon
            const targetId = this.getAttribute('data-target');
            const inputField = document.getElementById(targetId);

            // Toggle type between 'password' and 'text'
            if (inputField.type === "password") {
                inputField.type = "text";
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash'); // Change icon to slashed eye
            } else {
                inputField.type = "password";
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    /* ==========================================================================
       Simulate Form Submission (Premium Loading State)
       ========================================================================== */
    const handleFormSubmit = (formId, successMessage) => {
        const form = document.getElementById(formId);
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('.form-submit-btn');
                const btnText = submitBtn.querySelector('span');
                const btnIcon = submitBtn.querySelector('i');
                
                // Save original state
                const originalText = btnText.innerText;
                const originalIcon = btnIcon.className;
                
                // 1. Set Loading State
                submitBtn.style.pointerEvents = 'none';
                btnText.innerText = 'Authenticating...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                
                // 2. Simulate API Network Request
                setTimeout(() => {
                    // Success State
                    submitBtn.style.backgroundColor = '#27ae60'; // Success green
                    submitBtn.style.color = '#fff';
                    btnText.innerText = successMessage;
                    btnIcon.className = 'fas fa-check-circle';
                    
                    form.reset(); // Clear fields
                    
                    // 3. Revert button and "redirect" after 2.5 seconds
                    setTimeout(() => {
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.pointerEvents = 'auto';
                        btnText.innerText = originalText;
                        btnIcon.className = originalIcon;
                        
                        // Optional: Redirect to account dashboard
                        // window.location.href = 'index.html'; 
                    }, 2500);
                    
                }, 1500);
            });
        }
    };

    // Attach submission logic to both forms
    handleFormSubmit('sign-in-form', 'Login Successful');
    handleFormSubmit('register-form', 'Account Created');

});