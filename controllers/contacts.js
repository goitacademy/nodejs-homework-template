import contacts from "../models/contacts.js";
import { HttpError } from "../helpers/HttpError.js";
import Joi from "joi";

const control = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postAddContact = async (req, res, next) => {
  try {
    const { error } = control.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Sorry:) Not found.");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const putUpdateById = async (req, res, next) => {
  try {
    if (!req.body) {
      throw HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Sorry. Not found.");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export default {
  getAll,
  getById,
  postAddContact,
  deleteById,
  putUpdateById,
};
