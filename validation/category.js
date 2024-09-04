const Joi = require("joi")

const schema = Joi.object({
    name: Joi.string().min(2).required(),
})

function validateCategory(category, res) {
   
    let {error} = schema.validate(category)
    // res.status(400).json({message: error.details[0].message});
    // return true
    if (error){
        console.log(error.details[0].message)
        res.status(400).json({message: error.details[0].message});
        return true
    }
};


module.exports = validateCategory;