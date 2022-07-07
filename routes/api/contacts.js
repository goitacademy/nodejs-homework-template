const express = require("express");

const router = express.Router();

const { createError, schemaPost, schemaPut } = require("../../helpers");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await listContacts());
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404, "Not found");
    } else res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = await schemaPost.validate(body);
    if (error) {
      throw createError(400, `${error.details[0].message}`);
    }
    const result = await addContact(body);
    if (!result) {
      throw createError(400, "Contact already in list");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = schemaPut.validate(body);
    if (error) {
      throw createError(400, `${error.details[0].message}`);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, body);
    if (!result) {
      throw createError(400, "No such contact in list");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
