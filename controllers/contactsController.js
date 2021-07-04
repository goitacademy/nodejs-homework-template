const { Contact } = require('../dbModels/contactModel')

const listContacts = async (req, res) => {
  const contacts = await Contact.find({})
  await res.status(200).json(contacts)
}

async function getContactById(req, res) {
  const contactId = req.params.contactId
  const contact = await Contact.findById(contactId)
  await res.status(200).json({ contact })
}

async function addContact(req, res) {
  const contact = new Contact(req.body)
  await contact.save()
  await res.status(201).json(contact)
}

async function removeContact(req, res) {
  await Contact.findByIdAndDelete(req.params.contactId)
  await res.status(200).json({ message: 'contact deleted' })
}
const updateContact = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.contactId, {
    $set: req.body,
  })
  const updatedContact = await getContactById(req, res)
  await res.status(200).json(updatedContact)
}
const updateStatusContact = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.contactId, {
    $set: req.body,
  })
  const updatedContact = await getContactById(req, res)
  await res.status(200).json(updatedContact)
}
module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
}
