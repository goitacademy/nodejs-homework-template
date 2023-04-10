const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contacts");
const { validateBy, isValidId } = require("../../middlewars");
const { schemas } = require("../../models/contact");

router.get("/", controller.getAll);

router.get("/:contactId", isValidId, controller.getById);

router.post("/", validateBy(schemas.primary), controller.add);

router.delete("/:contactId", isValidId, controller.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBy(schemas.primary),
  controller.putById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBy(schemas.secondary),
  controller.putchById
);

module.exports = router;
