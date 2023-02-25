const express = require("express");
const { isValidId, validateBody } = require("../../middlewares");
const controller = require("../../controllers/contacts");
const {schemas} = require("../../models");

const router = express.Router();

router.get("/", controller.getAll);

router.get( "/:contactId", isValidId,controller.getById);

router.post("/", validateBody(schemas.addSchema), controller.add);

router.delete("/:contactId", isValidId, controller.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.updateByIdSchema),
  controller.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controller.updateFavorite
);

module.exports = router;
