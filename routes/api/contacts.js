const express = require("express");
const func = require("../../models/contacts");
const Joi = require("joi");
const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await func.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await func.getContactById(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
});

router.post("/", async (req, res, next) => {
  const { error } = contactsSchema.validate(req.body);

  if (error) {
    res.status(400).json(error.message);
    return;
  }

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
    return;
  }

  const newContact = await func.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await func.removeContact(id);
  res.json({
    status: "success",
    code: 200,
  });
  if (!id) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
});

router.put("/:id", async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
    return;
  }

  const { error } = contactsSchema.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
    return;
  }

  const { id } = req.params;
  const contact = await func.updateContact(id, req.body);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
});

module.exports = router;
