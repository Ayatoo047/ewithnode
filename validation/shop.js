const Joi = require('joi')

const schema = Joi.object({
    // owner : Joi.string(),
    name : Joi.string(),
    address : Joi.string(),
    email : Joi.string(),
    phone_one: Joi.string(),
    phone_two: Joi.string(),
})


function validateShop(shop, res) {
    let {error} = schema.validate(shop)

    if (error){
        res.status(400).json({message: error.details[0].message});
        return true
    }
}


module.exports = validateShop;