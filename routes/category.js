const express = require("express")
const Category = require("../models/category")
const validateCategory = require("../validation/category")

const router = express.Router()

router.post("/", async(req, res) => {
    let error = validateCategory(req.body, res)
    if (error) {
        return
    }
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save()
    res.status(201).json(savedCategory)
})

router.get("/", async (req, res) => {

    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;