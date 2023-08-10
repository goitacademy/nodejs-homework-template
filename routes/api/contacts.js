const express = require("express");

const router = express.Router();

const contactsHandler = require("../../models/contacts");

const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsHandler.listContacts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const data = await contactsHandler.getContactById(contactId);

    if (!data) {
      throw HttpError(404, "Not found");

      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      // return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
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
