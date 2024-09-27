const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
