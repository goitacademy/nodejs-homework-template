const contactsOperations = require('../../model/contacts')
const sendSuccessResponse = require('../../helpers')
const { NotFound } = require('http-errors')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { result })
}

module.exports = getContactById
