const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId,
} = require("./validation");

router.get("/", guard, controller.listContacts);

router.get("/:contactId", guard, validationMongoId, controller.getContactById);

router.post("/", guard, validationCreateContact, controller.addContact);

router.delete(
  "/:contactId",
  guard,
  validationMongoId,
  controller.removeContact
);

router.put(
  "/:contactId",
  guard,
  validationUpdateContact,
  validationMongoId,
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  validationUpdateStatusContact,
  controller.updateContact
);

module.exports = router;
