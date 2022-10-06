const express = require("express");
const Joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  contact ? res.json(contact) : next();
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .min(3)
      .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
      .required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ status: validation.error.details[0].message });
  }

  const result = await addContact({ name, email, phone });
  if (!result) {
    return res.status(500).json({ message: "Internal server error" });
  }
  typeof result === "string"
    ? res.status(400).json({ message: result })
    : res.status(201).json({ result });
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  result
    ? res.status(200).json({ message: "contact deleted", result })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .min(3)
      .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
      .required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ status: validation.error.details[0].message });
  }

  const result = await updateContact(req.params.contactId, req.body);
  result
    ? res.status(200).json({ result })
    : res.status(404).json({ message: "Not found" });
});

module.exports = router;
