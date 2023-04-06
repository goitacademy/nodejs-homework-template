const express = require("express");
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
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await getContactById(contactId);
    if (!contacts) {
      throw new Error(`Contact with id=${contactId} not found!`);
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(res.status(500).json(error));
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.email) {
      throw new Error(`Error`);
    }
    const contacts = await addContact(req.body);
    res.status(200).json(contacts);
  } catch (error) {
    next(res.status(500).json({ message: "Invalid params" }));
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await removeContact(contactId);
    if (!contacts) {
      throw new Error(`Contact with id=${contactId} not found!`);
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(res.status(500).json(error));
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!req.body.email) {
      throw new Error(`Error`);
    }
    const { contactId } = req.params;
    const contacts = await updateContact(contactId, req.body);
    res.status(200).json(contacts);
  } catch (error) {
    next(res.status(500).json({ message: "Invalid params" }));
  }
});

module.exports = router;
