import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { CtrlWrapper } from "../decorators/index.js";

// * Get ALL
const getAll = () => async (_, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

// * Get by ID
const getById = () => async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) throw HttpError(404);

  res.json(result);
};

// * Post NEW
const add = () => async (req, res) => {
  const result = await contactsService.addContact(req.body);
  if (result) throw HttpError(404, "missing required name field");

  res.status(201).json(result);
};

// * Delete
const removeById = () => async (req, res) => {
  const result = await contactsService.removeContact(req.params.contactId);
  if (result) throw HttpError(404);
  res.status(200).json({ message: "contact deleted" });
};

// *Update
const updateById = () => async (req, res, next) => {
  const result = await contactsService.updateContact(
    req.params.contactId,
    req.body
  );
  if (!result) throw HttpError(404, "missing fields");
  res.status(200).json(result);
};

export default {
  getAll: CtrlWrapper(getAll),
  updateById: CtrlWrapper(updateById),
  removeById: CtrlWrapper(removeById),
  add: CtrlWrapper(add),
  getById: CtrlWrapper(getById),
};
