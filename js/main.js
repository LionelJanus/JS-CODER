//********************************************************************** */
// Cuando cargue el documento HTML, llama a la funcion traer productos
//********************************************************************** */
 traerProductos();


const container = document.getElementById("container");
function traerProductos() {
    
    fetch(`./js/arrayproductos.json`)  // fetch utiliza la url y hace una promesa
        .then(response => response.json()) // el primer then nos dice que después de resolver exitosamente la promesa, apliquemos el método .json() para formatear la data 
        .then(data => {
            const productos = data;

            //********************************************************************** */
            // Una vez que obtenes los productos de json, los guardas en localStorage
            //********************************************************************** */
            localStorage.setItem("productos", JSON.stringify(data));

            productos.forEach((el, idx) => {
                console.log(`${idx + 1}. ${el.name}`);
                const card = document.createElement("div");
                card.className = "card";

                const nombreProducto = document.createElement("h4");
                nombreProducto.innerText = el.name;

                const imgProducto = document.createElement("img");
                imgProducto.src = el.img;

                const description = document.createElement("h5");
                description.innerText = el.description;

                const precio = document.createElement("h4");
                precio.innerText = "$" + el.precio;

                const btnInfo = document.createElement("button");
                btnInfo.innerText = "Agregar";
                

                btnInfo.onclick = function () {
                    addToCart(el.id);
                    sumarProductos(); // Llamo a la función para sumar productos y mostrar el total
                };

                card.appendChild(nombreProducto);
                card.appendChild(imgProducto);
                card.appendChild(description);
                card.appendChild(precio);
                card.appendChild(btnInfo);

                container.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });
}

// Función para sumar productos y mostrar el total
function sumarProductos() {
    // datos almacenados en localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si hay productos en el carrito
    if (carrito.length === 0) {
        console.log('El carrito está vacío');
        return 0;
    }

    // variables para la suma
    let totalProductos = 0;
    let totalValor = 0;

    // cada producto en el carrito y sumar las cantidades y valores
    carrito.forEach(function (producto) {
        if (producto.cantidad && producto.precio) {
            totalProductos += parseInt(producto.cantidad);
            totalValor += parseInt(producto.cantidad) * parseFloat(producto.precio);
        }
    });

    // Mostrar la suma total de productos y el valor total
    console.log('Total de productos en el carrito:', totalProductos);
    console.log('Valor total en el carrito:', "$" + totalValor.toFixed(2));

    return totalValor;
}

// Función para agregar productos al carrito
function addToCart(id) {
    // console.log("Agregaste un nuevo producto");

    // Obtengo el carrito, compruebo que exista, sino existe, lo declaro como un array vacío
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];

    //********************************************************************** */
    // Llamo a los productos que guarde en localstorage
    //********************************************************************** */
    const products = JSON.parse(localStorage.getItem('productos'));

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
        // Mostrar el carrito actualizado en el HTML
        mostrarCarrito();
    }
}
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar los productos, excluyendo el que se va a eliminar
    let nuevoCarrito = carrito.filter(producto => producto.id !== id);

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    mostrarCarrito(); // Actualizar la lista después de eliminar un producto
}

// Función para obtener y mostrar la lista de productos en el carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let listaHTML = "<ul>";

    carrito.forEach(function (producto) {
        listaHTML += `<li>${producto.name} - Cantidad: ${producto.cantidad} - Precio: $${(producto.cantidad * parseFloat(producto.precio)).toFixed(2)} <button onclick="eliminarProducto(${producto.id})">Eliminar</button></li>`;
    });

    listaHTML += "</ul>";

    document.getElementById('carrito-lista').innerHTML = listaHTML;
}

// Ejemplo de uso: Agregar productos al carrito
let productoElegido1 = {
    id: 1,
    name: "Producto A",
    description: "Descripción del Producto A",
    precio: 10.99
};

let productoElegido2 = {
    id: 2,
    name: "Producto B",
    description: "Descripción del Producto B",
    precio: 20.49
};


// Mostrar la lista inicial
mostrarCarrito();

// Función para finalizar la compra
function finalizarCompra() {
    let totalValor = sumarProductos(); // Obtener el valor total
    alert('Compra finalizada. Valor total: $' + totalValor.toFixed(2));

    // Limpiar el carrito después de realizar la compra
    localStorage.removeItem('carrito');

    // Actualizar la visualización del carrito
    mostrarCarrito();
}


// Función para mostrar y ocultar el carrito
function mostrarOcultarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let carritoLista = document.getElementById('carrito-lista');
    let finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    // Función para mostrar el carrito
    function mostrarCarrito() {

        if (carrito.length === 0) {
            carritoLista.innerHTML = "<p>El carrito está vacío</p>";
            if (finalizarCompraBtn) {
                finalizarCompraBtn.style.display = 'none'; // Ocultar el botón si el carrito está vacío
            }
        } else {

            // Mostrar el botón "Finalizar Compra" dentro del carrito
            if (!finalizarCompraBtn) {
                finalizarCompraBtn = document.createElement('button');
                finalizarCompraBtn.id = 'finalizar-compra-btn';
                finalizarCompraBtn.innerText = 'Finalizar Compra';
                finalizarCompraBtn.onclick = finalizarCompra;
                carritoLista.appendChild(finalizarCompraBtn);
            } else {
                finalizarCompraBtn.style.display = 'block'; // Mostrar el botón si hay productos en el carrito
            }
        }
    }

    // Toggle (alternar) la visibilidad del carrito
    carritoLista.style.display = (carritoLista.style.display === 'block') ? 'none' : 'block';

    // Mostrar el carrito actualizado al hacer clic en el ícono
    mostrarCarrito();
}