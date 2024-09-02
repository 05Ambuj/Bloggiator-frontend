    // FORM SUBMISSION
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const title = document.getElementById("title").value;
        const content = quill.root.innerHTML; // Get the content from the Quill editor
        const files = document.getElementById("cover-image").files;

        // Create a FormData object
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        // Append the files to the FormData object
        Array.from(files).forEach((file, index) => {
        formData.append("files", file);
        });

        try {
        // Send the POST request to your backend
        const response = await fetch("/your-backend-endpoint", {
            method: "POST",
            body: formData,
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`, // Assuming JWT is used for authentication
            },
        });

        if (response.ok) {
            // Handle successful response
            const responseData = await response.json();

            // SweetAlert2 success popup
            Swal.fire({
            title: 'Success!',
            text: 'Blog post created successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
            }).then(() => {
            // Redirect or reset the form after the user clicks "OK"
            window.location.href = "./all-blogs.html"; // Redirect to "All Blogs" page, for example
            });
        } else {
            // Handle errors with a SweetAlert2 error popup
            Swal.fire({
            title: 'Error!',
            text: 'Failed to create blog post. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
            });
        }
        } catch (error) {
        console.error("Error submitting the blog post:", error);

        // SweetAlert2 error popup for exception
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while submitting the blog post. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        }
    });

    // Quill Editor
        document.addEventListener("DOMContentLoaded", () => {
            // Initialize Quill editor
            const quill = new Quill("#quill-editor-container", {
            theme: "snow",
            modules: {
                toolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                [{ align: [] }],
                ["clean"],
                ],
            },
            });
            document
            .getElementById("create-blog-form")
            .addEventListener("submit", function () {
                const content = document.querySelector(".ql-editor").innerHTML;
                document.getElementById("content").value = content;
            });
        });

        //Image Preview
        document
            .getElementById("cover-image")
            .addEventListener("change", function (event) {
            const previewContainer = document.getElementById("preview-container");
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                const previewItem = document.createElement("div");
                previewItem.classList.add("preview-item");
                previewItem.appendChild(img);
                const removeButton = document.createElement("button");
                removeButton.textContent = "×";
                removeButton.classList.add("remove-img");
                removeButton.onclick = function () {
                    previewItem.remove();
                    const dt = new DataTransfer();
                    Array.from(
                    document.getElementById("cover-image").files
                    ).forEach((file, index) => {
                    if (index !== i) dt.items.add(file);
                    });
                    document.getElementById("cover-image").files = dt.files;
                };
                previewItem.appendChild(removeButton);
                previewContainer.appendChild(previewItem);
                };
                reader.readAsDataURL(file);
            }
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

    function closeMenuOnClickOutside(event) {
        const nav = document.getElementById("centered_nav");
        if (!nav.contains(event.target)) {
            nav.className = "rc_nav";
            document.removeEventListener("click", closeMenuOnClickOutside);
        }
    }