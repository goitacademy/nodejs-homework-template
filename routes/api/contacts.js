import express from "express";
import { validationResult } from "express-validator";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import {
  contactIdValidationChain,
  createContactNameValidationChain,
  createContactEmailValidationChain,
  createContactPhoneValidationChain,
} from "../../validation/contactsValidation.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();

  if (result.hasOwnProperty("cause")) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Contacts were not found",
      data: [],
    });
  }

  return res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

router.get(
  "/:contactId",
  contactIdValidationChain(),
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationErrors.array(),
        data: [],
      });
    }

    const { contactId } = req.params;

    const result = await getContactById(contactId);

    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact with such id was not found",
        data: [],
      });
    }

    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
);

router.post(
  "/",
  createContactNameValidationChain(),
  createContactEmailValidationChain(),
  createContactPhoneValidationChain(),
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationErrors.array(),
        data: [],
      });
    }

    const { name, email, phone } = req.body;

    const result = await addContact({ name, email, phone });

    if (!result) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Contact was not added",
        data: [],
      });
    }

    return res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  }
);

router.delete(
  "/:contactId",
  contactIdValidationChain(),
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationErrors.array(),
        data: [],
      });
    }

    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact with such id was not found",
        data: [],
      });
    }

    return res.json({
      status: "success",
      code: 200,
      data: {
        message: "contact deleted",
      },
    });
  }
);

router.put(
  "/:contactId",
  contactIdValidationChain(),
  createContactNameValidationChain().optional(),
  createContactEmailValidationChain().optional(),
  createContactPhoneValidationChain().optional(),
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationErrors.array(),
        data: [],
      });
    }

    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);

    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact with such id was not found",
        data: [],
      });
    }

    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
);

export default router;
