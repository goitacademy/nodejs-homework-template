const Contact = require('../model/contact.model')
const { updateContactSchema } = require('../utils/validate/schemas')

const updateContact = async (req, res, next) => {
  const { body } = req
  const { contactId } = req.params
  const { error } = updateContactSchema.validate(body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true })
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
