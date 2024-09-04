const express = require("express");
const User = require("../models/user")
const auth = require("../middleware/auth")
const Shop = require("../models/shop")
const Worker = require("../models/worker")
const validateShop = require("../validation/shop");


const router = express.Router()

// {
//     "owner" : "66d5acff1c44d6a48dd67294",
//     "name" : "Ayatoo Tech",
//     "address" : "address",
//     "email" : "admin@gmail.com",
//     "phone_one": "12345678",
//     "phone_two": "00000000"
// }
router.post('/', auth, async (req, res) => {
    const user_id = req.user._id
    const error = validateShop(req.body, res)
    if (error) return


    data = req.body
    data.owner = user_id
    const shop = new Shop(data)
    // shop.workers.push(user_id)
    const newShop = await shop.save()
    const worker = new Worker({
        user: user_id,
        role : "Admin",
        shop : newShop._id,
        created_by: user_id,
        createProductPrevilege: true,
        createWorkerPrevilege: true
    })
    const newWorker = await worker.save()
    newShop.workers.push(newWorker._id)
    await newShop.save()
     
    return res.status(200).json(newShop)
})



router.get("/", async(req, res) => {

    const shops = await Shop.find()
    return res.status(200).json(shops)
})

router.get("/:id", async (req, res) => {
    const shop = await Shop.findById(req.params.id).populate("owner", "first_name email")
    return res.status(200).json(shop)
})


module.exports = router;