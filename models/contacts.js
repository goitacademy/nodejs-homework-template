const { Contact } = require('../routes/api/schemas')
const { schemaPost, schemaPut } = require('../routes/api/schemas')

async function listContacts(req, res, next) {
  const owner = req.user._id
  const data = await Contact.find({ owner })
  return res.json({ data: data });
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id)
  if (contact.owner._id === req.user) {
    return res.json({ contactToFind: contact })
  } return res.status(404).json({ message: "contact has another owner" })

}

async function removeContact(req, res, next) {
  const owner = req.user
  const { id } = req.params
  const findenContact = await Contact.findById(id)
  if (findenContact.owner === owner) {
    await Contact.findByIdAndDelete(id)
    return res.json({ message: `${id} deleted` })
  }
  return res.status(404).json({ message: "contact has another owner" })
}

async function addContact(req, res, next) {
  const owner = req.user._id
  const { body } = req
  const val = schemaPost.validate(body)
  const { error, value } = val;
  if (error) {
    return res.status(404).json({ message: error.message })
  } else {
    value.owner = owner
    await Contact.create(value);
    return res.json({ message: 'added successful' })
  }
}

async function updateContact(req, res, next) {
  const owner = req.user
  const { body } = req
  const { id } = req.params
  const val = schemaPut.validate(body)
  const { error, value } = val
  if (error) {
    throw new Error(error)
  } else {
    const contact = await Contact.findById(id)
    if (contact.owner === owner) {
      const updatedContact = await Contact.findByIdAndUpdate(id, value, { new: true });
      return res.json({ message: `${updatedContact} updated successful` });
    }
    return res.status(404).json({ message: "contact has another owner" })
  }
}

async function updateFavorite(req, res, next) {
  const owner = req.user
  const { id } = req.params;
  if (req.body.favorite === undefined) {
    res.status(400).json({ "message": "missing field favorite" })
  } else {
    const contactFinden = await Contact.findById(id)
    const contact = await updateStatusContact(id, req.body)
    if (!contact) return res.status(400).json({ message: "not found" })
    if (contactFinden.owner === owner) {
      return res.json({ "message": contact })
    }
  }
}

async function updateStatusContact(req, res, next) {
  // id, body
  const { body: { favorite, id }, user } = req
  const contact = await Contact.findById(id)
  if (contact.owner === user) {
    const { name, email, phone } = contact;
    await Contact.findByIdAndUpdate(id, { name, email, phone, favorite }, { new: true })
    return { id, name, email, favorite }
  } return res.status(404).json({ message: "contact has another owner" })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite
}

