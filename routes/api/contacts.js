const express = require("express");
const router = express.Router();

const { contactValidator } = require("../../utils/validator.js");
const contactsController = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsController.readContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await contactsController.getById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const validationResult = contactValidator(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }
    const newContact = await contactsController.writeContacts({
      name,
      email,
      phone,
    });

    res.status(201).json({ message: "contact created", contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const result = await contactsController.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { name, email, phone } = req.body;
    const validationResult = contactValidator(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }
    const updatedContact = await contactsController.updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const contactId = req.params.contactId;

    const updatedContact = await contactsController.updateStatusContact(
      contactId,
      favorite
    );

    if (updatedContact) {
      return res
        .status(200)
        .json({ message: "contact updated", contact: updatedContact });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
