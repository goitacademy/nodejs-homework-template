import express from "express";
import Contact from "../../models/Contact.js";
import { HttpError } from "../../helpers/index.js";
import { contactAddSchema, contactUpdateSchema,contactUpdateFavoriteSchema, } from "../../models/Contact.js";
import { isValidObjectId } from "mongoose";

const router = express.Router();

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

    if (!isValidObjectId(contactId)) {
      throw HttpError(404, `${contactId} not valid id`);
    }

    const result = await Contact.findById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId}  not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Missing required  fields");
    }

    const { error } = contactAddSchema.validate(req.body);

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

    if (!isValidObjectId(contactId)) {
      throw HttpError(404, `${contactId} not valid id`);
    }

    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      throw HttpError(404, `${contactId} not valid id`);
    }
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }

    const { error } = contactUpdateSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      throw HttpError(404, `${contactId} not valid id`);
    }
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing field favorite");
    }

    const { error } = contactUpdateFavoriteSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body);

    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
