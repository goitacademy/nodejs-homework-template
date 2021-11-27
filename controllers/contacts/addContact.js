const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')

const { Contact } = require('../../models')

const contactsDir = path.join(__dirname, '../../public/avatars')

const addContact = async (req, res) => {
  const image = gravatar.url('goit@gmail3.comos')

  const newContact = { ...req.body, owner: req.user._id, image }
  const result = await Contact.create(newContact)
  const contactFolder = path.join(contactsDir, String(result._id))
  await fs.mkdir(contactFolder)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  })
}

module.exports = addContact
