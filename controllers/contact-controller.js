import contactsService from "../models/contacts/contacts.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);

  if (!result)
    throw HttpError(404, `Contact with id: '${contactId}' not found.`);

  res.json(result);
};

const add = async (req, res) => {
  const { body } = req;
  const result = await contactsService.add(body);

  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.removeContactById(contactId);
  if (!result)
    throw HttpError(404, `Contact with id: '${contactId}' not found.`);

  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const result = await contactsService.updateContactById(contactId, body);
  if (!result) throw HttpError(404, "Not found");

  res.json({ message: "Update success" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
