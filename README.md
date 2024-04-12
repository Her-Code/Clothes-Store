# Clothes Store Website

# Description

This project will mainly use `JavaScript`.

## 1. Add and `fetch` API

Hey,in this project I am using 
 https://fakestoreapi.com/products/category/women's%20clothing  API.


 ### 2. What I will be doing in this project

- Use Javascript for `DOM manipulation` and addEventListeners.
- Fetch and display the data in the `API`
- Create an `HTML file` to show structure of the data.
- Create a `CSS file` and add styles to beautify the appearance of the data.
- Create an `index.js` file and js code to modify the functionality of the data like `add an add to cart button and modal and buy now `.
- Create a `create_db.js file `to enable fetching of data to the `db file `.
- Create a `db.json` to store API data.


This project uses:

         * HTML
         * CSS
         * JavaScript

The files contained in the project are:

- index.html
- styles.css
- index.js
- db.json
- create.db.js

### Extension

I used **Postman**

### My Program 

* Create the three files index.html styles.css and index.js and link them using:

```html
 <link rel="stylesheet" href="style.css" /> in the head tag &
  <script src="index.js"></script> in the body tag
  ```

* Fetch Api using `Get`, this is a method `CRUD` that is used in database creation and create a html elements to house them for good display.
```JavaScript
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
```
* Add styling to the data like the `background colour` ,`font size` and `font family` used which is `Poppins`.
```css
*{ 
    /* background-color: bisque; */
    font-family:  "Poppins", sans-serif;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    scroll-behavior: smooth;
    scroll-padding: 2rem;
}

```

* Create a button ```JavaScript <span class="toggle">▼ Show Description</span>``` and use `toggle` to `hide and show` the description.```JavaScript

               toggleButton.addEventListener('click', function() { 
                    if (descriptionElement.style.display === 'none') {
                        descriptionElement.style.display = 'block';
                        toggleButton.textContent = '▲ Hide Description';
                    } else {
                        descriptionElement.style.display = 'none';
                        toggleButton.textContent = '▼ Show Description';
                    }
                });```

* Add `Event Listeners` like `click` and DOM manipulation like `inner.html`.

* Create an `Add to Cart` button and `activate` it when clicked items are pushed to `cart icon`

* `Activate` cart icon and add `modal` that displays items added to cart.

* `Delete` items on the modal and `update` remaining items and if no items don't display.

* In the modal add `buy now` button and `total price` which are displayed when cart icon is `clicked`.```JavaScript

                 const totalDisplay = document.createElement('div');

                totalDisplay.classList.add('total');

                totalDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
                cartContent.appendChild(totalDisplay);

                // Append "Buy Now" button to cart modal

                const buyNowButton = document.createElement('button');
                buyNowButton.classList.add('buy-now');

                buyNowButton.textContent = 'Buy Now';
                buyNowButton.addEventListener('click', function() {
                    alert('You have bought the items.');
                });
                cartContent.appendChild(buyNowButton);```
            


* `Reduce` total if items are deleted and `add` total if items are added.
### Sections
* About section -
* The name of the store ,where it is located and a brief objective of the store.
* Contact Us section -
* Information on how to reach us incase of a problem and if you want to confirm an order

### Author

[@Her-Code](https://github.com/Her-Code) - Sharon Kahira
