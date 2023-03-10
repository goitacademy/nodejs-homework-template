const express = require("express");
const { isValidId, validateBody, authenticate } = require("../../middlewares");
const controller = require("../../controllers/contacts");
const {schemas} = require("../../models");

const router = express.Router();

router.get("/",authenticate, controller.getAll);

router.get( "/:contactId",authenticate, isValidId,controller.getById);

router.post("/",authenticate, validateBody(schemas.addSchema), controller.add);

router.delete("/:contactId",authenticate, isValidId, controller.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.updateByIdSchema),
  controller.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controller.updateFavorite
);


module.exports = router;
