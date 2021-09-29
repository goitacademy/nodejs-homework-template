const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const removeByIdContacts = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId, req.body)

  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Contact delete' })
}
module.exports = removeByIdContacts
