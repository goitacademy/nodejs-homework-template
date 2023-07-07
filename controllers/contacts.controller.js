const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error retrieving contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const addContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      }
    );
    if (!req.body) {
      return res.status(400).json({ message: "Missing fields" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
};
const updateStatusContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!favorite) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
