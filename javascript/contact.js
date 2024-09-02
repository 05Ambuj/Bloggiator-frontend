function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Show the SweetAlert popup
  Swal.fire({
    title: 'Thank You!',
    text: 'Your submission has been received.',
    icon: 'success',
    confirmButtonText: 'OK',
    allowOutsideClick: false,
    allowEscapeKey: false
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect to the "All Blogs" page after clicking "OK"
      window.location.href = 'all-blogs.html'; // Change this to your actual "All Blogs" page URL
    }
  });
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

    function closeMenuOnClickOutside(event) {
        const nav = document.getElementById("centered_nav");
        if (!nav.contains(event.target)) {
            nav.className = "rc_nav";
            document.removeEventListener("click", closeMenuOnClickOutside);
        }
    }