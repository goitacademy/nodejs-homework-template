const contacts = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json({ data: allContacts });
};

const getOneContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ data: contact });
};

const addNewContact = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  if (newContact) {
    res.status(201).json({ data: newContact });
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await contacts.removeContactById(contactId);
  if (contactToDelete === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateSomeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const contactToUpdate = await contacts.updateContact(contactId, body);
  if (contactToUpdate === null) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ data: contactToUpdate });
};

module.exports = {
  getAllContacts,
  getOneContactById,
  addNewContact,
  deleteContactById,
  updateSomeContact,
};
