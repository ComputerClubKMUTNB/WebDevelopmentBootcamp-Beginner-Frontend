// const apiUrl = 'http://localhost:3000';
const apiUrl = import.meta.env.API_URL || 'http://localhost:3000';
console.log(apiUrl);

function fetchItems() {
    fetch(apiUrl + "/items")
        .then((response) => response.json())
        .then((data) => {
            const list = document.getElementById("itemsList");
            list.innerHTML = "";

            data.forEach((item) => {
                const li = document.createElement("li");
                li.className =
                "flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2";

                li.innerHTML = `
                <span class="text-sm font-medium">${item.name}</span>
                <div class="flex gap-2">
                    <button
                    class="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
                    onclick="editItem(${item.id})"
                    >Edit</button>
                    <button
                    class="rounded-md bg-rose-600 px-3 py-1 text-sm text-white hover:bg-rose-700"
                    onclick="deleteItem(${item.id})"
                    >Delete</button>
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
window.addItem = addItem;
window.editItem = editItem;
window.deleteItem = deleteItem;