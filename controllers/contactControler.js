import Joi from "joi";

import contactsServes from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import ctrWrapper from "../decorators/ctrlWrapper.js";

const contactCheck = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

export const getList = async (req, res) => {
  const data = await contactsServes.listContacts();
  res.json(data);
};

export const getContactId = async (req, res) => {
  const { id } = req.params;
  const data = await contactsServes.getContactById(id);
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};

export const postAddContact = async (req, res) => {
  const { error } = contactCheck.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const data = await contactsServes.addContact(req.body);
  res.status(201).json(data);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsServes.removeContact(id);

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json({ message: "contact deleted" });
};

export const updateContact = async (req, res) => {
  const { error } = contactCheck.validate(req.body);

  if (error) {
    throw HttpError(400, "missing fields");
  }

  const { id } = req.params;
  const data = await contactsServes.updateContactId(id, req.body);

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
};

export default {
  getList: ctrWrapper(getList),
  getContactId: ctrWrapper(getContactId),
  postAddContact: ctrWrapper(postAddContact),
  deleteContact: ctrWrapper(deleteContact),
  updateContact: ctrWrapper(updateContact),
};
