import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// DB model Import
// @ts-ignore
import Product from './models/product.model';

// .env configuration
dotenv.config();

// Property Variable
const app = express();
const port = process.env.PORT || 3000;
const db_uri: any = process.env.MONGO_URI;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Method | REST Ful API
app.get("/", (req, res) => {
    res.send("Home Works!");
});


// POST Method
app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// GET Methods To Find Product
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// PUT Method to update the data
app.put("/api/product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            res.status(404).json({ message: `Product with id ${id} not found` });
        }

        const update_product =  await Product.findById(id);
        res.status(200).json(update_product);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// DELETE Method
app.delete("/api/product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({ message: `Product with id ${id} not found` });
        }

        res.status(200).json({ message: `Product is deleted sucessfully` });

    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
})


// Database Connection
mongoose.connect(db_uri).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.error("Connection Failed", err);
});

// Port that app run
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});