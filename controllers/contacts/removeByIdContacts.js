const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const contactsOperations = require('../../model/contacts')

const removeByIdContacts = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId, req.body)

  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Contact delete' })
}
module.exports = removeByIdContacts
