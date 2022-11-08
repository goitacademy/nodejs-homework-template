const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const Joi = require("joi");
const schemaPost = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  phone: Joi.number().required(),
});
const schemaPut = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.number(),
});

router.get("/", async (_, res, next) => {
  const contacts = await listContacts();
  try {
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await getContactById(contactId);
  const isContacts = contacts.length === 0;
  try {
    isContacts
      ? res
          .status(404)
          .json({ status: "error", code: 404, message: "Not found" })
      : res.json({
          status: "success",
          code: 200,
          data: { contacts },
        });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contacts = await addContact({ name, email, phone });
  const { error } = schemaPost.validate(req.body);
  try {
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contacts = await removeContact(id);
  try {
    if (!contacts) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const newContact = await updateContact(id, req.body);
  const { error } = schemaPut.validate(req.body);
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing fields",
      });
    }
    if (error || !newContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: error?.message || "Not found",
      });
    }
    res.json({ status: "success", code: 200, data: { newContact } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
