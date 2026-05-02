<?php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Auth System | Login & Register</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="auth-wrapper">
            <!-- Tabs -->
            <div class="tabs">
                <button class="tab-btn active" data-tab="login">Login</button>
                <button class="tab-btn" data-tab="register">Register</button>
            </div>

            <!-- Login Form -->
            <div id="loginForm" class="form-panel active">
                <h2>Welcome Back!</h2>
                <p class="subtitle">Login to your account</p>
                
                <div id="loginMessage" class="message"></div>
                
                <form id="loginFormElement">
                    <div class="input-group">
                        <label for="loginEmail">Email Address</label>
                        <input type="email" id="loginEmail" name="email" placeholder="Enter your email" required>
                        <span class="error-message" id="loginEmailError"></span>
                    </div>
                    
                    <div class="input-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" name="password" placeholder="Enter your password" required>
                        <span class="error-message" id="loginPasswordError"></span>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                
                <p class="switch-text">
                    Don't have an account? <a href="#" class="switch-link" data-tab="register">Register here</a>
                </p>
            </div>

            <!-- Register Form -->
            <div id="registerForm" class="form-panel">
                <h2>Create Account</h2>
                <p class="subtitle">Join us today</p>
                
                <div id="registerMessage" class="message"></div>
                
                <form id="registerFormElement">
                    <div class="input-group">
                        <label for="regUsername">Username</label>
                        <input type="text" id="regUsername" name="username" placeholder="Choose a username" required>
                        <span class="error-message" id="regUsernameError"></span>
                    </div>
                    
                    <div class="input-group">
                        <label for="regEmail">Email Address</label>
                        <input type="email" id="regEmail" name="email" placeholder="Enter your email" required>
                        <span class="error-message" id="regEmailError"></span>
                    </div>
                    
                    <div class="input-group">
                        <label for="regPassword">Password</label>
                        <input type="password" id="regPassword" name="password" placeholder="Create a password" required>
                        <span class="error-message" id="regPasswordError"></span>
                    </div>
                    
                    <div class="input-group">
                        <label for="regConfirmPassword">Confirm Password</label>
                        <input type="password" id="regConfirmPassword" name="confirm_password" placeholder="Confirm your password" required>
                        <span class="error-message" id="regConfirmError"></span>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
                
                <p class="switch-text">
                    Already have an account? <a href="#" class="switch-link" data-tab="login">Login here</a>
                </p>
            </div>

            <!-- Dashboard (shown after login) -->
            <div id="dashboard" class="form-panel" style="display: none;">
                <h2>Dashboard</h2>
                <div id="dashboardContent">
                    <p>Welcome, <span id="userName"></span>!</p>
                    <p>You have successfully logged in.</p>
                    <button id="logoutBtn" class="btn btn-secondary">Logout</button>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <?php if (isLoggedIn()): ?>
    <script>
        // Auto-show dashboard if already logged in
        document.addEventListener('DOMContentLoaded', function() {
            showDashboard('<?php echo $_SESSION['username']; ?>');
        });
    </script>
    <?php endif; ?>
</body>
</html>