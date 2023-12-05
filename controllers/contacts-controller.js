
import { HttpError } from "../helpers/index.js";

import {Contact,
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema
} from "../models/contacts/contacts.js";

const listContacts = async (req, res, next) => {
  try {  
 const { _id: owner } = req.user
 const { page = 1, limit = 20, ...filterParams } = req.query;
 const skip = (page - 1) * limit;
 const total = await Contact.countDocuments({owner});
 const filter = { owner, ...filterParams };
    const result = await Contact.find( filter , "-createdAt -updatedAt", { skip, limit, }).populate("owner", "email subscription");
    res.json({ result, total: total, per_page: limit });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
   const result = await Contact.findOne({ _id: id, owner });
    if (!result) {
      throw HttpError(404, `Contacts with id${id}ot found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create({...req.body, owner});

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
     const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      { new: true, runValidators: true }
    );
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
      const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ _id: id, owner });
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json({
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
