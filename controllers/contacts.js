const contacts = require("../models/contacts")

const { HttpError, ctrlWrappers } = require("../helpers")


const getAll = async (req, res) => {
      const result = await contacts.listContacts();
      res.json(result);
}

const getById = async (req, res) => {
  const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
  res.json(result)
}

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
      res.status(201).json(result);
}

const removeContact = async (req, res) => {
 const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
}

const updateContact = async (req, res) => {
    const {contactId} = req.params;
  const result = await contacts.updateContact(contactId, req.body);
 if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: ctrlWrappers(getAll),
    getById: ctrlWrappers(getById),
    addContact: ctrlWrappers(addContact),
    removeContact: ctrlWrappers(removeContact),
    updateContact: ctrlWrappers(updateContact),
}