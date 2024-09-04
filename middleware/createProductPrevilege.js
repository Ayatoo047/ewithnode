const Worker = require("../models/worker")
const Shop = require("../models/shop")

module.exports = async function (req, res, next) {
    // const user = req.user
    
    // const worker = Worker.findOne({user: user._id})
    const worker = await Worker.findOne({user: "66d5acff1c44d6a48dd67294"})
    if (!worker) return res.status(401).send({message:"You dont have the permission 1"})
    // console.log(worker.shop.toString(), req.body.shop)
    if (!(worker.shop.toString() === req.body.shop)) return res.status(401).send({message:"You dont have the permission 2"})
    const shop_id = worker.shop._id.toString()
    // console.log(shop_id)
    const shop = await Shop.findById(shop_id)
    if (!(shop.workers.includes(worker._id))) return res.status(401).send({message:"You dont have the permission 3"})
    if (!worker.createProductPrevilege) return res.status(401).send({message:"You dont have the permission 4"})
    // if (!req.user.isAdmin) return res.status(403).send('Access denied. Not An admin.');
    console.log("Baabu wahala")
    next()


}