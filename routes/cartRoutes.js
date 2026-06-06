const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const isValidQuantity = (quantity) => {
    return Number.isInteger(quantity) && quantity > 0;
};

// GET /cart
router.get("/", authMiddleware, async (req, res) => {
    try {
        const cartItems = await Cart.find({ userId: req.user.userId }).populate("productId");

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST /cart
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                message: "productId and quantity are required"
            });
        }

        if (!isValidObjectId(productId)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        if (!isValidQuantity(quantity)) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (quantity > product.stockQuantity) {
            return res.status(400).json({
                message: "Requested quantity exceeds available stock"
            });
        }

        const existingCartItem = await Cart.findOne({
            userId: req.user.userId,
            productId
        });

        if (existingCartItem) {
            existingCartItem.quantity = quantity;
            const updatedCartItem = await existingCartItem.save();

            return res.status(200).json(updatedCartItem);
        }

        const cartItem = await Cart.create({
            userId: req.user.userId,
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
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid cart item ID"
            });
        }

        if (!isValidQuantity(quantity)) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        const cartItem = await Cart.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        const product = await Product.findById(cartItem.productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (quantity > product.stockQuantity) {
            return res.status(400).json({
                message: "Requested quantity exceeds available stock"
            });
        }

        cartItem.quantity = quantity;
        const updatedCart = await cartItem.save();

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE /cart/:id
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid cart item ID"
            });
        }

        const deletedCart = await Cart.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

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
