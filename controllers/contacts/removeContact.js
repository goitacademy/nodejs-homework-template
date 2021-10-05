const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const removeContact = async (req, res) => {
  // const { _id } = req.user
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Product with id = ${contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete' })
}

module.exports = removeContact
