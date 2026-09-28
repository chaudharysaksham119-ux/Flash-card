// Project 2 JavaScript
console.log('Project 2 loaded successfully!');

// Add your JavaScript code here
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Example: Add interactivity to your project
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('click', function() {
            console.log('Container clicked!');
        });
    }
});
