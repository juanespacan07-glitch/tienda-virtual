function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

let carrito = [];
const botonesAgregar = document.querySelectorAll('.add-to-card');
const contador = document.getElementById('cart-count');
const listaCarrito = document.getElementById('lista-carrito');
const carritoContainer = document.getElementById('carrito-container');
const cartIcon = document.getElementById('cart-icon');
const totalPrecioDisplay = document.getElementById('total-precio');

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
});

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.juego-card');
        
        const precioTexto = card.querySelector('h3:nth-of-type(2)').innerText;
        const precioNumerico = parseInt(precioTexto.replace(/[$.]/g, ''));

        const juego = {
            id: Date.now(),
            titulo: card.querySelector('h3:nth-of-type(1)').innerText,
            precio: precioNumerico,
            precioFormateado: precioTexto 
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
    
        sumaTotal += juego.precio;
    });

    contador.innerText = carrito.length;
    totalPrecioDisplay.innerText = sumaTotal.toLocaleString('es-CO'); 
}

window.quitar = function(id) {
    carrito = carrito.filter(juego => juego.id !== id);
    renderizarCarrito();
};

function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    let sumaTotal = 0;

    carrito.forEach(juego => {
        const li = document.createElement('li');
        li.innerHTML = `${juego.titulo} - ${juego.precioFormateado} <button onclick="quitar(${juego.id})">❌</button>`;
        listaCarrito.appendChild(li);
        sumaTotal += juego.precio;
    });

    contador.innerText = carrito.length;
    totalPrecioDisplay.innerText = sumaTotal.toLocaleString('es-CO');

    if (carrito.length > 0) {
        const btnComprar = document.createElement('button');
        btnComprar.innerText = "Finalizar Compra";
        btnComprar.className = "btn-comprar-final"; 
        btnComprar.onclick = abrirCheckout;
        listaCarrito.appendChild(btnComprar);
    }
}

function abrirCheckout() {
    const modal = document.getElementById('modal-pago');
    modal.style.display = 'flex';
}

window.cerrarCheckout = function() {
    document.getElementById('modal-pago').style.display = 'none';
}

document.getElementById('form-pago')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu compra! Procesando pago...');
    carrito = []; 
    renderizarCarrito();
    cerrarCheckout();
    carritoContainer.style.display = 'none';
});

window.quitar = function(id) {
    carrito = carrito.filter(juego => juego.id !== id);
    renderizarCarrito();
};

function abrirDetalles(elemento) {
    const card = elemento.closest('.juego-card');
    
    const titulo = card.querySelector('h3:nth-of-type(1)').innerText;
    const imagenSrc = card.querySelector('img').src;
    const descripcion = card.querySelector('.descripcion-oculta').innerText;

  
    document.getElementById('detalles-titulo').innerText = titulo;
    document.getElementById('detalles-img').src = imagenSrc;
    document.getElementById('detalles-texto').innerText = descripcion;

    document.getElementById('modal-descripcion').style.display = 'flex';
}

function cerrarDetalles() {
    document.getElementById('modal-descripcion').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-descripcion');
    if (event.target == modal) {
        cerrarDetalles();
    }
}

function abrirDetalles(elemento) {
    const contenedor = elemento.parentElement;
    const texto = contenedor.querySelector('.descripcion-oculta').innerText;
    const imagenSrc = contenedor.querySelector('.img-oculta').src;
    
    const modal = document.createElement('div');
    modal.className = 'modal-personalizado';
    modal.innerHTML = `
        <img src="${imagenSrc}" class="img-modal-pequena">
        <h4>${elemento.innerText}</h4>
        <p style="font-size: 14px; color: #ccc;">${texto}</p>
        <span class="btn-cerrar" onclick="this.parentElement.remove()">[ CERRAR ]</span>
    `;
    
    document.body.appendChild(modal);
}
