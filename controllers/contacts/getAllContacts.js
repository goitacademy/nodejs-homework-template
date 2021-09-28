const { sendSuccessRes } = require('../../helpers')
const contactsOperations = require('../../model/contacts')
const getAllContacts = async (req, res) => {
  const result = await contactsOperations.listContacts()
  sendSuccessRes(res, { result })
}
module.exports = getAllContacts
