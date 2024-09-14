// Fetch the latest 20 reviews and display them when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchReviews();
});

function fetchReviews() {
    fetch('https://herd-chicken.pockethost.io/api/collections/reviews/records?perPage=20&sort=-created')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            return response.json();
        })
        .then(data => {
            displayReviews(data.items);
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
}

function displayReviews(reviews) {
    const reviewsDiv = document.getElementById('reviews');
    reviewsDiv.innerHTML = ''; // Clear any existing reviews

    reviews.forEach(review => {
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `
            <h3>${review.name ? review.name : 'Anonymous'}</h3>
            <p>${review.review}</p>
            <small>Posted on: ${new Date(review.created).toLocaleDateString()}</small>
        `;
        reviewsDiv.appendChild(newReview);
    });
}

// Submit a new review and post it to the API
function submitReview() {
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;

    if (review) {
        // Prepare data to send in POST request
        const data = {
            name: name || 'Anonymous', // Default to 'Anonymous' if no name is provided
            review: review
        };

        // POST request to Pocketbase backend
        fetch('https://herd-chicken.pockethost.io/api/collections/reviews/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            return response.json();
        })
        .then(data => {
            console.log('Review successfully posted:', data);
            // Re-fetch the reviews to show the latest
            fetchReviews();
        })
        .catch(error => {
            console.error('Error submitting review:', error);
        });

        // Clear the input fields
        document.getElementById('name').value = '';
        document.getElementById('review').value = '';
    } else {
        alert('Please fill in the review field.');
    }
}
