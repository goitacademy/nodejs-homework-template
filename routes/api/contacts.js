const express = require("express");
const router = express.Router();
// const Contacts = require("../../model/index");
const contactsController = require("../../controllers/contactsController");
const validate = require("./validation");

router
  .get("/", contactsController.getAll)

  .post("/", validate.createContact, contactsController.create);

router
  .get("/:contactId", contactsController.getById)

  .delete("/:contactId", contactsController.remove)

  .patch("/:contactId", validate.updateContact, contactsController.update);

// router.get("/", contactsController.getAll);

// router.get("/:contactId", contactsController.getById);

// router.post("/", validate.createContact, contactsController.create);

// router.delete("/:contactId", contactsController.remove);

// router.patch("/:contactId", validate.updateContact, contactsController.update);

module.exports = router;
