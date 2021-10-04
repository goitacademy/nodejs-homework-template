const { Contact } = require('../../models')
const sendSuccessResponse = require('../../helpers')

const listContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite ')
  sendSuccessResponse(res, { data: result })
}

module.exports = listContacts
