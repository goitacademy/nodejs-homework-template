const requestError = require('../../helpers/requestError')
const Contact = require('../../models/contacts')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite} = req.body
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, { new: true })
  if (!result) {
    throw requestError(400, "missing field favorite")
  }
  res.status(200).json(result)
}
module.exports = updateStatusContact