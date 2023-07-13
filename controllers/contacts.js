import { listContacts, getContactById, removeContact, addContact, updateContact } from "../models/contacts.js";
import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";


// get all contacts
const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts).status(200);
};

//get contact by id
const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) throw HttpError(404, "Not Found");

  res.json(contact).status(200);
};

//add contact
const AddContact = async (req, res) => {
  const addedContact = await addContact(req.body);

  res.json(addedContact).status(201);
};

//update contact id
const modifyContact = async (req, res) => {
  const { params, body } = req;

  const updatedContact = await updateContact(params.contactId, body);
  if (!updatedContact) throw HttpError(404, "Not found");

  res.json(updatedContact).status(200);
};

//delete contact by id
const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await removeContact(contactId);
  if (!deletedContact) throw HttpError(404, "Not Found");

  res.json({ message: "contact deleted" }).status(200);
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
