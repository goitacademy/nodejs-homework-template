const express = require("express");

const router = express.Router();
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contactsSchema");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.newContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContactById);

router.put(
  "/:contactId",
  validateBody(schemas.existingContactSchema),
  ctrl.updateContactById
);

module.exports = router;
