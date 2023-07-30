import contactsService from "../models/contacts.js";
import { HttpError, contactDecorator } from "../helpers/index.js";
import contactAddSchema from "../schemas/contactSchema.js";

export const getAllContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
  };

export const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  };

export const addNewContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  };

export const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      message: "Delete successful",
    });
  };

export const updateContact = async (req, res) => {
   const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    req.json(result);
  };

  export default {
    getAllContacts: contactDecorator(getAllContacts),
    getContactById: contactDecorator(getContactById),
    addNewContact: contactDecorator(addNewContact),
    deleteContact: contactDecorator(deleteContact),
    updateContact: contactDecorator(updateContact),
  };
  