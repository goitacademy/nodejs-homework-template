const express = require("express");
const router = express.Router();

const schemas = require("../../schemas/contacts");

const controlers = require("../../controllers/contacts");
const { bodyValidatorWrapper } = require("../../middlewares/bodyValidator");

router.get("/", controlers.getAllContacts);

router.get("/:contactId", controlers.getContactById);

router.post(
  "/",
  bodyValidatorWrapper(schemas.contactsSchema),
  controlers.addContact
);

router.delete("/:contactId", controlers.deleteContact);

router.put(
  "/:contactId",
  bodyValidatorWrapper(schemas.contactsSchema),
  controlers.updateContactById
);

module.exports = router;
