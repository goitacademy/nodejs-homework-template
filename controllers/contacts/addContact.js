const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  sendSuccessRes(res, { data: result }, 201)
}

module.exports = addContact
