const express = require("express");
const controllers = require("../../contollers/contactsControllers");

const router = express.Router();
const validateBody = require("../../middleware/validateBody");

const { schemas } = require("../../schemas/contactsValidation");

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(schemas.addSchema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controllers.updateContact
);

module.exports = router;
