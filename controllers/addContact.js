const contactsOperations = require('../model')
const { sendSeccessRes } = require('../helpers')

const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  sendSeccessRes(res, result, 201, 'Contact has been successfully added')
}

module.exports = addContact
