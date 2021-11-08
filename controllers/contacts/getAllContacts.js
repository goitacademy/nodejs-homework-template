const { Contact } = require('../../models')

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({})
  res.json({
    status: 'sucsess',
    code: 200,
    data: { contacts }
  })
}

module.exports = getAllContacts
