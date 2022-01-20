const { Contact } = require('../../models')
const { Conflict } = require('http-errors')
const { sendSuccessRes } = require('../../helpers')

const addContact = async (req, res) => {
  // const result = await Contact.create(req.body)
  const { _id } = req.user
  const { email, phone } = req.body
  const includedContacts = await Contact.find({
    $or: [{ email }, { phone }],
  })

  includedContacts.forEach((contact) => {
    if (contact.owner.toString() === _id.toString()) {
      throw new Conflict('Contact already exist')
    }
  })

  const result = await Contact.create({ ...req.body, owner: _id })

  sendSuccessRes(res, { result }, 201)
}

module.exports = addContact
