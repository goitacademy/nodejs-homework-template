const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");
const { json } = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const list = await listContacts();
    if (typeof list === "string") {
      res.status(404).json({ message: list });
    } else {
      res.status(200).json(list);
      next();
    }
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(`${req.params.contactId}`);
    if (!contact || typeof contact === "string") {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
      next();
    }
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const validetionData = schema.validate(req.body);
    if (validetionData.error) {
      res.status(400).json({ message: "missing required name field" });
      next();
    } else {
      const newContact = await addContact({ name, email, phone });
      if (typeof newContact === "string") {
        res.status(404).json({ message: `${newContact}` });
        next();
      } else {
        res.status(201).json(newContact);
        next();
      }
    }
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const message = await removeContact(`${req.params.contactId}`);
    if (!message || typeof message === "string") {
      res.status(404).json({ message: "Not found" });
      next();
    } else {
      res.status(200).json(message);
      next();
    }
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    });

    const validetionData = schema.validate(req.body);

    if (validetionData.error) {
      res.status(400).json({ message: "Missing fields" });
      next();
      return;
    }
    const updatedContact = await updateContact(
      `${req.params.contactId}`,
      req.body
    );
    if (!updatedContact || typeof updateContact === "string") {
      res.status(404).json({ message: "Not found" });
      next();
    } else {
      res.status(200).json(updatedContact);
      next();
    }
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

module.exports = router;
