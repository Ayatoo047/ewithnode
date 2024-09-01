const productSchema = require("productSchema")
const mongoose = require("mongoose")

const Course = mongoose.model("Course", productSchema)

async function createProduct () {
    const course = new Course({
        name : "Product 1",
        description: "This is product des",
        in_stock: 10,
        category: "Cloth",
        ptype: "Cloth_1",
        price: 10000
    })
    const result = await course.save()
}


