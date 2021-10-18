const { Contact } = require('../../model/contacts')
const sendSuccessRes = require('../../helpers/sendSuccessRes')

const listContacts = async(req, res) => {
  const contacts = await Contact.find({})
  sendSuccessRes(res, { contacts })
}

module.exports = listContacts
