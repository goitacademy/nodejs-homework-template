const express = require("express");

const router = express.Router();

const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");

const { contacts: ctrl } = require("../../controllers/");

const { joiSchema, favoriteSchema } = require("../../schemas/contactsSchema");

router.get("/", auth, ctrl.getContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", auth, validation(joiSchema), ctrl.addContact);

router.put("/:contactId", validation(joiSchema), ctrl.updateContactById);

router.patch(
  "/:contactId/favorite",
  validation(favoriteSchema),
  ctrl.updateStatusById
);

router.delete("/:contactId", ctrl.deleteContactById);

module.exports = router;
