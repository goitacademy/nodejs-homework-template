const express = require("express");
const contactsControllers = require("../../controllers/contacts-controllers.js");
const isEmptyBody = require("../../middlewares/isEmptyBody.js");
const validateBody = require("../../decorators/validateBody.js");
const validateUpdateBody = require("../../decorators/validateUpdateBody.js");
const schemaValidate = require("../../schemas/contact-schema.js");

const contactAddValidate = validateBody(schemaValidate.contactAddSchema);
const contactUpdateValidate = validateUpdateBody(
  schemaValidate.contactUpdateSchema
);

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", contactsControllers.getById);

router.delete("/:contactId", contactsControllers.deleteById);

router.post("/", isEmptyBody, contactAddValidate, contactsControllers.add);

router.put(
  "/:contactId",
  isEmptyBody,
  contactUpdateValidate,
  contactsControllers.updateById
);

module.exports = router;
