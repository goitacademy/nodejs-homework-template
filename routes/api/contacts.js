const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { addSchema, updFavoriteSchema } = require("../../models/contact");

const router = express.Router();
const jsonParser = express.json();

router.get("/", jsonParser, authenticate, ctrl.getContacts);

router.get("/:contactId", jsonParser, authenticate, isValidId, ctrl.getById);

router.delete("/:contactId", isValidId, authenticate, ctrl.removeContact);

router.post(
  "/",
  jsonParser,
  authenticate,
  validateBody(addSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  jsonParser,
  authenticate,
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
