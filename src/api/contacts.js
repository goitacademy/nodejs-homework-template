const express = require("express");
const router = express.Router();

const controllerContacts = require("../controllers/contacts");
const {
  validateCreateContacts,
  validateUpdateContacts,
  validateUpdateStatusContact,
} = require("../validation/contacts");
const guard = require("../helpers/guard");

router
  .get("/", guard, controllerContacts.getAll)
  .get("/:contactId", guard, controllerContacts.getById)
  .post("/", guard, validateCreateContacts, controllerContacts.create)
  .delete("/:contactId", guard, controllerContacts.remove)
  .patch(
    "/:contactId",
    guard,
    validateUpdateContacts,
    controllerContacts.update
  )
  .patch(
    "/:contactId/favorite",
    guard,
    validateUpdateStatusContact,
    controllerContacts.updateStatusContact
  );

module.exports = router;
