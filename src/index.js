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
     .then(respuesta => respuesta.json())
     //JSON -> Data -> renderizar info en el browser
     .then(responseJson => {
         
        const allItems = [];

        responseJson.data.forEach(item => {
         //crear imagen
            const imagen = document.createElement('img');
            //url de la imagen
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";    
         //crear título
            const title = document.createElement('h2');
            title.className = "text-lg";
            title.textContent= item.name;
            
         
         // crear precio
            const price = document.createElement('div');
            price.className = "text-gray-600";
            price.textContent = formatPrice(item.price);
             
            const priceAndTitle = document.createElement('div');
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);
 
         //metemos todo en una tarjeta contenedora
            const card = document.createElement('div');
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(imagen, priceAndTitle);
 
         //metemos todoe en el contenedor principal
            const container = document.createElement('div');
            container.appendChild(card);
 
            allItems.push(container);
         });
     
         appNode.append(...allItems);
     
     });
