const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  editContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const contactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
};

const getOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const addOneContact = async (req, res, next) => {
  const { error } = contactShema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const data = await addContact(req.body);
  res.status(201).json(data);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = contactShema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const data = await editContact(contactId, req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContactById: ctrlWrapper(getOneContactById),
  addOneContact: ctrlWrapper(addOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};