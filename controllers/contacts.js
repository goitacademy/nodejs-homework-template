import { listContacts, getContactById, removeContact, addContact, updateContact } from "../models/contacts.js";
import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";


// get all contacts
const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

//get contact by id
const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) throw HttpError(404, "Not Found");

  res.status(200).json(contact);
};

//add contact
const AddContact = async (req, res) => {
  const addedContact = await addContact(req.body);

  res.status(201).json(addedContact);
};

//update contact id
const modifyContact = async (req, res) => {
  const { params, body } = req;

  const updatedContact = await updateContact(params.contactId, body);
  if (!updatedContact) throw HttpError(404, "Not found");

  res.status(200).json(updatedContact);
};

//delete contact by id
const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await removeContact(contactId);
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
};

//export
export default ctrl;
