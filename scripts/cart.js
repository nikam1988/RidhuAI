document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    const renderCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            container.innerHTML = '<p>Your cart is empty. <a href="worksheets.html">Browse worksheets</a></p>';
            document.getElementById('cart-subtotal').innerText = '₹0';
            document.getElementById('cart-tax').innerText = '₹0';
            document.getElementById('cart-total').innerText = '₹0';
            return;
        }

        let html = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price;
            html += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-header">
                            <h3 class="cart-item-title">${item.title}</h3>
                            <div class="cart-item-price">₹${item.price}</div>
                        </div>
                        <div class="cart-item-actions" style="margin-top: 10px;">
                            <button class="item-remove" onclick="removeFromCart(${index})"><i class="fas fa-trash-alt"></i> Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        const tax = subtotal * 0.18;
        const total = subtotal + tax;

        document.getElementById('cart-subtotal').innerText = `₹${subtotal.toFixed(2)}`;
        document.getElementById('cart-tax').innerText = `₹${tax.toFixed(2)}`;
        document.getElementById('cart-total').innerText = `₹${total.toFixed(2)}`;
        
        // Update header count
        const badge = document.querySelector('fun-header')?.querySelector('.cart-count');
        if(badge) badge.innerText = cart.length;
    };

    window.removeFromCart = (index) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    renderCart();

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please sign in to checkout');
                window.location.href = 'login.html';
                return;
            }

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) return alert('Cart is empty');

            const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
            const total = subtotal + (subtotal * 0.18);
            
            const orderItems = cart.map(item => ({
                worksheet: item.id,
                price: item.price
            }));

            try {
                checkoutBtn.innerText = 'Processing...';
                await window.api.createOrder(orderItems, total);
                alert('Order placed successfully! Check your email for PDF downloads.');
                localStorage.removeItem('cart');
                renderCart();
            } catch (error) {
                alert('Checkout failed: ' + error.message);
            } finally {
                checkoutBtn.innerHTML = 'Checkout securely <i class="fas fa-lock" style="margin-left: 10px;"></i>';
            }
        });
    }
});
