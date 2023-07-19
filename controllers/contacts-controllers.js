import Joi from "joi";
import contactsService from "../models/contacts.js";

import HttpError from "../helpers/HttpError.js";
import {ctrlWrapper} from "../decorators/index.js";

const constactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
});


const getAll = async (req, res) => {
        const result = await contactsService.listContacts();
        res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.getContactsById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
};


const add = async (req, res) => {
    const { error } = constactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContacts(req.body);
    res.status(201).json(result);
  res.json({ message: "template message" });
};


const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({
      message: "Contact removed",
    });
};


const updateById = async (req, res) => {
        const { error } = constactsAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { id } = req.params;

        const result = await contactsService.updateContactsById(id, req.body);
        if (!result) {
            throw HttpError(404);
        }
        res.status(201).json(result);
};


export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}