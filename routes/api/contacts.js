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

router.put("/:contactId", updateContactById);

router.delete("/:contactId", remove);


module.exports = router;
