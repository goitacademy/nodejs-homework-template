import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { addContactSchema, updateContactSchema } from "../schemas/contactSchema.js";
import { ctrlWrapper } from "../decorator/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const allContactsList = await contactsService.listContacts();
  res.json(allContactsList);
}

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsService.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(contactById)
}

const addContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
}

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contactsService.updateContactById(contactId, req.body)
  if (!updateContact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(updateContact);
}

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await contactsService.deleteContactById(contactId)
  if (!removeContact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({ message: "Deleted success" });
}

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById)
};