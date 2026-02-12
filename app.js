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
                li.innerHTML = `${item.name}
                <button onclick="editItem(${item.id})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>`;
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
