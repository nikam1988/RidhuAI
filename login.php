<?php
if (session_status() === PHP_SESSION_NONE) session_start();
// Redirect to dashboard if already logged in (server-side check via cookie — token check is done client-side via JS)
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In - FunSheets</title>
    <?php include 'includes/header.php'; ?>
    <style>
        body { background-color: var(--color-bg); display: flex; flex-direction: column; min-height: 100vh; }
        .login-wrapper { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
        .login-card { background: white; width: 100%; max-width: 450px; padding: 40px; border-radius: var(--radius-lg); box-shadow: var(--shadow-card); border: 2px solid #E5E5E5; border-bottom: 6px solid #E5E5E5; text-align: center; }
        .login-logo { font-size: 3rem; margin-bottom: 20px; }
        .login-title { font-size: 2rem; margin-bottom: 10px; color: var(--color-text-main); }
        .login-subtitle { color: var(--color-text-muted); margin-bottom: 30px; font-weight: 700; }
        .divider { display: flex; align-items: center; text-align: center; color: var(--color-text-muted); margin: 20px 0; font-weight: 600; }
        .divider::before, .divider::after { content: ''; flex: 1; border-bottom: 2px solid #E2E8F0; }
        .divider:not(:empty)::before { margin-right: .5em; }
        .divider:not(:empty)::after { margin-left: .5em; }
        .form-options { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; font-size: 0.95rem; font-weight: 700; }
        .links { color: var(--color-primary); text-decoration: none; }
        .links:hover { text-decoration: underline; }
        #error-msg { display: none; color: #ef4444; background: #fee2e2; border: 1px solid #fca5a5; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; }
        .bg-element { position: fixed; z-index: 1; color: var(--color-text-muted); opacity: 0.1; }
    </style>
</head>
<body>
    <i class="fas fa-star bg-element animate-bounce" style="top: 10%; left: 10%; font-size: 4rem;"></i>
    <i class="fas fa-book bg-element" style="bottom: 10%; right: 10%; font-size: 6rem; transform: rotate(-20deg);"></i>

    <div class="login-wrapper">
        <div class="login-card">
            <div class="login-logo text-primary">
                <i class="fas fa-rocket"></i>
            </div>
            <h1 class="login-title">Welcome Back!</h1>
            <p class="login-subtitle">Ready for more fun learning?</p>

            <div id="error-msg"></div>

            <div class="divider">Login with email</div>

            <form id="loginForm" style="text-align: left;" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" id="password" class="form-input" placeholder="••••••••" required>
                </div>
                <div class="form-options">
                    <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                        <input type="checkbox" checked style="width:18px;height:18px;"> Remember me
                    </label>
                    <a href="#" class="links">Forgot Password?</a>
                </div>
                <button type="submit" id="login-btn" class="btn btn-primary" style="width:100%;font-size:1.25rem;">Sign In</button>
            </form>

            <p style="margin-top:30px;font-weight:700;color:var(--color-text-muted);">
                New here? <a href="register.php" class="links" style="color:var(--color-secondary);">Sign Up Free</a>
            </p>
        </div>
    </div>

    <?php include 'includes/footer.php'; ?>
    <script src="scripts/api.js"></script>
    <script>
        // Redirect if already logged in
        if (localStorage.getItem('token')) {
            const role = localStorage.getItem('role');
            window.location.href = role === 'admin' ? 'admin/dashboard.php' : 'index.php';
        }

        async function handleLogin(e) {
            e.preventDefault();
            const btn = document.getElementById('login-btn');
            const errDiv = document.getElementById('error-msg');
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            btn.innerText = 'Signing in...';
            btn.disabled = true;
            errDiv.style.display = 'none';

            try {
                const data = await window.api.login(email, password);
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userName', data.name);

                if (data.role === 'admin') {
                    window.location.href = 'admin/dashboard.php';
                } else {
                    window.location.href = 'index.php';
                }
            } catch (error) {
                errDiv.innerText = '❌ ' + error.message;
                errDiv.style.display = 'block';
                btn.innerText = 'Sign In';
                btn.disabled = false;
            }
        }
    </script>
</body>
</html>
