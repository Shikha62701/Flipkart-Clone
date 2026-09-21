// ================= CART =================

let cart = [];

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    showCart();
    alert(name + " added to cart!");
}

function showCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(function(item, index) {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>
                    ${item.name} - ₹${item.price.toLocaleString("en-IN")}
                </span>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.innerText =
        "Total: ₹" + total.toLocaleString("en-IN");
}

function removeItem(index) {
    cart.splice(index, 1);
    showCart();
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Order placed successfully! 🎉");

    cart = [];
    showCart();
}


// ================= SEARCH =================

const searchBox = document.getElementById("search-box");

searchBox.addEventListener("input", function() {

    const searchText = searchBox.value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        const productName = product.querySelector("h3")
            .innerText
            .toLowerCase();

        product.style.display =
            productName.includes(searchText) ? "block" : "none";

    });

});


// ================= LOGIN POPUP =================

function openLogin() {

    document.getElementById("login-popup")
        .style.display = "flex";

    showLogin();
}

function closeLogin() {

    document.getElementById("login-popup")
        .style.display = "none";
}


// ================= SHOW LOGIN =================

function showLogin() {

    document.getElementById("login-form")
        .style.display = "block";

    document.getElementById("register-form")
        .style.display = "none";

    document.getElementById("login-message")
        .innerText = "";
}


// ================= SHOW REGISTER =================

function showRegister() {

    document.getElementById("login-form")
        .style.display = "none";

    document.getElementById("register-form")
        .style.display = "block";

    document.getElementById("register-message")
        .innerText = "";
}


// ================= CREATE ACCOUNT =================

function register() {

    const name =
        document.getElementById("register-name")
        .value.trim();

    const email =
        document.getElementById("register-email")
        .value.trim();

    const password =
        document.getElementById("register-password")
        .value;

    const message =
        document.getElementById("register-message");


    if (name === "" || email === "" || password === "") {

        message.innerText =
            "Please fill all fields.";

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        message.innerText =
            "Enter a valid email.";

        return;
    }


    if (password.length < 6) {

        message.innerText =
            "Password must be at least 6 characters.";

        return;
    }


    let accounts =
        JSON.parse(localStorage.getItem("accounts")) || [];


    const existingAccount =
        accounts.find(function(account) {

            return account.email.toLowerCase() ===
                   email.toLowerCase();

        });


    if (existingAccount) {

        message.innerText =
            "This email is already registered.";

        return;
    }


    const newAccount = {

        name: name,
        email: email,
        password: password

    };


    accounts.push(newAccount);


    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );


    message.innerText =
        "Account created successfully!";


    document.getElementById("register-name").value = "";
    document.getElementById("register-email").value = "";
    document.getElementById("register-password").value = "";


    setTimeout(function() {
        showLogin();
    }, 1000);
}


// ================= LOGIN =================

function login() {

    const email =
        document.getElementById("login-email")
        .value.trim();

    const password =
        document.getElementById("login-password")
        .value;

    const message =
        document.getElementById("login-message");


    if (email === "" || password === "") {

        message.innerText =
            "Please enter email and password.";

        return;
    }


    let accounts =
        JSON.parse(localStorage.getItem("accounts")) || [];


    const account =
        accounts.find(function(account) {

            return (
                account.email.toLowerCase() ===
                email.toLowerCase() &&
                account.password === password
            );

        });


    if (!account) {

        message.innerText =
            "Invalid email or password.";

        return;
    }


    localStorage.setItem("loggedIn", "true");

    localStorage.setItem(
        "currentUser",
        account.name
    );


    document.getElementById("login-btn")
        .style.display = "none";

    document.getElementById("logout-btn")
        .style.display = "block";

        document.getElementById("user-name").innerText =
    "Welcome, " + account.name + " 👋";


    message.innerText =
        "Welcome " + account.name + "!";


    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";


    setTimeout(function() {
        closeLogin();
    }, 1000);
}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    document.getElementById("login-btn").style.display = "block";
    document.getElementById("logout-btn").style.display = "none";

    document.getElementById("user-name").innerText = "";

    alert("You have been logged out.");
}


    


// ================= CHECK LOGIN =================

window.addEventListener("load", function() {

    const loggedIn =
        localStorage.getItem("loggedIn");

    const currentUser =
        localStorage.getItem("currentUser");

    if (loggedIn === "true") {

        document.getElementById("login-btn")
            .style.display = "none";

        document.getElementById("logout-btn")
            .style.display = "block";

        document.getElementById("user-name")
            .innerText =
            "Welcome, " + currentUser + " 👋";
    }


    const savedAddress =
        JSON.parse(
            localStorage.getItem("deliveryAddress")
        );

    if (savedAddress) {

        document.getElementById("top-address-text")
            .innerText =
            savedAddress.city +
            " " +
            savedAddress.pincode;
    }

});
// ================= DELIVERY ADDRESS =================

function saveAddress() {

    const name = document.getElementById("address-name").value.trim();
    const phone = document.getElementById("address-phone").value.trim();
    const house = document.getElementById("address-house").value.trim();
    const area = document.getElementById("address-area").value.trim();
    const city = document.getElementById("address-city").value.trim();
    const state = document.getElementById("address-state").value.trim();
    const pincode = document.getElementById("address-pincode").value.trim();

    const message = document.getElementById("address-message");

    if (
        name === "" ||
        phone === "" ||
        house === "" ||
        area === "" ||
        city === "" ||
        state === "" ||
        pincode === ""
    ) {
        message.innerText = "Please fill all address details.";
        message.style.color = "red";
        return;
    }

    if (phone.length !== 10) {
        message.innerText = "Enter a valid 10-digit mobile number.";
        message.style.color = "red";
        return;
    }

    if (pincode.length !== 6) {
        message.innerText = "Enter a valid 6-digit PIN code.";
        message.style.color = "red";
        return;
    }

    const address = {
        name: name,
        phone: phone,
        house: house,
        area: area,
        city: city,
        state: state,
        pincode: pincode
    };

    localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(address)
    );

    message.innerText = "Address saved successfully! ✅";
    message.style.color = "green";
}
// ================= TOP ADDRESS POPUP =================

function openAddressPopup() {

    const loggedIn =
        localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {

        alert("Please login first to add your address.");

        openLogin();

        return;
    }

    document.getElementById("address-popup")
        .style.display = "flex";

    loadSavedAddress();
}


// ================= CLOSE ADDRESS POPUP =================

function closeAddressPopup() {

    document.getElementById("address-popup")
        .style.display = "none";
}


// ================= SAVE ADDRESS =================

function saveTopAddress() {

    const name =
        document.getElementById("address-name")
        .value.trim();

    const phone =
        document.getElementById("address-phone")
        .value.trim();

    const house =
        document.getElementById("address-house")
        .value.trim();

    const area =
        document.getElementById("address-area")
        .value.trim();

    const city =
        document.getElementById("address-city")
        .value.trim();

    const state =
        document.getElementById("address-state")
        .value.trim();

    const pincode =
        document.getElementById("address-pincode")
        .value.trim();

    const message =
        document.getElementById("address-message");


    if (
        name === "" ||
        phone === "" ||
        house === "" ||
        area === "" ||
        city === "" ||
        state === "" ||
        pincode === ""
    ) {

        message.innerText =
            "Please fill all fields.";

        message.style.color = "red";

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        message.innerText =
            "Enter a valid 10-digit mobile number.";

        message.style.color = "red";

        return;
    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        message.innerText =
            "Enter a valid 6-digit PIN code.";

        message.style.color = "red";

        return;
    }


    const address = {

        name: name,
        phone: phone,
        house: house,
        area: area,
        city: city,
        state: state,
        pincode: pincode

    };


    localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(address)
    );


    document.getElementById("top-address-text")
        .innerText = city + " " + pincode;


    message.innerText =
        "Address saved successfully! ✅";

    message.style.color = "green";


    setTimeout(function() {

        closeAddressPopup();

    }, 1000);
}


// ================= LOAD SAVED ADDRESS =================

function loadSavedAddress() {

    const savedAddress =
        JSON.parse(
            localStorage.getItem("deliveryAddress")
        );


    if (!savedAddress) {
        return;
    }


    document.getElementById("address-name")
        .value = savedAddress.name;

    document.getElementById("address-phone")
        .value = savedAddress.phone;

    document.getElementById("address-house")
        .value = savedAddress.house;

    document.getElementById("address-area")
        .value = savedAddress.area;

    document.getElementById("address-city")
        .value = savedAddress.city;

    document.getElementById("address-state")
        .value = savedAddress.state;

    document.getElementById("address-pincode")
        .value = savedAddress.pincode;
}
// ================= TOP CART =================

function openCart() {

    document.querySelector(".cart-section").scrollIntoView({
        behavior: "smooth"
    });

}
function openCart() {
    showPopupCart();

    document.getElementById("cart-popup").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-popup").style.display = "none";
}

function showPopupCart() {

    const popupItems = document.getElementById("popup-cart-items");
    const popupTotal = document.getElementById("popup-cart-total");

    popupItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        popupItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(function(item, index) {

        total += item.price;

        popupItems.innerHTML += `
            <div class="popup-cart-item">

                <span>
                    ${item.name} - ₹${item.price.toLocaleString("en-IN")}
                </span>

                <button onclick="removeItem(${index}); showPopupCart()">
                    Remove
                </button>

            </div>
        `;
    });

    popupTotal.innerText =
        "Total: ₹" + total.toLocaleString("en-IN");
}
function openCart() {
    showPopupCart();
    document.getElementById("cart-popup").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-popup").style.display = "none";
}

function showPopupCart() {
    const popupItems = document.getElementById("popup-cart-items");
    const popupTotal = document.getElementById("popup-cart-total");

    popupItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        popupItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(function(item, index) {
        total += item.price;

        popupItems.innerHTML += `
            <div class="popup-cart-item">
                <span>
                    ${item.name} - ₹${item.price.toLocaleString("en-IN")}
                </span>

                <button onclick="removeItem(${index}); showPopupCart()">
                    Remove
                </button>
            </div>
        `;
    });

    popupTotal.innerText =
        "Total: ₹" + total.toLocaleString("en-IN");
}
function openProfile() {
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first.");
        openLogin();
        return;
    }

    window.location.href = "profile/profile.html";
}
