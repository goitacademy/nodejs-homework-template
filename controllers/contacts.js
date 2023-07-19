
import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";
import { Contact } from "../models/contact.js";

// get all contacts
const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

// //get contact by id
const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) throw HttpError(404, "Not Found");

  res.status(200).json(contact);
};

//add contact
const AddContact = async (req, res) => {
  const addedContact = await Contact.create(req.body);

  res.status(201).json(addedContact);
};

//update contact id
const modifyContact = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body,{new: true});
  if (!updatedContact) throw HttpError(404, "Not found");

  res.status(200).json(updatedContact);
};

// update contact Status by id
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updatedContact) throw HttpError(404, "Not found");

  res.status(200).json(updatedContact);
};

//delete contact by id
const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) throw HttpError(404, "Not Found");

  res.status(200).json({ message: "contact deleted" });
};

//decotations of all methods
const ctrl = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  AddContact: ctrlWrapper(AddContact),
  modifyContact: ctrlWrapper(modifyContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

//export
export default ctrl;
