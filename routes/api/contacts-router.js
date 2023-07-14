import express from "express";
import Joi from "joi";

import contactsService from "../../models/contacts/index.js";

import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
});

contactsRouter.get("/", async (req, res) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contacts with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});
contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = contactAddSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      throw HttpError(400, errorMessage);
    }

    const result = await contactsService.addContact(value);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error, value } = contactAddSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessage = getValidationErrorMessage(error);
      throw HttpError(400, errorMessage);
    }

    const { id } = req.params;
    const result = await contactsService.updateContactById(id, value);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

function getValidationErrorMessage(error) {
  const { details } = error;
  const missingFields = details
    .filter((detail) => detail.type === "any.required")
    .map((detail) => detail.context.key);

  if (missingFields.length === 1) {
    return `missing required ${missingFields[0]} field`;
  } else if (missingFields.length > 1) {
    return `missing required fields: ${missingFields.join(", ")}`;
  }

  const validationErrors = details.map((detail) => {
    const fieldName = detail.context.key;
    const fieldType =
      detail.type === "string.base"
        ? "string"
        : detail.type.replace("any.", "");
    return `${fieldName} must be a ${fieldType}`;
  });

  return validationErrors.join(", ");
}

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json({
      message: "Contact Deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
