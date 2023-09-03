const { Contact } = require("../models/contact.js");
const {HttpError, wrapController} = require("../helpers")

const listContacts = async (_, res) => {
  const contacts = await Contact.find().exec();

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).exec();

  if (contact !== null) {
    res.status(200).json(contact);
  } else {
    throw HttpError(404, "Not found");
  }
};

async function addContact(req, res) {
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const doc = await Contact.create(newContact);
  console.log(doc);

  res.status(201).json(doc);
}

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId).exec();

  if (contact !== null) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    throw HttpError(404, "Not found");
  }
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (result) {
    res.status(200).json(result);
  } else {
    throw HttpError(404, "Not found");
  }
};

const updateStatusContact= async (req, res) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  ).exec();

  if (result) {
    res.status(200).json(result);
  } else {
    throw HttpError(404, "Not found");
  }
};

module.exports = {
  listContacts: wrapController(listContacts),
  getById: wrapController(getById),
  addContact: wrapController(addContact),
  removeContact: wrapController(removeContact),
  updateContact: wrapController(updateContact),
  updateStatusContact: wrapController(updateStatusContact),
};
