const express = require("express");

const controller = require("../../controllers/contacts-controllers");

const {
  validatePostBody,
  validatePutBody,
  validatePatchBody,
} = require("../../utils/validateBody");

const validateId = require("../../utils/validateId");

const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", controller.getAllContacts);

router.get("/:contactId", validateId, controller.getContactById);

router.post("/", validatePostBody(addContactSchema), controller.addNewContact);

router.delete("/:contactId", validateId, controller.deleteContactById);

router.put(
  "/:contactId",
  validateId,
  validatePutBody(updateContactSchema),
  controller.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validatePatchBody(updateStatusSchema),
  controller.updateContactStatus
);

module.exports = router;
