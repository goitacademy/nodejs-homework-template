const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");

const { validaterBody } = require("../../decorators/index");
const contactsSchemas = require("../../schemas/contactsSchemas");

const {
  isMissingRequiredFields,
  isEmptyBody,
} = require("../../middlewares/index");

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  isMissingRequiredFields,
  validaterBody(contactsSchemas.add),
  contactsController.add
);

router.delete("/:contactId", contactsController.deleteById);

router.put(
  "/:contactId",
  isEmptyBody,
  validaterBody(contactsSchemas.update),
  contactsController.updateById
);

module.exports = router;
