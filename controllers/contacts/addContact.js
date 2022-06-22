const contacts = require('../../services/contacts')
const { createError } = require('../../helpers')
const { contactAddSchema } = require('../../schema/schema')

const addContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body)
  if (error) {
    throw createError(400, error.message)
  }
  const result = await contacts.addContact(req.body)
  res.status(201).json(result)
}

module.exports = addContact
