const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const jsonParser = express.json();

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.listContacts);

router.get("/:id",  ctrl.getContactById);

router.post("/", jsonParser, validateBody(schemas.addSchema), ctrl.addContact);

// router.delete("/:contactId", isValidId ctrl.removeContact);

router.put(
  "/:id",
  jsonParser,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)
module.exports = router;
