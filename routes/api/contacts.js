const express = require("express");
const contacts = require("../../models/contacts");
const contactShema = require("../../helpers/contactValidator");

const router = express.Router();

const validateContact = async (req, res, next) => {
  const { body } = req;

  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    await contactShema.validateAsync(body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res
      .status(400)
      .json({ message: "Validation error", errors: errorMessages });
  }
};

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json({ status: "success", code: 200, data: { data } });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (contact) {
    res.json({ status: "success", code: 200, data: { contact } });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", validateContact, async (req, res, next) => {
  const { body } = req;

  const newContact = await contacts.addContact(body);
  return res.json({ status: "success", code: 201, data: { newContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await contacts.removeContact(contactId);
  if (removedContact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", validateContact, async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  const updatedContact = await contacts.updateContact(contactId, body);

  if (updatedContact) {
    return res
      .status(200)
      .json({ status: "success", code: 200, data: { updatedContact } });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
