const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const { schemaCreate, schemaPath } = require("../../models/contact");
const { validateRequest } = require("../../middlewares/validateRequest");
const router = express.Router();

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", validateRequest(schemaCreate), addContact);
router.put("/:id", updateContact);
router.patch("/:id/favorite", validateRequest(schemaPath), updateStatusContact);
router.delete("/:id", removeContact);

module.exports = router;
