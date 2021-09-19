const express = require("express");
const router = express.Router();
const { contactsSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper, validation } = require("../../middlewares");

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post(
  "/",
  validation(contactsSchema),
  controllerWrapper(ctrl.addContact)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeContactById));

router.put(
  "/:contactId",
  validation(contactsSchema),
  controllerWrapper(ctrl.updateContactById)
);

module.exports = router;
