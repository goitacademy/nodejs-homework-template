import contactsService from "../models/contacts.js";
import HttpError from "../utils/HttpErrors.js";
import { controllerWrapper } from "../decorators/index.js";

const getAllContacts = async (_, res) => {
  const result = await contactsService.listContacts();
  console.log(result);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.getContactById(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: "Delete success",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
};
