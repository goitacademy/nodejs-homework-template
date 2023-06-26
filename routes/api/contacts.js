const express = require("express");
const router = express.Router();

const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");

const { validateFunc } = require("../../middlewares/middlewares");
const schema = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:contactId", getContactById);

router.post("/", validateFunc(schema.schema), addContact);

router.delete("/:contactId", validateFunc(schema.schema), removeContact);

router.put("/:contactId", updateContact);

module.exports = router;
