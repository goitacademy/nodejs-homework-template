const express = require("express");

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
  schemas: { addSchema, updateStatusSchema },
} = require("../../models/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(addSchema), add);

router.put("/:contactId", isValidId, validateBody(addSchema), updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateStatusSchema),
  updateStatusContact
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
