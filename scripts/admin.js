document.addEventListener('DOMContentLoaded', async () => {
    // Check if admin is logged in
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (!token || role !== 'admin') {
        alert('Unauthorized! Admin access only.');
        window.location.href = '../login.html';
        return;
    }

    const loadTable = async () => {
        const tbody = document.getElementById('worksheets-tbody');
        const statWs = document.getElementById('stat-worksheets');
        try {
            const worksheets = await window.api.getWorksheets();
            if (statWs) statWs.innerText = worksheets.length;

            if (worksheets.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No worksheets found. Add one above!</td></tr>';
                return;
            }

            let html = '';
            worksheets.forEach(ws => {
                html += `
                    <tr>
                        <td style="font-weight: bold;">${ws.title}</td>
                        <td style="text-transform: capitalize;">${ws.subject}</td>
                        <td style="text-transform: uppercase;">${ws.classLevel}</td>
                        <td>₹${ws.price}</td>
                        <td>
                            <button onclick="deleteWs('${ws.id}')" style="background: none; border: none; color: var(--color-red); cursor: pointer; font-size: 1.1rem;"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="5" style="color: red;">Error: ${error.message}</td></tr>`;
        }
    };

    window.deleteWs = async (id) => {
        if(confirm('Are you sure you want to delete this worksheet?')) {
            try {
                await window.api.deleteWorksheet(id);
                loadTable();
            } catch (err) {
                alert('Deletion failed: ' + err.message);
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

            const submitBtn = addForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Uploading...';
            submitBtn.disabled = true;

            try {
                await window.api.createWorksheet(formData);
                alert('Worksheet created successfully!');
                addForm.reset();
                loadTable();
            } catch (error) {
                alert('Upload failed: ' + error.message);
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    loadTable();
});

window.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '../index.html';
};
