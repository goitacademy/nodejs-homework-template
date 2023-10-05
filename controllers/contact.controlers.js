import * as contactService from "../models/contacts.js";
import HttpError from "../helpers/http.errors.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAllContacts = async (req, res) => {
  const result = await contactService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found!`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found!`);
  }

  res.json(result);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await contactService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} is not found!`);
  }
  res.json({
    message: "Delete success",
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  removeById: ctrlWrapper(removeById),
};
