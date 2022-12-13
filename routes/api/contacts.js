const express = require("express");

const {
  addContactScheme,
  putContactScheme,
  contactIdScheme,
} = require("../../schemas");
const {
  controlWrapper,
  validation,
  validationId,
} = require("../../middlewares");

const validationMiddlewareAdd = validation(addContactScheme);
const validationMiddlewarePut = validation(putContactScheme);
const validationMiddlewareContactId = validationId(contactIdScheme);

const { contacts: control } = require("../../controllers");

const router = express.Router();

router.get("/", controlWrapper(control.getContacts));

router.get(
  "/:contactId",
  validationMiddlewareContactId,
  controlWrapper(control.getContact)
);

router.post(
  "/",
  validationMiddlewareAdd,
  controlWrapper(control.addNewContact)
);

router.delete(
  "/:contactId",
  validationMiddlewareContactId,
  controlWrapper(control.deleteContact)
);

router.put(
  "/:contactId",
  validationMiddlewareContactId,
  validationMiddlewarePut,
  controlWrapper(control.changeContact)
);

module.exports = router;
