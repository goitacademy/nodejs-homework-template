const express = require("express");

const router = express.Router();

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: "200",
    data: { result: contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsOperations.getContactById(contactId);
    res.json({
      status: "success",
      code: "200",
      data: { result: contactById },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: "201",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

// edit
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.body;
    const contactById = await contactsOperations.getContactById(contactId);
    res.json({
      status: "success",
      code: "200",
      data: { result: contactById },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
