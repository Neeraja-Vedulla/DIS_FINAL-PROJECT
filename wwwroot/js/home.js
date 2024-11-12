// JavaScript for the image slider
let currentIndex = 0;
const images = document.querySelectorAll('.slider-image');
const totalImages = images.length;

function changeImage() {
    images.forEach((image, index) => {
        image.style.display = 'none';
    });
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].style.display = 'block';
}

// Initially display the first image
images.forEach((image, index) => {
    if (index !== 0) {
        image.style.display = 'none';
    }
});

// Set interval for image slider to change every 2 seconds
setInterval(changeImage, 2000);
// JavaScript for Testimonials Slider
let currentReviewIndex = 0;
const reviews = document.querySelectorAll('.review');

// Function to change the visible review every 5 seconds
function changeReview() {
    // Hide the current review
    reviews[currentReviewIndex].classList.remove('active');

    // Move to the next review, looping back to the first one if needed
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;

    // Show the next review
    reviews[currentReviewIndex].classList.add('active');
}

// Change review every 5 seconds
setInterval(changeReview, 5000);

