const contacts = require("../models/contacts");
const contactSchema = require("../schemas/contacts");
const { CreateHttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const data = await contacts.listContacts();
  res.status(200).send(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  console.log(req.params);
  if (!data) {
    throw new CreateHttpError(404, "Not found");
  }
  res.status(200).send(data);
};

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (typeof error !== "undefined") {
    throw new CreateHttpError(400, "Missing required name field");
  }
  const data = await contacts.addContact(req.body);
  res.status(201).send(data);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);
  if (!data) {
    throw new CreateHttpError(404, "Not found");
  }
  res.status(200).send({ message: "Contact deleted" });
}; 

const updateContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (typeof error !== "undefined") {
    throw new CreateHttpError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const data = await contacts.updateContact(contactId, req.body);
  if (!data) {
    throw new CreateHttpError(404, "Not found");
  }
  res.status(200).send(data);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
