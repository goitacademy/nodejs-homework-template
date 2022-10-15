const { Contact } = require('../../models/contact')

const { RequestError } = require('../../helpers')

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const hasFavorite = Object.keys(req.body).find((item) => item === 'favorite')
  if (!hasFavorite) {
    throw RequestError(400, 'missing field favorite')
  }
  const body = { favorite: req.body.favorite }
  const result = await Contact.findByIdAndUpdate(contactId, body, { new: true })
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.status(200).json(result)
}
module.exports = updateStatusContact
