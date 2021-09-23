const express = require("express");
const router = express.Router();
const contactsSchema = require("../../schemas/contacts");
// const { contactsSchema } = require("../../schemas");
const { controllerWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
// console.log(ctrl);

// GET /api/contacts
router.get("/", controllerWrapper(ctrl.getAll));

// GET /api/contacts/3
router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validation(contactsSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validation(contactsSchema),
  controllerWrapper(ctrl.updateContactsById)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeContactById));

module.exports = router;
