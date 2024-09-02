document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwt");

  if (token && token !== "null" && token !== "undefined") {
    checkAuthentication(true);
    fetchBlogs("http://localhost:8080/bloggiator/all", token);
  } else {
    checkAuthentication(false);
    fetchBlogs("http://localhost:8080/bloggiator/all");
  }

  const logoutButton = document.getElementById("logout_button");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("jwt");
    window.location.href = "./home.html"; // Redirect to home page
  });
});

function fetchBlogs(url, token = null) {
  const headers = token
    ? {
        Authorization: "Bearer " + token,
      }
    : {};

  fetch("http://localhost:8080/bloggiator/all", {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((data) => {
      const blogsContainer = document.getElementById("blogsContainer");
      blogsContainer.innerHTML = data
        .map(
          (blog) => `
            <a href="blog-view.html?id=${blog.id}" class="nft">
              <div class="main">
                <img class="tokenImage" src="${
                  blog.imageUrls[0] || "default.jpg"
                }" alt="${blog.title}" />
                <h2>${blog.title}</h2>
                <div class="tokenInfo">
                  <div class="duration">
                    <ins>◷</ins>
                    <p>${new Date(blog.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p class="description">${
                  blog.content.length > 100
                    ? blog.content.substring(0, 200) + "..."
                    : blog.content
                }</p>
                <hr />
              </div>
            </a>`
        )
        .join("");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function checkAuthentication(isLoggedIn) {
  const loginButton = document.getElementById("login_button");
  const registerButton = document.getElementById("register_button");
  const logoutButton = document.getElementById("logout_button");
  const userIcon = document.getElementById("user_icon");

  if (isLoggedIn) {  
    loginButton.style.display = "none";
    registerButton.style.display = "none";
    logoutButton.style.display = "inline-block";
    userIcon.style.display = "inline-block"; // Show user icon
  } else {
    loginButton.style.display = "inline-block";
    registerButton.style.display = "inline-block";
    logoutButton.style.display = "none";
    userIcon.style.display = "none"; // Hide user icon
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


  // Fetch blogs if authenticated
  if (token && token !== "null" && token !== "undefined") {
    fetch("http://localhost:8080/bloggiator/all-blogs", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        const blogsContainer = document.getElementById("blogsContainer");
        blogsContainer.innerHTML = data
          .map(
            (blog) => `
            <a href="blog-view.html?id=${blog.id}" class="nft">
              <div class="main">
                <img class="tokenImage" src="${
                  blog.imageUrls[0] || "default.jpg"
                }" alt="${blog.title}" />
                <h2>${blog.title}</h2>
                <div class="tokenInfo">
                  <div class="duration">
                    <ins>◷</ins>
                    <p>${new Date(blog.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p class="description">${
                  blog.content.length > 100
                    ? blog.content.substring(0, 200) + "..."
                    : blog.content
                }</p>
                <hr />
              </div>
            </a>`
          )
          .join("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

//   const logoutButton = document.getElementById("logout_button");
//   logoutButton.addEventListener("click", () => {
//     localStorage.removeItem("jwt");
//     window.location.href = "./home.html"; // Redirect to home page
//   });
// });

// function checkAuthentication(isLoggedIn) {
//   const loginButton = document.getElementById("login_button");
//   const registerButton = document.getElementById("register_button");
//   const logoutButton = document.getElementById("logout_button");
//   const userIcon = document.getElementById("user_icon");

//   if (isLoggedIn) {
//     // User is logged in
//     loginButton.style.display = "none";
//     registerButton.style.display = "none";
//     logoutButton.style.display = "inline-block";
//     userIcon.style.display = "inline-block"; // Show user icon
//   } else {
//     // User is not logged in
//     loginButton.style.display = "inline-block";
//     registerButton.style.display = "inline-block";
//     logoutButton.style.display = "none";
//     userIcon.style.display = "none"; // Hide user icon
//   }
// }

// function toggleMenu() {
//   const nav = document.getElementById("centered_nav");
//   if (nav.className === "rc_nav") {
//     nav.className += " responsive";
//     document.addEventListener("click", closeMenuOnClickOutside);
//   } else {
//     nav.className = "rc_nav";
//     document.removeEventListener("click", closeMenuOnClickOutside);
//   }
// }

// function closeMenuOnClickOutside(event) {
//   const nav = document.getElementById("centered_nav");
//   if (!nav.contains(event.target)) {
//     nav.className = "rc_nav";
//     document.removeEventListener("click", closeMenuOnClickOutside);
//   }
// }
