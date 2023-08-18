const express = require("express");

const router = express.Router();
const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const {
  addSchema,
  updateStatusContactSchema,
} = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(addSchema), add);

router.put("/:contactId", isValidId, validateBody(addSchema), updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
