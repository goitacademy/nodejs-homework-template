const schema = require("../schemas/schemas");
const Contacts = require("../models/contacts");

// get all Contacts
const getContacts = async (req, res, next) => {
  const contacts = await Contacts.find({});
  res.status(200).json(contacts);
};

// get contact by Id
const getContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contacts.findById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

// delete contact by Id
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }

  await Contacts.findByIdAndRemove(contactId);

  res.status(200).json({ message: "contact is deleted" });
};

// create new contact
const createNewContact = async (req, res, next) => {
  const newContact = await Contacts.create(req.query);
  res.status(201).json(newContact);
};

// change contact by Id
const changeContact = async (req, res, next) => {
  const { error } = schema.validate(req.query);
  const { contactId } = req.params;

  // audit required fields
  if (error) {
    res.status(400).json({ message: error.message });
  }

  // audit contact by Id
  const contact = await Contacts.findById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }

  const updatedContact = await Contacts.findOneAndUpdate(contactId, req.query);

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  // audit contact by Id
  const contact = await Contacts.findById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  createNewContact,
  changeContact,
  updateStatusContact,
};
