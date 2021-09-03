const contactsOperations = require('../model')
const { contactJoiSchema } = require('../validation')

const addContact = async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json({
      newContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
