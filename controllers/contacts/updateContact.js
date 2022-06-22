const contacts = require('../../services/contacts')
const { createError } = require('../../helpers')
const { contactUptSchema } = require('../../schema/schema')

const updateContact = async (req, res) => {
  const { error } = contactUptSchema.validate(req.body)
  if (error) {
    throw createError(400, error.message)
  }
  const { contactId } = req.params
  const result = await contacts.updateContact(contactId, req.body)
  if (!result) {
    throw createError(404)
  }
  res.status(200).json(result)
}

module.exports = updateContact
