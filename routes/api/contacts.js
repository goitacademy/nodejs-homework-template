const express = require("express");
const router = express.Router();

const contacts = require("../../models/contacts");
const handlerHttpError = require("./utils");

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw handlerHttpError(404, "Not FOUND !");
    }
    res.json({ result });
  } catch (error) {
    next(error);
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
