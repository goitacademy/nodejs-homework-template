const contactsOperations = require('../model/index')
const { contactsSchema } = require('../validation')

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ message: 'missing fields' })
    }

    const { contactId } = req.params

    const contacts = await contactsOperations.updateContact(contactId, req.body)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
