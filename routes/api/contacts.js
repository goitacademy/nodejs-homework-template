const express = require("express");
const {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateById,
} = require("../../controller/controllers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", createContact);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

module.exports = router;
