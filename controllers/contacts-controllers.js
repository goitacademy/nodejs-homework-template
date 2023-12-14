import { controllerWrapper } from "../decorators/controllerWrapper.js";
import contactsService from "../models/contacts.js";
import HttpError from "../utils/HttpError.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../validation-schemas/contacts-schemas.js";

const getAllContacts = async (req, res, next) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addNewContact = async (req, res, next) => {
  const newContact = await contactsService.addContact(req.body);

  res.status(201).json(newContact);
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactsService.removeContact(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addNewContact: controllerWrapper(addNewContact),
  updateContactById: controllerWrapper(updateContactById),
  deleteContactById: controllerWrapper(deleteContactById),
};
