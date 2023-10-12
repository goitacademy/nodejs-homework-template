import * as contactsService from "../models/contacts.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Contact from "../models/Contact.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContactController = async (req, res) => {
  const { body } = req;
  const result = await Contact.create(body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(id, body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContactController),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
