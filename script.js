let cart = [];

const buttons = document.querySelectorAll(".product-card button");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

buttons.forEach(function(button, index) {
    button.addEventListener("click", function() {

        const product = document.querySelectorAll(".product-card")[index];

        const name = product.querySelector("h3").innerText;
        const price = product.querySelector("p").innerText;

        cart.push({
            name: name,
            price: Number(price.replace("₹", "").replace(",", ""))
        });

        showCart();
    });
});

function showCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.innerText = "Total: ₹" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}
const searchBox = document.querySelector(".search-box");
const products = document.querySelectorAll(".product-card");

searchBox.addEventListener("input", function() {

    const searchText = searchBox.value.toLowerCase();

    products.forEach(function(product) {

        const productName = product
            .querySelector("h3")
            .innerText
            .toLowerCase();

        if (productName.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
function openLogin() {
    document.getElementById("login-popup").style.display = "flex";
}

function closeLogin() {
    document.getElementById("login-popup").style.display = "none";
}

function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("login-message");

    if (email === "" || password === "") {
        message.innerText = "Please fill all fields.";
        return;
    }

    message.innerText = "Login successful!";
}