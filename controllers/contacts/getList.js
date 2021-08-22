const contactsOperations = require('../../model/contacts')

const getList = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      contacts
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getList
