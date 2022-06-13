const contactsRepository = require('../repository/contacts')
const { HTTP_STATUS_CODE } = require('../libs/constants')

const addContact = async (req, res, next) => {
  const contact = await contactsRepository.addContact(req.body)
   return res.status(HTTP_STATUS_CODE.CREATED).json({ status: 'success', code: HTTP_STATUS_CODE.CREATED, data: { contact } })
}

module.exports = addContact