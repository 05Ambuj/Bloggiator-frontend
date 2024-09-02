function togglePasswordVisibility(inputId, iconId) {
    const passwordField = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);

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

async function checkUsernameExists(username) {
    try {
        const response = await fetch(
            `http://localhost:8080/public/check-username?username=${username}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return !data.available; // True if username is taken
    } catch (error) {
        console.error("Error checking username:", error);
        return true; // Assume taken if there's an error
    }
}

async function checkEmailExists(email) {
    try {
        const response = await fetch(
            `http://localhost:8080/public/check-email?email=${email}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return !data.available; // True if email is taken
    } catch (error) {
        console.error("Error checking email:", error);
        return true; // Assume taken if there's an error
    }
}

function validatePassword(password) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordPattern.test(password);
}

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("message").innerText = "Passwords do not match.";
        return;
    }
    if (!validatePassword(password)) {
        document.getElementById("message").innerText = "Password > 8, have at least each one of these [A-Z,a-z,0-9,symbols]";
        return;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
        document.getElementById("message").innerText = "Name can only contain letters and spaces.";
        return;
    }

    // Check username and email availability
    const usernameExists = await checkUsernameExists(username);
    const emailExists = await checkEmailExists(email);

    if (usernameExists) {
        document.getElementById("message").innerText = "Username already exists.";
        return;
    }
    if (emailExists) {
        document.getElementById("message").innerText = "Email already exists.";
        return;
    }

    // Show loader
    document.getElementById('loaderOverlay').style.display = 'flex';

    const payload = {
        name: name,
        userName: username,
        email: email,
        password: password,
        roles: ["USER"],
    };

    fetch("http://localhost:8080/public/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then((response) => {
        if (response.ok) {
            setTimeout(() => {
                window.location.href = "login.html?message=Registered successfully";
            }, 100); // Redirect after 100 milliseconds
        } else {
            return response.text().then((text) => {
                document.getElementById("message").innerText = `Registration failed: ${text}`;
            });
        }
    })
    .catch((error) => {
        document.getElementById("message").innerText = "Registration failed.";
        console.error("Error:", error);
    });
});
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