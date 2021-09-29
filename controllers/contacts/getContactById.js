const { Contact } = require('../../models')
const sendSuccessResponse = require('../../helpers')
const { NotFound } = require('http-errors')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, '_id name email phone favorite')
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { result })
}

module.exports = getContactById
