const Joi = require('joi')
const { NotAuthorizedError } = require('../helpers/errors')

module.exports = {
  userValidation: function (req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string().required(),
      subscription: Joi.string(),
      avatarURL: Joi.string(),
      token: Joi.string().default(false),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(
        new NotAuthorizedError(JSON.stringify(validationResult.error.details)),
      )
    }
    next()
  },
}
