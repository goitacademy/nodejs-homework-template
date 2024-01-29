import express from "express";
import Joi from "joi";

import { listContacts, getContactById, removeContact, addContact, updateContact } from "../../models/contacts.js";

const router = express.Router();

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      res.json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;
  const result = addContactSchema.validate(newContact);
  if (result.error) {
    res.json({ status: "error", code: 400, message: result.error.message });
  } else {
    try {
      const addedContact = await addContact(newContact);
      res.json({
        status: "success",
        code: 201,
        data: { addedContact },
      });
    } catch (err) {
      res.json({
        status: "Internal Server Error",
        code: 500,
        message: err?.message,
      });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);

    if (contact) {
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      res.json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = req.body;
    const updatedContact = await updateContact(contactId, contact);

    if (!updatedContact) {
      res.json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: { updatedContact },
      });
    }
  } catch (err) {
    res.json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
});

export default router;
