const express = require("express");

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
} = require("../../controllers");
const {
  addContactValidation,
  patchContactValidation,
} = require("../../schemas");

const router = express.Router();

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", addContactValidation, postContact);

router.delete("/:id", deleteContact);

router.put("/:id", patchContactValidation, changeContact);

module.exports = router;
