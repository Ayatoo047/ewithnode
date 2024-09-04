const express = require("express")
const mongoose = require("mongoose")
// const productSchema = require("../models/products")
const productsroutes = require("./routes/product")
const categoryroutes = require("./routes/category")
const userroutes = require("./routes/user")
const shoproutes = require("./routes/shop")
const workerroutes = require("./routes/worker")
const auth = require("./routes/auth")

mongoose.connect("mongodb://localhost:27017/?directConnection=true&appName=learning")
        .then(() => console.log("Connected")).catch(err => console.log(err))
    

// mongoose.connect("mongodb+srv://ayatoo:<Barebare081>@cluster0.hrc69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//         .then(() => console.log("Connected")).catch(err => console.log(err))
const app = express()
app.use(express.json())
app.use("/api/product", productsroutes)
app.use("/api/category", categoryroutes)
app.use("/api/user", userroutes)
app.use("/api/shop", shoproutes)
app.use("/api/worker", workerroutes)
app.use("/api/login", auth)


app.get("/", (req, res) => {
    res.send("Hello World")
})



app.listen(3000, () => {
    console.log("Starting...")
})