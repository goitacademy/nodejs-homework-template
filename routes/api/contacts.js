const express = require("express");
const router = express.Router();

const {
  getContacts,
  postContact,
  getContact,
  deleteContactById,
  putContact,
  updatePartContact,
} = require("../../controllers/controllersContacts");

const { validateContacts, validateId } = require("./validation.js");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", validateContacts, postContact);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", validateContacts, putContact);

router.patch("/:id/favorite/", validateId, updatePartContact);

module.exports = router;
