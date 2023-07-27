const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateFavorite,
} = require("../../controllers/contacts/index.js");
const { validateBody } = require("../../decorators/index.js");
const { isEmptyBody, isValidId } = require("../../middlewares/index");
const {
  contactSchema,
  contactUpdateFavoriteSchema,
} = require("../../schema/contacts.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", isEmptyBody, validateBody(contactSchema), add);

router.delete("/:id", isValidId, deleteById);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  updateFavorite
);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactSchema),
  updateById
);

module.exports = router;
