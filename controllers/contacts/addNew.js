const contactsOperations = require('../../model/contacts')
const contactSchema = require('../../validation')

const addNew = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.json({
      newContact
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addNew
