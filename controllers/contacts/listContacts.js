const contactsOperation = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const listContacts = async (req, res) => {
  const result = await contactsOperation.listContacts()
  sendSuccessRes(res, { data: result })
}

module.exports = listContacts
