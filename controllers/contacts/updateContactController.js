const { updateContact } = require('../../contacts')

const updateContactController = async (req, res) => {
  try {
    const { contactId } = req.params
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
    })
    if (!updatedContact) {
      return res.status(400).json({ message: 'Not found' })
    }
    return res.status(200).json({ updatedContact })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = updateContactController
