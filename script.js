document.getElementById("continueBtn").addEventListener("click", function () {
    console.log("BUTTON CLICKED");
    let customerData = {
        name: document.getElementById("nameInput").value,
        phone: document.getElementById("phoneInput").value,
        plot: document.getElementById("plotInput").value,
        road: document.getElementById("roadInput").value,
        area: document.getElementById("areaInput").value
    };
    localStorage.setItem("customerData", JSON.stringify(customerData));
    window.location.href = "order.html";

});