const { Contact, schemas } = require('../../models/contacts')

const { createError } = require('../../middleware')

const updateContact = async (req, res) => {
  const { error } = schemas.add.validate(req.body)
  if (error) {
    throw createError(400, error.message)
  }
  const { contactId } = req.params
  const reply = await Contact.updateTask(contactId, req.body, { new: true })
  if (!reply) {
    throw createError(404)
  }
  res.json(reply)
}

module.exports = updateContact