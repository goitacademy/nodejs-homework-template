const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers/contacts");
const { controllerWrapper, validation } = require("../../middlewares");
const contactSchema = require("../../schemas");

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), controllerWrapper(ctrl.addContact));

router.delete("/:contactId", controllerWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  controllerWrapper(ctrl.updateContact)
);

module.exports = router;
