const { Contact } = require('../dbModels/contactModel')

const listContacts = async (req, res) => {
  const { _id } = req.user
  const contacts = await Contact.find({ userId: _id })
  await res.status(200).json(contacts)
}

async function getContactById(req, res) {
  const { _id } = req.user
  const contactId = req.params.contactId
  const contact = await Contact.find({ _id: contactId, userId: _id })
  await res.status(200).json({ contact })
}

async function addContact(req, res) {
  const { _id } = req.user
  const contact = new Contact({ ...req.body, userId: _id })
  await contact.save()
  await res.status(201).json(contact)
}

async function removeContact(req, res) {
  const { _id } = req.user
  await Contact.findOneAndDelete({ _id: req.params.contactId, userId: _id })
  await res.status(200).json({ message: 'contact deleted' })
}
const updateContact = async (req, res) => {
  const { _id } = req.user
  await Contact.findOneAndUpdate(
    { _id: req.params.contactId, userId: _id },
    {
      $set: { ...req.body, userId: _id },
    },
  )
  const updatedContact = await getContactById(req, res)
  await res.status(200).json(updatedContact)
}
const updateStatusContact = async (req, res) => {
  const { _id } = req.user

  await Contact.findOneAndUpdate(
    { _id: req.params.contactId, userId: _id },
    {
      $set: req.body,
    },
  )
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
