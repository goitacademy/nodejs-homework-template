const express = require("express");

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers");

const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { validation } = require("../../middlewares");
const router = express.Router();

const validateMiddleware = validation(joiSchema);

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateMiddleware, add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validateMiddleware, updateById);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  updateFavorite
);

module.exports = router;
