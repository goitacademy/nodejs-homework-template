import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  } from "../models/contacts.js";
  import { HttpError } from "../helpers/HttpError.js";
  import Joi from "joi";
  
  const addScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
  });
  
  export const ctrlGetAllContacts = async (req, res) => {
    res.json(await listContacts());
  };
  export const ctrlGetContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found:()`);
    }
    res.json(result);
  };
  export const ctrlAddContact = async (req, res) => {
    const { error } = addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { name, email, phone } = req.body;
    res.status(201).json(await addContact(req.body));
  };
  export const ctrlChangeContactById = async (req, res) => {
    const { error } = addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
  
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found:()`);
    }
    res.json(result);
  };
  
  export const ctrlDeleteContacById = async (req, res) => {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found:()`);
    }
    res.json({ message: "Contact deleted successed" });
  };