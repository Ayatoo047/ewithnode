const express = require("express")
const Category = require('../models/category');
const User = require('../models/user');
const Product = require('../models/product');
const validateProduct = require('../validation/product');
const auth = require("../middleware/auth");
// import { validateProduct } from "../validation/product";
const router = express.Router()

// router.get("/", (req, res) => {
//     res.send("Hello World from Product")
// })

router.post('/', auth, async (req, res) => {
    try {
      let data = req.body;
      let error = validateProduct(data, res);
      if (error)
        return
      const newProduct = new Product(data);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  
router.get("/", async (req, res) => {

    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch("/:id", auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return;
        product.set(
            req.body
        );
        const result = await product.save();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


module.exports = router;

