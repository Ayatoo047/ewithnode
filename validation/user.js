const Joi = require("joi")

const schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    state: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    confirm_password: Joi.string().min(8).required(),
})


function validateUser(user, res) {
    let {error} = schema.validate(user)
    
    if (error){
        console.log(error.details[0].message)
        res.status(400).json({message: error.details[0].message});
        return true
    }
};

module.exports = validateUser;