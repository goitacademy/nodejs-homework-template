const contactsOperations = require('../../model/contacts')
const sendSuccessResponse = require('../../helpers')
const { NotFound } = require('http-errors')

const removeContact = async (req, res, next) => {
  const { id } = req.params
  const result = await contactsOperations.removeContact(id)
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessResponse(res, { message: 'Success delete' })
}

module.exports = removeContact
