const express = require("express");
const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{7,15}$/)
    .required(),
});
const schemaUpdate = Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]{7,15}$/),
});
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json(contact);
      return;
    }
    res.status(404).json({ message: "Not Found." });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const validate = schema.validate({ name, email, phone });
    if (validate.error) {
      res.status(400).json({
        message: "Invalid fields",
        error: validate.error.details[0].message,
      });
      return;
    }
    const contact = await addContact({ name, email, phone });
    res.status(201).json(contact);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await removeContact(id);
    if (contact === null) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).send({ message: "Contact deleted succesfully", contact });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    if (!Object.keys(body).length) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }
    const validate = schemaUpdate.validate(req.body);
    if (validate.error) {
      res.status(400).json({
        message: "Invalid fields",
        error: validate.error.details[0].message,
      });
      return;
    }
    const updatedContact = await updateContact(req.params.contactId, body);
    if (!updatedContact) {
      res.status(400).json({ message: "Not found" });
      return;
    }
    res.status(200).json({
      message: "Contact updated succesfully",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
