const Joi = require("joi")

const schema = Joi.object({
    email: Joi.email().min(3).required(),
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