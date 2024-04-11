const fs = require('fs');
const axios = require('axios');

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await axios.get("https://fakestoreapi.com/products/category/women's%20clothing");
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data from the API:', error);
        throw error;
    }
}

// Main function to fetch data and write to db.json
async function main() {
    try {
        const data = await fetchData();
        
        // Write the data to db.json file
        fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
        console.log('Data written to db.json successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the main function
main();

