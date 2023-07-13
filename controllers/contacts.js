import { listContacts, getContactById, removeContact, addContact, updateContact } from "../models/contacts.js";
import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";
import Joi from "joi";
//----------------------------------------------------------------//

//validation schema
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// get all contacts
const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts).status(200);
};

//get contact by id
const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  console.log("worked");
  if (!contact) throw HttpError(404, "Not Found");

  res.json(contact).status(200);
};

//add contact
const AddContact = async (req, res) => {
  const { email, name, phone } = req.body;
  if (!email) throw HttpError(404, "missed required email field");
  if (!name) throw HttpError(404, "missed required name field");
  if (!phone) throw HttpError(404, "missed required phone field");

  const { error } = addSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);

  const addedContact = await addContact(req.body);

  res.json(addedContact).status(201);
};

//update contact id
const modifyContact = async (req, res) => {
  const { params, body } = req;

  const isBodyEmpty = Object.keys(body).length === 0 ? true : false;

  if (!isBodyEmpty && params.contactId) {
    const { email, name, phone } = body;
    if (!name) throw HttpError(404, "missed required name field");
    if (!phone) throw HttpError(404, "missed required phone field");
    if (!email) throw HttpError(404, "missed required email field");

    const { error } = addSchema.validate(body);
    if (error) throw HttpError(400, error.message);

    const updatedContact = await updateContact(params.contactId, body);
    if (!updatedContact) throw HttpError(404, "Not found");

    res.json(updatedContact).status(200);
  } else {
    throw HttpError(400, "missing fields");
  }
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
