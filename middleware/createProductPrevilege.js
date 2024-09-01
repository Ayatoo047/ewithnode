const Worker = require("../models/worker")

module.exports = function (req, res, next) {
    const user = req.user

    const worker = Worker.findOne({user: user.id})
    if (!worker) return
    if (!(worker.shop === req.body.shop.id)) return
    if (!worker.createProductPrevilege) return
    // if (!req.user.isAdmin) return res.status(403).send('Access denied. Not An admin.');
    next()


}