const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { userSchema } = require("../../models/contacts");
const { ctrlWrapper } = require("../../utils");
const {
  getAll,
  getById,
  addContact,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", validateBody(userSchema.addSchema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(deleteById));

router.put(
  "/:contactId",
  validateBody(userSchema.addSchema),
  ctrlWrapper(updateById)
);
router.patch(
  "/:contactId/favorite",
  validateBody(userSchema.favoriteSchema),
  ctrlWrapper(updateFavorite)
);
module.exports = router;
