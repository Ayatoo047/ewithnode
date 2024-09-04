const Joi = require("joi");


const schema = Joi.object({
    user : Joi.string(),
    role: Joi.string(),
    createWorkerPrevilege: Joi.boolean(),
    createProductPrevilege: Joi.boolean(),
})


function validateWorker(worker, res) {
    let {error} = schema.validate(worker)

    if  (error) {
        res.status(400).json({message: error.details[0].message})
        return true
    }
}

module.exports = validateWorker;