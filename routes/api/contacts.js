const express = require("express");
const Joi = require("joi");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
} = require("../../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contactList = await listContacts();
    res.status(200).json({ contactList });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const searchContact = await getContactById(contactId);
    searchContact
      ? res.status(200).json({ searchContact })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validation = addSchema.validate(req.body);
    if (validation.error) {
      const missingField = validation.error.message.split('"')[1];
      res
        .status(400)
        .json({ message: `missing required ${missingField} field` });
    } else {
      const newContact = await addContact(req.body);
      res.status(201).json({ newContact });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    (await removeContact(contactId))
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const validation = updateSchema.validate(req.body);
    if (validation.error) {
      res.status(400).json({ message: "missing fields" });
      return;
    } 
      const updatedContact = await updateContact(contactId, req.body);
      Object.keys(updatedContact).length > 0
        ? res.status(200).json({ updatedContact })
        : res.status(404).json({ message: "Not found" });
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
