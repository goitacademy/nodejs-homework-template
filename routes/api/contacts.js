const express = require("express");

const router = express.Router();

const validation = require("../../middlewares/validation");

const { contacts: ctrl } = require("../../controllers/");

const { joiSchema, favoriteSchema } = require("../../schemas/contactsSchema");

router.get("/", ctrl.getContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validation(joiSchema), ctrl.addContact);

router.put("/:contactId", validation(joiSchema), ctrl.updateContactById);

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema),
  ctrl.updateStatusById
);

router.delete("/:contactId", ctrl.deleteContactById);

module.exports = router;
