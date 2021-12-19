const contactsOperations = require('../model/index')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const contacts = await contactsOperations.removeContact(contactId)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
