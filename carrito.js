function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

let carrito = [];
let total = 0;

function agregarAlCarrito(producto, precio) {
    carrito.push({ nombre: producto, precio: precio });
    total += precio;
    renderizarCarrito();
}


function renderizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalHTML = document.getElementById('precio-total');
    

    lista.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nombre} - $${item.precio} 
                        <button onclick="eliminarDelCarrito(${index})">x</button>`;
        lista.appendChild(li);
    });

    totalHTML.innerText = total;
}

function eliminarDelCarrito(indice) {
    total -= carrito[indice].precio;
    carrito.splice(indice, 1);
    renderizarCarrito();
}


function limpiarCarrito() {
    carrito = [];
    total = 0;
    renderizarCarrito();
}
