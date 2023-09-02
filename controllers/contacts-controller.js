import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    throw HttpError(404, `Movie with id: '${id}' not found`);
  }
  res.json(contact);
};

const add = async (req, res) => {
  const addContact = await contactsService.addContact(req.body);
  res.status(201).json(addContact);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await contactsService.removeContact(id);
  if (!contact) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await contactsService.updateContactById(id, req.body);
  if (!contact) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(contact);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
