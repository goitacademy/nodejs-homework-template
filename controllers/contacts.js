import contacts from "../models/contacts.js";
import { HttpError } from "../helpers/HttpError.js";
import Joi from "joi";
import { ctrlWrapper } from "../helpers/ctrlWrapeer.js";

const controlPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const controlPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Sorry. Not found.");
  }
  res.json(result);
};

const postAddContact = async (req, res) => {
  const { error } = controlPost.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Sorry:) Not found.");
  }
  res.json({ message: "contact deleted" });
};
const putUpdateById = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, "missing fields");
  }
  const { error } = controlPut.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Sorry. Not found.");
  }
  res.json(result);
};
export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  postAddContact: ctrlWrapper(postAddContact),
  deleteById: ctrlWrapper(deleteById),
  putUpdateById: ctrlWrapper(putUpdateById),
};
