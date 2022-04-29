const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/index");
const { createError, contactSchema } = require("../../helpers/index");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    if (!result) {
      throw createError();
    }
    res.json({ status: 200, message: "success", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ status: 200, message: "success", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error);
    }
    const result = await addContact(req.body);
    res.json({ status: 201, message: "success", data: result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ status: 200, message: "contact deleted", data: result });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json({ status: 200, message: "contact updated", data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
