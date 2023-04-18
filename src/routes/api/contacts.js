const express = require("express");

const controller = require("../../controllers/contacts-controllers");

const {
  validatePostBody,
  validatePutBody,
  validatePatchBody,
} = require("../../utils/validateBody");

const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../../models/contact");

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

router.patch("/:contactId/favorite", validatePatchBody(updateStatusSchema), controller.updateContactStatus)

module.exports = router;
