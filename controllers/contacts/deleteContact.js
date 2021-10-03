const { removeContact } = require('../../model/contacts/index')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    await removeContact(contactId)

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    console.log(error.message)
    next()
  }
}

module.exports = { deleteContact }
