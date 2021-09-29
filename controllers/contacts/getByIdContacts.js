const { NotFound } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')
const getByIdContacts = async (req, res) => {
  const { contactId } = req.params
  // const result = await Contact.findOne({ _id: contactId, '_id name email phone favorite' })
  const result = await Contact.findById(
    contactId,
    '_id name email phone favorite',
  )

  if (!result) {
    throw new NotFound(`Contact ID${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}
module.exports = getByIdContacts
