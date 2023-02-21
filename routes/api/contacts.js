const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers/contacts");
const schemas = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");

router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", validateBody(schemas.addSchema), addContact);
router.delete("/:id", removeContact);
router.put("/:id", validateBody(schemas.addSchema), updateContact);

module.exports = router;
