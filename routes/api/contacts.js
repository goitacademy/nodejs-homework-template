/** @format */

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
router.get("/", controller.onGetAllContacts);
router.get("/:id", isValidId, controller.onGetContactById);
router.post("/", validateBody(schemas.addSchema), controller.onAddNewContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  controller.onUpdateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controller.updateStatusContact
);

router.delete("/:id", isValidId, controller.onDeleteContact);

module.exports = router;
