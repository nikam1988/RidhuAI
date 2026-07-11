<?php
// Get the current page for active link detection
$current_page = basename($_SERVER['PHP_SELF']);
$is_admin = strpos($_SERVER['PHP_SELF'], '/admin/') !== false;
$base_path = $is_admin ? '../' : '';
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="<?= $base_path ?>styles/style.css">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap" rel="stylesheet">

<header class="main-header">
    <div class="container header-container">
        <a href="<?= $base_path ?>index.php" class="site-logo">
            <i class="fas fa-rocket" style="color: var(--color-primary)"></i> Fun<span>Sheets</span>
        </a>

        <nav class="main-nav">
            <ul>
                <li><a href="<?= $base_path ?>index.php" <?= $current_page=='index.php'?'class="active"':'' ?>>Home</a></li>
                <li><a href="<?= $base_path ?>categories.php" <?= $current_page=='categories.php'?'class="active"':'' ?>>Classes</a></li>
                <li><a href="<?= $base_path ?>worksheets.php" <?= $current_page=='worksheets.php'?'class="active"':'' ?>>Worksheets</a></li>
                <li><a href="<?= $base_path ?>about.php" <?= $current_page=='about.php'?'class="active"':'' ?>>About</a></li>
            </ul>
        </nav>

        <div class="header-actions">
            <div id="header-auth-btns">
                <a href="<?= $base_path ?>login.php" class="btn btn-secondary">Sign In</a>
            </div>
            <a href="<?= $base_path ?>cart.php" class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" id="cart-count">0</span>
            </a>
            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
        </div>
    </div>
</header>

<script>
// Update header based on login status
(function() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const base = '<?= $base_path ?>';
    const authDiv = document.getElementById('header-auth-btns');
    if (token) {
        if (role === 'admin') {
            authDiv.innerHTML = `<a href="${base}admin/dashboard.php" class="btn btn-primary" style="margin-right:10px;">Admin Panel</a><button onclick="doLogout()" class="btn btn-secondary">Logout</button>`;
        } else {
            authDiv.innerHTML = `<button onclick="doLogout()" class="btn btn-secondary">Logout</button>`;
        }
    }
    // cart count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartEl = document.getElementById('cart-count');
    if(cartEl) cartEl.textContent = cart.length;

    // Mobile menu
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.main-nav');
        if(btn && nav) btn.addEventListener('click', () => nav.classList.toggle('active'));
    });
})();

function doLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '<?= $base_path ?>index.php';
}
</script>
