// DOM Elements
const loginForm = document.getElementById('loginFormElement');
const registerForm = document.getElementById('registerFormElement');
const loginPanel = document.getElementById('loginForm');
const registerPanel = document.getElementById('registerForm');
const dashboardPanel = document.getElementById('dashboard');
const tabBtns = document.querySelectorAll('.tab-btn');
const switchLinks = document.querySelectorAll('.switch-link');
const logoutBtn = document.getElementById('logoutBtn');

// Tab switching function
function switchTab(tabName) {
    // Update tab buttons
    tabBtns.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Show/hide forms
    if (tabName === 'login') {
        loginPanel.classList.add('active');
        registerPanel.classList.remove('active');
        dashboardPanel.style.display = 'none';
    } else if (tabName === 'register') {
        registerPanel.classList.add('active');
        loginPanel.classList.remove('active');
        dashboardPanel.style.display = 'none';
    }
}

// Show dashboard after login
function showDashboard(username) {
    loginPanel.classList.remove('active');
    registerPanel.classList.remove('active');
    dashboardPanel.style.display = 'block';
    document.getElementById('userName').textContent = username;
}

// Show message in specific container
function showMessage(container, message, type) {
    const messageDiv = container.querySelector('.message') || 
                      (container === 'login' ? document.getElementById('loginMessage') : document.getElementById('registerMessage'));
    
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto hide after 3 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        }
    }
}

// Clear error messages for a form
function clearErrors(formType) {
    if (formType === 'login') {
        document.getElementById('loginEmailError').textContent = '';
        document.getElementById('loginPasswordError').textContent = '';
        document.getElementById('loginEmail').classList.remove('error');
        document.getElementById('loginPassword').classList.remove('error');
    } else {
        document.getElementById('regUsernameError').textContent = '';
        document.getElementById('regEmailError').textContent = '';
        document.getElementById('regPasswordError').textContent = '';
        document.getElementById('regConfirmError').textContent = '';
        document.getElementById('regUsername').classList.remove('error');
        document.getElementById('regEmail').classList.remove('error');
        document.getElementById('regPassword').classList.remove('error');
        document.getElementById('regConfirmPassword').classList.remove('error');
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors('login');
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let isValid = true;
    
    // Client-side validation
    if (!email) {
        document.getElementById('loginEmailError').textContent = 'Email is required';
        document.getElementById('loginEmail').classList.add('error');
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
        document.getElementById('loginEmail').classList.add('error');
        isValid = false;
    }
    
    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        document.getElementById('loginPassword').classList.add('error');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('auth_process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('login', data.message, 'success');
            setTimeout(() => {
                showDashboard(data.username);
            }, 1000);
        } else {
            showMessage('login', data.message, 'error');
        }
    } catch (error) {
        showMessage('login', 'An error occurred. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Handle register form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors('register');
    
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    let isValid = true;
    
    // Client-side validation
    if (!username) {
        document.getElementById('regUsernameError').textContent = 'Username is required';
        document.getElementById('regUsername').classList.add('error');
        isValid = false;
    } else if (username.length < 3) {
        document.getElementById('regUsernameError').textContent = 'Username must be at least 3 characters';
        document.getElementById('regUsername').classList.add('error');
        isValid = false;
    }
    
    if (!email) {
        document.getElementById('regEmailError').textContent = 'Email is required';
        document.getElementById('regEmail').classList.add('error');
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('regEmailError').textContent = 'Please enter a valid email';
        document.getElementById('regEmail').classList.add('error');
        isValid = false;
    }
    
    if (!password) {
        document.getElementById('regPasswordError').textContent = 'Password is required';
        document.getElementById('regPassword').classList.add('error');
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('regPasswordError').textContent = 'Password must be at least 6 characters';
        document.getElementById('regPassword').classList.add('error');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('regConfirmError').textContent = 'Passwords do not match';
        document.getElementById('regConfirmPassword').classList.add('error');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('auth_process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('register', data.message, 'success');
            registerForm.reset();
            // Switch to login tab after 2 seconds
            setTimeout(() => {
                switchTab('login');
                showMessage('login', 'Account created! Please login.', 'success');
            }, 2000);
        } else {
            showMessage('register', data.message, 'error');
        }
    } catch (error) {
        showMessage('register', 'An error occurred. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Handle logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('auth_process.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=logout'
            });
            
            const data = await response.json();
            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    });
}

// Tab switching event listeners
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
    });
});

switchLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(link.dataset.tab);
    });
});