const sendSuccessRes = require('../../helpers/sendSuccessRes')
const contactsOperations = require('../../model/index')

const listContacts = async(req, res) => {
  const contacts = await contactsOperations.listContacts()
  sendSuccessRes(res, { contacts })
}

module.exports = listContacts
