import express from "express";
// import {
//   getContactById,
//   listContacts,
//   removeContact,
//   addContact,
//   updateContacts,
// } from "../../models/contacts.js";
import HttpError from "../../heplers/index.js";
import Joi from "joi";
import Contact from "../../models/contactModel.js";
import mongoose from "mongoose";

const router = express.Router();

const ContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required field`,
  }),
  phone: Joi.number().required(),
  email: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }
    const { error } = ContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields empty");
    }
    const { error } = ContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

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
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    // Перевірте, чи `contactId` є валідним ObjectId
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid contactId" });
    }

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
});

export default router;
