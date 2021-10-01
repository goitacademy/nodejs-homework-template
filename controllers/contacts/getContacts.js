const contactOperations = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const getContacts = async (req, res) => {
  const contacts = await contactOperations.listContacts()

  sendSuccessRes(res, { contacts })
}
module.exports = getContacts
