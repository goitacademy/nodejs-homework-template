const { sendSuccessRes } = require('../../helpers')
const contactsOperations = require('../../model/contacts')
const addContacts = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  sendSuccessRes(res, { result }, 201)
}
module.exports = addContacts
