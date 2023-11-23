const express = require("express");
const Joi = require("joi");
const { authMiddleware } = require("../../auth/auth.middleware");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../service/index");

const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const contacts = await listContacts(page, limit);
    res.status(200).send({ contacts });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

router.get("/:contactId", authMiddleware, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).send({ contact });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({ message: "missing required name - field" });
  } else {
    try {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }
});

router.delete("/:contactId", authMiddleware, async (req, res, next) => {
  try {
    const isContactRemoved = await removeContact(req.params.contactId);
    if (isContactRemoved) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

router.put("/:contactId", authMiddleware, async (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({ message: "missing fields" });
  } else {
    try {
      const contact = await updateContact(req.params.contactId, req.body);
      if (contact) {
        res.status(200).send({ contact });
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }
});

router.patch("/:contactId/favorite", authMiddleware, async (req, res, next) => {
  const validationResult = favoriteSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).json({ message: "missing field favorite" });
  } else {
    try {
      const contact = await updateStatusContact(req.params.contactId, req.body);
      if (contact) {
        res.status(200).send({ contact });
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }
});

module.exports = router;
