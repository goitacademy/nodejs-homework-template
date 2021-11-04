const express = require("express");
const router = express.Router();
// const joiSchema = require("../../../middlewares/validation/contacts");
const { validation } = require("../../../middlewares/validation");
const { joiContactsSchema } = require("../../../validations");
const contactsControllers = require("../../../controllers/contacts");

router.get("/", contactsControllers.listContactsController);

router.get("/:contactId", contactsControllers.getContactByIdController);

router.post(
  "/",
  validation(joiContactsSchema),
  contactsControllers.addContactController
);

router.delete("/:contactId", contactsControllers.removeContactController);

router.put(
  "/:contactId",
  validation(joiContactsSchema),
  contactsControllers.updateByIdController
);

module.exports = router;
