const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares/index");

const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts");

// Контакти
router.get("/", getAll);
router.get("/:contactId", isValidId, getById);
router.post("/", validateBody(addContactSchema), add);
router.delete("/:contactId", isValidId, deleteById);
router.put(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
