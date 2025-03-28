let token = '';

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message || data.error);
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.token) {
        token = data.token;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('tracker').style.display = 'block';
        getDefects();
    } else {
        alert(data.error);
    }
}

async function addDefect() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch('http://localhost:5000/defects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ title, description, status: 'Open', assignedTo: 'None' })
    });

    const data = await response.json();
    alert(data.message || data.error);
    getDefects();
}

async function getDefects() {
    const response = await fetch('http://localhost:5000/defects', {
        headers: { 'Authorization': token }
    });

    const data = await response.json();
    document.getElementById('defectList').innerHTML = data.map(d => `
        <li>
            ${d.title}: ${d.description} (Status: ${d.status}) 
            <button onclick="editDefect(${d.id})">Edit</button>
            <button onclick="deleteDefect(${d.id})">Delete</button>
        </li>
    `).join('');
}

async function editDefect(id) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    const newStatus = prompt('Enter new status: (Open/In Progress/Closed)');
    const newAssignedTo = prompt('Enter assigned person:');

    if (!newTitle || !newDescription || !newStatus || !newAssignedTo) {
        alert('All fields are required!');
        return;
    }

    const response = await fetch(`http://localhost:5000/defects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ title: newTitle, description: newDescription, status: newStatus, assignedTo: newAssignedTo })
    });

    const data = await response.json();
    alert(data.message || data.error);
    getDefects();
}

async function deleteDefect(id) {
    if (!confirm('Are you sure you want to delete this defect?')) return;

    const response = await fetch(`http://localhost:5000/defects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
    });

    const data = await response.json();
    alert(data.message || data.error);
    getDefects();
}
