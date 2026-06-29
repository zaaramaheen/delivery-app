require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
    family: 4
})
const path = require("path");
const app = express();
let orders = [];
let ordersCollection;
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/order", async (req, res) => {
    console.log("Order received:", req.body);
    orders.push(req.body);
    await ordersCollection.insertOne(req.body);
    res.send("Order received successfully!");
});
app.patch("/order/:id", async (req, res) => {
    await ordersCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status: "Delivered" } }
    );
    res.send("Status updated");
});
app.delete("/order/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await ordersCollection.deleteOne({ _id: new ObjectId(id) });
        res.send("Order Deleted");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Delete failed");
    }
});
app.delete("/orders/delivered", async (req, res) => {
    try {
        const result = await ordersCollection.deleteMany({
            status: "Delivered"
        });
        res.send(`${result.deletedCount} delivered orders deleted`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Delete failed");
    }
});
app.get("/orders", async (req, res) => {
    const orders = await ordersCollection.find().toArray();
    res.json(orders);
});
async function connectDB() {
    try {
        console.log("Trying MongoDB...");
        await client.connect();
        const db = client.db("waterDelivery");
        ordersCollection = db.collection("orders");
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err);
    }
}
connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});