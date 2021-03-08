const Joi = require('joi')
const schemaForCreate = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .required(),

  email: Joi.string()
    .required()
})

const schemaForUpdate = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),
  password: Joi.string(),
  email: Joi.string()
})

const validateBeforeCreate = async (body) => {
  try {
    return await schemaForCreate.validateAsync(body)
  } catch (error) {
    throw new Error(error)
  }
}

const validateBeforeUpdate = async (body) => {
  try {
    await schemaForUpdate.validateAsync(body)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  validateBeforeCreate,
  validateBeforeUpdate
}
