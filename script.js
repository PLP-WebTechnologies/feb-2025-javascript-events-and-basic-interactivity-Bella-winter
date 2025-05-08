
       
         // Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    /**
     * SECTION 1: EVENT HANDLING
     */
    
    // 1. Button Click Event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    let clickCount = 0;
    
    clickButton.addEventListener('click', function() {
        clickCount++;
        clickOutput.textContent = `Clicked ${clickCount} ${clickCount === 1 ? 'time' : 'times'}!`;
        clickButton.classList.add('pulse');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            clickButton.classList.remove('pulse');
        }, 600);
    });
    
    // 2. Hover Effects
    const hoverBox = document.getElementById('hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Status: Currently hovering! 👀';
        hoverOutput.style.color = '#27ae60';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Status: Not hovered';
        hoverOutput.style.color = '#333';
    });
    
    // 3. Keypress Detection
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    
    keyInput.addEventListener('keydown', function(event) {
        const key = event.key;
        const keyCode = event.keyCode || event.which;
        
        keyOutput.textContent = `Key: "${key}" | Key Code: ${keyCode}`;
        keyOutput.classList.add('fade-in');
        
        // Remove animation class
        setTimeout(() => {
            keyOutput.classList.remove('fade-in');
        }, 800);
    });
    
    // 4. Secret Action (Double Click)
    const secretBox = document.getElementById('secret-box');
    const secretOutput = document.getElementById('secret-output');
    let secretRevealed = false;
    
    secretBox.addEventListener('dblclick', function() {
        if (!secretRevealed) {
            secretBox.classList.add('rainbow');
            secretOutput.textContent = '🎉 You found the secret! Keep double-clicking for more fun! 🎉';
            secretRevealed = true;
        } else {
            // Generate a random fun fact when double-clicked again
            const funFacts = [
                "JavaScript was created in 10 days by Brendan Eich in 1995!",
                "The first web browser was invented in 1990 by Tim Berners-Lee.",
                "The first computer bug was an actual moth found in a computer in 1947!",
                "The term 'bug' was popularized by Grace Hopper, a pioneer in computer programming.",
                "The first 1GB hard disk was announced in 1980, and it weighed over 500 pounds!",
                "Consistency is key in programming, but so is creativity!",
                "Honey never spoils. Archaeologists found pots of honey in ancient Egyptian tombs that were over 3,000 years old and still perfectly good to eat!"
            ];
            
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            secretOutput.textContent = `Fun Fact: ${randomFact}`;
        }
    });
    
    /*
     * SECTION 2: INTERACTIVE ELEMENTS
     */
    
    // 1. Color Changing Button
    const colorButton = document.getElementById('color-button');
    let buttonState = 0;
    
    colorButton.addEventListener('click', function() {
        buttonState = (buttonState + 1) % 4;
        
        switch(buttonState) {
            case 0:
                colorButton.style.backgroundColor = '#3498db';
                colorButton.textContent = 'Change My Style';
                colorButton.style.borderRadius = '4px';
                break;
            case 1:
                colorButton.style.backgroundColor = '#e74c3c';
                colorButton.textContent = 'Cool Style! love it!';
                colorButton.style.borderRadius = '8px';
                break;
            case 2:
                colorButton.style.backgroundColor = '#2ecc71';
                colorButton.textContent = 'Awesome!';
                colorButton.style.borderRadius = '20px';
                break;
            case 3:
                colorButton.style.backgroundColor = '#9b59b6';
                colorButton.textContent = 'Back to Start';
                colorButton.style.borderRadius = '50%';
                break;
        }
    });
    
    // 2. Image Gallery/Slideshow
    const mainImage = document.getElementById('main-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageCounter = document.getElementById('image-counter');
    
    const images = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
    ];
    
    let currentImageIndex = 0;
    
    function updateGallery() {
        mainImage.src = images[currentImageIndex];
        imageCounter.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            updateGallery();
            mainImage.style.opacity = '1';
        }, 300);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            updateGallery();
            mainImage.style.opacity = '1';
        }, 300);
    });
    
    // Initialize gallery
    updateGallery();
    
    // 3. Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the content associated with this header
            const content = this.nextElementSibling;
            
            // Check if this content is already active
            const isActive = content.classList.contains('active');
            
            // First close all panels
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked panel wasn't active, open it
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
    
    /*
     * SECTION 3: FORM VALIDATION
     */
    const form = document.getElementById('validation-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const formStatus = document.getElementById('form-status');
    
    // Error message elements
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    // Helper function for validation
    function setError(input, errorElement, message) {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorElement.textContent = message;
    }
    
    function setValid(input, errorElement) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
    }
    
    // Real-time validation for username
    usernameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            setError(this, usernameError, 'Username is required');
        } else {
            setValid(this, usernameError);
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            setError(this, emailError, 'Email is required');
        } else if (!emailRegex.test(this.value)) {
            setError(this, emailError, 'Please enter a valid email address');
        } else {
            setValid(this, emailError);
        }
    });
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        if (this.value.length < 8) {
            setError(this, passwordError, 'Password must be at least 8 characters');
        } else {
            setValid(this, passwordError);
        }
        
        // Check confirm password too if it has a value
        if (confirmPasswordInput.value) {
            if (this.value !== confirmPasswordInput.value) {
                setError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
            } else {
                setValid(confirmPasswordInput, confirmPasswordError);
            }
        }
    });
    
    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            setError(this, confirmPasswordError, 'Passwords do not match');
        } else {
            setValid(this, confirmPasswordError);
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        
        // Username validation
        if (usernameInput.value.trim() === '') {
            setError(usernameInput, usernameError, 'Username is required');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            setError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            setError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        if (passwordInput.value.length < 8) {
            setError(passwordInput, passwordError, 'Password must be at least 8 characters');
            isValid = false;
        }
        
        // Confirm password validation
        if (confirmPasswordInput.value !== passwordInput.value) {
            setError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
            isValid = false;
        }
        
        // Check if form is valid
        if (isValid) {
            formStatus.textContent = 'Form submitted successfully!';
            formStatus.className = 'success';
            
            // Reset form after successful submission
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('valid');
                });
                formStatus.textContent = '';
                formStatus.className = '';
            }, 3000);
        } else {
            formStatus.textContent = 'Please fix the errors in the form.';
            formStatus.className = 'error';
        }
    });
    
    // Additional fun features - Easter eggs
    
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        // Check if the key pressed is the expected key in the sequence
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // If the entire sequence is entered correctly
            if (konamiIndex === konamiCode.length) {
                // Activate special mode
                document.body.style.transition = 'all 1s';
                document.body.style.backgroundColor = '#2c3e50';
                document.querySelectorAll('.card').forEach(card => {
                    card.style.boxShadow = '0 10px 25px rgba(52, 152, 219, 0.5)';
                });
                
                // Reset the index
                konamiIndex = 0;
                
                // Create a floating message
                const message = document.createElement('div');
                message.textContent = '🎮 Konami Code Activated! 🎮';
                message.style.position = 'fixed';
                message.style.top = '20px';
                message.style.left = '50%';
                message.style.transform = 'translateX(-50%)';
                message.style.backgroundColor = '#e74c3c';
                message.style.color = 'white';
                message.style.padding = '10px 20px';
                message.style.borderRadius = '5px';
                message.style.zIndex = '1000';
                message.style.fontWeight = 'bold';
                
                document.body.appendChild(message);
                
                // Remove the message after 3 seconds
                setTimeout(() => {
                    document.body.removeChild(message);
                    document.body.style.backgroundColor = '#f5f5f5';
                    document.querySelectorAll('.card').forEach(card => {
                        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    });
                }, 3000);
            }
        } else {
            // Reset the index if the wrong key is pressed
            konamiIndex = 0;
        }
    });

    // Console welcome message for developers
    console.log('%c Welcome to JavaScript Interactive Playground! 🎮', 'color: #3498db; font-size: 20px; font-weight: bold;');
    console.log('%c Try finding all the hidden features! 🕵️', 'color: #2ecc71; font-size: 14px;');
});