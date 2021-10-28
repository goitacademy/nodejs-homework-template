const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getContacts = async (req, res) => {
  const contacts = await Contact.find({}, '_id name email phone favorite')

  sendSuccessRes(res, { contacts })
}
module.exports = getContacts
