import * as contactsService from "../models/contacts.js";
import {HttpError} from "../helpers/index.js"

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();

    res.json(result);
  } catch (error) {
    next(error)
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
    throw HttpError(404, `Not found`)
    }

    res.json(result);
  } catch (error) {
    next(error)
  }
};

export default {
  getAllContacts,
  getById,
};
