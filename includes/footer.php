<?php
$is_admin = strpos($_SERVER['PHP_SELF'], '/admin/') !== false;
$base_path = $is_admin ? '../' : '';
?>
<footer class="main-footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="<?= $base_path ?>index.php" class="site-logo">
                    <i class="fas fa-rocket" style="color: var(--color-primary)"></i> Fun<span>Sheets</span>
                </a>
                <p>Making learning joyful for kids everywhere.</p>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="<?= $base_path ?>index.php">Home</a></li>
                    <li><a href="<?= $base_path ?>worksheets.php">Worksheets</a></li>
                    <li><a href="<?= $base_path ?>categories.php">Classes</a></li>
                    <li><a href="<?= $base_path ?>about.php">About Us</a></li>
                    <li><a href="<?= $base_path ?>contact.php">Contact</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Subjects</h4>
                <ul>
                    <li><a href="<?= $base_path ?>worksheets.php?subject=math">Mathematics</a></li>
                    <li><a href="<?= $base_path ?>worksheets.php?subject=english">English</a></li>
                    <li><a href="<?= $base_path ?>worksheets.php?subject=science">Science</a></li>
                    <li><a href="<?= $base_path ?>worksheets.php?subject=art">Arts & Crafts</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Connect</h4>
                <ul>
                    <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
                    <li><a href="#"><i class="fab fa-youtube"></i> YouTube</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?= date('Y') ?> FunSheets. Made with ❤️ for learning.</p>
        </div>
    </div>
</footer>
