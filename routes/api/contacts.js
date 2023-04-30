const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const { validateBy, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, controller.getAll);

router.get("/:contactId", authenticate, isValidId, controller.getById);

router.post("/", authenticate, validateBy(schemas.primary), controller.add);

router.delete("/:contactId", authenticate, isValidId, controller.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBy(schemas.primary),
  controller.putById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBy(schemas.secondary),
  controller.favoriteUpdate
);

module.exports = router;
