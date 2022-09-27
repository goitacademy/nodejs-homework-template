const { Contact, schemas } = require('../../models/contacts')

const  createError  = require('../../middleware/createError')

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavorite.validate(req.body)
  if (error) {
    throw createError(400, error.message)
  }
  const { contactId } = req.params
  const reply = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!reply) {
    throw createError(404)
  }
  res.json(reply)
}

module.exports = updateFavorite

