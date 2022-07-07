const Joi = require('joi')
// const actions = require('../../models/contacts')
const Contact = require('../../models/newContacts') 
const createError = require('../../helpers/error')

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
})

const patch = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new Error(error.message)
    }
    const {favorite} = req.body
    if (favorite !== true && favorite !== false) {
      throw createError(400, 'Missing Field Favorite')
    }
    const result = await Contact.findByIdAndUpdate(req.params.contactId, { favorite }, {new: true})
    if (result === null) { // если контакта с таким id нет
      throw createError(404)
    }
    res.json(result)
  } catch (error) { next(error) }
}

module.exports = patch