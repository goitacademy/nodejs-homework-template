const Joi = require('joi')

const validator = async (req, res, next) => {
  try {
    const validator = Joi.object({
      name: Joi.string().min(3),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['ua', 'com', 'net'] } }),
      phone: Joi.string().length(10).pattern(/^[0-9]{10}$/)
    })
    const { error } = validator.validate(req.body)
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
