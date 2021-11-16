const { addContact } = require('../../model/contacts')

const addContactController = async (req, res) => {
  try {
    const { name, email, phone } = req.body
    const {_id} = req.user
    if (!name || !email || !phone) {
      return res.json({ message: 'missing required name field' })
    }
    const newContact = await addContact(name, email, phone, _id)
    return res.status(201).json({ newContact })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = addContactController
