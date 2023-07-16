const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
};

const getContactByID = async (req, res) => {
    const { contactId } = req.params;
    const user = await contacts.getContactById(contactId);

    if (!user) {
      throw HttpError(404, "User was not found!");
    }

    res.status(200).json(user);
};

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "User was not found!");
    }

    res.json({ message: "Delete success" });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "User was not found!");
    }

    res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactByID: ctrlWrapper(getContactByID),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};