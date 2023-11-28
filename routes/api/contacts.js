const express = require("express");
const controller = require("../../controllers/contacts");
const { validateMongoId, validateBody } = require("../../middlewares");
const {
  joiContactSchema,
  joiFavoriteSchema,
} = require("../../schema/contacts");
const { route } = require("../../consts");

const router = express.Router();

router.get(route.HOME, controller.getAll);

router.get(route.ID, validateMongoId, controller.getById);

router.post(route.HOME, validateBody(joiContactSchema), controller.addItem);

router.delete(route.ID, validateMongoId, controller.deleteItem);

router.put(
  route.ID,
  validateMongoId,
  validateBody(joiContactSchema),
  controller.updateItemById
);

router.patch(
  route.FAVORITE,
  validateMongoId,
  validateBody(joiFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
