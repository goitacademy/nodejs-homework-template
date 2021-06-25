const { ContactsModel } = require('../db/contactsModel')
// ++++
const getContact = async (req, res, next) => {
  const list = await ContactsModel.find({})
  res.status(200).json(list)
}
// ++++
const getContactWithId = async (req, res, next) => {
  const { contactId } = req.params
  const contactWithId = await ContactsModel.findById(contactId)
  if (!contactWithId) {
    res.status(404).json({ message: 'Not found' })
  } else res.status(200).json(contactWithId)
}
// ++++
const postContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  const newContact = new ContactsModel({ name, email, phone, favorite })
  await newContact.save()
  res.status(201).json(newContact)
}
// ++++
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params
  await ContactsModel.findByIdAndRemove(contactId)
  res.status(200).json({ message: 'contact deleted' })
}
// ++++
const patchContact = async (req, res, next) => {
  const { contactId } = req.params

  const contactWithId = await ContactsModel.findByIdAndUpdate(
    contactId,
    {
      $set: req.body,
    },
    { new: true }
  )

  if (!contactWithId) {
    res.status(404).json({ message: 'Not found' })
  } else return res.status(200).json(contactWithId)
}

module.exports = {
  getContact,
  getContactWithId,
  postContact,
  deleteContact,
  patchContact,
}
