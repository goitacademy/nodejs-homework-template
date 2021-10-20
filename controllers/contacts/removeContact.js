const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const remove = await Contact.findByIdAndDelete(contactId)
    if (!remove) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({ remove })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
