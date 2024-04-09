// document.addEventListener("DOMContentLoaded", function () {
//   const url = "https://fakestoreapi.com/products/category/women's%20clothing";

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const productsContainer = document.getElementById("products-container");
//       const cartIcon = document.getElementById("cart-icon");
//       const cartModal = document.getElementById("cart-modal");
//       const cartContent = document.querySelector(".modal-content");
//       const closeButton = document.querySelector(".close");

//       // Initialize cart items
//       let cartItems = [];

//       data.forEach((product) => {
//         const { id, title, image, description, price } = product;

//         const productElement = document.createElement("div");
//         productElement.classList.add("product");

//         productElement.innerHTML = `
//                     <h2>${title}</h2>
//                     <img src="${image}" alt="${title}" style="max-width: 100px;">
//                     <p class="description">${description}</p>
//                     <p id="price">Price: $${price}</p>
//                     <button class="add-to-cart" data-id="${id}">Add to Cart</button>
//                     <span class="toggle">▼ Show Description</span>
//                     <hr>
//                 `;

//         productsContainer.appendChild(productElement);

//         const addToCartButton = productElement.querySelector(".add-to-cart");
//         addToCartButton.addEventListener("click", function () {
//           const productId = parseInt(addToCartButton.dataset.id);
//           const selectedItem = data.find((item) => item.id === productId);

//           if (selectedItem) {
//             cartItems.push(selectedItem);
//             updateCart();
//             closeButton.style.display = "block"; // Show close button when items are added
//             alert("Item added to cart.");
//           }
//         });

//         const toggleButton = productElement.querySelector(".toggle");
//         const descriptionElement = productElement.querySelector(".description");

//         toggleButton.addEventListener("click", function () {
//           if (descriptionElement.style.display === "none") {
//             descriptionElement.style.display = "block";
//             toggleButton.textContent = "▲ Hide Description";
//           } else {
//             descriptionElement.style.display = "none";
//             toggleButton.textContent = "▼ Show Description";
//           }
//         });
//       });

//       // Function to update the cart content
//       function updateCart() {
//         cartContent.innerHTML = "";
//         cartItems.forEach((item) => {
//           const cartItem = document.createElement("div");
//           cartItem.classList.add("cart-item");
//           cartItem.innerHTML = `
//                         <img src="${item.image}" alt="${item.title}" style="max-width: 50px;">
//                         <p>${item.title} - $${item.price}</p>
//                     `;
//           cartItem.addEventListener("click", function () {
//             // Remove the clicked item from the cartItems array
//             cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
//             updateCart(); // Update the cart display
//           });
//           cartContent.appendChild(cartItem);
//         });
//       }

//       // Toggle cart modal visibility when clicking the cart icon
//       cartIcon.addEventListener("click", function () {
//         cartModal.style.display = "block";
//         closeButton.style.display = "block"; // Show close button when modal is opened
//       });

//       // Close cart modal when clicking the close button
//       closeButton.addEventListener("click", function () {
//         cartModal.style.display = "none";
//         closeButton.style.display = "none"; // Hide close button when modal is closed
//       });

//       // Close cart modal when clicking outside the modal
//       window.addEventListener("click", function (event) {
//         if (event.target === cartModal) {
//           cartModal.style.display = "none";
//           closeButton.style.display = "none"; // Hide close button when modal is closed
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const url = "https://fakestoreapi.com/products/category/women's%20clothing";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products-container');
            const cartIcon = document.getElementById('cart-icon');
            const cartModal = document.getElementById('cart-modal');
            const cartContent = document.querySelector('.modal-content');
            const closeButton = document.querySelector('.close');
            const totalDisplay = document.getElementById('total');
            const cartBadge = document.getElementById('cart-badge');

            // Initialize cart items and total price
            let cartItems = [];
            let totalPrice = 0;

            data.forEach(product => {
                const { id, title, image, description, price } = product;

                const productElement = document.createElement('div');
                productElement.classList.add('product');

                productElement.innerHTML = `
                    <h2>${title}</h2>
                    <img src="${image}" alt="${title}" style="max-width: 100px;">
                    <p class="description">${description}</p>
                    <p>Price: $${price}</p>
                    <button class="add-to-cart" data-id="${id}">Add to Cart</button>
                    <span class="toggle">▼ Show Description</span>
                    <hr>
                `;

                productsContainer.appendChild(productElement);

                const addToCartButton = productElement.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', function() {
                    const productId = parseInt(addToCartButton.dataset.id);
                    const selectedItem = data.find(item => item.id === productId);

                    if (selectedItem) {
                        cartItems.push(selectedItem);
                        totalPrice += selectedItem.price; // Add price of the selected item to total price
                        updateCart();
                        closeButton.style.display = 'block'; // Show close button when items are added
                        alert('Item added to cart.');
                    }
                });

                const toggleButton = productElement.querySelector('.toggle');
                const descriptionElement = productElement.querySelector('.description');

                toggleButton.addEventListener('click', function() {
                    if (descriptionElement.style.display === 'none') {
                        descriptionElement.style.display = 'block';
                        toggleButton.textContent = '▲ Hide Description';
                    } else {
                        descriptionElement.style.display = 'none';
                        toggleButton.textContent = '▼ Show Description';
                    }
                });
            });

            // Function to update the cart content and total price display
            function updateCart() {
                cartContent.innerHTML = '';
                totalPrice = 0; // Reset total price before recalculating
                cartItems.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" style="max-width: 50px;">
                        <p>${item.title} - $${item.price}</p>
                    `;
                    cartItem.addEventListener('click', function() {
                        // Remove the clicked item from the cartItems array and subtract its price from total price
                        cartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                        totalPrice -= item.price;
                        updateCart(); // Update the cart display and total price
                    });
                    cartContent.appendChild(cartItem);
                    totalPrice += item.price; // Add price of each item to total price
                });
                totalDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`; // Display the total price

                // Update cart badge with the total number of items in the cart
                cartBadge.textContent = cartItems.length;
            }

            // Toggle cart modal visibility when clicking the cart icon
            cartIcon.addEventListener('click', function() {
                cartModal.style.display = 'block';
                closeButton.style.display = 'block'; // Show close button when modal is opened
            });

            // Close cart modal when clicking the close button
            closeButton.addEventListener('click', function() {
                cartModal.style.display = 'none';
                closeButton.style.display = 'none'; // Hide close button when modal is closed
            });

            // Close cart modal when clicking outside the modal
            window.addEventListener('click', function(event) {
                if (event.target === cartModal) {
                    cartModal.style.display = 'none';
                    closeButton.style.display = 'none'; // Hide close button when modal is closed
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
