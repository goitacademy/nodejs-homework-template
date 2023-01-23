const express = require("express");
const router = express.Router();

const {
  addContact,
  updatePatchContact,
  listContacts,
  getById,
  removeContact,
} = require("../../controllers/contactsControllers");

const {
  postValidation,
  patchValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", listContacts);

router.get("/:id", getById);

router.post("/", postValidation, addContact);

router.delete("/:id", removeContact);

router.patch("/:id", patchValidation, updatePatchContact);

module.exports = { contactsRouter: router };
