const express = require("express");
const { ContactControlers } = require("../../controlers");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ContactControlers.getAllContacts);

router.get("/:contactId", ContactControlers.getContactById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  ContactControlers.createContact
);

router.delete("/:contactId", ContactControlers.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ContactControlers.updateContact
);

module.exports = router;
