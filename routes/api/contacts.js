const express = require("express");
const router = express.Router();
const validate = require("./validation");
const contactsController = require("../../controllers/contacts");

router
  .get("/", contactsController.get)
  .post("/", validate.createContact, contactsController.create);

router
  .get("/:contactId", contactsController.getById)
  .delete("/:contactId", contactsController.remove);

router.patch(
  "/:contactId",
  validate.updateContact,
  contactsController.updateStatus
);

module.exports = router;
