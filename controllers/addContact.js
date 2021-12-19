const contactsOperations = require('../model/index')
const { contactsSchema } = require('../validation')

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ message: 'missing required name field' })
    }

    const contacts = await contactsOperations.addContact(req.body)

    res.status(201).json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
