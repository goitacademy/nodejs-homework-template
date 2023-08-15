const express = require("express");
const controllers = require("../../contollers/contactsControllers");

const router = express.Router();
const validateBody = require("../../middleware/validateBody");

const schemas = require("../../schemas/contacts");

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(schemas.addSchema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controllers.updateContact
);


module.exports = router;
