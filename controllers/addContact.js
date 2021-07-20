const Contact = require('../model/contact.model')
const { addContactSchema } = require('../utils/validate/schemas')

const addContact = async (req, res, next) => {
  const { body } = req
  const { error } = addContactSchema.validate(body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing required name field',
    })
    return
  }
  try {
    const result = await Contact.create(body)
    res.status(201).json({
      status: 'saccess',
      code: 201,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
