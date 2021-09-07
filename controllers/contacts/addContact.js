const { Contact } = require('../../model')

const addContact = async (req, res, next) => {
  const newContact = { ...req.body, owner: req.user._id }
  const additionalContact = await Contact.create(newContact)

  res.status(201).json({ data: additionalContact })
}

module.exports = addContact
