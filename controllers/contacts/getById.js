const contactsOperations = require('../../model/contacts')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await contactsOperations.getContactById(contactId)
    res.json({
      contacts
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
