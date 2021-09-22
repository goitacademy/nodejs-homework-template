const contactsOperation = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const addContact = async (req, res) => {
  const result = await contactsOperation.addContact(req.body)
  sendSuccessRes(res, { data: result }, 201)
}

module.exports = addContact
