const express = require("express");

const controller = require("../../controllers/contacts-controllers");

const {
  validatePostBody,
  validatePutBody,
} = require("../../utils/validateBody");

const {
  addContactSchema,
  updateContactSchema,
} = require("../../schemas/contactSchema");

const router = express.Router();

router.get("/", controller.getAllContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validatePostBody(addContactSchema), controller.addNewContact);

router.delete("/:contactId", controller.deleteContactById);

router.put(
  "/:contactId",
  validatePutBody(updateContactSchema),
  controller.updateContactById
);

module.exports = router;
