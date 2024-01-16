const express = require("express");
const contacts = require("../../models/contacts");
const contactShema = require("../../helpers/contactValidator");

const router = express.Router();

const validateContact = (schema) => async (req, res, next) => {
  const { body } = req;

  try {
    await schema.validateAsync(body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({ message: errorMessages[0] });
  }
};

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  res.status(200).json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post(
  "/",
  validateContact(contactShema.postContactSchema),
  async (req, res, next) => {
    const { body } = req;

    const newContact = await contacts.addContact(body);
    return res.status(201).json(newContact);
  }
);

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await contacts.removeContact(contactId);
  if (removedContact) {
    return res.status(200).json({
      message: "contact deleted",
    });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put(
  "/:contactId",
  validateContact(contactShema.putContactSchema),
  async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const updatedContact = await contacts.updateContact(contactId, body);

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  }
);

module.exports = router;
