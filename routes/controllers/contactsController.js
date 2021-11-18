const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model')

const getContactsController = async (req, res) => {
  console.log(listContacts())
  listContacts()
  res.json({ status: 'success' })
}
const getContactByIdController = async (req, res) => {
  const id = req.params.id
  getContactById(id)
  res.json({ status: 'success' })
}
const addContactController = async (req, res) => {
  const body = req.body
  addContact(body)
  res.json({ status: 'success' })
}
const deleteContactController = async (req, res) => {
  const id = req.params.id
  removeContact(id)
  res.json({ status: 'success' })
}
const changeContactController = async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  updateContact(id, body)
  res.json({ status: 'success' })
}

module.export = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
}
