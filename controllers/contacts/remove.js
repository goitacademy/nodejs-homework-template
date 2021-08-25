const contactsOperations = require('../../model/contacts')

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const removeContact = await contactsOperations.removeContact(contactId)
    if (!removeContact) {
      return res.status(404).json({
        message: `Contact ${contactId} was not found`
      })
    }
    res.status(200).json({
      message: 'Contact deleted'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = remove
