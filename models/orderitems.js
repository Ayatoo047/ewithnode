const mongoose = require("mongoose");


const orderItemSchema = new mongoose.Schema({
    order : {type:mongoose.Schema.Types.ObjectId, ref:"Order", required:true},
    orderitem: String,
    quantity: Number
})


const OrderItem = mongoose.model('OrdeItem', OrderItemSchema);
// mongodb://localhost:27017/?directConnection=true
// Export the model
module.exports = OrderItem;