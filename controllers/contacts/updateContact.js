const contactsOperations = require('../../model')
const { contactSchema } = require('../../validation')

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    if (!body) {
      return res.status(400).json({ message: 'missing fields' })
    }
    const { error } = contactSchema.validate(body)
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }

    const updateContact = await contactsOperations.updateContact(id, body)
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({ updateContact })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
