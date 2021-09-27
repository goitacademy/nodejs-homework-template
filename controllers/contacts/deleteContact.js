const { removeContact } = require('../../model/contacts/index')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await removeContact(contactId)

    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = { deleteContact }
