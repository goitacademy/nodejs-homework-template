const { Contact } = require('../../model')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const contacts = await Contact.findByIdAndDelete(contactId)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found required contact' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
