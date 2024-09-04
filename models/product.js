const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    // image : String,
    created : {type: Date, default:Date.now()},
    in_stock : Number,
    category : {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    created_by : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    shop : {type: mongoose.Schema.Types.ObjectId, ref:"Shop"},
    ptype : String,
    price : Number
})

// Define the model
const Product = mongoose.model('Product', productSchema);
// mongodb://localhost:27017/?directConnection=true
// Export the model
module.exports = Product;