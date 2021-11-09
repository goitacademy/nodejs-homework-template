const { updateContact } = require('../../model/contacts')

const updateContactController = async (req, res) => {
  try {
    const { contactId } = req.params
    const { name, email, phone } = req.body

    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
    })
    if (!updatedContact) {
      return res.status(400).json({ message: 'Not found by that id:' + contactId })
    }
    return res.status(200).json({ message: 'Update successful' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = updateContactController
