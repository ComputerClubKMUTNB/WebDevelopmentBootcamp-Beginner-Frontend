const apiUrl = 'http://localhost:3000';

// Fetch and display items
function fetchItems() {
    fetch(apiUrl + "/items")
        .then((response) => response.json())
        .then((data) => {
            const list = document.getElementById('itemsList');
            list.innerHTML = '';
            data.forEach((item) => {
                const li = document.createElement('li');

                li.className = "list-group-item d-flex justify-content-between align-items-center";

                li.innerHTML = `
                <span class="fw-medium">${item.name}</span>
                <div class="btn-group btn-group-sm" role="group" aria-label="Item actions">
                    <button class="btn btn-outline-secondary" onclick="editItem(${item.id})" title="Edit">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteItem(${item.id})" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                `;
                list.appendChild(li);
            });
        });
}

// Add new item
function addItem() {
    const itemName = document.getElementById('itemName').value;
    const newItem = { name: itemName };
    fetch(apiUrl + "/items", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
    })
        .then((response) => response.json())
        .then(() => {
            fetchItems();
            document.getElementById('itemName').value = '';
        });
}

// Edit item
function editItem(id) {
    const newName = prompt('Enter new name:');
    if (newName) {
        const updatedItem = { name: newName };
        fetch(`${apiUrl}/items/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        })
        .then((response) => response.json())
        .then(() => fetchItems());
    }
}

// Delete item
function deleteItem(id) {
    fetch(`${apiUrl}/items/${id}`, { method: 'DELETE' }).then(() => fetchItems());
}

// Initialize
window.onload = fetchItems;
