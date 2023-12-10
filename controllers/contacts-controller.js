
import { HttpError } from "../helpers/index.js";
import fs from 'fs/promises'
import {Contact,
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema
} from "../models/contacts/contacts.js";
import path from "path";
const avatarsPath = path.resolve("public","avatars")
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
    const { path: oldPath, filename } = req.file
    const newPath = path.join(avatarsPath,filename)
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars",filename)
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create({...req.body,avatar, owner});

    res.status(201).json(result);
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
    const { id } = req.params;
    const { _id: owner } = req.user;
    const { error } = contactFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.findByIdAndUpdate( { _id: id, owner }, req.body, {
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
const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
     const { _id: owner } = req.user;
    
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
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
export default {
listContacts,
getContactById,
addContact,
removeContact,
updateContact,
updateFavorite
};
