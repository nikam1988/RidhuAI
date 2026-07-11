class HeaderComponent extends HTMLElement {
  connectedCallback() {
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    
    let actionsHtml = `
      <a href="login.html" class="btn btn-secondary">Sign In</a>
    `;

    if (token) {
      if (userRole === 'admin') {
        actionsHtml = `
          <a href="admin/dashboard.html" class="btn btn-primary" style="margin-right: 10px;">Admin Panel</a>
          <button onclick="logout()" class="btn btn-secondary">Logout</button>
        `;
      } else {
        actionsHtml = `
          <button onclick="logout()" class="btn btn-secondary">Logout</button>
        `;
      }
    }

    this.innerHTML = `
      <header class="main-header">
          <div class="container header-container">
              <a href="index.html" class="site-logo">
                  <i class="fas fa-rocket" style="color: var(--color-primary)"></i> Fun<span>Sheets</span>
              </a>
              
              <nav class="main-nav">
                  <ul>
                      <li><a href="index.html">Home</a></li>
                      <li><a href="categories.html">Classes</a></li>
                      <li><a href="worksheets.html">Worksheets</a></li>
                      <li><a href="games.html" style="color: var(--color-yellow); font-weight: 800;">Fun Games 🎮</a></li>
                      <li><a href="practice.html" style="color: var(--color-primary); font-weight: 800;">Practice Mode 🧠</a></li>
                      <li><a href="about.html">About</a></li>
                  </ul>
              </nav>
              
              <div class="header-actions">
                  ${actionsHtml}
                  <a href="cart.html" class="cart-icon">
                      <i class="fas fa-shopping-cart"></i>
                      <span class="cart-count">0</span>
                  </a>
                  <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
              </div>
          </div>
      </header>
    `;

    // Initialize mobile menu listener
    const mobileBtn = this.querySelector('.mobile-menu-btn');
    const mainNav = this.querySelector('.main-nav');
    if(mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Initialize cart count
    const cartCountEl = this.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cartCountEl) {
      cartCountEl.textContent = cart.length;
    }
  }
}

customElements.define('fun-header', HeaderComponent);

window.logout = function() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = 'index.html';
};
