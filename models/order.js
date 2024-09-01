const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    owner : {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
})

const Order = mongoose.model('Order', orderSchema);
// mongodb://localhost:27017/?directConnection=true
// Export the model
module.exports = Order;