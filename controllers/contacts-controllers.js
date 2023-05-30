const contactSchema = require("../models/contacts");
const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", contactSchema);
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: `Contact with ID ${contactId} not found` });
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const contact = new Contact({ name, email, phone, favorite });
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone, favorite },
      { new: true }
    );
    if (!updatedContact) {
      res.status(404).json({ message: `Contact with ID ${contactId} not found` });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      res.status(404).json({ message: `Contact with ID ${contactId} not found` });
      return;
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
};
