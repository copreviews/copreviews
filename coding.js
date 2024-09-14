<script>
function submitReview() {
            const name = document.getElementById('name').value;
            const review = document.getElementById('review').value;

            if (name && review) {
                const reviewsDiv = document.getElementById('reviews');
                
                const newReview = document.createElement('div');
                newReview.classList.add('review');
                
                newReview.innerHTML = `
                    <h3>${name}</h3>
                    <p>${review}</p>
                `;
                
                reviewsDiv.prepend(newReview);
                
                // Clear inputs
                document.getElementById('name').value = '';
                document.getElementById('review').value = '';
            } else {
                alert('Please fill in all fields.');
            }
        }








        /// extra



        document.addEventListener('DOMContentLoaded', () => {
            fetchReviews();
        });
        
        function fetchReviews() {
            fetch('/api/reviews')
                .then(response => response.json())
                .then(data => {
                    const reviewsDiv = document.getElementById('reviews');
                    data.forEach(review => {
                        const newReview = document.createElement('div');
                        newReview.classList.add('review');
                        newReview.innerHTML = `<h3>${review.name}</h3><p>${review.review}</p>`;
                        reviewsDiv.appendChild(newReview);
                    });
                });
        }
        
        function submitReview() {
            const name = document.getElementById('name').value;
            const review = document.getElementById('review').value;
        
            if (name && review) {
                const newReview = { name, review };
        
                fetch('/api/reviews', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReview)
                })
                .then(() => {
                    document.getElementById('name').value = '';
                    document.getElementById('review').value = '';
                    fetchReviews();
                });
            } else {
                alert('Please fill in all fields.');
            }
        }
    </script>
