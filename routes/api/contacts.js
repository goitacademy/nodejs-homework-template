const express = require("express");
const contactsControllers = require("../../controllers/contacts-controllers.js");
const isEmptyBody = require("../../middlewares/isEmptyBody.js");
const validateBody = require("../../decorators/validateBody.js");
const contactAddSchema = require("../../schemas/contact-schema.js");

const contactAddValidate = validateBody(contactAddSchema);

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", contactsControllers.getById);

router.delete("/:contactId", contactsControllers.deleteById);

router.post("/", isEmptyBody, contactAddValidate, contactsControllers.add);

router.put(
  "/:contactId",
  isEmptyBody,
  contactAddValidate,
  contactsControllers.updateById
);

module.exports = router;
