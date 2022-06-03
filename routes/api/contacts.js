const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers/contacts");
const { schemaCreate } = require("../../models/contact");
const { validateRequest } = require("../../middlewares/validateRequest");
const router = express.Router();

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", validateRequest(schemaCreate), addContact);
router.put("/:id", updateContact);
router.delete("/:id", removeContact);

module.exports = router;
