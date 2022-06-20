const Joi = require('joi')
const actions = require('../../models/contacts')

const postSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }).required(),
  phone: Joi.string().pattern(/^[0-9+()-_ ]*$/).max(20).required()
})

const post = async (req, res, next) => {
  try {
    const { error } = postSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new Error(error.message)
    }
      const result = await actions.addContact(req.body)
      res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = post