const express = require("express");
const router = express.Router();
const { controllerWrapper, validation } = require("./../../middlewares");
const contactsControllers = require("../../controllers/contacts/");
const { addSchema, patchSchema } = require("./../../schemas");

router.get("/", controllerWrapper(contactsControllers.getContacts));

router.get("/:contactId", controllerWrapper(contactsControllers.getContact));

router.post(
  "/",
  validation(addSchema),
  controllerWrapper(contactsControllers.addContact)
);

router.delete(
  "/:contactId",
  controllerWrapper(contactsControllers.removeContact)
);

router.patch(
  "/:contactId",
  validation(patchSchema),
  controllerWrapper(contactsControllers.updateContact)
);

module.exports = router;
