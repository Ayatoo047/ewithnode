const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const Otp = require("../models/otp")


const userSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    email : String,
    password: String,
    phone : String,
    address : String,
    state : String,
})

// login (generate jwt token)
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this.id, isAdmin:this.isAdmin}, 'privateKey') // change the privateKey later
    return token
}

userSchema.methods.generateOTP = async function() {
    const otp = Math.round(Math.random() * 1000000)
    const newOtp = new Otp(
        {
            otp : otp,
            user : this.id
        }
    )
    const userOtp = await newOtp.save();

}


// Define the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
