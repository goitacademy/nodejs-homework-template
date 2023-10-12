const { Contact } = require("../db/contacts-schema");
const { HttpError } = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    res.json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
