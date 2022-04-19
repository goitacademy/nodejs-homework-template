const contactRepository = require('../repository/contacts')

const addContact = async (req, res, next) => {
  const contacts = await contactRepository.addContact(req.body)
  res.status(201).json({ status: 'success', code: 201, payload: {contacts} })
}

module.exports = addContact