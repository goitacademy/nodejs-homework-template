const Contacts = require("../models/contactsModel");
const cathAsync = require("../utils/catchAsync");

// GET ALL CONTACTS
exports.listContacts = cathAsync(async (req, res) => {
  const contacts = await Contacts.find().select("-__v");
  res.status(200).json(contacts);
});

// GET CONTACT BY ID
exports.getContactById = cathAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);
  res.status(200).json(contact);
});

// REMOVE CONTACT BY ID
exports.removeContact = cathAsync(async (req, res) => {
  res.json({ message: "template message3" });
});

// ADD NEW CONTACT BY BODY JSON
exports.addContact = cathAsync(async (req, res) => {
  res.json({ message: "template message4" });
});

// UPDATE CONTACT BY ID AND BODY JSON
exports.updateContact = cathAsync(async (req, res) => {
  res.json({ message: "template message5" });
});
