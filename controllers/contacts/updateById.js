const contactsOperations = require('../../model/contacts')
const contactSchema = require('../../validation')

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing fields'
      })
    }
    const { contactId } = req.params
    const updatedContactById = await contactsOperations.updateContact(contactId, req.body)
    if (!updatedContactById) {
      return res.status(404).json({
        message: `Contact ${contactId} was not found`
      })
    }
    res.status(200).json({
      updatedContactById
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
