import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { addContactShema, updateContactShema } from "../shemaes/contactShema.js";

const getAllContacts = async (req, res, next) => {
  try {
    const allContactsList = await contactsService.listContacts();
    res.json(allContactsList);
  }
  catch (error) {
    next(error);
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsService.getContactById(contactId);
    if (!contactById) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(contactById)
  } catch (error) {
    next(error);
  }
}

const addContact = async (req, res, next) => {
  try {
    const { error } = addContactShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

const updateById = async (req, res, next) => {
  try {
    const { error } = updateContactShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body)
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.deleteContactById(contactId)
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({ message: "Deleted success" });
  } catch (error) {
    next(error);
  }
}

export default { getAllContacts, getContactById, addContact, updateById, deleteById };