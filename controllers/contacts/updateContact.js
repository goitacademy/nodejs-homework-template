const requestError = require('../../helpers/requestError')
const Contact = require('../../models/contacts')

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw requestError(404)
  }
  res.status(200).json(result)
}
module.exports = updateContact