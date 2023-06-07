const express = require("express");

const {
  getAllContacts,
  getContact,
  add,
  updateContactById,
 remove
} = require("../../controllers");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", add);

router.delete("/:contactId", remove);

router.put("/:contactId", updateContactById);

module.exports = router;
