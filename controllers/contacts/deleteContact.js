const { createError } = require('../../helpers')
const { Contact } = require('../../models/contact')

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw createError(404)
  }
  res.json({
    message: 'Contact deleted',
  })
}

module.exports = deleteContact
