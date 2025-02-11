// Hardcoded credentials (You can replace this with a backend authentication in a real app)
const correctUsername = 'admin';
const correctPassword = 'admin';

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get user input
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check if credentials match
    if (username === correctUsername && password === correctPassword) {
        // Save the user as logged in
        localStorage.setItem('loggedIn', 'true');

        // Redirect to the Budget Planner page
        window.location.href = 'index.html'; // Redirect to your budget planner page
    } else {
        alert('Invalid username or password');
    }
});
