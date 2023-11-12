const express = require("express");
const contacts = require("../../models/contacts");
const contactSchema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!email) missingFields.push("email");
      if (!phone) missingFields.push("phone");

      const errorMessage = `missing required ${missingFields.join(
        ", "
      )} field(s)`;
      return res.status(400).json({ message: errorMessage });
    }

    const validation = contactSchema.validate(req.body);
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    const result = await contacts.addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const deletedContact = await contacts.removeContact(req.params.contactId);
  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!email) missingFields.push("email");
      if (!phone) missingFields.push("phone");

      const errorMessage = `missing required ${missingFields.join(
        ", "
      )} field(s)`;
      return res.status(400).json({ message: errorMessage });
    }

    const validation = contactSchema.validate(req.body);
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    const updatedContact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
