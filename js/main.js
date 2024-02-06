//********************************************************************** */
// Cuando cargue el documento HTML, llama a la funcion traer productos
//********************************************************************** */
traerProductos();

const container = document.getElementById("container");
function traerProductos() {
  fetch(`./js/arrayproductos.json`) // fetch utiliza la url y hace una promesa
    .then((response) => response.json()) // el primer then nos dice que después de resolver exitosamente la promesa, apliquemos el método .json() para formatear la data
    .then((data) => {
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

        const cantidadProducto = document.createElement("span");
        cantidadProducto.innerText = "1"; // Inicializar la cantidad a 1

        const btnIncrementar = document.createElement("button");
        btnIncrementar.innerText = "+";
        btnIncrementar.onclick = function () {
          incrementarCantidad(cantidadProducto);
        };

        const btnDecrementar = document.createElement("button");
        btnDecrementar.innerText = "-";
        btnDecrementar.onclick = function () {
          decrementarCantidad(cantidadProducto);
        };

        const btnInfo = document.createElement("button");
        btnInfo.innerText = "Agregar";
        btnInfo.onclick = function () {
          addToCart(el.id, parseInt(cantidadProducto.innerText));
          sumarProductos(); // Llamo a la función para sumar productos y mostrar el total
        };

        card.appendChild(nombreProducto);
        card.appendChild(imgProducto);
        card.appendChild(description);
        card.appendChild(precio);
        card.appendChild(btnIncrementar);
        card.appendChild(cantidadProducto);
        card.appendChild(btnDecrementar);
        card.appendChild(btnInfo);

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
}
//**Funcion para aumentar y disminuir cantidades en la card**//
function incrementarCantidad(elementoCantidad) {
  let cantidadActual = parseInt(elementoCantidad.innerText);
  elementoCantidad.innerText = cantidadActual + 1;
}

function decrementarCantidad(elementoCantidad) {
  let cantidadActual = parseInt(elementoCantidad.innerText);

  // Evitar que la cantidad sea menor que 1
  if (cantidadActual > 1) {
    elementoCantidad.innerText = cantidadActual - 1;
  }
}

// Función para sumar productos y mostrar el total
function sumarProductos() {
  // datos almacenados en localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
  console.log("Total de productos en el carrito:", totalProductos);
  console.log("Valor total en el carrito:", "$" + totalValor.toFixed(2));

  return totalValor;
}

// Función para agregar productos al carrito

// ++++++++++ aca agregue cantidad en el parametro de la funcion
function addToCart(id, quantity) {
  // console.log("Agregaste un nuevo producto");

  // Obtengo el carrito, compruebo que exista, sino existe, lo declaro como un array vacío
  let cart = JSON.parse(localStorage.getItem("carrito")) || [];

  //********************************************************************** */
  // Llamo a los productos que guarde en localstorage
  //********************************************************************** */
  const products = JSON.parse(localStorage.getItem("productos"));

  // Busco en los productos por el id que me llega de parametro
  let productToFind = products.find(
    (product) => parseInt(product.id) === parseInt(id)
  );

  // Si el producto existe
  if (productToFind) {
    // Busco si ese mismo producto ya fue agregado al carrito anteriormente por su id
    let productInCart = cart.find((product) => product.id === id);

    // Si ya existe en el carrito
    if (productInCart) {
      // Le aumento la cantidad
      // ++++++++++ aca sume la cantidad del carrito con la cantidad que llega
      productInCart.cantidad += quantity;
    }
    // Si no existe en mi carrito, lo agrego
    else {
      cart.push({
        id: productToFind.id,
        name: productToFind.name,
        description: productToFind.description,
        precio: productToFind.precio,
        cantidad: quantity,
      });
    }

    // Una vez realizado todo, guardo el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(cart));
    // Mostrar el carrito actualizado en el HTML
    mostrarCarrito();
  }
}
function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Filtrar los productos, excluyendo el que se va a eliminar
  let nuevoCarrito = carrito.filter((producto) => producto.id !== id);

  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  mostrarCarrito(); // Actualizar la lista después de eliminar un producto
}

//Función para obtener y mostrar la lista de productos en el carrito
function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let listaHTML = "<ul>";

  carrito.forEach(function (producto) {
    listaHTML += `<li> <span id="cantidad-${producto.id}">${producto.cantidad}</span> 
    <button onclick="incrementarCantidad(${producto.id})">+</button>
    <button onclick="decrementarCantidad(${producto.id})">-</button>
    ${producto.name} - Precio: $${(producto.cantidad * parseFloat(producto.precio)).toFixed(2)} 
    <button onclick="eliminarProducto(${producto.id})">Eliminar</button></li>`;

    
  });

  

  listaHTML += "</ul>";

  document.getElementById("carrito-lista").innerHTML = listaHTML;
}


// Función para finalizar la compra
function finalizarCompra() {
  let totalValor = sumarProductos(); // Obtener el valor total
  Swal.fire({
    title: "El Valor Total de tu Compra es: $" + totalValor,
    showDenyButton: true,
    DenyButtonText: "Cancelar",
    confirmButtonText: "Comprar",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Felicitaciones!", "Completaste tu Compra", "success");
    } else if (result.isDenied) {
      Swal.fire("La Compra fue Cancelada", "", "info");
    }
  });

  // Limpiar el carrito después de realizar la compra
  localStorage.removeItem("carrito");

  // Actualizar la visualización del carrito
  mostrarCarrito();
}

/*Menu*/
const mostrarMenuImg = document.getElementById("img-carrito");
const carritoMenu = document.getElementById("carrito-menu");

// Agrega un evento de clic a la imagen
mostrarMenuImg.addEventListener("click", function () {
  // Toggle (alternar) la visibilidad del menú
  carritoMenu.style.display =
    carritoMenu.style.display === "block" ? "none" : "block";

  // Función para mostrar y ocultar el carrito lateral
  function mostrarOcultarCarrito() {
    let carritoLista = document.getElementById("carrito-menu");
    let finalizarCompraBtn = document.getElementById("finalizar-compra-btn");
    let limpiarcarrito = document.getElementById("limpiarcarrito-btn");
    carritoLista.style.right =
      carritoLista.style.right === "0px" ? "-300px" : "0px";
  }

  // Función para vaciar el carrito aplicando SweetAlert
  function vaciarCarrito() {
    Swal.fire({
      title: "Borrar carrito. ¿Estás seguro?",
      text: "Esto eliminará todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, vaciar carrito",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("carrito");

        Swal.fire("Carrito vaciado", "", "success");

        mostrarCarrito();
      }
    });
  }

  // Asignar la función al evento clic del botón vaciar carro
  document.getElementById("limpiar-carrito-btn").onclick = vaciarCarrito;

  //**Funciones para aumentar y disminuir cantidades en la lista del carrito**//
function incrementarCantidad(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let producto = carrito.find((p) => p.id === id);

  if (producto) {
    producto.cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    sumarProductos();
  }
}

function decrementarCantidad(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let producto = carrito.find((p) => p.id === id);

  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    sumarProductos();
  }
}
// Mostrar la lista inicial
mostrarCarrito();
});
