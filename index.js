
function fetchWomensClothing() {
    const url = "https://fakestoreapi.com/products/category/women's%20clothing";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            displayWomensClothing(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayWomensClothing(products) {
    const container = document.getElementById('products-container');

    if (products) {
        container.innerHTML = ''; // Clear previous data
        
        products.forEach(product => {
            const productId = product.id;
            const name = product.title;
            const imageUrl = product.image;
            const price = product.price;

            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <p>Product ID: ${productId}</p>
                <p>Name: ${name}</p>
                <p>Price: $${price}</p>
                <img src="${imageUrl}" alt="${name}" />
            `;
            container.appendChild(productElement);
        });
    } else {
        container.innerHTML = '<p>No data to display</p>';
    }
}

// Call the fetch function to retrieve and display data
fetchWomensClothing();
