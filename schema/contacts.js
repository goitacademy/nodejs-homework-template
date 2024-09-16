const Joi = require('joi');
const addSchema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.string().min(5).max(16).required(),
        })

module.exports={
    addSchema
}        