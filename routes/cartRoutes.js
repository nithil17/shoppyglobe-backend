const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
console.log("Cart =", Cart);
console.log("Cart.find =", Cart.find);
const Product = require("../models/Product");

// GET /cart
router.get("/", async (req, res) => {
    try {
        const cartItems = await Cart.find();

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST /cart
router.post("/", async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        // Validation
        if (!productId || !quantity) {
            return res.status(400).json({
                message: "productId and quantity are required"
            });
        }

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Create cart item
        const cartItem = await Cart.create({
            productId,
            quantity
        });

        res.status(201).json(cartItem);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// PUT /cart/:id
router.put("/:id", async (req, res) => {
    try {

        const { quantity } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE /cart/:id
router.delete("/:id", async (req, res) => {
    try {

        const deletedCart = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedCart) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Cart item removed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;