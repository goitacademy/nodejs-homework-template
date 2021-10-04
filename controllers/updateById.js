const { NotFound } = require('http-errors')
const { Contact } = require('../models')

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true })
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await updateStatusContact(contactId, { favorite })

  if (!result) {
    throw new NotFound('Not found')
  }
  res.status(200).json({ status: 'success', code: 200, data: { result } })
}

module.exports = updateById
