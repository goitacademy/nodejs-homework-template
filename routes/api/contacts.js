const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id:${contactId} not found`);
      // const error = new Error(`Contact with id:${contactId} not found`);
      // error.status = 404;
      // throw error;
      // return res.status(404).json({ message: `Contact with id:${contactId} not found` });
    }

    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }

  // res.json({ message: "template message" });
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
