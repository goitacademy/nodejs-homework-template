const express = require("express");
const {
  postContactValidation,
  putValidation,
  patchValidation,
} = require("../../middlewares/index");
const {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} = require("../../controllers/index");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactByIdController);

router.post("/", postContactValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putValidation, putContact);

router.patch("/:contactId/favorite", patchValidation, patchContact);

module.exports = router;