function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

let carrito = [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartModel = document.getElementById("cart-model");
const closeCart = document.getElementById("close-cart");
const checkoutButton = document.getElementById("checkout");
const totalElemnt = document.getElementById("purchase-model");
const closePurchase = document.getElementById("close-purchase")

document.querySelectorAll(". add-to-cart").forEach((button) => {

    button.addEventListener("click")
})