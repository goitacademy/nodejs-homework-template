const express = require("express");
const { contactsController } = require("../../controllers");

// const {
//   validateBody: validateBodyFunc,
// } = require("../../middlewares/validate");
const { checkContactId } = require("../../middlewares/validate");
const { validateBody } = require("../../middlewares/validate");
// const schema = require("../../validation/schema");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", checkContactId, contactsController.getContactById);

router.post("/", validateBody, contactsController.addContact);

router.delete("/:contactId", checkContactId, contactsController.removeContact);

router.put(
  "/:contactId",
  checkContactId,
  validateBody,
  contactsController.updateContact
);

router
  .route("/:contactId/favorite")
  .patch(checkContactId, contactsController.updateStatusContact);

module.exports = router;
