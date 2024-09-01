const mongoose = require("mongoose")


const shopSchema = new mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    name : String,
    address : String,
    email : String,
    phone_one: String,
    phone_two: String
})

const Shop = mongoose.model('Shop', shopSchema);

// Export the model
module.exports = Shop;