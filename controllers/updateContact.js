const contactsRepository = require('../repository/contacts')
const { HTTP_STATUS_CODE } = require('../libs/constants')

const updateContact = async (req, res, next) => {
  const contact = await contactsRepository.updateContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, data: { contact } })
  }
  return res
    .status(HTTP_STATUS_CODE.NOT_FOUND)
    .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not Found' })
}

  module.exports = updateContact