const express = require("express");
const ctrls = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrls.getAllContacts);

router.get("/:id", isValidId, ctrls.getContact);

router.post("/", validateBody(schemas.addSchema), ctrls.addContact);

router.delete("/:id", isValidId, ctrls.deleteContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrls.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrls.updateFavorite
);

module.exports = router;
