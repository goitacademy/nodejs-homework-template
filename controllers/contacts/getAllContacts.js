const { getAll } = require('../../models/contacts')

const getAllContacts = async (req, res, next) => {
  const contacts = await getAll()
  res.json({
    status: 'sucsess',
    code: 200,
    data: { contacts }
  })
}

module.exports = getAllContacts
