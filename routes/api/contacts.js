const express = require("express");

const router = express.Router();
const { authenticate, isValidId, validateBody } = require("../../middlewares");

const {
  getAll,
  getById,
  addContact,
  deleteById,
  updateById,
  updateFavorite,
} = require("../../controllers");
const { userSchemas } = require("../../models");
const { ctrlWrapper } = require("../../utils");
router.get("/", authenticate, ctrlWrapper(getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(getById));

router.post(
  "/",
  authenticate,
  validateBody(userSchemas.addSchema),
  ctrlWrapper(addContact)
);
router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(deleteById));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(userSchemas.addSchema),

  ctrlWrapper(updateById)
);
router.patch(
  "/:contactId/favorite",

  authenticate,
  isValidId,
  validateBody(userSchemas.favoriteSchema),


  ctrlWrapper(updateFavorite)
);
module.exports = router;
