const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { validationPost, validationPut } = require("../../servises/validation");

router.get("/", async (req, res, next) => {
  try {
    res.json({
      status: "success",
      code: 200,
      data: await listContacts(),
    });
  } catch (error) {
    next();
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (data) {
      res.json({ status: "success", code: 200, data });
    } else {
      createError(404);
      next();
    }
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    await validationPost.validateAsync(req.body);
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      const data = await addContact(req.body);
      res.status(201).json({ status: "success", code: 201, data });
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(417).json({ message: error.message });
    } else {
      next(error);
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isSuccess = await removeContact(contactId);
    console.log("isSuccess", isSuccess);
    if (isSuccess) {
      res.json({ status: " ", code: 200, message: "contact deleted" });
    } else {
      createError(404);
      next();
    }
  } catch (error) {
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    await validationPut.validateAsync(req.body);
    const { contactId } = req.params;
    const { name, phone, email } = req.body;
    if (!name && !phone && !email) {
      res.status(400).json({ message: "missing fields" });
    } else {
      const updatedContact = await updateContact(contactId, req.body);
      if (!updatedContact) {
        createError(404);
        next();
      } else {
        res.json({ status: "success", code: 200, data: updatedContact });
      }
    }
  } catch (error) {
    if (error.isJoi) {
      res.status(417).json({ message: error.message });
    } else {
      next(error);
    }
  }
});

module.exports = router;
