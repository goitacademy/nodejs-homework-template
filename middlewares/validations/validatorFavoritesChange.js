const Joi = require('joi')

const validator = async (req, res, next) => {
  try {
    const validator = Joi.object({
      favorite: Joi.boolean().required()
    })
    const { error } = validator.validate(req.body)
    if (!Object.keys(req.body).length) {
      error.message = 'missing field favorite'
    }
    if (error) {
      next(error)
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = validator
