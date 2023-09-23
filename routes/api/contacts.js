const express = require("express");

const {
  getContacts,
  getContactById,
  addNewContact,
  deleteContact,
  putContact,
  patchContact,
} = require("../../controllers/controllers");

const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addNewContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, putContact);

router.patch("/:contactId/favorite", isValidId, patchContact);

module.exports = router;
