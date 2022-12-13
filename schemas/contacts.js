const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite:Joi.boolean().required()

})

const favoriteSChema = Joi.object({
    favorite:Joi.boolean().required() 
})
module.exports = { addSchema, favoriteSChema }