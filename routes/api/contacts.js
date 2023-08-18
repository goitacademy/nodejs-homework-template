const express = require("express");
const {
  getAll,
  getById,
  postContact,
  deleteContact,
  putContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(addSchema), postContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, validateBody(addSchema), putContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
