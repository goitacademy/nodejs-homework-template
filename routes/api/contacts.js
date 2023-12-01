const express = require("express");
const controller = require("../../controllers/contacts");
const {
  validateMongoId,
  validateBody,
  authenticate,
} = require("../../middlewares");
const {
  joiContactSchema,
  joiFavoriteSchema,
} = require("../../schema/contacts");
const { pathContact } = require("../../consts");

const router = express.Router();

router.get(pathContact.HOME, authenticate, controller.getAll);

router.get(pathContact.ID, authenticate, validateMongoId, controller.getById);

router.post(
  pathContact.HOME,
  authenticate,
  validateBody(joiContactSchema),
  controller.addItem
);

router.delete(
  pathContact.ID,
  authenticate,
  validateMongoId,
  controller.deleteItem
);

router.put(
  pathContact.ID,
  authenticate,
  validateMongoId,
  validateBody(joiContactSchema),
  controller.updateItemById
);

router.patch(
  pathContact.FAVORITE,
  authenticate,
  validateMongoId,
  validateBody(joiFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
