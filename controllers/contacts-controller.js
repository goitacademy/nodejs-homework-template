import contactsService from "../models/contacts.js";
import HttpError from "../helpers/http-error.js";

const getAll = async (req, res) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById };
