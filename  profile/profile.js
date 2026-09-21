const userName = localStorage.getItem("currentUser");

if (userName) {

    document.getElementById("profile-name").innerText = userName;

    document.getElementById("welcome-user").innerText =
        "Welcome, " + userName + " 👋";
}


// Delivery Address
const savedAddress =
    JSON.parse(localStorage.getItem("deliveryAddress"));

if (savedAddress) {

    document.getElementById("profile-address").innerText =
        savedAddress.house + ", " +
        savedAddress.area + ", " +
        savedAddress.city + ", " +
        savedAddress.state + " - " +
        savedAddress.pincode;
}


// Back to Home
function goHome() {

    window.location.href = "../index.html";

}