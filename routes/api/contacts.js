const express = require("express");
const {
  postContactValidation,
  putValidation,
} = require("../../middlewares/validation");
const {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} = require("../../controllers/contactController");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactByIdController);

router.post("/", postContactValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putValidation, putContact);

router.patch("/:contactId", patchContact);

module.exports = router;
