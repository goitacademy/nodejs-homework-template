const contactsRepository = require('../repository/contacts')
const { HTTP_STATUS_CODE } = require('../libs/constants')

const listContacts = async (req, res, next) => {
  const contacts = await contactsRepository.listContacts()
  return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, data: { contacts } })
}

module.exports = listContacts