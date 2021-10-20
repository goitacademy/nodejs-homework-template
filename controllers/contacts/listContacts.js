const { Contact } = require('../../models')

const listContacts = async (req, res, _) => {
  const contacts = await Contact.find({ owner: req.user._id }).populate(
    'owner',
    '_id email',
  )
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  })
}

module.exports = listContacts
