let cervezas = [
    {nombre:"Miller" , precio:500.00},
    {nombre:"Brahama" , precio: 600.00},
    {nombre:"Heineken" , precio:450.00},
    {nombre:"Temple" , precio: 550.00},
];

let mensajePorAlert=""

for( let cerveza of cervezas){

    console.log(cerveza)
    mensajePorAlert = mensajePorAlert + "-" + cerveza.nombre + " ($" + cerveza.precio + ")"

}

let carrito = []

let seleccion = prompt ("¿Desea ver nuestras cervezas?, si o no")

while (seleccion != "si" && seleccion != "no"){
    alert("Por Favor ,Elija una Opcion")
    seleccion = prompt ("Desea ver nuestras cervezas?, si o no")
}   

if (seleccion == "si"){
    alert ("A continuacion mostraremos nuestras cervezas disponibles")
    let mensajeCervezas = "Nuestras cervezas en stock son:"
    
    alert (mensajePorAlert)  

  } else if (seleccion == "no"){
          alert("Gracias por Venir, Vuelva Pronto!")
      }

let opcion = prompt ("Desea Comprar alguna de nuestros productos?, si o no")

    while (opcion != "si" && opcion != "no"){

        alert("Por Favor ,Elija una Opcion")
        opcion = prompt ("Desea Comprar alguna de nuestros productos?, si o no")

  }   if (opcion=="si"){
        alert ("A continuacion mostraremos nuestras cervezas disponibles")
        mensajeCervezas = "Nuestras cervezas en stock son:"
        alert (mensajePorAlert)
}
      else if (opcion == "no"){
         alert("Gracias por Venir, Vuelva Pronto!")
      
  }
         
    
     while(seleccion != "no"){
         let producto = prompt("Agrega un Producto al Carrito")
         let precio=0

         if (producto == "Miller" || producto == "Brahama" || producto == "Heineken" || producto == "Temple"){

         switch (producto) {
             case "Miller":
                 precio = 500.00;    
                 break;
             case "Brahama":
                 precio = 600.00;
                 break;
             case "Heineken":
                 precio = 450.00;
                     break;
             case "Temple":
                 precio = 550.00
                 break;
              default:
                 break;
         }

         let unidades = parseInt(prompt("¿Cuantas unidades desea llevar?"))

         carrito.push({producto, unidades, precio})
         console.log(carrito)
         } else  {
     
             alert("No disponemos de Stock")
         }
     
         seleccion = prompt("¿Desea comprar algo mas?")
         
         let totalFinal

         if (seleccion == "si"){
            alert ("A continuacion mostraremos nuestras cervezas disponibles")
            let mensajeCervezas = "Nuestras cervezas en stock son:"
            
            alert (mensajePorAlert)
        
        
          } else if (seleccion == "no"){
                  alert("Gracias por Venir, Vuelva Pronto!")
              }

             for(let carritoCervezas of carrito) {
                totalFinal=carritoCervezas.precio * carritoCervezas.unidades+"$"}
             
            }
        
                
                alert(`el total a pagar por su compra es : ${totalFinal}`)
        