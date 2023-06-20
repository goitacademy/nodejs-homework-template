const express = require("express");
const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");

const ctrl = require("../../controllers/contactsController");

const { addSchema } = require("../../models/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;
