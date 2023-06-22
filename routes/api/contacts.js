const express = require("express");

const contactsService = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    console.error("Error getting contacts", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact not found with id: ${contactId}`);
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
