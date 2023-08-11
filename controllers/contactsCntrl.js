const contacts = require('../models/contacts')
const { HttpError } = require('../helpers');
const ctrlWrapper = require('../helpers/ctrlWrapper')


async function getAll(req, res) {
    const result = await contacts.listContacts();
    res.json(result)
}

async function getById(req, res, next) {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.json(result)
}

async function addContact(req, res, next) {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

async function removeById(req, res, next) {
    const result = await contacts.removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.json({message: "Contact deleted"})
}

async function updateById(req, res, next) {
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");    
    }
    res.status(200).json(result);
}


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};