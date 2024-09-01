const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema({
    cart : {type:mongoose.Schema.Types.ObjectId, ref:"Cart", required:true},
    product: String,
    quantity: Number
})

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem

