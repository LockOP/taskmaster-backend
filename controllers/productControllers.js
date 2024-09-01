// src/controllers/productController.js
import Product from '../models/Product'; // Import the Product model

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { title, description, productID } = req.body;

        const product = new Product({
            title,
            description,
            productID,
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a specific product by ID
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
