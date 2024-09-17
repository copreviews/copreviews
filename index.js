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



function openPopup(type) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    
    if (type === 'contact') {
        popupText.innerHTML = `
            <h2>Contact</h2>
            <p>For inquiries, please email us at <a href="mailto:copreviews@proton.me">copreviews@proton.me</a></p>`;
    } else if (type === 'legal') {
        popupText.innerHTML = `
            <h2>Legal Notice</h2>
            <div class="scrollable">
                <p>Copyright Notice<br>https://copreviews.com/ © 2024. All rights reserved.<br><br>
                All content, materials, and intellectual property on this website (hereinafter referred to as "the Site"), including but not limited to text, images, and design elements, are the exclusive property of https://copreviews.com/ and are protected by U.S. and international copyright laws.<br><br>
                You may not modify, copy, reproduce, republish, upload, post, transmit, or distribute any material from the Site in any way without prior written consent from https://copreviews.com/.<br><br>
                User-Generated Content<br>The Site allows users to post reviews and opinions about police officers (hereinafter referred to as "Reviews"). By submitting a Review, you grant https://copreviews.com/ a worldwide, royalty-free, and non-exclusive license to use, distribute, reproduce, modify, adapt, publish, translate, publicly display, and perform such content.<br><br>
                You represent and warrant that you own or have the necessary rights to all content you post and that the posting of your content does not violate any laws or infringe upon the rights of others.<br><br>
                https://copreviews.com/ does not endorse or take responsibility for any Reviews posted by users. All opinions expressed in Reviews are those of the respective authors. https://copreviews.com/ reserves the right to remove any content that violates our policies or applicable laws.<br><br>
                Limitation of Liability<br>https://copreviews.com/ makes no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or completeness of the information presented on the Site. In no event shall https://copreviews.com/ be liable for any damages arising out of or in connection with the use of this Site or the information provided herein.</p>
            </div>`;
    }
    
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}