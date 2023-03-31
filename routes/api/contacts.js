const express = require('express');
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite
} = require("../../controllers/contacts");
const validateBody = require('../../utils/validateBody')
const { addSchema, updateFavoriteSchema } = require("../../schemas/contacts");
const isValidId = require('../../middlewares/isValidId');

const router = express.Router();

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post('/', validateBody(addSchema), add)

router.delete("/:id", isValidId, deleteById);

router.put("/:id", isValidId, validateBody(addSchema), updateById);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

module.exports = router
