const express = require("express");

const {
  getAll,
  getById,
  addContact,
  deleteContact,
  editContact,
} = require("../../controlers/contacts");
const validateBody = require("../../middlewares/validateBody");
const contactShema = require("../../schemas/contactShema");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactShema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(contactShema), editContact);

module.exports = router;
