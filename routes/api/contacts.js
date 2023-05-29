const express = require("express");

const router = express.Router();

const operations = require("../../models/contacts");

const { httpError } = require("../../helpers");
router.get("/", async (req, res, next) => {
  try {
    const result = await operations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await operations.getContactById(contactId);
    if (!contactById) {
      throw httpError(404);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});
// ! доробити
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await operations.removeContact(contactId);
    res.json({ message: "contact deleted" });
  } catch (error) {}
  // res.json({ message: "template message" });
});
// ! доробити^^^

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
