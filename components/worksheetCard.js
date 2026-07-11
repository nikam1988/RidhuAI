const renderWorksheetCard = (worksheet) => {
  const thumbnailUrl = worksheet.thumbnailUrl && worksheet.thumbnailUrl.startsWith('/uploads') 
    ? 'http://localhost:5000' + worksheet.thumbnailUrl 
    : worksheet.thumbnailUrl;
    
  return `
    <div class="card worksheet-card">
        ${worksheet.difficulty === 'Easy' ? '<div class="worksheet-badge" style="background-color: var(--color-primary); border-color: var(--color-primary-dark)">Easy</div>' : ''}
        <a href="worksheet-detail.html?id=${worksheet.id}" class="worksheet-img-container">
            <img src="${thumbnailUrl}" alt="${worksheet.title}">
        </a>
        <div class="worksheet-info">
            <h3><a href="worksheet-detail.html?id=${worksheet.id}">${worksheet.title}</a></h3>
            <div class="worksheet-meta">
                <span><i class="fas fa-star text-yellow"></i> ${worksheet.rating || 5.0}</span>
                <span style="text-transform: capitalize;"><i class="fas fa-graduation-cap"></i> ${worksheet.classLevel}</span>
            </div>
        </div>
        <div class="worksheet-footer">
            <div class="worksheet-price">₹${worksheet.price}</div>
            <button class="btn btn-primary add-to-cart btn-icon" title="Add to Cart" onclick="addToCart('${worksheet.id}', '${worksheet.title}', ${worksheet.price}, '${worksheet.thumbnailUrl}')"><i class="fas fa-plus"></i></button>
        </div>
    </div>
  `;
};

window.addToCart = (id, title, price, img) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const fullImg = img && img.startsWith('/uploads') ? 'http://localhost:5000' + img : img;
  cart.push({ id, title, price, img: fullImg });
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Create toast notification
  const toast = document.createElement('div');
  toast.innerText = 'Added to Cart!';
  toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--color-secondary); color: white; padding: 15px 30px; border-radius: 10px; font-weight: bold; z-index: 1000; box-shadow: 0 5px 15px rgba(0,0,0,0.2)';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);

  // Update header count if loaded
  const badge = document.querySelector('fun-header')?.querySelector('.cart-count');
  if(badge) badge.innerText = cart.length;
};
