const express = require("express");
const Joi = require("joi").extend(require("joi-phone-number"));
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
});

const router = express.Router();

// Get contacts
router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: contacts });
});

// Get contacts with id
router.get("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (foundContact) {
    res.status(200).json(foundContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const result = schema.validate(req.body);
  console.log("res", result);

  const add = await addContact(req.body);
  console.log(add);
  res.status(201).json({ message: add });
});

// Delete contact
router.delete("/:contactId", async (req, res, next) => {
  try {
    const response = await removeContact(req.params.contactId);
    if (response) {
      res.json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
