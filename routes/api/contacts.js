const express = require("express");

const router = express.Router();

const schema = require("../../middlewares/validation");
const { validateBody, isValidId } = require("../../middlewares");
const ctrl = require("../../controlers/contacts");

router.get("/", ctrl.getList);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schema.postSchema), ctrl.postContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schema.putSchema),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  ctrl.update
);

module.exports = router;
