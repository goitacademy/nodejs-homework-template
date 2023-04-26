const express = require("express");
const controllers = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllers.getListContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", validateBody(schemas.addSchema), controllers.addContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  isValidId,
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  controllers.updateStatusContact
);

router.delete("/:contactId", isValidId, controllers.removeContact);

module.exports = router;
