const contactOperations = require('../model/contacts')
const { sendSuccessRes } = require('../helpers')

const addContact = async (req, res) => {
  const contact = await contactOperations.addContact(req.body)
  sendSuccessRes(res, { contact }, 201)
}

module.exports = addContact
