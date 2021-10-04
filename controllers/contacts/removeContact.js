const { Contact } = require('../../models')
const sendSuccessResponse = require('../../helpers')
const { NotFound } = require('http-errors')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { message: 'Success delete' })
}

module.exports = removeContact
