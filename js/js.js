// dark mode and lightmode code from code from https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/#get-theme-preference-from-local-storage

// Select the theme toggle button and icons
const themeToggleButton = document.querySelector('[data-theme-toggle]');
const sunIcon = themeToggleButton.querySelector('.fa-sun');
const moonIcon = themeToggleButton.querySelector('.fa-moon');

// Get the user's saved theme preference from localStorage
let currentThemeSetting = localStorage.getItem('theme') || 'light';

// Function to update the theme
function updateTheme(newTheme) {
    // Update the theme attribute on the HTML element
    document.documentElement.setAttribute('data-theme', newTheme);

    // Save the new theme in localStorage
    localStorage.setItem('theme', newTheme);

    // Update the button text and aria-label
    const newCta = newTheme === 'dark' ? 'Change to light theme' : 'Change to dark theme';
    themeToggleButton.setAttribute('aria-label', newCta);

    // Toggle the icons
    if (newTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
        showNotification('Dark mode on'); 
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
        showNotification('Light mode on');
    }

    // Update the current theme setting in memory
    currentThemeSetting = newTheme;
}

// Initialize the theme on page load
updateTheme(currentThemeSetting);

// Add event listener to toggle the theme
themeToggleButton.addEventListener('click', () => {
    const newTheme = currentThemeSetting === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
});


// Function to show a notification
function showNotification(message) {
    // Create a notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(12, 103, 41, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.fontSize = '1rem';
    notification.style.opacity = '1';
    notification.style.transition = 'opacity 0.5s ease';

    // Append the notification to the body
    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500); // Wait for the fade-out transition
    }, 3000);
}
