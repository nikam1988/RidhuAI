// main.js handles global UI bits and loading logic on pages

document.addEventListener('DOMContentLoaded', async () => {
    // Determine page by checking existence of containers
    const trendingGrid = document.getElementById('trending-grid');
    const allWorksheetsGrid = document.getElementById('all-worksheets-grid');
    
    // Index Page
    if (trendingGrid) {
        try {
            const worksheets = await window.api.getWorksheets();
            trendingGrid.innerHTML = ''; // clear loading
            if (worksheets.length === 0) {
                trendingGrid.innerHTML = '<p style="grid-column: span 4; text-align: center;">No worksheets found.</p>';
                return;
            }
            // just top 4
            const displaySheets = worksheets.slice(0, 4);
            let html = '';
            displaySheets.forEach(ws => {
                html += renderWorksheetCard(ws);
            });
            trendingGrid.innerHTML = html;
        } catch (error) {
            trendingGrid.innerHTML = `<p style="grid-column: span 4; text-align: center; color: red;">Error: ${error.message}</p>`;
        }
    }
    
    // Worksheets Page
    if (allWorksheetsGrid) {
        try {
            const params = new URLSearchParams(window.location.search);
            const classFilter = params.get('class') ? `?class=${params.get('class')}` : '';
            const worksheets = await window.api.getWorksheets(classFilter);
            allWorksheetsGrid.innerHTML = '';
            if (worksheets.length === 0) {
                allWorksheetsGrid.innerHTML = '<p style="grid-column: span 4; text-align: center;">No worksheets found for this category.</p>';
                return;
            }
            let html = '';
            worksheets.forEach(ws => {
                html += renderWorksheetCard(ws);
            });
            allWorksheetsGrid.innerHTML = html;
        } catch (error) {
            allWorksheetsGrid.innerHTML = `<p style="grid-column: span 4; text-align: center; color: red;">Error: ${error.message}</p>`;
        }
    }
    
    // Worksheet Detail Page
    const detailContainer = document.getElementById('worksheet-detail-container');
    if (detailContainer) {
        try {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (!id) throw new Error('No Worksheet ID provided');
            const ws = await window.api.getWorksheetById(id);
            const thumbnailUrl = ws.thumbnailUrl && ws.thumbnailUrl.startsWith('/uploads') 
                ? 'http://localhost:5000' + ws.thumbnailUrl 
                : ws.thumbnailUrl;
                
            detailContainer.innerHTML = `
                <!-- Gallery -->
                <div class="product-gallery">
                    <img src="${thumbnailUrl}" alt="${ws.title}" class="main-image">
                </div>

                <!-- Details -->
                <div class="product-details">
                    <h1 class="product-title">${ws.title}</h1>
                    <div class="product-price">₹${ws.price}</div>
                    
                    <p class="product-desc">${ws.description}</p>

                    <div class="product-meta">
                        <div class="meta-item">
                            <span class="meta-label">Subject</span>
                            <span class="meta-value" style="text-transform: capitalize;">${ws.subject}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Grade / Class</span>
                            <span class="meta-value" style="text-transform: capitalize;">${ws.classLevel}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Difficulty</span>
                            <span class="meta-value">${ws.difficulty}</span>
                        </div>
                    </div>

                    <div class="add-actions">
                        <button class="btn btn-primary" style="flex: 1; padding: 18px; font-size: 1.25rem;" onclick="addToCart('${ws.id}', '${ws.title}', ${ws.price}, '${ws.thumbnailUrl}')">
                            Add to Cart
                        </button>
                        ${ws.questions && ws.questions.length > 0 ? `
                            <a href="interactive-solve.html?id=${ws.id}" class="btn btn-yellow" style="flex: 1; padding: 18px; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                Solve Online <i class="fas fa-play"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        } catch (error) {
            detailContainer.innerHTML = `<p style="text-align: center; color: red;">Error: ${error.message}</p>`;
        }
    }
});
