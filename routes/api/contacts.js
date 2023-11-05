const express = require("express");

const contactsCtrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", contactsCtrl.getAll);

router.get("/:contactId", isValidId, contactsCtrl.getById);

router.post("/", validateBody(schemas.addSchema), contactsCtrl.add);

router.delete("/:contactId", isValidId, contactsCtrl.removeById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  contactsCtrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteShema),
  contactsCtrl.updateFavorite
);

module.exports = router;
