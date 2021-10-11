const { addContact } = require('../../model/contacts/index')

const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field' })
  }
  const newContact = await addContact({ name, email, phone })
  res.status(200).json({ newContact, message: 'success' })
}

module.exports = { postContact }
