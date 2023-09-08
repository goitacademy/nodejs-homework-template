const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (_, res) => {
  const listContacts = await contacts.listContacts();
  res.json(listContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const singleContact = await contacts.getContactById(id);
  if (!singleContact) {
    throw HttpError(404, "Not found");
  }
  res.json(singleContact);
};

const addContact = async (req, res) => {
    const addedContact = await contacts.addContact(req.body);
      res.status(201).json(addedContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await contacts.updateContact(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
      const removedContact = await contacts.removeContact(id);
      if (!removedContact) {
        throw HttpError(404, "Not found");
      }
      res.json({
        message: "Contact deleted",
      });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
