// src/routers/productRoutes.js
import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.patch("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

export default router;
