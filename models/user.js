const mongoose = require("mongoose");
const config = require("config");
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
    otpVerified : {type: Boolean, default:false},
})

// {
//     "first_name" : "Ajibade",
//     "last_name": "Yakub",
//     "email": "ajibade@gmail.com",
//     "password": "12345678",
//     "phone": "08107095017",
//     "address": "Ile Ajibade, Irewole",
//     "state": "Oyo state"
// }


// login (generate jwt token)
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey')) // change the privateKey later
    return token
}

userSchema.methods.generateOTP = async function() {
    const otp = Math.round(Math.random() * 1000000)
    const newOtp = new Otp(
        {
            otp : otp,
            user : this._id
        }
    )
    const userOtp = await newOtp.save();
}


// Define the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
