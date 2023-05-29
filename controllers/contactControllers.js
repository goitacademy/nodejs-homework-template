const contacts = require("../models/contactsOperations");
const { HttpError, decorator } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const contactList = await contacts.listContacts();

  res.status(200).json(contactList);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(contact);
};

const postContact = async (req, res, next) => {
  const body = req.body;

  const contactToAdd = await contacts.addContact(body);

  res.status(201).json(contactToAdd);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contactToDelete = await contacts.removeContact(id);

  if (!contactToDelete) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json({
    mesage: "contact deleted",
  });
};

const changeContactData = async (req, res, next) => {
  const body = req.body;

  const { id } = req.params;

  const updatedContact = await contacts.updateContact(id, body);

  if (!updatedContact) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts: decorator(getAllContacts),
  getContact: decorator(getContact),
  postContact: decorator(postContact),
  deleteContact: decorator(deleteContact),
  changeContactData: decorator(changeContactData),
};
