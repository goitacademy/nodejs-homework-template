const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getContacts = async (req, res) => {
  const contacts = await Contact.find()

  sendSuccessRes(res, { contacts })
}
module.exports = getContacts
