const sendSuccessRes = require('../../helpers/sendSuccessRes')
const contactsOperations = require('../../model/index')

const addContact = async(req, res) => {
  const contact = await contactsOperations.addContact(req.body)
  sendSuccessRes(res, { contact }, 201)
}

module.exports = addContact
