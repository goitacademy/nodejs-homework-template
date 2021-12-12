const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controller/contacts");
// const {
//   schemaAddContact,
//   schemaUpdateContact,
// } = require("../../schemas/contact");

const { joiSchema, statusJoiSchema } = require("../../model");

const { controlWrapper, validation, auth } = require("../../middlewares");

router.get("/", auth, controlWrapper(controllerContacts.listContacts));

router.get("/:contactId", controlWrapper(controllerContacts.getContactById));

router.post(
  "/",
  auth,
  validation(joiSchema),
  controlWrapper(controllerContacts.addContact)
);

router.delete("/:contactId", controlWrapper(controllerContacts.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  controlWrapper(controllerContacts.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema),
  controlWrapper(controllerContacts.updatefavorite)
);

module.exports = router;
