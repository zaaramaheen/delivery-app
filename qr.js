const QRCode = require("qrcode");
const url = "https://delivery-app-ders.onrender.com/admin.html";
QRCode.toFile("qr.png", url, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("QR saved as qr.png");
});