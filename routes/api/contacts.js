const express = require("express");
const router = express.Router();
const { joiSchema, updateFavoriteJoiSchema } = require("../../models/contacts");
// const { joiSchema } = require("../../models");
const { controllerWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
// console.log(ctrl);

// GET /api/contacts
router.get("/", controllerWrapper(ctrl.getAll));

// GET /api/contacts/3
router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(ctrl.updateContactsById)
);

router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeContactById));

module.exports = router;
