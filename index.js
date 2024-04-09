const url = 'https://api.escuelajs.co/api/v1/products';

async function getData() {
    const response = await fetch(url)
    const data = await response.json
    console.log(data)
}
getData()