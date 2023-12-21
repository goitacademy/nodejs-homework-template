import { HttpError } from "../helpers/index.js";
import Contact from "../models/contact.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContact = async (req, res) => {
  console.log(Contact);
  const result = await Contact.find()
  res.status(200).json( result );
};

const getContactById = async (req, res, ) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result );
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw HttpError(400, "missing required name field");
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({"message": "contact deleted"});
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json( result);
};

const updateStatusContact =async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json( result);
};

export default {
  getAllContact: ctrlWrapper(getAllContact),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact:ctrlWrapper(updateStatusContact)
};
