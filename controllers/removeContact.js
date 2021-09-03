<<<<<<< HEAD
const contactsOperations = require('../model')
=======
const { Contact } = require('../model')
>>>>>>> origin/hw-03-mongodb

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
<<<<<<< HEAD
    const deleteContact = await contactsOperations.removeContact(contactId)
    if (!deleteContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({ message: 'contact deleted' })
=======

    const contacts = await Contact.findByIdAndDelete(contactId)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found required contact' })
    }

    res.status(200).json({ message: 'contact deleted' })
>>>>>>> origin/hw-03-mongodb
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
