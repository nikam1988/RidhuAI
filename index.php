<?php $page_title = "FunSheets - Kids Worksheets Made Joyful"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page_title ?></title>
    <?php include 'includes/header.php'; ?>
    <style>
        .hero-section { background-color: var(--color-bg); padding: 80px 0; overflow: hidden; position: relative; }
        .hero-container { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
        .hero-content { flex: 1; max-width: 500px; }
        .hero-title { font-size: 4rem; color: var(--color-primary); margin-bottom: 20px; text-shadow: var(--shadow-text); }
        .hero-subtitle { font-size: 1.25rem; color: var(--color-text-main); margin-bottom: 30px; font-weight: 700; }
        .hero-image { flex: 1; display: flex; justify-content: center; }
        .hero-image img { max-width: 100%; border-radius: var(--radius-lg); animation: bounce 6s infinite ease-in-out; box-shadow: var(--shadow-card); }
        .subjects-section { background-color: white; padding: 80px 0; }
        .subject-card { cursor: pointer; text-align: center; }
        .subject-icon { width: 120px; height: 120px; margin: 0 auto 20px; border-radius: 50%; background-color: #F0F4F8; padding: 10px; display: flex; align-items: center; justify-content: center; }
        .subject-icon img { width: 100%; height: 100%; object-fit: contain; }
        .popular-section { background-color: var(--color-bg); padding: 80px 0; }
        @media (max-width: 768px) {
            .hero-container { flex-direction: column; text-align: center; }
            .hero-title { font-size: 3rem; }
            .hero-content { margin: 0 auto; }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container hero-container" style="position: relative; z-index: 10;">
            <div class="hero-content">
                <h1 class="hero-title">Make Learning Joyful!</h1>
                <p class="hero-subtitle">Discover thousands of fun, colorful, and engaging worksheets for Kindergarten to 12th Grade. Spark your child's curiosity today!</p>
                <div class="flex gap-4" style="flex-wrap: wrap; justify-content: flex-start;">
                    <a href="categories.php" class="btn btn-primary" style="font-size: 1.2rem; padding: 18px 36px;">Explore Grades</a>
                    <a href="worksheets.php" class="btn btn-yellow" style="font-size: 1.2rem; padding: 18px 36px;">All Worksheets</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="assets/hero_illustration.png" alt="Happy child ready to learn" onerror="this.style.display='none'">
            </div>
        </div>
    </section>

    <!-- Subjects Section -->
    <section class="subjects-section text-center">
        <div class="container">
            <h2 class="section-title text-primary">Popular Subjects</h2>
            <p class="section-subtitle">Dive into our magical subjects tailor-made for young minds</p>
            <div class="grid grid-cols-4 subjects-grid" style="gap: 30px;">
                <a href="worksheets.php?subject=math" class="card subject-card">
                    <div class="subject-icon"><i class="fas fa-calculator" style="font-size:3rem;color:var(--color-primary)"></i></div>
                    <h3 class="text-primary">Mathematics</h3>
                    <p style="color:var(--color-text-muted);font-weight:bold;">850+ Sheets</p>
                </a>
                <a href="worksheets.php?subject=english" class="card subject-card">
                    <div class="subject-icon" style="background-color:#FFF8E1"><i class="fas fa-book-open" style="font-size:3rem;color:var(--color-secondary)"></i></div>
                    <h3 class="text-secondary">English ABCs</h3>
                    <p style="color:var(--color-text-muted);font-weight:bold;">620+ Sheets</p>
                </a>
                <a href="worksheets.php?subject=science" class="card subject-card">
                    <div class="subject-icon" style="background-color:#E2FBF5"><i class="fas fa-flask" style="font-size:3rem;color:#10B981"></i></div>
                    <h3 style="color:#10B981">Fun Science</h3>
                    <p style="color:var(--color-text-muted);font-weight:bold;">400+ Sheets</p>
                </a>
                <a href="worksheets.php?subject=art" class="card subject-card">
                    <div class="subject-icon" style="background-color:#FFF0F5"><i class="fas fa-palette" style="font-size:3rem;color:#F43F5E"></i></div>
                    <h3 style="color:#F43F5E">Arts & Crafts</h3>
                    <p style="color:var(--color-text-muted);font-weight:bold;">320+ Sheets</p>
                </a>
            </div>
        </div>
    </section>

    <!-- Popular Worksheets Section -->
    <section class="popular-section">
        <div class="container text-center">
            <h2 class="section-title text-yellow">Trending Worksheets</h2>
            <p class="section-subtitle">What parents and kids are loving right now</p>
            <div id="trending-grid" class="grid grid-cols-4" style="gap: 24px; text-align: left;">
                <p style="grid-column: span 4; text-align: center;"><i class="fas fa-spinner fa-spin text-primary"></i> Loading worksheets...</p>
            </div>
            <div style="margin-top: 40px;">
                <a href="worksheets.php" class="btn btn-primary" style="padding: 18px 40px; font-size: 1.2rem;">View All Worksheets <i class="fas fa-arrow-right" style="margin-left:10px;"></i></a>
            </div>
        </div>
    </section>

    <?php include 'includes/footer.php'; ?>
    <script src="scripts/api.js"></script>
    <script src="scripts/main.js"></script>
</body>
</html>
