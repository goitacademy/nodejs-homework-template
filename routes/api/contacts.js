const express = require("express");

const { addContactScheme, putContactScheme } = require("../../schemas");
const { controlWrapper, validation } = require("../../middlewares");

const validationMiddlewareAdd = validation(addContactScheme);
const validationMiddlewarePut = validation(putContactScheme);

const { contacts: control } = require("../../controllers");

const router = express.Router();

router.get("/", controlWrapper(control.getContacts));

router.get("/:contactId", controlWrapper(control.getContact));

router.post(
  "/",
  validationMiddlewareAdd,
  controlWrapper(control.addNewContact)
);

router.delete("/:contactId", controlWrapper(control.deleteContact));

router.put(
  "/:contactId",
  validationMiddlewarePut,
  controlWrapper(control.changeContact)
);

module.exports = router;
