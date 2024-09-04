const Joi = require("joi")

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    category: Joi.string().min(2).required(),
    shop: Joi.string().min(2).required(),
    description: Joi.string().min(50).required(),
    in_stock : Joi.number(),
    ptype: Joi.string(),
    price: Joi.number(),
})
// const productSchema = {
//     name: Joi.string().min(2).required(),
//     description: Joi.string().min(50).required(),
//     in_stock : Joi.number(),
//     ptype: Joi.string(),
//     price: Joi.number(),
// }

function validateProduct(product, res) {
    // const schema = productSchema
    // return schema.validate(product)
    let {error} = schema.validate(product)
    // let {error} = validateProduct(data)
    // console.log(error.details[0].message)
    if (error){
        console.log(error.details[0].message)
        res.status(400).json({message: error.details[0].message});
        return true
        // return {"message": error.details[0].message}
    }
};

module.exports = validateProduct;