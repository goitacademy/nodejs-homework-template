const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { addSchema, updFavoriteSchema } = require("../../models/contact");
// const { isValidId } = require("../../middlewares");

const router = express.Router();
const jsonParser = express.json();

router.get("/", jsonParser, ctrl.getContacts);

router.get("/:contactId", jsonParser, isValidId, ctrl.getById);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.post("/", jsonParser, validateBody(addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  jsonParser,
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
