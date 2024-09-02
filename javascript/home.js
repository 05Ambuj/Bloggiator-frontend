gsap.to(".text-content, .quote-container", {
  y: 0,
  opacity: 1,
  duration: 1,
  delay: 0.5,
  ease: "power3.out",
  stagger: {
    amount: 0.3,
  },
});

gsap.fromTo(
  ".section",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section",
      start: "top center",
      toggleActions: "play none none reverse",
    },
  }
);

  document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000, // 5 seconds delay
        disableOnInteraction: false,
      },
    });
  });
// Smooth scrolling using GSAP ScrollToPlugin
document.querySelectorAll(".nav_items a, #rc_logo a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("href");
    gsap.to(window, {
      scrollTo: target,
      duration: 1.5, // Duration of the scroll
      ease: "power2.inOut", // Smooth easing effect
    });
  });
});

// Authentication
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwt");

  // Improved check for token existence
  if (token && token !== "null" && token !== "undefined") {
    checkAuthentication(true); // Pass true if token exists
  } else {
    checkAuthentication(false); // Pass false if token doesn't exist
  }

  // Fetch blogs if authenticated
  if (token && token !== "null" && token !== "undefined") {
    fetch("https://bloggiator-backend-production.up.railway.app/bloggiator/all-blogs", {
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
            <a href="view-blog.html?id=${blog.id}" class="nft">
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

  const logoutButton = document.getElementById("logout_button");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("jwt");
    window.location.href = "./home.html"; // Redirect to home page
  });
});

function checkAuthentication(isLoggedIn) {
  const loginButton = document.getElementById("login_button");
  const registerButton = document.getElementById("register_button");
  const logoutButton = document.getElementById("logout_button");
  const userIcon = document.getElementById("user_icon");

  if (isLoggedIn) {
    // User is logged in
    loginButton.style.display = "none";
    registerButton.style.display = "none";
    logoutButton.style.display = "inline-block";
    userIcon.style.display = "inline-block"; // Show user icon
  } else {
    // User is not logged in
    loginButton.style.display = "inline-block";
    registerButton.style.display = "inline-block";
    logoutButton.style.display = "none";
    userIcon.style.display = "none"; // Hide user icon
  }
}
// function checkAuthentication(isLoggedIn) {
//   const loginButton = document.getElementById("login_button");
//   const registerButton = document.getElementById("register_button");
//   const logoutButton = document.getElementById("logout_button");

//   if (isLoggedIn) {
//     // User is logged in
//     loginButton.style.display = "none";
//     registerButton.style.display = "none";
//     logoutButton.style.display = "inline-block";
//   } else {
//     // User is not logged in
//     loginButton.style.display = "inline-block";
//     registerButton.style.display = "inline-block";
//     logoutButton.style.display = "none";
//   }
// }

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

// Smooth scrolling using GSAP
document.querySelectorAll(".nav_items a, #rc_logo a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("href");
    gsap.to(window, {
      scrollTo: target,
      duration: 1,
      ease: "power2.inOut",
    });
  });
});

// QUOTE ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    '"Welcome to Bloggiator, your go-to source for amazing content!"',
    '"Inspiration comes from within, and we\'re here to help you find it."',
    '"Join us and share your thoughts with the world!"',
    '"Discover, create, and engage with our vibrant community."',
  ];

  const quoteElement = document.getElementById("quote");
  let currentQuoteIndex = 0;

  function animateQuote() {
    const quote = quotes[currentQuoteIndex];

    // Type the quote
    gsap.fromTo(
      quoteElement,
      { text: "" },
      {
        text: quote,
        duration: quote.length * 0.1, // Adjust speed of typing here
        ease: "none",
        onComplete: () => {
          // Delay before clearing the text
          gsap.delayedCall(1, () => {
            // Split the text into characters
            const characters = quote.split("");
            // Create a timeline for the clearing animation
            const tl = gsap.timeline();
            characters.forEach((_, index) => {
              tl.to(
                quoteElement,
                {
                  text: {
                    value: quote.slice(0, quote.length - index - 1),
                    type: "split",
                    split: { type: "chars" },
                  },
                  duration: 0.1,
                  ease: "none",
                },
                index * 0.1
              ); // Adjust timing based on character index
            });
            tl.call(() => {
              // Move to the next quote
              currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
              animateQuote();
            });
          });
        },
      }
    );
  }

  animateQuote();
});

// Testimonials
let currentIndex = 0;
const testimonials = document.querySelectorAll(".testimonial-card");
const totalTestimonials = testimonials.length;
const slideInterval = 5000; // Interval in milliseconds (e.g., 5000ms = 5s)

function showTestimonial(index) {
  testimonials.forEach((card, i) => {
    card.style.display = i === index ? "block" : "none"; // Show only the current card
  });
}

function nextTestimonial() {
  currentIndex = currentIndex < totalTestimonials - 1 ? currentIndex + 1 : 0;
  showTestimonial(currentIndex);
}

// Automatically change testimonials every 5 seconds
setInterval(nextTestimonial, slideInterval);

// Initialize the first testimonial
showTestimonial(currentIndex);
