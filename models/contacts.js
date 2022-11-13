const { Contact } = require('../routes/api/schemas')
const { schemaPost, schemaPut } = require('../routes/api/schemas')

async function listContacts(req, res, next) {
  const data = await Contact.find()
  return res.json({ data: data });
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id)
  return res.json({ contactToFind: contact })
}

async function removeContact(req, res, next) {
  const { id } = req.params
  await Contact.findByIdAndDelete(id)
  return res.json({ message: `${id} deleted` })
}

async function addContact(req, res, next) {
  const { body } = req
  const val = schemaPost.validate(body)
  const { error, value } = val;
  if (error) {
    throw new Error(error)
  } else {
    await Contact.create(value);
    return res.json({ message: 'added successful' })
  }

}

async function updateContact(req, res, next) {
  const { body } = req
  const { id } = req.params
  const val = schemaPut.validate(body)
  const { error, value } = val
  if (error) {
    throw new Error(error)
  } else {
    const updatedContact = await Contact.findByIdAndUpdate(id, value, { new: true });
    return res.json({ message: `${updatedContact} updated successful` });
  }
}

async function updateFavorite(req, res, next) {
  const { id } = req.params;
  if (req.body.favorite === undefined) {
    res.status(400).json({ "message": "missing field favorite" })
  } else {

    const contact = await updateStatusContact(id, req.body)
    if (!contact) return res.status(400).json({ message: "not found" })
    else return res.json({ "message": contact})
  }
}

async function updateStatusContact(id, body) {
  const { favorite } = body
  const contact = await Contact.findById(id)
  const { name, email, phone } = contact;
  await Contact.findByIdAndUpdate(id, { name, email, phone, favorite }, { new: true })
  return { id, name, email, favorite }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite
}

