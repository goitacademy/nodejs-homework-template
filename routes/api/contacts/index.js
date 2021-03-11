const express = require("express");
const router = express.Router();
const validate = require("./validation");
const contactsController = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, contactsController.get)
  .post("/", guard, validate.createContact, contactsController.create);

router
  .get("/:contactId", guard, contactsController.getById)
  .delete("/:contactId", guard, contactsController.remove);

router.patch(
  "/:contactId",
  guard,
  validate.updateContact,
  contactsController.updateStatus
);

module.exports = router;
