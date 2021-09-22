const { NotFound } = require('http-errors')
const contactsOperation = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperation.getContactById(contactId)
  if (!result) {
    throw new NotFound(`Product with id = ${contactId} not found`)
  }
  sendSuccessRes(res, { data: result })
}
module.exports = getContactById
