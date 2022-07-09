const Joi = require('joi')
// const actions = require('../../models/contacts')
const Contact = require('../../models/newContacts') 
const createError = require('../../helpers/error')

const putSchema = Joi.object({
  name: Joi.string().max(50),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
  phone: Joi.string().pattern(/^[0-9+()-_ ]*$/).max(20),
  favorite: Joi.boolean()
})

const put = async (req, res, next) => {
  try {
    const { error } = putSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new Error(error.message)
    }
    const {name, email, phone, favorite} = req.body
    if (!name && !email && !phone && favorite === undefined) {
      throw createError(400, 'Missing Fields')
    }
    const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
    if (result === null) { // если контакта с таким id нет
      throw createError(404)
    }
    res.json(result)
  } catch (error) { next(error) }
}

module.exports = put