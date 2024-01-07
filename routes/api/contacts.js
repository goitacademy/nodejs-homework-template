const express = require("express");

const controler = require("../../controlers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controler.listContacts);

router.get("/:contactId", isValidId, controler.getContactById);

router.post("/", validateBody(schemas.joiSchema), controler.addContact);

router.delete("/:contactId", isValidId, controler.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.joiSchema),
  controler.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.joiFavoriteSchema),
  controler.updateFavorite
);

module.exports = router;
