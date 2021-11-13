const { Contact } = require('../model')

const getAllContacts = async (req, res) => {
  const { _id } = req.user
  const contacts = await Contact.find({ owner: _id }).populate(
    'owner',
    '_id email'
  )
  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  })
}

module.exports = getAllContacts
