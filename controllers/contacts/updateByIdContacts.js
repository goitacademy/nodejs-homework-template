const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const updateByIdContacts = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}
module.exports = updateByIdContacts
