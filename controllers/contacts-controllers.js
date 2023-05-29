const Joi = require("joi");

const contactsServices = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await contactsServices.getContactById(req.params.contactId);

  if (!contact) throw HttpError(404, "Not found");

  res.json(contact);
};

const addContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) throw HttpError(400, "Missing required name field");

  const newContact = await contactsServices.addContact(req.body);

  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const result = await contactsServices.removeContact(req.params.contactId);

  if (!result) throw HttpError(404);

  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) throw HttpError(400, "Missing fields");

  const updatedContact = await contactsServices.updateContact(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) throw HttpError(404, "Not found");

  res.json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
