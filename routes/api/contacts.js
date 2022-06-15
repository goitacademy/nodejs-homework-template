const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();
const validate = require("../../middlewares/validation");
const { joiContactSchema, favoriteStatusSchema } = require("../../models");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validate(joiContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validate(joiContactSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validate(favoriteStatusSchema),
  ctrl.updateStatusContact
);

module.exports = router;
