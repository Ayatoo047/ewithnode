const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

