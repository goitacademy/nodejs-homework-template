const { Contact } = require('../../model')

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({ owner: req.user._id }).populate('owner', '_id email ')
  if (!contacts) {
    res.status(404).json({ message: 'not found' })
  }
  res.json({ contacts })
}

module.exports = listContacts
