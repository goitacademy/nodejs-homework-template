
import Contact from "../models/contacts/contacts.js";
import { HttpError } from "../helpers/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema
} from "../models/contacts/contacts.js";

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({},"-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body,{new:true,runValidators:true});
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
const updateFavorite = async (req, res, next) => {
  try {
    const { error } = contactFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
export default {
listContacts,
getContactById,
addContact,
removeContact,
updateContact,
updateFavorite
};
