const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')
const addContacts = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessRes(res, { result }, 201)
}
module.exports = addContacts
