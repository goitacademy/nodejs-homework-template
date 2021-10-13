const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const patternName = /^([A-Za-z]{1,}[\s][A-Za-z]{1,})/
const patternTel = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const patternEmail = /.+@.+\..+/i
// const patternId = /^([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})$/i

const schemaContact = Joi.object(
    {
        name: Joi.string().pattern(new RegExp(patternName)).required(),
        email: Joi.string().pattern(new RegExp(patternEmail)).required(),
        phone: Joi.string().pattern(new RegExp(patternTel)).required(),
        favorite: Joi.boolean(),
    }
)

const schemaId = Joi.object({
  contactId: Joi.objectId().required(),
})

const schemaStatusContact = Joi.object({
  name: Joi.string().pattern(new RegExp(patternName)).required(),
  email: Joi.string().pattern(new RegExp(patternEmail)).required(),
  phone: Joi.string().pattern(new RegExp(patternTel)).required(),
  favorite: Joi.boolean().required(),
})

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Field ${err.message.replace(/"/g, '')}`,
    })
  }
}

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next)
}

module.exports.validateId = async (req, res, next) => {
    // console.log('req.params', req.params)
  return await validate(schemaId, req.params, res, next)
}

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next)
}