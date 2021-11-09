const { updateStatusContact } = require('../../model/contacts')

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const updatedFavoriteStatus = await updateStatusContact(contactId, favorite)
  if (!updatedFavoriteStatus) {
    return res.status(404).json({ message: 'Not found with that id:' + contactId })
  }
  return res.status(200).json({ updatedFavoriteStatus })
}

module.exports = updateStatusContactController
