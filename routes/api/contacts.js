/** @format */

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, controller.onGetAllContacts);

router.get("/:id", authenticate, isValidId, controller.onGetContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controller.onAddNewContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  controller.onUpdateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controller.updateStatusContact
);

router.delete("/:id", authenticate, isValidId, controller.onDeleteContact);

module.exports = router;
