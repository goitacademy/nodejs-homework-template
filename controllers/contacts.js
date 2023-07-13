
import Joi from "joi";
import { listContacts, getContactById, removeContact, addContact, updateContact } from "../models/contacts.js";
import { HttpError } from "../helpers/HttpError.js";


const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const getAll = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts).status(200);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    if (!contact) throw HttpError(404, "Not Found");

    res.json(contact).status(200);
  } catch (error) {
    next(error);
  }
};

export const AddContact = async (req, res, next) => {
  try {
    const { email, name, phone } = req.body;
    if (!email) throw HttpError(404, "missed required email field");
    if (!name) throw HttpError(404, "missed required name field");
    if (!phone) throw HttpError(404, "missed required phone field");

    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const addedContact = await addContact(req.body);

    res.json(addedContact).status(201);
  } catch (error) {
    next(error);
  }
};

export const modifyContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await removeContact(contactId);
    if (!deletedContact) throw HttpError(404, "Not Found");

    res.json({ message: "contact deleted" }).status(200);
  } catch (error) {
    next(error);
  }
};