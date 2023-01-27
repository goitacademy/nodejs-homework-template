const express = require("express");

const router = express.Router();

const contactsOperations = require("../../models/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.getAll();
    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getById(contactId);
    if (!contact) {
      const err = new Error("not found");
      err.status = 404;
      throw err;
    }
    res.json({ status: "success", code: 200, data: { result: contact } });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
