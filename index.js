
document.addEventListener('DOMContentLoaded', function () {
    const url = "https://fakestoreapi.com/products/category/women's%20clothing";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products-container');
            const cartIcon = document.getElementById('cart-icon');
            const cartModal = document.getElementById('cart-modal');
            const cartContent = document.querySelector('.modal-content');
            const closeButton = document.querySelector('.close');

            // Initialize cart items and quantities
            const cartItems = {};

            data.forEach(product => {
                const { id, title, image, description, price } = product;

                const productElement = document.createElement('div');
                productElement.classList.add('product');

                productElement.innerHTML = `
                    <h2>${title}</h2>
                    <img src="${image}" alt="${title}" style="max-width: 100px;">
                    <p class="description">${description}</p>
                    <p id="price">Price: $${price}</p>
                    <button class="add-to-cart" data-id="${id}">Add to Cart</button>
                    <span class="toggle">▼ Show Description</span>
                    <hr>
                `;

                productsContainer.appendChild(productElement);

                const addToCartButton = productElement.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', function () {
                    const productId = parseInt(addToCartButton.dataset.id);
                    if (cartItems[productId]) {
                        cartItems[productId]++;
                    } else {
                        cartItems[productId] = 1;
                    }
                    updateCart();
                    closeButton.style.display = 'block'; // Show close button when items are added
                    alert('Item added to cart.');
                });

                const toggleButton = productElement.querySelector('.toggle');
                const descriptionElement = productElement.querySelector('.description');

                toggleButton.addEventListener('click', function () {
                    if (descriptionElement.style.display === 'none') {
                        descriptionElement.style.display = 'block';
                        toggleButton.textContent = '▲ Hide Description';
                    } else {
                        descriptionElement.style.display = 'none';
                        toggleButton.textContent = '▼ Show Description';
                    }
                });
            });

            // Function to update the cart content
            function updateCart() {
                cartContent.innerHTML = '';
                let totalPrice = 0;
                for (const productId in cartItems) {
                    const quantity = cartItems[productId];
                    const selectedItem = data.find(item => item.id === parseInt(productId));
                    if (selectedItem) {
                        const cartItem = document.createElement('div');
                        cartItem.classList.add('cart-item');
                        cartItem.innerHTML = `
                            <img src="${selectedItem.image}" alt="${selectedItem.title}" style="max-width: 50px;">
                            <p>${selectedItem.title} - $${selectedItem.price} (${quantity})</p>
                        `;
                        cartItem.addEventListener('click', function () {
                            // Decrement the quantity of the clicked item in the cart
                            if (cartItems[productId] > 1) {
                                cartItems[productId]--;
                            } else {
                                delete cartItems[productId]; // Remove the item if quantity is 1
                            }
                            updateCart(); // Update the cart display
                        });
                        cartContent.appendChild(cartItem);
                        totalPrice += selectedItem.price * quantity; // Calculate total price
                    }
                }
                // Display total price in cart modal
                const totalDisplay = document.createElement('div');
                totalDisplay.classList.add('total');
                totalDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
                cartContent.appendChild(totalDisplay);

                // Append "Buy Now" button to cart modal
                const buyNowButton = document.createElement('button');
                buyNowButton.classList.add('buy-now');
                buyNowButton.textContent = 'Buy Now';
                buyNowButton.addEventListener('click', function () {
                    alert('You have bought the items.');
                });
                cartContent.appendChild(buyNowButton);
            }

            // Toggle cart modal visibility when clicking the cart icon
            cartIcon.addEventListener('click', function () {
                if (Object.keys(cartItems).length === 0) {
                    alert('Add item!');
                } else {
                    cartModal.style.display = 'block';
                    closeButton.style.display = 'block'; // Show close button when modal is opened
                    updateCart(); // Update cart content
                }
            });

            // Close cart modal when clicking the close button
            closeButton.addEventListener('click', function () {
                cartModal.style.display = 'none';
                closeButton.style.display = 'none'; // Hide close button when modal is closed

                // Remove total price display from cart modal
                const totalDisplay = document.querySelector('.total');
                if (totalDisplay) {
                    totalDisplay.remove();
                }
            });

            // Close cart modal when clicking outside the modal
            window.addEventListener('click', function (event) {
                if (event.target === cartModal) {
                    cartModal.style.display = 'none';
                    closeButton.style.display = 'none'; // Hide close button when modal is closed

                    // Remove total price display from cart modal
                    const totalDisplay = document.querySelector('.total');
                    if (totalDisplay) {
                        totalDisplay.remove();
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
