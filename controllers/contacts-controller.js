import HttpError from "../utils/HttpErrors.js";
import { controllerWrapper } from "../decorators/index.js";
import Contact from "../models/Contact.js";

const getAllContacts = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  console.log(result);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: "Delete success",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
};
