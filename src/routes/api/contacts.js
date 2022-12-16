const express = require("express");
const router = express.Router();
const path = require("path");

const { addPostValidation, patchPostValidation } = path.join(
  __dirname,
  "../../middlewares/validationMiddleware.js"
);

const { getContacts, getContactId, deleteContact, postContact, putContact } =
  path.join(__dirname, "../../controllers/contactsController.js");

router.get("/", getContacts);
router.get("/:contactId", getContactId);
router.post("/", addPostValidation, postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", patchPostValidation, putContact);

module.exports = { contactsRouter: router };
