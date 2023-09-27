const contacts = require('../models/contacts')
const {HttpError} = require('../helpers')
const ctrlWrapper = require('../helpers/ctrlWrapper')


const getAll = async (req, res) => {
  const result = await contacts.listContacts()
  res.json(result)
}

const getById = async (req, res, next) => {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
    if (!result) throw HttpError(404, "Not found")
    res.json(result)
}

const addContact = async (req, res, next) => {
    const result = contacts.addContact(req.body)
    res.status(201).json({message: "Create contact success"})
}

const deleteContact = async (req, res, next) => {
      const { contactId } = req.params
      const result = await contacts.removeContact(contactId)
      if (!result) throw HttpError(404, "Not found")
      res.json({message: "Delete success"})
}

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) throw HttpError(404, "Not found")
    res.json(result)

}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact)
}