const express = require("express")
const mongoose = require("mongoose")
// const productSchema = require("../models/products")
const productsroutes = require("./routes/product")
mongoose.connect("mongodb://localhost:27017/?directConnection=true&appName=learning")
        .then(() => console.log("Connected")).catch(err => console.log(err))
    

// mongoose.connect("mongodb+srv://ayatoo:<Barebare081>@cluster0.hrc69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//         .then(() => console.log("Connected")).catch(err => console.log(err))
const app = express()
app.use(express.json())
app.use("/api/product", productsroutes)


app.get("/", (req, res) => {
    res.send("Hello World")
})



app.listen(3000, () => {
    console.log("Starting...")
})