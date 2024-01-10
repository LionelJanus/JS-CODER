const container = document.getElementById("container");
productosBaseDeDatos.forEach((el, idx) => {
    const card = document.createElement("div");
    card.className = "card";

    const nombreProducto = document.createElement("h4")
    nombreProducto.innerText = el.name;

    const imgProducto = document.createElement("img");
    imgProducto.src = el.img;

    const description = document.createElement("h5")
    description.innerText = el.description;
    
    const precio = document.createElement("h4")
    precio.innerText = el.precio;
    
    
    const btnInfo = document.createElement("button");
    btnInfo.innerText = "Agregar";
   
    btnInfo.onclick = function(){
        addToCart(el.id);
        alert("Capturaste un " + el.name);
    };
    

    card.appendChild(nombreProducto);
    card.appendChild(imgProducto);
    card.appendChild(description)
    card.appendChild(precio);
    card.appendChild(btnInfo);
    
   
    container.appendChild(card);
})

// Declaro la funcion que recibe como parametro el id de producto
function addToCart(id){
    // Obtengo el carrito, compruebo que exista, sino existe, lo declaro como un array vacio
    let cart = JSON.parse(localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : [];

    
    // Llamo a los producto
    const products = productosBaseDeDatos 

    // Busco en los productos por el id que me llega de parametro
    let productToFind = products.find(product => parseInt(product.id) === parseInt(id));

    // Si el producto existe
    if(productToFind){

        // Busco si ese mismo producto ya fue agregado al carrito anteriormente por su id
        let productInCart = cart.find(product => product.id === id);

        // Si ya existe en el carrito
        if(productInCart){
            // Le aumento la cantidad
            productInCart.cantidad++;
        }
        // Si no existe en mi carrito, lo agrego
        else {

            cart.push({
                id: productToFind.id,
                name: productToFind.name,
                description: productToFind.description,
                precio: productToFind.precio,
                cantidad: 1
            })
        }

        // Una vez realizado todo, guardo el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(cart));
    }
    
   
    }





