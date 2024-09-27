const Joi = require('joi');//библиотека для проверки и валидации входных данных (например при добоавлении нового контакта чтобы был номер и имя, а не только имя)


const addSchema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.string().required(),
  })

  module.exports = addSchema