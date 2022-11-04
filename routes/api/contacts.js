const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { requestBodyValidation } = require("../../validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await getContactById(id);

    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { value, error } = requestBodyValidation(req.body);

    if (error) {
      res.status(400).json({ message: `Validation error: ${error.message}` });
    }

    const data = await addContact(value);

    if (!data) {
      res.status(400).json({
        message: `A contact with name '${value.name}' is already exists!`,
      });
    }

    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ message: `Server error! ${err.message}` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await removeContact(id);

    if (!data) {
      res.status(404).json({ message: `Contact with ID '${id}' not found!` });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { value, error } = requestBodyValidation(req.body);

    if (error) {
      res.status(400).json({ message: `Validation error: ${error.message}` });
    }

    const data = await updateContact(id, value);

    if (!data) {
      res.status(404).json({ message: `A contact with ID '${id}' not found!` });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: `Server error! ${err.message}` });
  }
});

module.exports = router;
