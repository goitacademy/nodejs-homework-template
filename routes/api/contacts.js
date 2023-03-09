const express = require("express");
const router = express.Router();

const {
  validation,
} = require("../../middlewares/validation/validationMiddleware");

const {
  joiSchemaRequired,
  joiSchemaOptional,
} = require("../../middlewares/validation/validationSchema");

const {
  getContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  updateContactController,
} = require("../../controllers/contactsController");

router.get("/", getContactsController);

router.get("/:contactId", getContactController);

router.post("/", validation(joiSchemaRequired), createContactController);

router.delete("/:contactId", deleteContactController);

router.put(
  "/:contactId",
  validation(joiSchemaOptional),
  updateContactController
);

module.exports = router;
