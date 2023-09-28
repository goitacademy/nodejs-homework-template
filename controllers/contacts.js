const contacts = require('../models/contacts')
const {HttpError, ctrlWrapper} = require('../helpers')

const getAll = async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json(data);
}

const getById = async (req, res, next) => {
     const {contactId} = req.params;
    const data = await contacts.getContactById(contactId);
    if (!data) {
      throw HttpError(404,"Not Found")
    }
  res.json(data);
}

const add = async (req, res, next) => {
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
}

const deleteById = async (req, res, next) => {
    const {contactId} = req.params;
    const data = await contacts.removeContact(contactId)
     if (!data) {
      throw HttpError(404,"Not Found")
    }
    return res.json({message: 'contact deleted'})
}

const updateById =  async (req, res, next) => {
    const {contactId} = req.params;
    const data = await contacts.updateContact(contactId, req.body)
     if (!data) {
      throw HttpError(404,"Not Found")
    }
    res.json(data)
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById)
}