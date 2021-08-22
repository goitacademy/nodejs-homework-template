const contactsOperations = require('../../model/contacts')

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const updateContactById = await contactsOperations.updateById(contactId, req.body)
    if (!updateContactById) {
      return res.status(404).json({
        message: `Contact ${contactId} was not found`
      })
    }
    const updatedContact = await contactsOperations.updateContact(req.body)
    res.json({
      updatedContact
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
