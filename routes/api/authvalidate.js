const Joi = require('joi')

const patternEmail = /.+@.+\..+/i

const joiSchemaAuth = Joi.object(
  {
    email: Joi.string().pattern(new RegExp(patternEmail)).required(),
    password: Joi.string().min(6).required(),
    subscription:Joi.string(),
  }
)

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

module.exports.validateAuth = async (req, res, next) => {
    return await validate(joiSchemaAuth, req.body, res, next)
}