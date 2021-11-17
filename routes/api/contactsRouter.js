const express = require("express");
const router = express.Router();
const {
  addContactValidator,
  patchPostValidation,
} = require("../middlewares/validationMiddleware");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
} = require("../controllers/contactsController");

router.get("/api/contacts", getContactsController);

router.get("/api/contacts/:contactId", getContactByIdController);

router.post("/api/contacts", addContactValidator, addContactController);

router.delete("/api/contacts/:contactId", deleteContactController);

router.patch(
  "/api/contacts/:contactId",
  patchPostValidation,
  changeContactController
);

module.exports = router;
