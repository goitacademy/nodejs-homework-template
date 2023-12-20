import * as contactService from "../models/contactsModel.js";
import HttpError from "../helpers/HttpError.js";
import contactAddSchema from "../schema/contacts-schema.js";

const getAllContacts = async (req, res) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found `);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContacts = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactById,
  addContacts,
};
