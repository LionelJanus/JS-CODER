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
        alert("Agregaste un " + el.name);
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
    
    function sumarProductos() {
        // Obtener los datos almacenados en localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Verificar si hay productos en el carrito
        if (carrito.length === 0) {
            console.log('El carrito está vacío');
            return 0;
        }
    
        // Inicializar variables para la suma
        let totalProductos = 0;
        let totalValor = 0;
    
        // Iterar sobre cada producto en el carrito y sumar las cantidades y valores
        carrito.forEach(function (producto) {
            if (producto.cantidad && producto.precio) {
                totalProductos += parseInt(producto.cantidad);
                totalValor += parseInt(producto.cantidad) * parseFloat(producto.precio);
            }
        });
    
        // Devolver la suma total de productos y el valor total
        console.log('Total de productos en el carrito:', totalProductos);
        console.log('Valor total en el carrito:', "$"+ totalValor.toFixed(2));
        
        return totalValor;
    }
    
    // Declaro la funcion que recibe como parametro el id de producto
    function addToCart(id) {
        console.log ("Agregaste un nuevo producto");
        // Obtengo el carrito, compruebo que exista, sino existe, lo declaro como un array vacio
        let cart = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Llamo a los productos
        const products = productosBaseDeDatos;
    
        // Busco en los productos por el id que me llega de parametro
        let productToFind = products.find(product => parseInt(product.id) === parseInt(id));
    
        // Si el producto existe
        if (productToFind) {
            // Busco si ese mismo producto ya fue agregado al carrito anteriormente por su id
            let productInCart = cart.find(product => product.id === id);
    
            // Si ya existe en el carrito
            if (productInCart) {
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
                });
            }
    
            // Una vez realizado todo, guardo el carrito en localStorage
            localStorage.setItem('carrito', JSON.stringify(cart));
    
            // Llamo a la función para sumar productos y muestro el total en la consola
            sumarProductos();
        }
    }
    
    // Ejemplo de uso
    addToCart(1); // Puedes pasar el ID del producto que deseas agregar al carrito
    
    }





