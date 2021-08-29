const { v4: uuidv4 } = require('uuid')

const contactsOperations = require('../../model')
const { contactSchema } = require('../../validation')

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    const additionContact = { id: uuidv4(), ...req.body }
    const additionalContacts = await contactsOperations.addContact(additionContact)
    res.status(201).json({ additionalContacts })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
