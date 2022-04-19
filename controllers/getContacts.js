const contactRepository = require('../repository/contacts')

const listContacts =  async (req, res, next) => {
  const contacts = await contactRepository.listContacts()
  res.json({ status: 'success', code: 200, payload: {contacts} })
}

module.exports = listContacts