const express = require("express");

const controller = require("../../controllers/contacts");
const {
  addContactValidation,
  updateFavoriteContactValidation,
  putContactValidation,
} = require("../../schema/validation");

const { controllerWrapper, validateIdParam } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrapper(controller.getAllContacts));

router.get(
  "/:contactId",
  validateIdParam,
  controllerWrapper(controller.getContactById)
);

router.post(
  "/",
  addContactValidation,
  controllerWrapper(controller.addContact)
);

router.delete(
  "/:contactId",
  validateIdParam,
  controllerWrapper(controller.removeContactById)
);

router.put(
  "/:contactId",
  putContactValidation,
  validateIdParam,
  controllerWrapper(controller.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  updateFavoriteContactValidation,
  validateIdParam,
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;