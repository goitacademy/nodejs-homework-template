const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const listContacts = async (req, res) => {
  const { _id } = req.user
  const result = await Contact.find(
    { owner: _id },
    '_id name email phone favorite ',
  )
  sendSuccessRes(res, { data: result })
}

module.exports = listContacts
