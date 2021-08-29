const contactsOperations = require('../../model')

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const removeContacts = await contactsOperations.removeContact(id)
    res.json({ message: 'contact deleted', removeContacts })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
