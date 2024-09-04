const express = require("express")
const Category = require('../models/category');
const User = require('../models/user');
const Product = require('../models/product');
const Worker = require('../models/worker');
const validateWorker = require('../validation/worker');
const auth = require("../middleware/auth");
const Shop = require("../models/shop");
const canCreateWorker = require("../middleware/createWorkerPrevilege")

const router = express.Router()

router.post("/", auth, canCreateWorker, async (req, res) =>{
    // {
    //     "user" : "66d5acff1c44d6a48dd67294",
    //     "shop" : "66d63093cb5ad12566dd4448",
    //     "role" : "Manager",
    //     "createWorkerPrevilege" : true,
    //     "createProductPrevilege" : true
    
    // }
    try {        
        let error = validateWorker(req.body, res)
        if (error) return
    
        const creator = await Worker.findOne({user:req.user._id})

        data = req.body
        data.created_by = creator._id
        data.shop = creator.shop
        let user = await User.findOne({email:data.user})

        if (!user) return res.status(400).send("Invalid user email")
        data.user = user._id

        const worker = new Worker(data)
        const newWorker = await worker.save()
        
        const shop = await Shop.findById(data.shop)
        shop.workers.push(newWorker._id)
        shop.save()
    
        return res.status(200).json(newWorker)
    } catch (error) {
        console.log(error)
    }
})

router.get("/", auth, async (req, res) =>{
    const user_id = req.user._id
    console.log(user_id)
    const worker = await Worker.findOne({user: user_id})
    const shop = await Shop.findOne({workers: worker._id})
    if (!shop) return res.status(400).send("No shop found")
    const workers = await Worker.find({shop: shop._id})
    return res.status(200).json(workers)
})


module.exports = router;