const express = require("express");
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
  try {
    const list = await listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(`${req.params.contactId}`);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(contact);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .pattern(/^[ ,-]+$/)
        .min(2)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9, ,(),+,-]+$/)
        .min(9)
        .max(20)
        .required(),
    });

    const validetionData = schema.validate(req.body);
    if (validetionData.error) {
      res.status(400).json({ message: "Missing required name field." });
    } else {
      const newContact = await addContact({ name, email, phone });
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const message = await removeContact(`${req.params.contactId}`);
    if (!message) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(message);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string()
        .pattern(/^[a-z,A-Z,0-9, ,-]+$/)
        .min(2)
        .max(30)
        .required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string()
        .min(9)
        .max(20)
        .pattern(/^[0-9, ,(),+,-]+$/),
    });

    const validetionData = schema.validate(req.body);

    if (validetionData.error) {
      res.status(400).json({ message: "Missing required name field." });
      return;
    } else {
      const updatedContact = await updateContact(
        `${req.params.contactId}`,
        req.body
      );
      if (!updatedContact) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json(updatedContact);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
