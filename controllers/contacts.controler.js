const { Contact } = require("../models/contacts");

const getContactsAll = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  if (!contactById) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });
  console.log("NewContact", newContact);
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const response = await Contact.findByIdAndRemove(contactId);

  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const upContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log("upContact", upContact);
  if (!upContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(upContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const upContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!upContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(upContact);
};

module.exports = {
  getContactsAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
