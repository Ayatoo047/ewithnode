const mongoose = require("mongoose")
const User = require("../models/user")

const OtpSchema = new mongoose.Schema({
    otp : Number,
    user : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    created : {type: Date, default: Date.now()},
})

OtpSchema.methods.validated = async function() {
    // check the difference of date time
    const diff = this.created - Date.now()
    const diffInMinute = diff / (1000 * 60)

    if (diffInMinute >= 15) {
        console.log("expired")
    } else {
        const user_id = this.user
        const user = await User.update({_id : user_id}, {otpVerified : true})
        const validatedUser = user.save()
        console.log("Validated")
    }
}

const Otp = mongoose.model("Otp", OtpSchema)

module.exports = Otp