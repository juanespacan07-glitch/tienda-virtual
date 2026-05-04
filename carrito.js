function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

let carrito = [];
const botonesAgregar = document.querySelectorAll('.add-to-card');
const contador = document.getElementById('cart-count');
const listaCarrito = document.getElementById('lista-carrito');
const carritoContainer = document.getElementById('carrito-container');
const cartIcon = document.getElementById('cart-icon');
const totalPrecioDisplay = document.getElementById('total-precio'); // Asegúrate de tener este ID en tu HTML

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
});

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.juego-card');
        
        // Capturamos el precio y lo limpiamos para que sea un número (quita "$" y ".")
        const precioTexto = card.querySelector('h3:nth-of-type(2)').innerText;
        const precioNumerico = parseInt(precioTexto.replace(/[$.]/g, ''));

        const juego = {
            id: Date.now(),
            titulo: card.querySelector('h3:nth-of-type(1)').innerText,
            precio: precioNumerico,
            precioFormateado: precioTexto // Guardamos el texto original para mostrarlo
        };

        carrito.push(juego);
        renderizarCarrito();
    });
});

function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    let sumaTotal = 0;

    carrito.forEach(juego => {
        const li = document.createElement('li');
        li.innerHTML = `${juego.titulo} - ${juego.precioFormateado} <button onclick="quitar(${juego.id})">❌</button>`;
        listaCarrito.appendChild(li);
        
        // Sumamos el valor numérico
        sumaTotal += juego.precio;
    });

    // Actualizamos el contador y el total con formato de moneda
    contador.innerText = carrito.length;
    totalPrecioDisplay.innerText = sumaTotal.toLocaleString('es-CO'); 
}

window.quitar = function(id) {
    carrito = carrito.filter(juego => juego.id !== id);
    renderizarCarrito();
};



