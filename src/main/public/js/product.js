miStorage = window.localStorage;

async function getProduct() {
  let Productos = "http://localhost:3500/getProductos";
  var getProduct = await $.get(Productos);

  local("productos", getProduct);
}


function addCar(id){
  var local = localStorage.getItem("productos");
  local = JSON.parse(local); //local[name].InvNombre_Producto

  //Busco en el almacenado local el producto
  for (const name in local) {
    if (local[name].idProducto == id) {
      let nombre = local[name].nombreProducto;
      let precios = local[name].precioUnitario;
      var eliminado = document.getElementById("irCarrito");
      var contador = document.getElementById("contador").innerHTML;
      eliminado.parentNode.removeChild(eliminado);

          $(`<a id="p${id}" class="dropdown-item d-flex align-items-center">`
          ).append(
            $('<div>', {
                'class': 'mr-3',
            }).append(
              $('<div>',{
                'class': 'icon-circle bg-primary',
              }).append(
                  $('<i>',{
                    'class':'fas fa-file-alt text-white',
                  })
                )
            )
        ).append(
          $('<div>'
          ).append(`<div id="nombrep" class="font-weight-bold"">${nombre}</div>`
          ).append(`<span id="preciop" class="small text-gray-500">${precios}</span>`)
        ).hide().appendTo('#listap').fadeIn('slow');

        $('<a id="irCarrito" class="dropdown-item text-center small text-gray-500" href="#">Ver carrito de compras</a>'
          ).hide().appendTo('#listap').fadeIn('slow');

        contador = parseInt(contador) + 1;
        document.getElementById("contador").innerHTML = contador;
        alertify.set('notifier','position', 'top-right');
        alertify.success('¡Se agrego correctamente!');
    }
  }
}



//------------Guardar de forma local información-------------
function local(key, p) {
  miStorage.setItem(key, JSON.stringify(p));
}


