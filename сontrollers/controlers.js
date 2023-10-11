import HttpError from "../heplers/index.js";

import Contact from "../models/contactModel.js";
import mongoose from "mongoose";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getALl = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw HttpError(404, `Not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavoruteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    // Перевірте, чи контакт існує перед оновленням
    const existingContact = await Contact.findById(contactId);
    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Виконайте оновлення статусу контакту
    existingContact.favorite = favorite;
    await existingContact.save();

    res.status(200).json(existingContact);
  } catch (error) {
    next(error);
  }
};
export default {
  getAll: ctrlWrapper(getALl),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavoruteById),
  deleteById: ctrlWrapper(deleteContact),
};
