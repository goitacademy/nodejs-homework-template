const { NotFound } = require('http-errors')
const contactsOperation = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperation.removeContact(contactId)
  if (!result) {
    throw new NotFound(`Product with id = ${contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete' })
}

module.exports = removeContact
