import * as contactsService from "../models/contacts.js";

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.contactId);
    if (!result) {
      const error = new Error(
        `Contact with id=${req.params.contactId} not found!`
      );
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getContactById,
};
