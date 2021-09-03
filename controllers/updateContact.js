<<<<<<< HEAD
const contactsOperations = require('../model')
const { contactJoiSchema } = require('../validation')

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const { contactId } = req.params
    const updatedContact = await contactsOperations.updateContact(contactId, req.body)
    if (!updatedContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({
      updatedContact,
    })
=======
const { Contact } = require('../model')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!contacts) {
      return res.status(404).json({ message: 'Not found required contact' })
    }
    res.status(200).json({ contacts })
>>>>>>> origin/hw-03-mongodb
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
