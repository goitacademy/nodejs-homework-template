const express = require("express");

const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.send(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(
    req.params.contactId
  );
  if (contact) {
    res.send(contact);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res
      .status(500)
      .json({ message: "Error adding contact" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (contact) {
    res.send(contact);
  } else {
    res.status(404);
    res.send({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const newData = req.body;
    const { error } = contactSchema.validate(newData);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message });
      return;
    }

    const contact = await updateContact(
      req.params.contactId,
      newData
    );
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res
      .status(500)
      .json({ message: "Error updating contact" });
  }
});

module.exports = router;