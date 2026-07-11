<?php $page_title = "Admin Dashboard - FunSheets"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page_title ?></title>
    <?php include '../includes/header.php'; ?>
    <style>
        body { background-color: #F8FAFC; }
        .admin-header { background: white; padding: 20px 40px; border-bottom: 2px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; }
        .admin-container { padding: 40px; max-width: 1200px; margin: 0 auto; }
        .stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
        .stat-card { background: white; padding: 24px; border-radius: var(--radius-lg); border: 2px solid #E2E8F0; border-bottom: 4px solid var(--color-primary); }
        .stat-value { font-size: 2.5rem; color: var(--color-primary); font-family: 'Fredoka One', cursive; }
        .section-panel { background: white; padding: 30px; border-radius: var(--radius-lg); border: 2px solid #E2E8F0; margin-bottom: 40px; }
        .section-panel h2 { margin-bottom: 20px; color: var(--color-primary); }
        .data-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .data-table th, .data-table td { padding: 15px; text-align: left; border-bottom: 1px solid #E2E8F0; }
        .data-table th { background: #F1F5F9; font-weight: 700; color: #475569; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; }
        .data-table tr:hover td { background: #F8FAFC; }
        form .form-group { margin-bottom: 15px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .upload-btn { margin-top: 10px; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }
        .badge-easy { background: #D1FAE5; color: #059669; }
        .badge-medium { background: #FEF3C7; color: #D97706; }
        .badge-hard { background: #FEE2E2; color: #DC2626; }
        #toast { position: fixed; bottom: 30px; right: 30px; background: #10B981; color: white; padding: 16px 24px; border-radius: 12px; font-weight: 700; display: none; z-index: 9999; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    </style>
</head>
<body>

    <div class="admin-header">
        <a href="../index.php" class="site-logo">
            <i class="fas fa-rocket" style="color: var(--color-primary)"></i> Fun<span>Sheets</span> <span style="color:#64748b;font-size:0.8rem;margin-left:8px;">Admin Panel</span>
        </a>
        <div>
            <span id="admin-name" style="font-weight:700;margin-right:20px;color:#475569;"></span>
            <button onclick="doLogout()" class="btn btn-secondary">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    </div>

    <div class="admin-container">

        <!-- Stats -->
        <div class="stat-cards">
            <div class="stat-card">
                <p style="color:#64748b;font-weight:700;margin-bottom:8px;"><i class="fas fa-file-alt" style="margin-right:8px;color:var(--color-primary)"></i>Total Worksheets</p>
                <div class="stat-value" id="stat-worksheets">...</div>
            </div>
            <div class="stat-card" style="border-bottom-color:#F59E0B">
                <p style="color:#64748b;font-weight:700;margin-bottom:8px;"><i class="fas fa-shopping-bag" style="margin-right:8px;color:#F59E0B"></i>Total Orders</p>
                <div class="stat-value" style="color:#F59E0B" id="stat-orders">...</div>
            </div>
            <div class="stat-card" style="border-bottom-color:#8B5CF6">
                <p style="color:#64748b;font-weight:700;margin-bottom:8px;"><i class="fas fa-users" style="margin-right:8px;color:#8B5CF6"></i>Total Users</p>
                <div class="stat-value" style="color:#8B5CF6" id="stat-users">1</div>
            </div>
        </div>

        <!-- Add Worksheet Form -->
        <div class="section-panel">
            <h2><i class="fas fa-plus-circle"></i> Add New Worksheet</h2>
            <form id="addWorksheetForm" enctype="multipart/form-data">
                <div class="grid-2">
                    <div class="form-group">
                        <label class="form-label">Title *</label>
                        <input type="text" id="ws-title" class="form-input" placeholder="e.g. Addition for Class 2" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Price (₹) *</label>
                        <input type="number" id="ws-price" class="form-input" value="0" min="0" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Description *</label>
                    <textarea id="ws-desc" class="form-input" rows="3" placeholder="Brief description of this worksheet..." required></textarea>
                </div>
                <div class="grid-3">
                    <div class="form-group">
                        <label class="form-label">Subject *</label>
                        <select id="ws-subject" class="form-input">
                            <option value="math">Mathematics</option>
                            <option value="english">English</option>
                            <option value="science">Science</option>
                            <option value="art">Arts & Crafts</option>
                            <option value="evs">EVS</option>
                            <option value="hindi">Hindi</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Class Level *</label>
                        <select id="ws-class" class="form-input">
                            <option value="kg">KG</option>
                            <option value="class1">Class 1</option>
                            <option value="class2">Class 2</option>
                            <option value="class3">Class 3</option>
                            <option value="class4">Class 4</option>
                            <option value="class5">Class 5</option>
                            <option value="class6">Class 6</option>
                            <option value="class7">Class 7</option>
                            <option value="class8">Class 8</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Difficulty</label>
                        <select id="ws-difficulty" class="form-input">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                </div>
                <div class="grid-2">
                    <div class="form-group">
                        <label class="form-label">Thumbnail Image (PNG/JPG)</label>
                        <input type="file" id="ws-thumbnail" class="form-input" accept="image/*" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Worksheet File (PDF)</label>
                        <input type="file" id="ws-file" class="form-input" accept="application/pdf" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary upload-btn" id="submit-btn">
                    <i class="fas fa-upload"></i> Upload Worksheet
                </button>
            </form>
        </div>

        <!-- Manage Worksheets Table -->
        <div class="section-panel">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <h2 style="margin:0"><i class="fas fa-list"></i> Manage Worksheets</h2>
                <button onclick="loadTable()" class="btn btn-secondary" style="padding:8px 16px;font-size:0.9rem;">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Class</th>
                        <th>Difficulty</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="worksheets-tbody">
                    <tr><td colspan="6" style="text-align:center;padding:30px;"><i class="fas fa-spinner fa-spin"></i> Loading worksheets...</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id="toast"></div>

    <script src="../scripts/api.js"></script>
    <script>
        // Admin auth check
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'admin') {
            alert('Admin access only! Please login.');
            window.location.href = '../login.php';
        }

        // Show admin name
        const nameEl = document.getElementById('admin-name');
        const uname = localStorage.getItem('userName');
        if (nameEl && uname) nameEl.innerText = '👋 ' + uname;

        function showToast(msg, isError = false) {
            const t = document.getElementById('toast');
            t.innerText = msg;
            t.style.background = isError ? '#EF4444' : '#10B981';
            t.style.display = 'block';
            setTimeout(() => t.style.display = 'none', 3000);
        }

        const loadTable = async () => {
            const tbody = document.getElementById('worksheets-tbody');
            const statWs = document.getElementById('stat-worksheets');
            const statOrders = document.getElementById('stat-orders');
            try {
                const worksheets = await window.api.getWorksheets();
                if (statWs) statWs.innerText = worksheets.length;
                if (statOrders) statOrders.innerText = '0';

                if (worksheets.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#94a3b8;"><i class="fas fa-folder-open" style="font-size:2rem;display:block;margin-bottom:10px;"></i> No worksheets yet. Add your first one above!</td></tr>';
                    return;
                }

                let html = '';
                worksheets.forEach(ws => {
                    const diffClass = ws.difficulty === 'Easy' ? 'badge-easy' : ws.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';
                    html += `
                    <tr>
                        <td style="font-weight:bold;">${ws.title}</td>
                        <td style="text-transform:capitalize;">${ws.subject}</td>
                        <td style="text-transform:uppercase;">${ws.classLevel}</td>
                        <td><span class="badge ${diffClass}">${ws.difficulty}</span></td>
                        <td>₹${ws.price}</td>
                        <td>
                            <button onclick="deleteWs('${ws.id}')" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:1.1rem;" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                });
                tbody.innerHTML = html;
            } catch (error) {
                tbody.innerHTML = `<tr><td colspan="6" style="color:red;padding:20px;text-align:center;">Error loading: ${error.message}</td></tr>`;
            }
        };

        window.deleteWs = async (id) => {
            if (confirm('Are you sure you want to delete this worksheet?')) {
                try {
                    await window.api.deleteWorksheet(id);
                    showToast('✅ Worksheet deleted!');
                    loadTable();
                } catch (err) {
                    showToast('❌ Delete failed: ' + err.message, true);
                }
            }
        };

        const addForm = document.getElementById('addWorksheetForm');
        if (addForm) {
            addForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append('title', document.getElementById('ws-title').value);
                formData.append('price', document.getElementById('ws-price').value);
                formData.append('description', document.getElementById('ws-desc').value);
                formData.append('subject', document.getElementById('ws-subject').value);
                formData.append('classLevel', document.getElementById('ws-class').value);
                formData.append('difficulty', document.getElementById('ws-difficulty').value);
                formData.append('thumbnail', document.getElementById('ws-thumbnail').files[0]);
                formData.append('file', document.getElementById('ws-file').files[0]);

                const btn = document.getElementById('submit-btn');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
                btn.disabled = true;

                try {
                    await window.api.createWorksheet(formData);
                    showToast('✅ Worksheet uploaded successfully!');
                    addForm.reset();
                    loadTable();
                } catch (err) {
                    showToast('❌ Upload failed: ' + err.message, true);
                } finally {
                    btn.innerHTML = '<i class="fas fa-upload"></i> Upload Worksheet';
                    btn.disabled = false;
                }
            });
        }

        loadTable();
    </script>
</body>
</html>
