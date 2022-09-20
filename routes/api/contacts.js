// const { json } = require("express");
const express = require("express");
const {
  addContactValidation,
  putContactValidation,
} = require("../../middleware/validationMiddleware");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const list = await listContacts();
    res.status(200);
    res.json({ contacts: JSON.parse(`${list}`) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const searchContact = await getContactById(contactId);
    if (!searchContact) {
      throw new Error(`Not found`);
    }
    res.status(200);
    res.json({ contact: searchContact });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await addContact(body);
    res.status(201);
    res.json({ contact: newContact });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactList = await removeContact(contactId);
    if (contactList === null) {
      throw new Error(`Not found`);
    }
    res.status(200);
    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:contactId", putContactValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const newContact = await updateContact(contactId, body);
    res.status(200);
    res.json({ contact: newContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
