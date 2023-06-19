const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, controllers.listContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactById);

router.post("/", authenticate, controllers.addContact);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllers.removeContact
);

router.put("/:contactId", authenticate, isValidId, controllers.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  controllers.updateStatusContact
);

module.exports = router;
