const mongoose = require("mongoose")

const workerSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId,  ref:"User"},
    shop : {type: mongoose.Schema.Types.ObjectId,  ref:"Shop"},
    role: String,
    createWorkerPrevilege: Boolean,
    createProductPrevilege: Boolean,
})


const Worker = mongoose.model("Worker", workerSchema)

module.exports = Worker