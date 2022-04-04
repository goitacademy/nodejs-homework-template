const express = require("express");
const { nanoid } = require("nanoid");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  if (contacts.length === 0) {
    return res.status(400).json({ message: "contacts not found" });
  }
  return res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({ message: validationResult.error.details });
    return;
  }
  await addContact(newContact);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  if ((await removeContact()).find((el) => el.id === contactId)) {
    await removeContact(contactId);
    return res.status(200).json({ message: "contact deleted" });
  } else {
    return res.status(400).json({ message: "not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req?.body;
  const id = req.params.contactId;
  const newContact = {
    name,
    email,
    phone,
  };
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details });
  } else {
  if (!(await updateContact(id, newContact))) {
    return res.status(400).json({ message: "not found" });
  } else {
      await updateContact(id, newContact);
      return res.status(400).json({ id, ...newContact });
    }
  }
});

module.exports = router;
