const express = require("express");
const router = express.Router();

const { contactsCtrl } = require("../../controllers");
const { validateBody } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts");

router.get("/", contactsCtrl.getAll);

router.get("/:contactId", contactsCtrl.getById);

router.post("/", validateBody(addSchema), contactsCtrl.add);

router.delete("/:contactId", contactsCtrl.deleteById);

router.put("/:contactId", validateBody(updateSchema), contactsCtrl.updateById);

router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  contactsCtrl.updateStatusContact
);

module.exports = router;
