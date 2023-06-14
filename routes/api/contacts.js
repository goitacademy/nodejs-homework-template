const express = require("express");

const { addContactSchema, editContactSchema } = require("../../schema");

const { contactValidation, isValidId } = require("../../middlewares");

const router = express.Router();

const {
  getAll,
  getById,
  add,
  editById,
  deleteById,
} = require("../../controllers");

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post(
  "/",
  contactValidation(addContactSchema, "Missing required name field"),
  add
);

router.put(
  "/:contactId",
  isValidId,
  contactValidation(editContactSchema, "Missing fields"),
  editById
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
