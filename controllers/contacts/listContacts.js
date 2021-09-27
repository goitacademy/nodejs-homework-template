const contactsOperations = require('../../model/contacts')
const sendSuccessResponse = require('../../helpers')

const listContacts = async (req, res) => {
  const result = await contactsOperations.listContacts()
  sendSuccessResponse(res, { data: result })
}

module.exports = listContacts
