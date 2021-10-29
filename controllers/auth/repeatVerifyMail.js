const repeatVerify = require('../../middlewares')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')

const joiSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
})

const repeatVerifyMail = async (req, res, next) => {
  const { body } = req
  const { email } = body
  const { error } = joiSchema.validate(body)
  if (error) {
    throw new BadRequest(` ${error.message}.`)
  }

  const result = await repeatVerify(email)
  if (result) {
    res.json({ message: 'Verification email sent' })
  } else {
    throw new NotFound('Email have been verified already')
  }
}
module.exports = repeatVerifyMail;
