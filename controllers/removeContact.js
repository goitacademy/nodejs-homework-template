const contactsRepository = require('../repository/contacts')
const { HTTP_STATUS_CODE } = require('../libs/constants')

const removeContact = async (req, res, next) => {
  const contact = await contactsRepository.removeContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, data: { contact }, message: "contact deleted" })
  }
  return res
    .status(HTTP_STATUS_CODE.NOT_FOUND)
    .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not Found' })
}

module.exports = removeContact