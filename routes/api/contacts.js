const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addContact,
  removeContact,
  updateContact,
  setFaforited,
} = require("../../controllers/Contacts");
const {
  isValidId,
  validationBody,
  authenticate,
} = require("../../middlewares");

const { cntJoiSchema } = require("../../models/contacts");

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, isValidId, getById);

router.post(
  "/",
  validationBody(cntJoiSchema.addContactSchema),
  authenticate,
  addContact
);

router.put(
  "/:id",
  validationBody(cntJoiSchema.addContactSchema),
  authenticate,
  updateContact
);

router.patch(
  "/:id/favorite",
  validationBody(cntJoiSchema.setFaforitedSchema),
  authenticate,
  setFaforited
);

router.delete("/:id", authenticate, removeContact);

module.exports = router;
