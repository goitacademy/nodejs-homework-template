const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const contactsOperations = require('../../model/contacts')

const updateByIdContacts = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateById(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}
module.exports = updateByIdContacts
