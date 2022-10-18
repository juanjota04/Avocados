/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

//Intl
//1- dar formato a fechas
//2- dar formato a monedas
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(price)
    return newPrice;
}

// web api
// Conectarnos al servidor
window
    .fetch(`${baseUrl}/api/avo`)
    // procesar la respuesta y convertirla en JSON
    .then((respuesta) => respuesta.json())
    //JSON -> Data -> renderizar info en el browser
    .then((responseJson) => {
        const allItems = [];
        responseJson.data.forEach((item) => {
        //crear imagen
            const imagen = document.createElement('img');
            //url de la imagen
            imagen.src = `${baseUrl}${item.image}`;        
        //crear título
            const title = document.createElement('h2');
            title.textContent= item.name;
            title.className = "text-lg";
        
        // crear precio
            const price = document.createElement('div');
            price.className = "text-gray-600";
            price.textContent = item.price;
            
            const priceAndTitle = document.createElement('div');
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);

            const container = document.createElement('div');
            container.append(imagen, title, price);

            allItems.push(container);
        });
    
        appNode.append(...allItems);
    
    });
