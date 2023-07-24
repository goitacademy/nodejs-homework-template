import express from "express";
import HttpError from "../../helpers/HttpError.js";
// import contactsService from "../../models/contacts.js";
import {contactsAddSchema, contactUpdateFavoriteSchema} from "../../helpers/validate.js";
import isValidId from "../../middlewars/isValidId.js";

import Contact from '../../models/contact.js';

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({}, "name email phone")
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", isValidId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404);
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:id", isValidId, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400);
    }

    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true}, );
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

ontactsRouter.patch("/:id/favorite", isValidId, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400);
    }

    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true}, );
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
