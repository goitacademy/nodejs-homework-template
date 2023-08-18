const express = require("express");

const router = express.Router();
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const schema = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schema.addSchema), add);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schema.addSchema),
  updateById
);

// router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
