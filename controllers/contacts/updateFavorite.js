const { Contact } = require('../../models/contactModel')
const { HttpError } = require('../../helpers')

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId }, req.body, { new: true }
  )
  if (!result) {
    throw HttpError(404, "Not found")
  }
  res.json(result)
}

module.exports = updateFavorite