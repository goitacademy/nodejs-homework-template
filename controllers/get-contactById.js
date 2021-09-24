const { sendSuccessRes } = require('../helpers')
const contactsOperations = require('../model/contacts')
const { NotFound } = require('http-errors')

const getContactById = async(req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}
module.exports = getContactById
