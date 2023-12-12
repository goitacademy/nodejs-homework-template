const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const contactSchema = require("../schemas/contactSchema");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await getById(req.params.id);

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res) => {
  try {
    await contactSchema.validateAsync(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const result = await removeContact(req.params.id);

  if (result.message === "contact deleted") {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateContactInfo = async (req, res) => {
  try {
    await contactSchema.validateAsync(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const updatedContact = await updateContact(req.params.id, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactInfo,
};
