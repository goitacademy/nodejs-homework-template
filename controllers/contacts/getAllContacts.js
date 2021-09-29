const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')
const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite')
  sendSuccessRes(res, { result })
}
module.exports = getAllContacts
