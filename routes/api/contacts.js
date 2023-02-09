const express = require("express");

const router = express.Router();
const createError = require("http-errors");

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: "Server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw createError(404, `Contact id ${id} not found`);
    }
    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.addContact(reg.body);
    res.status(201).json({
      status: "succes",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

// router.delete("/:id", async (req, res, next) => {
// });

// router.put("/:id", async (req, res, next) => {
// });

module.exports = router;
