const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const contactsOperations = require('../../model/contacts')
const getByIdContacts = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)

  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}
module.exports = getByIdContacts
