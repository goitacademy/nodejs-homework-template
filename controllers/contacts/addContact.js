const { Contact } = require('../../models')
const sendSuccessResponse = require('../../helpers')

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessResponse(res, { data: result }, 201)
}

module.exports = addContact
