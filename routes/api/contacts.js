const express = require("express");

const { addContactSchema, editContactSchema } = require("../../schema");

const { contactValidation } = require("../../middlewares");

const router = express.Router();

const {
  getAll,
  getById,
  add,
  editById,
  deleteById,
} = require("../../controllers");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", contactValidation(addContactSchema), add);

router.put("/:contactId", contactValidation(editContactSchema), editById);

router.delete("/:contactId", deleteById);

module.exports = router;
