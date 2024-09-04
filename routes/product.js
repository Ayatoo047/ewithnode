const express = require("express")
const Category = require('../models/category');
const User = require('../models/user');
const Product = require('../models/product');
const Worker = require('../models/worker');
const validateProduct = require('../validation/product');
const auth = require("../middleware/auth");
const canCreateProduct = require("../middleware/createProductPrevilege")
// import { validateProduct } from "../validation/product";
const router = express.Router()

// router.get("/", (req, res) => {
//     res.send("Hello World from Product")
// })

// {
//     "name" : "Test Prod Worker",
//     "description" : "String 123 jhshccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
//     // image : String,
//     "in_stock" : 100,
//     // shop : String,
//     "category" : "cloth",
//     "shop" : "66d63093cb5ad12566dd4448",
//     "ptype" : "test",
//     "price" : 1000000
// }

router.post('/', canCreateProduct, async (req, res) => {
    let data = req.body;
    try {
        let error = validateProduct(data, res);
        if (error)
          return
        // move to validation 
        let category;
        category = await Category.findOne({name: data.category});
        // const category = await Category.findById(data.category);
        if (!category) {
            const newCategory = new Category({name: data.category})
            category = await newCategory.save()
        }
        data.category = category._id.toString()

      const user = req.user

      const worker = await Worker.findOne({user: user._id})
    //   const worker = await Worker.findOne({user: "66d5acff1c44d6a48dd67294"})
    //   if (!worker.createProductPrevilege) return
      data.shop = worker.shop._id
      console.log(data)
      const newProduct = new Product(data);
      const savedProduct = await newProduct.save();
      res.status(201).send(savedProduct);
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

router.patch("/:id", canCreateProduct, async (req, res) => {
    try {

        // move to validation
        const category = await Category.findById(data.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
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

