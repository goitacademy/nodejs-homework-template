const Contact = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();

  return res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(result);
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  return res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const id = req.params;
  const removedContact = await Contact.findByIdAndDelete(id.contactId);
  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updatedContact);
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

const updateStatusContact = async (req, res) => {
  const id = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id.contactId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updatedContact);
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
