        function togglePasswordVisibility() {
            const passwordField = document.getElementById('password');
            const eyeIcon = document.getElementById('eye-icon');

            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        }

            async function login(event) {
                event.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                try {
                    const response = await fetch('http://localhost:8080/public/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userName: username, password: password })
                    });
                    if (response.ok) {
                        const jwt = await response.text();
                        localStorage.setItem('jwt', jwt);
                        const popup = document.getElementById('popupMessage');
                        popup.classList.add('show');
                        setTimeout(() => {
                            window.location.href = 'all-blogs.html';
                        }, 2000); 
                    } else {
                        const error = await response.text();
                        document.getElementById('message').innerText = `Login failed: ${error}`;
                    }
                } catch (error) {
                    document.getElementById('message').innerText = `Login failed: ${error.message}`;
                }
}
            
document.addEventListener('DOMContentLoaded', function () {
        const jwtToken = localStorage.getItem('jwt');
        const loginButton = document.getElementById('login_button');
        const registerButton = document.getElementById('register_button');
        const userIcon = document.getElementById('user_icon');
        const logoutButton = document.getElementById('logout_button');

        // Toggle visibility based on authentication status
        if (jwtToken) {
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
            userIcon.style.display = 'block';
            logoutButton.style.display = 'block';
        } else {
            loginButton.style.display = 'block';
            registerButton.style.display = 'block';
            userIcon.style.display = 'none';
            logoutButton.style.display = 'none';
        }

        // Handle Logout
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('jwt'); // Destroy the JWT token
            window.location.reload(); // Reload the page to update the navbar
        });

        // Rest of your existing code...
    });

    function toggleMenu() {
        const nav = document.getElementById("centered_nav");
        if (nav.className === "rc_nav") {
            nav.className += " responsive";
            document.addEventListener("click", closeMenuOnClickOutside);
        } else {
            nav.className = "rc_nav";
            document.removeEventListener("click", closeMenuOnClickOutside);
        }
}
        function toggleMenu() {
        const nav = document.getElementById("centered_nav");
        if (nav.className === "rc_nav") {
            nav.className += " responsive";
            document.addEventListener("click", closeMenuOnClickOutside);
        } else {
            nav.className = "rc_nav";
            document.removeEventListener("click", closeMenuOnClickOutside);
        }
    }

    function closeMenuOnClickOutside(event) {
        const nav = document.getElementById("centered_nav");
        if (!nav.contains(event.target)) {
            nav.className = "rc_nav";
            document.removeEventListener("click", closeMenuOnClickOutside);
        }
    }