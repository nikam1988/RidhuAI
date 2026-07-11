class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="main-footer">
          <div class="container">
              <div class="footer-grid">
                  <div class="footer-col">
                      <a href="index.html" class="site-logo" style="margin-bottom: 20px;">
                          <i class="fas fa-rocket" style="color: var(--color-primary)"></i> Fun<span>Sheets</span>
                      </a>
                      <p style="color: var(--color-text-muted); font-weight: 700; margin-bottom: 20px;">
                          Making learning an exciting adventure for kids from Kindergarten to 12th Grade.
                      </p>
                  </div>
                  
                  <div class="footer-col">
                      <h4>Categories</h4>
                      <ul>
                          <li><a href="worksheets.html?class=kg">KG to Grade 3</a></li>
                          <li><a href="worksheets.html?class=4th-8th">Grade 4 to Grade 8</a></li>
                          <li><a href="worksheets.html?class=highschool">High School</a></li>
                          <li><a href="worksheets.html">All Worksheets</a></li>
                      </ul>
                  </div>
                  
                  <div class="footer-col">
                      <h4>About</h4>
                      <ul>
                          <li><a href="about.html">Our Story</a></li>
                          <li><a href="contact.html">Contact Us</a></li>
                      </ul>
                  </div>
              </div>
              
              <div class="footer-bottom">
                  <p>&copy; 2026 FunSheets. Created for the Joy of Learning.</p>
              </div>
          </div>
      </footer>
    `;
  }
}

customElements.define('fun-footer', FooterComponent);
