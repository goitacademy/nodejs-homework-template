const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();
const { validation, auth } = require("../../middlewares");
const { joiContactSchema, favoriteStatusSchema } = require("../../models");

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", auth, validation(joiContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validation(joiContactSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validation(favoriteStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
