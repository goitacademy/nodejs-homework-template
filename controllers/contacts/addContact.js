const sendSuccessRes = require('../../helpers/sendSuccessRes')
const { Contact } = require('../../model/contacts')

const addContact = async(req, res) => {
  const contact = await Contact.create(req.body)
  sendSuccessRes(res, { contact }, 201)
}

module.exports = addContact
