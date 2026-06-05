require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Home Route
app.get("/", (req, res) => {
    res.send("Server Running");
});

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Server Start
app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`);
});