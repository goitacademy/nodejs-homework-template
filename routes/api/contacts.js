const express = require("express");

const contactsControllers = require("./../../controllers/contacts-controller");

const isEmptyBody = require("../../middlewares/isEmptyBody.js");

const validateBody = require("../../decorators/validateBody.js");

const contactSchema = require("../../schemas/contact-schema.js");

const contactAddValidation = validateBody(contactSchema);

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:id", contactsControllers.getById);

router.post("/", isEmptyBody, contactAddValidation, contactsControllers.post);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidation,
  contactsControllers.updateById
);

router.delete("/:contactId", contactsControllers.deleteById);

module.exports = router;
