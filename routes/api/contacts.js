const express = require("express");
const controllers = require("../../controllers/contacts-controllers.js");
const isEmptyBody = require("../../middlewars/isEmptyBody.js");
const router = express.Router();
const isValidId = require("../../middlewars/isValidId.js");
const {
  updateContactChema,
  updateFavoriteChema,
} = require("../../models/Contact.js");
const validateBody = require("../../helpers/validationBody.js");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post(
  "/",
  isEmptyBody,
  validateBody(updateContactChema),
  controllers.addNewContact
);

router.delete("/:contactId", isValidId, controllers.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(updateContactChema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateFavoriteChema),
  controllers.updateStatusContact
);
module.exports = router;
