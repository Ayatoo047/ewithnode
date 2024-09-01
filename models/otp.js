const mongoose = require("mongoose")

const OtpSchema = new mongoose.Schema({
    otp : Number,
    user : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    created : {type: Date, default: Date.now()},
})

OtpSchema.methods.validated = function() {
    // check the difference of date time
    this.created 
}

const Otp = mongoose.model("Otp", OtpSchema)

module.exports = Otp