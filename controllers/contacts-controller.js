import {HttpError} from "../helpers/index.js";
import {ctrlWrapper} from "../decorators/index.js";

import Contact from "../models/Contact.js";

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const contactById = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw (404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({message: "contact deleted"});
};

const updateStatusContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  listContacts: ctrlWrapper(listContacts),
  contactById: ctrlWrapper(contactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
