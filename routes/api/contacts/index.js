const express = require("express");
const router = express.Router();
// const Contacts = require("../../model/index");
const contactsController = require("../../../controllers/contactsController");
const validate = require("./validation");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, contactsController.getAll)

  .post("/", guard, validate.createContact, contactsController.create);

router
  .get("/:contactId", guard, contactsController.getById)

  .delete("/:contactId", guard, contactsController.remove)

  .patch(
    "/:contactId",
    guard,
    validate.updateContact,
    contactsController.update
  );

// router.get("/", contactsController.getAll);

// router.get("/:contactId", contactsController.getById);

// router.post("/", validate.createContact, contactsController.create);

// router.delete("/:contactId", contactsController.remove);

// router.patch("/:contactId", validate.updateContact, contactsController.update);

module.exports = router;
