const { jsonReader } = require('../utils')
const { updateContact } = jsonReader
const { putValidSchema } = require('./validationSchema')

const update = async (req, res, next) => {
  const { contactId } = req.params
  const updatedContact = req.body
  const { error } = putValidSchema.validate(updatedContact)
  try {
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        result: 'Missing required fields'
      })
    }
    const contact = await updateContact(parseInt(contactId), updatedContact)
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Contact not found'
      })
    }
    res.json({
      status: 'Contact seccessfully updated',
      code: 200,
      data: {
        result: contact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = update
