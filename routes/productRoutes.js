const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/Product");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const validateProductData = ({ name, price, description, stockQuantity }, requireAllFields = true) => {
    if (requireAllFields && (!name || price === undefined || !description || stockQuantity === undefined)) {
        return "name, price, description, and stockQuantity are required";
    }

    if (name !== undefined && typeof name !== "string") {
        return "Name must be a string";
    }

    if (description !== undefined && typeof description !== "string") {
        return "Description must be a string";
    }

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
        return "Price must be a non-negative number";
    }

    if (stockQuantity !== undefined && (!Number.isInteger(stockQuantity) || stockQuantity < 0)) {
        return "Stock quantity must be a non-negative integer";
    }

    return null;
};

// GET /products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST /products
router.post("/", async (req, res) => {
    try {
        const validationError = validateProductData(req.body);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// PUT /products/:id
router.put("/:id", async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const validationError = validateProductData(req.body, false);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE /products/:id
router.delete("/:id", async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product removed successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
