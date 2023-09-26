const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const {
  validateBody,
  validateBodyCreate,
  validateBodyUpdate,
} = require("../../middlewares");
const { addSchemaCreate, addSchemaUpdate } = require("../../schemas");

router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getContactsById);
router.post("/", validateBodyCreate(addSchemaCreate), ctrl.addContact);
router.put("/:contactId", validateBodyUpdate(addSchemaUpdate), ctrl.updateById);
router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
