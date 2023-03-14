const express = require("express");
const { isValidId, validateBody, authenticate } = require("../../middlewares");

const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");
const { addSchemaForFavorite, addSchemaforPut, addSchemaforPost } = schemas;

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(addSchemaforPost), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchemaforPut),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(addSchemaForFavorite),
  ctrl.updateStatusContact
);

module.exports = router;
