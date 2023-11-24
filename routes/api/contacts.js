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

const { validateBody, auth, isValidId } = require("../../middlewares/index");

const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts");

// Контакти
router.get("/", auth, getAll);
router.get("/:contactId", auth, isValidId, getById);
router.post("/", auth, validateBody(addContactSchema), add);
router.delete("/:contactId", auth, isValidId, deleteById);
router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(updateContactSchema),
  updateById
);
router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
