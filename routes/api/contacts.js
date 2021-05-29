const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId,
} = require("./validation");

router.get("/", controller.listContacts);

router.get("/:contactId", validationMongoId, controller.getContactById);

router.post("/", validationCreateContact, controller.addContact);

router.delete("/:contactId", validationMongoId, controller.removeContact);

router.put(
  "/:contactId",
  validationUpdateContact,
  validationMongoId,
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  validationUpdateStatusContact,
  controller.updateContact
);

module.exports = router;
