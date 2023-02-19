const contacts = require("../models/contacts/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");


const getAll = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
}

const add = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const remove = async (req, res) => {
     const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
     if (!result) {
       throw HttpError(404, "Not found");
    }
    res.status(200).json({message: "Contact deleted"})
}

const update = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
};