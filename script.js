// Load jobs from JSON and display them
async function loadJobs() {
    const response = await fetch("jobs.json");
    const jobs = await response.json();
    displayJobs(jobs);
}

function displayJobs(jobs) {
    const jobListings = document.getElementById("job-listings");
    jobListings.innerHTML = ""; // Clear existing listings
    jobs.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p class="location">${job.location}</p>
            <p>${job.description}</p>
            <button class="apply-button" data-job-title="${job.title}">Apply Now</button>
        `;
        jobListings.appendChild(jobCard);
    });

    // Add event listeners to the "Apply Now" buttons
    const applyButtons = document.querySelectorAll('.apply-button');
    applyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const jobTitle = event.target.getAttribute('data-job-title');
            openModal(jobTitle);
        });
    });
}

function openModal(jobTitle) {
    const modal = document.getElementById("job-modal");
    const jobTitleElement = document.getElementById("job-title");
    jobTitleElement.textContent = `You have applied for: ${jobTitle}`;
    modal.style.display = "block"; // Show the modal

    // Add event listener to close the modal
    const closeButton = document.querySelector(".close");
    closeButton.onclick = function() {
        modal.style.display = "none"; // Hide the modal
    };

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
        }
    };

    // Confirm button action
    const confirmButton = document.getElementById("confirm-apply");
    confirmButton.onclick = function() {
        alert(`You have confirmed your application for: ${jobTitle}`);
        modal.style.display = "none"; // Hide the modal after confirmation
    };
}




// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    
    // Update the toggle button icon
    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙"; // Moon icon for dark mode
    } else {
        themeToggle.textContent = "☀️"; // Sun icon for light mode
    }
});

// Search functionality
document.getElementById("search").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    fetch("jobs.json")
        .then(response => response.json())
        .then(jobs => {
            const filteredJobs = jobs.filter(job =>
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm)
            );
            displayJobs(filteredJobs);
        });
});

loadJobs();